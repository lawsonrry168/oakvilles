/* ============================================================
   頤安本草 · 站點設定（全站共用）
   填入 SITE_GA4_ID 後即啟用 Google Analytics 4
   ============================================================ */

window.SITE_URL = 'https://oakvilles.com';

/** GA4 Measurement ID — 例：G-XXXXXXXXXX；留空仍會 push dataLayer 事件供 GTM 使用 */
window.SITE_GA4_ID = '';

window.SITE_ORG = {
  '@type': 'MedicalBusiness',
  '@id': 'https://oakvilles.com/#organization',
  name: '頤安本草 · 伍厚臻中醫師',
  alternateName: 'Oakville Wellness',
  url: 'https://oakvilles.com/',
  telephone: '+852-2881-8182',
  image: 'https://oakvilles.com/images/shop-8.jpeg',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '皇后大道中 176A–176F 號錦安大廈 6 樓 602 室',
    addressLocality: '中環',
    addressRegion: '香港',
    addressCountry: 'HK'
  },
  sameAs: [
    'https://www.instagram.com/oakville.wellness/',
    'https://www.facebook.com/oakvillewellness'
  ]
};

window.SITE_PHYSICIAN = {
  '@type': 'Physician',
  name: '伍厚臻',
  jobTitle: '註冊中醫師',
  identifier: '003769',
  worksFor: { '@id': 'https://oakvilles.com/#organization' }
};
