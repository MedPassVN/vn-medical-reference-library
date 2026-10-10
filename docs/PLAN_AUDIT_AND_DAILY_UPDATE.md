# Plan: Audit tài liệu hiện có & Routine cập nhật tài liệu mới hằng ngày

> Ngày lập: 2026-10-10 · Phạm vi: `library.json`, `raw_sources/`, `markdown_docs/`, `README.md`, `FIDELITY_REVIEW.md`, `images/`

---

## 0. Hiện trạng (khảo sát nhanh 2026-10-10)

| Hạng mục | Số liệu / phát hiện |
| :-- | :-- |
| `library.json` | 43 entry (38 local + 5 quốc tế `remoteOnly`: GINA, GOLD, ADA, KDIGO, ESC) — không trùng `refId` |
| `raw_sources/` ↔ `markdown_docs/` | 38 PDF ↔ 38 MD, khớp 1-1 với entry local; không có file mồ côi |
| `FIDELITY_REVIEW.md` | Đã soát 36/36 (kết thúc 2026-06-25): **12 FAIL**, 23 PASS-WITH-WARNINGS, 1 PASS |
| Sửa sau review | Commit `2f8555f` (sau review ~1 giờ) sửa 12 file MD, nhưng **chưa có vòng re-review** xác nhận các lỗi CRITICAL đã hết |
| Tài liệu mới 2026 | `REF_MOH_2026_QD2131` (COPD) & `REF_MOH_2026_QD2147` (Viêm phổi cộng đồng) — **chưa được rà soát fidelity**, `sourceUrl` **rỗng** |
| `README.md` | Ghi "41 tài liệu", **thiếu 2 tài liệu 2026** (thực tế 43) — README chưa sinh tự động từ `library.json` |
| Thay thế phiên bản | COPD 2023 (`QD2767`) có thể đã bị COPD 2026 (`QD2131`) thay thế, nhưng `library.json` không có trường trạng thái hiệu lực (`status`/`supersededBy`) |
| Khác | `REF_MOH_2020_QD2767` thực chất là tài liệu BV Nhi TW (refId gây nhầm với `REF_MOH_2023_QD2767`); 5 link quốc tế chưa kiểm tra còn sống; `images/MP-EME-001/` (~9 MB) không được tham chiếu ở đâu trong repo |

---

## PHẦN A — Audit lại tài liệu hiện có

> ✅ **Đã thực hiện 2026-10-10** — kết quả: [`audit/AUDIT_2026-10-10.md`](../audit/AUDIT_2026-10-10.md), chi tiết fidelity trong `FIDELITY_REVIEW.md`.

### A1. Audit tự động: tính toàn vẹn của registry (ngày 1)
Viết `scripts/validate_library.py` (không phụ thuộc gì ngoài stdlib + `pdfinfo`), chạy được cả local, CI và trong routine:
- Schema: mọi entry có đủ `refId, title, documentType, documentNumber, issuingAuthority, effectiveDate, tags, sourceUrl`; `localPath` bắt buộc trừ khi `remoteOnly: true`.
- Định dạng: `refId` khớp `^REF_(MOH|LAW|INT)_\d{4}_[A-Z0-9]+$`; `effectiveDate` là ISO date; `documentType` thuộc enum.
- Đồng bộ file: mỗi entry local ⇒ có PDF + MD; không có PDF/MD mồ côi; PDF mở được (`pdfinfo`), lấy số trang.
- Header MD khớp `documentNumber`/ngày trong `library.json`.
- Phát hiện mẫu lỗi đã biết trong `FIDELITY_REVIEW.md`: header trống (`Số: /QĐ-BYT`, `ngày tháng năm`), khối Mermaid lỗi cú pháp, bảng Markdown lệch số cột, chú thích "không có trong bản gốc".
- `sourceUrl` không rỗng, HEAD request còn sống (cảnh báo, không fail).
- Xuất `audit/registry_report.json` + exit code ≠ 0 nếu có lỗi chặn.

### A2. Đồng bộ README & metadata (ngày 1)
- Viết `scripts/build_readme_table.py` sinh bảng tra cứu trong README từ `library.json` (giữa 2 marker `<!-- LIBRARY_TABLE_START/END -->`) → hết lệch "41 vs 43".
- Bổ sung `sourceUrl` cho `QD2131`, `QD2147`.
- Thêm trường tùy chọn `status` (`active` | `superseded`) và `supersededBy`; đánh giá COPD 2023 vs 2026 (cần biên tập viên y khoa xác nhận trước khi đổi).
- Ghi chú/đề xuất đổi tên `REF_MOH_2020_QD2767` (tài liệu BV Nhi TW) — **chỉ đề xuất**, vì đổi `refId` phá link CDN của client; nếu đổi thì giữ alias.

### A3. Audit fidelity cho tài liệu chưa soát (ngày 2–3)
- Chạy agent `ref-doc-fidelity-checker` cho `REF_MOH_2026_QD2131` và `REF_MOH_2026_QD2147`, thêm mục #37, #38 vào `FIDELITY_REVIEW.md`.

### A4. Re-review 12 tài liệu FAIL (ngày 3–6)
Thứ tự theo mức nguy hiểm lâm sàng (danh sách "Ưu tiên sửa ngay" trong `FIDELITY_REVIEW.md`):
1. `QD2388` Thận mạn (liều Captopril/Candesartan) · 2. `QD1575` Tiêm chủng (ngưỡng CD4, nhãn tuổi) · 3. `QD3192` THA (Phụ lục 4) · 4. `QD5642` Truyền nhiễm (Thương hàn↔Lỵ) · 5. `QD2058` Tâm thần (ADHD↔Đái dầm) · 6. `QD1832` Huyết học (MDS↔Hodgkin) · 7. `QD5968` HIV (Bảng 15, Bảng 5) · 8. `QD3777`, `QD2767 (Nhi)` · 9. `QD2248`, `QD2760`, `QD5590`.

Với mỗi tài liệu: agent chỉ re-check **các finding đã ghi** + vùng diff của `2f8555f` → cập nhật verdict (FIXED / STILL-OPEN) trong một bảng "Re-review" mới của `FIDELITY_REVIEW.md`. Lỗi còn mở → mở GitHub issue (label `fidelity`, `critical`) để biên tập viên y khoa sửa. Agent vẫn **CHỈ ĐỌC**; việc sửa MD là bước riêng, có người duyệt.

### A5. Tài liệu quốc tế & tài sản phụ (ngày 6)
- Kiểm tra 5 link `remoteOnly` còn sống và còn là bản mới nhất (GINA/GOLD/ADA đều ra bản hằng năm → 2024 đã cũ); đề xuất cập nhật.
- Xác nhận mục đích `images/MP-EME-001/` (giữ, ghi chú README, hoặc chuyển chỗ).

### A6. Chốt chặn CI (ngày 7)
- GitHub Action `.github/workflows/validate.yml` chạy `validate_library.py` + `build_readme_table.py --check` trên mọi PR → lỗi registry không thể lọt vào `main` nữa.

**Đầu ra Phần A:** `audit/registry_report.json`, `FIDELITY_REVIEW.md` cập nhật (38/38 + bảng re-review), các issue `fidelity`, README tự sinh, CI xanh.

---

## PHẦN B — Routine chạy hằng ngày cập nhật tài liệu mới

### B1. Hình thức
- **Claude Code Routine** (scheduled trigger), mỗi lần chạy tạo **session mới** trên repo này.
- Lịch đề xuất: `CRON_TZ=Asia/Ho_Chi_Minh 52 6 * * *` (06:52 sáng mỗi ngày giờ VN; lệch khỏi phút :00 để tránh giờ cao điểm).
- Thông báo: push/email khi có tài liệu mới hoặc lỗi.

### B2. Luồng mỗi lần chạy
1. **Phát hiện** — quét nguồn chính thống tìm văn bản mới (Quyết định "Hướng dẫn chẩn đoán và điều trị…", "Hướng dẫn quy trình kỹ thuật…", Thông tư chuyên môn) ban hành từ lần chạy trước:
   - Cục Quản lý KCB `kcb.vn` (nguồn chính, đã dùng trong `sourceUrl`), Cổng TTĐT Bộ Y tế `moh.gov.vn`, CSDL văn bản pháp luật `vbpl.vn`, Công báo `congbao.chinhphu.vn`.
   - Quốc tế: trang release của GINA, GOLD, ADA, KDIGO, ESC (bản mới năm sau).
2. **Khử trùng lặp** — so `documentNumber` + ngày với `library.json` và với `audit/seen_sources.json` (log các văn bản đã xét/bị loại, để không đề xuất lại).
3. **Lọc phạm vi** — chỉ nhận tài liệu chuyên môn lâm sàng/pháp quy y tế phù hợp kỳ thi & lâm sàng; bỏ văn bản hành chính, nhân sự.
4. **Tải & chuẩn hoá** — tải PDF về `raw_sources/<refId>.pdf`, đặt `refId` theo quy ước `REF_MOH_<năm>_QD<số>`; kiểm tra PDF hợp lệ.
5. **Chuyển đổi** — PDF → `markdown_docs/<refId>.md` theo đúng định dạng hiện có (heading, bảng, Mermaid cho lưu đồ); giữ nguyên văn, không "sửa giúp" bản gốc.
6. **Đăng ký** — thêm entry vào `library.json` (đủ metadata + tags chuyên khoa + `VĐ xx`), đánh dấu `status: superseded` cho bản cũ nếu có (chỉ **đề xuất**, ghi rõ trong PR).
7. **Kiểm định** — chạy `validate_library.py`, `build_readme_table.py`, rồi agent `ref-doc-fidelity-checker` trên tài liệu mới; ghi kết quả vào `FIDELITY_REVIEW.md`.
8. **Đóng gói** — commit lên nhánh `routine/new-docs-YYYYMMDD` và **mở Pull Request** (không push thẳng `main`), mô tả: nguồn, số trang, verdict fidelity, các finding. Verdict FAIL → PR để draft + label `needs-medical-review`.
9. **Không có gì mới** → không tạo PR, chỉ cập nhật log (hoặc im lặng).

### B3. Nguyên tắc an toàn
- Mọi tài liệu mới **phải qua người duyệt (biên tập viên y khoa)** trước khi merge — routine chỉ đề xuất.
- Không xoá/ghi đè tài liệu cũ; không đổi `refId` hiện có (phá link CDN).
- Giới hạn mỗi lần chạy (vd ≤ 3 tài liệu) để fidelity check đủ kỹ; phần còn lại xếp hàng cho ngày sau.
- PDF > ~300 trang: chuyển đổi theo lô nhiều ngày, PR draft cho tới khi đủ.

### B4. Điều kiện tiên quyết (cần kiểm tra trước khi bật routine)
- **Network policy** của environment phải cho phép truy cập các host nguồn (`kcb.vn`, `moh.gov.vn`, `vbpl.vn`, `congbao.chinhphu.vn`, và các site quốc tế). Cần thử truy cập thật trong 1 lần chạy thủ công.
- Công cụ chuyển đổi trong container: `poppler-utils` (`pdftoppm`, `pdfinfo`), `pdfplumber`; nếu thiếu → thêm vào setup script / SessionStart hook.
- GitHub App có quyền push nhánh + mở PR trên `medpassvn/vn-medical-reference-library`.
- Prompt của routine lưu thành file trong repo (`.claude/routines/daily-update.md`) để version hoá, routine chỉ cần "đọc & làm theo file này".

### B5. Triển khai theo bước
1. Hoàn thành A1, A2, A6 (script + CI) — routine phụ thuộc vào chúng.
2. Viết `.claude/routines/daily-update.md` + `audit/seen_sources.json`.
3. **Chạy thử thủ công 1 lần** (dry-run: chỉ báo cáo, không mở PR) để kiểm tra mạng & chất lượng phát hiện.
4. Tạo Routine (cron hằng ngày, session mới mỗi lần), bật thông báo.
5. Theo dõi 1–2 tuần: tỉ lệ đề xuất sai, PR bị từ chối → tinh chỉnh bộ lọc nguồn.

---

## Mốc thời gian tóm tắt

| Ngày | Việc |
| :-: | :-- |
| 1 | A1 validator + A2 README tự sinh, bổ sung `sourceUrl` |
| 2–3 | A3 fidelity check 2 tài liệu 2026 |
| 3–6 | A4 re-review 12 tài liệu FAIL, mở issue cho lỗi còn mở |
| 6 | A5 link quốc tế, ảnh |
| 7 | A6 CI · B5.2 prompt routine · B5.3 dry-run |
| 8 | B5.4 bật routine hằng ngày |

## Câu hỏi cần chủ repo quyết định
1. Routine được **mở PR** (khuyến nghị) hay push thẳng `main`?
2. Ai là người duyệt y khoa cho PR / issue `fidelity`?
3. Danh sách nguồn ưu tiên — có cần thêm Sở Y tế / bệnh viện tuyến TW (vd BV Nhi TW, Bạch Mai)?
4. Giờ chạy routine (đề xuất 06:52 giờ VN) và kênh nhận thông báo.
5. Có thêm trường `status`/`supersededBy` vào `library.json` không (ảnh hưởng client CDN)?
