# 歸檔說明

此目錄存放一次性腳本與舊版片段，**不參與** `npm run build` 上線流程。

- `fragments/` — 遷移 Eleventy 前的 nav/footer 草稿
- `scripts/` — 批量遷移、提案生成、SEO 注入等已完成的一次性工具

現行建置流程見根目錄 `package.json`：`npm run build` → esbuild + 圖片管線 + Eleventy → `_site/`。
