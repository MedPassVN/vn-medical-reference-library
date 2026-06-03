# Thư viện Tài liệu Tham khảo Y khoa Trung tâm & CDN (Vietnam Medical Reference Library & CDN)

Chào mừng bạn đến với kho lưu trữ Thư viện Tài liệu Tham khảo Y khoa Trung tâm phục vụ lưu trữ, tra cứu và kết nối dữ liệu (CDN) cho các kỳ thi đánh giá năng lực y khoa và ứng dụng lâm sàng tại Việt Nam.

Kho lưu trữ này cung cấp các hướng dẫn điều trị y khoa chính thống từ Bộ Y tế Việt Nam và các tổ chức y tế quốc tế lớn dưới dạng tệp dữ liệu tĩnh tự động đóng vai trò là một CDN hiệu năng cao.

---

## 🔗 Hướng dẫn Tích hợp CDN cho Lập trình viên (Developer CDN Integration)

Khi repository này được triển khai lên GitHub Pages, tất cả các tài liệu và tệp đăng ký siêu dữ liệu sẽ được phân phối thông qua CDN của GitHub tại địa chỉ:

- **Registry JSON (Danh mục siêu dữ liệu tài liệu):**
  ```text
  https://<username>.github.io/vn-medical-reference-library/library.json
  ```
- **Tệp tài liệu PDF cục bộ (Direct PDF CDN link):**
  ```text
  https://<username>.github.io/vn-medical-reference-library/raw_sources/<ref_id>.pdf
  ```

### Mẫu tích hợp dữ liệu (Code Integration Examples)

#### 1. Javascript (Fetch API)
```javascript
// Tải danh bạ tài liệu từ CDN
fetch('https://<username>.github.io/vn-medical-reference-library/library.json')
  .then(response => response.json())
  .then(library => {
    console.log(`Đã tải ${library.length} tài liệu y khoa từ CDN.`);
    // Tìm kiếm tài liệu
    const ref = library.find(item => item.ref_id === 'REF_MOH_2017_TT51');
    console.log(`Tiêu đề: ${ref.title}`);
    console.log(`Đường dẫn tải PDF: https://<username>.github.io/vn-medical-reference-library/${ref.local_path}`);
  });
```

#### 2. Python (Requests)
```python
import requests

cdn_base = "https://<username>.github.io/vn-medical-reference-library"
response = requests.get(f"{cdn_base}/library.json")
if response.status_code == 200:
    library = response.json()
    for entry in library:
        if entry.get("local_path"):
            pdf_url = f"{cdn_base}/{entry['local_path']}"
            print(f"[{entry['ref_id']}] -> {pdf_url}")
```

---

## 🗂️ Tra cứu nhanh Danh mục Tài liệu hiện có (27 Tài liệu Cốt lõi)

Dưới đây là mục lục tra cứu nhanh các tài liệu y khoa có sẵn trong thư viện:

| Mã Tài liệu (`ref_id`) | Tên Tài liệu Tham khảo | Loại văn bản | Cơ quan ban hành | Ngày hiệu lực | Tải PDF (Local CDN) |
| :--- | :--- | :---: | :--- | :---: | :---: |
| **`REF_MOH_2017_TT51`** | Thông tư 51/2017/TT-BYT Hướng dẫn phòng, chẩn đoán và xử trí phản vệ | `Thông tư` | Bộ Y tế Việt Nam | 2017-12-29 | [Download 📥](raw_sources/REF_MOH_2017_TT51.pdf) |
| **`REF_LAW_2023_KCB`** | Luật Khám bệnh, chữa bệnh số 15/2023/QH15 | `Luật` | Quốc hội Việt Nam | 2024-01-01 | [Download 📥](raw_sources/REF_LAW_2023_KCB.pdf) |
| **`REF_MOH_2015_QD1904`** | Quyết định 1904/QĐ-BYT Hướng dẫn quy trình kỹ thuật chuyên ngành Hồi sức - Cấp cứu và Chống độc | `Quyết định` | Bộ Y tế Việt Nam | 2015-04-07 | [Download 📥](raw_sources/REF_MOH_2015_QD1904.pdf) |
| **`REF_MOH_2022_QD2919`** | Quyết định 2919/QĐ-BYT Hướng dẫn chẩn đoán và điều trị các bệnh về Cơ xương khớp | `Quyết định` | Bộ Y tế Việt Nam | 2022-10-31 | [Download 📥](raw_sources/REF_MOH_2022_QD2919.pdf) |
| **`REF_MOH_2020_QD2767`** | Quyết định 2767/QĐ-BYT Hướng dẫn chẩn đoán và điều trị bệnh Nhi khoa | `Quyết định` | Bộ Y tế Việt Nam | 2020-06-30 | [Download 📥](raw_sources/REF_MOH_2020_QD2767.pdf) |
| **`REF_MOH_2015_QD3126`** | Quyết định 3126/QĐ-BYT Hướng dẫn quốc gia dịch vụ chăm sóc sức khỏe sinh sản | `Quyết định` | Bộ Y tế Việt Nam | 2015-08-11 | [Download 📥](raw_sources/REF_MOH_2015_QD3126.pdf) |
| **`REF_MOH_2020_QD5683`** | Quyết định 5683/QĐ-BYT Hướng dẫn chẩn đoán và điều trị Hen phế quản người lớn | `Quyết định` | Bộ Y tế Việt Nam | 2020-12-31 | [Download 📥](raw_sources/REF_MOH_2020_QD5683.pdf) |
| **`REF_MOH_2023_QD2755`** | Quyết định 2755/QĐ-BYT Hướng dẫn chẩn đoán và điều trị Bệnh phổi tắc nghẽn mạn tính | `Quyết định` | Bộ Y tế Việt Nam | 2023-11-06 | [Download 📥](raw_sources/REF_MOH_2023_QD2755.pdf) |
| **`REF_MOH_2020_QD2151`** | Quyết định 2151/QĐ-BYT Hướng dẫn chẩn đoán và điều trị Tăng huyết áp | `Quyết định` | Bộ Y tế Việt Nam | 2020-05-18 | [Download 📥](raw_sources/REF_MOH_2020_QD2151.pdf) |
| **`REF_MOH_2020_QD5481`** | Quyết định 5481/QĐ-BYT Hướng dẫn chẩn đoán và điều trị đái tháo đường typ 2 | `Quyết định` | Bộ Y tế Việt Nam | 2020-12-24 | [Download 📥](raw_sources/REF_MOH_2020_QD5481.pdf) |
| **`REF_MOH_2024_QD3312`** | Quyết định 3312/QĐ-BYT Hướng dẫn chẩn đoán và điều trị đột quỵ não | `Quyết định` | Bộ Y tế Việt Nam | 2024-11-05 | [Download 📥](raw_sources/REF_MOH_2024_QD3312.pdf) |
| **`REF_MOH_2020_QD2603`** | Quyết định 2603/QĐ-BYT Hướng dẫn chẩn đoán và điều trị viêm gan vi rút B | `Quyết định` | Bộ Y tế Việt Nam | 2020-06-16 | [Download 📥](raw_sources/REF_MOH_2020_QD2603.pdf) |
| **`REF_MOH_2018_QD2673`** | Quyết định 2673/QĐ-BYT Hướng dẫn Quốc gia về tiêm chủng | `Quyết định` | Bộ Y tế Việt Nam | 2018-05-30 | [Download 📥](raw_sources/REF_MOH_2018_QD2673.pdf) |
| **`REF_MOH_2021_QD2910`** | Quyết định 2910/QĐ-BYT Hướng dẫn chẩn đoán và điều trị các bệnh tim mạch | `Quyết định` | Bộ Y tế Việt Nam | 2021-06-15 | *Pending 🟡* |
| **`REF_MOH_2020_QD3931`** | Quyết định 1470/QĐ-BYT Hướng dẫn quốc gia về sàng lọc và quản lý đái tháo đường thai kỳ | `Quyết định` | Bộ Y tế Việt Nam | 2024-05-29 | [Download 📥](raw_sources/REF_MOH_2020_QD3931.pdf) |
| **`REF_MOH_2021_QD5099`** | Quyết định 5099/QĐ-BYT Hướng dẫn biến chứng thận ở người bệnh đái tháo đường | `Quyết định` | Bộ Y tế Việt Nam | 2021-11-04 | *Pending 🟡* |
| **`REF_MOH_2018_QD2004`** | Quyết định 2004/QĐ-BYT Hướng dẫn chẩn đoán điều trị sốt xuất huyết Dengue | `Quyết định` | Bộ Y tế Việt Nam | 2018-03-29 | *Pending 🟡* |
| **`REF_INT_GINA_2024`** | Global Strategy for Asthma Management and Prevention (GINA 2024) | `QST Quốc tế` | Global Initiative for Asthma | 2024-05-01 | [Link 🌐](https://ginasthma.org/wp-content/uploads/2024/05/GINA-2024-Strategy-Report-24_05_22_WMS.pdf) |
| **`REF_INT_GOLD_2024`** | Global Strategy for Diagnosis, Management, and Prevention of COPD (GOLD 2024) | `QST Quốc tế` | Global Initiative for COPD | 2023-11-15 | [Link 🌐](https://goldcopd.org/wp-content/uploads/2024/02/POCKET-GUIDE-GOLD-2024-ver-1.2-11Jan2024_WMV.pdf) |
| **`REF_INT_ADA_2024`** | Standards of Care in Diabetes - 2024 (ADA 2024) | `QST Quốc tế` | American Diabetes Association | 2024-01-01 | *Pending 🌐* |
| **`REF_INT_KDIGO_2024`** | KDIGO 2024 Guideline for the Evaluation and Management of Chronic Kidney Disease | `QST Quốc tế` | Kidney Disease: Improving Global Outcomes | 2024-03-01 | *Pending 🌐* |
| **`REF_INT_ESC_2023`** | 2023 ESC Guidelines for the management of acute coronary syndromes | `QST Quốc tế` | European Society of Cardiology | 2023-08-25 | *Pending 🌐* |
| **`REF_MOH_2015_QD708`** | Quyết định số 708/QĐ-BYT ngày 02/03/2015 ban hành Hướng dẫn sử dụng kháng sinh | `Quyết định` | Bộ Y tế Việt Nam | 2015-03-02 | [Download 📥](raw_sources/REF_MOH_2015_QD708.pdf) |
| **`REF_MOH_2024_QD162`** | Quyết định số 162/QĐ-BYT ngày 19/01/2024 ban hành Hướng dẫn Chẩn đoán, điều trị và dự phòng bệnh Lao | `Quyết định` | Bộ Y tế Việt Nam | 2024-01-19 | [Download 📥](raw_sources/REF_MOH_2024_QD162.pdf) |
| **`REF_MOH_2021_QD5968`** | Quyết định số 5968/QĐ-BYT ngày 31/12/2021 ban hành Hướng dẫn điều trị và chăm sóc HIV/AIDS | `Quyết định` | Bộ Y tế Việt Nam | 2021-12-31 | [Download 📥](raw_sources/REF_MOH_2021_QD5968.pdf) |
| **`REF_MOH_2015_QD5642`** | Quyết định số 5642/QĐ-BYT ngày 31/12/2015 ban hành tài liệu Hướng dẫn chẩn đoán và điều trị một số bệnh truyền nhiễm | `Quyết định` | Bộ Y tế Việt Nam | 2015-12-31 | [Download 📥](raw_sources/REF_MOH_2015_QD5642.pdf) |
| **`REF_MOH_2021_QD5165`** | Quyết định số 5165/QĐ-BYT ngày 09/11/2021 ban hành Hướng dẫn chẩn đoán và điều trị bệnh Lậu | `Quyết định` | Bộ Y tế Việt Nam | 2021-11-09 | [Download 📥](raw_sources/REF_MOH_2021_QD5165.pdf) |

---

## 🏛️ Cấu trúc dự án
Mọi đóng góp bổ sung tài liệu mới xin vui lòng cập nhật thông tin trong tệp `library.json` và tải tệp PDF tương ứng vào thư mục `raw_sources/` trước khi tạo Pull Request.
