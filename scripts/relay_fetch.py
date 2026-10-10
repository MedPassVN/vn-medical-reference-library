#!/usr/bin/env python3
"""Tải một URL, tự chuyển sang MedPass fetch relay khi site chặn IP nước ngoài.

Nhiều site Việt Nam (moh.gov.vn, một số cổng chính phủ, ngân hàng, trường đại học...)
reset kết nối hoặc trả 403/451 với IP ngoài Việt Nam. Relay của MedPass gửi request
từ mạng MedPass ở Việt Nam và trả về toàn bộ response dạng JSON.
Hướng dẫn đầy đủ: docs/MEDPASS_FETCH_RELAY.md

Dùng:
    python3 scripts/relay_fetch.py URL -o out.pdf            # thử trực tiếp, lỗi thì qua relay
    python3 scripts/relay_fetch.py URL -o out.html --relay   # đi thẳng qua relay (site đã biết chặn)
    python3 scripts/relay_fetch.py URL --direct              # chỉ thử trực tiếp, không dùng relay
    python3 scripts/relay_fetch.py URL --head                # chỉ in status + headers

Cần biến môi trường AGENT_AUTH_TOKEN để dùng relay (không bao giờ in/log token).

Mã thoát:
    0 — upstream trả 2xx/3xx, body đã lưu (nếu có -o)
    1 — upstream trả 4xx/5xx, hoặc body bị cắt ở 10 MB (body vẫn được lưu nếu có -o)
    2 — không tải được (lỗi mạng trực tiếp + lỗi relay, hoặc relay từ chối request)
"""
import argparse
import base64
import json
import os
import ssl
import sys
import urllib.error
import urllib.request

RELAY_URL = "https://service.medpass.vn/api/agent/fetch"
CA_BUNDLE = "/root/.ccr/ca-bundle.crt"
UA = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
# Mã upstream coi là "bị chặn theo vùng" → đáng thử lại qua relay.
GEO_BLOCK_STATUS = {403, 451}


def ssl_context():
    if os.path.exists(CA_BUNDLE):
        return ssl.create_default_context(cafile=CA_BUNDLE)
    return ssl.create_default_context()


def fetch_direct(url, method, timeout):
    """Trả (status, headers, body_bytes, final_url). Ném lỗi khi không kết nối được."""
    req = urllib.request.Request(url, method=method, headers={"User-Agent": UA})
    try:
        with urllib.request.urlopen(req, timeout=timeout, context=ssl_context()) as r:
            return r.status, dict(r.headers), r.read(), r.geturl()
    except urllib.error.HTTPError as e:
        return e.code, dict(e.headers), e.read(), url


def fetch_relay(url, method, timeout):
    """Trả (status, headers, body_bytes, final_url, truncated). Ném RuntimeError khi relay lỗi."""
    token = os.environ.get("AGENT_AUTH_TOKEN")
    if not token:
        raise RuntimeError("thiếu biến môi trường AGENT_AUTH_TOKEN — không dùng được relay")
    timeout_ms = max(1000, min(120000, int(timeout * 1000)))
    payload = json.dumps({"url": url, "method": method, "headers": {"User-Agent": UA},
                          "timeoutMs": timeout_ms}).encode()
    req = urllib.request.Request(RELAY_URL, data=payload, method="POST", headers={
        "Authorization": f"Bearer {token}", "Content-Type": "application/json",
        # Cloudflare trước relay chặn UA mặc định "Python-urllib" (error code: 1010).
        "User-Agent": "medpass-relay-fetch/1.0"})
    try:
        with urllib.request.urlopen(req, timeout=timeout + 15, context=ssl_context()) as r:
            raw = r.read()
    except urllib.error.HTTPError as e:
        raw = e.read()
        text = raw.decode("utf-8", "replace")
        try:
            err = json.loads(text)
        except ValueError:
            # Trả lời dạng text "error code: NNNN" là của Cloudflare, không phải relay:
            # 5xx → server relay đang down/khởi động lại; 1010/1020 → Cloudflare chặn client.
            raise RuntimeError(f"Cloudflare trả HTTP {e.code} ({text.strip()[:200]}) — "
                               "request không tới được relay; báo người dùng, không lặp lại") from None
        if e.code in (401, 403):
            raise RuntimeError(f"relay từ chối xác thực (HTTP {e.code}) — không thử lại, báo người dùng")
        raise RuntimeError(f"relay HTTP {e.code} {err.get('errorCode', '')}: {err.get('message', text[:200])}") from None
    d = json.loads(raw)
    body = d.get("body") or ""
    body = base64.b64decode(body) if d.get("bodyEncoding") == "base64" else body.encode("utf-8")
    return d["status"], d.get("headers", {}), body, d.get("url", url), d.get("truncated", False)


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("url")
    ap.add_argument("-o", "--output", help="file lưu body")
    mode = ap.add_mutually_exclusive_group()
    mode.add_argument("--relay", action="store_true", help="đi thẳng qua relay")
    mode.add_argument("--direct", action="store_true", help="chỉ thử trực tiếp")
    ap.add_argument("--head", action="store_true", help="gửi HEAD, chỉ in status + headers")
    ap.add_argument("--timeout", type=float, default=30, help="giây (relay tối đa 120)")
    args = ap.parse_args()
    method = "HEAD" if args.head else "GET"

    result, via, truncated = None, None, False
    if not args.relay:
        try:
            status, headers, body, final = fetch_direct(args.url, method, args.timeout)
            if status in GEO_BLOCK_STATUS and not args.direct:
                print(f"[direct] HTTP {status} — có thể bị chặn theo vùng, thử qua relay", file=sys.stderr)
            else:
                result, via = (status, headers, body, final), "direct"
        except Exception as e:  # timeout, connection reset, TLS...
            print(f"[direct] lỗi: {e}", file=sys.stderr)
            if args.direct:
                sys.exit(2)
    if result is None:
        try:
            status, headers, body, final, truncated = fetch_relay(args.url, method, args.timeout)
            result, via = (status, headers, body, final), "relay"
        except Exception as e:
            print(f"[relay] lỗi: {e}", file=sys.stderr)
            sys.exit(2)

    status, headers, body, final = result
    ctype = next((v for k, v in headers.items() if k.lower() == "content-type"), "")
    summary = {"via": via, "status": status, "url": final, "contentType": ctype,
               "bytes": len(body), "truncated": truncated}
    if args.output and not args.head:
        with open(args.output, "wb") as f:
            f.write(body)
        summary["savedTo"] = args.output
    if args.head:
        summary["headers"] = headers
    print(json.dumps(summary, ensure_ascii=False, indent=2))
    if truncated:
        print("[relay] CẢNH BÁO: body bị cắt ở 10 MB — file không đầy đủ", file=sys.stderr)
    sys.exit(0 if status < 400 and not truncated else 1)


if __name__ == "__main__":
    main()
