#!/usr/bin/env python3
"""Kiểm tra tính toàn vẹn của thư viện: library.json ↔ raw_sources/ ↔ markdown_docs/.

Dùng:
    python3 scripts/validate_library.py                 # kiểm tra, exit 1 nếu có ERROR
    python3 scripts/validate_library.py --report audit/registry_report.json
    python3 scripts/validate_library.py --check-urls    # thêm kiểm tra sourceUrl còn sống (cần mạng)

Mức độ:
    ERROR   — chặn merge (sai schema, thiếu file, file mồ côi, code fence hở, ký tự Private Use...)
    WARNING — cần người xem (header trống số/ngày, bảng lệch cột, link chết...)
"""
import argparse
import json
import re
import shutil
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LIBRARY = ROOT / "library.json"
PDF_DIR = ROOT / "raw_sources"
MD_DIR = ROOT / "markdown_docs"

REQUIRED = ["refId", "title", "version", "documentType", "documentNumber",
            "issuingAuthority", "effectiveDate", "tags", "sourceUrl"]
DOC_TYPES = {"MOH_GUIDELINE", "INT_GUIDELINE", "CIRCULAR", "LAW", "HOSPITAL_GUIDELINE"}
STATUSES = {"active", "superseded"}
REF_ID_RE = re.compile(r"^REF_(MOH|LAW)_\d{4}_[A-Z0-9]+$|^REF_INT_[A-Z0-9]+_\d{4}$")

# Mẫu lỗi đã gặp trong FIDELITY_REVIEW.md
BLANK_HEADER_RES = [
    (re.compile(r"Số\s*:?\s*/\s*(QĐ|TT)-BYT"), "header trống số văn bản ('Số: /QĐ-BYT')"),
    (re.compile(r"ngày\s+tháng\s+năm\s+\d{4}|ngày\s+tháng\s+năm(?!\s*\d)"), "header trống ngày ('ngày tháng năm')"),
]
NOT_IN_SOURCE_RE = re.compile(r"không có trong (bản|văn bản) gốc", re.IGNORECASE)


class Report:
    def __init__(self):
        self.items = []

    def add(self, level, ref_id, check, message):
        self.items.append({"level": level, "refId": ref_id, "check": check, "message": message})

    def error(self, *a):
        self.add("ERROR", *a)

    def warn(self, *a):
        self.add("WARNING", *a)

    def count(self, level):
        return sum(1 for i in self.items if i["level"] == level)


def pdf_pages(path):
    if not shutil.which("pdfinfo"):
        return None
    try:
        out = subprocess.run(["pdfinfo", str(path)], capture_output=True, text=True, timeout=60)
    except subprocess.TimeoutExpired:
        return -1
    if out.returncode != 0:
        return -1
    m = re.search(r"^Pages:\s+(\d+)", out.stdout, re.MULTILINE)
    return int(m.group(1)) if m else -1


def split_cells(row):
    row = row.strip().replace("\\|", "")
    if row.startswith("|"):
        row = row[1:]
    if row.endswith("|"):
        row = row[:-1]
    return row.split("|")


def check_markdown(rep, ref_id, entry, text):
    lines = text.splitlines()

    # Mermaid / code fence đóng mở
    fences = [i for i, l in enumerate(lines, 1) if l.lstrip().startswith("```")]
    if len(fences) % 2:
        rep.error(ref_id, "md-fence", f"code fence ``` không đóng (fence cuối ở dòng {fences[-1]})")

    # Bảng: số cột từng hàng so với hàng phân cách
    in_code = False
    block = []
    bad_tables = []

    def flush(block):
        if len(block) < 2:
            return
        sep = next(((n, l) for n, l in block if re.fullmatch(r"\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*", l)), None)
        if not sep:
            return
        ncol = len(split_cells(sep[1]))
        off = [n for n, l in block if len(split_cells(l)) != ncol]
        if off:
            bad_tables.append((block[0][0], ncol, off))

    for n, l in enumerate(lines, 1):
        if l.lstrip().startswith("```"):
            in_code = not in_code
        if not in_code and l.lstrip().startswith("|"):
            block.append((n, l))
        else:
            flush(block)
            block = []
    flush(block)
    for start, ncol, off in bad_tables:
        rep.warn(ref_id, "md-table-columns",
                 f"bảng ở dòng {start} ({ncol} cột) có {len(off)} hàng lệch số cột, vd dòng {off[:5]}")

    head = "\n".join(lines[:80])
    for rx, msg in BLANK_HEADER_RES:
        m = rx.search(head)
        if m:
            rep.warn(ref_id, "md-blank-header", f"{msg}: “{m.group(0)}”")

    # Header có nhắc tới số văn bản trong library.json
    num = entry.get("documentNumber", "")
    key = num.split("/")[0] if num else ""
    if key and key not in head:
        rep.warn(ref_id, "md-header-number", f"80 dòng đầu không chứa số văn bản '{key}' ({num})")

    if not any(l.startswith("#") for l in lines[:200]):
        rep.warn(ref_id, "md-structure", "200 dòng đầu không có heading Markdown — có thể là text thô chưa định dạng")

    pua = [(n, hex(ord(ch))) for n, l in enumerate(lines, 1) for ch in l if 0xE000 <= ord(ch) <= 0xF8FF]
    if pua:
        rep.error(ref_id, "md-private-use-char",
                  f"{len(pua)} ký tự Unicode Private Use (glyph font Symbol/Wingdings, không hiển thị trên web), vd dòng {pua[:5]}")

    for n, l in enumerate(lines, 1):
        if NOT_IN_SOURCE_RE.search(l):
            rep.warn(ref_id, "md-not-in-source-note",
                     f"dòng {n} có chú thích 'không có trong bản gốc' — cần xác minh lại với PDF")


def check_url(url, timeout=20):
    url = urllib.parse.quote(url, safe=":/?&=%#+~@!$,;")
    req = urllib.request.Request(url, method="HEAD", headers={"User-Agent": "Mozilla/5.0 vn-medical-ref-validator"})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.status, None
    except urllib.error.HTTPError as e:
        if e.code in (403, 405):  # một số server chặn HEAD → thử GET
            try:
                req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0", "Range": "bytes=0-0"})
                with urllib.request.urlopen(req, timeout=timeout) as r:
                    return r.status, None
            except urllib.error.HTTPError as e2:
                return e2.code, str(e2)
            except Exception as e2:  # noqa: BLE001
                return None, str(e2)
        return e.code, str(e)
    except Exception as e:  # noqa: BLE001
        return None, str(e)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--report", help="ghi báo cáo JSON ra file")
    ap.add_argument("--check-urls", action="store_true", help="kiểm tra sourceUrl (cần mạng)")
    ap.add_argument("--quiet", action="store_true", help="chỉ in ERROR")
    args = ap.parse_args()

    rep = Report()
    try:
        library = json.loads(LIBRARY.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as e:
        print(f"ERROR library.json không đọc được: {e}")
        return 1
    if not isinstance(library, list):
        print("ERROR library.json phải là một mảng")
        return 1

    seen = set()
    docs = []
    for i, e in enumerate(library):
        rid = e.get("refId", f"<entry #{i}>")
        for k in REQUIRED:
            if k not in e or e[k] in (None, "") and k != "sourceUrl":
                rep.error(rid, "schema", f"thiếu trường bắt buộc '{k}'")
        if not e.get("sourceUrl"):
            rep.warn(rid, "source-url", "sourceUrl rỗng — không truy được nguồn gốc văn bản")
        if rid in seen:
            rep.error(rid, "schema", "refId bị trùng")
        seen.add(rid)
        if not REF_ID_RE.match(rid):
            rep.error(rid, "schema", f"refId sai định dạng {REF_ID_RE.pattern}")
        if e.get("documentType") and e["documentType"] not in DOC_TYPES:
            rep.error(rid, "schema", f"documentType '{e['documentType']}' không thuộc {sorted(DOC_TYPES)}")
        try:
            date.fromisoformat(e.get("effectiveDate", ""))
        except ValueError:
            rep.error(rid, "schema", f"effectiveDate '{e.get('effectiveDate')}' không phải YYYY-MM-DD")
        if not isinstance(e.get("tags"), list) or not e.get("tags"):
            rep.error(rid, "schema", "tags phải là mảng không rỗng")
        if "status" in e and e["status"] not in STATUSES:
            rep.error(rid, "schema", f"status '{e['status']}' không thuộc {sorted(STATUSES)}")
        if e.get("status") == "superseded" and not e.get("supersededBy"):
            rep.warn(rid, "schema", "status=superseded nhưng thiếu supersededBy")
        if e.get("supersededBy") and e["supersededBy"] not in {x.get("refId") for x in library}:
            rep.error(rid, "schema", f"supersededBy '{e['supersededBy']}' không tồn tại trong library.json")

        if e.get("remoteOnly"):
            if e.get("localPath"):
                rep.warn(rid, "files", "remoteOnly=true nhưng vẫn có localPath")
            continue
        lp = e.get("localPath")
        if lp != f"raw_sources/{rid}.pdf":
            rep.error(rid, "files", f"localPath phải là 'raw_sources/{rid}.pdf' (đang là {lp!r})")
        pdf = PDF_DIR / f"{rid}.pdf"
        md = MD_DIR / f"{rid}.md"
        pages = None
        if not pdf.exists():
            rep.error(rid, "files", f"thiếu PDF {pdf.relative_to(ROOT)}")
        else:
            pages = pdf_pages(pdf)
            if pages == -1:
                rep.error(rid, "files", "PDF không mở được bằng pdfinfo (hỏng?)")
        if not md.exists():
            rep.error(rid, "files", f"thiếu Markdown {md.relative_to(ROOT)}")
        else:
            check_markdown(rep, rid, e, md.read_text(encoding="utf-8"))
        docs.append({"refId": rid, "pages": pages,
                     "mdLines": len(md.read_text(encoding="utf-8").splitlines()) if md.exists() else None})

    local_ids = {e["refId"] for e in library if not e.get("remoteOnly") and "refId" in e}
    for p in sorted(PDF_DIR.glob("*.pdf")):
        if p.stem not in local_ids:
            rep.error(p.stem, "files", f"PDF mồ côi (không có trong library.json): {p.name}")
    for p in sorted(MD_DIR.glob("*.md")):
        if p.stem not in local_ids:
            rep.error(p.stem, "files", f"Markdown mồ côi (không có trong library.json): {p.name}")

    if args.check_urls:
        for e in library:
            url = e.get("sourceUrl")
            if not url:
                continue
            status, err = check_url(url)
            if status is None or status >= 400:
                rep.warn(e.get("refId"), "source-url-dead", f"{url} → {status or ''} {err or ''}".strip())

    errs, warns = rep.count("ERROR"), rep.count("WARNING")
    for it in rep.items:
        if args.quiet and it["level"] != "ERROR":
            continue
        print(f"{it['level']:<7} {it['refId']:<22} [{it['check']}] {it['message']}")
    print(f"\n{len(library)} entry · {len(docs)} tài liệu local · {errs} ERROR · {warns} WARNING")

    if args.report:
        out = ROOT / args.report
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(json.dumps({
            "generatedAt": date.today().isoformat(),
            "summary": {"entries": len(library), "localDocs": len(docs), "errors": errs, "warnings": warns},
            "documents": docs,
            "findings": rep.items,
        }, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return 1 if errs else 0


if __name__ == "__main__":
    sys.exit(main())
