# MedPass fetch relay — Hướng dẫn cho agent

Container cloud của agent có Internet bình thường, nhưng **IP ở nước ngoài**. Nhiều site Việt Nam chặn hoặc giới hạn theo vùng với IP nước ngoài: chủ yếu là site chính phủ, ngân hàng, cổng thanh toán, trường đại học và một số dịch vụ trong nước. **MedPass fetch relay** gửi request từ mạng của MedPass ở Việt Nam và trả về toàn bộ response dạng JSON.

> **Tóm tắt:** dùng `python3 scripts/relay_fetch.py <URL> -o <file>`. Script thử kết nối trực tiếp trước, chỉ chuyển sang relay khi bị chặn, và tự giải mã body.

---

## 1. Khi nào dùng relay

**Mặc định luôn truy cập trực tiếp.** Chỉ dùng relay khi:

- Request trực tiếp tới site Việt Nam bị **timeout**, **connection reset/refused**, hoặc trả **403/451** hay trang "not available in your region"; **hoặc**
- Đã biết trước site chỉ nhận IP Việt Nam (xem bảng ở mục 5).

**Không** dùng relay cho site truy cập trực tiếp được: relay chậm hơn, giới hạn **10 MB/response** và **120 s/request**, và mọi request đi qua proxy của MedPass.

**Nếu relay cũng thất bại → báo người dùng, không lặp lại.**

## 2. Cách dùng nhanh: `scripts/relay_fetch.py`

```bash
# Tự động: thử trực tiếp, lỗi (timeout/reset/403/451) thì qua relay
python3 scripts/relay_fetch.py "https://moh.gov.vn/..." -o raw_sources/REF_MOH_2026_QDxxxx.pdf

# Site đã biết chặn IP nước ngoài → đi thẳng qua relay
python3 scripts/relay_fetch.py "https://moh.gov.vn/..." --relay -o /tmp/page.html

# Chỉ xem status + headers (HEAD), ví dụ kiểm tra link còn sống
python3 scripts/relay_fetch.py "https://moh.gov.vn/..." --relay --head

# Tăng timeout cho file lớn (relay tối đa 120 s)
python3 scripts/relay_fetch.py URL --relay -o out.pdf --timeout 110
```

Script in tóm tắt JSON ra stdout (`via`, `status`, `url` cuối cùng, `contentType`, `bytes`, `truncated`, `savedTo`) và in lỗi ra stderr.

| Mã thoát | Ý nghĩa |
|---|---|
| `0` | Upstream trả 2xx/3xx, body đầy đủ |
| `1` | Upstream trả 4xx/5xx **hoặc** body bị cắt ở 10 MB. Body vẫn được lưu, nhưng **không dùng làm tài liệu**. |
| `2` | Không tải được: lỗi trực tiếp và lỗi relay, relay báo lỗi, hoặc thiếu token |

Sau khi tải PDF, **luôn kiểm tra** file là PDF thật chứ không phải trang lỗi HTML: `pdfinfo <file>` phải in ra `Pages:`.

## 3. Gọi API relay trực tiếp

Chỉ cần khi script không đáp ứng được, ví dụ cần POST, header riêng, hoặc `followRedirects: false`.

```
POST https://service.medpass.vn/api/agent/fetch
Authorization: Bearer $AGENT_AUTH_TOKEN
Content-Type: application/json
```

> 🔒 **Không bao giờ in, log, commit hay chuyển tiếp `AGENT_AUTH_TOKEN`.** Luôn tham chiếu qua biến môi trường (`$AGENT_AUTH_TOKEN`), không chép giá trị vào lệnh, file hay comment.

> ⚠️ Relay nằm sau Cloudflare. Cloudflare **chặn User-Agent mặc định của `Python-urllib`** (trả `error code: 1010`). Khi gọi bằng code, hãy đặt `User-Agent` riêng cho request POST tới relay. `curl` không bị chặn.

### Request body

| Trường | Kiểu | Mặc định | Ghi chú |
|---|---|---|---|
| `url` | string, **bắt buộc** | — | URL tuyệt đối `http`/`https`. Không có `user:pass@`. |
| `method` | string | `GET` | GET, HEAD, POST, PUT, PATCH, DELETE, OPTIONS |
| `headers` | object string → string | `{}` | Host, Content-Length, Connection, Transfer-Encoding, Proxy-* bị bỏ |
| `body` | string hoặc JSON | — | Không dùng với GET/HEAD. Object/array được serialize kèm `content-type: application/json` (trừ khi đã đặt) |
| `bodyEncoding` | `"text"` \| `"base64"` | `"text"` | Cách giải mã `body` dạng string. Upload nhị phân dùng `base64` (base64 chuẩn, có padding) |
| `responseEncoding` | `"text"` \| `"base64"` | auto | Để trống trừ khi cần ép |
| `timeoutMs` | number | 30000 | Giới hạn trong khoảng 1000–120000 |
| `followRedirects` | boolean | `true` | `false` để nhận chính response 3xx |

Sai kiểu dữ liệu → bị từ chối với HTTP 400, **không** tự lấy giá trị mặc định.

### Ví dụ curl

```bash
curl -sS https://service.medpass.vn/api/agent/fetch \
  -H "Authorization: Bearer $AGENT_AUTH_TOKEN" -H "Content-Type: application/json" \
  -d '{"url":"https://moh.gov.vn/","timeoutMs":60000}' -o resp.json
```

### Response thành công (relay trả HTTP 200, **kể cả khi upstream trả 4xx/5xx**)

```json
{
  "status": 200, "statusText": "OK",
  "url": "https://moh.gov.vn/", "redirected": false,
  "headers": { "content-type": "text/html;charset=UTF-8", "set-cookie": ["a=1", "b=2"] },
  "body": "...", "bodyEncoding": "text", "truncated": false
}
```

- **Luôn kiểm tra `status`**, tức mã của upstream. HTTP 200 từ relay chỉ có nghĩa relay hoạt động.
- `bodyEncoding: "base64"` → phải giải mã `body`. Ở chế độ auto, relay chỉ trả text cho content-type dạng văn bản và UTF-8 hợp lệ. **PDF, ảnh, charset khác hoặc thiếu content-type đều về dạng base64.**
- `set-cookie` là mảng; các header khác là string.
- Response nén được giải nén sẵn; khi đó `content-encoding`, `content-length` và header digest bị bỏ.
- `truncated: true` → body bị cắt ở 10 MB, **file không đầy đủ**. Cần tải theo trang hoặc range nhỏ hơn, hoặc nhờ người dùng tải thủ công.
- `url` là URL cuối cùng sau redirect.

### Lỗi ở tầng relay

Dạng `{ "success": false, "errorCode": "...", "message": "..." }`. Với lỗi upstream, `message` nêu nguyên nhân gốc, ví dụ `Request through proxy failed (CERT_HAS_EXPIRED): certificate has expired`.

| HTTP | errorCode | Ý nghĩa / cách xử lý |
|---|---|---|
| 400 | `INVALID_REQUEST` | Input sai, hoặc URL/DNS trỏ tới địa chỉ private/reserved/internal. Đọc `message`, sửa request rồi thử lại. |
| 401 / 403 | (auth) | Token sai hoặc relay chưa cấu hình. **Không thử lại** — báo người dùng. |
| 424 | `UPSTREAM_UNREACHABLE` | Lỗi DNS, kết nối, TLS hoặc proxy. Đọc nguyên nhân trong `message`. Thử lại **tối đa 1 lần**. Lỗi TLS/chứng chỉ **không tự hết** khi thử lại. |
| 424 | `UPSTREAM_TIMEOUT` | Hết `timeoutMs`. Thử lại 1 lần với timeout lớn hơn nếu hợp lý. |
| 424 | `REDIRECT_NOT_ALLOWED` | Redirect trỏ tới địa chỉ bị chặn. |
| 424 | `TOO_MANY_REDIRECTS` | Quá 5 lần redirect. |
| 500 | — | Lỗi server relay. Báo người dùng, không lặp. |

**Trả lời dạng text `error code: NNNN` (không phải JSON) là của Cloudflare, không phải relay:**
- `error code: 5xx` → server relay đang down hoặc khởi động lại. Báo người dùng, **không thử lại liên tục**.
- `error code: 1010` / `1020` → Cloudflare chặn client, thường do User-Agent (xem cảnh báo ở trên).

## 4. Quy tắc relay áp dụng (không tìm cách lách)

- Chỉ host công khai. Localhost, mạng private, link-local, metadata, dải tài liệu và các dải IPv4/IPv6 không toàn cục đều bị từ chối. Tên miền một nhãn và `.local`/`.internal` cũng vậy. Quy tắc này áp dụng cho **mọi bước redirect**.
- Redirect chỉ được theo với 301, 302, 303, 307, 308. Với 303, hoặc 301/302 sau POST, request chuyển thành GET không body.
- Redirect sang origin khác: chỉ giữ `accept`, `accept-language`, `cache-control`, `content-language`, `content-type`, `pragma`, `user-agent`. **Authorization, Cookie, X-API-Key bị bỏ.** Nếu API redirect chéo origin và cần xác thực, gọi `followRedirects: false`, rồi chủ động gửi lại credentials tới URL đích.

## 5. Tình trạng các nguồn hay dùng (kiểm tra ngày 2026-10-10)

| Host | Trực tiếp | Qua relay | Ghi chú |
|---|---|---|---|
| `moh.gov.vn`, `www.moh.gov.vn` | ❌ connection reset khi bắt tay TLS (~12 s) | ✅ 200 | Trang chủ là khung HTML render bằng JavaScript, gần như không có nội dung. Cần URL cụ thể tới văn bản/PDF. |
| `emohbackup.moh.gov.vn` | ❌ chứng chỉ hết hạn | ❌ `CERT_HAS_EXPIRED` | Không dùng được. Không tắt kiểm tra TLS. |
| `kcb.vn` | ✅ 200 | — | Truy cập trực tiếp, không cần relay |
| `soyt.langson.gov.vn` | — | ✅ PDF (base64) tải đúng | |

Gặp host mới bị chặn → cập nhật bảng này trong cùng PR.

## 6. Lưu ý riêng cho thư viện này

- PDF tải qua relay lưu vào `raw_sources/<refId>.pdf` như bình thường. `sourceUrl` trong `library.json` vẫn ghi **URL gốc của site nguồn**, không ghi URL relay.
- Văn bản trên moh.gov.vn thường dài, có PDF > 10 MB. Nếu `truncated: true` thì **không commit file**: tìm bản ở nguồn khác (kcb.vn, vbpl.vn, congbao.chinhphu.vn, sở y tế) hoặc báo người dùng tải thủ công.
- Không bao giờ tắt kiểm tra TLS (`-k`, `verify=False`) hay bỏ `HTTPS_PROXY` của container để "vượt" lỗi.
