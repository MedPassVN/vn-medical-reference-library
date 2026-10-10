#!/usr/bin/env node
// Kiểm tra cú pháp mọi khối ```mermaid trong markdown_docs/ bằng mermaid.parse trong Chromium headless.
// Cài: npm i --no-save mermaid@11.4.1 playwright-core@1.47.2 && npx playwright@1.47.2 install chromium
// Chạy: node scripts/check_mermaid.js [file.md ...]   (mặc định: markdown_docs/*.md)
// Env CHROMIUM_PATH: đường dẫn Chromium/headless_shell nếu không dùng bản playwright tải về.
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright-core');

(async () => {
  const root = path.resolve(__dirname, '..');
  let files = process.argv.slice(2);
  if (!files.length) {
    const dir = path.join(root, 'markdown_docs');
    files = fs.readdirSync(dir).filter(f => f.endsWith('.md')).map(f => path.join(dir, f));
  }
  const opts = { args: ['--no-sandbox'] };
  if (process.env.CHROMIUM_PATH) opts.executablePath = process.env.CHROMIUM_PATH;
  const browser = await chromium.launch(opts);
  const page = await browser.newPage();
  await page.setContent('<html><body></body></html>');
  await page.addScriptTag({ path: require.resolve('mermaid/dist/mermaid.min.js') });
  await page.evaluate(() => mermaid.initialize({ startOnLoad: false }));

  let total = 0, bad = 0;
  for (const f of files) {
    const lines = fs.readFileSync(f, 'utf8').split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (!lines[i].trim().startsWith('```mermaid')) continue;
      let j = i + 1;
      const body = [];
      while (j < lines.length && !lines[j].trim().startsWith('```')) body.push(lines[j++]);
      total++;
      const err = await page.evaluate(async src => {
        try { await mermaid.parse(src); return null; }
        catch (e) { return String(e.message || e).split('\n').slice(0, 3).join(' | '); }
      }, body.join('\n'));
      if (err) { bad++; console.log(`ERROR ${path.relative(root, f)}:${i + 1}: ${err}`); }
      i = j;
    }
  }
  console.log(`mermaid blocks: ${total}, invalid: ${bad}`);
  await browser.close();
  process.exit(bad ? 1 : 0);
})().catch(e => { console.error(e); process.exit(2); });
