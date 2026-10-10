# Quy tắc chuyển đổi / sửa Markdown y khoa (BẮT BUỘC)

Áp dụng cho mọi agent tạo mới hoặc sửa `markdown_docs/<refId>.md`. Rút ra từ audit 2026-10-10: các lỗi nguy hiểm nhất (bảng BMI gái = bảng trai, 79 ô cân nặng sai, bảng kháng sinh tiêm tự viết, MMR cho trẻ SCID) đều do **sinh/tính số liệu thay vì chép từ PDF**.

## Nguyên tắc tối thượng
1. **`raw_sources/<refId>.pdf` là nguồn chân lý. CHÉP TỪ ẢNH PDF — KHÔNG BAO GIỜ tự sinh, tính, làm tròn, suy diễn hay lấy số liệu từ nguồn ngoài** (WHO, KDIGO, sách…). Mọi con số, ô bảng, nhãn node phải đọc được trên ảnh PDF.
2. Đọc PDF bằng ảnh: `pdftoppm -f N -l N -r 200 -png raw_sources/<refId>.pdf <tmp>/p` rồi Read PNG. Bảng số dày → 300 dpi + crop từng dải. Bảng là ảnh nhúng → `pdfimages -png -f N -l N`. Text-layer (`pdftotext -layout`) chỉ để định vị/đối chiếu — ảnh là chuẩn (text-layer hay mất ký hiệu như ≥, β, ô gộp).
3. **Giữ nguyên văn**, kể cả lỗi của bản gốc. Lỗi/mâu thuẫn rõ ràng → giữ nguyên + `*(Ghi chú biên tập: …)*`. Không gắn `[sic]` vào chữ mà PDF ghi đúng. Không thêm hàng, dòng liều, câu giải thích, tiêu đề tự đặt.
4. Ô không đọc rõ → ghi `[không đọc rõ trong bản gốc]`, không đoán.

## Định dạng
- Đầu file: `# <TIÊU ĐỀ TÀI LIỆU>` (H1 duy nhất cho tiêu đề), sau đó phần Quyết định (số, ngày, cơ quan ban hành, Điều 1–n) nguyên văn. Mục lục của PDF → danh sách thường, **không** thành heading.
- Heading `##`/`###`/`####` theo cấp mục của văn bản; số hiệu không có khoảng trắng thừa ("5.4.1.3." không phải "5.4. 1.3.").
- Bảng → bảng Markdown chuẩn: mỗi hàng đủ số cột, không dòng trống giữa bảng, `|` trong ô viết `\|`. Ô gộp: lặp nội dung ở mỗi hàng hoặc ghi `*(ô gộp, áp dụng cho …)*`.
- Lưu đồ/sơ đồ → khối ```mermaid``` `flowchart TD` đặt ngay dưới chú thích hình: id node chỉ chữ/số; **mọi nhãn node trong ngoặc kép** `A1["…"]`; nhãn cạnh có dấu ngoặc cũng đặt ngoặc kép `-->|"Có (+)"|`; không dùng `"` trong nhãn (thay `'`); xuống dòng `<br/>`. Nhãn nguyên văn chữ trong ảnh. Không được để hình chỉ còn tiêu đề.
- Không dùng ký tự Unicode Private Use (U+E000–U+F8FF, glyph Symbol/Wingdings): thay bằng ký tự chuẩn (→ ↓ ↑ • ✓ ▪ ≥ ≤ β…).
- In đậm thuật ngữ và số liệu then chốt như các file hiện có.

## Kiểm tra bắt buộc trước khi báo xong
- `python3 scripts/validate_library.py` → 0 ERROR; không có cảnh báo bảng lệch cột ở file của bạn.
- Mermaid: `node scripts/check_mermaid.js markdown_docs/<refId>.md` → `invalid: 0` (cài đặt: xem `daily-update.md` mục Chuẩn bị).
- Render ảnh vào **thư mục tạm riêng của bạn** (vd `/tmp/rt/<refId>-<vai trò>/`), không dùng chung với agent khác; trước khi đọc ảnh, xác nhận nội dung trang đúng tài liệu.
- Không dùng `git stash`, `git checkout -- <file>`, `git reset` (working tree có thể dùng chung với agent khác).
- Tự đọc lại vùng đã viết, đối chiếu ảnh lần cuối.
