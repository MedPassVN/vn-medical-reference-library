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
    const ref = library.find(item => item.refId === 'REF_MOH_2017_TT51');
    console.log(`Tiêu đề: ${ref.title}`);
    console.log(`Đường dẫn tải PDF: https://<username>.github.io/vn-medical-reference-library/${ref.localPath}`);
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
        if entry.get("localPath"):
            pdf_url = f"{cdn_base}/{entry['localPath']}"
            print(f"[{entry['refId']}] -> {pdf_url}")
```

---

## 🗂️ Tra cứu nhanh Danh mục Tài liệu hiện có (41 Tài liệu Cốt lõi)

Dưới đây là mục lục tra cứu nhanh các tài liệu y khoa có sẵn trong thư viện:

| Mã Tài liệu (`ref_id`) | Tên Tài liệu Tham khảo | Loại văn bản | Cơ quan ban hành | Ngày hiệu lực | Tải PDF (Local CDN) |
| :--- | :--- | :---: | :--- | :---: | :---: |
| **`REF_MOH_2017_TT51`** | Thông tư số 51/2017/TT-BYT ngày 29/12/2017 Hướng dẫn phòng, chẩn đoán và xử trí phản vệ | `Thông tư` | Bộ Y tế Việt Nam | 2017-12-29 | [Download 📥](raw_sources/REF_MOH_2017_TT51.pdf) |
| **`REF_LAW_2023_KCB`** | Luật Khám bệnh, chữa bệnh số 15/2023/QH15 | `Luật` | Quốc hội Việt Nam | 2024-01-01 | [Download 📥](raw_sources/REF_LAW_2023_KCB.pdf) |
| **`REF_MOH_2014_QD1904`** | Quyết định số 1904/QĐ-BYT ngày 30/05/2014 ban hành tài liệu Hướng dẫn quy trình kỹ thuật chuyên ngành Hồi sức - Cấp cứu và Chống độc | `Quyết định` | Bộ Y tế Việt Nam | 2014-05-30 | [Download 📥](raw_sources/REF_MOH_2014_QD1904.pdf) |
| **`REF_MOH_2014_QD361`** | Quyết định số 361/QĐ-BYT ngày 25/01/2014 ban hành tài liệu Hướng dẫn chẩn đoán và điều trị các bệnh về Cơ xương khớp | `Quyết định` | Bộ Y tế Việt Nam | 2014-01-25 | [Download 📥](raw_sources/REF_MOH_2014_QD361.pdf) |
| **`REF_MOH_2020_QD2767`** | Tài liệu chuyên môn Hướng dẫn chẩn đoán và điều trị bệnh trẻ em (cập nhật năm 2020) của Bệnh viện Nhi Trung ương | `Hướng dẫn` | Bệnh viện Nhi Trung ương | 2020-01-01 | [Download 📥](raw_sources/REF_MOH_2020_QD2767.pdf) |
| **`REF_MOH_2020_QD4128`** | Quyết định số 4128/QĐ-BYT ngày 30/08/2020 ban hành tạm thời bổ sung danh mục kỹ thuật áp dụng trong hội chẩn, tư vấn khám, chữa bệnh từ xa | `Quyết định` | Bộ Y tế Việt Nam | 2020-08-30 | [Download 📥](raw_sources/REF_MOH_2020_QD4128.pdf) |
| **`REF_MOH_2020_QD1851`** | Quyết định số 1851/QĐ-BYT ngày 24/04/2020 ban hành tài liệu Hướng dẫn chẩn đoán và điều trị hen phế quản người lớn và trẻ em >= 12 tuổi | `Quyết định` | Bộ Y tế Việt Nam | 2020-04-24 | [Download 📥](raw_sources/REF_MOH_2020_QD1851.pdf) |
| **`REF_MOH_2023_QD2767`** | Quyết định số 2767/QĐ-BYT ngày 04/07/2023 ban hành tài liệu Hướng dẫn chẩn đoán và điều trị Bệnh phổi tắc nghẽn mạn tính | `Quyết định` | Bộ Y tế Việt Nam | 2023-07-04 | [Download 📥](raw_sources/REF_MOH_2023_QD2767.pdf) |
| **`REF_MOH_2010_QD3192`** | Quyết định số 3192/QĐ-BYT ngày 31/08/2010 ban hành tài liệu Hướng dẫn chẩn đoán và điều trị Tăng huyết áp | `Quyết định` | Bộ Y tế Việt Nam | 2010-08-31 | [Download 📥](raw_sources/REF_MOH_2010_QD3192.pdf) |
| **`REF_MOH_2020_QD5481`** | Quyết định số 5481/QĐ-BYT ngày 24/12/2020 ban hành tài liệu Hướng dẫn chẩn đoán và điều trị đái tháo đường typ 2 | `Quyết định` | Bộ Y tế Việt Nam | 2020-12-30 | [Download 📥](raw_sources/REF_MOH_2020_QD5481.pdf) |
| **`REF_MOH_2024_QD3312`** | Quyết định số 3312/QĐ-BYT ngày 05/11/2024 ban hành tài liệu Hướng dẫn chẩn đoán và điều trị đột quỵ não | `Quyết định` | Bộ Y tế Việt Nam | 2024-11-05 | [Download 📥](raw_sources/REF_MOH_2024_QD3312.pdf) |
| **`REF_MOH_2019_QD3310`** | Quyết định số 3310/QĐ-BYT ngày 29/07/2019 ban hành tài liệu Hướng dẫn chẩn đoán và điều trị viêm gan vi rút B | `Quyết định` | Bộ Y tế Việt Nam | 2019-07-29 | [Download 📥](raw_sources/REF_MOH_2019_QD3310.pdf) |
| **`REF_MOH_2023_QD1575`** | Quyết định số 1575/QĐ-BYT ngày 27/03/2023 ban hành Hướng dẫn khám sàng lọc trước tiêm chủng đối với trẻ em | `Quyết định` | Bộ Y tế Việt Nam | 2023-03-27 | [Download 📥](raw_sources/REF_MOH_2023_QD1575.pdf) |
| **`REF_MOH_2023_QD2248`** | Quyết định số 2248/QĐ-BYT ngày 19/05/2023 ban hành tài liệu Hướng dẫn chẩn đoán và điều trị Hội chứng mạch vành mạn | `Quyết định` | Bộ Y tế Việt Nam | 2023-05-19 | [Download 📥](raw_sources/REF_MOH_2023_QD2248.pdf) |
| **`REF_MOH_2024_QD1470`** | Quyết định số 1470/QĐ-BYT ngày 29/05/2024 ban hành Hướng dẫn quốc gia về sàng lọc và quản lý đái tháo đường thai kỳ | `Quyết định` | Bộ Y tế Việt Nam | 2024-05-29 | [Download 📥](raw_sources/REF_MOH_2024_QD1470.pdf) |
| **`REF_MOH_2024_QD2388`** | Quyết định số 2388/QĐ-BYT ngày 12/08/2024 ban hành tài liệu Hướng dẫn chẩn đoán và điều trị bệnh thận mạn và một số bệnh lý thận | `Quyết định` | Bộ Y tế Việt Nam | 2024-08-12 | [Download 📥](raw_sources/REF_MOH_2024_QD2388.pdf) |
| **`REF_MOH_2023_QD2760`** | Quyết định số 2760/QĐ-BYT ngày 04/07/2023 ban hành tài liệu Hướng dẫn chẩn đoán và điều trị Sốt xuất huyết Dengue | `Quyết định` | Bộ Y tế Việt Nam | 2023-07-04 | [Download 📥](raw_sources/REF_MOH_2023_QD2760.pdf) |
| **`REF_INT_GINA_2024`** | Global Strategy for Asthma Management and Prevention | `QST Quốc tế` | Global Initiative for Asthma (GINA) | 2024-05-01 | [Direct Link 🌐](https://ginasthma.org/wp-content/uploads/2024/05/GINA-2024-Strategy-Report-24_05_22_WMS.pdf) |
| **`REF_INT_GOLD_2024`** | Global Strategy for the Diagnosis, Management, and Prevention of Chronic Obstructive Pulmonary Disease | `QST Quốc tế` | Global Initiative for Chronic Obstructive Lung Disease (GOLD) | 2023-11-15 | [Direct Link 🌐](https://goldcopd.org/wp-content/uploads/2024/02/POCKET-GUIDE-GOLD-2024-ver-1.2-11Jan2024_WMV.pdf) |
| **`REF_INT_ADA_2024`** | Standards of Care in Diabetes - 2024 | `QST Quốc tế` | American Diabetes Association (ADA) | 2024-01-01 | [Direct Link 🌐](https://diabetesjournals.org/care/article-pdf/47/Supplement_1/S179/740326/dc24s010.pdf) |
| **`REF_INT_KDIGO_2024`** | KDIGO 2024 Clinical Practice Guideline for the Evaluation and Management of Chronic Kidney Disease | `QST Quốc tế` | Kidney Disease: Improving Global Outcomes (KDIGO) | 2024-03-01 | [Direct Link 🌐](https://kdigo.org/wp-content/uploads/2024/03/KDIGO-2024-CKD-Guideline.pdf) |
| **`REF_INT_ESC_2023`** | 2023 ESC Guidelines for the management of acute coronary syndromes | `QST Quốc tế` | European Society of Cardiology (ESC) | 2023-08-25 | [Direct Link 🌐](https://orbi.uliege.be/bitstream/2268/305943/1/ehad191.pdf) |
| **`REF_MOH_2015_QD708`** | Quyết định số 708/QĐ-BYT ngày 02/03/2015 ban hành Hướng dẫn sử dụng kháng sinh | `Quyết định` | Bộ Y tế Việt Nam | 2015-03-02 | [Download 📥](raw_sources/REF_MOH_2015_QD708.pdf) |
| **`REF_MOH_2024_QD162`** | Quyết định số 162/QĐ-BYT ngày 19/01/2024 ban hành Hướng dẫn Chẩn đoán, điều trị và dự phòng bệnh Lao | `Quyết định` | Bộ Y tế Việt Nam | 2024-01-19 | [Download 📥](raw_sources/REF_MOH_2024_QD162.pdf) |
| **`REF_MOH_2021_QD5968`** | Quyết định số 5968/QĐ-BYT ngày 31/12/2021 ban hành Hướng dẫn điều trị và chăm sóc HIV/AIDS | `Quyết định` | Bộ Y tế Việt Nam | 2021-12-31 | [Download 📥](raw_sources/REF_MOH_2021_QD5968.pdf) |
| **`REF_MOH_2015_QD5642`** | Quyết định số 5642/QĐ-BYT ngày 31/12/2015 ban hành tài liệu Hướng dẫn chẩn đoán và điều trị một số bệnh truyền nhiễm | `Quyết định` | Bộ Y tế Việt Nam | 2015-12-31 | [Download 📥](raw_sources/REF_MOH_2015_QD5642.pdf) |
| **`REF_MOH_2021_QD5165`** | Quyết định số 5165/QĐ-BYT ngày 09/11/2021 ban hành Hướng dẫn chẩn đoán và điều trị bệnh Lậu | `Quyết định` | Bộ Y tế Việt Nam | 2021-11-09 | [Download 📥](raw_sources/REF_MOH_2021_QD5165.pdf) |
| **`REF_MOH_2025_QD1019`** | Quyết định số 1019/QĐ-BYT ngày 26/03/2025 ban hành tài liệu Hướng dẫn chẩn đoán và điều trị bệnh Sởi | `Quyết định` | Bộ Y tế Việt Nam | 2025-03-26 | [Download 📥](raw_sources/REF_MOH_2025_QD1019.pdf) |
| **`REF_MOH_2025_QD1840`** | Quyết định số 1840/QĐ-BYT ngày 03/06/2025 ban hành tài liệu Hướng dẫn chẩn đoán và điều trị cúm mùa | `Quyết định` | Bộ Y tế Việt Nam | 2025-06-03 | [Download 📥](raw_sources/REF_MOH_2025_QD1840.pdf) |
| **`REF_MOH_2022_QD1832`** | Quyết định số 1832/QĐ-BYT ngày 01/07/2022 ban hành tài liệu Hướng dẫn chẩn đoán và điều trị một số bệnh lý Huyết học | `Quyết định` | Bộ Y tế Việt Nam | 2022-07-01 | [Download 📥](raw_sources/REF_MOH_2022_QD1832.pdf) |
| **`REF_MOH_2020_QD2058`** | Quyết định số 2058/QĐ-BYT ngày 14/05/2020 ban hành tài liệu chuyên môn Hướng dẫn chẩn đoán và điều trị một số rối loạn tâm thần thường gặp | `Quyết định` | Bộ Y tế Việt Nam | 2020-05-14 | [Download 📥](raw_sources/REF_MOH_2020_QD2058.pdf) |
| **`REF_MOH_2015_QD40`** | Quyết định số 40/QĐ-BYT ngày 12/01/2015 ban hành tài liệu chuyên môn Hướng dẫn chẩn đoán và điều trị các bệnh về mắt | `Quyết định` | Bộ Y tế Việt Nam | 2015-01-12 | [Download 📥](raw_sources/REF_MOH_2015_QD40.pdf) |
| **`REF_MOH_2022_QD2558`** | Quyết định số 2558/QĐ-BYT ngày 20/09/2022 ban hành tài liệu Hướng dẫn chẩn đoán, điều trị và quản lý bệnh võng mạc đái tháo đường | `Quyết định` | Bộ Y tế Việt Nam | 2022-09-20 | [Download 📥](raw_sources/REF_MOH_2022_QD2558.pdf) |
| **`REF_MOH_2015_QD5643`** | Quyết định số 5643/QĐ-BYT ngày 31/12/2015 ban hành tài liệu chuyên môn Hướng dẫn chẩn đoán và điều trị một số bệnh về Tai Mũi Họng | `Quyết định` | Bộ Y tế Việt Nam | 2015-12-31 | [Download 📥](raw_sources/REF_MOH_2015_QD5643.pdf) |
| **`REF_MOH_2023_QD4416`** | Quyết định số 4416/QĐ-BYT ngày 06/12/2023 ban hành tài liệu chuyên môn Hướng dẫn chẩn đoán và điều trị các bệnh Da liễu | `Quyết định` | Bộ Y tế Việt Nam | 2023-12-06 | [Download 📥](raw_sources/REF_MOH_2023_QD4416.pdf) |
| **`REF_MOH_2016_QD4484`** | Quyết định số 4484/QĐ-BYT ngày 18/08/2016 ban hành tài liệu Hướng dẫn quy trình kỹ thuật Ngoại khoa, chuyên khoa Chấn thương Chỉnh hình | `Quyết định` | Bộ Y tế Việt Nam | 2016-08-18 | [Download 📥](raw_sources/REF_MOH_2016_QD4484.pdf) |
| **`REF_MOH_2015_QD315`** | Quyết định số 315/QĐ-BYT ngày 29/01/2015 ban hành tài liệu chuyên môn Hướng dẫn chẩn đoán và điều trị các bệnh Sản Phụ khoa | `Quyết định` | Bộ Y tế Việt Nam | 2015-01-29 | [Download 📥](raw_sources/REF_MOH_2015_QD315.pdf) |
| **`REF_MOH_2025_QD2598`** | Quyết định số 2598/QĐ-BYT ngày 18/08/2025 ban hành tài liệu Hướng dẫn quốc gia về Dinh dưỡng lâm sàng | `Quyết định` | Bộ Y tế Việt Nam | 2025-08-18 | [Download 📥](raw_sources/REF_MOH_2025_QD2598.pdf) |
| **`REF_MOH_2024_QD3777`** | Quyết định số 3777/QĐ-BYT ngày 16/12/2024 ban hành tài liệu Hướng dẫn chuyên môn Đánh giá tình trạng dinh dưỡng trẻ em bằng các chỉ số nhân trắc cơ bản tại cộng đồng | `Quyết định` | Bộ Y tế Việt Nam | 2024-12-16 | [Download 📥](raw_sources/REF_MOH_2024_QD3777.pdf) |
| **`REF_MOH_2017_QD5590`** | Quyết định số 5590/QĐ-BYT ngày 13/12/2017 ban hành Hướng dẫn quy trình kỹ thuật Ngoại khoa, chuyên khoa Phẫu thuật Thần kinh | `Quyết định` | Bộ Y tế Việt Nam | 2017-12-13 | [Download 📥](raw_sources/REF_MOH_2017_QD5590.pdf) |
| **`REF_MOH_2017_QD5731`** | Quyết định số 5731/QĐ-BYT ngày 21/12/2017 ban hành Hướng dẫn quy trình kỹ thuật Ngoại khoa, chuyên khoa Phẫu thuật Tiết niệu | `Quyết định` | Bộ Y tế Việt Nam | 2017-12-21 | [Download 📥](raw_sources/REF_MOH_2017_QD5731.pdf) |

---

## 🏛️ Cấu trúc dự án
Mọi đóng góp bổ sung tài liệu mới xin vui lòng cập nhật thông tin trong tệp `library.json` và tải tệp PDF tương ứng vào thư mục `raw_sources/` trước khi tạo Pull Request.
