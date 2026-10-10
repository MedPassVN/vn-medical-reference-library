# Hướng dẫn cho agent — vn-medical-reference-library

## Truy cập site Việt Nam chặn IP nước ngoài (MedPass fetch relay)

Container chạy ở nước ngoài. Một số site Việt Nam (đặc biệt `moh.gov.vn`, các cổng chính phủ, ngân hàng, đại học) reset kết nối, timeout hoặc trả 403/451 với IP nước ngoài.

- **Mặc định truy cập trực tiếp.** Chỉ dùng relay khi request trực tiếp tới site Việt Nam bị timeout, reset/refused, 403/451 hoặc trang chặn theo vùng, hoặc khi đã biết site chỉ nhận IP Việt Nam (vd `moh.gov.vn`).
- Dùng script: `python3 scripts/relay_fetch.py <URL> -o <file>`. Script thử trực tiếp trước rồi mới qua relay; thêm `--relay` để đi thẳng qua relay. Mã thoát khác 0 nghĩa là file không dùng được.
- Luôn kiểm tra `status` của upstream. Với PDF, chạy `pdfinfo` để chắc chắn đó không phải trang lỗi HTML.
- **Không bao giờ in, log hay commit `AGENT_AUTH_TOKEN`.**
- Relay cũng lỗi → báo người dùng, **không lặp lại**. Lỗi chứng chỉ/TLS không tự hết khi thử lại. Không tắt kiểm tra TLS.
- `sourceUrl` trong `library.json` ghi URL gốc của site nguồn, không ghi URL relay.

Chi tiết API, bảng mã lỗi và tình trạng từng nguồn: [`docs/MEDPASS_FETCH_RELAY.md`](docs/MEDPASS_FETCH_RELAY.md).
