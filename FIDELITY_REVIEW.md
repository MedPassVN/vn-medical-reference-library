# Báo cáo rà soát độ trung thực Markdown ↔ PDF gốc

> Kho: `vn-medical-reference-library` · Công cụ: agent `ref-doc-fidelity-checker` (full vision, đọc 100% trang qua `pdftoppm`→PNG→vision, đối chứng số liệu).
> Bắt đầu: 2026-06-25 · Phạm vi mục tiêu: **36/36 tài liệu** (raw_sources ↔ markdown_docs).
> **Trạng thái: đã quét 16/36.** File này để **double-check** và làm danh sách sửa. Cập nhật dần khi quét tiếp.
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

---

## Còn lại cần quét (20 file)
104→299 trang (16 file): REF_MOH_2023_QD2760, REF_MOH_2017_TT51, REF_MOH_2017_QD5731, REF_MOH_2015_QD40, REF_MOH_2017_QD5590, REF_MOH_2021_QD5968, REF_MOH_2024_QD3312, REF_MOH_2025_QD2598, REF_MOH_2016_QD4484, REF_MOH_2024_QD2388, REF_MOH_2020_QD2058, REF_MOH_2024_QD162, REF_MOH_2014_QD361, REF_MOH_2015_QD708, REF_MOH_2015_QD315, REF_MOH_2015_QD5643.

Giant (474–892 trang, xử lý đặc biệt): REF_MOH_2023_QD4416 (474), REF_MOH_2022_QD1832 (528), REF_MOH_2020_QD2767 (533), REF_MOH_2014_QD1904 (892).
