# 頤安本草 · 伍厚臻中醫師 — 全站圖片規劃與 AI 生成 Prompt

> **文件用途**：盤點全站圖片缺口、建議新增「圖文並茂」區塊，並提供可逐張生成的統一風格 Prompt。  
> **品牌**：頤安本草 · Oakville Wellness · 香港中環高端中醫診所  
> **更新**：2026-06-21（§ E 專科 Hero v2 — 對齊 skin-hero 基準）

---

## 一、全站現況摘要

| 類型 | 數量 | 狀態 |
|------|------|------|
| 真實素材（醫師肖像） | 1 張 `doctor.jpg` | 已有，建議專業重拍／裁切多版本 |
| 品牌 SVG | `logo.svg`、`favicon.svg` | 已有 |
| Unsplash 佔位圖 | **22 處引用**（約 12 張不重複） | **必須替換** — 非本診所、部分載入失敗、SEO/信任感差 |
| 純文字內頁 | 20+ 頁 | **強烈建議** 加 Hero 側圖或圖文分欄 |
| OG 分享圖 | 全站共用 `doctor.jpg` | 建議分頁專用 OG 圖 |

### 優先級

| 優先 | 內容 | 原因 |
|------|------|------|
| **P0** | 診所實景 6 張 + 醫師肖像優化 | 信任核心；Unsplash 需全部下架 |
| **P1** | 專欄／列表封面 4 張 + IG 方圖 6 張 | 首頁與 blog 視覺一致性 |
| **P2** | 8 專科頁 + 6 症狀頁 Hero／分欄圖 | 降低純文字牆、提升轉化 |
| **P3** | 流程 6 步、FAQ、聯絡地圖、OG 系列 | 體驗深化與分享優化 |

---

## 二、統一視覺規範（所有 Prompt 必附）

以下 **Global Style Block** 請加在每張圖 Prompt **末尾**（或作為 Image API 的 style reference）：

```
GLOBAL STYLE — Oakville Wellness 頤安本草:
Premium Hong Kong Central TCM clinic aesthetic. Warm cream paper tone (#F7F2E7), deep pine green accents (#2A463C), subtle cinnabar red (#A23A2E) and muted ochre gold (#AE8A47). Zen-like, private, calm, high-end editorial photography — NOT generic hospital stock. Soft natural window light, gentle shadows, shallow depth of field. Clean composition with negative space suitable for Chinese serif typography overlay. Subtle rice-paper texture in highlights. No harsh flash, no cluttered props, no watermarks, no text in image. Color grading: warm, desaturated greens, ivory highlights. Mood: 禪意、私密、專業、中環高端商務人士適配. 16:9 or specified ratio, photorealistic, 8K detail.
```

### 建議輸出規格

| 用途 | 比例 | 建議像素 | 格式 |
|------|------|----------|------|
| Hero 肖像 | 4:5 | 1600×2000 | WebP + JPG fallback |
| 診所 Gallery | 4:3 | 1600×1200 | WebP |
| 專欄卡片 | 16:10 | 1600×1000 | WebP |
| IG 方圖 | 1:1 | 1080×1080 | WebP |
| 內頁 Hero 寬圖 | **21:9**（`.df-page-visual` 桌面）／手機裁 **3:2** | **1920×823** | WebP / PNG |
| 流程步驟圖 | 3:2 | 1200×800 | WebP |
| OG 分享 | 1.91:1 | 1200×630 | **JPG**（`images/og/`） |

### 建議檔案目錄

```
images/
├── brand/          logo, og-default
├── physician/      doctor-hero, doctor-about, doctor-consulting
├── clinic/         waiting, consultation, acupuncture, reception, herbal, exterior
├── editorial/      blog-*, news-*
├── services/       pain, skin, internal, gyn, acupuncture, herbs, moxa, cupping
├── conditions/     eczema, acne, insomnia, fertility, neck-pain, sciatica
├── process/        step-01 … step-06
├── og/             og-default, og-home, og-pain … og-sciatica
└── social/         ig-01 … ig-06
```

---

## 三、現有佔位圖 — 必換清單（P0–P1）

### A. 醫師肖像（真實攝影優先，非 AI 臉）

#### IMG-001 · Hero 主肖像
| 項目 | 內容 |
|------|------|
| **現況** | `index.html` → `.df-photo-card--hero` → `images/doctor.jpg` |
| **尺寸** | 顯示約 551×480（原圖 800×960） |
| **用途** | 首屏轉化、品牌第一印象 |
| **說明** | 伍厚臻醫師半身至胸像，正裝或深色西裝搭簡潔背景；可保留現有診所藥櫃背景但需 **裁切穩定、光線均勻**；Hero 版右上角留空放 logo 印章，**不要**底部書法名（已在 About 區處理） |
| **建議檔名** | `images/physician/doctor-hero.webp` |

**Prompt（若需 AI 背景重修／補光，臉部用真實照片合成）：**
```
Editorial portrait for a premium TCM clinic website hero. Hong Kong Chinese male physician in his 50s, glasses, dark tailored suit, calm confident expression, slight warm smile. Three-quarter view, positioned right side of frame leaving left negative space for text overlay. Background: softly blurred traditional medicine cabinet with glass jars and wooden drawers, cream and pine-green tones. Soft window light from left, premium magazine portrait style. 4:5 vertical composition.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

#### IMG-002 · About 醫師肖像（含印章區）
| 項目 | 內容 |
|------|------|
| **現況** | `index.html#about`、`about.html` → 同一 `doctor.jpg` |
| **用途** | 「醫師其人」信任建立；About 需底部漸層 + 印章 |
| **說明** | 可與 IMG-001 同次拍攝，**構圖略低** 保留 figcaption 區（`.df-photo-card__shade`）；表情更柔和、偏「聆聽」 |
| **建議檔名** | `images/physician/doctor-about.webp` |

**Prompt：**
```
Editorial portrait of a senior TCM physician in a serene consultation setting. Same character as IMG-001 if series. Seated or standing at slight angle, hands relaxed, empathetic expression. Lower third of image slightly darker for text and seal overlay. Background: minimal zen clinic interior, pine green accents, cream walls. 4:5 vertical.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

### B. 診所實景（強烈建議 **實地拍攝**；以下 Prompt 供場景參考或 AI 墊圖）

#### IMG-003 · 候診區
| 項目 | 內容 |
|------|------|
| **現況** | `index.html#clinic`、`clinic.html` — Unsplash 佔位 |
| **位置** | `.df-gallery__item[0]` |
| **說明** | 2–4 個候診座位、暖色間接燈、雜誌／茶 cup 可選；**無其他患者正臉**；體現「高私密禪意」 |
| **建議檔名** | `images/clinic/waiting-area.webp` |

**Prompt：**
```
Interior photography of a premium TCM clinic waiting lounge in Central Hong Kong. Two elegant armchairs in cream linen, low wooden side table with ceramic tea cup, indirect warm lighting, pine-green accent wall panel, vertical calligraphy art blurred in background. Empty, peaceful, no people. Wide angle 4:3.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

#### IMG-004 · 診症室
| 項目 | 內容 |
|------|------|
| **現況** | 同上 gallery[1] |
| **說明** | 診桌、脈枕、書籍、簡潔屏風或窗簾；可含 **醫師背影或手部把脈**（不強求露臉） |
| **建議檔名** | `images/clinic/consultation-room.webp` |

**Prompt：**
```
TCM consultation room interior. Wooden desk with pulse diagnosis pillow, tongue diagnosis light off-frame, stacked classic medicine books, single ergonomic chair. Soft daylight through sheer curtain. Atmosphere: private, scholarly, calm. Optional: physician hands taking pulse, face out of frame. 4:3.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

#### IMG-005 · 針灸治療區
| 項目 | 內容 |
|------|------|
| **現況** | index gallery[2]；clinic gallery[3] |
| **說明** | 乾淨治療床、無菌針具托盤、柔和燈光；**不展示患者裸露皮膚** — 以空間或覆蓋毛巾為主 |
| **建議檔名** | `images/clinic/acupuncture-room.webp` |

**Prompt：**
```
Acupuncture treatment room in a high-end TCM clinic. Single treatment bed with crisp cream linens, sterilized needle tray on side table, moxa stick holder, dimmable warm lamp. No patient visible. Clean, spa-like medical hygiene. 4:3.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

#### IMG-006 · 接待處
| 項目 | 內容 |
|------|------|
| **現況** | index gallery[3]；clinic gallery[4] |
| **說明** | 前台、頤安本草 logo、應診時間小牌；可含 **接待職員手與文件** 不露臉 |
| **建議檔名** | `images/clinic/reception.webp` |

**Prompt：**
```
Clinic reception desk close-up. Minimal counter in light wood, small red seal-style logo plate, appointment book, pen, orchid in ceramic vase. Shallow depth of field. Welcoming but professional. 4:3.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

#### IMG-007 · 中藥房（clinic 頁專用）
| 項目 | 內容 |
|------|------|
| **現況** | 僅 `clinic.html` gallery[2] — Unsplash |
| **說明** | 百子櫃、藥材抽屜、或免煎顆粒包裝區；強調 **一人一方** 配藥過程（雙手配藥即可） |
| **建議檔名** | `images/clinic/herbal-dispensary.webp` |

**Prompt：**
```
Traditional Chinese herbal dispensary counter. Rows of wooden herb drawers with brass labels, pharmacist hands weighing herbs on scale (no face), brown paper packets, modern granule sachets nearby blending tradition and convenience. 4:3.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

#### IMG-008 · 錦安大廈外觀
| 項目 | 內容 |
|------|------|
| **現況** | 僅 `clinic.html` gallery[5] |
| **說明** | 中環皇后大道中街景 + 大廈入口／電梯間指示 **602 室**（可後期疊字，圖中不加字） |
| **建議檔名** | `images/clinic/building-kam-on.webp` |

**Prompt：**
```
Hong Kong Central district street scene, Kam On Building entrance on Queen's Road Central, daytime, elegant urban context, taxi and pedestrians softly blurred. Focus on building lobby entrance and directory board area (no readable text). Documentary architectural style. 4:3.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

### C. 養生專欄封面（P1 — 編輯風格，非病變特寫）

#### IMG-009 · 濕疹專欄
| 項目 | 內容 |
|------|------|
| **現況** | `index.html#insights`、`blog/index.html`、`blog/eczema-from-within.html`（缺 Hero 圖） |
| **說明** | **禁止** 紅腫皮膚特寫；改為「清熱祛濕」意象：綠色時蔬、薏米、清湯 |
| **建議檔名** | `images/editorial/blog-eczema.webp` |

**Prompt：**
```
Editorial food still life for TCM wellness article about eczema internal conditioning. Bowl of light congee with goji and mung beans, cucumber and leafy greens on cream ceramic plate, steam rising subtly. Top-down 45-degree angle. Fresh, clean, anti-inflammatory mood. 16:10.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

#### IMG-010 · 暗瘡／面部分區
| 項目 | 內容 |
|------|------|
| **現況** | index + blog index + `blog/acne-face-zones.html` |
| **說明** | 健康膚質女性 **側面輪廓** 或 **中醫面部分區示意圖（無標籤）** 的藝術化版本；避免 acne 特寫 |
| **建議檔名** | `images/editorial/blog-acne.webp` |

**Prompt：**
```
Abstract beauty wellness image for TCM facial zone theory. Young East Asian woman in soft profile, flawless natural skin, gentle rim light. Overlay-friendly negative space. Optional faint golden section lines on face (very subtle, aesthetic not clinical). 16:10.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

#### IMG-011 · 失眠專欄
| 項目 | 內容 |
|------|------|
| **現況** | index + blog index + `blog/insomnia-tcm-guide.html` |
| **說明** | 寧靜臥室一角、暖色檯燈、薰衣草／酸棗仁茶；**不強調焦慮表情** |
| **建議檔名** | `images/editorial/blog-insomnia.webp` |

**Prompt：**
```
Calming bedtime still life for TCM insomnia article. Bedside table with warm lamp, cup of jujube seed tea, closed book, soft linen bedding in cream and pine tones. Night scene with gentle warm light only. 16:10.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

#### IMG-012 · 備孕／壓力型難孕
| 項目 | 內容 |
|------|------|
| **現況** | index + blog index + `blog/fertility-stress.html` |
| **說明** | 雙手輕放腹部（著衣）、瑜伽墊、溫熱飲；傳達 **調理、希望** 而非醫療檢查 |
| **建議檔名** | `images/editorial/blog-fertility.webp` |

**Prompt：**
```
Serene wellness image for TCM fertility support. Woman's hands resting on lower abdomen over soft knit sweater, cup of warm red date tea, yoga mat edge visible. Hopeful calm mood, no medical equipment. 16:10.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

### D. Instagram 動態方圖（P1 — 可與上述重用或獨立）

| ID | 現況 alt | 建議檔名 | 說明 |
|----|----------|----------|------|
| IMG-013 | 養生食材 | `social/ig-herbs-food.webp` | 同 IMG-009 裁 1:1 |
| IMG-014 | 針灸治療 | `social/ig-acupuncture.webp` | 針具特寫 + 淺景深，無患者 |
| IMG-015 | 養生茶 | `social/ig-tea.webp` | 茶壺、杯、乾菊花枸杞 |
| IMG-016 | 中藥房 | `social/ig-dispensary.webp` | 同 IMG-007 裁 1:1 |
| IMG-017 | 診所環境 | `social/ig-interior.webp` | 候診區一角 |
| IMG-018 | 皮膚護理 | `social/ig-skin-care.webp` | 天然護膚成分平鋪（蘆薈、燕麥） |

**通用 IG Prompt 模板：**
```
Square 1:1 Instagram photo for @oakville.wellness TCM clinic Hong Kong. [SUBJECT]. Minimal composition, cream background, pine green accent prop. Editorial lifestyle meets traditional medicine. No text, no logo.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

#### IMG-019 · 最新消息封面
| 項目 | 內容 |
|------|------|
| **現況** | `news/index.html` feed card — Unsplash 辦公室圖 |
| **說明** | 診所門口 + 「週六應診」氛圍；或時鐘 + 診所接待桌面 |
| **建議檔名** | `images/editorial/news-hours.webp` |

**Prompt：**
```
Clinic announcement image: reception desk with small analog clock showing morning time, Saturday calendar page subtle in background, warm welcoming light. Theme: extended weekend clinic hours. 16:10.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

## 四、建議新增「圖文並茂」區塊（P2 — 目前純文字頁）

專科頁已接入 **Hero 下方全寬橫幅**（`.df-section--visual` + `.df-page-visual`），與皮膚科頁一致；其餘純文字頁仍可用 `.df-about-grid` 或 `.df-split`（左圖右文）補圖。

### E. 診症專科頁 Hero 橫幅（8 張）— v2 重設計

> **視覺基準**：`services/skin.html` + `images/services/skin-hero.png`（已核准上線）  
> **版型**：Hero 文字區（`.df-page-hero`）→ 下方 `.df-page-visual` 全寬圖，**非**左文右圖  
> **比例**：**21:9 · 1920×823**（`.df-page-visual` 桌面；手機 3:2 見構圖安全區）  
> **檔名**：`images/services/*-hero.png`（WebP 可後製）

#### 統一視覺公式（8 張必守）

| 元素 | 規格 |
|------|------|
| **構圖** | 電影感微距／中景；主體偏右或居中，左側留較暗負空間（對應 Hero 浮水印字：痛／膚／內…） |
| **人物** | 只見醫師雙手 + 深墨綠傳統長袍袖口；**不露患者臉、不露皮膚病患特寫** |
| **背景** | 虛化深色百子櫃／藥斗牆 + 側窗柔光；右後方可有候診窗邊軟焦 |
| **前景** | 深色實木桌面 + 亞麻布墊；專科相關道具 + 精選藥材 |
| **光線** | 自然側光、低調（low-key）；草藥／艾煙可有一縷細煙增加層次 |
| **色調** | 深綠、暖木、土褐；枸杞紅等作點綴；整體去飽和、高端編輯感 |
| **禁止** | 文字／Logo／水印、白袍西醫感、血腥、誇張痛苦表情、類固醇軟膏、AI 假臉特寫 |

**Negative prompt（每張末尾可加）：**
```
no text, no watermark, no logo, no patient face, no skin disease close-up, no hospital white coat, no stock photo smile, no cluttered desk, no harsh flash, no neon colors
```

---

| ID | 頁面 | H1 關鍵 | 檔名 | alt | 狀態 |
|----|------|---------|------|-----|------|
| IMG-020 | `/services/pain.html` | 針灸推拿治療**痛症** | `pain-hero.png` | 中醫針灸治療肩頸痛症 | 待重生成 |
| IMG-021 | `/services/skin.html` | 暗瘡·濕疹·皮膚敏感 | `skin-hero.png` | 中醫皮膚調理與草本內調 | ✅ 已核准 |
| IMG-022 | `/services/internal.html` | 失眠·腸胃·**免疫** | `internal-hero.png` | 中醫內科把脈與臟腑調理 | 待重生成 |
| IMG-023 | `/services/gynaecology.html` | 月經·痛經·**PCOS** | `gynaecology-hero.png` | 中醫婦科溫養調理 | 待重生成 |
| IMG-024 | `/services/acupuncture.html` | 針灸**療法** | `acupuncture-hero.png` | 毫針針灸與經絡調和 | 待重生成 |
| IMG-025 | `/services/herbs.html` | 中藥處方**一人一方** | `herbs-hero.png` | 中藥材配藥與一人一方 | 待重生成 |
| IMG-026 | `/services/moxibustion.html` | 艾灸**療法** | `moxibustion-hero.png` | 艾灸溫通經絡 | 待重生成 |
| IMG-027 | `/services/cupping.html` | 拔罐**刮痧** | `cupping-hero.png` | 拔罐刮痧疏通氣血 | 待重生成 |

---

#### IMG-021 · 皮膚科（基準圖 — 已核准）

| 項目 | 內容 |
|------|------|
| **頁面訊息** | 皮膚問題反映內在失調；中藥內服 + 針灸，不依賴類固醇 |
| **畫面** | 醫師深綠袍雙手整理藥材；前景：藥缽內人參根 + 細煙、木盤盛枸杞／切片藥材；背景百子櫃虛化 |

**Prompt（基準，其餘 7 張結構對齊此圖）：**
```
Cinematic macro photograph for TCM dermatology service page banner. 3:2 horizontal, 1200x800.

Scene: A TCM practitioner's hands in dark forest-green traditional robe sleeves arranging herbs on a dark wooden table. Foreground: black ceramic mortar with whole ginseng roots and a delicate wisp of aromatic smoke rising; wooden plate with red goji berries, pale sliced astragalus roots, and dried herbal strands on natural linen cloth. Practitioner gesturing as if explaining internal herbal regulation for skin wellness.

Background: softly blurred dark wood apothecary cabinet with many small labeled drawers (classic Chinese pharmacy). Soft natural side-light from window, shallow depth of field, left third darker for text overlay. Mood: calm, premium, holistic skin care from within — NOT topical cosmetics or steroids.

No patient visible. No face. No skin disease. No text in image.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

#### IMG-020 · 痛症治療

| 項目 | 內容 |
|------|------|
| **頁面訊息** | 頸肩、腰背、關節、坐骨神經痛；針灸 + 推拿 + 中藥外敷，「不通則痛」 |
| **畫面** | 醫師手施毫針於肩頸區（患者以深色毛巾覆蓋，只見肩線剪影）；旁置刮痧板、溫灸盒 |

**Prompt：**
```
Cinematic macro photograph for TCM pain management service page. 3:2 horizontal, 1200x800.

Scene: TCM practitioner's hands in dark pine-green robe inserting fine acupuncture needles along shoulder and neck meridian points. Patient shown only as covered silhouette — dark towel draped over shoulders, no face, no pain expression. On dark wooden table: sterile needle tray, smooth jade gua sha tool, small warming moxibustion box, linen cloth.

Background: blurred traditional herb cabinet drawers, soft window side-light. Left area darker negative space. Mood: precise, relieving, professional meridian therapy — NOT emergency trauma or grimacing patient.

No face. No bare skin lesion. No text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

#### IMG-022 · 內科調理

| 項目 | 內容 |
|------|------|
| **頁面訊息** | 失眠、腸胃、慢性疲勞、反覆感冒；四診合參、臟腑調和 |
| **畫面** | 三指把脈特寫 + 小瓷杯溫茶 + 舌診小鏡（未照舌） |

**Prompt：**
```
Cinematic macro photograph for TCM internal medicine service page. 3:2 horizontal, 1200x800.

Scene: Close-up of practitioner's three fingers gently taking pulse on patient's wrist over silk pulse cushion — patient wrist only, no face. Dark green robe sleeve visible. On table: small white porcelain cup of warm herbal tea with steam, traditional tongue diagnosis mirror (closed, no tongue shown), handwritten prescription paper edge, faint incense smoke.

Background: soft-blurred apothecary cabinet, cream wall, natural side-light. Mood: diagnostic calm, whole-body balance, urban wellness — insomnia and digestion implied through warm tea and pulse, NOT hospital lab equipment.

No face. No tongue close-up. No text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

#### IMG-023 · 婦科調理

| 項目 | 內容 |
|------|------|
| **頁面訊息** | 月經不調、痛經、備孕、PCOS；溫養子宮、調和氣血 |
| **畫面** | 把脈（腕部）+ 玫瑰紅棗茶 + 小艾灸盒；暖色亞麻披肩搭椅背（無人物） |

**Prompt：**
```
Cinematic macro photograph for TCM gynecology and women's wellness page. 3:2 horizontal, 1200x800.

Scene: Practitioner's hands in dark green robe taking pulse on woman's wrist over small silk cushion — wrist and hands only, no face, modest long-sleeve clothing. On dark wood table: cup of warm rose and red date herbal tea, small bamboo moxibustion warmer with gentle smoke curl, dried rosebuds and goji in ceramic dish. Soft ochre linen shawl draped on chair back in background — no body shown.

Background: blurred herb drawers, warm afternoon window light. Mood: nurturing, warm uterus care, fertility hope — NOT pregnancy belly, NOT gynecological exam, NOT medical stirrups.

No face. No abdomen close-up. No text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

#### IMG-024 · 針灸療法

| 項目 | 內容 |
|------|------|
| **頁面訊息** | 細毫針刺激穴位，疏通經絡、調和氣血；治療 + 保健 |
| **畫面** | 竹托盤上排列毫針 + 穴位人體模型側影 + 醫師持針手 |

**Prompt：**
```
Cinematic macro photograph for TCM acupuncture therapy page. 3:2 horizontal, 1200x800.

Scene: Practitioner's hand holding a single sterile acupuncture needle above bamboo tray with neatly arranged fine needles and alcohol swab. Beside tray: small bronze acupuncture meridian model (torso side profile, no face), acupoint chart scroll partially rolled. Dark green robe cuff visible.

Background: blurred dark wood medicine cabinet, soft natural side-light, shallow depth of field. Left third darker. Mood: precise, ancient technique meets modern sterility — NOT bloody needles, NOT full body patient.

No patient. No face on model. No text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

#### IMG-025 · 中藥處方

| 項目 | 內容 |
|------|------|
| **頁面訊息** | 四診合參、一人一方；覆診加減藥味 |
| **畫面** | 傳統戥秤稱藥 + 分格藥材 + 線裝書／處方箋 |

**Prompt：**
```
Cinematic macro photograph for TCM herbal prescription service page. 3:2 horizontal, 1200x800.

Scene: Practitioner's hands in dark green robe using traditional brass balance scale to weigh dried herbs into paper packets. Foreground: artful arrangement of angelica root slices, astragalus, goji berries, licorice on dark wood; mortar and pestle; thread-bound classical formula book and blank prescription slip with brush pen.

Background: rows of small apothecary drawers softly blurred, warm side-light. Mood: bespoke compounding, one formula one person — NOT mass-produced pill bottles, NOT Western pharmacy shelves.

No face. No text on prescription readable. No watermark.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

#### IMG-026 · 艾灸療法

| 項目 | 內容 |
|------|------|
| **頁面訊息** | 溫通經絡、扶陽祛寒；虛寒、手腳冰冷、慢性疲勞 |
| **畫面** | 手持艾條（暗紅餘燼）+ 竹製灸盒 + 艾絨 + 細長煙霧 |

**Prompt：**
```
Cinematic macro photograph for TCM moxibustion therapy page. 3:2 horizontal, 1200x800.

Scene: Practitioner's hand in dark green robe holding lit moxa stick with glowing ember tip, elegant thin smoke trail rising vertically. On dark wooden table: bamboo moxibustion box, mound of golden moxa wool, ceramic dish with mugwort residue, linen cloth. Warm amber light accent on ember.

Background: blurred herb cabinet, soft window light, left area darker. Mood: warming yang energy, gentle heat therapy — NOT fire hazard chaos, NOT burned skin, NOT smoke-filled room.

No patient. No face. No text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

#### IMG-027 · 拔罐刮痧

| 項目 | 內容 |
|------|------|
| **頁面訊息** | 促進氣血、鬆解筋膜；肩頸背腰痠痛、濕重困倦 |
| **畫面** | 多個玻璃拔罐罐排列 + 牛角刮痧板；背景人體模型背線（著衣示意） |

**Prompt：**
```
Cinematic macro photograph for TCM cupping and gua sha page. 3:2 horizontal, 1200x800.

Scene: Practitioner's hands in dark green robe arranging multiple clear glass cupping jars in a row on dark wooden table, beside polished buffalo-horn gua sha tool and cotton ball with massage oil. Background: soft-focus acupuncture mannequin showing upper back meridian lines — clothed demonstration model only, no real patient skin marks, no circular bruise close-up.

Apothecary cabinet blurred behind. Soft side-light, left negative space darker. Mood: fascia release, circulation boost, professional demonstration — NOT shocking cupping marks, NOT bare back with redness.

No face. No text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

**生成後接入 HTML（每頁已預留）：**
```html
<section class="df-section df-section--visual paper-grain">
  <div class="df-container">
    <figure class="df-page-visual reveal">
      <img src="/images/services/[name]-hero.png"
           alt="[alt 文字]"
           width="1200" height="800"
           loading="lazy" decoding="async">
    </figure>
  </div>
</section>
```

**批次腳本**：`python scripts/organize-generated-images.py` → `python scripts/batch-wire-images.py`

---

### F. 常見症狀頁分欄圖（6 張 — 合規優先）

| ID | 頁面 | 建議檔名 | 說明 |
|----|------|----------|------|
| IMG-028 | `/conditions/eczema.html` | `conditions/eczema.webp` | 同 IMG-009 風格 |
| IMG-029 | `/conditions/acne.html` | `conditions/acne.png` | **v2 見下** — 暗瘡症狀頁 Hero 橫幅（非 blog 共用） |

#### IMG-029 · 暗瘡橫幅 — v2.1（對齊 `.df-page-visual` 21:9）

> **適用頁面**：`/conditions/acne.html`、`/blog/acne-face-zones.html`（及共用 `blog-acne.png` 的 `.df-page-visual` 橫幅）  
> **CSS 實際顯示**：桌面 **21:9**（`max-height: 440px` ≈ 1200×514）｜手機 **3:2**（`object-fit: cover` 裁左右）  
> **生成比例**：**21:9 · 1920×823**（勿再用 3:2，否則桌面上下被裁切）  
> **檔案**：`conditions/acne.png`（症狀頁）、`blog-acne.png`（專欄 Hero；列表卡片可另裁 16:10）  
> **alt（症狀頁）**：`暗瘡中醫面部分區與臟腑調理`  
> **alt（專欄頁）**：`暗瘡位置與臟腑關係`

| 裁切安全區 | 指引 |
|------------|------|
| **桌面 21:9** | 主體（側脸 + 金線）放在**畫面水平中央偏右 45–65%**；左 30% 留暗部負空間 |
| **手機 3:2** | 會裁切**左右兩側** → 臉部與金線須在**中央 50%** 內，勿貼邊 |
| **垂直** | 眼鼻位置置於**垂直中線**附近，避免貼頂／貼底 |

| 頁面訊息 | 畫面對應 |
|----------|----------|
| 肺胃蘊熱、痰濕、肝鬱致瘡 | 健康膚質 + **極淡**面部分區／經絡線（意象，非標籤圖） |
| 額·鼻·頰·下巴分區辨證 | 3/4 側面輪廓，中央構圖 |
| 由內而外、減少復發 | 竹葉／綠植虛化背景，**恢復期理想肌** |
| 中環高端中醫 | cream + pine green 色調，非美容院霓虹 |

**禁止（合規）**：暗瘡特寫、before-after、擠壓、臨床標籤圖、文字水印

**Negative prompt：**
```
no acne lesions, no pimples close-up, no pus, no before-after, no squeezing skin, no clinical dermatology chart labels, no text, no watermark, no neon spa lighting
```

**Prompt（21:9 橫幅 · `conditions/acne.png` / `blog-acne.png`）：**
```
Cinematic ultra-wide wellness photograph for TCM acne treatment page banner. 21:9 horizontal, 1920x823 pixels — matches .df-page-visual desktop strip (NOT 3:2, NOT square).

Scene: Young East Asian woman in soft three-quarter profile, eyes gently closed, serene expression. Natural healthy clear skin — post-recovery glow, NOT showing active acne, pimples, redness or blemishes. Her hand lightly touches jawline suggesting hormonal acne zone awareness without pointing at lesions.

Overlay: very subtle thin golden aesthetic lines tracing TCM facial zone meridians on cheek, forehead and chin — elegant minimal light calligraphy, NOT a labeled medical diagram, NOT glowing sci-fi UI.

Environment: soft out-of-focus bamboo leaves and warm green foliage across the wide panoramic background; dappled natural sunlight from right, cream and pine-green color grading. LEFT 30–35% of frame darker and softer — empty negative space for Chinese headline / watermark, no subject in far left zone.

Composition for responsive crop: place face and golden lines within CENTRAL 50% width and CENTRAL 70% height (mobile ≤767px switches container to 3:2 and crops left/right edges). Subject may sit slightly right of center on desktop, but face must not touch frame edges. Shallow depth of field, photorealistic.

Mood: inner balance restored, holistic skin healing from within, calm confidence — premium Central Hong Kong TCM clinic. No full front mugshot. No makeup ad. No text in image.

Negative: no acne lesions, no pimples close-up, no pus, no before-after, no squeezing skin, no clinical chart labels, no text, no watermark, no 3:2 portrait framing

GLOBAL STYLE — Oakville Wellness 頤安本草: Premium Hong Kong Central TCM clinic aesthetic. Warm cream paper tone (#F7F2E7), deep pine green accents (#2A463C), subtle cinnabar red (#A23A2E) and muted ochre gold (#AE8A47). Zen-like, private, calm, high-end editorial photography. Soft natural window light, shallow depth of field. Photorealistic, warm desaturated greens, ivory highlights.
```

**接入 HTML（更新 width/height 為 21:9）：**
```html
<img src="/images/conditions/acne.png"
     alt="暗瘡中醫面部分區與臟腑調理"
     width="1920" height="823" loading="lazy" decoding="async">
```

**與列表卡片分工：**
- `.df-page-visual` 橫幅 → **21:9 原圖**（本 Prompt）
- `.df-feed-card` 卡片 → 同圖**中央裁切 16:10**（1600×1000）或獨立生成

---
| IMG-030 | `/conditions/insomnia.html` | `conditions/insomnia.webp` | 同 IMG-011 風格 |
| IMG-031 | `/conditions/fertility.html` | `conditions/fertility.webp` | 同 IMG-012 風格 |
| IMG-032 | `/conditions/neck-pain.html` | `conditions/neck-pain.webp` | 辦公族頸肩按摩／熱敷意象，不誇張痛苦表情 |
| IMG-033 | `/conditions/sciatica.html` | `conditions/sciatica.webp` | 腰臀拉伸運動墊上動作，柔和運動復健感 |

**頸痛 Prompt（IMG-032）：**
```
Office worker stretching neck gently at desk break, smart casual, Central HK office blurred background. Relief and self-care mood, not pain grimace. 3:2 horizontal for text column layout.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

**坐骨神經痛 Prompt（IMG-033）：**
```
Gentle physiotherapy stretch on yoga mat for lower back and hip, athletic wear, bright clinic exercise corner. Empowering recovery mood. 3:2.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

### G. 流程頁 `/process.html` — 六步圖（P3）

> **頁面現況**：`process.html` 的 `.df-step-list` 已接入 `.df-step__media`（`images/process/step-01 … step-06.png`）。以下 prompt **對齊 2026 年真實診所實拍風格**（`shop-3`／`shop-8`／`doctor-2`／`shop-9`），取代早期偏「雜誌編輯／米紙色調」方向。

#### 真實診所攝影風格基準（必讀）

| 參考檔 | 場景 | 風格關鍵字 |
|--------|------|------------|
| `shop-3.jpeg` | 候診區 | 白牆、掛牆電視、矮木長椅＋白坐墊、綠植、明亮均光 |
| `shop-8.jpeg` | 接待處 | 弧形白櫃台、直紋木條＋底部暖黃燈帶、綠白濃縮顆粒藥瓶牆 |
| `doctor-2.jpeg` | 診症室 | 淺色木紋書桌、木製脈枕、灰網布辦公椅、平板支架、白牆 |
| `shop-9.jpeg` | 針灸室 | 白床單治療床、TDP 紅外燈、米色簾、簡潔醫療空間 |

**舊方向（避免）** → **新方向（採用）**：米紙色重度調色／淺景深 → 白牆＋自然木色、全畫面清晰實拍；居家沙發預約 → 候診區內預約；深色老藥行 → 現代玻璃層架顆粒瓶（同 `shop-8`）。

**流程步驟通用 Style Block**（六張圖末尾必附，取代舊 GLOBAL STYLE）：

```
REAL CLINIC PHOTO STYLE — Oakville Wellness 頤安本草 (match shop-3, shop-8, doctor-2, shop-9):
Photorealistic interior photo of a modern Hong Kong Central TCM clinic. Bright, clean, evenly lit (ceiling track lights + soft window fill), NOT moody editorial stock. White and off-white walls, light natural wood grain furniture, grey mesh ergonomic chairs. Minimal clutter, professional medical environment. Sharp focus across scene (minimal bokeh). Slight wide-angle like a real clinic tour photo. No watermarks, no burned-in Chinese text overlays, no readable text on screens, forms, medicine labels, or name badges. No dark traditional apothecary aesthetic. 3:2 horizontal, 1200×800px.
```

#### 步驟 ↔ 頁面 ↔ 檔案對照總表

| ID | 步驟 | `process.html` 對應 | 頁面標題（`.df-step__title`） | 建議檔名 | 比例 |
|----|------|---------------------|-------------------------------|----------|------|
| IMG-034 | ① | 第 1 個 `.df-step` | WhatsApp / 電話預約 | `process/step-01-booking.png` | **3:2** 1200×800 |
| IMG-035 | ② | 第 2 個 `.df-step` | 到達診所 · 登記 | `process/step-02-checkin.png` | 3:2 |
| IMG-036 | ③ | 第 3 個 `.df-step` | 望聞問切 · 詳細問診 | `process/step-03-diagnosis.png` | 3:2 |
| IMG-037 | ④ | 第 4 個 `.df-step` | 制定個人化治療方案 | `process/step-04-plan.png` | 3:2 |
| IMG-038 | ⑤ | 第 5 個 `.df-step` | 治療 · 配藥 | `process/step-05-treatment.png` | 3:2 |
| IMG-039 | ⑥ | 第 6 個 `.df-step--soft` | 定期複診 · 調整方案 | `process/step-06-followup.png` | 3:2 |

**接入 HTML 範例**（生成圖片後，於每步 `<div>` 內、`.df-step__label` 之前插入）：

```html
<!-- 例：第一步 -->
<div class="df-step reveal">
  <span class="df-step__no">1</span>
  <div>
    <figure class="df-step__media">
      <img src="images/process/step-01-booking.png"
           alt="透過 WhatsApp 或電話預約伍厚臻中醫師診症"
           width="1200" height="800" loading="lazy" decoding="async">
    </figure>
    <div class="df-step__label">第一步</div>
    <div class="df-step__title">WhatsApp / 電話預約</div>
    <p class="df-step__text">…</p>
  </div>
</div>
```

**版面建議**：桌面版可改為 `.df-step` 左右交替（奇數步圖在右、偶數步圖在左）；手機版圖片置於標題上方全寬。CSS 可新增 `.df-step__media { border-radius: 6px; overflow: hidden; margin-bottom: 16px; }`。

**拍攝／生成共通規則**

| 規則 | 說明 |
|------|------|
| 人物 | 患者 **不露正臉**（背影、手部、剪影）；醫師可露側面或手部，避免與 Hero／About 正臉肖像重複 |
| 文字 | 畫面內 **不可有清晰可讀** 的電話、姓名、病歷、WhatsApp 對話 |
| 色調 | 對齊實拍：白牆、淺木色、接待處暖黃底光、藥瓶綠白標籤（模糊） |
| 用途 | 流程說明 — 與 `clinic.html` 相簿實拍 **同一間診所** |

**現有素材墊圖參考**（img2img 或裁切測構圖）

| 步驟 | 對齊實拍 | 備註 |
|------|----------|------|
| ① 預約 | `shop-3.jpeg` | 候診區長椅＋手機 |
| ② 登記 | `shop-8.jpeg` | 接待櫃台＋填表手部 |
| ③ 四診 | `doctor-2.jpeg` | 脈枕＋書桌＋醫師雙手 |
| ④ 方案 | `doctor-2.jpeg` | 書桌對坐／平板說明 |
| ⑤ 治療 | `shop-9.jpeg` + `shop-8.jpeg` | 針灸床；配藥可虛化藥瓶牆 |
| ⑥ 複診 | `doctor-2.jpeg` / `shop-3.jpeg` | 再次把脈或候診區 |

---

#### IMG-034 · 第一步：WhatsApp / 電話預約

| 項目 | 內容 |
|------|------|
| **頁面文案** | 「傳送 WhatsApp 訊息或致電，告知希望診症的問題及偏好日期時間。我們會在一個工作日內確認預約…」 |
| **畫面核心** | 患者 **手持手機** 正在聯絡診所；螢幕為 WhatsApp 綠色界面但 **內容完全模糊／馬賽克** |
| **場景** | **候診區**（對齊 `shop-3.jpeg`）：白牆、木長椅白坐墊、掛牆電視、綠植；患者坐候診椅用手機 |
| **情緒** | 輕鬆、方便 — 「在診所候診時也能預約／確認」 |
| **避免** | 居家沙發、米紙色調、清晰對話截圖、真實電話號碼 |
| **墊圖** | `shop-3.jpeg`（img2img 或構圖參考） |

**Prompt：**
```
Photorealistic clinic interior photo, patient journey STEP 1 — booking via WhatsApp or phone. Modern TCM clinic waiting area matching shop-3 reference: white walls, low wooden bench with white seat cushions, wall-mounted TV blurred in background, small potted plant, bright even ceiling lighting. Adult patient seated on waiting bench, hands holding smartphone with blurred green messaging app (WhatsApp-like, NO readable text, NO phone numbers). Casual business attire, relaxed posture. Wide-angle clinic tour composition, sharp focus throughout. NOT home sofa, NOT editorial cream paper grading.

REAL CLINIC PHOTO STYLE — Oakville Wellness 頤安本草 (match shop-3, shop-8, doctor-2, shop-9):
Photorealistic interior photo of a modern Hong Kong Central TCM clinic. Bright, clean, evenly lit (ceiling track lights + soft window fill), NOT moody editorial stock. White and off-white walls, light natural wood grain furniture, grey mesh ergonomic chairs. Minimal clutter, professional medical environment. Sharp focus across scene (minimal bokeh). Slight wide-angle like a real clinic tour photo. No watermarks, no burned-in Chinese text overlays, no readable text on screens, forms, medicine labels, or name badges. No dark traditional apothecary aesthetic. 3:2 horizontal, 1200×800px.
```

---

#### IMG-035 · 第二步：到達診所 · 登記

| 項目 | 內容 |
|------|------|
| **頁面文案** | 「請提早 5 分鐘到達填寫基本健康資料表。如有西醫報告、用藥紀錄或化驗結果，請一併攜帶…」 |
| **畫面核心** | **接待處** — 患者背影或手部正在填寫健康表格；桌上可有 clipboard、筆 |
| **場景** | 接待處（對齊 `shop-8.jpeg`）：弧形白櫃台、直紋木條＋底部暖黃燈帶、背景綠白濃縮顆粒藥瓶玻璃牆 |
| **情緒** | 整潔、專業 — 「到了就知道怎麼做」 |
| **避免** | 深色老藥櫃、表格可辨識個人資料、患者正臉 |
| **墊圖** | `shop-8.jpeg` |

**Prompt：**
```
Photorealistic clinic interior photo, patient journey STEP 2 — arrival and check-in. Reception area matching shop-8 reference: curved white reception counter with vertical light wood slat front panel and warm yellow LED strip along base, glass shelving wall of green-and-white concentrated herbal granule bottles softly blurred behind desk. Foreground: patient seen from behind (no face), hands filling health intake form on clipboard with pen. Optional closed folder for medical reports (text illegible). Bright even lighting, wide-angle real clinic photo. NOT dark wooden apothecary drawers, NOT cream paper editorial grading.

REAL CLINIC PHOTO STYLE — Oakville Wellness 頤安本草 (match shop-3, shop-8, doctor-2, shop-9):
Photorealistic interior photo of a modern Hong Kong Central TCM clinic. Bright, clean, evenly lit (ceiling track lights + soft window fill), NOT moody editorial stock. White and off-white walls, light natural wood grain furniture, grey mesh ergonomic chairs. Minimal clutter, professional medical environment. Sharp focus across scene (minimal bokeh). Slight wide-angle like a real clinic tour photo. No watermarks, no burned-in Chinese text overlays, no readable text on screens, forms, medicine labels, or name badges. No dark traditional apothecary aesthetic. 3:2 horizontal, 1200×800px.
```

---

#### IMG-036 · 第三步：望聞問切 · 詳細問診

| 項目 | 內容 |
|------|------|
| **頁面文案** | 「伍醫師以傳統四診法（望、聞、問、切）進行全面評估：觀察面色舌苔、聆聽聲音氣息、詳細詢問症狀病史、把脈…」 |
| **畫面核心** | **四診元素同框**：脈枕上的手腕、舌診燈（舌未露出／僅見燈具）、診桌、經典醫書 |
| **人物** | 醫師 **只見雙手** 把脈；患者手腕入鏡，**不露臉** |
| **場景** | 診症室（對齊 `doctor-2.jpeg`）：淺色木紋書桌、木製脈枕、灰網布椅、平板支架、白牆 |
| **情緒** | 專注、細緻 — 「首診問診時間充足」 |
| **避免** | 誇張舌頭特寫、米紙色調、西醫聽診器 |
| **墊圖** | `doctor-2.jpeg` |

**Prompt：**
```
Photorealistic consultation room photo, patient journey STEP 3 — four diagnostic methods (look, listen, ask, pulse). Desk scene matching doctor-2 reference: light natural wood grain desk, wooden pulse pillow with patient wrist, physician hands taking pulse (faces out of frame), grey mesh ergonomic office chair edge visible, tablet on stand on desk, white walls, bright even lighting. Optional tongue diagnosis lamp on desk (light on, tongue NOT shown). Sharp focus, real clinic documentation style. NOT scholarly cream-toned editorial, NOT stacked antique TCM books as main prop.

REAL CLINIC PHOTO STYLE — Oakville Wellness 頤安本草 (match shop-3, shop-8, doctor-2, shop-9):
Photorealistic interior photo of a modern Hong Kong Central TCM clinic. Bright, clean, evenly lit (ceiling track lights + soft window fill), NOT moody editorial stock. White and off-white walls, light natural wood grain furniture, grey mesh ergonomic chairs. Minimal clutter, professional medical environment. Sharp focus across scene (minimal bokeh). Slight wide-angle like a real clinic tour photo. No watermarks, no burned-in Chinese text overlays, no readable text on screens, forms, medicine labels, or name badges. No dark traditional apothecary aesthetic. 3:2 horizontal, 1200×800px.
```

---

#### IMG-037 · 第四步：制定個人化治療方案

| 項目 | 內容 |
|------|------|
| **頁面文案** | 「根據辨證結果，伍醫師清晰說明您的體質問題及治療方向，選擇最合適的治療方式（針灸、中藥、推拿或組合），並告知預期療程次數…」 |
| **畫面核心** | 醫師與患者 **對坐交談** — 側面或過肩構圖，醫師手勢說明，患者聽講（**側臉或剪影**） |
| **場景** | 同一診症室（`doctor-2.jpeg`）：醫師與患者對坐於木桌兩側，可見平板或空白紙張 |
| **情緒** | 溝通、透明 — 「方案會先講清楚」 |
| **避免** | 醫師正臉（與 Hero 重複）、可讀處方文字 |
| **墊圖** | `doctor-2.jpeg`（拉遠構圖） |

**Prompt：**
```
Photorealistic consultation room photo, patient journey STEP 4 — personalized treatment plan discussion. Same room as doctor-2 reference: light wood desk, grey mesh chairs, white walls, bright even lighting. Physician and patient seated across desk in side profile or over-shoulder view (patient face hidden, physician profile only, no front-facing portrait). Physician gesturing calmly toward tablet or blank paper on desk (no readable text). Collaborative, transparent atmosphere. Wide-angle real clinic photo, sharp focus. NOT cream editorial mood lighting.

REAL CLINIC PHOTO STYLE — Oakville Wellness 頤安本草 (match shop-3, shop-8, doctor-2, shop-9):
Photorealistic interior photo of a modern Hong Kong Central TCM clinic. Bright, clean, evenly lit (ceiling track lights + soft window fill), NOT moody editorial stock. White and off-white walls, light natural wood grain furniture, grey mesh ergonomic chairs. Minimal clutter, professional medical environment. Sharp focus across scene (minimal bokeh). Slight wide-angle like a real clinic tour photo. No watermarks, no burned-in Chinese text overlays, no readable text on screens, forms, medicine labels, or name badges. No dark traditional apothecary aesthetic. 3:2 horizontal, 1200×800px.
```

---

#### IMG-038 · 第五步：治療 · 配藥

| 項目 | 內容 |
|------|------|
| **頁面文案** | 「進行針灸或推拿治療（約 20–40 分鐘），並按需開立中藥處方。醫師會詳細說明中藥的煎煮方法、服用時間及注意事項。」 |
| **畫面核心** | **雙元素構圖**（左／右或前／後景）：① 針灸治療床 + 毫針托盤 ② 中藥房配藥／免煎顆粒包裝袋 |
| **人物** | 患者蓋毛巾躺臥，**只見肩頸以上被覆蓋**；或完全無人，純空間 |
| **場景** | 針灸室（`shop-9.jpeg`）＋ 接待處藥瓶牆（`shop-8.jpeg` 背景虛化） |
| **情緒** | 專業、衛生 — 「診完即治療、即取藥」 |
| **避免** | 深色木藥櫃、裸露皮膚、可讀藥名 |
| **墊圖** | `shop-9.jpeg` + `shop-8.jpeg` |

**Prompt：**
```
Photorealistic clinic photo, patient journey STEP 5 — treatment and herbal dispensing. Primary scene matching shop-9 reference: white-sheeted treatment bed, beige privacy curtain, TDP infrared lamp on stand, sterile acupuncture needle tray on side table, patient covered with white towel (shoulder only, no exposed skin). Secondary element: blurred background of shop-8 style glass shelving with green-white granule bottles, staff hands placing medicine packet into paper bag (labels unreadable). Bright even medical lighting, wide-angle real clinic tour. NOT dark wooden drawer apothecary, NOT cream editorial split collage.

REAL CLINIC PHOTO STYLE — Oakville Wellness 頤安本草 (match shop-3, shop-8, doctor-2, shop-9):
Photorealistic interior photo of a modern Hong Kong Central TCM clinic. Bright, clean, evenly lit (ceiling track lights + soft window fill), NOT moody editorial stock. White and off-white walls, light natural wood grain furniture, grey mesh ergonomic chairs. Minimal clutter, professional medical environment. Sharp focus across scene (minimal bokeh). Slight wide-angle like a real clinic tour photo. No watermarks, no burned-in Chinese text overlays, no readable text on screens, forms, medicine labels, or name badges. No dark traditional apothecary aesthetic. 3:2 horizontal, 1200×800px.
```

---

#### IMG-039 · 第六步：定期複診 · 調整方案

| 項目 | 內容 |
|------|------|
| **頁面文案** | 「複診時伍醫師評估治療進展，按需調整針灸穴位或藥方配比，直至健康問題根本改善。複診頻率因病情而異，一般建議每週 1–2 次。」 |
| **畫面核心** | **複診預約** 意象：桌曆／月曆上標記日期（日期不可讀或抽象）、手機再次預約（模糊）、或診間 **第二次把脈** 的延續感 |
| **場景** | 診症室再次把脈（`doctor-2.jpeg`）或候診區（`shop-3.jpeg`） |
| **情緒** | 安心、持續跟進 — 呼應 `.df-step--soft` |
| **避免** | Before/After、「已治癒」宣傳、可讀日曆日期 |
| **墊圖** | `doctor-2.jpeg` 或 `shop-3.jpeg` |

**Prompt：**
```
Photorealistic clinic photo, patient journey STEP 6 — follow-up and plan adjustment. Continuity of care scene: same doctor-2 consultation desk, physician hands re-taking pulse on return visit (faces out of frame), OR patient seated in shop-3 style waiting area with blurred smartphone scheduling next appointment. Closed patient chart folder on desk optional. Ongoing support mood, not cure marketing. Bright white walls, light wood furniture, even clinic lighting. NOT wall calendar with readable dates, NOT cream ochre editorial tones.

REAL CLINIC PHOTO STYLE — Oakville Wellness 頤安本草 (match shop-3, shop-8, doctor-2, shop-9):
Photorealistic interior photo of a modern Hong Kong Central TCM clinic. Bright, clean, evenly lit (ceiling track lights + soft window fill), NOT moody editorial stock. White and off-white walls, light natural wood grain furniture, grey mesh ergonomic chairs. Minimal clutter, professional medical environment. Sharp focus across scene (minimal bokeh). Slight wide-angle like a real clinic tour photo. No watermarks, no burned-in Chinese text overlays, no readable text on screens, forms, medicine labels, or name badges. No dark traditional apothecary aesthetic. 3:2 horizontal, 1200×800px.
```

---

**批次生成快速參考**（複製到 AI 工具時，替換 `[N]` 與 `[STEP SCENE]`）：

| 步驟 | 英文場景一句（貼入 `[STEP SCENE]`） | 墊圖 |
|------|-------------------------------------|------|
| 1 | waiting bench in white-wall clinic, hands holding blurred WhatsApp phone | `shop-3.jpeg` |
| 2 | curved white reception counter, wood slat + yellow LED base, granule bottle wall, patient filling form from behind | `shop-8.jpeg` |
| 3 | light wood desk, pulse pillow, physician hands, tablet stand, white walls | `doctor-2.jpeg` |
| 4 | same consultation desk, side-profile discussion with tablet | `doctor-2.jpeg` |
| 5 | white treatment bed, TDP lamp, needle tray, blurred granule bottle wall packing | `shop-9.jpeg` + `shop-8.jpeg` |
| 6 | return pulse check at same desk OR waiting area re-booking on phone | `doctor-2.jpeg` / `shop-3.jpeg` |

**流程步驟通用 Prompt 模板**（精簡版）：
```
Photorealistic TCM clinic patient journey step [N]: [STEP SCENE]. Match real Oakville clinic photos (shop-3, shop-8, doctor-2, shop-9): white walls, light wood, bright even lighting, sharp focus, wide-angle clinic tour. No readable text. No patient faces. No cream editorial grading. 3:2 horizontal 1200×800.
```

---

### H. 其他頁面建議

| ID | 頁面 | 類型 | 說明 | 建議檔名 |
|----|------|------|------|----------|
| IMG-040 | `/services.html` | 橫幅 | 四科矇太奇：痛症／皮膚／婦科／內科 四格合成 | `services/overview-banner.webp` |
| IMG-041 | `/contact.html` | 地圖+實景 | 大廈入口 + 樓層指示 | `clinic/contact-map-hero.webp` |
| IMG-042 | `/about/central-hk.html` | 街景 | 中環天際線 + 皇后大道中步行視角 | `about/central-location.webp` |
| IMG-043 | `/faq.html` | 信任圖 | 診所書架 + 證書框（可打馬賽克） | `about/credentials-wall.webp` |
| IMG-044 | `/about.html` | 執業照／證書 | 003769 註冊證書特寫（可後期模糊編號） | `physician/credentials.webp` |

**IMG-040 Prompt：**
```
Four-panel collage banner for TCM specialties: pain acupuncture, herbal skin care, women's wellness tea, internal medicine pulse. Unified cream background grid, editorial consistency. 21:9.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

## 五、OG 社交分享圖（P3）

> **用途**：當用戶在 **WhatsApp、Facebook、LinkedIn、iMessage、Threads** 等分享網站連結時，平台讀取 `<meta property="og:image">` 顯示的 **1200×630 預覽大圖**（連結卡片上方那張圖）。  
> **現況**：全站 30+ 頁幾乎共用 `images/doctor.jpg`（`clinic.html` 用 `shop-8.jpeg`），分享時無法區分頁面主題。  
> **目標**：每類重要頁面有專屬 OG 圖，提升辨識度與點擊率。

### OG 圖 vs 網頁內圖

| | 網頁 Hero／Gallery | OG 分享圖 |
|---|---|---|
| 顯示位置 | 網站版面內 | 社交平台連結預覽，**訪客進站前可見** |
| 比例 | 4:5、3:2、21:9 等 | 固定 **1.91:1 → 1200×630 px** |
| 文字 | 通常由 HTML 排版 | 可留空靠 `og:title`，或 **後期在 Figma 烘焙標題** |
| 格式 | WebP 優先 | **JPG**（平台兼容性最佳） |

### 統一版面模板（所有 OG 必遵）

```
┌──────────────────────────── 1200 × 630 px ────────────────────────────┐
│                                                                         │
│  左區 55%（≈660px）              │  右區 45%（≈540px）                 │
│  底色 #F7F2E7 米紙               │  主視覺照片／插畫                    │
│  【留白】供後期疊加標題           │  裁切安全區：主體置中偏右             │
│  或依賴平台顯示 og:title         │                                     │
│                                  │  右下角：紅色印章 logo（頤安本草）     │
├──────────────────────────────────┴─────────────────────────────────────┤
│  底欄 48–60px 高 · 底色 #2A463C pine · 左：OAKVILLE WELLNESS · 右：中環   │
└─────────────────────────────────────────────────────────────────────────┘
```

**安全區注意**（WhatsApp 會裁切四邊約 5%）：
- 主體、logo、底欄文字距離邊緣至少 **40px**
- **不要在 AI 生成階段寫中文標題**（除非確定後期不再改字）；標題建議 Figma 後製，字體 Noto Serif TC

**接入 HTML 範例**（以痛症專科為例）：

```html
<meta property="og:image" content="https://oakvilles.com/images/og/og-pain.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="伍厚臻中醫師 · 痛症治療 · 頤安本草中環診所">
```

---

### 全站 OG 對照總表

| ID | 檔名 | 適用頁面 | 主視覺來源 |
|----|------|----------|------------|
| **IMG-045** | `og/og-default.jpg` | **全站 fallback**：about、faq、contact、process、services 總覽、news、未列明頁 | 醫師肖像 + 中環 |
| **IMG-046** | `og/og-home.jpg` | `index.html` | 品牌水印 + 診所空間 |
| **IMG-047** | `og/og-pain.jpg` | `services/pain.html` | 同 IMG-020 痛症 |
| **IMG-048** | `og/og-skin.jpg` | `services/skin.html` | 同 IMG-021 皮膚 |
| **IMG-049** | `og/og-internal.jpg` | `services/internal.html` | 同 IMG-022 內科 |
| **IMG-050** | `og/og-gyn.jpg` | `services/gynaecology.html` | 同 IMG-023 婦科 |
| **IMG-051** | `og/og-acupuncture.jpg` | `services/acupuncture.html` | 同 IMG-024 針灸 |
| **IMG-052** | `og/og-herbs.jpg` | `services/herbs.html` | 同 IMG-025 中藥 |
| **IMG-053** | `og/og-moxa.jpg` | `services/moxibustion.html` | 同 IMG-026 艾灸 |
| **IMG-054** | `og/og-cupping.jpg` | `services/cupping.html` | 同 IMG-027 拔罐 |
| **IMG-055** | `og/og-eczema.jpg` | `conditions/eczema.html`、`blog/eczema-from-within.html` | 同 IMG-009 祛濕飲食 |
| **IMG-056** | `og/og-acne.jpg` | `conditions/acne.html`、`blog/acne-face-zones.html` | 同 IMG-010 面部分區 |
| **IMG-057** | `og/og-insomnia.jpg` | `conditions/insomnia.html`、`blog/insomnia-tcm-guide.html` | 同 IMG-011 安神睡前 |
| **IMG-058** | `og/og-fertility.jpg` | `conditions/fertility.html`、`blog/fertility-stress.html` | 同 IMG-012 備孕調理 |
| **IMG-059** | `og/og-neck-pain.jpg` | `conditions/neck-pain.html` | 同 IMG-032 頸肩舒緩 |
| **IMG-060** | `og/og-sciatica.jpg` | `conditions/sciatica.html` | 同 IMG-033 腰臀拉伸 |
| **IMG-061** | `og/og-clinic.jpg` | `clinic.html` | 同 IMG-006 接待處 |
| **IMG-062** | `og/og-about.jpg` | `about.html` | 同 IMG-002 醫師側像 |
| **IMG-063** | `og/og-central.jpg` | `about/central-hk.html` | 同 IMG-042 中環街景 |
| **IMG-064** | `og/og-blog.jpg` | `blog/index.html` | 四格專欄矇太奇 |
| **IMG-065** | `og/og-process.jpg` | `process.html` | 六步流程實拍風格矇太奇（對齊 IMG-034–039／`shop-3` `shop-8` `doctor-2` `shop-9`） |

> **製作捷徑**：若已生成 IMG-020–033 的 3:2 或 21:9 主圖，可在 Figma 將右 45% 裁入主視覺、左 55% 填 cream 底，加底欄與 logo，比從零生成更快且一致。  
> **流程頁專用**：若已依 § G 生成 `process/step-01 … step-06.png`，可將六張 **3:2 圖縮為 2×3 格** 拼入右區 540×630，再套 OG 左區 cream + 底欄，風格最一致。

---

### OG 通用 Prompt 模板

```
Social media Open Graph banner, exact 1200x630 pixels, 1.91:1 landscape.
Layout: left 55% flat warm cream paper (#F7F2E7) completely empty for post-production Chinese title. Right 45%: [HERO VISUAL]. Bottom full-width bar 50px pine green (#2A463C). Small red square seal logo (traditional Chinese medicine clinic mark) at bottom-right of visual area. Premium Hong Kong TCM clinic branding. NO readable text, NO watermarks, NO URLs in image.

GLOBAL STYLE — Oakville Wellness 頤安本草:
Premium Hong Kong Central TCM clinic aesthetic. Warm cream paper tone (#F7F2E7), deep pine green accents (#2A463C), subtle cinnabar red (#A23A2E) and muted ochre gold (#AE8A47). Zen-like, private, calm, high-end editorial photography — NOT generic hospital stock. Soft natural window light, gentle shadows, shallow depth of field. Color grading: warm, desaturated greens, ivory highlights. Mood: 禪意、私密、專業、中環高端商務人士適配. Photorealistic.
```

---

#### IMG-045 · 全站預設 OG（fallback）

| 項目 | 內容 |
|------|------|
| **適用** | `about.html`、`faq.html`、`contact.html`、`process.html`、`services.html`、`news/*` 及所有未指定 OG 的頁面 |
| **右區主視覺** | 伍厚臻醫師半身肖像（正裝、沉穩），背景虛化診所藥櫃；可見中環都市窗景一角 |
| **後期標題建議** | 「伍厚臻中醫師 · 頤安本草」／「香港中環註冊中醫」 |
| **避免** | 與 Hero 完全同一裁切（可略不同角度或縮放） |

**Prompt：**
```
Open Graph banner 1200x630. Left 55% empty cream paper #F7F2E7. Right 45%: editorial portrait of senior Hong Kong TCM physician in dark suit and glasses, calm confident expression, three-quarter view. Background: softly blurred traditional medicine cabinet and Central HK window light. Bottom pine green bar. Red seal logo bottom-right of photo area. Default clinic branding image for social link previews. NO text in image.

GLOBAL STYLE — Oakville Wellness 頤安本草:
Premium Hong Kong Central TCM clinic aesthetic. Warm cream paper tone (#F7F2E7), deep pine green accents (#2A463C), subtle cinnabar red (#A23A2E) and muted ochre gold (#AE8A47). Zen-like, private, calm, high-end editorial photography — NOT generic hospital stock. Soft natural window light, gentle shadows, shallow depth of field. Color grading: warm, desaturated greens, ivory highlights. Mood: 禪意、私密、專業、中環高端商務人士適配. Photorealistic.
```

---

#### IMG-046 · 首頁 OG

| 項目 | 內容 |
|------|------|
| **適用** | `index.html` |
| **右區主視覺** | 診所接待處背光「頤安本草」招牌 + 藥櫃牆（參考 `shop-8.jpeg`）；或大型浮水印「頤安本草」書法疊於診間 |
| **後期標題建議** | 「以現代之學 · 啟岐黃之力」 |
| **情緒** | 品牌第一印象，偏 **空間＋品牌** 而非醫師正臉（與 Hero 去重複策略一致） |

**Prompt：**
```
Open Graph banner 1200x630. Left 55% empty cream paper. Right 45%: premium TCM clinic reception with backlit clinic name sign, wooden herbal medicine drawer wall, warm indirect lighting. Optional subtle vertical watermark-style calligraphy strokes in background (no readable characters). Zen private Central Hong Kong clinic atmosphere. Bottom pine bar, red seal logo. Homepage social share image. NO readable text.

GLOBAL STYLE — Oakville Wellness 頤安本草:
Premium Hong Kong Central TCM clinic aesthetic. Warm cream paper tone (#F7F2E7), deep pine green accents (#2A463C), subtle cinnabar red (#A23A2E) and muted ochre gold (#AE8A47). Zen-like, private, calm, high-end editorial photography — NOT generic hospital stock. Soft natural window light, gentle shadows, shallow depth of field. Color grading: warm, desaturated greens, ivory highlights. Mood: 禪意、私密、專業、中環高端商務人士適配. Photorealistic.
```

---

### 專科頁 OG（IMG-047–054）

> 右區主視覺 = 對應 **§ E 專科 Hero** 裁切至 540×630；以下為從零生成時的完整 Prompt。

#### IMG-047 · 痛症治療 → `og/og-pain.jpg`

**適用**：`services/pain.html`  
**右區**：[HERO VISUAL] = acupuncture needles on shoulder through white towel, physician hands only, pain relief meridian treatment

**Prompt：**
```
Open Graph banner 1200x630. Left 55% empty cream paper. Right 45%: TCM pain treatment scene — acupuncture needles on shoulder meridian through white cloth, physician hands adjusting needle, patient face not visible. Clean treatment room, soft light. Bottom pine bar, red seal logo. NO text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block — see §二]
```

#### IMG-048 · 皮膚科 → `og/og-skin.jpg`

**適用**：`services/skin.html`  
**右區**：herbal roots flat lay plus pulse diagnosis hands in one frame, internal-external skin care metaphor

**Prompt：**
```
Open Graph banner 1200x630. Left 55% empty cream paper. Right 45%: TCM dermatology — artful herbal roots (goji, chrysanthemum) on cream ceramic plate beside wrist pulse diagnosis, internal conditioning for skin concept. Fresh clean mood. Bottom pine bar, red seal logo. NO text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

#### IMG-049 · 內科調理 → `og/og-internal.jpg`

**適用**：`services/internal.html`  
**右區**：classic pulse taking close-up, stacked TCM books, faint incense smoke

**Prompt：**
```
Open Graph banner 1200x630. Left 55% empty cream paper. Right 45%: TCM internal medicine — close-up pulse diagnosis on wooden pillow, classic medicine books, faint incense smoke, scholarly calm atmosphere. Bottom pine bar, red seal logo. NO text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

#### IMG-050 · 婦科調理 → `og/og-gyn.jpg`

**適用**：`services/gynaecology.html`  
**右區**：moxibustion warmer, warm herbal tea, soft blanket, woman's silhouette from behind

**Prompt：**
```
Open Graph banner 1200x630. Left 55% empty cream paper. Right 45%: TCM women's wellness — moxibustion box with gentle warmth glow, cup of red date tea, cream blanket, female patient silhouette from behind (no face). Nurturing private mood. Bottom pine bar, red seal logo. NO text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

#### IMG-051 · 針灸療法 → `og/og-acupuncture.jpg`

**適用**：`services/acupuncture.html`  
**右區**：sterile needle pack on bamboo tray, acupuncture point model side profile

**Prompt：**
```
Open Graph banner 1200x630. Left 55% empty cream paper. Right 45%: TCM acupuncture — opened sterile needle pack on bamboo tray, ear acupuncture model or meridian chart side view, clinical yet warm. Bottom pine bar, red seal logo. NO text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

#### IMG-052 · 中藥處方 → `og/og-herbs.jpg`

**適用**：`services/herbs.html`  
**右區**：當歸、黃芪、枸杞 flat lay, mortar and pestle, wooden drawers blurred behind

**Prompt：**
```
Open Graph banner 1200x630. Left 55% empty cream paper. Right 45%: TCM herbal prescription — flat lay of angelica, astragalus, goji berries on cream linen, stone mortar, blurred wooden dispensary drawers background. Bottom pine bar, red seal logo. NO text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

#### IMG-053 · 艾灸療法 → `og/og-moxa.jpg`

**適用**：`services/moxibustion.html`  
**右區**：glowing moxa stick ember, gentle smoke curl, moxa box

**Prompt：**
```
Open Graph banner 1200x630. Left 55% empty cream paper. Right 45%: TCM moxibustion — glowing moxa stick with gentle smoke curl, traditional moxa box on wooden table, warm amber light. Bottom pine bar, red seal logo. NO text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

#### IMG-054 · 拔罐刮痧 → `og/og-cupping.jpg`

**適用**：`services/cupping.html`  
**右區**：glass cupping cups lined on spine diagram mannequin or clothed back silhouette

**Prompt：**
```
Open Graph banner 1200x630. Left 55% empty cream paper. Right 45%: TCM cupping therapy — glass cupping jars arranged on acupuncture meridian mannequin or clothed upper back silhouette, no skin marks, educational premium mood. Bottom pine bar, red seal logo. NO text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

### 症狀頁 OG（IMG-055–060）

> 合規優先：**禁止** 皮膚病變特寫、誇大療效視覺。右區用「調理意象」而非「患處特寫」。

#### IMG-055 · 濕疹 → `og/og-eczema.jpg`

**適用**：`conditions/eczema.html`、`blog/eczema-from-within.html`  
**右區**：清熱祛濕飲食 still life（薏米、綠色時蔬、清湯）

**Prompt：**
```
Open Graph banner 1200x630. Left 55% empty cream paper. Right 45%: TCM eczema wellness editorial — bowl of light congee with mung beans and goji, cucumber and leafy greens on cream plate, steam rising, anti-inflammatory clean food mood. NO skin disease imagery. Bottom pine bar, red seal logo. NO text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

#### IMG-056 · 暗瘡 → `og/og-acne.jpg`

**適用**：`conditions/acne.html`、`blog/acne-face-zones.html`  
**右區**：健康膚質側面輪廓 + 極淡面部分區線（非臨床）

**Prompt：**
```
Open Graph banner 1200x630. Left 55% empty cream paper. Right 45%: TCM facial zone wellness — East Asian woman soft profile with natural healthy skin, very subtle aesthetic golden section lines on face (not clinical acne imagery). Bottom pine bar, red seal logo. NO text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

#### IMG-057 · 失眠 → `og/og-insomnia.jpg`

**適用**：`conditions/insomnia.html`、`blog/insomnia-tcm-guide.html`  
**右區**：床頭暖燈、酸棗仁茶、書本

**Prompt：**
```
Open Graph banner 1200x630. Left 55% empty cream paper. Right 45%: TCM insomnia wellness — bedside table with warm lamp, jujube seed tea cup, closed book, cream linen bedding, calming night mood without anxiety. Bottom pine bar, red seal logo. NO text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

#### IMG-058 · 備孕／難孕 → `og/og-fertility.jpg`

**適用**：`conditions/fertility.html`、`blog/fertility-stress.html`  
**右區**：暖色養血茶、艾灸暖感、柔和女性背影

**Prompt：**
```
Open Graph banner 1200x630. Left 55% empty cream paper. Right 45%: TCM fertility wellness — warm herbal tea with red dates and longan, soft moxibustion warmth glow, woman silhouette from behind in calm clinic, hopeful nurturing mood. Bottom pine bar, red seal logo. NO text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

#### IMG-059 · 頸痛 → `og/og-neck-pain.jpg`

**適用**：`conditions/neck-pain.html`  
**右區**：辦公族頸肩 gentle stretch，Central HK office blurred

**Prompt：**
```
Open Graph banner 1200x630. Left 55% empty cream paper. Right 45%: office worker gently stretching neck at desk break, smart casual, Central Hong Kong office blurred background, relief and self-care mood, NOT pain grimace. Bottom pine bar, red seal logo. NO text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

#### IMG-060 · 坐骨神經痛 → `og/og-sciatica.jpg`

**適用**：`conditions/sciatica.html`  
**右區**：腰臀 gentle stretch on yoga mat

**Prompt：**
```
Open Graph banner 1200x630. Left 55% empty cream paper. Right 45%: gentle lower back and hip stretch on yoga mat in bright clinic corner, athletic wear, empowering recovery mood, NOT exaggerated pain. Bottom pine bar, red seal logo. NO text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

---

### 其他重要頁 OG（IMG-061–065）

#### IMG-061 · 診所環境 → `og/og-clinic.jpg`

**適用**：`clinic.html`  
**Prompt：**
```
Open Graph banner 1200x630. Left 55% empty cream paper. Right 45%: premium TCM clinic interior collage feel — waiting lounge with cream armchairs and reception backlit sign, peaceful empty space. Bottom pine bar, red seal logo. NO text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

#### IMG-062 · 關於伍醫師 → `og/og-about.jpg`

**適用**：`about.html`  
**Prompt：**
```
Open Graph banner 1200x630. Left 55% empty cream paper. Right 45%: TCM physician seated in consultation room, side profile empathetic expression, pulse books on desk, 25 years experience mood. Bottom pine bar, red seal logo. NO text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

#### IMG-063 · 中環位置 → `og/og-central.jpg`

**適用**：`about/central-hk.html`  
**Prompt：**
```
Open Graph banner 1200x630. Left 55% empty cream paper. Right 45%: Central Hong Kong street view — Queen's Road Central pedestrian perspective, modern towers and historic facades, warm afternoon light, clinic location context. Bottom pine bar, red seal logo. NO text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

#### IMG-064 · 養生專欄列表 → `og/og-blog.jpg`

**適用**：`blog/index.html`  
**Prompt：**
```
Open Graph banner 1200x630. Left 55% empty cream paper. Right 45%: four-panel mini collage of TCM wellness topics — herbal tea, calm sleep scene, gentle skincare herbs, fertility tea — unified cream grid, editorial blog index mood. Bottom pine bar, red seal logo. NO text.

GLOBAL STYLE — Oakville Wellness 頤安本草: [paste global block]
```

#### IMG-065 · 流程與收費 → `og/og-process.jpg`

| 項目 | 內容 |
|------|------|
| **適用** | `process.html` |
| **右區主視覺** | **2×3 六格矇太奇**（或 3 格精簡版），每格對應 § G 一步，場景須與實拍一致 |
| **六格內容** | ① 候診區手機預約 ② 接待櫃台填表 ③ 診症桌把脈 ④ 對坐說明方案 ⑤ 針灸床＋藥瓶牆 ⑥ 複診把脈／候診再預約 |
| **後期標題建議** | 「診症流程與收費」／「六步了解中醫診症」 |
| **墊圖** | `shop-3.jpeg`、`shop-8.jpeg`、`doctor-2.jpeg`、`shop-9.jpeg`；或已生成的 `process/step-01 … 06.png` |
| **避免** | 米紙色編輯調、居家沙發、深色老藥櫃、可讀文字、患者正臉 |

**右區六格對照**（由上至下、左至右 2×3）：

| 格 | 步驟 | 場景關鍵字 |
|----|------|------------|
| 1 | 預約 | 白牆候診長椅、模糊 WhatsApp 手機 |
| 2 | 登記 | 弧形白櫃台、木條暖黃底光、填表手部 |
| 3 | 四診 | 淺木桌、脈枕、醫師雙手 |
| 4 | 方案 | 同診症室對坐、平板側影 |
| 5 | 治療 | 白床單針灸床、TDP 燈、針盤 |
| 6 | 複診 | 再次把脈或候診區手機 |

**Prompt：**
```
Open Graph banner, exact 1200x630 pixels, 1.91:1 landscape.
Layout: left 55% flat warm cream paper (#F7F2E7) completely empty for post-production Chinese title. Right 45%: 2×3 photo grid collage of TCM clinic patient journey — six small panels, each photorealistic matching real Oakville clinic interiors (shop-3, shop-8, doctor-2, shop-9 references):
(1) waiting area white walls, wooden bench, blurred WhatsApp phone in hands;
(2) curved white reception counter with wood slat and yellow LED base, hands filling form from behind;
(3) light wood desk, pulse pillow, physician hands only;
(4) consultation side-profile discussion at same desk with tablet;
(5) white treatment bed, TDP lamp, needle tray;
(6) return pulse check or waiting area re-booking.
Unified bright even clinic lighting, white walls, light wood, sharp focus — NOT cream editorial grading, NOT dark apothecary drawers, NOT home sofa. Thin cream gutters between panels optional. Bottom full-width bar 50px pine green (#2A463C). Small red square seal logo at bottom-right of visual area. NO readable text, NO watermarks, NO URLs, NO patient faces.

REAL CLINIC PHOTO STYLE (right 45% panels only) — Oakville Wellness 頤安本草:
Photorealistic interior photo of a modern Hong Kong Central TCM clinic. Bright, clean, evenly lit (ceiling track lights + soft window fill), NOT moody editorial stock. White and off-white walls, light natural wood grain furniture, grey mesh ergonomic chairs. Minimal clutter, professional medical environment. Sharp focus across scene (minimal bokeh). No readable text on screens, forms, or medicine labels.
```

**三格精簡版 Prompt**（右區空間不足或生成失敗時，取 ②③⑤）：
```
Open Graph banner 1200x630. Left 55% empty cream #F7F2E7. Right 45%: vertical triptych of real clinic patient journey — top: shop-8 style reception check-in hands; middle: doctor-2 desk pulse diagnosis hands; bottom: shop-9 acupuncture bed with TDP lamp. Bright white walls, light wood, even lighting, sharp focus. Bottom pine bar #2A463C, red seal logo bottom-right. NO text, NO patient faces, NOT editorial cream grading.
```

---

### 批次生成速查（替換 `[HERO VISUAL]` 一句）

| ID | 檔名 | [HERO VISUAL] 英文一句 |
|----|------|------------------------|
| 045 | og-default | physician portrait, blurred herbal cabinet, Central HK light |
| 046 | og-home | backlit clinic reception sign and medicine drawer wall |
| 047 | og-pain | shoulder acupuncture through towel, hands only |
| 048 | og-skin | herbal roots flat lay with pulse diagnosis wrist |
| 049 | og-internal | pulse pillow close-up, TCM books, faint incense |
| 050 | og-gyn | moxibustion warmer, red date tea, woman silhouette back |
| 051 | og-acupuncture | sterile needles on bamboo tray, meridian model |
| 052 | og-herbs | angelica astragalus goji flat lay, mortar, dispensary blur |
| 053 | og-moxa | glowing moxa stick smoke, warm amber light |
| 054 | og-cupping | glass cups on meridian mannequin, clothed silhouette |
| 055 | og-eczema | congee mung beans greens, clean anti-inflammatory food |
| 056 | og-acne | soft profile healthy skin, subtle face zone lines |
| 057 | og-insomnia | bedside lamp, jujube tea, cream bedding |
| 058 | og-fertility | red date longan tea, warm moxa glow, nurturing silhouette |
| 059 | og-neck-pain | office neck stretch, Central HK blur, relief mood |
| 060 | og-sciatica | yoga mat hip stretch, recovery mood |
| 061 | og-clinic | waiting lounge and reception interior |
| 062 | og-about | physician side profile in consultation room |
| 063 | og-central | Queen's Road Central street pedestrian view |
| 064 | og-blog | four-panel wellness collage grid |
| 065 | og-process | 2×3 grid: waiting phone, reception check-in, pulse desk, plan discussion, acupuncture bed, follow-up pulse |

---

### Figma 後製 checklist（生成 JPG 後）

1. 畫布 **1200×630**，左 660px 填 `#F7F2E7`（若 AI 已留空可跳過）
2. 右區貼入主視覺，加 **40px 內距** 安全區
3. 右下角貼 `logo.png` 印章（約 64×64）
4. 底欄 50px `#2A463C`，左白字 `OAKVILLE WELLNESS`，右 `#AE8A47`「中環」
5. （可選）左區加頁面標題 2 行，Noto Serif TC Bold 36–42px `#2A463C`
6. 匯出 **JPG quality 85%**，檔案 < 300KB（WhatsApp 載入較快）
7. 上傳後用 [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) 或 WhatsApp 實測預覽

---

### 實施優先順序（P3 內）

| 批次 | 生成 | 原因 |
|------|------|------|
| **第一批** | IMG-045 + IMG-046 | 覆蓋首頁 + 全站 fallback，立即改善大部分分享 |
| **第二批** | IMG-047–054 | 8 專科頁，WhatsApp 轉介最常分享 |
| **第三批** | IMG-055–060 | 6 症狀頁 + 對應 blog 文章 |
| **第四批** | IMG-061–065 | 診所、關於、專欄、流程等 |

---

## 六、不需 AI 生成／維持程式端的部分

| 元素 | 處理方式 |
|------|----------|
| Hero 背景水印「頤安本草」 | CSS `.df-home-hero__type` — 已完善 |
| 內頁 Hero 大水印字 | CSS `.df-page-hero__watermark` — 每頁一字，無需圖 |
| 四大專科 SVG 圖標 | `index.html` `.spec-ico` — 可保留線稿風 |
| Logo / Favicon | 已有 SVG |
| 信任條、評價文字 | 文字 + schema，不需插圖 |

---

## 七、合規與品牌注意

1. **醫療廣告（香港）**：避免「根治」「100% 見效」；圖片不出現 Before/After 皮膚對比。  
2. **患者私隱**：診所實景 **禁止** 未授權患者入鏡；Instagram 需與真實貼文一致。  
3. **醫師肖像**：優先 **真實攝影**；AI 生成臉部需醫師書面同意。  
4. **Unsplash**：上線前 **全部移除**，避免與 Google 商家相片不一致導致信任下降。  
5. **統一調色**：建議 Lightroom preset — 色溫 +200K、Saturation -10、Greens hue toward pine #2A463C。

---

## 八、實施路線圖

```
Week 1  實地拍攝診所 6 景 + 醫師 2 姿勢 → 替換 index/clinic Unsplash
Week 2  專欄 4 張 + IG 6 張（可一次拍攝衍生）
Week 3  8 專科 Hero + 6 症狀分欄圖 → 改 HTML 加 df-about-grid
Week 4  process 6 步 + contact/central-hk + OG 系列
```

---

## 九、快速索引 — 現有 DOM 對照表

| DOM / 檔案 | 現用 src | 替換為 |
|------------|----------|--------|
| `index.html` `.df-photo-card__img` (hero) | `images/doctor.jpg` | IMG-001 |
| `index.html` `.df-photo-card__img` (about) | `images/doctor.jpg` | IMG-002 |
| `index.html` `#clinic` gallery ×4 | unsplash ×4 | IMG-003–006 |
| `index.html` `#insights` feed ×3 | unsplash ×3 | IMG-009–011 |
| `index.html` `#social` ig ×6 | unsplash ×6 | IMG-013–018 |
| `clinic.html` gallery ×6 | unsplash ×6 | IMG-003–008 |
| `blog/index.html` feed ×4 | unsplash ×4 | IMG-009–012 |
| `news/index.html` feed ×1 | unsplash ×1 | IMG-019 |
| `about.html` portrait | `images/doctor.jpg` | IMG-002 |
| `process.html` `.df-step-list` ×6 | **無圖（待加 `.df-step__media`）** | IMG-034–039 |
| 全站 `<meta og:image>` | `images/doctor.jpg`（clinic 用 shop-8） | IMG-045–065 → `images/og/*.jpg` |
| 20+ 內頁 | 無圖 | IMG-020–044 按優先 |

---

## 十、Negative Prompt（所有 AI 生成建議附加）

```
Avoid: hospital stock photo, clinical cold blue lighting, visible patient faces without consent, skin disease close-ups, blood, surgery, exaggerated pain expressions, cheap clipart, neon colors, western spa clichés, cluttered composition, watermark, English text overlay, low resolution, anime style, 3D render look, generic Asian temple background unrelated to modern clinic.
```

---

*本文件為 `oakvilles` 專案視覺資產規格書。生成或拍攝完成後，請更新各 HTML 的 `src` 與 `og:image`，並在 `images/` 目錄維護 WebP + JPG 雙格式。*
