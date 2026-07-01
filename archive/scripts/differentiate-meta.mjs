#!/usr/bin/env node
/**
 * Replace shared meta boilerplate with page-specific descriptions.
 * Updates description + ogDescription in frontmatter.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src");

const BOILERPLATE_ZH =
  /中環錦安大廈 6 樓 · 25年臨床 · 註冊中醫 003769 · Google 5\.0 · 歡迎 WhatsApp 6734 9532 預約中環面診。/g;
const BOILERPLATE_EN = / Book via WhatsApp 6734 9532\.?/g;

/** @type {Record<string, { description: string, ogDescription?: string, title?: string, ogTitle?: string }>} */
const META = {
  // ── Chinese ──
  "index.html": {
    description:
      "頤安本草 · 伍厚臻中醫師。中環高私密禪意診所，25 年臨床，專注痛症、皮膚、婦科、內科。註冊中醫 003769 · WhatsApp 6734 9532。",
  },
  "about.html": {
    description:
      "伍厚臻註冊中醫師（003769），廣州中醫藥大學及廈門大學學士，25 年中環執業。專長濕疹、暗瘡、婦科、痛症。WhatsApp 6734 9532。",
  },
  "clinic.html": {
    description:
      "頤安本草中環診所實景：候診區、診症室、中藥房、針灸區。港鐵中環站步行約 5 分鐘 · WhatsApp 6734 9532 預約參觀。",
  },
  "contact.html": {
    description:
      "預約伍厚臻中醫師：WhatsApp 6734 9532 或致電 2881 8182。中環皇后大道中錦安大廈 6 樓 602 室，週一至六應診。",
  },
  "faq.html": {
    description:
      "中醫常見問題：針灸痛不痛？中藥如何服用？要幾多次？伍厚臻解答中環門診就診疑問 · WhatsApp 6734 9532。",
  },
  "process.html": {
    description:
      "伍厚臻診症流程：首診四診合參、明碼收費、覆診加減方。中環頤安本草預約與應診須知 · WhatsApp 6734 9532。",
  },
  "services.html": {
    description:
      "中環中醫專科總覽：痛症、皮膚、婦科、內科、針灸、中藥、艾灸、拔罐。伍厚臻一人一方 · WhatsApp 6734 9532。",
  },
  "about/central-hk.html": {
    description:
      "頤安本草位於中環皇后大道中錦安大廈 6 樓，港鐵中環站步行約 5 分鐘。皮膚、痛症、婦科、針灸門診。",
  },
  "services/pain.html": {
    description:
      "中環痛症中醫：針灸推拿處理頸痛、腰背痛、坐骨神經痛、肩周炎。伍厚臻分型施治 · WhatsApp 6734 9532。",
  },
  "services/acupuncture.html": {
    description:
      "伍厚臻中醫師提供傳統針灸、美顏針及體質調理，應用於痛症與日常保健。中環錦安大廈 · WhatsApp 6734 9532。",
  },
  "services/herbs.html": {
    description:
      "一人一方中藥處方：四診合參、覆診加減，可代煎或顆粒沖劑。伍厚臻中環門診 · WhatsApp 6734 9532。",
  },
  "services/moxibustion.html": {
    description:
      "艾灸溫通經絡、扶陽祛寒，適合虛寒、手腳冰冷、慢性疲勞及婦科寒凝。中環伍醫師 · WhatsApp 6734 9532。",
  },
  "services/cupping.html": {
    description:
      "拔罐刮痧促進循環、鬆解筋膜，改善肩頸背腰痠痛及濕重困倦。中環按體質施術 · WhatsApp 6734 9532。",
  },
  "services/internal.html": {
    description:
      "內科調理：失眠、腸胃不適、長期疲勞、免疫力。伍厚臻中藥調和臟腑 · 中環 WhatsApp 6734 9532。",
  },
  "conditions/eczema.html": {
    description:
      "濕疹中醫：從脾肺腎與濕熱體質入手，內服外用一人一方。伍厚臻中環 · 效果因人而異 · WhatsApp 6734 9532。",
  },
  "conditions/acne.html": {
    description:
      "暗瘡中醫分型：肺胃熱、肝鬱、脾濕。伍厚臻從臟腑調理，支援減少反覆發作 · 中環 · WhatsApp 6734 9532。",
  },
  "conditions/insomnia.html": {
    description:
      "失眠中醫分型：入睡難、多夢易醒、早醒。中藥針灸調和心肝脾腎 · 伍厚臻中環 · WhatsApp 6734 9532。",
  },
  "conditions/neck-pain.html": {
    description:
      "頸痛中醫：久坐低頭常見。針灸、中藥與筋膜調理，改善活動受限 · 伍厚臻中環 WhatsApp 6734 9532。",
  },
  "conditions/sciatica.html": {
    description:
      "坐骨神經痛中醫：腰臀至腿放射痛、麻痺。經絡阻滯分型處理 · 伍厚臻中環門診 WhatsApp 6734 9532。",
  },
  "blog/acne-face-zones.html": {
    description:
      "暗瘡面部分區與臟腑：額頭、兩頰、下巴各代表什麼？伍厚臻中醫解讀與調理方向 · 頤安本草中環 · WhatsApp 6734 9532。",
  },
  "blog/insomnia-tcm-guide.html": {
    description:
      "失眠中醫分型：心腎不交、肝鬱化火、心脾兩虛的調理方向 · 伍厚臻中環門診分享 · WhatsApp 6734 9532。",
  },
  "blog/fertility-stress.html": {
    description:
      "壓力型難孕：肝鬱衝任失調的中醫解讀，週期用藥與針灸備孕 · 伍厚臻 · 效果因人而異 · 中環面診。",
  },
  "blog/eczema-from-within.html": {
    description:
      "濕疹為何要從內調？中醫解析脾胃濕熱、內外同治思路 · 伍厚臻中環 · 效果因人而異 · WhatsApp 6734 9532。",
  },
  "blog/index.html": {
    description:
      "養生專欄：伍厚臻分享濕疹、暗瘡、失眠、備孕等中醫知識與體質解讀 · 頤安本草中環 · WhatsApp 6734 9532。",
  },
  "news/index.html": {
    description:
      "頤安本草最新消息：應診時間、診所公告與活動 · 伍厚臻中環中醫 WhatsApp 6734 9532。",
  },
  "news/saturday-hours-2026.html": {
    description:
      "2026 週六應診 10:30–17:30，中環錦安大廈。上班族週六面診 · 伍厚臻 · WhatsApp 6734 9532 預約。",
  },

  // ── English ──
  "en/index.html": {
    description:
      "Oakville Wellness · Dr. Ng Hau Jun, registered TCM in Central Hong Kong. Pain, skin, gynaecology and internal medicine. WhatsApp 6734 9532.",
  },
  "en/about.html": {
    description:
      "Dr. Ng Hau Jun (003769), 25 years in Central Hong Kong. Dermatology, gynaecology, pain and internal medicine. WhatsApp 6734 9532.",
  },
  "en/clinic.html": {
    description:
      "Oakville Wellness clinic photos: waiting area, consultation rooms, herbal dispensary and acupuncture space. Central · WhatsApp 6734 9532.",
  },
  "en/contact.html": {
    description:
      "Book Dr. Ng via WhatsApp 6734 9532 or call 2881 8182. Unit 602, Kam On Building, Queen's Road Central. Mon–Sat hours.",
  },
  "en/faq.html": {
    description:
      "TCM FAQ: Does acupuncture hurt? How to take herbs? How many sessions? Dr. Ng answers common questions — Central Hong Kong.",
  },
  "en/process.html": {
    description:
      "Consultation flow, fees and booking at Oakville Wellness. Thorough first visit, transparent pricing — Dr. Ng, Central.",
  },
  "en/services.html": {
    description:
      "TCM services hub: pain, dermatology, gynaecology, internal medicine, acupuncture, herbs, moxibustion, cupping. Central HK.",
  },
  "en/about/central-hk.html": {
    description:
      "Oakville Wellness on Queen's Road Central — ~5 min from MTR. Skin, pain, gynaecology and acupuncture. WhatsApp 6734 9532.",
  },
  "en/services/pain.html": {
    description:
      "Acupuncture and tuina for neck, back, sciatica and frozen shoulder. Pattern-based care — Dr. Ng, Central Hong Kong.",
  },
  "en/services/acupuncture.html": {
    description:
      "Traditional acupuncture and wellness care in Central Hong Kong. May support pain, sleep and digestion. Results vary. WhatsApp 6734 9532.",
    title: "Acupuncture | Central HK | Dr. Ng Hau Jun",
    ogTitle: "Acupuncture | Central HK | Dr. Ng Hau Jun",
  },
  "en/services/internal.html": {
    description:
      "Herbal support for insomnia, digestion, fatigue and immunity at Oakville Wellness, Central. WhatsApp 6734 9532.",
    title: "TCM Internal Medicine | Central HK | Dr. Ng",
    ogTitle: "TCM Internal Medicine | Central HK | Dr. Ng",
  },
  "en/services/herbs.html": {
    description:
      "Individualised herbal formulas from four-diagnosis assessment, adjusted at follow-ups. Central Hong Kong TCM clinic.",
  },
  "en/services/moxibustion.html": {
    description:
      "Moxibustion warms meridians for cold-deficiency, fatigue and gynaecological cold patterns. Dr. Ng, Central Hong Kong.",
  },
  "en/services/cupping.html": {
    description:
      "Cupping and gua sha for circulation and fascial release — neck, shoulder and back discomfort. Central clinic.",
  },
  "en/services/gynaecology.html": {
    description:
      "TCM gynaecology: menstrual irregularity, dysmenorrhoea, fertility support and PCOS. Results vary · Central HK.",
  },
  "en/services/skin.html": {
    description:
      "TCM dermatology for acne, eczema and sensitive skin. Constitutional care by Dr. Ng — Central. Results vary.",
  },
  "en/conditions/eczema.html": {
    description:
      "TCM eczema care in Central — damp-heat and constitutional patterns. Dr. Ng Hau Jun · Results vary.",
  },
  "en/conditions/acne.html": {
    description:
      "Pattern-based TCM for acne: lung-stomach heat, liver stagnation, spleen dampness. In-person Central consultations.",
  },
  "en/conditions/insomnia.html": {
    description:
      "Herbs and acupuncture for sleep difficulties — heart, liver, spleen and kidney patterns. Central Hong Kong clinic.",
  },
  "en/conditions/neck-pain.html": {
    description:
      "Neck pain from desk work and stress: acupuncture, herbs and fascial care. Dr. Ng Hau Jun, Central Hong Kong.",
  },
  "en/conditions/sciatica.html": {
    description:
      "Radiating leg pain and sciatica — meridian blockage and musculoskeletal patterns. TCM support in Central.",
  },
  "en/conditions/fertility.html": {
    description:
      "Phased pre-conception TCM based on menstrual cycle and kidney qi. Dr. Ng, Central · Results vary.",
  },
  "en/blog/index.html": {
    description:
      "Wellness journal: Dr. Ng on eczema, acne, insomnia and pre-conception — TCM insights from Central Hong Kong.",
  },
  "en/blog/eczema-from-within.html": {
    description:
      "Why treat eczema from within? Spleen-stomach damp-heat and constitutional TCM care — Dr. Ng, Central.",
  },
  "en/blog/acne-face-zones.html": {
    description:
      "Forehead, cheek and chin acne — TCM facial zone theory and care directions. Dr. Ng Hau Jun, Central.",
  },
  "en/blog/insomnia-tcm-guide.html": {
    description:
      "Insomnia TCM patterns: heart-kidney disharmony, liver qi stagnation and spleen-heart deficiency. Dr. Ng, Central.",
    title: "Insomnia TCM Patterns | Dr. Ng | Central HK",
    ogTitle: "Insomnia TCM Patterns | Dr. Ng | Central HK",
  },
  "en/blog/fertility-stress.html": {
    description:
      "Stress and liver qi in pre-conception care — cycle-based herbs and acupuncture. Dr. Ng, Central Hong Kong.",
  },
  "en/news/index.html": {
    description:
      "Clinic news: opening hours, announcements and updates from Oakville Wellness TCM, Central Hong Kong.",
  },
  "en/news/saturday-hours-2026.html": {
    description:
      "Saturday hours 10:30–17:30 in 2026. Book weekend visits with Dr. Ng at Kam On Building, Central.",
  },
};

function patchField(content, field, value) {
  const re = new RegExp(`^(${field}:\\s*")([^"]*)(")`, "m");
  if (!re.test(content)) return content;
  return content.replace(re, `$1${value}$3`);
}

let updated = 0;
for (const [rel, fields] of Object.entries(META)) {
  const file = path.join(ROOT, rel.replace(/\//g, path.sep));
  if (!fs.existsSync(file)) {
    console.warn("skip missing:", rel);
    continue;
  }
  let content = fs.readFileSync(file, "utf8");
  const orig = content;

  if (fields.description) {
    content = patchField(content, "description", fields.description);
    content = patchField(content, "ogDescription", fields.ogDescription || fields.description);
  }
  if (fields.title) {
    content = patchField(content, "title", fields.title);
    content = patchField(content, "ogTitle", fields.ogTitle || fields.title);
  }

  // Strip any leftover long boilerplate fragments only
  content = content.replace(BOILERPLATE_ZH, "");

  if (content !== orig) {
    fs.writeFileSync(file, content, "utf8");
    updated++;
    console.log("updated:", rel);
  }
}

console.log(`\n${updated} files updated.`);
