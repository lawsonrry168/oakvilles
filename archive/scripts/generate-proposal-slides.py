# -*- coding: utf-8 -*-
"""Generate proposal slide deck for 頤安本草 website rebuild."""

from pptx import Presentation
from pptx.util import Inches, Pt, Emu
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE
import datetime
import os
import shutil

OUTPUT = os.path.join(r"c:\Users\Steriod\Desktop\oakvilles", "Oakville-Website-Proposal.pptx")
OUTPUT_DESKTOP = r"c:\Users\Steriod\Desktop\Oakville-Website-Proposal.pptx"

# Brand tokens
PINE = RGBColor(0x2A, 0x46, 0x3C)
PINE_LIGHT = RGBColor(0x3D, 0x5A, 0x4E)
PAPER = RGBColor(0xF7, 0xF2, 0xE7)
PAPER_DARK = RGBColor(0xE8, 0xE0, 0xD0)
CINNABAR = RGBColor(0xA2, 0x3A, 0x2E)
OCHRE = RGBColor(0xAE, 0x8A, 0x47)
INK = RGBColor(0x1A, 0x1A, 0x18)
MUTED = RGBColor(0x5A, 0x5A, 0x52)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)

FONT = "Microsoft JhengHei"
today = datetime.date(2026, 6, 20)
SLIDE_W = Inches(13.333)
SLIDE_H = Inches(7.5)


def rgb_hex(c: RGBColor) -> str:
    return f"{c}"


def set_fill(shape, color: RGBColor):
    shape.fill.solid()
    shape.fill.fore_color.rgb = color


def add_rect(slide, left, top, width, height, color: RGBColor):
    s = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, left, top, width, height)
    set_fill(s, color)
    s.line.fill.background()
    return s


def add_textbox(slide, left, top, width, height, text, size=14, bold=False,
                color=INK, align=PP_ALIGN.LEFT, font=FONT, line_spacing=1.2):
    tb = slide.shapes.add_textbox(left, top, width, height)
    tf = tb.text_frame
    tf.word_wrap = True
    tf.vertical_anchor = MSO_ANCHOR.TOP
    p = tf.paragraphs[0]
    p.text = text
    p.alignment = align
    p.line_spacing = line_spacing
    r = p.runs[0]
    r.font.name = font
    r.font.size = Pt(size)
    r.font.bold = bold
    r.font.color.rgb = color
    return tb


def add_bullets(slide, left, top, width, height, items, size=13, color=INK, spacing=Pt(6)):
    tb = slide.shapes.add_textbox(left, top, width, height)
    tf = tb.text_frame
    tf.word_wrap = True
    for i, item in enumerate(items):
        p = tf.paragraphs[0] if i == 0 else tf.add_paragraph()
        p.text = item
        p.level = 0
        p.space_after = spacing
        p.line_spacing = 1.15
        if item.startswith("  "):
            p.level = 1
        r = p.runs[0]
        r.font.name = FONT
        r.font.size = Pt(size)
        r.font.color.rgb = color
    return tb


def slide_header(slide, section_num: str, title: str, subtitle: str = ""):
    """Light slide with pine top bar."""
    add_rect(slide, 0, 0, SLIDE_W, SLIDE_H, PAPER)
    add_rect(slide, 0, 0, SLIDE_W, Inches(0.08), CINNABAR)
    add_rect(slide, 0, Inches(0.08), SLIDE_W, Inches(1.05), PINE)
    if section_num:
        add_textbox(slide, Inches(0.55), Inches(0.22), Inches(1.2), Inches(0.35),
                    section_num, 11, True, OCHRE)
    add_textbox(slide, Inches(0.55), Inches(0.48), Inches(12), Inches(0.55),
                title, 28, True, WHITE)
    if subtitle:
        add_textbox(slide, Inches(0.55), Inches(0.95), Inches(12), Inches(0.35),
                    subtitle, 12, False, PAPER_DARK)
    # Footer
    add_textbox(slide, Inches(0.55), Inches(7.05), Inches(6), Inches(0.3),
                "頤安本草 · 伍厚臻中醫師 ｜ 網站重建方案", 9, False, MUTED)
    add_textbox(slide, Inches(10.5), Inches(7.05), Inches(2.3), Inches(0.3),
                f"{today.year}", 9, False, MUTED, PP_ALIGN.RIGHT)


def stat_card(slide, left, top, number, label, w=Inches(2.6), h=Inches(1.5)):
    card = add_rect(slide, left, top, w, h, WHITE)
    card.shadow.inherit = False
    inner = add_rect(slide, left, top, Inches(0.06), h, CINNABAR)
    add_textbox(slide, left + Inches(0.2), top + Inches(0.15), w - Inches(0.3), Inches(0.7),
                number, 36, True, PINE, PP_ALIGN.LEFT)
    add_textbox(slide, left + Inches(0.2), top + Inches(0.85), w - Inches(0.3), Inches(0.5),
                label, 11, False, MUTED)


def comparison_col(slide, left, top, width, header, header_color, items, bg=WHITE):
    h = Inches(0.45)
    add_rect(slide, left, top, width, h, header_color)
    add_textbox(slide, left + Inches(0.15), top + Inches(0.06), width - Inches(0.3), h,
                header, 13, True, WHITE, PP_ALIGN.LEFT)
    body_h = Inches(3.8)
    add_rect(slide, left, top + h, width, body_h, bg)
    add_bullets(slide, left + Inches(0.15), top + h + Inches(0.15),
                width - Inches(0.3), body_h - Inches(0.2), items, 11, INK)


prs = Presentation()
prs.slide_width = SLIDE_W
prs.slide_height = SLIDE_H
blank = prs.slide_layouts[6]

# ── Slide 1: Title ──
s = prs.slides.add_slide(blank)
add_rect(s, 0, 0, SLIDE_W, SLIDE_H, PINE)
add_rect(s, 0, 0, Inches(0.12), SLIDE_H, CINNABAR)
# Decorative circle
c = s.shapes.add_shape(MSO_SHAPE.OVAL, Inches(9.5), Inches(-1.5), Inches(5), Inches(5))
set_fill(c, PINE_LIGHT)
c.line.fill.background()
add_textbox(s, Inches(0.9), Inches(2.0), Inches(8), Inches(0.5),
            "OAKVILLE WELLNESS", 14, False, OCHRE)
add_textbox(s, Inches(0.9), Inches(2.55), Inches(10), Inches(1.2),
            "頤安本草 · 伍厚臻中醫師", 40, True, WHITE)
add_textbox(s, Inches(0.9), Inches(3.75), Inches(10), Inches(0.6),
            "官方網站重建方案書", 24, False, PAPER)
add_textbox(s, Inches(0.9), Inches(4.55), Inches(10), Inches(0.5),
            f"{today.year} 年 {today.month} 月 ｜ oakvilles.com", 13, False, PAPER_DARK)
add_textbox(s, Inches(0.9), Inches(5.2), Inches(10), Inches(0.4),
            "對標分析 · 舊站診斷 · 新站改善 · 行銷建議", 12, False, OCHRE)

# ── Slide 2: 背景 ──
s = prs.slides.add_slide(blank)
slide_header(s, "01", "背景與目的")
add_textbox(s, Inches(0.55), Inches(1.35), Inches(12.2), Inches(0.9),
            "現行 oakvilles.com 為單頁結構，難以承接「症狀搜尋」及「醫師名字搜尋」兩類主要流量。"
            "本方案以養康中醫館（honscmc.com）為行業參考，依「中環高端、一人一方」定位重建可擴展官網。",
            14, False, INK)
stat_card(s, Inches(0.55), Inches(2.5), "1", "舊站有效頁面")
stat_card(s, Inches(3.35), Inches(2.5), "30", "新站規劃頁面")
stat_card(s, Inches(6.15), Inches(2.5), "7", "症狀著陸頁")
stat_card(s, Inches(8.95), Inches(2.5), "50", "品牌視覺資產")
add_rect(s, Inches(0.55), Inches(4.3), Inches(12.2), Inches(2.4), WHITE)
add_textbox(s, Inches(0.75), Inches(4.45), Inches(11.8), Inches(0.35),
            "本簡報目的", 14, True, PINE)
add_bullets(s, Inches(0.75), Inches(4.85), Inches(11.5), Inches(1.7), [
    "分析對標網站（養康中醫館）的設計與獲客策略",
    "診斷現行網站之結構、SEO、轉化不足",
    "說明新站重建之具體改善及後續行銷方向",
], 12, INK)

# ── Slide 3: 對標概覽 ──
s = prs.slides.add_slide(blank)
slide_header(s, "02", "對標網站：養康中醫館", "honscmc.com ｜ 尖沙咀 · 皮膚／婦科／美容塑形")
comparison_col(s, Inches(0.55), Inches(1.45), Inches(5.9), "網站設計特徵", PINE, [
    "WordPress 多頁，四層下拉導航",
    "綠色臨床風格 + 診所實景 Hero",
    "首屏：地區 + 專科 + WhatsApp 24h",
    "13 年、8,000+ 年診量、中大學歷",
    "FAQ 10+ 題、Blog「中醫冷知識」",
    "Joinchat WhatsApp 小工具",
])
comparison_col(s, Inches(6.85), Inches(1.45), Inches(5.9), "獲客策略特徵", CINNABAR, [
    "SEO 長尾：每症狀獨立著陸頁",
    "首診優惠：皮膚科免診金",
    "IG KOL 素人化體驗分享",
    "PIXNET／Blogspot 體驗文",
    "付費廣告 → 療程銷售頁",
    "專業 copywriter 撰寫文案",
])

# ── Slide 4: 養康行銷策略詳解 ──
s = prs.slides.add_slide(blank)
slide_header(s, "02", "養康行銷策略：IG 素人化種草", "官網承接 + 社交種草 + 優惠降門檻")
rows = [
    ("SEO 長尾佈局", "每症狀／地區獨立頁", "截取「暗瘡 中醫 尖沙咀」流量"),
    ("WhatsApp 優先", "24h 預約、Joinchat 浮窗", "符合香港用戶習慣"),
    ("首診優惠", "皮膚科免診金", "提高廣告轉化率"),
    ("IG 素人化", "KOL 以「第一次針灸」等口吻發文", "製造口碑，非硬銷"),
    ("部落客佈局", "PIXNET 長文體驗文", "外鏈 + 品牌詞佔位"),
    ("廣告著陸", "AI 艾灸等獨立銷售頁", "導向高毛利療程"),
]
y = Inches(1.55)
for i, (a, b, c) in enumerate(rows):
    bg = PAPER if i % 2 == 0 else WHITE
    add_rect(s, Inches(0.55), y, Inches(12.2), Inches(0.72), bg)
    add_textbox(s, Inches(0.7), y + Inches(0.12), Inches(2.5), Inches(0.5), a, 11, True, PINE)
    add_textbox(s, Inches(3.3), y + Inches(0.12), Inches(4.5), Inches(0.5), b, 11, False, INK)
    add_textbox(s, Inches(8.0), y + Inches(0.12), Inches(4.5), Inches(0.5), c, 11, False, MUTED)
    y += Inches(0.72)
add_rect(s, Inches(0.55), Inches(6.0), Inches(12.2), Inches(0.85), PINE)
add_textbox(s, Inches(0.75), Inches(6.12), Inches(11.8), Inches(0.65),
            "觀察：官網「用家留言」嵌入 IG 貼文（@hons_cmc），lifestyle KOL 以第一人稱分享到店體驗，"
            "同時服務社交證明與 IG 探索流量。", 11, False, PAPER)

# ── Slide 5: 舊站不足 ──
s = prs.slides.add_slide(blank)
slide_header(s, "03", "現行網站不足", "oakvilles.com ｜ 2026 年 6 月審視")
issues = [
    ("資訊架構", "實質單頁，導航僅 5 項", "無長尾 SEO 著陸頁"),
    ("專科覆蓋", "首頁只展示皮膚、生育", "標語卻提及痛症，訊息不一致"),
    ("SEO 技術", "無 sitemap、結構化資料", "本地搜尋 relevance 弱"),
    ("轉化設計", "僅 WhatsApp 浮窗", "無分步預約、無收費透明"),
    ("信任建立", "缺評價、診所圖、FAQ", "首次訪客難完成信任測試"),
    ("合規風險", "「數週內可見皮損消退」", "文案筆誤（暗瘌）"),
]
y = Inches(1.5)
add_rect(s, Inches(0.55), y, Inches(3.5), Inches(0.4), PINE)
add_rect(s, Inches(4.15), y, Inches(4.5), Inches(0.4), PINE)
add_rect(s, Inches(8.75), y, Inches(4.0), Inches(0.4), PINE)
for i, h in enumerate(["維度", "現況", "影響"]):
    xs = [Inches(0.7), Inches(4.3), Inches(8.9)]
    add_textbox(s, xs[i], y + Inches(0.05), Inches(3), Inches(0.35), h, 11, True, WHITE)
y += Inches(0.45)
for i, (a, b, c) in enumerate(issues):
    bg = WHITE if i % 2 == 0 else PAPER
    add_rect(s, Inches(0.55), y, Inches(12.2), Inches(0.75), bg)
    add_textbox(s, Inches(0.7), y + Inches(0.1), Inches(3.2), Inches(0.55), a, 11, True, CINNABAR)
    add_textbox(s, Inches(4.15), y + Inches(0.1), Inches(4.4), Inches(0.55), b, 11, False, INK)
    add_textbox(s, Inches(8.75), y + Inches(0.1), Inches(3.8), Inches(0.55), c, 11, False, MUTED)
    y += Inches(0.75)

# ── Slide 6: 借鑑 vs 不照搬 ──
s = prs.slides.add_slide(blank)
slide_header(s, "04", "從對標學到什麼")
comparison_col(s, Inches(0.55), Inches(1.45), Inches(5.9), "✓  借鑑", RGBColor(0x2A, 0x46, 0x3C), [
    "以「症狀」作 SEO 入口",
    "FAQ 結構化（地點、資歷、收費）",
    "WhatsApp 全站一致預約動線",
    "Blog 持續內容 + 內部連結",
    "首屏展示地點、時間、專科",
    "診所實景建立信任",
])
comparison_col(s, Inches(6.85), Inches(1.45), Inches(5.9), "✗  不照搬", CINNABAR, [
    "美容塑形促銷語言（豐胸、減肥）",
    "高折扣首診優惠（高端定位不符）",
    "efficacy 進取表述（合規風險）",
    "資訊過密、視覺擁擠",
    "論壇軟文大量佈局",
    "與頤安「循本溯源」定位衝突",
])

# ── Slide 7: 新站方案 ──
s = prs.slides.add_slide(blank)
slide_header(s, "05", "新站重建方案摘要")
add_textbox(s, Inches(0.55), Inches(1.35), Inches(12), Inches(0.5),
            "技術：HTML5 + dongfang.css 設計系統 + 原生 JS ｜ 定位：中環高端中醫診所 + 可量度預約",
            13, False, MUTED)
modules = [
    ("首頁", "Hero · 四專科 · 評價 · 計算器 · 預約"),
    ("診症專科", "痛症 · 皮膚 · 婦科 · 內科 + 4 療法"),
    ("症狀專頁", "濕疹 · 暗瘡 · 失眠 · 備孕 · 頸痛等 7 頁"),
    ("內容", "Blog 4 篇 · 最新消息 · FAQ"),
    ("信任", "醫師 · 診所環境 · 流程收費 · Google 評價"),
    ("轉化", "2 步 funnel · WhatsApp · sticky CTA · GA4"),
]
for i, (title, desc) in enumerate(modules):
    col = i % 3
    row = i // 3
    x = Inches(0.55) + col * Inches(4.15)
    y = Inches(2.0) + row * Inches(2.35)
    add_rect(s, x, y, Inches(3.85), Inches(2.05), WHITE)
    add_rect(s, x, y, Inches(3.85), Inches(0.42), PINE if row == 0 else PINE_LIGHT)
    add_textbox(s, x + Inches(0.15), y + Inches(0.06), Inches(3.5), Inches(0.35),
                title, 14, True, WHITE)
    add_textbox(s, x + Inches(0.15), y + Inches(0.55), Inches(3.5), Inches(1.4),
                desc, 12, False, INK)

# ── Slide 8: 設計定位對比 ──
s = prs.slides.add_slide(blank)
slide_header(s, "05", "品牌定位差異")
pairs = [
    ("視覺風格", "綠色臨床、促銷感", "paper / pine / cinnabar 東方禪意"),
    ("目標受眾", "尖沙咀、美容減肥", "中環上班族、高端全科"),
    ("語氣調性", "促銷、療效導向", "循本溯源、合規克制"),
    ("品牌識別", "養康中醫館", "頤安本草 · 伍厚臻中醫師"),
]
y = Inches(1.65)
add_textbox(s, Inches(0.55), y, Inches(3.5), Inches(0.35), "維度", 12, True, PINE)
add_textbox(s, Inches(4.3), y, Inches(4.2), Inches(0.35), "養康中醫館", 12, True, MUTED)
add_textbox(s, Inches(8.7), y, Inches(4.2), Inches(0.35), "頤安本草（新站）", 12, True, CINNABAR)
y += Inches(0.45)
for i, (dim, old, new) in enumerate(pairs):
    bg = PAPER if i % 2 == 0 else WHITE
    add_rect(s, Inches(0.55), y, Inches(12.2), Inches(0.95), bg)
    add_textbox(s, Inches(0.7), y + Inches(0.2), Inches(3.2), Inches(0.55), dim, 13, True, PINE)
    add_textbox(s, Inches(4.3), y + Inches(0.2), Inches(4.0), Inches(0.55), old, 12, False, INK)
    add_textbox(s, Inches(8.7), y + Inches(0.2), Inches(4.0), Inches(0.55), new, 12, True, PINE)
    y += Inches(0.95)
add_rect(s, Inches(0.55), Inches(5.8), Inches(12.2), Inches(1.0), PINE)
add_textbox(s, Inches(0.75), Inches(5.95), Inches(11.8), Inches(0.75),
            "核心差異：養康以「流量 + 轉化」為先；頤安以「信任 + 合規 + 高端體驗」為先。"
            "兩者資訊架構可借鑑，品牌調性刻意區隔。", 12, False, PAPER)

# ── Slide 9: 改善對照 ──
s = prs.slides.add_slide(blank)
slide_header(s, "06", "新站 vs 舊站：具體改善")
improvements = [
    ("頁面規模", "1 頁", "30 頁"),
    ("SEO", "基本 title", "sitemap + JSON-LD + OG"),
    ("預約", "WhatsApp 連結", "2 步 funnel + 計算器預填"),
    ("收費", "未展示", "明碼價目 + 即時估算"),
    ("評價", "無", "Google 5.0 + Schema"),
    ("量度", "無", "GA4 dataLayer 事件"),
    ("品牌", "個人名義", "頤安本草品牌系統"),
    ("合規", "有效能承諾", "設計指南禁止誇大表述"),
]
for i, (k, old, new) in enumerate(improvements):
    col = i % 2
    row = i // 2
    x = Inches(0.55) + col * Inches(6.3)
    y = Inches(1.5) + row * Inches(1.35)
    add_rect(s, x, y, Inches(5.95), Inches(1.15), WHITE)
    add_textbox(s, x + Inches(0.15), y + Inches(0.08), Inches(5.6), Inches(0.3), k, 11, True, OCHRE)
    add_textbox(s, x + Inches(0.15), y + Inches(0.38), Inches(2.5), Inches(0.35),
                f"舊：{old}", 10, False, MUTED)
    add_textbox(s, x + Inches(2.8), y + Inches(0.38), Inches(3.0), Inches(0.35),
                f"新：{new}", 10, True, PINE)

# ── Slide 10: 行銷建議 ──
s = prs.slides.add_slide(blank)
slide_header(s, "07", "行銷策略建議", "參考養康模式，適配頤安定位")
add_rect(s, Inches(0.55), Inches(1.45), Inches(5.9), Inches(5.2), WHITE)
add_textbox(s, Inches(0.75), Inches(1.6), Inches(5.5), Inches(0.35),
            "建議採納", 16, True, PINE)
add_bullets(s, Inches(0.75), Inches(2.05), Inches(5.5), Inches(4.4), [
    "Google Business Profile 優化（中環定位）",
    "WhatsApp 統一轉化 + CTA 追蹤",
    "FAQ + 症狀頁持續補充",
    "Blog 每月 1–2 篇（濕疹、暗瘡、失眠、備孕）",
    "IG @oakville.wellness 與官網互導",
    "月度服務 HKD 10,000／月（策劃 + 維護）",
], 12, INK)
add_rect(s, Inches(6.85), Inches(1.45), Inches(5.9), Inches(5.2), WHITE)
add_textbox(s, Inches(7.05), Inches(1.6), Inches(5.5), Inches(0.35),
            "KOL 素人化（若採用）", 16, True, CINNABAR)
add_bullets(s, Inches(7.05), Inches(2.05), Inches(5.5), Inches(4.4), [
    "選垂直 KOL：中環上班族／皮膚／備孕",
    "內容聚焦診症體驗、醫師解說、診所環境",
    "避免疗效承诺，標明贊助／廣告",
    "官網只展示已授權內容",
    "與 Google 真實評價分開呈現",
    "不建議：免診金促銷、論壇軟文",
], 12, INK)

# ── Slide 11: 交付路線圖 ──
s = prs.slides.add_slide(blank)
slide_header(s, "08", "交付路線圖")
phases = [
    ("第一階段", "30 頁網站 · SEO · 預約 funnel · GA4", "✓ 已開發", PINE),
    ("第二階段", "50 張品牌視覺資產 · 全站接入", "規劃完成", OCHRE),
    ("第三階段", "Production 上線 oakvilles.com", "待部署", MUTED),
    ("持續", "月度行銷策劃 + 網站維護", "HKD 10,000／月", CINNABAR),
]
x_start = Inches(0.55)
for i, (phase, desc, status, color) in enumerate(phases):
    x = x_start + i * Inches(3.15)
    add_rect(s, x, Inches(2.2), Inches(2.85), Inches(3.5), WHITE)
    add_rect(s, x, Inches(2.2), Inches(2.85), Inches(0.55), color)
    add_textbox(s, x + Inches(0.15), Inches(2.28), Inches(2.55), Inches(0.4),
                phase, 13, True, WHITE)
    add_textbox(s, x + Inches(0.15), Inches(2.95), Inches(2.55), Inches(1.8),
                desc, 11, False, INK)
    add_textbox(s, x + Inches(0.15), Inches(4.9), Inches(2.55), Inches(0.4),
                status, 12, True, color)
    if i < 3:
        arrow = s.shapes.add_shape(MSO_SHAPE.RIGHT_ARROW, x + Inches(2.9), Inches(3.6),
                                   Inches(0.35), Inches(0.25))
        set_fill(arrow, OCHRE)
        arrow.line.fill.background()

# ── Slide 12: 結論 ──
s = prs.slides.add_slide(blank)
add_rect(s, 0, 0, SLIDE_W, SLIDE_H, PINE)
add_rect(s, 0, 0, Inches(0.12), SLIDE_H, CINNABAR)
add_textbox(s, Inches(0.9), Inches(1.5), Inches(11), Inches(0.5),
            "結論", 14, False, OCHRE)
add_textbox(s, Inches(0.9), Inches(2.1), Inches(11.5), Inches(2.5),
            "養康的優勢在於「內容厚度 + WhatsApp 轉化 + 社交種草」；"
            "現行 oakvilles.com 內容與技術基礎不足，未能承接搜尋流量。"
            "\n\n新站已在資訊架構、SEO、轉化量度及品牌視覺上系統性補足差距，"
            "並保持中環高端、合規、專業之定位。",
            20, False, WHITE, PP_ALIGN.LEFT)
add_rect(s, Inches(0.9), Inches(5.0), Inches(11.5), Inches(1.6), PINE_LIGHT)
add_textbox(s, Inches(1.1), Inches(5.15), Inches(11), Inches(0.35),
            "建議下一步", 13, True, OCHRE)
add_bullets(s, Inches(1.1), Inches(5.55), Inches(11), Inches(1.0), [
    "完成 50 張視覺資產製作及全站接入",
    "正式部署 oakvilles.com",
    "啟動月度行銷維護合約（SEO + 內容 + GA4 月報）",
], 13, PAPER)

prs.save(OUTPUT)
shutil.copy2(OUTPUT, OUTPUT_DESKTOP)
print(f"Saved: {OUTPUT}")
print(f"Slides: {len(prs.slides)}")
