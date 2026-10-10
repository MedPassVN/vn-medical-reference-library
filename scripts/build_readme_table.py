#!/usr/bin/env python3
"""Sinh bảng "Tra cứu nhanh Danh mục Tài liệu" trong README.md từ library.json.

Dùng:
    python3 scripts/build_readme_table.py          # ghi đè phần giữa 2 marker trong README.md
    python3 scripts/build_readme_table.py --check  # exit 1 nếu README lệch với library.json (dùng cho CI)
"""
import argparse
import json
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
README = ROOT / "README.md"
LIBRARY = ROOT / "library.json"
START = "<!-- LIBRARY_TABLE_START (tự sinh bởi scripts/build_readme_table.py — không sửa tay) -->"
END = "<!-- LIBRARY_TABLE_END -->"

TYPE_LABELS = {
    "LAW": "Luật",
    "CIRCULAR": "Thông tư",
    "MOH_GUIDELINE": "Quyết định",
    "HOSPITAL_GUIDELINE": "Hướng dẫn",
    "INT_GUIDELINE": "QST Quốc tế",
}


def cell(text):
    return str(text).replace("|", "\\|").replace("\n", " ")


def render(library):
    rows = [
        f"## 🗂️ Tra cứu nhanh Danh mục Tài liệu hiện có ({len(library)} Tài liệu Cốt lõi)",
        "",
        "Dưới đây là mục lục tra cứu nhanh các tài liệu y khoa có sẵn trong thư viện:",
        "",
        "| Mã Tài liệu (`ref_id`) | Tên Tài liệu Tham khảo | Loại văn bản | Cơ quan ban hành | Ngày hiệu lực | Tải PDF (Local CDN) |",
        "| :--- | :--- | :---: | :--- | :---: | :---: |",
    ]
    for e in library:
        title = cell(e["title"])
        if e.get("status") == "superseded":
            title += f" *(đã được thay thế bởi `{e.get('supersededBy', '?')}`)*"
        if e.get("remoteOnly") or not e.get("localPath"):
            link = f"[Direct Link 🌐]({e['sourceUrl']})" if e.get("sourceUrl") else "—"
        else:
            link = f"[Download 📥]({e['localPath']})"
        rows.append(
            f"| **`{e['refId']}`** | {title} | `{TYPE_LABELS.get(e['documentType'], e['documentType'])}` "
            f"| {cell(e['issuingAuthority'])} | {e['effectiveDate']} | {link} |"
        )
    return "\n".join([START, *rows, END])


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--check", action="store_true", help="chỉ kiểm tra, không ghi")
    args = ap.parse_args()

    library = json.loads(LIBRARY.read_text(encoding="utf-8"))
    text = README.read_text(encoding="utf-8")
    if START not in text or END not in text:
        print(f"README.md thiếu marker {START!r} / {END!r}")
        return 1
    before, rest = text.split(START, 1)
    _, after = rest.split(END, 1)
    new = before + render(library) + after
    if args.check:
        if new != text:
            print("README.md lệch với library.json — chạy: python3 scripts/build_readme_table.py")
            return 1
        print("README.md khớp library.json")
        return 0
    README.write_text(new, encoding="utf-8")
    print(f"Đã cập nhật bảng README ({len(library)} tài liệu)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
