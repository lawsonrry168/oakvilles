# -*- coding: utf-8 -*-
"""6-month content data — topics distinct from existing site blogs & prior calendar."""

CTA = "WhatsApp 6734 9532 查詢檔期 · oakvilles.com"
DISCLAIMER = "以上為一般健康資訊，不代替面診；個人體質與效果因人而異。"

HASHTAGS_IG = (
    "#頤安本草 #伍厚臻中醫師 #中環中醫 #香港養生 #TCM #循本溯源 "
    "#內科調理 #婦科調理 #痛症調理 #OakvilleWellness"
)
HASHTAGS_FB = "#頤安本草 #中環中醫 #伍厚臻中醫師 #香港TCM"

# Social hero visual leads (prepended in docx generator)
SOCIAL_IG_LEAD = (
    "SCROLL-STOPPING Instagram hero · 1:1 · MUST match caption scenario below. "
    "Bold focal subject 55–65% frame, cinematic rim light, cream (#F7F2E7) headline band, "
    "pine/cinnabar/ochre accents. "
)
SOCIAL_FB_LEAD = (
    "SCROLL-STOPPING Facebook hero · 4:5 vertical · MUST match caption scenario below. "
    "Hero subject upper 55%, lower third cream gradient for CTA. "
)

# Existing site blogs to avoid duplicating:
# eczema-from-within, acne-face-zones, insomnia-tcm-guide, fertility-stress

MONTHS = [
    {
        "label": "2026 年 7 月",
        "season": "小暑 · 大暑 — 暑濕當令",
        "weeks": [
            {
                "w": 1, "pillar": "症狀科普", "topic": "冷氣房腸胃不適",
                "landing": "/services/internal.html",
                "img_copy_hook": (
                    "Caption scenario: Central HK office white-collar — AC vent blasting cold air, "
                    "iced coffee on desk, rushed takeaway lunch half-eaten, afternoon stomach discomfort. "
                ),
                "img_scene": (
                    "Desk tableau: ceiling AC louvers visible with cool blue air implied, condensation iced coffee cup, "
                    "plastic takeaway lunch box open with chopsticks mid-meal, cardigan on chair back, "
                    "Central tower view through office window, no readable text, relatable 返工肚唔舒服 mood."
                ),
                "ig": (
                    "【寫字樓凍到震，肚又唔舒服？】\n"
                    "冷氣長開、飲冰咖啡、午餐趕時間——中醫稱之為寒濕困脾，常見腹瀉、胃脹、納差。\n"
                    "未必是「腸胃炎」咁簡單，要睇寒熱虛實。\n"
                    "可先記低症狀出現時段，面診時更易辨證。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
                "fb": (
                    "中環寫字樓幾乎全年冷氣，不少客人反映：「一返工就肚瀉、午後好攰。」\n\n"
                    "中醫常從寒濕困脾、氣機升降失調理解——外寒侵襲加上飲食不節，脾胃運化受阻。\n"
                    "調理方向因人而異，可能涉及溫中祛寒、健脾化濕等，需由註冊中醫面診後決定。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
            },
            {
                "w": 2, "pillar": "診所信任", "topic": "初診會經歷什麼",
                "landing": "/process.html",
                "img_copy_hook": (
                    "Caption scenario: first TCM visit — what to expect in consultation (chief complaint, sleep/diet/bowel, "
                    "medication history), transparent process, no hidden fees. "
                ),
                "img_scene": (
                    "Empty premium consultation room: single chair, pulse pillow on side table, wooden pen, "
                    "blurred intake clipboard (no readable text), red seal stamp accent, calm private 第一次問診 atmosphere."
                ),
                "ig": (
                    "【第一次看中醫，會問咩？】\n"
                    "① 主訴與病程　② 睡眠飲食二便　③ 既往用藥與過敏\n"
                    "望聞問切後，再解釋辨證思路同調理方向。\n"
                    "流程與收費官網有列明，無隱藏收費。\n\n"
                    f"{CTA}"
                ),
                "fb": (
                    "初次到訪頤安本草，不少朋友關心：「要準備咩？」\n\n"
                    "建議帶備近期西醫檢查或藥單（如有）、記下症狀出沒規律。\n"
                    "問診約 20–30 分鐘，含望聞問切；之後解釋體質與建議方案，再由您決定是否取藥或針灸。\n"
                    "詳見官網「流程收費」頁。\n\n"
                    f"{CTA}"
                ),
                "blog": {
                    "title": "冷氣房裡的腹瀉與胃脹：中醫如何理解「寒濕困脾」",
                    "slug": "ac-office-digestion-cold-damp",
                    "landing": "/blog/ac-office-digestion-cold-damp.html",
                    "category": "內科調理",
                    "img_scene": (
                        "Editorial: iced drink crossed out beside warm barley tea, aircon vent blur background, "
                        "stomach wellness metaphor with ginger slices on cream plate. 16:10."
                    ),
                    "sections": [
                        {
                            "h2": "引言",
                            "paragraphs": [
                                "香港夏季戶外悶熱，室內卻長年低溫冷氣。許多中環上班族出現一種「矛盾體質」：明明天氣炎熱，卻手腳偏涼、胃脹納差，甚至一到辦公室就腹瀉。這未必是細菌感染那麼單純，中醫常從寒濕困脾、氣機升降失調來理解。",
                            ],
                        },
                        {
                            "h2": "寒濕為何與冷氣有關",
                            "paragraphs": [
                                "脾主運化，喜燥惡濕。當人長期處於低溫環境，寒邪易直中中焦；再加上冰飲、沙拉、咖啡空腹等習慣，就像給運轉中的脾胃潑冷水。寒凝則氣滯，濕困則清陽不升，常見表現包括：胃脹噯氣、大便稀溏或先硬後軟、午後倦怠、舌淡苔白腻。",
                                "值得注意的是，「寒濕」不等於體質虛弱。部分年輕人外表精神，但內裡脾胃已因生活節奏反覆受損，只是尚未自覺。",
                            ],
                        },
                        {
                            "h2": "與腸易激綜合症的差異",
                            "paragraphs": [
                                "腸易激綜合症（IBS）與中醫的肝鬱乘脾、寒濕困脾有時症狀重疊，但辨證重點不同。若腹瀉常於緊張會議前後發作，多兼肝鬱；若以冷飲後即瀉、畏寒為主，則偏寒濕。臨床需結合舌脈、病程與誘因綜合判斷，不宜自行對號入座。",
                            ],
                        },
                        {
                            "h2": "辦公室可實踐的護胃方向",
                            "paragraphs": [
                                "護頸小巾或薄外套覆蓋腹部與後頸，減少冷氣直吹。飲品改溫熱，上午避免空腹咖啡。午餐避免過油過冷，七分飽即可。若當日已腹瀉，暫停生冷水果與沙律，改溫熱粥麵。以上為生活調護，不能代替處方。",
                            ],
                        },
                        {
                            "h2": "中醫調理的一般思路",
                            "paragraphs": [
                                "面診後，常見治則包括溫中散寒、健脾化濕、調暢氣機等，可能配合艾灸中脘、足三里，或內服方藥。療程長短視體質與習慣改善而定，效果因人而異。若腹瀉伴隨發燒、血便、劇痛或體重下降，應先求西醫評估排除器質性病變。",
                            ],
                        },
                        {
                            "h2": "常見問題",
                            "paragraphs": [
                                "問：飲薏米水可否祛濕？答：薏米偏涼，若本身畏寒腹瀉，未必適合長期大量飲用，需辨證。",
                                "問：可否邊西藥邊中藥？答：請主動告知醫師所有用藥，由註冊中醫判斷間隔與是否適合。",
                                "問：要調多久？答：視症狀嚴重度與生活改善而定，通常需數週持續調理。",
                            ],
                        },
                    ],
                    "closing": f"若冷氣房腸胃困擾已影響工作，歡迎預約內科面診。{CTA}　{DISCLAIMER}",
                },
            },
            {
                "w": 3, "pillar": "季節養生", "topic": "大暑祛濕飲食誤區",
                "landing": "/blog/",
                "img_copy_hook": (
                    "Caption scenario: major heat dampness — bitter herbal tea, bitter melon, barley remedies; "
                    "warning that spleen-deficient cold-sensitive people should not overuse bitter-cold detox. "
                ),
                "img_scene": (
                    "Kitchen counter: bitter melon slices, barley tea, herbal cooling drink beside crossed-out "
                    "over-sweet bubble tea — 祛濕唔係越苦越好 visual, thoughtful hesitation mood, summer Hong Kong home."
                ),
                "ig": (
                    "【大暑祛濕，唔係越苦越好】\n"
                    "涼茶、苦瓜、薏米各有人群限制。\n"
                    "脾虛怕冷、易瀉者不宜過度苦寒。\n"
                    "祛濕之前，先問清楚自己係邊種「濕」。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
                "fb": (
                    "「暑濕」成為七月熱詞，但祛濕方法眾說紛紜。\n\n"
                    "中醫強調辨證：濕熱與寒濕、脾虛濕困的飲食建議可以截然相反。\n"
                    "同一碗薏米赤小豆湯，有人飲完輕鬆，有人卻更疲倦——關鍵在體質。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
            },
            {
                "w": 4, "pillar": "轉化導向", "topic": "內科調理專頁",
                "landing": "/services/internal.html",
                "img_copy_hook": (
                    "Caption scenario: internal medicine — gut issues, chronic fatigue, recurrent colds; "
                    "direct reader to /services/internal.html when booking. "
                ),
                "img_scene": (
                    "Office desk after long day: herbal tea, tissue box, empty coffee cup, fatigue posture implied by "
                    "slumped blazer on chair — 腸胃·易倦·反覆感冒 triad, warm clinic invitation tone via pine-green herbal pack."
                ),
                "ig": (
                    "【腸胃 · 易倦 · 反覆感冒】\n"
                    "官網「內科調理」了解常見方向\n"
                    "預約時可備註主要困擾，方便安排問診重點。\n\n"
                    f"{CTA}"
                ),
                "fb": (
                    "內科並非「什麼都睇」，而是處理臟腑功能失衡的綜合調理。\n"
                    "常見包括腸胃不適、慢性疲勞、過敏體質等。\n"
                    "詳見官網內科專頁，再 WhatsApp 確認檔期。\n\n"
                    f"{CTA}"
                ),
                "blog": {
                    "title": "汗疱疹與手指小水泡：夏季皮膚問題的中醫內外思路",
                    "slug": "pompholyx-summer-tcm",
                    "landing": "/blog/pompholyx-summer-tcm.html",
                    "category": "皮膚調理",
                    "img_scene": (
                        "Abstract hands silhouette with soft cream gloves and herbal hand soak bowl, "
                        "no skin lesions visible, spa dermatology editorial. 16:10."
                    ),
                    "sections": [
                        {
                            "h2": "引言",
                            "paragraphs": [
                                "每到夏天，不少人手指、掌心冒出細小水泡，癢而難抓，抓破又痛，這是汗疱疹（又稱汗泡疹）的典型困擾。它與濕疹、真菌感染不同，西醫認為與出汗、過敏、壓力有關；中醫則常從濕熱蘊膚、脾失健運、血燥風動等角度綜合辨證。",
                            ],
                        },
                        {
                            "h2": "中醫如何命名這類水泡",
                            "paragraphs": [
                                "汗疱疹在古籍中多歸入「汗淅瘡」「螻螘窠」等類似描述，核心在於腠理不固、濕熱內蘊，復因暑濕外邪而發。部分患者體內濕熱未清，皮膚就像「排濕的出口」；另一類則因陰血不足、風燥內生，水泡反覆但皮膚偏乾。同樣是「小水泡」，治則可以完全不同。",
                            ],
                        },
                        {
                            "h2": "與濕疹、手癬的鑑別",
                            "paragraphs": [
                                "汗疱疹多對稱分布於手指側緣、掌心，水泡乾涸後脫皮；真菌感染常單側、邊緣清楚，可能伴足癬。濕疹範圍較廣，常與體質、過敏原相關。若水泡化膿、紅腫熱痛，需排除細菌感染。不確定時應先由醫師診斷，勿自行長期塗類固醇。",
                            ],
                        },
                        {
                            "h2": "內外同治的生活配合",
                            "paragraphs": [
                                "急性癢期避免鹼性洗手液、酒精消毒過度。洗碗洗衣戴棉質手套，內層可加薄膜。減少芒果、榴槤、辛辣、酒精等助濕生熱之品。情緒緊張會加重搔抓循環，可配合深呼吸或短暫離開螢幕。",
                            ],
                        },
                        {
                            "h2": "調理方向與療程預期",
                            "paragraphs": [
                                "內服常見清利濕熱、健脾和胃、養血润燥等方向，外治可配合溫和中药浸洗。部分患者於一至兩個月內減少發作頻率，亦有人需跨季調理。效果因人而異，需配合作息與飲食。",
                            ],
                        },
                        {
                            "h2": "常見問題",
                            "paragraphs": [
                                "問：可否刺破水泡？答：易感染，不建議自行處理。",
                                "問：與「體內濕毒」有關嗎？答：中醫重辨證，非單一「排毒」概念，需面診。",
                                "問：要戒口幾耐？答：視發作期與體質而定，醫師會隨症調整。",
                            ],
                        },
                    ],
                    "closing": f"若汗疱疹反覆影響工作與睡眠，可預約皮膚調理面診。{CTA}　{DISCLAIMER}",
                },
            },
        ],
    },
    {
        "label": "2026 年 8 月",
        "season": "立秋 · 處暑 — 暑熱未清、燥氣漸起",
        "weeks": [
            {
                "w": 1, "pillar": "症狀科普", "topic": "蕁麻疹風團",
                "landing": "/services/skin.html",
                "img_copy_hook": (
                    "Caption scenario: urticaria — press and red itchy wheals come and go; TCM wind pathogen; "
                    "acute phase rule out allergens first. "
                ),
                "img_scene": (
                    "Lifestyle trigger collage: fabric sleeve with light scratch gesture (no skin lesions), open window "
                    "breeze moving curtain, mint tea — 一撳就紅好痕 metaphor, sudden itch anxiety, clean skin not shown."
                ),
                "ig": (
                    "【一撳就紅、好痕？】\n"
                    "蕁麻疹來去匆匆，中醫多從「風邪」論治，亦要分清寒熱、虛實。\n"
                    "急性期應先排除過敏原，再談體質調理。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
                "fb": (
                    "蕁麻疹可在數小時內出現大片風團，又突然消退，令人困擾。\n\n"
                    "中醫稱「癮疹」，與風、濕、熱、血虛等相關；慢性反覆者更需辨明本虛標實。\n"
                    "若伴呼吸困難、唇腫，請立即急症就醫。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
            },
            {
                "w": 2, "pillar": "診所信任", "topic": "顆粒沖劑與傳統煎煮",
                "landing": "/services/herbs.html",
                "img_copy_hook": (
                    "Caption scenario: granules vs decoction — busy traveler needs convenience vs home brewing; "
                    "doctor recommends by urgency and lifestyle, one formula one person. "
                ),
                "img_scene": (
                    "Split desk: left — suitcase, granule sachets, business badge lanyard (no text); right — clay herb pot "
                    "simmering on home stove with steam — 顆粒定煎藥 choice, busy Central professional context."
                ),
                "ig": (
                    "【顆粒定煎藥？】\n"
                    "顆粒方便攜帶，煎煮吸收節奏或有不同。\n"
                    "醫師會按症狀急緩、工作行程建議劑型。\n"
                    "一人一方，劑型亦因人制宜。\n\n"
                    f"{CTA}"
                ),
                "fb": (
                    "不少客人問：「我應該飲顆粒定自己煲？」\n\n"
                    "免煎顆粒適合忙碌、出差人士；傳統煎煮則在劑量調整、湯藥溫服方面有其優勢。\n"
                    "伍醫師會按病情與生活模式建議，並解釋服用方法。\n\n"
                    f"{CTA}"
                ),
                "blog": {
                    "title": "經前乳房脹痛與情緒起伏：肝鬱氣滯的週期信號",
                    "slug": "pms-breast-distension-tcm",
                    "landing": "/blog/pms-breast-distension-tcm.html",
                    "category": "婦科調理",
                    "img_scene": (
                        "Feminine cycle wellness: moon phase ceramic dish, rose tea, journal with cyclical dots "
                        "(no readable text), cream and ochre palette. 16:10."
                    ),
                    "sections": [
                        {
                            "h2": "引言",
                            "paragraphs": [
                                "許多女性在經前一週出現乳房脹痛、觸痛，情緒易煩易怒或低落，這常被歸因於荷爾蒙波動。中醫則常從肝鬱氣滯、衝任失調理解——肝主疏泄，與情緒、月經週期密切相關；氣滯則血行不暢，乳絡不通而脹痛。",
                            ],
                        },
                        {
                            "h2": "為何集中在經前",
                            "paragraphs": [
                                "經前陽氣升發、氣血充盈，若平素肝鬱，氣機更易壅滯。常見伴隨症狀：胸脅脹滿、頭痛、失眠多夢、口苦咽乾。舌質偏紅、苔薄黃，脈弦。此與壓力型備孕的「衝任失調」有交集，但經前症候群未必涉及生育議題，辨證仍需個別分析。",
                            ],
                        },
                        {
                            "h2": "與乳腺疾病的分辨",
                            "paragraphs": [
                                "週期性脹痛多為雙側、結節感隨週期消長。若出現單側固定硬塊、皮膚凹陷、異常分泌物，應先接受乳腺檢查。中醫調理建立在排除器質性病變的前提下進行。",
                            ],
                        },
                        {
                            "h2": "生活與情緒管理",
                            "paragraphs": [
                                "經前減少咖啡因與高鹽加工食品，有助減輕水腫感。規律伸展與散步疏肝。睡前減少社交媒體刺激，避免情緒「熬夜」。可記錄兩至三個週期的情緒與脹痛日誌，面診時極有幫助。",
                            ],
                        },
                        {
                            "h2": "中醫調理思路",
                            "paragraphs": [
                                "治則常以疏肝解鬱、理氣散結、調和衝任為主，可能配合針灸太衝、期門等穴。療程或需跨越兩至三個週期觀察變化，效果因人而異。",
                            ],
                        },
                        {
                            "h2": "常見問題",
                            "paragraphs": [
                                "問：可否自行飲玫瑰花茶？答：輕度疏肝可，但經量過多或胃寒者需慎用。",
                                "問：與暗瘡位置有關嗎？答：同屬肝鬱可能，但表現不同，需整體辨證。",
                                "問：會否影響備孕？答：長期肝鬱可影響週期，若有生育計劃宜及早調理。",
                            ],
                        },
                    ],
                    "closing": f"經前困擾反覆出現，可預約婦科調理面診。{CTA}　{DISCLAIMER}",
                },
            },
            {
                "w": 3, "pillar": "季節養生", "topic": "末伏運動排汗",
                "landing": "/blog/",
                "img_copy_hook": (
                    "Caption scenario: late summer exercise — light sweat only, rehydrate with warm water, "
                    "no ice shower or cold drinks right after workout. "
                ),
                "img_scene": (
                    "Central park path dawn: runner pausing to sip warm thermos (not ice bottle), light sweat on towel, "
                    "sun low — 末伏微汗有度, rejected ice drink faded in background."
                ),
                "ig": (
                    "【末伏運動，汗出有度】\n"
                    "大汗傷津，過度暴曬反傷氣。\n"
                    "微汗即可，及時補充溫水。\n"
                    "運動後勿即沖凍水、勿貪冰。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
                "fb": (
                    "處暑後仍暑熱，不少人加大運動量「排毒」。\n\n"
                    "中醫認為汗為心液，大汗耗氣傷津，反而疲倦。\n"
                    "建議清晨或傍晚輕度有氧，配合伸展，汗出即停。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
            },
            {
                "w": 4, "pillar": "轉化導向", "topic": "婦科調理",
                "landing": "/services/gynaecology.html",
                "img_copy_hook": (
                    "Caption scenario: gynaecology — period pain, menopause, postpartum; private consultation, "
                    "one formula one person, book gynaecology service. "
                ),
                "img_scene": (
                    "Private clinic corridor detail: closed door with soft light gap, feminine waiting chair, rose tea cup, "
                    "orchid — 經期·更年期·產後私密問診, no people visible."
                ),
                "ig": (
                    "【經期不適 · 更年期 · 產後調理】\n"
                    "官網婦科專頁有常見方向說明\n"
                    "私密問診，一人一方\n\n"
                    f"{CTA}"
                ),
                "fb": (
                    "婦科調理涵蓋經期紊亂、痛經、圍絕期不適等。\n"
                    "頤安本草設獨立問診空間，保障私隱。\n\n"
                    f"{CTA}"
                ),
                "blog": {
                    "title": "胃脹噯氣與胸口灼熱：中焦氣滯與膽汁逆流的日常節奏",
                    "slug": "bloating-reflux-tcm",
                    "landing": "/blog/bloating-reflux-tcm.html",
                    "category": "內科調理",
                    "img_scene": (
                        "Light congee, steamed pumpkin, chamomile tea — gentle stomach soothing meal "
                        "on cream ceramic, vertical negative space. 16:10."
                    ),
                    "sections": [
                        {
                            "h2": "引言",
                            "paragraphs": [
                                "「食少少就脹」、「隔住衫都聽到嗚嗚聲」、「晚黑胸口火燒」——這三句是中環上班族常見的腸胃控訴。西醫可能診斷為功能性消化不良或胃食道逆流；中醫則常歸納為中焦氣滯、胃失和降，或兼肝鬱犯胃、膽汁上逆。",
                            ],
                        },
                        {
                            "h2": "氣滯為何引起灼熱感",
                            "paragraphs": [
                                "並非所有「火燒心」都是實火。長期壓力導致肝氣橫逆，木剋土而胃氣不降，胃酸與膽汁逆流，產生灼熱。此類患者或怕「清熱」過度，越清越虛。舌質偏紅但苔少，脈弦細，需疏肝和胃、降逆止嘔，而非單純苦寒制酸。",
                            ],
                        },
                        {
                            "h2": "與幽門螺桿菌、潰瘍的關係",
                            "paragraphs": [
                                "若灼熱伴隨體重下降、吞嚥困難、黑便，必須先接受西醫檢查。中醫調理適用於功能性問題或康復期輔助，不能代替內視鏡等診斷。",
                            ],
                        },
                        {
                            "h2": "飲食節奏建議",
                            "paragraphs": [
                                "細嚼慢嚥，正餐七分飽。晚餐與睡眠相隔至少三小時。暫避薄荷糖、過量咖啡、油炸與朱古力（個別人會加重逆流）。餐後散步十分鐘，避免立即平躺開會。",
                            ],
                        },
                        {
                            "h2": "針灸與方藥",
                            "paragraphs": [
                                "常取內關、足三里、中脘等穴調理。內服方向需辨證：肝胃不和、痰濕中阻、脾胃虛弱等各有差異。一般需持續數週，配合生活調整。",
                            ],
                        },
                        {
                            "h2": "常見問題",
                            "paragraphs": [
                                "問：可飲梳打水？答：暫時中和胃酸，不治本，不宜依賴。",
                                "問：夜食是否元凶？答：頻繁夜食加重胃負擔，但根因仍要辨證。",
                                "問：與失眠有關嗎？答：胃不和則臥不安，可並見，需整體調理。",
                            ],
                        },
                    ],
                    "closing": f"胃脹逆流困擾持續，歡迎預約內科面診。{CTA}　{DISCLAIMER}",
                },
            },
        ],
    },
    {
        "label": "2026 年 9 月",
        "season": "白露 · 秋分 — 秋燥當令",
        "weeks": [
            {
                "w": 1, "pillar": "症狀科普", "topic": "換季鼻敏感",
                "landing": "/services/internal.html",
                "img_copy_hook": (
                    "Caption scenario: seasonal change — stuffy nose, runny nose; lung qi and nose as lung orifice; "
                    "allergic vs deficient constitution. "
                ),
                "img_scene": (
                    "Autumn commute flat lay: tissue box half-used, eucalyptus steam cup, dry leaves outside window, "
                    "light scarf — 一轉季就鼻塞流鼻水, September Hong Kong dry wind mood."
                ),
                "ig": (
                    "【一轉季就鼻塞流鼻水】\n"
                    "肺主氣司呼吸，鼻為肺竅。\n"
                    "過敏體質常兼脾肺氣虛或風邪伏肺。\n"
                    "先分清「敏」定「虛」。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
                "fb": (
                    "九月風乾，鼻敏感患者增多。\n\n"
                    "中醫調理著重補益脾肺、固表防風，急性發作期則疏風通竅。\n"
                    "與感冒不同，鼻敏感多反覆多年，需長期體質管理。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
            },
            {
                "w": 2, "pillar": "診所信任", "topic": "艾灸與無菌流程",
                "landing": "/services/moxibustion.html",
                "img_copy_hook": (
                    "Caption scenario: moxibustion suitability — cold-deficiency, pain, some gynaecology; "
                    "not for yin-deficiency fire; clinic ventilation, duration individualized. "
                ),
                "img_scene": (
                    "Well-ventilated treatment room: moxa stick on holder, open window crack, smoke wisp controlled, "
                    "clean linen — 艾灸幾時最啱 professional safety, not越燙越好."
                ),
                "ig": (
                    "【艾灸幾時最啱？】\n"
                    "虛寒、痛症、部分婦科可考慮；陰虛火旺則未必適合。\n"
                    "診所通風良好，單次時間因人而定。\n\n"
                    f"{CTA}"
                ),
                "fb": (
                    "艾灸是溫通經絡的外治法，並非「越燙越好」。\n\n"
                    "伍醫師會評估皮膚狀況、體質與當日症狀，決定穴位與時長。\n"
                    "詳見官網艾灸專頁。\n\n"
                    f"{CTA}"
                ),
                "blog": {
                    "title": "秋燥乾咳與咽乾：潤肺養陰不等於盲目「滋補」",
                    "slug": "autumn-dry-cough-tcm",
                    "landing": "/blog/autumn-dry-cough-tcm.html",
                    "category": "內科調理",
                    "img_scene": (
                        "Steamed pear with fritillaria bulb ingredients, lily petals, honey drizzle on cream plate. "
                        "Autumn lung moistening editorial. 16:10."
                    ),
                    "sections": [
                        {
                            "h2": "引言",
                            "paragraphs": [
                                "秋分後空氣轉乾，不少人夜間乾咳無痰、喉嚨如砂紙。這在中醫多歸於燥邪傷肺、肺陰不足；但亦有人痰黏難咯，屬燥痰互結。潤肺是方向，卻不能一概用滋膩之品，否則碍胃生濕。",
                            ],
                        },
                        {
                            "h2": "乾咳的幾種常見證型",
                            "paragraphs": [
                                "肺陰虛：乾咳少痰、午後微熱、舌紅少苔。燥邪傷肺：起病於換季，咽乾鼻燥。痰熱鬱肺：咳痰黃黏，仍要清化而非單純滋陰。肺脾氣虛：咳聲低微、易感冒、神疲。四者用藥迥異。",
                            ],
                        },
                        {
                            "h2": "與鼻敏感、胃食道逆流的交叉",
                            "paragraphs": [
                                "鼻後滴漏可刺激咽喉引起乾咳；胃酸逆流亦可在平躺時咳嗽。若同時有鼻塞、火燒心，需多靶點調理。記錄咳嗽發作時間（日間/夜間/餐後）有助辨證。",
                            ],
                        },
                        {
                            "h2": "飲食與環境",
                            "paragraphs": [
                                "室內濕度維持舒適，避免過度開燥熱冷氣。梨、百合、銀耳可入膳，但糖尿病與脾虛便溏者需節制。辛辣烧烤、烈酒加重燥熱。",
                            ],
                        },
                        {
                            "h2": "調理與預期",
                            "paragraphs": [
                                "常用沙參麥冬、清燥救肺湯等方向加減，配合穴位如太淵、列缺。秋燥咳嗽或需整季調理，並視冬天是否復發評估療程。",
                            ],
                        },
                        {
                            "h2": "常見問題",
                            "paragraphs": [
                                "問：川貝炖雪梨人人啱？答：風寒咳嗽、痰白清稀者不宜。",
                                "問：要戒口幾耐？答：視證型，急性期宜清淡。",
                                "問：會轉肺炎嗎？答：若高燒、胸痛、呼吸急促，請即西醫。",
                            ],
                        },
                    ],
                    "closing": f"乾咳遷延不癒，建議預約內科面診。{CTA}　{DISCLAIMER}",
                },
            },
            {
                "w": 3, "pillar": "季節養生", "topic": "秋分潤燥湯水靈感",
                "landing": "/blog/",
                "img_copy_hook": (
                    "Caption scenario: autumn equinox soup ideas — adenophora, polygonatum, white fungus lily; "
                    "damp-spleen types must clear damp before moistening; soup not prescription. "
                ),
                "img_scene": (
                    "Home kitchen prep: pear, lily bulb, white fungus, lotus seeds laid out for soup — "
                    "秋分湯水靈感, gentle moistening ingredients, not yet cooked chaos."
                ),
                "ig": (
                    "【秋分湯水靈感】\n"
                    "沙參玉竹、銀耳百合——偏滋陰潤燥。\n"
                    "脾虛濕重者先祛濕再潤。\n"
                    "湯水不能代替辨證處方。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
                "fb": (
                    "秋分養生關鍵在「潤」。\n\n"
                    "建議由簡入繁：先調整睡眠與飲水，再考慮湯水。\n"
                    "若有糖尿病、腎病，入膳前請諮詢主診醫師。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
            },
            {
                "w": 4, "pillar": "轉化導向", "topic": "拔罐注意事項",
                "landing": "/services/cupping.html",
                "img_copy_hook": (
                    "Caption scenario: after cupping — keep warm 4 hours, avoid cold shower; "
                    "bruise depth not equal toxin; registered TCM assesses suitability. "
                ),
                "img_scene": (
                    "Patient leaving clinic wrapped in cream scarf, cupping jars sterilizing on tray behind, "
                    "autumn breeze blocked by door — 拔罐後保暖 aftercare story, no cupping marks on skin."
                ),
                "ig": (
                    "【拔罐後記得保暖】\n"
                    "痧色深淺不等於「濕毒多寡」。\n"
                    "四小時內避風寒、勿洗冷水澡。\n"
                    "由註冊中醫判斷是否適合。\n\n"
                    f"{CTA}"
                ),
                "fb": (
                    "拔罐是常見外治，但並非人人適合。\n\n"
                    "皮膚破損、出血傾向、極度虛弱者需謹慎。\n"
                    "想了解是否適合您，請先面診評估。\n\n"
                    f"{CTA}"
                ),
            },
        ],
    },
    {
        "label": "2026 年 10 月",
        "season": "寒露 · 霜降 — 深秋養陰",
        "weeks": [
            {
                "w": 1, "pillar": "症狀科普", "topic": "咬肌緊繃與頭痛",
                "landing": "/services/pain.html",
                "img_copy_hook": (
                    "Caption scenario: stress clenching jaw, headache from neck; TMJ tension; "
                    "office deadline pressure, tuina/acupuncture after assessment. "
                ),
                "img_scene": (
                    "Central office desk night: hand massaging temple, stress ball crushed, laptop glow, "
                    "half-empty coffee — 牙關緊頭痛 deadline mood, ergonomic chair blur."
                ),
                "ig": (
                    "【壓力大時牙關緊？頭痛由頸起？】\n"
                    "長期咬牙、夜磨牙，氣血瘀滯於少陽、陽明。\n"
                    "可伴顳顎不適、偏頭痛。\n"
                    "推拿針灸需評估後進行。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
                "fb": (
                    "「成日頭赤赤、咬實牙關」——未必純粹係頸緊。\n\n"
                    "中醫從肝鬱氣滯、經絡不通理解顳顎緊繃，常與壓力、睡眠相關。\n"
                    "若張口受限或關節聲響，建議同步口腔顳顎評估。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
            },
            {
                "w": 2, "pillar": "診所信任", "topic": "英文問診服務",
                "landing": "/en/",
                "img_copy_hook": (
                    "Caption scenario: expats welcome — English consult available in Central, "
                    "book via oakvilles.com/en/ or WhatsApp, registered practitioner 003769. "
                ),
                "img_scene": (
                    "International professional in Central lobby: laptop showing blurred EN website, "
                    "teacup, IFC/Central glass towers bokeh — English consult welcome, cosmopolitan."
                ),
                "ig": (
                    "【Expats & English consult welcome】\n"
                    "中環國際客群 · 英文溝通可預約備註\n"
                    "Website: oakvilles.com/en/\n\n"
                    "WhatsApp 6734 9532"
                ),
                "fb": (
                    "Oakville Wellness welcomes English-speaking patients in Central.\n\n"
                    "Book via website (EN) or WhatsApp 6734 9532.\n"
                    "Registered TCM practitioner No. 003769 — Dr. Ng Hau Jun.\n\n"
                    "oakvilles.com/en/"
                ),
                "blog": {
                    "title": "反覆感冒與畏寒：衛氣不足的日常「防線」怎樣建立",
                    "slug": "recurrent-colds-wei-qi-tcm",
                    "landing": "/blog/recurrent-colds-wei-qi-tcm.html",
                    "category": "內科調理",
                    "img_scene": (
                        "Immune wellness: astragalus root slices, goji, warm scarf on chair, "
                        "autumn leaves outside window. Defensive qi mood. 16:10."
                    ),
                    "sections": [
                        {
                            "h2": "引言",
                            "paragraphs": [
                                "「一個月感冒三次」並非誇張。反覆上呼吸道感染，西醫關注免疫與病毒變異；中醫則常從肺脾氣虛、衛氣不固理解——衛氣猶如身體的「邊防」，虛則外邪易侵。",
                            ],
                        },
                        {
                            "h2": "衛氣不固的表現",
                            "paragraphs": [
                                "怕風怕冷、易汗出、感冒後遷延不癒、聲音低微、反覆咽痛。舌淡苔薄，脈細弱。與「過敏性鼻炎」有交集，但感冒通常伴全身痠痛發熱。",
                            ],
                        },
                        {
                            "h2": "不是越「補」越好",
                            "paragraphs": [
                                "急性發熱期忌大補，以免閉門留寇。應先解表或清解，待邪退後再健脾益氣、固表御風。玉屏風散方向常用，但需辨明是否有陰虛內熱。",
                            ],
                        },
                        {
                            "h2": "辦公室防線",
                            "paragraphs": [
                                "冷氣口避免直吹後頸。勤洗手，但不必過度消毒破壞皮膚屏障。適度戶外日照與步行。睡眠七小時為底線。",
                            ],
                        },
                        {
                            "h2": "調理節奏",
                            "paragraphs": [
                                "常於秋冬交接開始預防性調理，歷時一至三月。可配合艾灸足三里、大椎（視體質）。效果因人而異。",
                            ],
                        },
                        {
                            "h2": "常見問題",
                            "paragraphs": [
                                "問：打流感針還要看中醫嗎？答：可互補，接種後若不適請告知醫師。",
                                "問：靈芝孢子能否增免疫？答：視體質，需專業判斷。",
                                "問：小孩可否調理？答：本診所主要服務成人，兒科請洽專科。",
                            ],
                        },
                    ],
                    "closing": f"若反覆感冒影響工作，可預約內科體質評估。{CTA}　{DISCLAIMER}",
                },
            },
            {
                "w": 3, "pillar": "季節養生", "topic": "寒露泡腳宜忌",
                "landing": "/blog/",
                "img_copy_hook": (
                    "Caption scenario: Cold Dew foot soak ~40°C, 15–20 min light sweat; "
                    "caution for diabetic foot, skin breaks, pregnancy. "
                ),
                "img_scene": (
                    "Wooden basin foot soak with thermometer prop at 40°C, ginger slices, mugwort, "
                    "timer showing 15 min — 寒露泡腳宜忌 educational, cozy evening home."
                ),
                "ig": (
                    "【寒露泡腳，水溫約40°C】\n"
                    "時間15–20分鐘，微汗即止。\n"
                    "糖尿病足、皮膚破損、孕婦慎用。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
                "fb": (
                    "寒露後夜涼，泡腳助陽散寒。\n\n"
                    "但心臟病、高血壓、靜脈曲張患者需醫囑；水溫過高反耗氣。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
            },
            {
                "w": 4, "pillar": "轉化導向", "topic": "推拿專科",
                "landing": "/services/pain.html",
                "img_copy_hook": (
                    "Caption scenario: tuina not越痛越好 — neck shoulder back pain, assess first; "
                    "avoid acute sprain, fever, skin breaks; Central office workers. "
                ),
                "img_scene": (
                    "Gentle tuina room: therapist hands on shoulder through towel (no face), calm pressure implied, "
                    "cream oils, soft light — 推拿唔係越痛越好, professional Central pain relief."
                ),
                "ig": (
                    "【推拿唔係越痛越好】\n"
                    "中環辦公室肩頸腰背，先評估再手法。\n"
                    "急性扭傷、發燒、皮膚破損不宜。\n\n"
                    f"{CTA}"
                ),
                "fb": (
                    "推拿可舒緩肌肉緊繃，但需排除骨折、腫瘤、急性炎症。\n"
                    "頤安本草由註冊中醫評估後施術。\n\n"
                    f"{CTA}"
                ),
                "blog": {
                    "title": "久坐下肢沉重與麻木：氣滯血瘀的辦公室體質",
                    "slug": "sedentary-leg-heaviness-tcm",
                    "landing": "/blog/sedentary-leg-heaviness-tcm.html",
                    "category": "痛症調理",
                    "img_scene": (
                        "Office worker legs elevated on stool stretch, compression socks beside herbal tea, "
                        "Central tower view. Circulation wellness editorial. 16:10."
                    ),
                    "sections": [
                        {
                            "h2": "引言",
                            "paragraphs": [
                                "下午三點，雙腿像灌鉛；站起時麻木刺痛——這是中環久坐族的日常。西醫警惕深靜脈血栓與腰椎問題；中醫則常從氣滯血瘀、脾虛濕困、肝腎不足論述，強調「久坐傷肉」、「久視傷血」。",
                            ],
                        },
                        {
                            "h2": "為何下午更嚴重",
                            "paragraphs": [
                                "午後陽氣漸衰，氣機運行減弱；若上午已久坐少動，氣血更易瘀滯於下焦。兼見腹脹、大便黏滯者，多濕困；伴腰酸耳鳴者，偏腎虛。",
                            ],
                        },
                        {
                            "h2": "與坐骨神經痛的區分",
                            "paragraphs": [
                                "坐骨神經痛多有明確放射路徑與誘發姿勢；單純下肢沉重或為循環與肌筋膜問題。若單腿腫脹發熱、突然劇痛，請即排除血栓。",
                            ],
                        },
                        {
                            "h2": "辦公室微運動",
                            "paragraphs": [
                                "每四十五分鐘起身兩分鐘：踝泵、屈膝、扶牆拉伸小腿。避免蹺腳久坐。椅面加墊令膝略低於髖。",
                            ],
                        },
                        {
                            "h2": "中醫介入",
                            "paragraphs": [
                                "常用活血通絡、健脾化濕、補益肝腎等方向，配合針灸環跳、陽陵泉、足三里。需持續配合運動，否則易復發。",
                            ],
                        },
                        {
                            "h2": "常見問題",
                            "paragraphs": [
                                "問：穿壓力襪有幫助嗎？答：視靜脈功能而定，可諮詢醫師。",
                                "問：泡腳可解決？答：輔助溫通，不能代替辨證治療。",
                                "問：與減肥有關嗎？答：肥胖加重負擔，但非唯一因素。",
                            ],
                        },
                    ],
                    "closing": f"下肢沉重麻木持續，建議預約痛症評估。{CTA}　{DISCLAIMER}",
                },
            },
        ],
    },
    {
        "label": "2026 年 11 月",
        "season": "立冬 · 小雪 — 冬令養藏",
        "weeks": [
            {
                "w": 1, "pillar": "症狀科普", "topic": "膝蓋畏冷",
                "landing": "/services/pain.html",
                "img_copy_hook": (
                    "Caption scenario: rainy day knee ache and cold intolerance; "
                    "keep warm, gentle movement, TCM cold-damp or kidney-yang patterns. "
                ),
                "img_scene": (
                    "Rain-streaked Hong Kong window, wool knee warmer on chair, umbrella dripping by door, "
                    "ginger tea steam — 一落雨膝頭就痛 damp cold day, relatable elder or office worker props only."
                ),
                "ig": (
                    "【一落雨膝頭就痛？】\n"
                    "寒邪侵襲、氣血運行不暢，或本有腎陽不足。\n"
                    "保暖、適度活動，勿完全靜止。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
                "fb": (
                    "膝關節畏冷酸痛，在濕冷天氣特別明顯。\n\n"
                    "中醫或從腎陽虛衰、寒濕痹阻辨證，治則溫經散寒、補益肝腎。\n"
                    "若關節紅腫熱痛，需排除痛風、類風濕。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
            },
            {
                "w": 2, "pillar": "診所信任", "topic": "中藥與西藥間隔",
                "landing": "/faq.html",
                "img_copy_hook": (
                    "Caption scenario: combining Chinese and Western meds — bring all prescriptions, "
                    "typical 1–2 hour gap, doctor decides; see FAQ. "
                ),
                "img_scene": (
                    "Clinic reception counter: patient medicine bag with western pill boxes beside herbal sachets, "
                    "clock showing 2-hour gap, FAQ leaflet blur — 中西藥間隔 safety story."
                ),
                "ig": (
                    "【中西藥可否同時？】\n"
                    "請主動出示所有藥單。\n"
                    "常見需間隔一至兩小時，視藥物而定。\n"
                    "FAQ 頁有更多說明。\n\n"
                    f"{CTA}"
                ),
                "fb": (
                    "合併用藥安全至關重要。\n\n"
                    "初診請帶備西藥清單；伍醫師會評估是否適合中藥介入及如何間隔服用。\n"
                    "切勿自行停藥。\n\n"
                    f"{CTA}"
                ),
                "blog": {
                    "title": "痛經有血塊與色暗：寒凝、瘀滯與溫通思路",
                    "slug": "dysmenorrhea-blood-clots-tcm",
                    "landing": "/blog/dysmenorrhea-blood-clots-tcm.html",
                    "category": "婦科調理",
                    "img_scene": (
                        "Warm womb wellness: hot water bottle wrapped in knit, rose ginger tea, "
                        "cyclical moon ceramic dish. Feminine comfort editorial. 16:10."
                    ),
                    "sections": [
                        {
                            "h2": "引言",
                            "paragraphs": [
                                "經血中有血塊、色暗、伴隨劇烈絞痛，許多女性以為「正常」。中醫視為「瘀」的表現，常因寒凝胞宮、氣滯血瘀、或陽虛內寒，經血運行不暢而凝滯。",
                            ],
                        },
                        {
                            "h2": "寒凝與熱瘀的差異",
                            "paragraphs": [
                                "寒凝：得熱痛減、肢冷、血塊色暗、量少。熱瘀：經前乳房脹痛明顯、經血塊多且色偏暗紅、口乾。兩者溫通與清熱方向相反，誤治可加重。",
                            ],
                        },
                        {
                            "h2": "與子宮肌瘤、內異症",
                            "paragraphs": [
                                "進行性痛經、經量突增，應先婦科超聲波檢查。中醫調理可作輔助，但不能代替診斷。",
                            ],
                        },
                        {
                            "h2": "經期自我照護",
                            "paragraphs": [
                                "經前一周避生冷、游泳。可溫敷下腹，不宜過燙。適度散步助氣血運行，劇烈運動暫停。",
                            ],
                        },
                        {
                            "h2": "調理方向",
                            "paragraphs": [
                                "寒凝常用溫經散寒、活血通經；氣滯宜疏肝理氣。可能配合艾灸關元、氣海。通常需調理三至六個週期觀察。",
                            ],
                        },
                        {
                            "h2": "常見問題",
                            "paragraphs": [
                                "問：食紅糖可解痛嗎？答：僅適用寒證輕症。",
                                "問：布洛芬與中藥？答：告知醫師，評估間隔。",
                                "問：備孕可否調理？答：可以，但需明確告知計劃。",
                            ],
                        },
                    ],
                    "closing": f"痛經影響日常，可預約婦科面診。{CTA}　{DISCLAIMER}",
                },
            },
            {
                "w": 3, "pillar": "季節養生", "topic": "小雪溫補雞湯辨證",
                "landing": "/blog/",
                "img_copy_hook": (
                    "Caption scenario: Minor Snow tonic soup — astragalus/yam for qi deficiency, "
                    "adenophora for yin; pause tonics if fever/cold; know constitution first. "
                ),
                "img_scene": (
                    "Kitchen choice scene: two soup pots implied — qi tonic herbs vs yin moistening herbs labeled by "
                    "visual only (roots vs lily), 小雪湯水先問體質 before boiling."
                ),
                "ig": (
                    "【小雪湯水，先問體質】\n"
                    "氣虛可黃芪、淮山；陰虛宜沙參玉竹。\n"
                    "感冒發熱期暫停進補。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
                "fb": (
                    "「冬令進補」前，請先弄清自己需要氣、血、陰、陽哪方面支援。\n\n"
                    "錯誤進補可致口瘡、失眠、血壓波動。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
            },
            {
                "w": 4, "pillar": "轉化導向", "topic": "覆診調方",
                "landing": "/process.html",
                "img_copy_hook": (
                    "Caption scenario: why follow-up — symptoms change so formula changes; "
                    "typically 1–2 weeks revisit; do not extend same prescription indefinitely. "
                ),
                "img_scene": (
                    "Consultation desk: old herbal bag crossed out softly, fresh bag beside symptom journal "
                    "(dots not text), calendar with revisit circled — 點解要覆診調方 continuity."
                ),
                "ig": (
                    "【點解要覆診？】\n"
                    "症狀變化，方藥亦要調整。\n"
                    "一般建議一至兩週覆診一次（視病情）。\n\n"
                    f"{CTA}"
                ),
                "fb": (
                    "中醫調理是動態過程。\n\n"
                    "初次處方後，伍醫師會建議覆診時間，觀察睡眠、二便、症狀強度再調整。\n"
                    "請勿自行長期沿用同一處方而不覆診。\n\n"
                    f"{CTA}"
                ),
                "blog": {
                    "title": "圍絕期烘熱盜汗：陰虛火旺的調護節奏",
                    "slug": "menopause-hot-flashes-tcm",
                    "landing": "/blog/menopause-hot-flashes-tcm.html",
                    "category": "婦科調理",
                    "img_scene": (
                        "Cooling yin wellness: chrysanthemum tea, silk fan, lotus seed soup on celadon. "
                        "Menopause balance editorial, dignified mood. 16:10."
                    ),
                    "sections": [
                        {
                            "h2": "引言",
                            "paragraphs": [
                                "突然一陣熱流上湧、面紅出汗、夜間盜汗——圍絕期常見，西醫與荷爾蒙波動相關；中醫多歸陰虛火旺、肝腎陰虧，虛火內擾。",
                            ],
                        },
                        {
                            "h2": "陰虛火旺的特徵",
                            "paragraphs": [
                                "烘熱盜汗、心悸失眠、口乾咽燥、大便偏乾、舌紅少苔。情緒易怒或焦慮。與「陽虛畏寒」截然不同，忌用大辛大熱。",
                            ],
                        },
                        {
                            "h2": "與甲亢、感染發熱鑑別",
                            "paragraphs": [
                                "若體重下降、手抖、心悸明顯，應驗甲狀腺功能。夜汗亦需排除結核等。",
                            ],
                        },
                        {
                            "h2": "生活調護",
                            "paragraphs": [
                                "避辛辣酒精咖啡。臥室涼爽通風。練習緩慢腹式呼吸。黃豆製品適量，但不宜神化為「唯一解法」。",
                            ],
                        },
                        {
                            "h2": "中醫調理",
                            "paragraphs": [
                                "常用知柏地黃丸方向、清骨散等加減，配合滋陰安神穴位。療程可能跨越數月，需定期覆診。",
                            ],
                        },
                        {
                            "h2": "常見問題",
                            "paragraphs": [
                                "問：大豆異黃酮補充劑？答：諮詢主診，勿與中藥重複不明成分。",
                                "問：可艾灸嗎？答：陰虛火旺者通常不宜溫灸大劑量。",
                                "問：情緒低落正常嗎？答：荷爾蒙波動可影響情緒，嚴重請求心理支援。",
                            ],
                        },
                    ],
                    "closing": f"圍絕期不適可預約婦科私密問診。{CTA}　{DISCLAIMER}",
                },
            },
        ],
    },
    {
        "label": "2026 年 12 月",
        "season": "大雪 · 冬至 — 歲末養藏",
        "weeks": [
            {
                "w": 1, "pillar": "症狀科普", "topic": "年終偏頭痛",
                "landing": "/services/pain.html",
                "img_copy_hook": (
                    "Caption scenario: year-end migraine surge — stress, poor sleep, neck tension; "
                    "track triggers; seek emergency if sudden severe headache with vomiting. "
                ),
                "img_scene": (
                    "December office late night: monitor light on tired desk, peppermint tea, cool compress cloth, "
                    "stacked project folders — 年終頭痛爆煲 deadline stress, no people."
                ),
                "ig": (
                    "【年終頭痛爆煲？】\n"
                    "壓力、睡眠不足、頸肩緊 → 肝陽上亢或氣血瘀滯。\n"
                    "先記錄誘發因素，面診時一併告知。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
                "fb": (
                    "十二月項目deadline集中，偏頭痛、緊張性頭痛求診增多。\n\n"
                    "中醫從肝陽、痰濕、血瘀等辨證，可能配合針灸與放鬆。\n"
                    "若突發劇烈頭痛伴嘔吐、視力模糊，請即急症。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
            },
            {
                "w": 2, "pillar": "診所信任", "topic": "週六應診安排",
                "landing": "/news/saturday-hours-2026.html",
                "img_copy_hook": (
                    "Caption scenario: Saturday clinic 10:30–17:30 for workers who cannot leave weekday; "
                    "book WhatsApp early, check public holiday notice on website. "
                ),
                "img_scene": (
                    "Saturday morning Central: professional with tote bag entering office tower elevator hall, "
                    "soft sun, weekend calm — 週六都睇診 for 平日難請假上班族."
                ),
                "ig": (
                    "【週六都睇診】\n"
                    "10:30–17:30（公眾假期除外）\n"
                    "適合平日難請假嘅上班族。\n"
                    "建議提早 WhatsApp 預約。\n\n"
                    f"{CTA}"
                ),
                "fb": (
                    "未能平日到訪？頤安本草週六應診 10:30–17:30。\n\n"
                    "詳見官網公告頁了解公眾假期安排。\n\n"
                    f"{CTA}"
                ),
                "blog": {
                    "title": "冬季情志低落與食欲改變：養藏時節的中醫養神",
                    "slug": "winter-low-mood-tcm",
                    "landing": "/blog/winter-low-mood-tcm.html",
                    "category": "內科調理",
                    "img_scene": (
                        "Winter light therapy mood: soft daylight lamp, journal, warm tea, pine branch. "
                        "Seasonal affective wellness editorial. 16:10."
                    ),
                    "sections": [
                        {
                            "h2": "引言",
                            "paragraphs": [
                                "日照變短、年終壓力疊加，有人感到情緒低落、嗜睡、食欲增加或失去興趣。嚴重者需心理或精神科支援；輕中度者，中醫從「冬藏」、腎主志、心主神明理解，強調陽氣內守、精神內斂。",
                            ],
                        },
                        {
                            "h2": "冬季情志與臟腑",
                            "paragraphs": [
                                "腎藏志，冬令腎氣當令；若腎陽不足，可見精神萎靡、畏寒。肝鬱則情緒壓抑、胸悶嘆息。心脾兩虛則多思多慮、失眠健忘。辨證不同，治則各異。",
                            ],
                        },
                        {
                            "h2": "與抑鬱症的界線",
                            "paragraphs": [
                                "若持續兩週以上嚴重影響工作、出現自傷念頭，請立即尋求專業心理精神服務。中醫調理可作輔助，不能代替。",
                            ],
                        },
                        {
                            "h2": "日光與運動",
                            "paragraphs": [
                                "午休戶外步行十五分鐘，接觸自然光。每週兩次溫和運動，如太極、快走。避免整夜不睡趕工。",
                            ],
                        },
                        {
                            "h2": "中醫養神",
                            "paragraphs": [
                                "可能用溫腎陽、疏肝解鬱、補心脾等方向；針灸神門、印堂、太衝等。配合規律作息，效果因人而異。",
                            ],
                        },
                        {
                            "h2": "常見問題",
                            "paragraphs": [
                                "問：飲咖啡提神好嗎？答：短期有效，長期可能加重失眠焦慮。",
                                "問：與失眠分型有關嗎？答：可並見，需整體辨證（參考專欄另文）。",
                                "問：家人點樣支持？答：陪伴傾訴，勿指責「想太多」。",
                            ],
                        },
                    ],
                    "closing": f"情緒與睡眠困擾，歡迎預約內科面診。{CTA}　{DISCLAIMER}",
                },
            },
            {
                "w": 3, "pillar": "季節養生", "topic": "冬至飲食節氣",
                "landing": "/blog/",
                "img_copy_hook": (
                    "Caption scenario: winter solstice tang yuan reunion — glutinous rice hard to digest, "
                    "weak spleen eat less; lamb tonic depends on constitution, yin-fire caution. "
                ),
                "img_scene": (
                    "Family table small portion: few tang yuan in clear soup, ginger tea, empty chairs soft blur — "
                    "冬至飲食有度, festive but mindful digestion."
                ),
                "ig": (
                    "【冬至團圓，飲食有度】\n"
                    "糯米難消化，脾胃弱者少食。\n"
                    "羊肉溫補視體質，陰虛火旺慎用。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
                "fb": (
                    "冬至食習俗承載文化，亦要顧及腸胃負擔。\n\n"
                    "大餐後若胃脹失眠，下一餐宜清淡溫軟。\n\n"
                    f"{CTA}\n{DISCLAIMER}"
                ),
            },
            {
                "w": 4, "pillar": "轉化導向", "topic": "新春前體質梳理",
                "landing": "/contact.html",
                "img_copy_hook": (
                    "Caption scenario: before Lunar New Year pick ONE main concern (sleep, gut, pain), "
                    "book early December slots tight, WhatsApp 6734 9532. "
                ),
                "img_scene": (
                    "December planner: one circled wellness goal sticky (icon only), phone showing green chat app "
                    "(no readable text), pine and red seal festive accent — 新年前先梳理體質 book early."
                ),
                "ig": (
                    "【新年前，先梳理體質】\n"
                    "睡眠、腸胃、痛症——揀一項最困擾的先處理。\n"
                    "歲末檔期緊張，請提早預約。\n\n"
                    f"{CTA}"
                ),
                "fb": (
                    "農曆新年前，不少人想「調好身體過年」。\n\n"
                    "建議鎖定一項最影響生活的困擾，預約面診評估；避免一次過提出過多目標。\n"
                    "12 月檔期建議提早一周 WhatsApp 預約。\n\n"
                    f"{CTA}"
                ),
                "blog": {
                    "title": "陪長輩初次看中医：家屬該準備什麼、常見疑問有哪些",
                    "slug": "bringing-parents-first-tcm-visit",
                    "landing": "/blog/bringing-parents-first-tcm-visit.html",
                    "category": "就診指南",
                    "img_scene": (
                        "Intergenerational care: two teacups, walking shoes, clinic direction card "
                        "without text, warm cream tones. Family support mood. 16:10."
                    ),
                    "sections": [
                        {
                            "h2": "引言",
                            "paragraphs": [
                                "年終假期，不少子女想帶父母看中醫調理，卻擔心流程不熟、語言溝通或老人抗拒。本文整理實用陪診清單，幫助家人順利完成首次到訪（非醫療建議，僅行政與溝通參考）。",
                            ],
                        },
                        {
                            "h2": "出發前準備清單",
                            "paragraphs": [
                                "① 近期西醫報告、藥單、過敏史。② 主訴整理：最常困擾的三個症狀、持續多久、日夜差異。③ 交通：中環錦安大廈 6 樓，上環站 E2 步行約 3–5 分鐘。④ 預約：官網或 WhatsApp 6734 9532，註明長者行動是否需要協助。",
                            ],
                        },
                        {
                            "h2": "當日會發生什麼",
                            "paragraphs": [
                                "登記 → 候診（獨立區域）→ 問診望聞問切（約 20–30 分鐘）→ 醫師解釋辨證與建議 → 決定是否取藥／針灸。診金與藥費分開列明，可先於官網「流程收費」了解框架。",
                            ],
                        },
                        {
                            "h2": "長輩常問的三個問題",
                            "paragraphs": [
                                "「要煲藥嗎？」——可選顆粒或煎煮，視病情與生活能力。 「會否同西藥衝突？」——請帶齊藥單，由醫師評估。 「幾時好？」——慢性病需療程，急性症狀進展較快，但仍因人而異。",
                            ],
                        },
                        {
                            "h2": "子女如何有效陪伴",
                            "paragraphs": [
                                "避免代替長輩回答所有細節，除非記憶力明顯衰退。讓醫師直接觀察長輩氣色與語音。尊重長輩意願，不強迫治療。會後協助記錄服用方法與覆診日期。",
                            ],
                        },
                        {
                            "h2": "常見問題",
                            "paragraphs": [
                                "問：可代家人諮詢嗎？答：初診需本人到場望聞問切。",
                                "問：輪椅方便嗎？答：大廈有升降機，請預約時告知。",
                                "問：英文服務？答：可預約備註，見英文站 oakvilles.com/en/。",
                            ],
                        },
                    ],
                    "closing": f"歡迎為家人預約首次到訪。{CTA}　{DISCLAIMER}",
                },
            },
        ],
    },
]
