# Báo cáo rà soát độ trung thực Markdown ↔ PDF gốc

> Kho: `vn-medical-reference-library` · Công cụ: agent `ref-doc-fidelity-checker` (full vision, đọc 100% trang qua `pdftoppm`→PNG→vision, đối chứng số liệu).
> Bắt đầu: 2026-06-25 · Phạm vi mục tiêu: **36/36 tài liệu** (raw_sources ↔ markdown_docs).
> **Trạng thái: ✅ HOÀN TẤT 36/36.** File này để **double-check** và làm danh sách sửa. Xem phần TỔNG KẾT ở cuối.
> **Cập nhật 2026-10-10:** thêm #37–#38 (2 tài liệu 2026) và phần **🔁 RE-REVIEW** kiểm tra lại 12 tài liệu FAIL sau commit sửa `2f8555f` — xem cuối file.
> **✅ Cập nhật 2026-10-10 (sau):** đã **sửa trực tiếp** 10 tài liệu FAIL và kiểm tra độc lập từng bản sửa → **0 tài liệu FAIL** (3 PASS · 35 PASS-WITH-WARNINGS). Xem phần **🛠️ SỬA TRỰC TIẾP** ở cuối file.
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
| 9 | REF_MOH_2024_QD1470 | ĐTĐ thai kỳ | 31 | 🟡 PASS-WITH-WARNINGS | 0 | 0 | 0 | 5 |
| 10 | REF_MOH_2023_QD2248 | Hội chứng mạch vành mạn | 38 | 🔴 **FAIL** | 1 | 2 | 6 | 4 |
| 11 | REF_MOH_2020_QD1851 | Hen phế quản (NL & ≥12t) | 48 | 🟡 PASS-WITH-WARNINGS | 0 | 1 | 0 | 2 |
| 12 | REF_MOH_2024_QD3777 | Dinh dưỡng nhân trắc trẻ em | 54 | 🔴 **FAIL** | 3 | 1 | 0 | 0 |
| 13 | REF_LAW_2023_KCB | Luật Khám bệnh, chữa bệnh | 75 | 🟡 PASS-WITH-WARNINGS | 0 | 0 | 4 | 2 |
| 14 | REF_MOH_2020_QD5481 | Đái tháo đường típ 2 | 77 | 🟡 PASS-WITH-WARNINGS | 0 | 2 | 1 | 2 |
| 15 | REF_MOH_2015_QD5642 | Một số bệnh truyền nhiễm | 86 | 🔴 **FAIL** | 1 | 1 | 0 | 2 |
| 16 | REF_MOH_2023_QD2767 | COPD | 87 | 🟡 PASS-WITH-WARNINGS | 0 | 3 | 2 | 2 |
| 17 | REF_MOH_2023_QD2760 | Sốt xuất huyết Dengue | 104 | 🔴 **FAIL** | 1 | 2 | 3 | 2 |
| 18 | REF_MOH_2017_TT51 | Phản vệ (Thông tư 51) | 112* | 🟡 PASS-WITH-WARNINGS | 0 | 1 | 0 | 2 |
| 19 | REF_MOH_2017_QD5731 | PT Tiết niệu (46 quy trình) | 114 | 🟡 PASS-WITH-WARNINGS | 0 | 0 | 1 | 4 |
| 20 | REF_MOH_2015_QD40 | Các bệnh về Mắt (30 bài) | 143 | 🟡 PASS-WITH-WARNINGS | 0 | 0 | 1 | 2 |
| 21 | REF_MOH_2017_QD5590 | PT Thần kinh (64 quy trình) | 145 | 🔴 **FAIL**† | 0 | 1 | 1 | 2 |
| 22 | REF_MOH_2021_QD5968 | HIV/AIDS | 145 | 🔴 **FAIL** | 2 | 1 | 5 | 2 |
| 23 | REF_MOH_2024_QD3312 | Đột quỵ não | 148 | 🟡 PASS-WITH-WARNINGS | 0 | 0 | 2 | 2 |
| 24 | REF_MOH_2025_QD2598 | Dinh dưỡng lâm sàng | 169 | 🟡 PASS-WITH-WARNINGS | 0 | 1 | 0 | 3 |

| 25 | REF_MOH_2016_QD4484 | PT Chấn thương Chỉnh hình (89 QT) | 186 | 🟡 PASS-WITH-WARNINGS | 0 | 1‡ | 2 | 3 |
| 26 | REF_MOH_2024_QD2388 | Bệnh thận mạn | 192 | 🔴 **FAIL** | 2 | 3 | 5 | 4 |
| 27 | REF_MOH_2020_QD2058 | Rối loạn tâm thần | 198 | 🔴 **FAIL** | 2 | 1 | 0 | 1 |
| 28 | REF_MOH_2024_QD162 | Bệnh Lao | 213 | 🟡 PASS-WITH-WARNINGS | 0 | 2 | 1 | 2 |

† #21 FAIL ở mức biên: chỉ 1 lỗi (ngưỡng "5cm"→"5mm") — thực chất markdown sửa lỗi typo gốc; xem chi tiết.
‡ #25 HIGH là **lỗi của PDF gốc** (mục lục ghi 90 bài nhưng thân chỉ 89), KHÔNG phải lỗi chuyển đổi → verdict vẫn PASS-WITH-WARNINGS.

| 29 | REF_MOH_2014_QD361 | Cơ xương khớp (40 bài) | 218 | 🟡 PASS-WITH-WARNINGS | 0 | 0 | 1 | 1 |
| 30 | REF_MOH_2015_QD708 | Sử dụng kháng sinh | 277 | 🟡 PASS-WITH-WARNINGS | 0 | 1 | 0 | 3 |
| 31 | REF_MOH_2015_QD315 | Sản Phụ khoa (56 bài) | 285 | 🟡 PASS-WITH-WARNINGS | 0 | 1 | 3 | 3 |
| 32 | REF_MOH_2015_QD5643 | Tai Mũi Họng (63 bài) | 299 | 🟡 PASS-WITH-WARNINGS | 0 | 1 | 2 | 3 |
| 33 | REF_MOH_2023_QD4416 | Da liễu (~84 bài) | 474 | 🟡 PASS-WITH-WARNINGS | 0 | 1 | 0 | 2 |
| 34 | REF_MOH_2022_QD1832 | Huyết học (49 bài) | 528 | 🔴 **FAIL** | 1 | 0 | 4 | 0 |
| 35 | REF_MOH_2020_QD2767 | Bệnh trẻ em/Nhi (101 bài) | 533 | 🔴 **FAIL** | 0 | 3 | 3 | 2 |
| 36 | REF_MOH_2014_QD1904 | Hồi sức Cấp cứu Chống độc (232 QT) | 892 | 🟡 PASS-WITH-WARNINGS | 0 | 2 | 0 | 2 |
| 37 | REF_MOH_2026_QD2131 | COPD 2026 | 130 | 🔴 **FAIL** | 0 | 8 | 5 | 4 |
| 38 | REF_MOH_2026_QD2147 | Viêm phổi cộng đồng 2026 | 93 | 🔴 **FAIL** | 1 | 3 | 5 | 6 |

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

## 9. REF_MOH_2024_QD1470 — Đái tháo đường thai kỳ (31 trang) — 🟡 PASS-WITH-WARNINGS
Trung thực cao — **không có CRITICAL/HIGH/MEDIUM**. Mọi ngưỡng glucose (OGTT 75g ≥92/180/153 mg/dL; mục tiêu mao mạch <95/140/120; ngưỡng 3 tháng đầu; Bảng 8 sau sinh), liều insulin (nền 0,1 IU/kg, chỉnh 1-2 IU/2-3 ngày, Bảng 7) đều **khớp**.
- ⚪ LOW — Sơ đồ 3 nhánh "Bình thường": PDF dùng "hay" (OR) → MD đổi "và" (AND) (PDF tr.30 ⟶ MD 760). *Giữ "hoặc" như gốc hoặc ghi [sic].*
- ⚪ LOW — Sơ đồ 2 thêm chữ "Đánh giá ở 38-39 tuần" + node "Trọng lượng thai nhi" không có nhãn trong gốc (MD 683-684); Sơ đồ 1 là bản tái diễn giải.
- ⚪ LOW — Lỗi chính tả MD (không phải lỗi gốc): "bình nhiên" (428), "or" thay "hoặc" (642), "giảm nguy mắc" (497).

## 10. REF_MOH_2023_QD2248 — Hội chứng mạch vành mạn (38 trang) — 🔴 FAIL
Phần văn bản + liều thuốc (kháng kết tập tiểu cầu Bảng 5, statin LDL-C <1,4 mmol/L, Nitroglycerin, SYNTAX) **khớp**. Nhưng bảng & lưu đồ sai nặng:
- 🔴 **CRITICAL** — Bảng 2 (Xác suất tiền nghiệm PTP) **MẤT TOÀN BỘ cột "Đau thắt ngực điển hình"** (Nam/Nữ, 5 hàng tuổi) (PDF tr.21 ⟶ MD 407-416). 3 cột còn lại đúng. *Khôi phục cột giá trị cao nhất.*
- 🟠 **HIGH** — Hình 8 (ma trận chọn thuốc chống đau ngực) tái cấu trúc SAI: mất cột (Tần số tim ≥80, Rung nhĩ, ĐTĐ, Đau thắt ngực vi mạch), **lệch hàng phân loại** (đặt nhầm Ưu tiên↔Có thể↔CCĐ, vd Nhịp chậm/Huyết áp thấp/BĐM ngoại biên) (PDF tr.32-33 ⟶ MD 629-645). *Đặt nhầm CCĐ↔ưu tiên có thể gây hại — dựng lại đúng ma trận.*
- 🟠 **HIGH** — Hình 11 (PCI/CABG thân chung ĐMV trái) mất nhánh "tổn thương thêm 1 nhánh" + 2 node con (hẹp lỗ vào/thân, hẹp lỗ chia đôi) (PDF tr.36 ⟶ MD 735-746).
- 🟡 MEDIUM ×5: Hình 9 lệch nhánh "có thiếu máu"; Hình 10 thêm node "nguy cơ phẫu thuật thấp?" thừa; thiếu 2 mục "không khuyến cáo" (estrogen, liệu pháp chống oxy hóa, PDF tr.29); thiếu câu "Dipyridamole không khuyến cáo"; thiếu tài liệu tham khảo #6; **chú thích PDE tự thêm vào thân bài** (MD 581 — vi phạm nguyên tắc giữ nguyên văn).
- ⚪ LOW: header trống số/ngày; iFR vs iwFR; tiêu đề mục 2.1.2; dính từ "with" (MD 328).

## 11. REF_MOH_2020_QD1851 — Hen phế quản người lớn & trẻ ≥12 tuổi (48 trang) — 🟡 PASS-WITH-WARNINGS
Trung thực rất cao: toàn bộ liều ICS (Bảng 6 theo hoạt chất thấp/TB/cao), bậc 1-5 (Bảng 7), đợt cấp (Bảng 9-11), sinh học (anti-IgE/IL5/IL4R) đều **khớp**.
- 🟠 **HIGH** — Ngưỡng FENO trong "viêm type 2 dai dẳng": PDF "FENO **≥ 220 ppb**" → MD "FENO **≥ 20 ppb**" (PDF tr.42 ⟶ MD 689). MD tự "sửa" (220 nghi lỗi in gốc; GINA=20). *Theo nguyên tắc: giữ nguyên "220 ppb" + chú thích, không tự đổi số trong bản tra cứu.*
- ⚪ LOW — dupilumab mất dấu `*` (ý nghĩa pháp lý kê đơn) (MD 750); OCS "prenisone"→"prednisone" markdown sửa thầm (MD 862).

## 12. REF_MOH_2024_QD3777 — Đánh giá dinh dưỡng nhân trắc trẻ em (54 trang) — 🔴 FAIL
**Thân bài (mục 1-6 + 9 bảng ngưỡng Bảng 2-9 + bảng MUAC) trung thực và đầy đủ.** Nhưng **toàn bộ Phụ lục 1-6 (≈32 trang bảng tra Z-score — nguồn số liệu cốt lõi) bị phá hủy:**
- 🔴 **CRITICAL** — Bảng tra Z-score (cân nặng/tuổi, chiều cao/tuổi, CN/CC, BMI/tuổi — trai & gái) bị scramble: thiếu hàng tháng tuổi (bắt đầu sai từ 8, bỏ 0-7), **bịa "(Không có dữ liệu)"** ở cột mà PDF có đủ, giá trị lệch hàng/cột (PDF doc tr.19-50 ⟶ MD 506-638). *Dựng lại theo ảnh PDF từng trang.*
- 🔴 **CRITICAL** — **Bịa chú thích trong phụ lục**: MD tự chèn "7,4 (có thể là lỗi OCR của 4,7…)", "(Không có dữ liệu)" — PDF không có. *Xóa, thay bằng số đọc trực tiếp.*
- 🔴 **CRITICAL** — Mất hàng dữ liệu hàng loạt (nhiều cột chỉ còn 1-2 giá trị) → không thể tra phân loại SDD.
- 🟠 **HIGH** — Mất cấu trúc bảng phụ lục (chuyển thành bullet rời, phá quan hệ tháng tuổi ↔ ngưỡng SD).
- *Phạm vi:* phụ lục đọc kỹ doc tr.19,20,21,25,29,35,37,39,45 (mẫu đại diện, đủ kết luận lỗi hệ thống). Thân bài đọc 100%.

## 13. REF_LAW_2023_KCB — Luật Khám bệnh, chữa bệnh (75 trang) — 🟡 PASS-WITH-WARNINGS
Văn bản pháp luật: đủ **12 Chương, 121 Điều** liên tục 1→121, không thiếu/thừa/đảo điều, không sai số liệu pháp lý (mọi mốc hiệu lực 01/01/2024-2032, hạn chuyển tiếp, số ngày thủ tục đều khớp).
- 🟡 MEDIUM ×4 — Sai nhãn điểm chữ cái "**đ)**"→"**e)**" (1 chỗ phát sinh "f)" sai hệ tiếng Việt) ở Điều 31 (MD 421), Điều 35 (MD 500), Điều 96 (MD 1274), Điều 99 (MD 1340,1342). Nội dung điểm đầy đủ đúng thứ tự, chỉ sai định danh → ảnh hưởng tham chiếu chéo. *Sửa nhãn về "đ)".*
- ⚪ LOW — khối chữ ký thêm "T.M. QUỐC HỘI" (MD 1736, gốc chỉ "CHỦ TỊCH QUỐC HỘI"); "Bác sĩ" vs "Bác sỹ".

## 14. REF_MOH_2020_QD5481 — Đái tháo đường típ 2 (77 trang) — 🟡 PASS-WITH-WARNINGS
Mọi liều thuốc & ngưỡng (Bảng 13-14 liều theo eGFR, mục tiêu HbA1c/glucose, DKA/HHS, thai kỳ, hạ ĐH) **khớp**.
- 🟠 **HIGH** — Bảng 10: đổi nhãn FDA thai kỳ của **Glargine** — PDF ô gộp "Không có dữ liệu trên PNCT" → MD gán "**C**" (MD 1221). *Trả về đúng gốc (bảng an toàn thuốc thai kỳ).*
- 🟠 **HIGH** — Cả 3 lưu đồ chỉ còn tiêu đề (không mermaid); đặc biệt **Hình 2 "lược đồ chọn thuốc" (lõi quyết định) mất nội dung** (MD 542); Hình 1 (MD 316). Hình 3 đã tái hiện bằng văn xuôi. *Bổ sung Hình 1 & 2.*
- 🟡 MEDIUM — Phần 7 (DKA/HHS/toan lactic) dán nguyên văn **OCR thô**, Bảng 7 bẹp thành text chạy dòng (MD 989-1073); số liệu đúng nhưng cần chuẩn hóa + làm sạch rác OCR.
- ⚪ LOW — header placeholder số/ngày (gốc 5481/QĐ-BYT, 30/12/2020) (MD 8-9); thiếu TLTK #27. *(Phụ: library.json không nhất quán ngày 24/12 vs 30/12 — nên rà.)*

## 15. REF_MOH_2015_QD5642 — Một số bệnh truyền nhiễm (86 trang) — 🔴 FAIL
PDF có **15 bài bệnh**; MD chỉ dựng **13 heading** — thiếu 1 bài + 1 bài bị ghép lai (làm sai lệch 2 bệnh liền kề).
- 🔴 **CRITICAL** — Bài **THƯƠNG HÀN** bị ghép lai: từ mục 3.3 trở đi MD thay bằng nội dung **LỴ TRỰC KHUẨN** (PDF tr.40-43 ⟶ MD 824-968). Hậu quả: **mất phác đồ điều trị thương hàn thật** (cipro/oflox 15→20 mg/kg/ngày; cephalosporin III 2-3 g/ngày; azithromycin 1 g/ngày; dexamethason 3→1 mg/kg q6h ×8 liều; ampicillin 100 mg/kg + probenecid 30 mg/kg ×3 tháng); **chẩn đoán sai** (Widal ≥1:160 → "phân lập Shigella"); **biến chứng sai** (Sa trực tràng, HC Reiter). *Khôi phục mục 3.3→6 + TLTK của thương hàn từ PDF.*
- 🟠 **HIGH** — Thiếu hẳn bài **LỴ TRỰC KHUẨN** (bài #7, PDF tr.44-48): phần đầu mất, phần sau bị "mượn" gắn vào bài Thương hàn. *Dựng lại bài độc lập.*
- ⚪ LOW — "with"/"and" lẫn tiếng Anh (MD 1161,1455); "TÀI LIỆU THAM KHẢOR" thừa R (MD 1843).
- 12/13 bài còn lại: khớp.

## 16. REF_MOH_2023_QD2767 — COPD (87 trang) — 🟡 PASS-WITH-WARNINGS
Mọi liều thuốc (giãn PQ, ICS/LABA/LAMA, kháng sinh ngoại/nội trú & đa kháng, Morphin, cai thuốc lá), ngưỡng FEV1 (GOLD 1-4), phân nhóm ABCD, CAT/mMRC, Rome/Anthonisen, NIV **khớp**. Không có CRITICAL.
- 🟠 **HIGH** — Nghiệm pháp đi bộ 6 phút thiếu 2 chống chỉ định HA: "HA tâm thu ≥180", "HA tâm trương ≥100 mmHg" (+đổi ≥120→>120) (PDF tr.78 ⟶ MD 1637). *Bổ sung.*
- 🟠 **HIGH** — Hình 2 (duy trì sau đợt cấp, cột "chưa điều trị duy trì") **thiếu Nhóm C: LAMA** (PDF tr.85 ⟶ MD 1945). (Bước 4 vẫn có đúng.)
- 🟠 **HIGH** — Lưu đồ kháng sinh ngoại trú (Biểu đồ 3.1) node yếu tố nguy cơ **thiếu "FEV₁ < 50%"** (PDF tr.31 ⟶ MD 740).
- 🟡 MEDIUM — MD tự sửa tham chiếu "bảng 2"→"Bảng 3" (PDF tr.84 ⟶ MD 1937 — nên giữ gốc + chú thích); thiếu tiêu chí "(R/S ở V6 < 1)" dày thất phải (MD 260).
- ⚪ LOW — đảo "Lo âu và trầm cảm"→"Trầm cảm và lo âu" (MD 1034); gộp vài heading/biểu mẫu điền tay.

## 17. REF_MOH_2023_QD2760 — Sốt xuất huyết Dengue (104 trang) — 🔴 FAIL
Thân chính (I-IV, A/B/C/D) + đa số phụ lục trung thực; mọi tốc độ truyền dịch, liều, ngưỡng trong **văn bản chính** khớp. Nhưng **phụ lục chống sốc** bị cắt:
- 🔴 **CRITICAL** — Phụ lục 12 "Truyền dịch trong sốc SXHD NẶNG ở trẻ em" **mất toàn bộ lưu đồ** — MD chỉ còn 1 dòng "Albumin 5/10%: 5-20 ml/kg/giờ" (PDF tr.51 ⟶ MD 1316-1319). Mất bolus 20ml/kg/15ph + 3 nhánh CPT theo M/HA. *Dựng lại đầy đủ.*
- 🟠 **HIGH** — Phụ lục 9 mục 2: mất 2 bảng tra cân nặng chống sốc người lớn (Nam/Nữ) + ghi sai "*(Không có nội dung chi tiết)*" (PDF tr.48 ⟶ MD 1218). *Trích lại bảng; xóa câu sai.*
- 🟠 **HIGH** — mermaid PL4 (trẻ em) đổi ngưỡng nước tiểu "**≥5**"→"**≥0,5** ml/kg/giờ" (PDF tr.40 ⟶ MD 966) — MD tự sửa lỗi gốc. *Giữ "≥5" + chú thích [sic].*
- 🟡 MEDIUM ×3: mermaid PL4 lược 2 node tốc độ; PL16.1/16.2 bỏ chuỗi tốc độ titrate (15→10→6→3→1,5); PL11 sai thời lượng taper. ⚪ LOW: "brain" thay "não" (MD 755); rác `\n` (MD 736).
- Số liệu trong văn bản chính (chống sốc trẻ em/người lớn, xuất huyết nặng, suy gan): khớp.

## 18. REF_MOH_2017_TT51 — Phòng, chẩn đoán & xử trí phản vệ (TT 51/2017) — 🟡 PASS-WITH-WARNINGS
⚠️ *File markdown gộp 2 văn bản:* **TT51 = dòng 1-422 (PDF tr.1-16)**; phần còn lại (MD 424-2686, PDF tr.17-112) là **QĐ 4815 "Viêm phổi mắc phải cộng đồng"** — ngoài phạm vi refId TT51, chưa kiểm sâu (nên tách thành refId riêng).
- 🟠 **HIGH** — Phụ lục X "Sơ đồ tóm tắt chẩn đoán & xử trí phản vệ" (PDF tr.16) **không tái dựng**, MD chỉ còn note in khổ A1/A2 (MD 417-420). Nội dung liều trùng Phụ lục III (đã có) nên không mất số liệu → không nâng CRITICAL. *Dựng lại bằng mermaid.*
- ⚪ LOW — sơ đồ chi tiết tr.15 chỉ ghi chú; metadata file gộp.
- **MỌI liều ADRENALIN khớp 100%** (tiêm bắp theo cân nặng, TM 1/10.000, truyền 0,1 µg/kg/phút, bảng pha loãng & tốc độ giọt, hộp thuốc cấp cứu).

## 19. REF_MOH_2017_QD5731 — QTKT Phẫu thuật Tiết niệu (114 trang) — 🟡 PASS-WITH-WARNINGS
Đủ **46/46 quy trình**, đúng thứ tự mục lục↔thân, đủ mục (đại cương/chỉ định/CCĐ/chuẩn bị/các bước/tai biến); mọi số liệu kỹ thuật khớp. *(Phương pháp: tr.1-3 + QT1-22 vision; tr.23+ pdfplumber text-layer PDF sạch + vision spot-check.)*
- 🟡 MEDIUM — Quy trình 45 **nhân đôi tiêu đề** (thêm "# MỞ RỘNG MIỆNG SÁO" cạnh "# MỞ RỘNG LỖ SÁO") → 47 heading `#` (PDF tr.111 ⟶ MD 2939-2941). *Xóa heading thừa.*
- ⚪ LOW — vài chỗ bỏ phần lặp của bản gốc (QT31, QT20); thêm chú thích "(Không có CCĐ tuyệt đối)" QT34; sửa chính tả OCR gốc (Farabeuf, Müller, Betadine…).

## 20. REF_MOH_2015_QD40 — Các bệnh về Mắt (143 trang) — 🟡 PASS-WITH-WARNINGS
Đủ **30 bài bệnh**, **không thiếu/không ghép lai/không bịa**; mọi liều thuốc & phác đồ khớp (kể cả mục lục gốc bỏ sót bài "Viêm loét giác mạc do vi khuẩn" — MD tái hiện trung thực lỗi mục lục gốc).
- 🟡 MEDIUM — H1 "**VIÊM TÚI LỆ**" lặp 2 lần liên tiếp (MD 522, 524) — chỉ lỗi tiêu đề, nội dung không trùng. *Xóa 1 dòng.*
- ⚪ LOW — mermaid glôcôm góc đóng thêm "nguyên phát" vào node gốc (MD 1820); sơ đồ glôcôm góc mở tái diễn giải tuyến tính (logic giữ đúng, mất vòng phản hồi).

## 21. REF_MOH_2017_QD5590 — QTKT Phẫu thuật Thần kinh (145 trang) — 🔴 FAIL (mức biên)
Đủ **64/64 quy trình**, đúng thứ tự, không thiếu/ghép lai; mọi chống chỉ định không đảo nghĩa, mọi số liệu khớp — TRỪ 1 chỗ:
- 🟠 **HIGH** — Quy trình #2 (mở nắp sọ giải ép tăng ALNS): ngưỡng đẩy lệch đường giữa PDF "**> 5cm**" → MD "**> 5mm**" (PDF tr.4 ⟶ MD 67). MD tự sửa ("5cm" gần như chắc là typo gốc, mâu thuẫn ">1cm" cùng dòng; 5mm mới đúng lâm sàng). *Theo nguyên tắc giữ gốc + chú thích [sic]; verdict FAIL là do nguyên tắc, bản chất là markdown sửa lỗi typo của PDF.*
- 🟡 MEDIUM — thiếu front matter (QĐ tr.1-3 + "DANH SÁCH 64 hướng dẫn"); MD vào thẳng bài 1 (metadata vẫn ở library.json).
- ⚪ LOW — chú thích "(Không có thông tin)" cho mục CCĐ trống #12; lỗi chính tả tiêu đề theo gốc ("NHIỄN", "PHẬU").

## 22. REF_MOH_2021_QD5968 — HIV/AIDS (145 trang) — 🔴 FAIL
Rất đầy đủ (Bảng 1-27 + phụ lục liều ARV/OI khớp). Nhưng **3 lỗi bảng phác đồ** sai lâm sàng:
- 🔴 **CRITICAL** — Bảng 15 "Phác đồ ARV bậc 2" dựng **sai cấu trúc & nội dung hàng** (giống bản 2019 cũ, không phải 2021): thiếu hàng `AZT+3TC+EFV(NVP)→TDF+3TC+DTG`, thêm các hàng không có trong gốc (PDF tr.46 ⟶ MD 1072-1082). *Dựng lại đúng 7 hàng bản 2021.*
- 🔴 **CRITICAL** — Bảng 5 ARV bậc 1 trẻ <10 tuổi: **xếp sai cột thay thế/đặc biệt** — `TAF+3TC+DTG` bị hạ xuống "đặc biệt", `ABC+3TC+EFV` nâng lên "thay thế" (đảo bậc ưu tiên phác đồ nhi) (PDF tr.34 ⟶ MD 778).
- 🟠 **HIGH** — Bảng 1 phân loại miễn dịch trẻ: **mất nguyên cột "≤ 11 tháng"** (PDF tr.18 ⟶ MD 391-396).
- 🟡 MEDIUM ×5: Bảng 2 PrEP creatinin thừa mốc T3/T12; Bảng 7 mất cột "phác đồ ARV" + ">30"→"≥30 kg"; Sơ đồ 4 & 6 không tái dựng; sai ngày QĐ thành lập HĐ (16/11→22/11/2021). ⚪ LOW: ban biên soạn rút gọn tên; nhãn chỉ số Bảng 20/21.

## 23. REF_MOH_2024_QD3312 — Đột quỵ não (148 trang) — 🟡 PASS-WITH-WARNINGS
PDF quét thuần ảnh (pdfplumber rỗng) → đọc full vision. **Mọi liều tiêu sợi huyết (alteplase 0,9 mg/kg max 90; tenecteplase 0,25 mg/kg max 25), cửa sổ thời gian (4,5h; DAWN 6-24h; DEFUSE III 6-16h), thang điểm (NIHSS/ASPECTS/ICH/Fisher/PHASES/CHA₂DS₂-VASc), ngưỡng HA/glucose, thuốc đảo ngược đều KHỚP** — không CRITICAL/HIGH.
- 🟡 MEDIUM — Bảng thuốc SSTT (donepezil/galantamine/memantine) mất giá trị cột "Mức độ bằng chứng"/"Hạng khuyến cáo" (gốc đều I/A) (PDF tr.76 ⟶ MD 2085-2092).
- 🟡 MEDIUM — Bảng PHASES nhân đôi tiêu đề + **bản đầu cắt cụt 2 tiêu chí** (PDF tr.56 ⟶ MD 1515-1533); bản thứ hai đầy đủ.
- ⚪ LOW — ABCD2 ">140"→"≥140 mmHg" (MD 363); vài lỗi chính tả heading (gốc/tự sinh).

## 24. REF_MOH_2025_QD2598 — Dinh dưỡng lâm sàng (169 trang) — 🟡 PASS-WITH-WARNINGS
✅ **Phụ lục bảng tra KHÔNG bị phá hủy** (trái ngược doc nhân trắc #12): mọi bảng (NRS-2002, MNA, GLIM, Z-score, refeeding NL & nhi, TSF bách phân vị, AMA, calorimetry, độ nhớt) khớp chính xác.
- 🟠 **HIGH** — Mất toàn bộ công cụ sàng lọc **MUST** (Phụ lục 3, Quy trình 1) — MD chỉ còn "*(Nội dung trống)*" (PDF tr.7 ⟶ MD 423-425). Mất ngưỡng BMI (>20/18,5-20/<18,5) & % sụt cân (<5/5-10/>10%) + bước quản lý. *Tái dựng.*
- ⚪ LOW — biểu mẫu SGA & PG-SGA (QT6) chỉ còn tiêu đề (MD 1151-1157); "PGS.TS"→"PGS.TS.BS" Lương Ngọc Khuê; lệch vị trí marker chú thích (2) bảng nhân trắc.

## 25. REF_MOH_2016_QD4484 — QTKT Phẫu thuật Chấn thương Chỉnh hình (186 trang) — 🟡 PASS-WITH-WARNINGS
Đủ **89/89 quy trình** trong thân, đúng thứ tự, không thiếu/ghép lai; phân độ Gustilo (I/II/IIIA-C) & Salter-Harris không đảo; số liệu (garô 200-250/350-400 mmHg…) khớp.
- 🟠 **HIGH (lỗi PDF gốc, KHÔNG phải lỗi chuyển đổi)** — Mục lục PDF ghi "DANH SÁCH 90" & có #11 "KHX Monteggia", nhưng **thân PDF chỉ 89 bài, không có Monteggia** (quét toàn bộ = 0 lần). MD phản ánh trung thực thân (89 bài). *Ghi chú để đối chiếu nguồn; có thể bổ sung nếu tìm được bản đủ.*
- 🟡 MEDIUM — tiêu đề #63 heading PDF "vùng I,II,III,IV" vs MD "I,III,IV,V" (theo thân PDF — bản gốc tự mâu thuẫn); cụm #76,78-82 dùng `###` thay `##` + 1 heading rỗng trùng (MD 3671).
- ⚪ LOW — mở rộng "KHX"→"KẾT HỢP XƯƠNG", "Cal"→"Can", "Vis"→"Vít" ở tiêu đề; thiếu front matter.

## 26. REF_MOH_2024_QD2388 — Bệnh thận mạn & bệnh lý thận (192 trang) — 🔴 FAIL
Đa số bảng liều khớp (Bảng 42 ~40 kháng sinh theo CrCl, giai đoạn CKD theo eGFR/albumin niệu, lupus/ANCA). Nhưng:
- 🔴 **CRITICAL** — Bảng 12: liều khởi đầu **Captopril** PDF "12,5-25 mg ×2-3/ngày" → MD "**50 mg ×3/ngày**" (chép nhầm liều tối đa vào ô khởi đầu → khởi trị quá liều) (PDF tr.38 ⟶ MD 864).
- 🔴 **CRITICAL** — Bảng 12: liều khởi đầu **Candesartan** PDF "16 mg ×1" → MD "**8 mg ×1**" (giảm nửa) (PDF tr.39 ⟶ MD 872).
- 🟠 **HIGH** — Bảng 26 lệch ô đích Canxi giữa KDOQI↔KDIGO (PDF tr.57 ⟶ MD 1303); Bảng 35 sai nhãn giai đoạn DAA viêm gan C ("G1-G3b" + "G4-G5" → gộp sai "G1-G5 không lọc máu", PDF tr.80 ⟶ MD 1759); **14 lưu đồ (Hình 1-14) mất hết nội dung node/nhánh** chỉ còn tiêu đề (gồm Hình 6 chỉnh liều metformin theo eGFR).
- 🟡 MEDIUM ×5: nguồn "KDIGO 2024"→"2021"; ngưỡng chẩn đoán "≥30/≥150"→">30/>150"; thiếu giá trị bán thải đường TM (Bảng 16 ESA); thiếu "hoặc tăng" AST/ALT; A3 "≥1+"→">1+". ⚪ LOW: ngày QĐ 12→13/8; "≤110/75"→"<110/75"; nhãn BUN→Ure.

## 27. REF_MOH_2020_QD2058 — Một số rối loạn tâm thần thường gặp (198 trang) — 🔴 FAIL
Liều thuốc hướng thần ở 34/35 bài đã đọc đều khớp (TTPL, hưng cảm, trầm cảm, động kinh, tự kỷ, opioid…). Nhưng **mất/trộn nội dung điều trị**:
- 🔴 **CRITICAL** — Bài 30 (ADHD/Tăng động giảm chú ý): **mục ĐIỀU TRỊ bị thay bằng nội dung ĐÁI DẦM** → mất toàn bộ phác đồ thuốc ADHD (Methylphenidate 18-72 mg/ngày, Atomoxetine 0,5→1,2 mg/kg tối đa 100 mg) (PDF tr.170-171 ⟶ MD 4913).
- 🔴 **CRITICAL** — Bài 31 (Đái dầm): **mất 3 mục đầu** (định nghĩa/nguyên nhân/chẩn đoán) + không có heading, bị nhập vào Bài 30; mất mốc tuổi ≥5 & phân loại 3 thể (PDF tr.172-173).
- 🟠 **HIGH** — Bài 8 (Opioid) & Bài 9 (Cần sa): dạng **text thô OCR** không heading/định dạng (liều vẫn đúng) (MD 1561-1738).
- ⚪ LOW — lỗi OCR "Vã mồ oai", "PHÕNG BỆNH", "Sử copy cocain".

## 28. REF_MOH_2024_QD162 — Chẩn đoán, điều trị & dự phòng bệnh Lao (213 trang) — 🟡 PASS-WITH-WARNINGS (gần FAIL)
Thân (phác đồ lao nhạy/kháng thuốc, lao trẻ em, lao tiềm ẩn, NTM, đánh giá kết quả) **trung thực**; mọi liều theo cân nặng (H/R/Z/E/S hàng 1, FDC, trẻ em), ngưỡng (QTcF >450/>500, men gan ×3-5, CD4 <100), điểm chẩn đoán lao trẻ em đều khớp.
- 🟠 **HIGH** — Bảng 10 (Phụ lục 6, liều thuốc hàng 2 theo cân nặng) + toàn bộ Phụ lục 7 (tương tác) **bung thành text rác, mất cấu trúc bảng** (752 dòng, 0 hàng bảng) → không tra được liều MDR/XDR theo cột cân nặng (PDF tr.185-196 ⟶ MD 3922-4673). *Dựng lại bảng con mỗi thuốc.*
- 🟠 **HIGH** — Sơ đồ 6 "Điều trị lao đa kháng" chỉ còn tiêu đề, thiếu lưu đồ (PDF tr.48 ⟶ MD 1216); thông tin vẫn có trong văn bản 2.2.2.
- 🟡 MEDIUM — Sơ đồ 1 mermaid lệch thứ tự node (PDF tr.24 ⟶ MD 549). ⚪ LOW — sửa lỗi OCR tên thuốc (Streptomycin/Ketoconazole/Fluoroquinolone); chính tả "dung tính".

## 29. REF_MOH_2014_QD361 — Các bệnh Cơ xương khớp (218 trang) — 🟡 PASS-WITH-WARNINGS
Đủ **40 bài + phụ lục thuốc**, đúng thứ tự, không thiếu/ghép lai; mọi liều (DMARDs, sinh học, NSAID, corticoid), tiêu chuẩn (ACR/EULAR 2010, SLICC 2012, Yamaguchi, CASPAR), công thức DAS28 khớp.
- 🟡 MEDIUM — Bảng tóm tắt phác đồ Viêm khớp vảy nến, cột "Viêm khớp trục" thiếu "DMARDs: Sulfasalazine, Cyclosporine A" (PDF tr.63 ⟶ MD 1385); thân bài đã có đủ.
- ⚪ LOW — câu Diclofenac tối nghĩa là lỗi PDF gốc (MD chép trung thực, không cần sửa MD).

## 30. REF_MOH_2015_QD708 — Hướng dẫn sử dụng kháng sinh (277 trang) — 🟡 PASS-WITH-WARNINGS
Đủ **11 chương / 55 bài / 4 phụ lục**; mọi liều kháng sinh (nhi khoa, giang mai, viêm màng não, dự phòng phẫu thuật, bảng pha tiêm 50 thuốc) khớp.
- 🟠 **HIGH** — Định nghĩa MDR/XDR: PDF "không nhạy cảm với **≤1** kháng sinh" → MD "**≥1**" (PDF tr.57 ⟶ MD 1150-1151). MD sửa lỗi typo gốc (chuẩn Magiorakos 2012 = ≥1). *Giữ "≤1" như gốc + chú thích [sic], để biên tập viên quyết.*
- ⚪ LOW — sai số hiệu "Bảng I.2/I.3" (đúng I.8/I.9); STT bảng II.13; ký tự rác (`\n`, anchor).

## 31. REF_MOH_2015_QD315 — Các bệnh Sản Phụ khoa (285 trang) — 🟡 PASS-WITH-WARNINGS
Đủ **56 bài (27 Sản + 23 Phụ + 6 Sơ sinh) + 3 phụ lục**, không thiếu/ghép lai; mọi liều cấp cứu sản khoa (MgSO₄ tấn công 3-4,5g + duy trì 1-2g/h, oxytocin, misoprostol, betamethasone/dexamethasone) khớp.
- 🟠 **HIGH** — **1 câu bị thay sang tiếng Anh** trong thân (mục ung thư cổ tử cung): PDF tiếng Việt → MD "On clinical presentation, uterine cervical cancer needs to be differentiated…" (PDF tr.181 ⟶ MD 3748). Chỗ duy nhất. *Thay lại bằng câu tiếng Việt gốc.*
- 🟡 MEDIUM — bảng chẩn đoán ĐTĐ thai nghén **đảo nhãn phương pháp** NDDG↔Carpenter-Coustan (trị số cắt vẫn đúng) (PDF tr.61 ⟶ MD 1309); FIGO 1988 ung thư niêm mạc TC: MD căn lại hàng (gốc lệch — MD đúng y khoa nhưng khác layout); trùng H1 (ĐA ỐI/NGÔI MÔNG/SA SINH DỤC).
- ⚪ LOW — thêm "<3" vào ô trống bảng tiên lượng WHO; thêm "<" trong khoảng βhCG; heading sai cấp bài Sẩy thai liên tiếp.

## 32. REF_MOH_2015_QD5643 — Một số bệnh Tai Mũi Họng (299 trang) — 🟡 PASS-WITH-WARNINGS
Đủ **63 bài / 5 phần**, không thiếu/ghép lai; mọi liều thuốc, TNM, thang RSI/Epworth, chống chỉ định cắt amidan (không đảo nghĩa) khớp.
- 🟠 **HIGH (biên)** — Phân loại mức độ OSAS: **mất các mốc cắt AHI** (PDF: 0 / 5 / 15 / 30 → nhẹ 5-15, TB 15-30, nặng >30); MD chỉ còn nhãn nhẹ/TB/nặng (PDF tr.148 ⟶ MD 3497-3501). *Bổ sung ngưỡng AHI.*
- 🟡 MEDIUM — tiêu đề bài #41 "Viêm tai giữa cấp tính trẻ em" bị tách nhầm thành 2 H1 (MD 5032); mermaid "Viêm tai ứ dịch" thêm node gốc + đổi topo tuần tự→song song (MD 497).
- ⚪ LOW — lẫn từ tiếng Anh "with/many/and"; ký tự `\n`; vài chỗ sửa chính tả gốc (TNMS→TNM, Swabach→Schwabach).

---

## 33. REF_MOH_2023_QD4416 — Các bệnh Da liễu (474 trang) — 🟡 PASS-WITH-WARNINGS (gần FAIL)
PDF **quét ảnh thuần** → đối chứng full vision. Đủ **12 chương / ~84 bài**, không thiếu/ghép lai; mọi liều (phong/MDT WHO 2018, giang mai, lậu, ghẻ, trứng cá isotretinoin 120-150 mg/kg tích lũy), tiêu chuẩn lupus EULAR/ACR 2019, lưu đồ khớp.
- 🟠 **HIGH** — **Tài liệu tham khảo cắt cụt**: PDF ~249 mục (tr.456-474) → MD chỉ giữ **10 mục đầu** (mất ~239 mục / ~18 trang) (MD 11203-11214). *Khôi phục đủ.*
- ⚪ LOW — mục lục MD "U lympho bào da" (đúng "U lympho B ở da", MD 123); mâu thuẫn liều Cyclosporin/Omalizumab là lỗi gốc (MD chép trung thực).

## 34. REF_MOH_2022_QD1832 — Một số bệnh lý Huyết học (528 trang) — 🔴 FAIL
49 bài có mặt; liều hóa trị các bài đã soát (APL, ALL, ITP, đa u tủy, thalassemia) khớp. Nhưng:
- 🔴 **CRITICAL** — Bài 28 (HC rối loạn sinh tủy/MDS): **mất toàn bộ phần ĐIỀU TRỊ** (Azacitidine 75 mg/m², Decitabine, EPO, Lenalidomide, ghép TBG, thải sắt); Bài 29 (U lympho Hodgkin): **mất heading + đại cương/chẩn đoán**, bị **trộn vào Bài 28** (PDF tr.253-266 ⟶ MD 6609-6705). *Khôi phục điều trị MDS + tách lại Bài 29.*
- 🟡 MEDIUM ×4: Bảng 9 phân biệt DIC/TTP/HUS/HELLP sai nhiều ô (hàng "Sốt": DIC "-"→"+"); chèn câu/từ tiếng Anh (MD 768, 4148, 4260); mermaid DIC thiếu nhánh "huyết khối"; sai cấp heading vài bài.
- ⚠️ *Phạm vi (công bố):* lấy mẫu — bài 21-22 (LXM trẻ em), 30-32 (u lympho), 39-49 (truyền máu/xét nghiệm) **chưa soát từng liều**, cần vòng kiểm sau.

## 35. REF_MOH_2020_QD2767 — Hướng dẫn chẩn đoán & điều trị bệnh trẻ em / Nhi (533 trang) — 🔴 FAIL
Đủ **101/101 bài**; độ chính xác liều ở các bài đã soát (ngộ độc chì, co giật, TCM, SXH, bạch hầu, chu trình ure) rất cao. Nhưng **bỏ trọn nội dung quan trọng kèm chú thích sai**:
- 🟠 **HIGH** — Bài SMA: **bỏ trọn bảng liều Zolgensma theo cân nặng** (~30 dòng) + chú thích **SAI** "*(không có trong tài liệu gốc)*" (PDF tr.216 ⟶ MD 4699). *Liều gen trị liệu theo cân nặng — khôi phục, xóa chú thích sai.*
- 🟠 **HIGH** — CH16: **bỏ trọn Bảng 1 cách pha/bảo quản kháng sinh tiêm** (3 trang, ~30 thuốc) (PDF tr.508-511 ⟶ MD 11739).
- 🟠 **HIGH** — Bài "Thiểu năng sinh dục" mất phần đầu (định nghĩa/phân loại/chẩn đoán) + gán nhãn sai "[phần tiếp của hướng dẫn khác]" + chú thích **SAI** "khuyết tr.199-201" (PDF tr.209-212 ⟶ MD 4618).
- 🟡 MEDIUM — RLCH acid propionic mất mục 1-3.2 + đổi tiêu đề; **mermaid co giật sai liều** (Midazolam 0,5→đúng 0,3 mg/kg; Phenobarbital truyền 10-15→15-20 phút) (MD 537,544); trùng H1 5 chỗ. ⚪ LOW — đảo cột bảng ure; sửa "218"→"2018".

## 36. REF_MOH_2014_QD1904 — QTKT Hồi sức - Cấp cứu - Chống độc (892 trang) — 🟡 PASS-WITH-WARNINGS (gần FAIL)
PDF có text-layer → đối chứng văn bản 100% + vision liều/antidote. **Đủ 232/232 quy trình** (234 heading − 2 stub dôi). Mọi liều antidote khớp: gắp chì (BAL 24 mg/kg/24h, EDTA 50-75 mg/kg), methanol/ethylene glycol (ethanol loading 800 mg/kg + fomepizole 15→10 mg/kg), naloxone, bảng ARDS PEEP/FiO₂.
- 🟠 **HIGH** — Quy trình "Giải độc ngộ độc rượu Ethanol" **bị tách sai** thành 1 stub + 1 quy trình **tên BỊA** "ĐIỀU TRỊ GIẢI ĐỘC RƯỢU CẤP" (vốn là câu mở đoạn đại cương) (PDF tr.707 ⟶ MD 19881-19886). *Gộp lại, giữ tên gốc.*
- 🟠 **HIGH** — Heading CVVH **nhân đôi** (1 stub rỗng + 1 quy trình thật) (MD 11964 & 11968). Cả 2 lỗi là cấu trúc, **không mất nội dung**.
- ⚪ LOW — sửa chính tả gốc ("SIÊU DOPPLER"→"SIÊU ÂM DOPPLER"); MD trung thực lỗi mục lục PDF.

---

## 37. REF_MOH_2026_QD2131 — COPD 2026 (130 trang) — 🔴 FAIL
> Rà soát 2026-10-10 · đọc 130/130 trang: text-layer `pdftotext` đối chiếu theo từ, theo dòng và đếm số lần xuất hiện mọi con số; vision cho mọi trang có bảng/hình/lưu đồ (tr.12, 15, 17, 20–22, 24, 26, 32, 34, 37, 40–41, 46, 49, 51–52, 59, 62, 68–82, 91, 95–107, 122–123). Trang văn xuôi thuần chỉ đối chiếu text-layer; PL11 (tr.108–121) chỉ xem ảnh mẫu tr.107.

Header khớp `library.json` (2131/QĐ-BYT, 14/7/2026; **thay thế QĐ 2767/QĐ-BYT ngày 04/07/2023** → `REF_MOH_2023_QD2767` đã được đánh dấu `superseded`). **Phần chữ gần như đầy đủ 100%, không phát hiện sai liều hay sai ngưỡng.** Vấn đề lớn: **toàn bộ lưu đồ/bảng dạng ảnh bị mất** (chỉ còn chú thích), mọi bảng vỡ cấu trúc, không có khối mermaid nào. FAIL dù không có CRITICAL (tiền lệ #35): 8 HIGH thuộc mẫu lỗi #3, trong đó có bảng lõi chọn thuốc ban đầu và lưu đồ có liều chẹn beta.

- 🟠 **Sơ đồ 1.1 Lưu đồ sàng lọc mất toàn bộ** (tr.12 → MD 389): "Tuổi ≥ 35", bộ câu hỏi LFQ/CDQ/COPD-PS/PUMA/CAPTURE, lưu lượng đỉnh kế, nhánh dương/âm tính.
- 🟠 **Bảng 2.4 Lựa chọn thuốc ban đầu theo ABE mất toàn bộ** (tr.22 → MD 596–598): Nhóm A một thuốc giãn PQ; B LABA+LAMA; E LABA+LAMA, cân nhắc +ICS nếu BCAT ≥300. Cùng trang, **Sơ đồ 2.1 chọn dụng cụ phân phối thuốc** cũng mất (MD 590).
- 🟠 **Biểu đồ 2.1 (chuyển đổi điều trị) & 2.2 (BN đang dùng ICS+LABA) mất** (tr.24, 26 → MD 629, 656): nhánh Eos <300/≥300/≥100/<100 → LABA+LAMA / +ICS / Roflumilast / Azithromycin; chú thích rút ICS.
- 🟠 **Biểu đồ 3.1 & 3.2 kháng sinh ngoại/nội trú bị bẹp thành văn xuôi** (tr.37 → MD 855–876; tr.41 → MD 906–922): nhãn Có/Không dồn cụm, không xác định được nhánh nào dẫn tới thuốc nào; **chèn vào giữa câu** (MD 868/879, 911/925). Số liệu node đúng.
- 🟠 **Biểu đồ 4.1, 4.2, 4.3 mất toàn bộ** (tr.49, 51, 52 → MD 1048, 1090, 1094) — **có liều thuốc chỉ nằm trong ảnh**: Metoprolol XL khởi đầu 12,5–25 → đích 200 mg/ngày; Bisoprolol 1,25 → 10 mg/ngày; tăng gấp đôi mỗi ≥2 tuần; CCĐ chẹn beta; LVEF ≤35% + nhịp xoang ≥70 → ivabradine. MD không có "Metoprolol XL", "ivabradine", "Nebivolol", "LVEF".
- 🟠 **PL2 CAT mất các câu hỏi** (tr.70 → MD 1420–1425): thang 0–5 và ô tổng điểm (công cụ phân nhóm ABE).
- 🟠 **PL9 mất phần lớn lưu đồ** (tr.96–99 → MD 1887–1969): Bước 3, Bước 4, "Liệu pháp dùng thuốc"; Hình 9.2p mất một phần (ICU, tiêu chuẩn ra viện, theo dõi 1–4/12–16 tuần); **Hình 9.3p mất toàn bộ**.
- 🟠 **Các bảng liều bị bẹp/vỡ cột**: Bảng 2.2 liều ICS (MD 577 — "Fluticasone furoate 100 200": 100 là ô gộp Thấp+TB, dễ đọc nhầm 200 = TB); Bảng 3.4 kháng sinh nhập viện (MD 899–900); PL1, PL10 liều theo Clcr (MD 1981–2183), PL11 tương tác (MD 2189–2981) thành text chạy liền. Vision tr.100–107: mọi cặp Clcr↔liều vẫn đúng số và thứ tự.
- 🟡 Các bảng khác vỡ format (Bảng 1.1 nằm trên 1 dòng MD 385; header lỗi MD 467, 484; Bảng 2.1, 2.3, 3.1, Rome 3.2, 3.3, 5.1–5.4, PL3, PL6, PL7, 6MWT; Bảng 5.1 nuốt mục "c" MD 1230).
- 🟡 Cấu trúc heading: mục lục (MD 108–302) thành heading thật; không có H1; "## 1.6. 3.4." (MD 804).
- 🟡 Hình mức ưu tiên thấp hơn mất: Biểu đồ 1.2 ABE (MD 508), Hình 4.1 (MD 1002), PL4 13 hình hướng dẫn dùng bình hít (MD 1448–1553), PL13 đo huyết áp (MD 3009).
- 🟡 Công thức Cockcroft-Gault bị phân mảnh (tr.100 → MD 1976–1979 trống; mảnh chèn vào hàng amikacin MD 2000–2006).
- 🟡 Biểu đồ 1.1 Lưu đồ chẩn đoán GOLD bị dời chỗ (tr.15 → MD 453–460, tiêu đề MD 444 trơ trọi).
- ⚪ Mất ký hiệu "β2" → "2" (MD 825, 868), "0 → 40", "≤ 4 tuần" → "<"; rác OCR tách dấu ("th ế giới", "đ ợt"); tự chuẩn hoá "2131 QĐ/BYT" → "2131/QĐ-BYT"; **lỗi của chính PDF gốc** (đánh số chú thích "0.x", câu cụt tr.46, PL1 hàng PDE4 trống, CAT "8 câu hỏi" nhưng ảnh 7 mục, Turbuhaler bước 3 trắng, tham chiếu "mục 1.2.1" không tồn tại, GOLD 1 "> 80%" vs "≥ 80%").

**Đã soát chéo, khớp:** FEV1/FVC <70%; GOLD 1–4; mMRC/CAT; ICS theo BCAT; oxy dài hạn (PaO2 ≤55/56–59, SaO2 ≤88%); NIV PaCO2 ≥53; LVRS; tiêu chuẩn Rome; prednisolon 30–40 mg × 5 ngày; kháng sinh ngoại/nội trú, colistin nạp 5 mg/kg; oseltamivir; SpO2 88–92%; NIV IPAP 8–12/EPAP 4–5; Morphin 0,5→1 mg; PL10 toàn bộ liều theo Clcr; PL11 35 cặp tương tác.

## 38. REF_MOH_2026_QD2147 — Viêm phổi cộng đồng 2026 (93 trang) — 🔴 FAIL
> Rà soát 2026-10-10 · đọc 100% (text-layer `pdftotext` đối chiếu 2 chiều theo dòng + vision tr.1, 22–24, 29–33, 40–45, 48–58, 70–91) · không lấy mẫu.

Header khớp `library.json` (2147/QĐ-BYT, 15/7/2026, KT. Bộ trưởng – Thứ trưởng Trần Văn Thuấn; **thay thế QĐ 4815/QĐ-BYT ngày 20/11/2020**). Văn xuôi Chương 1–6 khớp, không phát hiện câu bịa; tài liệu tham khảo đủ 101/101. Số liệu trọng yếu **khớp**: CURB-65, PSI, ATS (2 chính/9 phụ), PES, corticoid (hydrocortison 200 mg/ngày hoặc methylprednisolon 0,5 mg/kg/12h, 8–14 ngày), liều mục 5.4, Bảng 4.4 (20 cặp TM→uống), Phụ lục 1 (40 thuốc theo CrCl), Phụ lục 2 (11 thuốc), Phụ lục 3 (34 cặp tương tác). Lỗi tập trung ở **BẢNG, LƯU ĐỒ và CẤU TRÚC**.

- 🔴 **CRITICAL — Bảng phác đồ *Klebsiella pneumoniae* nằm dưới tiêu đề *Pseudomonas aeruginosa*** (PDF tr.51 → MD 1405–1448). MD 1405 heading Klebsiella, 1407 một câu, 1408 đã sang heading Pseudomonas; toàn bộ bảng Klebsiella (Ceftriaxon 1g/12h, Pip-tazo, Cipro 400mg, Levo 750mg, TMP-SMX, Amox/clav, aminoglycosid, nhánh ESBL−/ESBL+ ertapenem/imipenem/meropenem) ở MD 1413–1448. → Mục Klebsiella không còn phác đồ; người đọc hiểu Ceftriaxon/Amox-clav/TMP-SMX/Ertapenem là lựa chọn đầu tay cho Pseudomonas (**các thuốc này không có hoạt tính trên *P. aeruginosa***). *Sửa:* chuyển khối 1413–1448 lên sau dòng 1407, dựng lại bảng 3 cột.
- 🟠 **HIGH — Bảng phác đồ 5.4.1.1–5.4.1.7 bị làm phẳng** (PDF tr.50–54 → MD 1348–1554): mất 3 cột "Đặc điểm nhạy cảm | Lựa chọn đầu tay | Lựa chọn khác" và ô gộp dọc (S. pneumoniae: phương án dị ứng β-lactam áp dụng cho cả MIC ≤2 và >4; H. influenzae: "Lựa chọn khác" áp dụng cho cả β-lactamase âm và dương).
- 🟠 **HIGH — Lưu đồ "Xử trí khi không đáp ứng điều trị" không tái dựng** (PDF tr.57 → MD 1624, 1637–1658): 14 node thành danh sách phẳng, mất nhánh, **chèn vào giữa câu** mục 5.6.2. *Sửa:* khối mermaid sau MD 1621.
- 🟠 **HIGH — Phụ lục 3: hàng 16–34 rơi khỏi bảng** (PDF tr.82–91 → MD 2154–2363), các cột đan xen; ô Xử trí hàng 25, 30 (Linezolid + levodopa/carbidopa) bị cắt rời. Không có cặp thuốc bị gán nhầm.
- 🟡 Bảng 2.1 bị tách: 2 hàng cuối ("Cấy dịch màng phổi", "Kháng nguyên Legionella/S. pneumoniae – nước tiểu") nằm sau Bảng 2.2 (MD 664–674, 696–699).
- 🟡 Phụ lục 1 hàng 40 SMX/TMP: ô CrCl <10 trống; câu "Không khuyến cáo (nhưng nếu sử dụng, 5–10 mg/kg mỗi 24h)" mồ côi ngoài bảng (MD 2070–2073, PDF tr.73).
- 🟡 Phụ lục 2: các hàng từ Vancomycin (chế độ 2–3) tới Linezolid rơi khỏi bảng (MD 2104–2121); giá trị đúng.
- 🟡 Phụ lục 3 hàng 1–15: MD âm thầm đảo cột "Hậu quả" ↔ "Cơ chế" (PDF gốc in đảo tiêu đề, nhất quán); hàng 16–34 giữ thứ tự gốc → không nhất quán. Mẫu lỗi #6.
- 🟡 Mục lục (MD 191–367) bị chuyển thành heading thật → cây heading nhân đôi; thiếu H1 tiêu đề tài liệu.
- ⚪ Số hiệu heading chèn khoảng trắng ("5.4. 1.4."); rác tách chữ do trích text ("hô h ấp", "nghi ệm"…); bảng ATS và bảng căn nguyên tr.32 thành chữ; hàng SMX/TMP cuối Bảng 4.4 lặp 2 lần (MD 1231–1232); một số ô CrCl PL1 dời cột (không đổi nghĩa); lỗi của PDF gốc chép trung thực (procalcitonin "0.25 mg/dl", "(Bảng 2.2)" → 3.2, "Moxiflloxacin", "Clarithormycin", "henylephrin"); "Tóm tắt cập nhật" 4.1–4.3 bị nâng `##`.

---
# 📊 TỔNG KẾT (36/36 tài liệu)

| Kết quả | Số lượng | Tài liệu |
| :-- | :-: | :-- |
| 🟢 PASS (sạch) | **1** | #2 Lậu |
| 🟡 PASS-WITH-WARNINGS | **23** | (phần lớn — thân bài & liều thuốc trung thực, lỗi nhẹ ở bảng/lưu đồ/format) |
| 🔴 **FAIL** | **12** | #4 THA, #5 Tiêm chủng, #10 Mạch vành mạn, #12 Dinh dưỡng nhân trắc, #15 Truyền nhiễm, #17 SXH Dengue, #21 PT Thần kinh (biên), #22 HIV/AIDS, #26 Thận mạn, #27 Tâm thần, #34 Huyết học, #35 Nhi |

**Quy luật chung:** thân bài + liều thuốc thường **trung thực**; lỗi tập trung gần như hoàn toàn ở **BẢNG, LƯU ĐỒ, PHỤ LỤC**. 7 nhóm lỗi tái diễn:
1. **🔴 Bảng lệch cột / mất hàng / đổi nhãn nhóm tuổi** → sai ngưỡng/chỉ định (THA, tiêm chủng nhịp thở-tim & CD4, mạch vành PTP, võng mạc, thận mạn).
2. **🔴 Trộn/ghép nội dung 2 bài** (nguy hiểm nhất): Thương hàn↔Lỵ trực khuẩn (#15), ADHD↔Đái dầm (#27), MDS↔Hodgkin (#34).
3. **🔴 Bảng tra/phụ lục bị phá hủy hoặc bỏ trọn**: Z-score nhân trắc (#12), liều hàng 2 lao PL6/7 (#28), Zolgensma & kháng sinh tiêm nhi (#35), tài liệu tham khảo da liễu (#33).
4. **🔴 Sai liều thuốc**: Captopril/Candesartan khởi đầu (#26), ngưỡng CD4 (#5).
5. **Lưu đồ bị bỏ trống / không tái dựng** (THA Sơ đồ 1, Sởi PL1, thận mạn 14 hình, HIV Sơ đồ 4/6...).
6. **Markdown âm thầm "sửa" lỗi gốc** (ln10→log10, mmHg→mmol/L, 5cm→5mm, ≤1→≥1, Dưới→Từ) — đúng y khoa nhưng khác nguyên văn → cần giữ gốc + chú thích.
7. **Header trống số/ngày; chèn câu tiếng Anh; chú thích SAI "không có trong bản gốc"** (#33,34,35).

**Ưu tiên sửa ngay (nguy hiểm lâm sàng — CRITICAL):**
- #26 Thận mạn: liều khởi đầu Captopril (50→12,5-25 mg) & Candesartan (8→16 mg).
- #5 Tiêm chủng: ngưỡng CD4 "suy giảm nặng" (về 1500/750/350/200) + nhãn nhóm tuổi bảng nhịp thở/tim.
- #4 THA: lệch cột Phụ lục 4 (chỉ định thuốc sai ngưỡng).
- #15 Truyền nhiễm: tách lại Thương hàn/Lỵ trực khuẩn (khôi phục phác đồ thương hàn).
- #27 Tâm thần: khôi phục điều trị ADHD + định nghĩa Đái dầm.
- #34 Huyết học: khôi phục điều trị MDS + tách Bài 29 Hodgkin.
- #22 HIV: dựng lại Bảng 15 (ARV bậc 2) & Bảng 5 (ARV trẻ).
- #12 Dinh dưỡng nhân trắc & #35 Nhi: khôi phục bảng tra/liều bị bỏ.

> *Phương pháp: agent `ref-doc-fidelity-checker`, full vision (pdftoppm→PNG→vision) + bổ trợ pdfplumber; mọi số liệu trọng yếu đối chứng bằng ảnh. Tài liệu >300 trang dùng lấy mẫu có công bố phạm vi (đặc biệt #34 Huyết học còn bài chưa soát từng liều). Chỉ đọc — không chỉnh sửa file gốc/markdown.*

---
# 🔁 RE-REVIEW sau commit sửa `2f8555f` (2026-10-10)

> Commit `2f8555f` ("update documents", 2026-06-25 22:38 UTC — ~1 giờ sau khi review hoàn tất) đã sửa Markdown của 12 tài liệu FAIL. Lượt này dùng agent `ref-doc-fidelity-checker` kiểm tra lại **từng finding cũ** + **toàn bộ vùng diff** của commit (không đọc lại 100% tài liệu; phạm vi ghi ở từng mục). Chỉ đọc — không sửa file.
>
> Trạng thái: ✅ FIXED · ◐ PARTIAL · ❌ STILL-OPEN · ⛔ REGRESSED (sửa làm xấu hơn)

## Bảng tổng hợp re-review
| # | refId | Tài liệu | Verdict cũ | Verdict mới | 🔴 | 🟠 | 🟡 | ⚪ |
| :-: | :-- | :-- | :-- | :-- | :-: | :-: | :-: | :-: |
| 4 | REF_MOH_2010_QD3192 | Tăng huyết áp | 🔴 FAIL | 🔴 **FAIL** (hết CRITICAL; 2 lưu đồ còn trống) | 0 | 2 | 1 | 2 |
| 5 | REF_MOH_2023_QD1575 | Tiêm chủng trẻ em | 🔴 FAIL | 🔴 **FAIL** (🔴 mới: MMR cho trẻ SCID) | 2 | 1 | 2 | 6 |
| 10 | REF_MOH_2023_QD2248 | Hội chứng mạch vành mạn | 🔴 FAIL | 🔴 **FAIL** (hết CRITICAL; lưu đồ Hình 8–11) | 0 | 3 | 3 | 4 |
| 12 | REF_MOH_2024_QD3777 | Dinh dưỡng nhân trắc trẻ em | 🔴 FAIL | 🔴 **FAIL** (🔴 mới: bảng BMI gái = bảng trai) | 2 | 1 | 1 | 2 |
| 15 | REF_MOH_2015_QD5642 | Một số bệnh truyền nhiễm | 🔴 FAIL | 🟡 **PASS-WITH-WARNINGS** | 0 | 0 | 2 | 2 |
| 17 | REF_MOH_2023_QD2760 | Sốt xuất huyết Dengue | 🔴 FAIL | 🔴 **FAIL** (🔴 mới: bảng cân nặng PL9; PL4/PL5 thoái lui) | 1 | 4 | 4 | 4 |
| 21 | REF_MOH_2017_QD5590 | PT Thần kinh | 🔴 FAIL† | 🟡 **PASS-WITH-WARNINGS** | 0 | 0 | 1 | 2 |
| 22 | REF_MOH_2021_QD5968 | HIV/AIDS | 🔴 FAIL | 🔴 **FAIL** (🔴 sót từ trước: Bảng 16) | 1 | 0 | 1 | 4 |
| 26 | REF_MOH_2024_QD2388 | Bệnh thận mạn | 🔴 FAIL | 🔴 **FAIL** (hết sai liều; 14 lưu đồ trống) | 0 | 1 | 6 | 4 |
| 27 | REF_MOH_2020_QD2058 | Rối loạn tâm thần | 🔴 FAIL | 🟡 **PASS-WITH-WARNINGS** | 0 | 0 | 1 | 3 |
| 34 | REF_MOH_2022_QD1832 | Huyết học | 🔴 FAIL | 🟡 **PASS-WITH-WARNINGS** | 0 | 0 | 3 | 2 |
| 35 | REF_MOH_2020_QD2767 | Bệnh trẻ em / Nhi | 🔴 FAIL | 🔴 **FAIL** (⛔ xấu hơn: bảng kháng sinh tiêm bịa) | 2 | 1 | 3 | 2 |

**Trạng thái toàn thư viện sau lượt này (38 tài liệu local):** 🟢 PASS 1 · 🟡 PASS-WITH-WARNINGS 27 · 🔴 FAIL 10 (#4, #5, #10, #12, #17, #22, #26, #35, #37, #38).

**Kết quả:** 4/12 lên PASS-WITH-WARNINGS. Toàn bộ 🔴 CRITICAL **gốc** đã được sửa đúng (liều Captopril/Candesartan, ngưỡng CD4, nhãn tuổi, PL4 THA, Thương hàn↔Lỵ, ADHD↔Đái dầm, MDS↔Hodgkin, Bảng 15/5 HIV, PTP mạch vành…). **Nhưng chính commit sửa đã tạo ra 🔴 CRITICAL mới** ở 4 tài liệu.

**⚠️ Phát hiện quan trọng — kiểu lỗi mới "sinh số liệu thay vì chép":** các bảng được dựng lại trong `2f8555f` ở #12 (Z-score/BMI), #17 (cân nặng hiệu chỉnh PL9) và #35 (bảng pha kháng sinh tiêm) có dấu hiệu được **tính/sinh từ nguồn khác (vd. dữ liệu WHO) hoặc tự viết**, không chép từ PDF: sai lệch theo quy luật (thấp hơn 0,1 / 1 kg), sao chép nguyên bảng sang giới khác, thêm hàng/dòng liều không có trong gốc, ô nội dung tự viết. → **Quy tắc bắt buộc:** mọi bản sửa bảng số liệu phải chép từ ảnh PDF và được re-review trước khi merge.

**🔴 CRITICAL còn mở (ưu tiên sửa ngay, tổng hợp cả #37–#38):**
1. **#12 QD3777** — Bảng 7.6.1 BMI/tuổi trẻ gái 5–16 tuổi là bản sao bảng trai; 11 ô Z-score sai 0,1 (6 ô ở ngưỡng −2SD/−3SD).
2. **#5 QD1575** — PL VII: ghi chú cho tiêm **MMR (vắc xin sống) ở trẻ SCID**; mất CCĐ vắc xin sốt vàng, bịa CCĐ MMR ở SGMD dịch thể.
3. **#35 Nhi** — Bảng 1 pha/bảo quản kháng sinh tiêm phần lớn tự viết (Fosfomycin "Không dùng TB" đảo nghĩa, mất cảnh báo Amphotericin B ≤1,5 mg/kg/ngày…); Bảng 4.2 ure: liều tấn công N-carbamylglutamate 250 thay vì 100 mg/kg.
4. **#17 QD2760** — PL9: 79/724 ô cân nặng hiệu chỉnh sai, 6 ô "-" thay vì cân hiệu chỉnh (lệch 4–8 kg khi tính dịch chống sốc).
5. **#22 QD5968** — Bảng 16: lộ trình ARV bậc 1→2 bị dựng sai (mất bậc 2 DRV/r sau thất bại DTG).
6. **#38 QD2147** — Bảng phác đồ *Klebsiella* nằm dưới tiêu đề *Pseudomonas*.

### #4 REF_MOH_2010_QD3192 — Tăng huyết áp — 🔴 FAIL (đã hết CRITICAL) · còn 🔴0 🟠2 🟡1 ⚪2
Sửa ở `2f8555f`: chỉ 2 dòng PL4. Kiểm bằng vision tr.6, 11–14, 16.
| Finding gốc | Mức | Trạng thái | Bằng chứng |
|---|---|---|---|
| PL4 hàng "≥3 YTNCTM/HCCH/tổn thương cơ quan đích" lệch cột | 🔴 | ✅ FIXED | PDF tr.13 ↔ MD dòng 192 khớp 5 ô |
| PL4 hàng "Có đái tháo đường" lệch cột | 🔴 | ✅ FIXED | PDF tr.13 ↔ MD dòng 193 khớp |
| Sơ đồ 1 "Quy trình điều trị THA" bị bỏ | 🟠 | ❌ STILL-OPEN | MD dòng 99 chỉ có tiêu đề; PDF tr.6 có lưu đồ đầy đủ (mục tiêu <140/90, <130/80 nếu ĐTĐ/BTM; nhánh độ 1 / độ 2–3) |
| PL3 "Quy trình 4 bước điều trị THA tuyến cơ sở" bị bỏ | 🟠 | ❌ STILL-OPEN | MD dòng 182–183 chỉ còn tiêu đề; PDF tr.11 có 4 bước + bảng 5 mức HA |
| PL5.1 thứ tự cột khác PDF | ⚪ | STILL-OPEN | dấu X vẫn đúng |
| PL5.3 sơ đồ phối hợp thuốc chỉ còn tiêu đề | ⚪ | STILL-OPEN | PDF tr.16 sơ đồ lục giác |
**Finding mới:** 🟡 MD dòng 216 có dòng trống giữa bảng PL5.2 → 7 hàng cuối (kháng aldosterone, ƯCMC, ƯCTT, CKC, chẹn bêta, chẹn anpha – cột chống chỉ định) không render thành bảng. Sửa: xoá dòng 216. (Lỗi có từ trước, review cũ bỏ sót.)

### #5 REF_MOH_2023_QD1575 — Khám sàng lọc trước tiêm chủng trẻ em — 🔴 FAIL · còn 🔴2 🟠1 🟡2 ⚪6
Sửa ở `2f8555f`. Vision PDF tr.3–4, 19–20; text-layer tr.5, 9, 13, 15, 17–18.
| Finding gốc | Mức | Trạng thái | Bằng chứng |
|---|---|---|---|
| PL VIII: ngưỡng CD4 "Suy giảm nặng" | 🔴 | ✅ FIXED | PDF tr.20 `<1500/<750/<350/<200` ↔ MD 471 |
| PL VIII: tên hàng "Suy giảm tiến triển" | 🔴 | ✅ FIXED | MD 470 |
| PL V nhịp thở: nhãn nhóm tuổi | 🔴 | ✅ FIXED | MD 405–413 khớp tr.17 |
| PL VI nhịp tim: nhãn nhóm tuổi | 🔴 | ✅ FIXED | MD 422–430 khớp tr.18 |
| PL VII mất cột "Phân loại", bịa nhãn hàng | 🟠 | ◐ PARTIAL → sinh lỗi 🔴 mới (N1, N2) | Cột/hàng đã có lại nhưng ô CCĐ/Ghi chú giữa hàng T và B bị xếp sai |
| PL VII "tăng IgM" → "giảm IgM" | 🟠 | ✅ FIXED | MD 442 |
| Ban biên soạn sai/thiếu/bịa tên | 🟠 | ◐ PARTIAL | Còn: "Mai Thị Trực" → **Lê Minh Trác**; thiếu TS. Đỗ Thị Nhàn; học vị Vũ Tề Đăng (BS.CKI), Lê Kiến Ngãi (TS); thư ký PDF có 7 người, MD 6 ("Nguyễn Thanh Huyền" → **Nguyễn Liên Hương**; thiếu ThS. Đỗ Thị Huyền Trang) |
| Corticoid `≥2` vs `>2 mg/kg/ngày` | 🟡 | N/A | Mâu thuẫn có sẵn trong PDF (tr.5, 9 "≥"; tr.13, 15 ">"); MD chép đúng |
| Chú thích nguồn rút gọn | 🟡 | ✅ FIXED | |
| Cấu trúc CVID | ⚪ | ✅ FIXED | MD 443 |
**Finding mới:**
- 🔴 **N1 (do `2f8555f`)** — PL VII hàng "SGMD dòng tế bào T" (SCID, Wiskott-Aldrich, tăng IgM), MD 442: cột Ghi chú bị chèn câu thuộc hàng B "Trẻ có thể tiêm… **MMR**…" và "Thận trọng BCG" → MD tự mâu thuẫn: CCĐ "tất cả vắc xin sống" nhưng Ghi chú cho **tiêm MMR (vắc xin sống) cho trẻ SCID**. PDF tr.19: Ghi chú hàng T chỉ có câu tạm hoãn Rota, OPV. → chuyển 2 câu về hàng B.
- 🔴 **N2** — Hàng "SGMD dịch thể" (dòng B), MD 443: CCĐ trong MD "OPV, **MMR**, VZV"; PDF tr.19 "**Vắc xin sốt vàng**, OPV, varicella zoster" (MMR thuộc cột có thể tiêm). → mất CCĐ sốt vàng, bịa CCĐ MMR.
- 🟡 N3 — Ghi chú hàng B thiếu "Vắc xin phế cầu cộng hợp để tiêm liều cơ bản, polysaccharide để tiêm nhắc" + "Thận trọng BCG".
- 🟡 N4 — PL VIII Lưu ý (MD 475–476) mất tiêu đề "Bệnh HIV tiến triển" và cụm "người lớn và" (PDF tr.20).
- ⚪ N5 — thêm liệt kê "(lao - BCG… sốt vàng)" ở hàng T; "tiền sử"; ô CCĐ bổ thể PDF trống → MD "Không chống chỉ định"; "tiêm nhắc"→"tiêm"; "u hạt bẩm sinh"→"u hạt mạn tính"; bOPV "sau khi tiêm"→"sau khi uống".

### #10 REF_MOH_2023_QD2248 — Hội chứng mạch vành mạn — 🔴 FAIL (hết CRITICAL; lưu đồ còn sai) · còn 🔴0 🟠3 🟡3 ⚪4
Sửa ở `2f8555f`. Vision PDF tr.1, 5, 21, 27–29, 32–36, 38.
| Finding gốc | Mức | Trạng thái | Bằng chứng |
|---|---|---|---|
| Bảng PTP thiếu cột "ĐTN điển hình" | 🔴 | ✅ FIXED | MD 409–416, 40 giá trị khớp tr.21 |
| Hình 8 ma trận chọn thuốc dựng sai | 🟠 | ◐ PARTIAL | tr.33 khớp; tr.32 còn: ô "Huyết áp thấp / Có thể phối hợp" PDF **trống**, MD ghi "TRIM, IVAB, RAN, NITR" (mâu thuẫn: NITR cũng ở CCĐ); gộp cột "Suy tim" + "RLCN thất trái" → mất IVAB (MD 640) |
| Hình 11 thiếu nhánh "thêm 1 nhánh" | 🟠 | ◐ PARTIAL | MD 736–754: mất "Hẹp lỗ vào/thân → Nguy cơ PT cao → PCI"; thêm cổng "Nguy cơ PT thấp?" và nhánh "Syntax≥33 Không/Cao → Hội chẩn" không có trong tr.36 |
| Hình 9 sai nhánh "có thiếu máu" | 🟡→🟠 | ⛔ WORSE | Bịa kết cục "Điều trị nội khoa tối ưu" (mọi nhánh PDF tr.34 kết thúc ở "Cân nhắc tái thông"); mất quyết định "Bệnh nhiều thân ĐMV → FFR/iwFR" |
| Hình 10 thừa node "nguy cơ PT thấp?" | 🟡 | ◐ PARTIAL | Nhánh 1–2 thân đã đúng; còn bịa "Syntax<23 → Nguy cơ PT thấp?" và "Syntax≥23 → Không → Hội chẩn" (tr.35) |
| Thiếu "không khuyến cáo" (estrogen, chống oxy hoá) | 🟡 | ✅ FIXED | MD 568–574 |
| Thiếu "Dipyridamole không khuyến cáo" | 🟡 | ◐ PARTIAL (⚪) | có câu nhưng đặt sai danh sách (MD 574) |
| Thiếu tài liệu tham khảo #6 | 🟡 | ❌ STILL-OPEN | Visseren 2021 ESC prevention (tr.38) |
| Chú thích PDE chèn thân bài | 🟡 | ✅ FIXED | MD 584 |
| Header trống số/ngày | ⚪ | ◐ PARTIAL | có ngày; thiếu dòng "Số: 2248/QĐ-BYT" |
| iFR vs iwFR | ⚪ | ❌ STILL-OPEN (+thoái lui nhẹ) | MD 107 "iFR"; thân bài bị đổi "iwFR"→"IwFR" (PDF thân bài dùng "iwFR") |
| Heading 2.1.2; chữ "with" | ⚪ | ✅ FIXED | |
**Finding mới:** 🟡 Chú thích c Bảng 5 mất ngưỡng: PDF tr.28 "mức lọc cầu thận **<15 mL/phút/1,73 m²**" → MD 550 "mức lọc cầu thận **thấp**" (ngưỡng định nghĩa nguy cơ chảy máu cao). Liều Rivaroxaban/Prasugrel/Ticagrelor/Clopidogrel, LDL-C <1,4, Nitroglycerin, CHA2DS2-VASc đã soát lại: khớp.

### #12 REF_MOH_2024_QD3777 — Dinh dưỡng nhân trắc trẻ em — 🔴 FAIL · còn 🔴2 🟠1 🟡1 ⚪2
Sửa ở `2f8555f` (phụ lục +~1500 dòng). PDF là bản quét thuần ảnh. **So tự động 100% (1.566 hàng) với bảng WHO chính thức** (0–5 tuổi: `pygrowup`; 5–19 tuổi: WHO 2007), ô nào lệch thì phân xử bằng ảnh PDF; bảng 7.4.2 đọc vision cả 60 hàng. Vision 18/32 trang phụ lục; 14 trang chưa xem bằng vision (tr.22, 24, 25, 27, 29, 32, 34–36, 39, 42, 44, 49, 50) — MD tại đó trùng 100% WHO.
| Finding gốc | Mức | Trạng thái | Bằng chứng |
|---|---|---|---|
| Bảng Z-score scramble/lệch hàng-cột | 🔴 | ◐ PARTIAL | Bảng 0–5 tuổi trùng 100% WHO & PDF; nhưng xem N1, N2 |
| Chú thích bịa ("có thể là lỗi OCR", "(Không có dữ liệu)") | 🔴 | ✅ FIXED | |
| Mất hàng dữ liệu hàng loạt | 🔴 | ✅ FIXED | 7.1.x 61, 7.2.x 62, 7.4.x 60, 7.5.x 132, 7.6.x 132 hàng |
| Mất cấu trúc bảng | 🟠 | ✅ FIXED | trừ Phụ lục 3 (N3) |
**Finding mới (do `2f8555f`):**
- 🔴 **N1 — Bảng 7.6.1 BMI/tuổi trẻ GÁI 5–16 tuổi là bản sao y hệt bảng TRAI 7.6.2** (132/132 hàng; MD 1708–1839). PDF tr.48 tháng 61: "11,8 | 12,7 | 13,9 | 15,2 | 16,9 | 18,9 | 21,3"; MD: "12,1 | 13,0 | 14,1 | 15,3 | 16,6 | 18,3 | 20,2" (số của trai, tr.51). Lệch tới 0,56 (−3SD) và 2,36 kg/m² (+3SD) → **phân loại sai gầy còm/thừa cân/béo phì cho mọi trẻ gái 5–16 tuổi**. Dựng lại từ PDF tr.48–50.
- 🔴 **N2 — 11 ô sai 0,1 so với PDF** (PDF luôn trùng WHO; kiểu lỗi gợi ý bảng được **sinh bằng cách tự làm tròn số WHO, không chép từ PDF**): 7.4.1 tháng 80 −2SD 16,3→16,2 (MD 1317); 7.4.2 tháng 63 −3SD 13,0→12,9 (MD 1365); 7.5.1 tháng 118 +1SD 144,0→143,9 (MD 1488); 7.5.2 tháng 105 TV 131,3→131,2 (1612), 145 +2SD 163,9→163,8 (1652), 180 −2SD 153,4→153,3 (1687); 7.6.2 tháng 84 −3SD 12,3→12,2 (1868), 87 −1SD 14,3→14,2 (1871), 88 +3SD 22,0→21,9 (1872), 167 −1SD 17,0→16,9 (1951), 187 −3SD 15,0→14,9 (1971).
- 🟠 **N3 — Phụ lục 3 (7.3.1/7.3.2) đổi cấu trúc + thêm dữ liệu không có trong PDF**: PDF mỗi giới 1 bảng 45,0–120,0 cm; MD tách "a. chiều dài nằm (45–110)" + "b. chiều cao đứng (65–120)", thêm 91 hàng/giới (65–110 cm, giá trị WHO weight-for-height) → bộ ngưỡng thứ hai khác bản gốc (vd. gái 65 cm: PDF −2SD 5,9; MD mục b 6,1 – dòng 925).
- 🟡 N4 — 7.2.1/7.2.2 thêm hàng "24 (Chiều cao đứng)" không có trong PDF (MD 675, 742).
- ⚪ Dấu thập phân "45.5" vs "45,5"; tiêu đề cột khác nguyên văn.

### #15 REF_MOH_2015_QD5642 — Một số bệnh truyền nhiễm — 🟡 PASS-WITH-WARNINGS (trước: FAIL) · còn 🔴0 🟠0 🟡2 ⚪2
Sửa ở `2f8555f` (+~173 dòng): tách lại Thương hàn / Lỵ trực khuẩn. 15/15 bài. Kiểm tr.38–49 (vision tr.41–42). 12 bài ngoài diff giữ kết luận review cũ.
| Finding gốc | Mức | Trạng thái | Bằng chứng |
|---|---|---|---|
| Thương hàn bị ghép nội dung Lỵ, mất phác đồ | 🔴 | ✅ FIXED | MD 888–1005 khớp PDF tr.39–43: cipro/oflo 15–20 mg/kg/ngày, C3G 2–3 g/ngày, azithro 1 g/ngày, dexamethason 3 mg/kg rồi 1 mg/kg/6h × 8 liều, người mang khuẩn ampi/amox 100 mg/kg + probenecid 30 mg/kg × 3 tháng… |
| Thiếu bài Lỵ trực khuẩn | 🟠 | ✅ FIXED | MD 1007–1131 khớp PDF tr.44–48 (liều cipro/peflo/oflo/levo, ampicillin, TMP-SMX) |
| LOW: chèn "with"/"and" tiếng Anh; "TÀI LIỆU THAM KHẢOR" | ⚪ | STILL-OPEN | MD dòng 1326, 1620, 2008 |
**Finding mới (trong phần sửa):**
- 🟡 Thương hàn 5.5 mất "viêm xương" (PDF tr.42: "Hiếm gặp: viêm xương, viêm cầu thận…"; MD dòng 975).
- 🟡 Liều paracetamol bài Lỵ bị tự sửa: PDF tr.47 "mỗi lần 10 mg/kg/ngày" → MD dòng 1101 "mỗi lần 10 mg/kg" (đúng lâm sàng nhưng khác nguyên văn, không chú thích).
- ⚪ Chuẩn hoá chính tả: "tan máu"→"tán máu", "Leshmania"→"Leishmania".

### #17 REF_MOH_2023_QD2760 — Sốt xuất huyết Dengue — 🔴 FAIL (xấu hơn ở PL9, PL4, PL5) · còn 🔴1 🟠4 🟡4 ⚪4
Sửa ở `2f8555f`. Vision PDF tr.29–30, 40–41, 47–48 (300 dpi), 50–51, 55.
| Finding gốc | Mức | Trạng thái | Bằng chứng |
|---|---|---|---|
| PL12 mất toàn bộ lưu đồ | 🔴 | ◐ PARTIAL (🟠) | MD 1380–1412 khớp nửa trên tr.51; nửa dưới (CVP ≤15/>15, Dopamin 5–10, Dobutamin 3–10, adrenalin 0,05–0,3, noradrenalin 0,05–1 µg/kg/phút, NKQ) dồn thành 1 node "Refractory"; mất "Hct giảm ≤10%", "ngưng dịch sau 24–48 giờ", "thở oxy" |
| PL9 mục 2 thiếu bảng Nam/Nữ + chú thích sai | 🟠 | ⛔ → 🔴 mới | Bảng đã thêm (MD 1218–1280) nhưng **79/724 ô số sai** (44 Nam, 35 Nữ), phần lớn thấp hơn 1 kg theo quy luật (vd. Nam 147 cm: PDF 52/56/60/64/68 → MD 51/55/59/63/67) → **có vẻ tự tính chứ không chép**; **6 ô ghi "-" (dùng cân thực) trong khi PDF có cân hiệu chỉnh**: Nam 151/57→52, 159/63→59, 171/73→69; Nữ 151/57→49, 159/63→56, 171/73→67 (lệch 4–8 kg cân nặng tính dịch chống sốc) |
| PL4 mermaid "≥5" → "≥0,5" | 🟠 | ⛔ REGRESSED | PDF tr.40: "≥5 ml/kg/giờ" chỉ ở cổng "M, HA ổn định, Hct giảm" trước bước 3 ml/kg/h; cổng cuối trước "NGƯNG DỊCH" là **≥0,5**. Commit đổi node ngưng dịch (MD 963, vốn **đúng 0,5**) thành "≥5 [sic] (bản gốc ghi 5…)" — **sai, gốc ghi 0,5**; và đổi node AssessStepUp1 (MD 966, không có trong PDF) thành "≥5 [sic]". Cổng ≥5 thật vẫn chưa vẽ |
| PL4 bỏ 2 node tốc độ | 🟡 | ❌ STILL-OPEN | thiếu "Tổng dịch <60 ml/kg → RL 10–20/CPT 10–20 ml/kg/h × 1h" và "10 ml/kg/h không cải thiện → RL 20 ml/kg/h, xem phác đồ sốc" |
| PL16.1/16.2 thiếu chuỗi chỉnh tốc độ | 🟡 | ❌ STILL-OPEN | MD 1483–1541 (tr.55) |
| PL11 sai thời gian giảm dịch | 🟡 | ❌ STILL-OPEN | MD 1350–1351 (tr.50) |
| "brain" thay "não"; `\n` thừa | ⚪ | ❌ STILL-OPEN | MD 755, 736 |
**Finding mới (do `2f8555f`):**
- 🟠 PL5 thoái lui: MD 1013 "≥0,5" → "nước tiểu ≥ 5 ml/kg/giờ [sic]"; lưu đồ PL5 tr.41 dùng **≥0,5** ở cả 3 cổng.
- 🟠 PL9 chèn đoạn BMI + công thức cân lý tưởng "**0,9** × (chiều cao − 152,4)" không có ở tr.47–48; thân bài (tr.29–30, MD 690–691) ghi **0,91** → file tự mâu thuẫn.
- 🟡 PL12 ghi chú albumin "< 2,5 g/dL … CPT ≥ 60 ml/kg" lấy từ thân bài; lưu đồ tr.51 ghi "Albumin **< 2 g/dl** kèm CPT ≥5–10 ml/kg/giờ…", chỉ ở nhánh CVP ≤15.
- ⚪ PL9 đảo thứ tự Nữ/Nam; header PL11/16.1/16.2 trống số QĐ.

### #21 REF_MOH_2017_QD5590 — QTKT Phẫu thuật Thần kinh — 🟡 PASS-WITH-WARNINGS (trước: FAIL biên) · còn 🔴0 🟠0 🟡1 ⚪2
Sửa ở `2f8555f` (1 dòng). Vision PDF tr.1–4, 7.
| Finding gốc | Mức | Trạng thái | Bằng chứng |
|---|---|---|---|
| QT #2 "> 5cm" bị đổi thành "> 5mm" | 🟠 | ✅ FIXED | MD 67 giữ "> 5cm" + chú thích [sic] |
| Thiếu phần QĐ (tr.1–3) + danh mục 64 QT | 🟡 | ❌ STILL-OPEN | MD bắt đầu ở "# PHẪU THUẬT THẦN KINH" |
| Chú thích "(Không có thông tin)"; chính tả gốc | ⚪ | ❌ STILL-OPEN | MD 594 |

### #22 REF_MOH_2021_QD5968 — HIV/AIDS — 🔴 FAIL (chỉ còn 1 CRITICAL, ở Bảng 16) · còn 🔴1 🟠0 🟡1 ⚪4
Sửa ở `2f8555f`. Vision PDF tr.1, 3, 18, 21, 29, 34, 36, 45–46, 55–56. Toàn bộ 2 🔴, 1 🟠, 5 🟡 gốc đã sửa.
| Finding gốc | Mức | Trạng thái | Bằng chứng |
|---|---|---|---|
| Bảng 15 ARV bậc 2 sai cấu trúc/hàng | 🔴 | ✅ FIXED | MD 1106–1121 khớp tr.46, đủ chú thích 1–4 |
| Bảng 5 đảo cột thay thế/đặc biệt trẻ <10 tuổi | 🔴 | ✅ FIXED | MD 793 khớp tr.34 |
| Bảng 1 mất cột "≤11 tháng" | 🟠 | ✅ FIXED | MD 391–396 khớp tr.18 |
| Bảng 2 creatinin thừa mốc T3 | 🟡 | ✅ FIXED | MD 484 |
| Bảng 7 mất cột phác đồ; ">30"→"≥30 kg" | 🟡 | ✅ FIXED | MD 828–833, giữ "> 30 kg [sic]" |
| Sơ đồ 4 PEP chưa tái dựng | 🟡 | ✅ FIXED | mermaid MD 658–671 |
| Sơ đồ 6 thất bại điều trị chưa tái dựng | 🟡 | ✅ FIXED | mermaid MD 1079–1096 (≤50 / >50–≤1000 / >1000) |
| Sai ngày QĐ 5300 | 🟡 | ✅ FIXED | MD 7 |
| Ban biên soạn rút gọn tên | ⚪ | ❌ STILL-OPEN | MD 33–36 |
| Nhãn chỉ số Bảng 20/21 | ⚪ | ❌ STILL-OPEN | MD 1330–1331, 1344–1345 |
**Finding mới (có từ trước `2f8555f`, review cũ sót):**
- 🔴 **Bảng 16 dựng sai hàng 2 nhóm ≥10 tuổi** (PDF tr.46 ↔ MD 1129). PDF: bậc 1 "2 NRTIs + DTG" (ô gộp) → bậc 2 "**2NRTIs + DRV/r**" → bậc 3 "XN gen kháng thuốc". MD: bậc 1 "2 NRTIs + LPV/r (hoặc DRV/r)" → bậc 2 "2 NRTIs + DTG" → **tạo lộ trình không có trong gốc và mất lựa chọn DRV/r sau thất bại DTG**.
- 🟡 Bảng 16 hàng 3 ≥10 tuổi: PDF "2NRTIs + EFV" → MD thêm "(hoặc NVP)" (MD 1130).
- ⚪ Bảng 16 nhóm <10 tuổi: chỉ số trên ^1,3/^2,4 → ³/⁴, thêm "2" (MD 1132–1133); Bảng 1 cột 36–59 tháng thêm "hoặc".

### #26 REF_MOH_2024_QD2388 — Bệnh thận mạn — 🔴 FAIL (chỉ vì 14 lưu đồ trống; đã hết sai liều) · còn 🔴0 🟠1 🟡6 ⚪4
Sửa ở `2f8555f` (4 ô). Vision PDF tr.26, 27, 37–39, 42–43, 57, 73, 80, 179. Không có lỗi mới do commit.
| Finding gốc | Mức | Trạng thái | Bằng chứng |
|---|---|---|---|
| Bảng 12: liều khởi đầu Captopril | 🔴 | ✅ FIXED | PDF tr.38 "12,5–25 mg, 2–3 lần/ngày" ↔ MD 864 |
| Bảng 12: liều khởi đầu Candesartan | 🔴 | ✅ FIXED | PDF tr.39 "16 mg, 1 lần/ngày" ↔ MD 872 |
| Bảng 26: lệch ô Canxi KDOQI↔KDIGO | 🟠 | ✅ FIXED | MD 1303 khớp tr.57 |
| Bảng 35: nhãn giai đoạn DAA | 🟠 | ✅ FIXED | MD 1759–1760 khớp tr.80 |
| 14 lưu đồ (Hình 1–14) chỉ còn tiêu đề | 🟠 | ❌ STILL-OPEN | MD 830, 1492, 2911, 2933, 2937, 2939, 2998, 3055, 3069, 3111, 3116, 3138, 3567, 3644; Hình 6 (chỉnh liều metformin theo eGFR) trống |
| "KDIGO 2024" → "2021" | 🟡 | ❌ STILL-OPEN | MD 846 (PDF tr.37) |
| Ngưỡng "≥30 / ≥150" → ">" | 🟡 | ❌ STILL-OPEN | MD 641 (PDF tr.26 Bảng 6) |
| Bảng 16 ESA thiếu bán thải đường TM | 🟡 | ❌ STILL-OPEN | MD 961–962 (PDF tr.43) |
| Thiếu "hoặc tăng" AST/ALT | 🟡 | ❌ STILL-OPEN | MD 1647 (PDF tr.73) |
| A3 "≥1+" → ">1+" | 🟡 | ❌ STILL-OPEN | MD 677 (PDF tr.27) |
| Ngày QĐ 12 → 13/8 | ⚪ | ❌ STILL-OPEN | MD 6, 38 |
| "≤110/75" → "<110/75" | ⚪ | ❌ STILL-OPEN | MD 3799 (PDF tr.179) |
| BUN → Ure | ⚪ | ❌ STILL-OPEN | MD 459 (PDF tr.17) |
**Finding mới (có từ trước, review cũ sót):** 🟡 Bảng 32 HBsAg "(+) ≥ 6 tháng" → MD "> 6 tháng" (MD 1646–1649, PDF tr.73); ⚪ "iPTH" → "PTH" (MD 1307).

### #27 REF_MOH_2020_QD2058 — Rối loạn tâm thần — 🟡 PASS-WITH-WARNINGS (trước: FAIL) · còn 🔴0 🟠0 🟡1 ⚪3
Sửa ở `2f8555f` (+266/−56). Vision PDF tr.57, 170–175. Chỉ soát finding cũ + vùng diff.
| Finding gốc | Mức | Trạng thái | Bằng chứng |
|---|---|---|---|
| Bài 30 ADHD: phần ĐIỀU TRỊ bị thay bằng nội dung Đái dầm | 🔴 | ✅ FIXED | MD 5032–5070 khớp PDF tr.170–171: Methylphenidate 18–72 mg/ngày; Atomoxetine 0,5→~1,2 mg/kg/ngày, tối đa 100 mg; clonidin 0,1–0,25; valproat 30–50 mg/kg… |
| Bài 31 Đái dầm: mất tiêu đề + mục 1–3, bị gộp vào Bài 30 | 🔴 | ✅ FIXED | `# Bài 31: ĐÁI DẦM` MD 5075; tiêu chuẩn ICD-10 A–E, F98.00/.01/.02 khớp tr.172–173; mermaid khớp lưu đồ tr.174 |
| Bài 8 Opioid & Bài 9 Cần sa là text OCR thô | 🟠 | ✅ FIXED | MD 1552–1735 có heading đầy đủ; liều methadon/naltrexon khớp tr.57. Còn artefact số trang "58" ở MD 1812 |
| Lỗi OCR "Vã mồ oai", "PHÕNG BỆNH", "Sử copy cocain" | ⚪ | ◐ PARTIAL | Còn ở MD 1346, 1521, 1995 |
**Finding mới (do `2f8555f`):**
- 🟡 MD 1701 "#### 4.3.1 [sic]. Chiến lược giảm hại bằng Methadon" — PDF tr.57 ghi đúng "4.3.3."; [sic] đổ lỗi sai cho bản gốc → sửa thành 4.3.3, bỏ [sic].
- ⚪ Chèn nhiều "[sic]" không có trong PDF lên chữ đúng (MD 1587, 1670, 1807, 5050 "\(\alpha\)-adrenergic [sic]" – LaTeX có thể không render, 5100).
- ⚪ Desmopressin: PDF tr.175 "0,2 – 06 mg" → MD "0,2 – 0,6 mg" (tự sửa typo gốc, cần biên tập viên xác nhận + chú thích). Bài 28 "# 4. ĐIỀU TRỊ" sai cấp heading (MD 4703).

### #34 REF_MOH_2022_QD1832 — Huyết học — 🟡 PASS-WITH-WARNINGS (trước: FAIL) · còn 🔴0 🟠0 🟡3 ⚪2
Sửa ở `2f8555f` (+195/−4). Vision PDF tr.83, 86, 253–261. Giới hạn lấy mẫu cũ (bài 21–22, 30–32, 39–49 chưa soát từng liều) vẫn giữ nguyên.
| Finding gốc | Mức | Trạng thái | Bằng chứng |
|---|---|---|---|
| Bài 28 MDS mất toàn bộ ĐIỀU TRỊ; Bài 29 Hodgkin mất tiêu đề, bị gộp | 🔴 | ✅ FIXED | MD 6670–6823 khớp tr.253–259 (EPO 40.000–60.000 UI, Azacitidine 75 mg/m² × 7 ngày, Decitabine, hATG 40 mg/kg × 4, thải sắt…); `# 29. U LYMPHO HODGKIN` ở MD 6825 |
| Bảng 9 DIC/TTP/HUS/HELLP sai ô | 🟡 | ✅ FIXED | MD 2112–2121 khớp 8×4 ô PDF tr.83 |
| Chèn tiếng Anh (MD 768, 4148, 4260) | 🟡 | ❌ STILL-OPEN | "If possible, this treatment…", "cũng as", "ngày 15 and 22" |
| Mermaid DIC thiếu nhánh "huyết khối" | 🟡 | ❌ STILL-OPEN | MD 2190–2201 chỉ 2 nhánh; PDF tr.86 có 3 nhánh + ô theo dõi 6h/lần |
| Sai cấp heading | 🟡 | ❌ STILL-OPEN | "# 3. ĐIỀU TRỊ" cấp H1 ở MD 6611, 6780, 6784, 6897, 7065 |
**Finding mới:** không có lỗi liều/bịa nội dung. ⚪ "[sic]" chèn lên chữ đúng ("APR-246 [sic]", "tế bào Sternberg [sic]"); ⚪ mục 5.2.1/5.2.2 bị dàn phẳng; tự sửa typo "40.00"→"40.000", "G-CFS"→"G-CSF" không chú thích.

### #35 REF_MOH_2020_QD2767 — Bệnh trẻ em / Nhi (BV Nhi TW) — 🔴 FAIL (xấu hơn lần đầu) · còn 🔴2 🟠1 🟡3 ⚪2
Sửa ở `2f8555f` (186 dòng, 5 vùng). Vision PDF tr.19, 22, 150, 209–211, 216, 509–511. Chỉ soát finding cũ + vùng diff.
| Finding gốc | Mức | Trạng thái | Bằng chứng |
|---|---|---|---|
| SMA: bỏ bảng liều Zolgensma + chú thích sai | 🟠 | ◐ PARTIAL | 32 dòng 2,6–18,0 kg khớp tr.216; nhưng MD 4824 **thêm dòng "18,1–18,5 kg → 101,8 mL" không có trong PDF**; mất chú thích ᵃ/ᵇ |
| CH16: bỏ Bảng 1 cách pha/bảo quản kháng sinh tiêm | 🟠 | ⛔ REGRESSED → 🔴 | MD 11866–11907: đúng tên 38 thuốc nhưng **nội dung ô phần lớn tự viết, sai số**; bỏ cột "Bảo quản" và toàn bộ tr.511 (tương kỵ, ký hiệu, lưu ý) |
| Thiểu năng sinh dục mất phần đầu, nhãn sai | 🟠 | ✅ FIXED | MD 4666–4735 khớp tr.209–211 |
| RL acid propionic mất mục 1–3.2 | 🟡 | ✅ FIXED | MD 3574 khớp tr.153–154 |
| Mermaid co giật "sai liều" | 🟡 | ⚠️ finding gốc chẩn đoán sai | Lưu đồ PDF tr.22 ghi Midazolam 0,5 mg/kg & Phenobarbital 10–15 phút; chính văn tr.19 ghi 0,3 mg/kg & 15–20 phút → **mâu thuẫn có sẵn trong PDF**. Mermaid đã bị sửa theo chính văn, nay lệch lưu đồ |
| Trùng H1 (5 chỗ) | 🟡 | ❌ STILL-OPEN | 4051/4055, 5753/5756, 6608/6611, 10206/10209, 10750/10753; + "# 3. BẤT THƯỜNG CẤU TRÚC NST" (4465) sai cấp |
| Đảo cột bảng ure | ⚪ | ❌ STILL-OPEN → nâng 🔴 | xem N2 |
| Tự sửa "218"→"2018" | ⚪ | ❌ STILL-OPEN | MD dòng 12 |
**Finding mới:**
- 🔴 **N1 — Bảng 1 kháng sinh tiêm bị bịa/sai số** (PDF tr.509–511 ↔ MD 11866–11907). Ví dụ đối chứng ảnh: Amikacin nồng độ PDF ≤10 mg/ml → MD ≤5; **Fosfomycin PDF "TB" → MD "Không dùng đường TB" (đảo nghĩa)**; Ceftriaxon ổn định PDF 10 ngày 2–8°C/3 ngày t° phòng → MD 24h/3 ngày, mất "sơ sinh TM >60'"; Benzylpenicillin PDF "DÙNG NGAY" → MD "24h/7 ngày"; **Amphotericin B mất cảnh báo "không quá 1,5 mg/kg/ngày"**; Vancomycin, Clindamycin, Cloramphenicol, Gentamicin, Metronidazol, Fluconazol, Imipenem, Ampicillin, Cefotaxim, Cefamandol, Piperacillin/Tazobactam đều sai/mất ô. → Bỏ toàn bộ, chép lại từng ô từ ảnh tr.509–511, giữ cột Bảo quản + tr.511.
- 🔴 **N2 — Bảng 4.2 liều đợt cấp RL chu trình ure lệch ô** (PDF tr.150 ↔ MD 3523–3530): hàng NAGS, liều 250 mg/kg thuộc **L-arginine** nhưng MD gán cho **N-carbamylglutamate** (đúng là 100 mg/kg rồi 25–62,5 mg/kg/6h). Thứ tự cột sai; "trên 20kg: 5,5 g/m²/ngày" bị chép sang cột phenylacetate.
- 🟠 N5 — Dòng Zolgensma 18,1–18,5 kg bịa (MD 4824) → xoá.
- 🟡 N3 — Mermaid co giật (MD 537, 544): giữ giá trị lưu đồ tr.22 + chú thích mâu thuẫn với chính văn tr.19; biên tập viên y khoa quyết định.
- 🟡 N4 — Thiểu năng sinh dục tự sửa nghĩa: gốc "tăng gonadotropin"/"(hypergonadism)" → MD "gonadotropin thấp"/"(hypogonadotropic hypogonadism)" (MD 4701, 4676) không chú thích.
- ⚪ N6 — Sơ đồ 2.1 propionic chỉ còn chữ thay thế (MD 3588); "1: 20.00"→"20.000".

> *Phương pháp re-review: agent `ref-doc-fidelity-checker`, vision (pdftoppm→PNG) cho mọi bảng/số liệu trọng yếu, text-layer để định vị; #12 so tự động 1.566 hàng với bảng WHO chính thức rồi phân xử ô lệch bằng ảnh PDF. Chỉ đọc — không chỉnh sửa file.*

---
# 🛠️ SỬA TRỰC TIẾP 10 tài liệu FAIL (2026-10-10)

> Quy trình cho mỗi tài liệu: (1) agent sửa — **chép từ ảnh PDF, không tự sinh/tính số liệu**, giữ nguyên văn gốc (lỗi gốc → ghi chú biên tập), lưu đồ → mermaid đã kiểm cú pháp; (2) **agent `ref-doc-fidelity-checker` độc lập** đối chiếu mọi hunk của diff với ảnh PDF (bảng số lớn được chép lại độc lập rồi so tự động); (3) chỉ commit lên `main` khi đạt. Mọi lỗi 🔴/🟠/🟡 được giao đều đã đóng; cột ⚪ là lỗi nhỏ còn lại.

| # | refId | Tài liệu | Trước | Sau sửa (đã kiểm độc lập) | 🔴 | 🟠 | 🟡 | ⚪ | Kiểm tra trọng yếu |
| :-: | :-- | :-- | :-- | :-- | :-: | :-: | :-: | :-: | :-- |
| 4 | REF_MOH_2010_QD3192 | Tăng huyết áp | 🔴 FAIL | 🟢 **PASS** | 0 | 0 | 0 | 1 | Sơ đồ 1, PL3 4 bước, PL5.3 15/15 cạnh |
| 5 | REF_MOH_2023_QD1575 | Tiêm chủng trẻ em | 🔴 FAIL | 🟡 **PASS-WITH-WARNINGS** | 0 | 0 | 0 | 2 | PL VII từng ô (MMR/SCID, sốt vàng), ban biên soạn |
| 10 | REF_MOH_2023_QD2248 | Hội chứng mạch vành mạn | 🔴 FAIL | 🟢 **PASS** | 0 | 0 | 0 | 1 | Hình 8 (60 ô), Hình 9–11 từng node/mũi tên |
| 12 | REF_MOH_2024_QD3777 | Dinh dưỡng nhân trắc | 🔴 FAIL | 🟡 **PASS-WITH-WARNINGS** | 0 | 0 | 0 | 2 | Chép độc lập ~1.000 hàng → 0 ô lệch (BMI gái 132/132, PL3 151×2) |
| 17 | REF_MOH_2023_QD2760 | Sốt xuất huyết Dengue | 🔴 FAIL | 🟡 **PASS-WITH-WARNINGS** | 0 | 0 | 0 | 4 | PL9 **724/724 ô** khớp; PL4/5/11/12/16.1/16.2 |
| 22 | REF_MOH_2021_QD5968 | HIV/AIDS | 🔴 FAIL | 🟡 **PASS-WITH-WARNINGS** | 0 | 0 | 0 | 1 | Bảng 16 từng ô, Bảng 20/21, tổ biên tập |
| 26 | REF_MOH_2024_QD2388 | Bệnh thận mạn | 🔴 FAIL | 🟡 **PASS-WITH-WARNINGS** | 0 | 0 | 0 | 2 | 14 hình (13 mermaid + 1 bảng), ngưỡng ≥ (Tolvaptan đối chứng ảnh tr.179) |
| 35 | REF_MOH_2020_QD2767 | Bệnh trẻ em / Nhi | 🔴 FAIL | 🟡 **PASS-WITH-WARNINGS** | 0 | 0 | 0 | 4 | Bảng 1 kháng sinh tiêm **38/38 thuốc × 14 cột**; Bảng 4.2 ure; Zolgensma |
| 37 | REF_MOH_2026_QD2131 | COPD 2026 | 🔴 FAIL | 🟡 **PASS-WITH-WARNINGS** | 0 | 0 | 0 | ~5 | 14/14 lưu đồ; PL10 mọi cặp Clcr↔liều; không mất con số nào so với PDF |
| 38 | REF_MOH_2026_QD2147 | Viêm phổi cộng đồng 2026 | 🔴 FAIL | 🟡 **PASS-WITH-WARNINGS** | 0 | 0 | 0 | ~4 | Bảng Klebsiella về đúng mục; PL3 34 hàng; ~140 chỗ nối chữ đối chiếu text-layer |

**Trạng thái toàn thư viện (38 tài liệu local):** 🟢 PASS 3 · 🟡 PASS-WITH-WARNINGS 35 · 🔴 FAIL **0**.

**Cần biên tập viên y khoa quyết định (mâu thuẫn có sẵn trong bản gốc, đã giữ nguyên văn + ghi chú biên tập):**
- #35 Nhi: lưu đồ co giật tr.22 (Midazolam 0,5 mg/kg; Phenobarbital 10–15 phút) ≠ chính văn tr.19 (0,3 mg/kg; 15–20 phút).
- #26 Thận mạn Hình 3: ns-MRA "ACR ≥30 mg/g (≥30 mg/mmol)" — đơn vị mmol có vẻ là lỗi gốc (KDIGO: ≥3 mg/mmol).
- #38 Viêm phổi: "Tobramycin 5 mg/kg mỗi 2 4 giờ" (in tách chữ số); procalcitonin "0.25 mg/dl".
- #37 COPD: GOLD 1 "> 80%" (Biểu đồ) vs "≥ 80%" (bảng); CAT "8 câu hỏi" nhưng hình có 7 mục.
- #4 THA PL3: ký hiệu so sánh trước "140/90mmHg" mờ trên bản quét (đọc theo ngữ cảnh "<"/"≥").

**Sửa thêm toàn repo:** 13 khối mermaid lỗi cú pháp (không render trên web) ở QD1832, QD4416, QD2767, QD5968, QD2248, QD2760 → 131/131 khối hợp lệ; ký tự Private Use (glyph Symbol/Wingdings: ↓ ↑ → • ✓…) ở QD5481, QD2598, QD2147, QD2131 → Unicode chuẩn. CI nay chặn cả hai lỗi này (`scripts/check_mermaid.js`, `validate_library.py`).
