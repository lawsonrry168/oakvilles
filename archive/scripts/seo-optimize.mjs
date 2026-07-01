import fs from "fs";
import path from "path";

const CTA_ZH = "歡迎 WhatsApp 6734 9532 預約中環面診。";
const TRUST_ZH = "中環錦安大廈 6 樓 · 25年臨床 · 註冊中醫 003769 · Google 5.0 ·";
const CTA_EN = "Book via WhatsApp 6734 9532.";
const TRUST_EN = "25+ years · Reg. 003769 · Google 5.0 · Central MTR.";

/** @type {Record<string, {title?: string, description?: string}>} */
const SEO = {
  "src/index.html": {
    title: "伍厚臻中醫師 · 頤安本草 | 香港中環高端中醫診所",
    description: `頤安本草 · 伍厚臻中醫師。香港中環高私密禪意診療空間，二十五年臨床經驗，循證與傳統並重，專注痛症、皮膚、婦科、內科調理。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/about.html": {
    title: "關於伍厚臻醫師 · 頤安本草 | 香港中環 · 25年臨床",
    description: `伍厚臻註冊中醫師（003769），廣州中醫藥大學及廈門大學學士，25年香港中環執業，Google 5.0 好評。專注濕疹、暗瘡、婦科及痛症調理。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/contact.html": {
    title: "聯絡與預約 · 頤安本草 | 香港中環 · 伍厚臻中醫師",
    description: `WhatsApp 或電話預約伍厚臻中醫師。中環皇后大道中錦安大廈 6 樓，週一至五及週六應診。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/faq.html": {
    title: "常見問題 FAQ · 頤安本草 | 香港中環中醫",
    description: `中醫診症常見問題：針灸是否痛？中藥注意事項？療程需要幾次？伍厚臻中醫師為您解答。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/process.html": {
    title: "診症流程與收費 · 香港中環 · 伍厚臻中醫師",
    description: `了解伍厚臻中醫師的診症流程、收費標準及預約政策。首診四診合參，收費透明清晰。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/clinic.html": {
    title: "診所環境 · 香港中環 · 伍厚臻中醫師",
    description: `查看頤安本草中環診所實景：候診區、診症室、中藥房、針灸治療區及接待處。靜謐私密，交通方便。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/services.html": {
    title: "診症專科 · 頤安本草 | 香港中環 · 伍厚臻中醫師",
    description: `伍厚臻中醫師提供痛症、皮膚科、婦科、內科及針灸等全面中醫服務。中環門診，一人一方。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/services/skin.html": {
    title: "中醫皮膚科｜暗瘡·濕疹·皮膚敏感｜香港中環｜伍厚臻中醫師",
    description: `伍厚臻中醫師於香港中環提供中醫皮膚科，以體質調理改善暗瘡、濕疹及皮膚敏感，減少對類固醇依賴。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/services/pain.html": {
    title: "中醫痛症治療｜頸椎腰背關節｜香港中環｜伍厚臻中醫師",
    description: `伍厚臻中醫師以針灸、推拿治療頸椎痛、腰背痛、坐骨神經痛、關節炎及肩周炎，從根本紓緩痛症。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/services/gynaecology.html": {
    title: "中醫婦科｜月經·痛經·備孕｜香港中環｜伍厚臻中醫師",
    description: `伍厚臻中醫師以中藥溫養子宮、調和氣血，改善月經失調、痛經、不孕及 PCOS 等婦科問題。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/services/internal.html": {
    title: "中醫內科｜失眠·腸胃·免疫｜香港中環｜伍厚臻中醫師",
    description: `伍厚臻中醫師以中藥調和臟腑，改善失眠、腸胃不適、長期疲勞及免疫力低下等都市健康問題。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/services/acupuncture.html": {
    title: "針灸療法｜美顏·減肥·治療｜香港中環｜伍厚臻中醫師",
    description: `伍厚臻中醫師提供傳統針灸、美顏針及針灸減肥，疏通經絡、調和氣血，應用於痛症、保健及美容。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/services/cupping.html": {
    title: "拔罐刮痧｜香港中環中醫｜伍厚臻中醫師",
    description: `拔罐及刮痧促進氣血循環、鬆解筋膜，改善肩頸背腰痠痛及濕重困倦。伍醫師中環門診，按體質施術。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/services/herbs.html": {
    title: "中藥處方一人一方｜香港中環｜伍厚臻中醫師",
    description: `伍厚臻中醫師按四診合參開立一人一方，從根本調整體質，覆診靈活加減藥味。可代煎或沖劑。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/services/moxibustion.html": {
    title: "艾灸療法｜香港中環中醫｜伍厚臻中醫師",
    description: `艾灸溫通經絡、扶陽祛寒，適合虛寒體質、手腳冰冷、慢性疲勞及婦科寒凝。中環伍醫師門診。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/conditions/eczema.html": {
    title: "濕疹中醫治療｜頤安本草｜香港中環｜伍厚臻中醫師",
    description: `伍厚臻中醫師於香港中環提供濕疹中醫治療，從脾肺腎與濕熱體質入手，內外兼治一人一方。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/conditions/acne.html": {
    title: "暗瘡中醫治療｜頤安本草｜香港中環｜伍厚臻中醫師",
    description: `暗瘡不只表面皮脂，中醫重視肺胃熱、肝鬱與脾濕。伍厚臻中醫師分型辨治，改善反覆發作。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/conditions/fertility.html": {
    title: "不孕備孕中醫調理｜頤安本草｜香港中環",
    description: `針對不孕及備孕，伍厚臻中醫師按月經週期、腎氣與氣血分階段調理，提升受孕準備。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/conditions/insomnia.html": {
    title: "失眠中醫調理｜頤安本草｜香港中環｜伍厚臻中醫師",
    description: `失眠有入睡困難、多夢易醒、早醒等分型。以中藥與針灸調和心肝脾腎，重建睡眠節律。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/conditions/neck-pain.html": {
    title: "頸痛頸椎中醫｜頤安本草｜香港中環｜伍厚臻中醫師",
    description: `久坐、低頭與壓力常令頸肩繃緊。中醫結合針灸、中藥與筋膜調理，改善頸痛及活動受限。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/conditions/sciatica.html": {
    title: "坐骨神經痛中醫｜頤安本草｜香港中環",
    description: `腰臀至腿部放射性疼痛多與經絡阻滯相關。中醫分型處理，減輕痛麻與反覆發作。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/about/central-hk.html": {
    title: "中環中醫診所頤安本草｜香港中環 · 伍厚臻中醫師",
    description: `頤安本草位於香港中環皇后大道中，提供皮膚、痛症、內科、婦科與針灸。港鐵中環站步行約 5 分鐘。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/blog/index.html": {
    title: "養生專欄 · 中醫健康知識｜香港中環 · 伍厚臻中醫師",
    description: `頤安本草養生專欄：伍厚臻中醫師以 25 年臨床經驗，分享濕疹、暗瘡、失眠、備孕等中醫調理知識與體質解讀。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/blog/eczema-from-within.html": {
    title: "濕疹為何要從內調？中醫內外同治｜伍厚臻中醫師",
    description: `中醫認為濕疹根源在脾胃濕熱與體內積毒，單靠外用難以根本改善。伍厚臻中醫師解析內外同治、健脾祛濕的調理思路。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/blog/acne-face-zones.html": {
    title: "暗瘡位置與臟腑關係 · 中醫面部分區｜伍厚臻中醫師",
    description: `額頭、兩頰、下巴暗瘡各代表不同臟腑失衡。伍厚臻中醫師從中醫面部分區理論，解析暗瘡成因與對症調理方向。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/blog/fertility-stress.html": {
    title: "壓力型難孕體質調理 · 中醫備孕｜伍厚臻中醫師",
    description: `高壓生活導致肝鬱氣滯、衝任失調，是難孕常見成因。伍厚臻中醫師解析壓力型難孕的中醫調理、針灸備孕與週期用藥。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/blog/insomnia-tcm-guide.html": {
    title: "失眠中醫分型 · 心腎不交與肝鬱化火｜伍厚臻中醫師",
    description: `難以入睡、多夢易醒、早醒各有不同病機。伍厚臻中醫師解析心腎不交、肝鬱化火、心脾兩虛的失眠中醫調理方向。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/news/index.html": {
    title: "最新消息 · 頤安本草診所公告｜香港中環",
    description: `頤安本草中醫診所最新消息：應診時間調整、診所公告及活動資訊。中環伍厚臻中醫師診所。${TRUST_ZH} ${CTA_ZH}`,
  },
  "src/news/saturday-hours-2026.html": {
    title: "週六應診時間公告 2026｜頤安本草中環",
    description: `頤安本草 2026 年週六應診 10:30–17:30，中環錦安大廈 6 樓。上班族可預約週六面診，伍厚臻中醫師。${TRUST_ZH} ${CTA_ZH}`,
  },

  // English
  "src/en/index.html": {
    title: "Dr. Ng Hau Jun | Central Hong Kong TCM | Oakville Wellness",
    description: `Oakville Wellness · Dr. Ng Hau Jun, registered TCM in Central Hong Kong. Pain, skin, gynaecology and internal medicine. ${CTA_EN}`,
  },
  "src/en/about.html": {
    title: "About Dr. Ng Hau Jun | Oakville Wellness · Central HK",
    description: `Registered TCM Dr. Ng Hau Jun (003769), 25 years in Central Hong Kong. Specialising in eczema, acne, gynaecology and pain. ${CTA_EN}`,
  },
  "src/en/contact.html": {
    title: "Contact & Booking | Oakville Wellness · Central HK",
    description: `Book Dr. Ng Hau Jun via WhatsApp or phone at Kam On Building, Central. Mon–Sat clinic hours. ${CTA_EN}`,
  },
  "src/en/faq.html": {
    title: "FAQ | Oakville Wellness TCM · Dr. Ng Hau Jun",
    description: `Common TCM questions answered: Does acupuncture hurt? Herbal medicine notes? How many sessions? Dr. Ng Hau Jun, Central Hong Kong. ${CTA_EN}`,
  },
  "src/en/process.html": {
    title: "Consultation Process & Fees | Dr. Ng Hau Jun · Central HK",
    description: `Dr. Ng Hau Jun's consultation flow, fees and booking policy in Central Hong Kong. Thorough first visit, transparent pricing. ${CTA_EN}`,
  },
  "src/en/clinic.html": {
    title: "Clinic Environment | Oakville Wellness · Central Hong Kong",
    description: `View Oakville Wellness in Central: waiting area, consultation rooms, herbal dispensary and acupuncture space. Private, serene setting. ${CTA_EN}`,
  },
  "src/en/services.html": {
    title: "TCM Services | Pain · Skin · Gynaecology | Dr. Ng Hau Jun",
    description: `Dr. Ng Hau Jun offers pain, dermatology, gynaecology, internal medicine and acupuncture at Oakville Wellness, Central Hong Kong. ${CTA_EN}`,
  },
  "src/en/services/skin.html": {
    title: "TCM Dermatology | Acne & Eczema | Dr. Ng Hau Jun",
    description: `TCM dermatology for acne, eczema and sensitive skin in Central Hong Kong. Constitutional herbal care by Dr. Ng Hau Jun. Results vary. ${CTA_EN}`,
  },
  "src/en/services/pain.html": {
    title: "TCM Pain Management | Neck, Back & Joints | Dr. Ng Hau Jun",
    description: `Acupuncture and tuina for neck pain, back pain, sciatica and frozen shoulder in Central Hong Kong. Supportive pattern-based care. ${CTA_EN}`,
  },
  "src/en/services/gynaecology.html": {
    title: "TCM Gynaecology | Menstrual & Fertility | Dr. Ng Hau Jun",
    description: `TCM gynaecology for menstrual irregularity, dysmenorrhoea, fertility support and PCOS in Central Hong Kong. ${CTA_EN}`,
  },
  "src/en/services/internal.html": {
    title: "TCM Internal Medicine | Insomnia & Digestion | Dr. Ng Hau Jun",
    description: `Herbal support for insomnia, digestive discomfort, chronic fatigue and low immunity at Oakville Wellness, Central Hong Kong. ${CTA_EN}`,
  },
  "src/en/services/acupuncture.html": {
    title: "Acupuncture | Cosmetic & Clinical | Dr. Ng Hau Jun",
    description: `Traditional, cosmetic and weight-management acupuncture in Central Hong Kong — pain relief, wellness and beauty support. ${CTA_EN}`,
  },
  "src/en/services/cupping.html": {
    title: "Cupping & Gua Sha | Central Hong Kong TCM | Dr. Ng Hau Jun",
    description: `Cupping and gua sha to support circulation and fascial release for neck, shoulder and back discomfort. Central Hong Kong clinic. ${CTA_EN}`,
  },
  "src/en/services/herbs.html": {
    title: "Personalised Herbs | Dr. Ng Hau Jun · Central HK",
    description: `Individualised herbal formulas based on four-diagnosis assessment, adjusted at follow-up visits. Central Hong Kong TCM clinic. ${CTA_EN}`,
  },
  "src/en/services/moxibustion.html": {
    title: "Moxibustion Therapy | Central Hong Kong | Dr. Ng Hau Jun",
    description: `Moxibustion warms meridians and supports yang — suited to cold-deficiency patterns, fatigue and gynaecological cold. ${CTA_EN}`,
  },
  "src/en/conditions/eczema.html": {
    title: "Eczema TCM Treatment | Central Hong Kong | Dr. Ng",
    description: `Dr. Ng Hau Jun offers TCM eczema care in Central Hong Kong — damp-heat and constitutional patterns. ${CTA_EN}`,
  },
  "src/en/conditions/acne.html": {
    title: "Acne TCM Treatment | Central Hong Kong | Dr. Ng Hau Jun",
    description: `Pattern-based TCM for acne — lung-stomach heat, liver stagnation and spleen dampness. In-person consultations in Central Hong Kong. ${CTA_EN}`,
  },
  "src/en/conditions/fertility.html": {
    title: "Fertility TCM Support | Central Hong Kong | Dr. Ng Hau Jun",
    description: `Phased TCM support for pre-conception care based on menstrual cycle and kidney qi. Dr. Ng Hau Jun, Central Hong Kong. ${CTA_EN}`,
  },
  "src/en/conditions/insomnia.html": {
    title: "Insomnia TCM Care | Central Hong Kong | Dr. Ng Hau Jun",
    description: `Herbs and acupuncture to harmonise heart, liver, spleen and kidney for sleep difficulties. Central Hong Kong clinic. ${CTA_EN}`,
  },
  "src/en/conditions/neck-pain.html": {
    title: "Neck Pain TCM | Central Hong Kong | Dr. Ng Hau Jun",
    description: `Acupuncture, herbs and fascial care for neck pain from prolonged sitting and stress. Dr. Ng Hau Jun, Central Hong Kong. ${CTA_EN}`,
  },
  "src/en/conditions/sciatica.html": {
    title: "Sciatica TCM | Central Hong Kong | Dr. Ng Hau Jun",
    description: `Pattern-based TCM for radiating leg pain linked to meridian blockage and musculoskeletal imbalance. Central Hong Kong. ${CTA_EN}`,
  },
  "src/en/about/central-hk.html": {
    title: "Central Hong Kong TCM Clinic | Oakville Wellness | Dr. Ng",
    description: `Oakville Wellness TCM in Central Hong Kong — skin, pain, internal medicine, gynaecology and acupuncture. Easy MTR access. ${CTA_EN}`,
  },
  "src/en/blog/index.html": {
    title: "Wellness Journal | TCM Insights | Dr. Ng Hau Jun",
    description: `Dr. Ng Hau Jun shares TCM insights on eczema, acne, insomnia and pre-conception in Central Hong Kong. ${CTA_EN}`,
  },
  "src/en/blog/eczema-from-within.html": {
    title: "Why Eczema Needs Internal Care | TCM Guide | Dr. Ng Hau Jun",
    description: `TCM views eczema as rooted in spleen-stomach damp-heat. Dr. Ng explains inside-out constitutional care in Central Hong Kong. ${CTA_EN}`,
  },
  "src/en/blog/acne-face-zones.html": {
    title: "Acne Zones & Organ Balance | TCM Facial Mapping | Dr. Ng",
    description: `Forehead, cheek and chin acne may reflect internal patterns. Dr. Ng on TCM facial zone theory and care directions. ${CTA_EN}`,
  },
  "src/en/blog/fertility-stress.html": {
    title: "Stress-Related Fertility Patterns | TCM Pre-Conception | Dr. Ng",
    description: `Chronic stress may affect liver qi in pre-conception care. Dr. Ng on cycle-based herbs and acupuncture in Central Hong Kong. ${CTA_EN}`,
  },
  "src/en/blog/insomnia-tcm-guide.html": {
    title: "Insomnia TCM Patterns | Heart-Kidney & Liver | Dr. Ng Hau Jun",
    description: `Sleep difficulties reflect different TCM patterns. Dr. Ng on heart-kidney disharmony and liver qi stagnation. ${CTA_EN}`,
  },
  "src/en/news/index.html": {
    title: "Latest News | Oakville Wellness Clinic · Central Hong Kong",
    description: `Clinic announcements, opening hours and updates from Oakville Wellness TCM in Central Hong Kong. ${CTA_EN}`,
  },
  "src/en/news/saturday-hours-2026.html": {
    title: "Saturday Clinic Hours 2026 | Oakville Wellness · Central HK",
    description: `Saturday hours 10:30–17:30 in 2026. Dr. Ng Hau Jun's Central Hong Kong TCM clinic — book Saturday appointments via WhatsApp. ${CTA_EN}`,
  },
};

function stripBom(content) {
  return content.replace(/^\uFEFF/, "");
}

function updateField(fm, key, value) {
  const re = new RegExp(`^(${key}:\\s*")([^"]*)(")`, "m");
  if (re.test(fm)) return fm.replace(re, `$1${value}$3`);
  return fm;
}

function applySeo(filePath, { title, description }) {
  let raw = stripBom(fs.readFileSync(filePath, "utf8"));
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!m) {
    console.warn("SKIP (no FM):", filePath);
    return false;
  }
  let fm = m[1];
  const body = m[2];
  if (title) {
    fm = updateField(fm, "title", title);
    fm = updateField(fm, "ogTitle", title);
  }
  if (description) {
    fm = updateField(fm, "description", description);
    fm = updateField(fm, "ogDescription", description);
  }
  fs.writeFileSync(filePath, `---\n${fm}\n---\n${body}`, "utf8");
  return true;
}

function stripBomFile(filePath) {
  const raw = fs.readFileSync(filePath);
  if (raw[0] === 0xef && raw[1] === 0xbb && raw[2] === 0xbf) {
    fs.writeFileSync(filePath, raw.subarray(3));
    return true;
  }
  return false;
}

function walk(dir, acc = []) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) walk(p, acc);
    else if (f.endsWith(".html")) acc.push(p.replace(/\\/g, "/"));
  }
  return acc;
}

let bomCount = 0;
let seoCount = 0;
for (const f of walk("src/en")) {
  if (stripBomFile(f)) bomCount++;
}
for (const [rel, data] of Object.entries(SEO)) {
  if (applySeo(rel, data)) seoCount++;
}
console.log(`BOM stripped: ${bomCount} files`);
console.log(`SEO updated: ${seoCount} files`);
