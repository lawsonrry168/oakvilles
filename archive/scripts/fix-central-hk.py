from pathlib import Path

content = """---
layout: "layouts/redirect.njk"
title: "中環中醫診所 · 頁面已搬移"
canonical: "https://oakvilles.com/about/central-hk.html"
ogImageAlt: "中環中醫診所 · 頁面已搬移"
noindex: true
redirectTo: "/about/central-hk.html"
redirectLabel: "中環中醫診所 · 前往新頁面"
---
"""
Path(__file__).resolve().parents[1] / "src/conditions/central-hk.html"
path = Path(__file__).resolve().parents[1] / "src/conditions/central-hk.html"
path.write_text(content, encoding="utf-8")
print("OK", path)
