# -*- coding: utf-8 -*-
import re
from pathlib import Path

p = Path(__file__).resolve().parent.parent / 'index.html'
html = p.read_text(encoding='utf-8')

hero_new = '''
  <div class="df-home-hero__wash-a" aria-hidden="true"></div>
  <div class="df-home-hero__wash-b" aria-hidden="true"></div>

  <div class="df-container">
    <div class="df-home-hero__grid hero-grid">
      <div class="df-home-hero__copy-row">
        <div class="df-home-hero__vcol reveal">
          <span class="df-home-hero__vline df-home-hero__vline--faint">香港中環</span>
          <span class="df-home-hero__vsep"></span>
          <span class="df-home-hero__vline df-home-hero__vline--cin">高端中醫</span>
        </div>
        <div class="df-home-hero__main">
          <p class="reveal df-home-hero__eyebrow">承古立新 · 本草為宗</p>
          <h1 class="reveal df-home-hero__title" data-d="1">以現代之學<br>啟<span style="color:var(--cinnabar)">岐黃</span>之力</h1>
          <p class="reveal df-home-hero__lead" data-d="2">頤安本草 · 伍厚臻中醫師。專為繁忙香港人而設的精準調理 — 於中環一隅闢一方禪意診室，以二十五載臨證之功循本溯源，每診細審四診、量身擬方，不趕時間、不流水作業。</p>
          <div class="reveal df-home-hero__actions" data-d="3">
            <a href="#booking" class="btn-cin df-home-hero__cta">網上預約應診 <svg width="18" height="10" viewBox="0 0 18 10" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M0 5h16M12 1l4 4-4 4"/></svg></a>
            <a href="https://wa.me/85267349532?text=您好，我想預約伍醫師診症。" target="_blank" rel="noopener" class="ink-link df-home-hero__wa"><span class="df-home-hero__wa-dot"></span>WhatsApp 即時諮詢</a>
          </div>
        </div>
      </div>
      <div class="reveal hero-portrait" data-d="2">
        <div class="df-home-hero__portrait-wrap">
          <div class="df-home-hero__portrait-deco" aria-hidden="true"></div>
          <div class="cnr-frame df-home-hero__portrait-frame" style="overflow:hidden;border-radius:4px">
            <img src="images/doctor.jpg" alt="伍厚臻中醫師" class="df-home-hero__portrait-img">
            <div class="df-home-hero__portrait-overlay"></div>
            <div class="df-home-hero__portrait-cap">
              <span class="seal"><span>厚</span><span>臻</span><span>醫</span><span>師</span></span>
              <span class="df-home-hero__brush">伍厚臻</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="df-home-hero__scroll" aria-hidden="true">
    <div class="df-home-hero__scroll-inner">
      <span class="df-home-hero__scroll-label">下探</span>
      <span class="df-home-hero__scroll-line"></span>
    </div>
  </div>
'''

section_start = html.find('<section id="top"')
inner_start = html.find('>', section_start) + 1
section_end = html.find('</section>', section_start) + len('</section>')
html = html[:inner_start] + hero_new + html[section_end:]

replacements = [
    ('max-w-[1280px] mx-auto px-5 md:px-10', 'df-container'),
    ('paper-grain relative py-24 md:py-36', 'paper-grain df-home-section'),
    ('paper-grain py-16 md:py-20', 'paper-grain df-home-section--md'),
    ('bg-paper-deep paper-grain relative py-24 md:py-36', 'paper-grain df-home-section df-home-section--deep'),
    ('bg-paper-deep paper-grain relative py-24 md:py-32', 'paper-grain df-home-section df-home-section--deep df-home-section--sm'),
    ('bg-pine-deep paper-grain relative py-28 md:py-40 overflow-hidden', 'paper-grain df-home-section df-home-section--pine df-home-creed'),
    ('bg-pine-deep text-paper/85 paper-grain', 'paper-grain df-home-section--pine'),
    ('max-w-[760px] mx-auto px-5 md:px-10 relative', 'df-home-booking__inner'),
    ('text-center max-w-xl mx-auto mb-14 reveal', 'df-home-reviews-head reveal'),
    ('text-center max-w-xl mx-auto mb-16 reveal', 'df-home-pricing-head reveal'),
    ('flex flex-wrap justify-center gap-4 mt-10 reveal', 'df-home-chips reveal'),
    ('grid lg:grid-cols-12 gap-12 lg:gap-16 items-center', 'df-home-about-grid'),
    ('grid lg:grid-cols-12 gap-12 lg:gap-14 lg:items-start', 'df-home-insights-grid'),
    ('grid lg:grid-cols-12 gap-12 lg:gap-16 items-start', 'df-home-schedule-grid'),
    ('grid lg:grid-cols-2 gap-10 lg:gap-16 items-start', 'df-home-pricing-grid'),
    ('flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 reveal', 'df-home-head reveal'),
    ('flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 reveal', 'df-home-head df-home-head--mb-sm reveal'),
    ('flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 reveal', 'df-home-social-head reveal'),
    ('grid sm:grid-cols-2 lg:grid-cols-4 border-t border-l border-[var(--line)]', 'df-home-spec-grid'),
    ('space-y-4 reveal', 'df-home-news-list reveal'),
]
for a, b in replacements:
    html = html.replace(a, b)

trust_old = '''  <div class="df-container py-7 flex flex-col md:flex-row items-center justify-between gap-5">
    <p class="font-kai tracking-[.2em] text-ochre-light text-sm flex items-center gap-3">
      <span class="w-6 h-px bg-ochre/60"></span>信而有徵 · 醫者之證
    </p>
    <div class="flex flex-wrap justify-center gap-x-10 gap-y-3 font-kai text-sm tracking-[.08em]">
      <span class="flex items-center gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-ochre-light"></span>香港註冊中醫 003769</span>
      <span class="hidden md:block w-px h-4 bg-paper/15 self-center"></span>
      <span class="flex items-center gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-ochre-light"></span>政府醫療券特約</span>
      <span class="hidden md:block w-px h-4 bg-paper/15 self-center"></span>
      <span class="flex items-center gap-2.5"><span class="w-1.5 h-1.5 rounded-full bg-ochre-light"></span>各大商業保險適用</span>
    </div>
  </div>'''

trust_new = '''  <div class="df-container df-home-trust-strip">
    <p class="df-home-trust-strip__tagline"><span class="df-home-trust-strip__tagline-line"></span>信而有徵 · 醫者之證</p>
    <div class="df-home-trust-strip__items">
      <span class="df-home-trust-strip__item"><span class="df-home-trust-strip__dot"></span>香港註冊中醫 003769</span>
      <span class="df-home-trust-strip__sep"></span>
      <span class="df-home-trust-strip__item"><span class="df-home-trust-strip__dot"></span>政府醫療券特約</span>
      <span class="df-home-trust-strip__sep"></span>
      <span class="df-home-trust-strip__item"><span class="df-home-trust-strip__dot"></span>各大商業保險適用</span>
    </div>
  </div>'''
html = html.replace(trust_old, trust_new)

html = html.replace(
    'class="px-5 py-2.5 border border-[var(--line)] rounded-sm font-kai text-sm tracking-[.1em] text-pine bg-paper"',
    'class="df-home-chip"',
)
html = html.replace(
    'class="px-4 py-2 border border-[var(--line)] rounded-sm font-kai text-sm tracking-[.1em] text-pine"',
    'class="df-home-chip df-home-chip--sm"',
)
html = html.replace(
    'spec-card group block p-8 lg:p-9 border-r border-b border-[var(--line)] bg-paper/40 hover:bg-paper',
    'spec-card df-home-spec-card',
)
html = html.replace('class="flex items-start justify-between mb-8"', 'class="df-home-spec-card__top"')
html = html.replace(
    'class="spec-num font-kai font-bold text-5xl text-ochre/70 transition-colors"',
    'class="spec-num df-home-spec-card__num"',
)
html = html.replace(
    'class="font-kai font-bold text-pine text-2xl tracking-[.06em] mb-3"',
    'class="df-home-spec-card__title"',
)
html = html.replace('class="text-ink-soft text-[14.5px] leading-[1.95]"', 'class="df-home-spec-card__desc"')
html = html.replace(
    'class="inline-flex items-center gap-2 mt-6 font-kai text-sm tracking-[.12em] text-cinnabar opacity-70 group-hover:opacity-100 transition-opacity"',
    'class="df-home-spec-card__link"',
)

for old, new in [
    ('class="font-kai text-ochre text-sm tracking-[.35em] mb-3"', 'class="df-home-eyebrow"'),
    ('class="font-kai text-ochre text-sm tracking-[.35em] mb-4"', 'class="df-home-eyebrow"'),
    ('class="font-kai text-ochre text-sm tracking-[.35em] mb-4 text-center"', 'class="df-home-eyebrow" style="text-align:center"'),
    ('class="font-kai font-black text-pine leading-[1.15] tracking-[.03em] text-[clamp(2rem,4.4vw,3.2rem)]"', 'class="df-home-title"'),
    ('class="font-kai font-black text-pine leading-[1.2] tracking-[.03em] text-[clamp(2rem,4.4vw,3.2rem)]"', 'class="df-home-title"'),
    ('class="font-kai font-black text-pine leading-[1.15] tracking-[.03em] text-[clamp(2rem,4.4vw,3rem)]"', 'class="df-home-title"'),
    ('class="font-kai font-black text-pine leading-[1.2] tracking-[.03em] text-[clamp(2rem,4.2vw,3rem)]"', 'class="df-home-title"'),
    ('class="font-kai font-black text-pine leading-[1.15] tracking-[.03em] text-[clamp(1.8rem,3.6vw,2.6rem)]"', 'class="df-home-title df-home-title--sm"'),
    ('class="font-kai font-black text-pine leading-[1.2] tracking-[.03em] text-[clamp(2rem,4.6vw,3.2rem)]"', 'class="df-home-title"'),
]:
    html = html.replace(old, new)

html = re.sub(r'<script>\s*function calculatePrice\(\)[\s\S]*?</script>\s*', '', html)
html = html.replace(
    '<script src="js/search-index.js"></script>\n<script src="js/dongfang.js"></script>',
    '<script src="js/site-config.js"></script>\n<script src="js/schema-manifest.js"></script>\n<script src="js/search-index.js"></script>\n<script src="js/dongfang.js"></script>',
)

p.write_text(html, encoding='utf-8')
remaining = len(re.findall(r'(?:class="[^"]*(?:flex|grid|max-w-|py-\d|md:|lg:|sm:))', html))
print('Tailwind-like classes remaining:', remaining)
