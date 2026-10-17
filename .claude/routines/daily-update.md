# Routine hằng ngày — cập nhật tài liệu y khoa mới

Bạn là routine chạy mỗi sáng (06:52 giờ Việt Nam) trên repo `MedPassVN/vn-medical-reference-library`. Nhiệm vụ: phát hiện văn bản chuyên môn y khoa **mới** chưa có trong thư viện, tải về, chuyển sang Markdown trung thực, kiểm tra độc lập, rồi **commit thẳng lên `main`** (chủ repo đã quyết định: không tạo PR, không tạo GitHub issue).

> ⚠️ Đây là tài liệu y khoa dùng cho lâm sàng và thi đánh giá năng lực. **Sai một liều thuốc là sai sót nghiêm trọng.** Thà bỏ qua một tài liệu hôm nay còn hơn đưa lên bản chuyển đổi sai. Đọc kỹ `.claude/routines/conversion-rules.md`.

## 0. Chuẩn bị
Routine bắn vào **một session chuyên dụng đã gắn sẵn repo** (có quyền push). Mỗi lần chạy là một lượt mới: bắt đầu lại từ `origin/main`, không dựa vào trạng thái của lượt trước. Nếu working tree còn file chưa commit từ lượt trước → ghi vào báo cáo rồi bỏ đi (`git clean`/`git checkout` chỉ khi chắc chắn đó là file tạm của lượt trước).

Kiểm tra quyền push: `git push --dry-run origin origin/main:refs/heads/main`. **Chỉ khi** không có repo hoặc push bị từ chối (403) mới gắn repo:
1. Gọi tool `add_repo` (server `claude-code-remote`; nạp bằng ToolSearch nếu cần) với `owner: "MedPassVN"`, `repo: "vn-medical-reference-library"`, `access: "push"`; làm theo lệnh clone mà tool trả về.
2. Gọi `register_repo_root` với đúng đường dẫn đã clone, để `CLAUDE.md` và `.claude/agents/` được nạp ở lượt sau.
3. Không gắn được repo / không có quyền push → vẫn chạy phát hiện (bước 1) và báo cáo, **không chuyển đổi tài liệu**.

```bash
cd <repo>
git fetch origin main && git checkout -B main origin/main
pip install -q pdfplumber
mkdir -p /tmp/mmd && npm i -s --no-save --prefix /tmp/mmd mermaid@11.4.1 playwright-core@1.47.2
export NODE_PATH=/tmp/mmd/node_modules
export CHROMIUM_PATH=$(ls /opt/pw-browsers/chromium_headless_shell-*/*/headless_shell 2>/dev/null | head -1)
python3 scripts/validate_library.py --quiet && node scripts/check_mermaid.js | tail -1
```
Nếu validator hoặc mermaid đang đỏ trên `main` từ trước → ghi vào báo cáo cuối, không sửa ngoài phạm vi (trừ lỗi cú pháp/ký tự hiển nhiên).

Đọc: `library.json` (danh mục hiện có), `audit/seen_sources.json` (các văn bản đã xét — **không xét lại** mục đã `accepted`/`rejected`/`skipped`; mục `blocked` được thử lại tối đa 3 lần), `.claude/routines/conversion-rules.md`.

## 1. Phát hiện văn bản mới
Tìm văn bản ban hành trong ~60 ngày gần đây (và bất kỳ văn bản nào chưa có trong `seen_sources.json`):

**Nguồn trong nước.** Container ở nước ngoài: `kcb.vn`, `vbpl.vn` truy cập trực tiếp; `moh.gov.vn`, `congbao.chinhphu.vn` và nhiều cổng sở y tế chặn IP nước ngoài → dùng **MedPass fetch relay**: `python3 scripts/relay_fetch.py <URL> [--relay] -o <file>` (xem `CLAUDE.md` và `docs/MEDPASS_FETCH_RELAY.md`; không bao giờ in/log/commit `AGENT_AUTH_TOKEN`; relay lỗi → ghi vào báo cáo, không lặp lại; `sourceUrl` ghi URL gốc, không ghi URL relay). Trang chủ moh.gov.vn render bằng JS — cần URL văn bản/PDF cụ thể (tìm qua WebSearch).
- Cục Quản lý Khám, chữa bệnh: `https://kcb.vn/van-ban/chi-dao-dieu-hanh/chi-thi-quyet-dinh` và `https://kcb.vn/van-ban` (đọc danh sách, tìm "Hướng dẫn chẩn đoán và điều trị", "Hướng dẫn quy trình kỹ thuật", "tài liệu chuyên môn").
- WebSearch (mode "standard", tiếng Việt), ví dụ: `"QĐ-BYT" 2026 "Hướng dẫn chẩn đoán và điều trị"`, `Bộ Y tế ban hành hướng dẫn chẩn đoán điều trị tháng <MM>/<YYYY>`, `"tài liệu chuyên môn" Bộ Y tế <tháng> <năm>`.
- Thông tư chuyên môn của Bộ Y tế, luật y tế mới (Quốc hội).

**Nguồn quốc tế** (chỉ các tổ chức đã có trong thư viện: GINA, GOLD, ADA, KDIGO, ESC) — kiểm tra bản mới hơn bản đang có (vd GINA 2026 > `REF_INT_GINA_2024`).

**Lọc phạm vi — chỉ nhận:** hướng dẫn chẩn đoán/điều trị, quy trình kỹ thuật chuyên môn, phác đồ, tài liệu chuyên môn lâm sàng, thông tư/luật chuyên môn y tế. **Loại:** văn bản hành chính, nhân sự, đấu thầu, giá dịch vụ, kế hoạch, công văn. Ghi mọi văn bản đã xét vào `seen_sources.json` (kể cả bị loại, kèm lý do ngắn).

**Khử trùng lặp:** so `documentNumber` + năm với `library.json` và `seen_sources.json`.

## 2. Giới hạn mỗi lần chạy
- **Không chuyển đổi tài liệu > 100 trang PDF** (quyết định của chủ repo, 2026-10-17). Tải PDF vào thư mục tạm chỉ để đếm trang bằng `pdfinfo` (biết chắc số trang từ nguồn chính thống thì không cần tải), **không** lưu vào `raw_sources/`, không tạo Markdown, không đăng ký vào `library.json`. Ghi vào `seen_sources.json` với `status: "skipped"`, `reason: "> 100 trang (<số trang> tr.) — không chuyển đổi theo quy định routine"`, kèm `pages` và `sourceUrl` (URL gốc) nếu có; nêu trong báo cáo cuối. Mục `skipped` không xét lại ở các lượt sau. Áp dụng cả cho mục `queued`/`blocked` cũ khi đến lượt xử lý.
- Tối đa **2 tài liệu Việt Nam mới** (≤ 100 trang) mỗi lần (ưu tiên mới nhất, liên quan lâm sàng rộng). Phần còn lại ghi `status: "queued"` cho ngày sau.
- Cập nhật quốc tế (remoteOnly) không giới hạn — chỉ là metadata.
- Không có gì mới → **không commit**, kết thúc với báo cáo 1 dòng "Không có văn bản mới".

## 3. Với mỗi tài liệu Việt Nam được chọn
1. **Tải PDF** từ nguồn chính thống nhất tìm được (ưu tiên moh.gov.vn / kcb.vn / vbpl.vn / cổng sở y tế, bệnh viện công; trang thứ cấp chỉ khi không có bản chính thống) bằng `scripts/relay_fetch.py` (tự thử trực tiếp trước, bị chặn mới qua relay; mã thoát ≠ 0 → file không dùng được). Lưu tạm, kiểm tra `pdfinfo` mở được, số trang hợp lý, trang 1 đúng số/ngày văn bản. Không tải được bản PDF đầy đủ → `blocked` (lý do), bỏ qua. **> 100 trang → `skipped` theo mục 2, dừng xử lý tài liệu đó.**
2. **refId**: `REF_MOH_<năm ban hành>_QD<số>` (Thông tư: `_TT<số>`; Luật: `REF_LAW_<năm>_<viết tắt>`). Trùng refId đã có → thêm hậu tố chữ cái. Lưu PDF vào `raw_sources/<refId>.pdf`.
3. **Chuyển đổi** → `markdown_docs/<refId>.md`: giao cho **subagent `general-purpose` với `model: "opus"`**, prompt yêu cầu đọc và tuân thủ tuyệt đối `.claude/routines/conversion-rules.md`, đọc 100% trang PDF bằng ảnh, dựng mọi bảng/lưu đồ/phụ lục. Tài liệu dài (vd > 50 trang) có thể chia nhiều subagent theo dải trang ghi vào các file tạm rồi ghép — mỗi subagent một file riêng. **Mỗi subagent dùng thư mục tạm riêng** (vd `/tmp/rt/<refId>-<vai trò>/`) cho ảnh render — không dùng chung thư mục ảnh (lần chạy 2026-10-10 các agent đã ghi đè ảnh của nhau).
4. **Kiểm tra độc lập**: giao cho **subagent `ref-doc-fidelity-checker`** (chỉ đọc; nếu loại agent này không có trong session — vd repo được clone sau khi session khởi động — dùng `general-purpose` với `model: "opus"`, prompt bắt đầu bằng toàn bộ nội dung `.claude/agents/ref-doc-fidelity-checker.md` và nhấn mạnh CHỈ ĐỌC; agent chuyển đổi và agent kiểm tra **phải khác nhau**) rà soát đầy đủ theo quy trình của agent: đọc 100% trang; bảng số liệu dày phải **chép độc lập từ ảnh rồi so tự động**; mọi lưu đồ so từng node/mũi tên. Yêu cầu trả về verdict + số lỗi 🔴/🟠/🟡/⚪ + danh sách lỗi (dòng MD, trang PDF).
5. **Sửa & kiểm lại**: còn lỗi 🔴/🟠/🟡 → giao lại subagent chuyển đổi sửa đúng các lỗi đó (theo ảnh), rồi chạy lại kiểm tra độc lập **trên phần đã sửa**. Tối đa 2 vòng.
6. **Điều kiện để commit:** verdict PASS hoặc PASS-WITH-WARNINGS với **🔴 0, 🟠 0, 🟡 0**; validator 0 ERROR; mermaid `invalid: 0`. Không đạt sau 2 vòng → **không commit tài liệu đó**: xoá PDF/MD tạm khỏi working tree, ghi `blocked` + lý do + `attempts` vào `seen_sources.json`.
7. **Đăng ký** (khi đạt): thêm entry vào `library.json` (giữ định dạng `json.dumps(indent=2, ensure_ascii=False)`), các trường: `title` (nguyên văn trích yếu: "Quyết định số …/QĐ-BYT ngày dd/mm/yyyy ban hành …"), `tags` (dùng **từ vựng tag đã có** trong `library.json`: chuyên khoa `PULMONOLOGY`, `CARDIOLOGY`…; mã `VĐ xx` chỉ khi tài liệu cùng bệnh với entry đã có mã đó — không tự đặt mã mới), `version`, `refId`, `documentType` (`MOH_GUIDELINE` | `CIRCULAR` | `LAW` | `HOSPITAL_GUIDELINE`), `documentNumber`, `issuingAuthority`, `effectiveDate` (YYYY-MM-DD, theo "có hiệu lực" trong văn bản, thường là ngày ký), `sourceUrl`, `localPath`.
8. **Thay thế**: đọc điều khoản hiệu lực (thường "Điều 3 … thay thế Quyết định số …"). Nếu văn bản bị thay thế có trong thư viện → entry cũ thêm `"status": "superseded"`, `"supersededBy": "<refId mới>"`. Không xoá entry/file cũ.
9. Ghi kết quả rà soát vào `FIDELITY_REVIEW.md` (mục mới đánh số tiếp theo, cùng định dạng các mục hiện có) và dòng tương ứng trong bảng tổng hợp.

## 4. Cập nhật quốc tế (remoteOnly)
Bản mới của GINA/GOLD/ADA/KDIGO/ESC: thêm entry `REF_INT_<ORG>_<năm>` với `remoteOnly: true`, `sourceUrl` = link PDF/trang chính thức của tổ chức (kiểm tra link mở được hoặc là trang chính thức), không `localPath`; entry cũ → `status: "superseded"`, `supersededBy`. Không tải PDF quốc tế vào repo (bản quyền).

## 5. Hoàn tất
```bash
python3 scripts/build_readme_table.py
python3 scripts/validate_library.py --report audit/registry_report.json   # phải 0 ERROR
node scripts/check_mermaid.js | tail -1                                    # invalid: 0
```
- Thêm 1 mục vào `audit/routine_log.md` (ngày, văn bản đã thêm/xếp hàng/bị chặn, verdict).
- Commit **mỗi tài liệu một commit** (`feat(library): thêm <refId> — <tên ngắn>` + verdict kiểm tra độc lập trong thân commit), commit metadata/log riêng. Rồi:
```bash
git fetch origin main && git rebase origin/main && git push origin HEAD:main
```
(Push lỗi mạng → thử lại tối đa 4 lần, chờ 2/4/8/16 giây. Rebase xung đột → dừng, báo cáo, không force-push.)

## 6. Báo cáo cuối (ngắn, tiếng Việt — đây là nội dung thông báo gửi chủ repo)
- Văn bản mới đã thêm (refId, tên, số trang, verdict, link commit).
- Văn bản đang xếp hàng / bị chặn / bỏ qua vì > 100 trang (lý do, số trang).
- Cập nhật quốc tế, văn bản bị thay thế.
- Mâu thuẫn trong bản gốc cần biên tập viên y khoa quyết định (đã giữ nguyên văn + ghi chú).
- Không có gì mới → 1 dòng.

## Không bao giờ
- Tự sinh/tính số liệu; dùng nguồn ngoài để "điền" bảng.
- Commit tài liệu chưa qua kiểm tra độc lập hoặc còn lỗi 🔴/🟠/🟡.
- Chuyển đổi tài liệu > 100 trang PDF.
- Xoá/đổi `refId` của tài liệu đã có (phá link CDN của client).
- Force-push, sửa lịch sử `main`, tạo PR/issue.
