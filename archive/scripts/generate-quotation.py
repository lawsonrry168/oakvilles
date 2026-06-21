# -*- coding: utf-8 -*-
"""Generate project quotation docx for 頤安本草 official website."""

from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml.ns import qn
from docx.oxml import OxmlElement
import datetime
import os
import shutil

OUTPUT_DIR = r"c:\Users\Steriod\Desktop\oakvilles"
OUTPUT = os.path.join(OUTPUT_DIR, "Oakville-Website-Quotation.docx")
OUTPUT_DESKTOP = r"c:\Users\Steriod\Desktop\Oakville-Website-Quotation.docx"

# --- Pricing ---
WEBSITE_SUBTOTAL = 49_000
IMAGE_COUNT = 50
IMAGE_UNIT = 380          # HKD per image (生成 + 審校 + WebP)
IMAGE_INTEGRATION = 3_800  # 全站 HTML 接入、alt、lazy-load
IMAGE_SUBTOTAL = IMAGE_COUNT * IMAGE_UNIT + IMAGE_INTEGRATION  # 22,800
BUNDLE_DISCOUNT = 3_800
LIST_TOTAL = WEBSITE_SUBTOTAL + IMAGE_SUBTOTAL - BUNDLE_DISCOUNT  # 68,000

# Gen HK 轉介額外 5 折（即標準價之 50%）
GEN_HK_REFERRAL = "Gen HK"
GEN_HK_DISCOUNT_RATE = 0.5
GEN_HK_DISCOUNT = int(LIST_TOTAL * GEN_HK_DISCOUNT_RATE)
GEN_HK_TOTAL = LIST_TOTAL - GEN_HK_DISCOUNT  # 34,000

# 月度服務（另計，不含於一次性項目總額）
MONTHLY_RETAINER = 10_000
MIN_CONTRACT_MONTHS = 3

today = datetime.date(2026, 6, 20)
valid_until = today + datetime.timedelta(days=30)


def fmt(n: int) -> str:
    return f"{n:,}"


def payment_split(total: int) -> tuple[int, int, int]:
    deposit = int(total * 0.4)
    mid = int(total * 0.4)
    final = total - deposit - mid
    return deposit, mid, final


def set_cell_shading(cell, fill: str):
    shading = OxmlElement("w:shd")
    shading.set(qn("w:fill"), fill)
    shading.set(qn("w:val"), "clear")
    cell._tc.get_or_add_tcPr().append(shading)


def add_heading(doc, text, level=1):
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.bold = True
    run.font.name = "Arial"
    run._element.rPr.rFonts.set(qn("w:eastAsia"), "Microsoft JhengHei")
    run.font.size = Pt(14 if level == 1 else 12)
    run.font.color.rgb = RGBColor(0x2A, 0x46, 0x3C)
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(6)
    return p


def add_para(doc, text, bold=False, size=10.5):
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.bold = bold
    run.font.name = "Arial"
    run._element.rPr.rFonts.set(qn("w:eastAsia"), "Microsoft JhengHei")
    run.font.size = Pt(size)
    p.paragraph_format.space_after = Pt(4)
    return p


def add_table(doc, headers, rows, col_widths=None):
    table = doc.add_table(rows=1 + len(rows), cols=len(headers))
    table.style = "Table Grid"
    table.alignment = WD_TABLE_ALIGNMENT.CENTER
    hdr = table.rows[0].cells
    for i, h in enumerate(headers):
        hdr[i].text = h
        set_cell_shading(hdr[i], "D5E8F0")
        for p in hdr[i].paragraphs:
            for r in p.runs:
                r.bold = True
                r.font.size = Pt(9)
                r.font.name = "Arial"
                r._element.rPr.rFonts.set(qn("w:eastAsia"), "Microsoft JhengHei")
    for ri, row in enumerate(rows):
        cells = table.rows[ri + 1].cells
        for ci, val in enumerate(row):
            cells[ci].text = str(val)
            for p in cells[ci].paragraphs:
                for r in p.runs:
                    r.font.size = Pt(9)
                    r.font.name = "Arial"
                    r._element.rPr.rFonts.set(qn("w:eastAsia"), "Microsoft JhengHei")
    if col_widths:
        for row in table.rows:
            for i, w in enumerate(col_widths):
                row.cells[i].width = Cm(w)
    doc.add_paragraph()
    return table


doc = Document()

for section in doc.sections:
    section.top_margin = Cm(2)
    section.bottom_margin = Cm(2)
    section.left_margin = Cm(2.5)
    section.right_margin = Cm(2.5)

title = doc.add_paragraph()
title.alignment = WD_ALIGN_PARAGRAPH.CENTER
r1 = title.add_run("報 價 單\n")
r1.bold = True
r1.font.size = Pt(22)
r1.font.name = "Arial"
r1._element.rPr.rFonts.set(qn("w:eastAsia"), "Microsoft JhengHei")
r2 = title.add_run("QUOTATION")
r2.font.size = Pt(14)
r2.font.name = "Arial"

doc.add_paragraph()

meta = doc.add_table(rows=5, cols=2)
meta.style = "Table Grid"
meta_data = [
    ("報價編號", "SV-WEB-2026-0620"),
    ("報價日期", f"{today.year} 年 {today.month} 月 {today.day} 日"),
    ("有效期限", f"30 日（至 {valid_until.year} 年 {valid_until.month} 月 {valid_until.day} 日）"),
    ("幣別", "港元（HKD），未含第三方平台及網域費用"),
    ("轉介優惠", f"{GEN_HK_REFERRAL} 轉介客戶享一次性項目額外 5 折"),
]
for i, (k, v) in enumerate(meta_data):
    meta.rows[i].cells[0].text = k
    meta.rows[i].cells[1].text = v
    set_cell_shading(meta.rows[i].cells[0], "F7F2E7")
    for c in meta.rows[i].cells:
        for p in c.paragraphs:
            for r in p.runs:
                r.font.size = Pt(10)
                r.font.name = "Arial"
                r._element.rPr.rFonts.set(qn("w:eastAsia"), "Microsoft JhengHei")

doc.add_paragraph()

add_para(doc, "致 To", bold=True)
add_para(doc, "頤安本草 · 伍厚臻中醫師（Oakville Wellness）")
add_para(doc, "專案名稱：官方診所網站重建、視覺資產製作與上線")
add_para(doc, "正式網域：oakvilles.com")
doc.add_paragraph()
add_para(doc, "報價方 From", bold=True)
add_para(doc, "[承辦方名稱]（獨立開發／小型數碼工作室）")
add_para(doc, "聯絡：[email] · [電話]")
add_para(doc, "服務地區：香港")

doc.add_paragraph()
add_heading(doc, "專案摘要 Executive Summary")
add_para(
    doc,
    "本報價涵蓋一套面向香港中環市場、以繁體中文（zh-HK）為主的 B2C 中醫診所官方網站，"
    "包含首頁、四大診症專科、七類常見症狀著陸頁、養生專欄、最新消息、診所環境、流程收費、"
    "FAQ 及聯絡頁等共 30 頁靜態網站，並整合 WhatsApp 預約動線、診金計算器、GA4 事件量測、"
    "結構化資料及 Vercel 正式部署。"
)
add_para(
    doc,
    f"另含依《網站設計圖片 prompt》規劃之全站 {IMAGE_COUNT} 張視覺資產製作（AI 生成、人工審校、"
    "WebP 輸出及 HTML 全站接入），替換現有 Unsplash 佔位圖，統一頤安本草品牌視覺。"
)
add_para(
    doc,
    f"經 {GEN_HK_REFERRAL} 轉介之客戶，一次性項目享額外 5 折（標準價 HKD {fmt(LIST_TOTAL)} → "
    f"HKD {fmt(GEN_HK_TOTAL)}）。可另簽月度服務合約（HKD {fmt(MONTHLY_RETAINER)}/月），"
    "涵蓋網絡行銷策劃及網站維護。"
)
add_para(
    doc,
    "交付狀態：以下項目按現有專案已實作範圍報價，作為正式商務參考假設；實際合約以雙方確認之工作說明書（SOW）為準。",
)

doc.add_paragraph()
add_heading(doc, "服務範圍 Scope of Work")

add_para(doc, "A. 策略與設計", bold=True)
add_table(
    doc,
    ["#", "項目", "說明"],
    [
        ("A1", "需求梳理與資訊架構", "頁面地圖（30 頁）、用戶旅程、預約動線設計"),
        ("A2", "品牌視覺落地", "《設計指南》色票（paper／pine／cinnabar／ochre）、字體、元件風格"),
        ("A3", "響應式 UI 實作", "桌面／平板／手機；繁體中文排版；東方美學視覺語言"),
    ],
    [1.2, 4.5, 10.8],
)

add_para(doc, "B. 前端開發", bold=True)
add_table(
    doc,
    ["#", "項目", "說明"],
    [
        ("B1", "首頁與全站框架", "Hero、信任列、四大專科、診所 gallery、Google 評價、Header／Footer、全站搜尋"),
        ("B2", "診症專科頁", "痛症、皮膚、婦科、內科 + 針灸／中藥／艾灸／拔罐等療法頁（共 8 頁）"),
        ("B3", "症狀著陸頁", "濕疹、暗瘡、失眠、備孕、頸痛、坐骨神經痛、中環中醫等 SEO 內容頁（7 頁）"),
        ("B4", "內容與資訊頁", "養生專欄（4 篇 + 列表）、最新消息、關於醫師、診所環境、流程收費、FAQ、聯絡（12 頁）"),
        ("B5", "轉化優化 UI", "兩步驟預約卡片 funnel、診金計算器串接、行動版 sticky CTA、WhatsApp 浮動按鈕"),
        ("B6", "圖片占位接入", "預留 img 結構、alt 文案、lazy-load；配合 E 區批次替換"),
    ],
    [1.2, 4.5, 10.8],
)

add_para(doc, "C. 互動功能與整合", bold=True)
add_table(
    doc,
    ["#", "項目", "說明"],
    [
        ("C1", "全站搜尋", "search-index.js 離線索引、導航列搜尋 UI"),
        ("C2", "WhatsApp 預約流程", "表單 → WhatsApp 訊息、計算器方案預填、sessionStorage 串接"),
        ("C3", "診金計算器", "項目／天數選擇、即時估價、「以此方案預約」捲動至 booking"),
        ("C4", "Analytics 事件量測", "dataLayer 事件（cta_click、booking_submit、funnel_step 等）、GA4 就緒設定"),
        ("C5", "Schema.org 結構化資料", "MedicalBusiness、Physician、FAQPage、Article 等 JSON-LD 注入"),
    ],
    [1.2, 4.5, 10.8],
)

add_para(doc, "D. SEO 與上線", bold=True)
add_table(
    doc,
    ["#", "項目", "說明"],
    [
        ("D1", "SEO 基礎", "sitemap.xml、robots.txt、OG meta、canonical、內頁 title／description"),
        ("D2", "Vercel 部署", "靜態站 Production 部署、redirect 規則（vercel.json）"),
        ("D3", "自訂網域", "DNS 指向設定指引（oakvilles.com）"),
        ("D4", "GA4／Search Console", "site-config.js 設定支援、轉換事件對照表"),
        ("D5", "技術文件", "《設計指南》、圖片 prompt 規劃、部署說明"),
        ("D6", "UAT 與交付", "跨裝置測試、預約動線驗收、上線確認清單"),
    ],
    [1.2, 4.5, 10.8],
)

add_para(doc, "E. 全站視覺資產製作（50 張）", bold=True)
add_table(
    doc,
    ["#", "項目", "數量", "說明"],
    [
        ("E1", "診所實景（P0）", "6 張", "候診區、診症室、針灸區、接待處、中藥房、外觀；替換 Unsplash gallery"),
        ("E2", "醫師肖像優化（P0）", "3 張", "Hero／About／諮詢情境多版本裁切（以 doctor.jpg 為基礎優化）"),
        ("E3", "專欄與社交（P1）", "10 張", "blog 封面 4 張（已交付 4 張可抵扣）、IG 方圖 6 張"),
        ("E4", "專科與症狀 Hero（P2）", "14 張", "8 專科頁 + 6 症狀頁內頁主視覺／圖文分欄"),
        ("E5", "流程／OG／雜項（P3）", "17 張", "流程 6 步、FAQ 配圖、聯絡地圖、各頁 OG 分享圖等"),
        ("E6", "後製與全站接入", "—", "WebP + JPG fallback、壓縮、alt 文案、全站 HTML 替換、2 輪修訂"),
    ],
    [1.0, 4.0, 1.5, 9.0],
)
add_para(
    doc,
    f"合計 {IMAGE_COUNT} 張（IMG-001–054 規劃清單，扣除已交付 4 張 blog 圖）。"
    "統一 Global Style Block：cream paper 色調、pine 綠、cinnabar 紅、禪意高端診所美學。",
    size=9,
)

doc.add_paragraph()
add_heading(doc, "費用明細 Pricing Breakdown")
add_table(
    doc,
    ["類別", "項目", "工時／數量", "單價", "小計 HKD"],
    [
        ("策略與設計", "A1–A3", "16 hr", "$650/hr", "10,400"),
        ("前端開發", "B1–B6", "40 hr", "$650/hr", "26,000"),
        ("互動與整合", "C1–C5", "12 hr", "$650/hr", "7,800"),
        ("SEO 與部署", "D1–D6", "10 hr", "$600/hr", "6,000"),
        ("", "網站開發小計", "78 hr", "", fmt(WEBSITE_SUBTOTAL)),
        ("視覺資產", f"E1–E5 圖片製作", f"{IMAGE_COUNT} 張", f"${IMAGE_UNIT}/張", fmt(IMAGE_COUNT * IMAGE_UNIT)),
        ("視覺資產", "E6 全站接入與後製", "—", "—", fmt(IMAGE_INTEGRATION)),
        ("", "視覺資產小計", "", "", fmt(IMAGE_SUBTOTAL)),
        ("", "項目合計", "", "", fmt(WEBSITE_SUBTOTAL + IMAGE_SUBTOTAL)),
        ("", "網站＋視覺打包優惠", "", "", f"−{fmt(BUNDLE_DISCOUNT)}"),
        ("", "標準報價總額 List Price", "", "", fmt(LIST_TOTAL)),
        ("", f"{GEN_HK_REFERRAL} 轉介額外 5 折", "", "", f"−{fmt(GEN_HK_DISCOUNT)}"),
        ("", "轉介優惠價 Referral Price", "", "", fmt(GEN_HK_TOTAL)),
    ],
    [2.8, 3.2, 2.2, 2.0, 2.3],
)

add_para(
    doc,
    f"定價說明：網站開發按時薪 HKD 600–700 核算；圖片按 HKD {IMAGE_UNIT}/張（含 prompt 執行、"
    f"審校、格式輸出）。標準打包價 HKD {fmt(LIST_TOTAL)}；"
    f"經 {GEN_HK_REFERRAL} 轉介之客戶，一次性項目享額外 5 折，實付 HKD {fmt(GEN_HK_TOTAL)}。",
    size=9,
)

doc.add_paragraph()
add_heading(doc, "Gen HK 轉介優惠 Referral Discount")
add_table(
    doc,
    ["項目", "標準價 HKD", "轉介 5 折 HKD", "備註"],
    [
        ("網站開發 + 50 張圖片（一次性）", fmt(LIST_TOTAL), fmt(GEN_HK_TOTAL), f"須由 {GEN_HK_REFERRAL} 正式轉介"),
        ("月度行銷＋維護（每月）", fmt(MONTHLY_RETAINER), fmt(MONTHLY_RETAINER), "月度服務不適用 5 折，按月計費"),
    ],
    [5.5, 3, 3, 4],
)
add_para(
    doc,
    f"轉介資格：客戶須於簽約前提供 {GEN_HK_REFERRAL} 轉介確認（電郵或書面）；"
    "優惠只適用於本報價一次性項目，不可與其他折扣疊加。",
    size=9,
)

doc.add_paragraph()
add_heading(doc, "付款方式 Payment Terms（一次性項目）")
add_para(doc, "A. 標準價付款（HKD 68,000）", bold=True, size=10)
dep_std, mid_std, fin_std = payment_split(LIST_TOTAL)
add_table(
    doc,
    ["階段", "比例", "金額 HKD", "觸發條件"],
    [
        ("訂金", "40%", fmt(dep_std), "報價確認、合約簽署"),
        ("中期", "40%", fmt(mid_std), "網站 Staging 驗收 + 首批 20 張圖片交付"),
        ("尾款", "20%", fmt(fin_std), "Production 上線、50 張圖全站接入、交付文件"),
        ("合計", "100%", fmt(LIST_TOTAL), ""),
    ],
    [2.5, 2, 3, 8],
)
add_para(doc, "B. Gen HK 轉介價付款（HKD 34,000）", bold=True, size=10)
dep_ref, mid_ref, fin_ref = payment_split(GEN_HK_TOTAL)
add_table(
    doc,
    ["階段", "比例", "金額 HKD", "觸發條件"],
    [
        ("訂金", "40%", fmt(dep_ref), "報價確認、合約簽署、Gen HK 轉介確認"),
        ("中期", "40%", fmt(mid_ref), "網站 Staging 驗收 + 首批 20 張圖片交付"),
        ("尾款", "20%", fmt(fin_ref), "Production 上線、50 張圖全站接入、交付文件"),
        ("合計", "100%", fmt(GEN_HK_TOTAL), ""),
    ],
    [2.5, 2, 3, 8],
)
add_para(doc, "付款方式：銀行轉帳／FPS", size=9)
add_para(doc, "發票：可提供香港商業發票（如適用）", size=9)
add_para(doc, "逾期：超過 14 日未付中期款，承辦方可暫停工作", size=9)

doc.add_paragraph()
add_heading(doc, "F. 月度服務 Monthly Retainer")
add_para(
    doc,
    f"每月 HKD {fmt(MONTHLY_RETAINER)}（另計，不含於一次性項目）；"
    f"最少合約期 {MIN_CONTRACT_MONTHS} 個月，按月預付。",
    bold=True,
)
add_table(
    doc,
    ["#", "類別", "每月服務內容"],
    [
        ("F1", "網絡行銷策劃", "月度內容日曆、SEO 關鍵字追蹤、Google Business Profile 優化建議、IG／社交貼文方向"),
        ("F2", "本地搜尋優化", "「中環中醫」「濕疹中醫」等本地詞監測、Search Console 月報、競品簡報"),
        ("F3", "轉化追蹤分析", "GA4 預約／WhatsApp 點擊月報、漏斗優化建議、A/B 測試方向"),
        ("F4", "網站技術維護", "Vercel 部署監控、SSL／DNS 健康檢查、安全更新、故障排查"),
        ("F5", "內容與頁面更新", "每月最多 2 篇專欄／消息更新、小修版式、圖片替換（≤4 張）"),
        ("F6", "策略會議", "每月 1 次 60 分鐘線上檢討（行銷數據 + 下月計劃）"),
    ],
    [1.0, 3.5, 11.0],
)
add_table(
    doc,
    ["項目", "說明", "費用 HKD"],
    [
        ("月度服務費", "F1–F6 全包", f"{fmt(MONTHLY_RETAINER)}/月"),
        ("合約期", f"最少 {MIN_CONTRACT_MONTHS} 個月", "—"),
        ("超時工作", "超出 F5 範圍之開發或設計", "$650/hr 另計"),
        ("廣告投放", "Google Ads／Meta 廣告費", "客戶直接支付平台，不含於月費"),
    ],
    [4, 8, 3],
)
add_para(doc, "月度付款：每月 1 日前預付當月費用；首月於合約簽署時與訂金一併或分開支付。", size=9)

doc.add_paragraph()
add_heading(doc, "不包含項目 Exclusions")
add_table(
    doc,
    ["項目", "參考費用"],
    [
        ("Vercel Pro（如需要）", "~USD 20+/月"),
        ("網域年費（oakvilles.com）", "~HKD 200–400/年"),
        ("醫師現場專業攝影（非 AI）", "另議；E1 診所實景可改真實拍攝"),
        ("醫療廣告合規法律意見", "另議"),
        ("CMS 後台／會員系統", "不包含"),
        ("多語言（英文／簡中）", "不包含"),
        ("24/7 駐場支援", "不包含"),
        ("月度行銷及維護（F 區）", f"HKD {fmt(MONTHLY_RETAINER)}/月，另簽約"),
        ("Google／Meta 廣告投放費", "客戶直接支付平台"),
        ("超出 2 輪之圖片重製", "按 HKD 380/張另計"),
    ],
    [8, 8],
)

doc.add_paragraph()
add_heading(doc, "可選增值服務 Optional Add-ons")
add_table(
    doc,
    ["項目", "說明", "報價 HKD"],
    [
        ("GA4 + Search Console 完整設定", "帳戶建立、轉換追蹤、Search Console 提交（若未含於 F 區）", "2,500"),
        ("新增症狀／專欄頁", "依現有模板擴展一頁（含 1 張配圖）", "1,800/頁"),
        ("contact.html 預約 funnel", "聯絡頁共用兩步驟預約元件", "3,500"),
        ("醫師現場攝影半日", "專業攝影師 + 後期（取代 AI 肖像）", "8,000 起"),
        ("Google Ads 代操", "廣告策略 + 投放管理（不含廣告費）", "3,500/月 起"),
    ],
    [4, 8, 3],
)

doc.add_paragraph()
add_heading(doc, "交付物 Deliverables")
for item in [
    "靜態網站原始碼（GitHub 私有倉庫存取權）",
    "Production 部署（oakvilles.com）",
    "sitemap.xml、robots.txt、schema-manifest.js",
    f"全站 {IMAGE_COUNT} 張 WebP／JPG 視覺資產（images/ 目錄結構）",
    "《設計指南》及《網站設計圖片 prompt》文件",
    "GA4 事件對照表（site-config.js 設定指引）",
    "上線驗收清單",
    "30 日缺陷保固（非需求變更）",
]:
    doc.add_paragraph(item, style="List Bullet")

doc.add_paragraph()
add_heading(doc, "條款與備註 Terms & Notes")
notes = [
    "本報價為中醫診所官方網站技術開發及視覺資產製作，不含醫療廣告合規法律意見；文案及圖片需符合香港《中醫藥條例》及相關廣告規範。",
    "AI 生成圖片不含可識別真實病患；醫師肖像以客戶提供之 doctor.jpg 為基礎優化，非憑空生成人臉。",
    "第三方平台條款以各平台為準；承辦方協助設定但不對政策變更負責。",
    "需求變更超出 SOW，按 HKD 650/小時（開發）或 HKD 380/張（圖片）另計，事前書面確認。",
    "尾款付清後，客戶享有定制程式碼及圖片使用權；開源套件依各自授權。",
    "本報價單自發出日起 30 日內有效。",
    f"{GEN_HK_REFERRAL} 轉介 5 折優惠須於簽約時確認，逾期不補；月度服務（F 區）須另簽月度服務協議。",
    f"月度服務合約最少 {MIN_CONTRACT_MONTHS} 個月；任一方可於合約期滿前 30 日書面通知不續約。",
]
for n in notes:
    add_para(doc, f"• {n}", size=9)

doc.add_paragraph()
add_heading(doc, "確認 Acceptance")
sig = doc.add_table(rows=5, cols=2)
sig.style = "Table Grid"
sig.rows[0].cells[0].text = "客戶 Client"
sig.rows[0].cells[1].text = "承辦方 Provider"
sig.rows[1].cells[0].text = "頤安本草 · 伍厚臻中醫師"
sig.rows[1].cells[1].text = "[承辦方名稱]"
sig.rows[2].cells[0].text = "授權代表\n\n_________________________"
sig.rows[2].cells[1].text = "授權代表\n\n_________________________"
sig.rows[3].cells[0].text = "日期\n\n_________________________"
sig.rows[3].cells[1].text = "日期\n\n_________________________"
sig.rows[4].cells[0].text = "簽署\n\n_________________________"
sig.rows[4].cells[1].text = "簽署\n\n_________________________"
for row in sig.rows:
    for c in row.cells:
        for p in c.paragraphs:
            for r in p.runs:
                r.font.size = Pt(10)
                r.font.name = "Arial"
                r._element.rPr.rFonts.set(qn("w:eastAsia"), "Microsoft JhengHei")

doc.add_paragraph()
add_para(
    doc,
    "本文件為假設性商務報價，供內部評估及對外溝通參考。金額已按香港本地診所數碼項目市場水平調整。",
    size=8,
)

doc.save(OUTPUT)
shutil.copy2(OUTPUT, OUTPUT_DESKTOP)
print(f"Saved: {OUTPUT}")
print(f"Copied: {OUTPUT_DESKTOP}")
print(f"List Total: HKD {fmt(LIST_TOTAL)}")
print(f"Gen HK Referral: HKD {fmt(GEN_HK_TOTAL)}")
print(f"Monthly Retainer: HKD {fmt(MONTHLY_RETAINER)}/mo")
