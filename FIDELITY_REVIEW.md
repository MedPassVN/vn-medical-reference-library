# Báo cáo rà soát độ trung thực Markdown ↔ PDF gốc

> Kho: `vn-medical-reference-library` · Công cụ: agent `ref-doc-fidelity-checker` (full vision, đọc 100% trang qua `pdftoppm`→PNG→vision, đối chứng số liệu).
> Bắt đầu: 2026-06-25 · Phạm vi mục tiêu: **36/36 tài liệu** (raw_sources ↔ markdown_docs).
> **Trạng thái: đã quét 8/36.** File này để **double-check** và làm danh sách sửa. Cập nhật dần khi quét tiếp.
>
> ⚠️ **Nguyên tắc rà soát:** chỉ đọc, KHÔNG chỉnh sửa file gốc/markdown. PDF gốc là chuẩn. Mọi chỗ markdown khác bản gốc đều bị cờ — **kể cả khi markdown "tự sửa cho đúng y khoa"** (vd `ln10→log10`, `mmHg→mmol/L`, `Dưới→Từ`); khuyến nghị giữ đúng nguyên văn gốc (kèm chú thích), không tự ý sửa văn bản pháp quy.

## Quy ước mức độ
| Mức | Ý nghĩa | Hành động |
| :-- | :-- | :-- |
| 🔴 CRITICAL | Sai lệch gây nguy hiểm lâm sàng / sai bản chất | Phải sửa trước khi dùng |
| 🟠 HIGH | Thiếu/bịa nội dung đáng kể, sai cấu trúc lớn | Nên sửa trước khi dùng |
| 🟡 MEDIUM | Lỗi bảng/format, thiếu nhấn mạnh, lỗi nhẹ về nghĩa | Nên sửa |
| ⚪ LOW | Chính tả, khoảng trắng, tiểu tiết trình bày | Tùy chọn |

## Bảng tổng hợp
| # | refId | Tài liệu | Trang | Verdict | 🔴 | 🟠 | 🟡 | ⚪ |
| :-: | :-- | :-- | :-: | :-- | :-: | :-: | :-: | :-: |
| 1 | REF_MOH_2019_QD3310 | Viêm gan vi rút B | 8 | 🟡 PASS-WITH-WARNINGS | 0 | 0 | 1 | 3 |
| 2 | REF_MOH_2021_QD5165 | Bệnh Lậu | 8 | 🟢 PASS | 0 | 0 | 0 | 2 |
| 3 | REF_MOH_2025_QD1840 | Cúm mùa | 12 | 🟡 PASS-WITH-WARNINGS | 0 | 0 | 1 | 3 |
| 4 | REF_MOH_2010_QD3192 | Tăng huyết áp | 19 | 🔴 **FAIL** | 2 | 2 | 0 | 2 |
| 5 | REF_MOH_2023_QD1575 | Khám sàng lọc trước tiêm chủng trẻ em | 21 | 🔴 **FAIL** | 4 | 3 | 2 | 1 |
| 6 | REF_MOH_2025_QD1019 | Bệnh Sởi | 21 | 🟡 PASS-WITH-WARNINGS | 0 | 2 | 2 | 2 |
| 7 | REF_MOH_2020_QD4128 | DMKT hội chẩn từ xa | 23 | 🟡 PASS-WITH-WARNINGS | 0 | 1 | 2 | 1 |
| 8 | REF_MOH_2022_QD2558 | Võng mạc đái tháo đường | 25 | 🟡 PASS-WITH-WARNINGS | 0 | 1 | 0 | 3 |

**Mẫu lỗi lặp lại (lưu ý chung):**
1. **Header để trống số/ngày quyết định** (`Số: /QĐ-BYT`, `ngày tháng năm`) — gặp ở nhiều file (1575, 2558, 1840…).
2. **Markdown âm thầm "sửa" lỗi/diễn đạt của bản gốc** (vd `ln10`→`log10`, `mmHg`→`mmol/L`, `Dưới`→`Từ`) — thường đúng y khoa nhưng khác nguyên văn văn bản pháp quy → giữ nguyên văn + chú thích, KHÔNG tự sửa.
3. **Lưu đồ/sơ đồ trong PDF hay bị bỏ trống** (chỉ còn tiêu đề) hoặc chuyển thành danh sách — gặp ở 3192 (Sơ đồ 1, PL3), 1019 (PL1), 2558.
4. **🔴 NGUY HIỂM NHẤT — Bảng bị lệch cột / mất hàng / đổi nhãn nhóm tuổi:** 3192 (lệch cột PL4 → sai ngưỡng dùng thuốc), 1575 (đổi nhãn nhóm tuổi bảng nhịp thở/nhịp tim + lệch ngưỡng CD4), 2558 (mất 2 hàng giai đoạn), 4128 (6 ô tên kỹ thuật trống). Đây là nhóm lỗi cần soi kỹ nhất ở các bảng.

---

## 1. REF_MOH_2019_QD3310 — Viêm gan vi rút B (8 trang) — 🟡 PASS-WITH-WARNINGS
Header/metadata khớp `library.json` (3192… → 3310/QĐ-BYT, 29/07/2019). Toàn bộ liều thuốc & ngưỡng (HBV-DNA 10⁴/10⁵/10⁶ copies/ml, bảng liều ETV trẻ em 7 mức, Tenofovir 300mg, Entecavir 0,5mg…) **khớp**.

- 🟡 **MEDIUM** — `ln10` → `log10` (PDF tr.6 ⟶ MD dòng 143). PDF in "ln10" (gần như chắc lỗi đánh máy gốc), MD sửa thành "log10" (đúng y khoa). Các số `>1 / <1 (12 tuần) / <2 (24 tuần)` khớp. *Đề xuất:* giữ `log10` + chú thích "(bản gốc in 'ln10')".
- ⚪ **LOW** — MD dòng 56 thêm "có đủ cả 2 tiêu chuẩn sau" so với PDF tr.3 "khi:" (2 điều kiện nối bằng "và"). Đúng nghĩa.
- ⚪ **LOW** — Lưu đồ quản lý trẻ HBV mạn (PDF tr.4) chuyển thành danh sách + thêm nhãn "Lưu đồ quản lý…" (MD 80–92). Node/nhánh giữ đúng.
- ⚪ **LOW** — Chuẩn hóa dấu thập phân `0.15`→`0,15` (bảng liều ETV).

## 2. REF_MOH_2021_QD5165 — Bệnh Lậu (8 trang) — 🟢 PASS
Mọi liều kháng sinh (Ceftriaxon 250mg, Spectinomycin 2g, Cefixim 400mg, Azithromycin 1g; phác đồ thất bại điều trị; liều mắt trẻ sơ sinh Ceftriaxon 50mg/kg tối đa 150mg…) **khớp**. Cấu trúc đầy đủ, không bịa.

- ⚪ **LOW** — Chính tả: MD dòng 33 "**THƯ TRƯỞNG**" → đúng là "**THỨ TRƯỞNG**" (PDF tr.1). *Đề xuất:* sửa.
- ⚪ **LOW** — Trường ngày để trống theo bản gốc; tiêu đề H1 đã có "5165/QĐ-BYT", "2021" khớp library.json.

## 3. REF_MOH_2025_QD1840 — Cúm mùa (12 trang) — 🟡 PASS-WITH-WARNINGS
Hai bảng liều (điều trị + dự phòng) và mọi liều kháng vi rút **khớp**: Oseltamivir (người lớn 75mg×2; trẻ ≤15/15–23/23–40/>40kg; sơ sinh & sinh non theo mg/kg), Zanamivir 10mg×2, Baloxavir (<20kg 2mg/kg; 20–80kg 40mg; >80kg 80mg, liều duy nhất). Chống chỉ định không đảo nghĩa.

- 🟡 **MEDIUM** — Header để trống số/ngày QĐ (MD dòng 4, 6, 36, 93) trong khi PDF đã điền đủ. *Đề xuất:* điền "1840/QĐ-BYT" và "ngày 03 tháng 6 năm 2025" (khớp library.json).
- ⚪ **LOW/MEDIUM** — Bảng liều **dự phòng** Oseltamivir bracket 10–15kg: PDF "**Dưới** 10-15kg: 30mg/ngày" → MD "**Từ** 10-15kg" (MD dòng 248 / PDF tr.11). Số liệu giống hệt, chỉ đổi giới từ. *Đề xuất:* giữ nguyên văn hoặc chú thích.
- ⚪ **LOW** — Danh sách ban biên soạn (MD dòng 52) chép tiêu đề "…BỆNH SỞI" — **lỗi có sẵn trong PDF gốc** (tr.4); MD chuyển trung thực → không phải lỗi chuyển đổi, chỉ nên đính chính ở bản gốc.
- ⚪ **LOW** — Mục lục MD (dòng 42–47) bỏ số trang (chấp nhận với định dạng Markdown).

## 4. REF_MOH_2010_QD3192 — Tăng huyết áp (19 trang) — 🔴 FAIL
Phần thân và **toàn bộ bảng liều thuốc** (uống PL6.1 + tĩnh mạch cấp cứu PL6.2: Nitroglycerin/Nicardipine/Nitroprusside/Esmolol/Labetalol/Hydralazine/Enalaprilat — từng tốc độ truyền & liều tối đa) **khớp**. Ngưỡng chẩn đoán, phân độ HA, phân tầng nguy cơ, HA mục tiêu (<140/90; <130/80), bảng chỉ định/chống chỉ định (PL5.1, 5.2) **khớp**. NHƯNG:

- 🔴 **CRITICAL** — Phụ lục 4 (bảng chiến lược điều trị theo độ HA & nguy cơ), hàng **"Có ≥3 YTNCTM / HCCH / tổn thương cơ quan đích"** bị **lệch trái 1 cột** (MD dòng 192 / PDF tr.13).
  - PDF: cột *HA bình thường* = chỉ "thay đổi lối sống, kiểm soát YTNC" (KHÔNG thuốc); *Tiền THA* = "+ **Cân nhắc** điều trị thuốc".
  - MD (sai): *HA bình thường* = "+ Cân nhắc điều trị thuốc"; *Tiền THA* = "+ Điều trị thuốc" → **overtreatment ở ngưỡng HA thấp hơn 1 bậc**.
  - *Đề xuất:* dịch trả các ô về đúng cột.
- 🔴 **CRITICAL** — Phụ lục 4, hàng **"Có đái tháo đường"** lệch trái 1 cột (MD dòng 193 / PDF tr.13).
  - PDF: *HA bình thường* = chỉ "lối sống + kiểm soát YTNC".
  - MD (sai): *HA bình thường* = "+ **Điều trị thuốc**" → chỉ định thuốc ngay ở HA bình thường cho bệnh nhân ĐTĐ.
  - *Đề xuất:* bỏ "+ Điều trị thuốc" ở ô HA bình thường hàng ĐTĐ.
- 🟠 **HIGH** — **Sơ đồ 1 "Quy trình điều trị tăng huyết áp"** (PDF tr.6) bị bỏ hoàn toàn, MD (~dòng 99) chỉ còn tiêu đề. *Đề xuất:* tái dựng bằng ```mermaid``` đủ node/nhánh.
- 🟠 **HIGH** — **Phụ lục 3 "Quy trình 4 bước điều trị THA tại tuyến cơ sở"** (PDF tr.11) bị bỏ hoàn toàn, MD (~dòng 182) chỉ còn tiêu đề. *Đề xuất:* bổ sung đủ 4 bước.
- ⚪ **LOW** — Phụ lục 5.1: thứ tự cột MD khác PDF (nội dung dấu X vẫn đúng). *Đề xuất:* giữ thứ tự cột như gốc.
- ⚪ **LOW** — Phụ lục 5.3 "Sơ đồ phối hợp thuốc" (PDF tr.16) chỉ còn tiêu đề trong MD (dòng 225). *Đề xuất:* tái dựng quan hệ phối hợp.

## 5. REF_MOH_2023_QD1575 — Khám sàng lọc trước tiêm chủng trẻ em (21 trang) — 🔴 FAIL
Thân bài (mục I–IV) và 4 bảng kiểm (Phụ lục I–IV) trung thực. Nhưng các bảng phụ lục cuối sai nặng:

- 🔴 **CRITICAL** — Bảng CD4 (Phụ lục VIII) sai ngưỡng tế bào tuyệt đối hàng "Suy giảm nặng" (PDF tr.20 ⟶ MD dòng 467). PDF: `<1500 / <750 / <350 / <200`; MD (sai, lệch): `<750 / <350 / <200 / <200`. → sai ngưỡng phân loại SGMD nặng quyết định chống chỉ định vắc xin sống. *Sửa về 1500/750/350/200.*
- 🔴 **CRITICAL** — Bảng CD4 sai TÊN hàng: PDF "Suy giảm tiến triển" → MD "Suy giảm vừa" (MD dòng 466). *Đổi lại đúng thuật ngữ.*
- 🔴 **CRITICAL** — Bảng nhịp thở (Phụ lục V) đổi nhãn nhóm tuổi sai (PDF tr.17 ⟶ MD 403–408): PDF cột "Tuổi (năm)" Sơ sinh/`<1`/`1-2`/`2-5`/`5-12`/`>12`; MD tự đổi sang "tháng" (`<2 tháng`/`2-11 tháng`/`12-24 tháng`…) → gán sai ngưỡng nhịp thở cho nhóm tuổi. *Khôi phục nhãn gốc theo năm.*
- 🔴 **CRITICAL** — Bảng nhịp tim (Phụ lục VI) đổi nhãn nhóm tuổi sai tương tự (PDF tr.18 ⟶ MD 420–425). *Giá trị nhịp tim đúng nhưng gán sai độ tuổi → khôi phục nhãn gốc.*
- 🟠 **HIGH** — Phụ lục VII mất cột "Phân loại" (dòng tế bào T/B/bổ thể/thực bào), bịa nhãn hàng khác gốc (PDF tr.19 ⟶ MD 435–441).
- 🟠 **HIGH** — Phụ lục VII đảo nghĩa bệnh: PDF "Hội chứng **tăng** IgM" → MD "**giảm** IgM" (MD 437). *Sửa lại "tăng IgM".*
- 🟠 **HIGH** — Danh sách ban biên soạn sai tên/thiếu/bịa thành viên + bịa cột "Vai trò" không có trong gốc (PDF tr.2–3 ⟶ MD 58–81). *Dựng lại đúng 3 nhóm + đủ 6 thư ký theo gốc.*
- 🟡 MEDIUM: mâu thuẫn ngưỡng corticoid `≥2` vs `>2 mg/kg/ngày` — vốn có trong bản gốc, MD chép đúng (không phải lỗi MD). 🟡 chú thích nguồn rút gọn. ⚪ LOW: cấu trúc CVID nhỏ.
- *Các số liệu trọng yếu khác đã soát chéo: khớp.*

## 6. REF_MOH_2025_QD1019 — Bệnh Sởi (21 trang) — 🟡 PASS-WITH-WARNINGS
Không có lỗi CRITICAL về liều. Mọi liều (vitamin A 50/100/200 nghìn IU, Paracetamol/Ibuprofen, Mannitol, IVIG, NaCl 3%...) khớp.

- 🟠 **HIGH** — Bảng 1 đổi ranh giới tuổi liều **vitamin A** (PDF tr.11 ⟶ MD 230–231): PDF "6–11 tháng → 100.000 IU" & "≥12 tháng → 200.000 IU"; MD (sai) "6–12 tháng" & ">12 tháng" → trẻ đúng 12 tháng bị sai/mơ hồ liều. *Sửa đúng "6–11 tháng" và "≥12 tháng".*
- 🟠 **HIGH** — Phụ lục 1 (lưu đồ phân loại & sàng lọc) bị lược bỏ toàn bộ nội dung, MD chỉ còn tiêu đề + nguồn (PDF tr.18 ⟶ MD 411–412). *Tái dựng đủ tiêu chí cảnh báo + 5 bước.*
- 🟡 MEDIUM — Mermaid Phụ lục 2 node "chỉ định đặt NKQ" thiếu 2/4 tiêu chí (thiếu "Glasgow <10", "thất bại Oxy/NCPAP/HFNC") (PDF tr.19 ⟶ MD 420). 🟡 MEDIUM — Bảng 1 viết lại nhãn hàng 4 (MD 232).
- ⚪ LOW — NaCl 3%: MD tự sửa đơn vị `mmHg`→`mmol/L` (lỗi gốc PDF tr.14) (MD 325) — nên chú thích; lỗi chính tả "Viêm thanh quan" (MD 159).
- *Các số liệu trọng yếu khác đã soát chéo: khớp.*

## 7. REF_MOH_2020_QD4128 — Danh mục KT hội chẩn/tư vấn KCB từ xa (23 trang) — 🟡 PASS-WITH-WARNINGS
Tài liệu là danh mục/bảng (không có liều). Tổng hợp 99 Nội tiết / 249 Phụ sản / 248 Mắt = 596 KT; mã STT & tên kỹ thuật khớp ở mức rất cao.

- 🟠 **HIGH** — 6 ô "Tên kỹ thuật" bị BỎ TRỐNG trong MD (PDF có đủ): STT 116 "Phẫu thuật cắt âm vật phì đại" (MD 288), 154 "Lấy dị vật âm đạo" (329), 156 "Làm lại thành âm đạo, tầng sinh môn" (331), 225 "Gây mê để khám" (595), 234 "Phẫu thuật điều trị hở mi" (601), 247 "Đo lưu huyết mạch máu đáy mắt bằng dople màu" (608). *Điền lại đúng nguyên văn.*
- 🟡 MEDIUM — Thiếu tiêu đề nhóm "Ung bướu" (Mắt, trước STT 226). 🟡 MEDIUM — Nhãn cột bảng Nội tiết & Phụ sản mất nguồn TT21: PDF "STT theo TT 43, 21" → MD chỉ "Thông tư 43".
- ⚪ LOW — mở rộng vài chữ viết tắt (DK→dịch kính, BVM→bong võng mạc...).
- *Các nội dung trọng yếu khác đã soát chéo: khớp.*

## 8. REF_MOH_2022_QD2558 — Bệnh võng mạc đái tháo đường (25 trang) — 🟡 PASS-WITH-WARNINGS
Trung thực gần tuyệt đối về số liệu (phân độ giai đoạn, mục tiêu ĐTĐ, lịch tái khám, chống chỉ định FA MLCT<15, Fenofibrate 145–200mg). 

- 🟠 **HIGH** — Bảng 5 (lịch tái khám) thiếu 2 dòng giai đoạn đầu: "Không có bệnh VMĐTĐ" và "Không tăng sinh - nhẹ" (PDF tr.20 ⟶ MD 382–388). Khoảng tái khám trùng dòng "vừa" nên rủi ro thấp, nhưng thiếu khuyến cáo so với gốc. *Thêm đủ 2 dòng.*
- ⚪ LOW — Ban biên soạn bỏ tên riêng (chỉ giữ chức danh) (MD 61–66). ⚪ LOW — Sơ đồ phân tuyến dùng `$$\downarrow$$` LaTeX (có thể không hiển thị trên CDN) (MD 358–378). ⚪ LOW — Header trống số/ngày QĐ (MD 8, 52, 121).
- *Các số liệu trọng yếu khác đã soát chéo: khớp.*

---

## Còn lại cần quét (28 file)
31→299 trang (24 file): REF_MOH_2024_QD1470, REF_MOH_2023_QD2248, REF_MOH_2020_QD1851, REF_MOH_2024_QD3777, REF_LAW_2023_KCB, REF_MOH_2020_QD5481, REF_MOH_2015_QD5642, REF_MOH_2023_QD2767, REF_MOH_2023_QD2760, REF_MOH_2017_TT51, REF_MOH_2017_QD5731, REF_MOH_2015_QD40, REF_MOH_2017_QD5590, REF_MOH_2021_QD5968, REF_MOH_2024_QD3312, REF_MOH_2025_QD2598, REF_MOH_2016_QD4484, REF_MOH_2024_QD2388, REF_MOH_2020_QD2058, REF_MOH_2024_QD162, REF_MOH_2014_QD361, REF_MOH_2015_QD708, REF_MOH_2015_QD315, REF_MOH_2015_QD5643.

Giant (474–892 trang, xử lý đặc biệt): REF_MOH_2023_QD4416 (474), REF_MOH_2022_QD1832 (528), REF_MOH_2020_QD2767 (533), REF_MOH_2014_QD1904 (892).
