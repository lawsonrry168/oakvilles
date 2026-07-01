/* ============================================================
   頤安本草 · 結構化資料 manifest（依 pathname 注入 JSON-LD）
   ============================================================ */

(function () {
  var org = { '@id': 'https://oakvilles.com/#organization' };
  var physician = window.SITE_PHYSICIAN;

  function webPage(path, title, description) {
    return {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': 'https://oakvilles.com' + path + '#webpage',
      url: 'https://oakvilles.com' + path,
      name: title,
      description: description,
      isPartOf: org,
      about: org,
      inLanguage: 'zh-HK'
    };
  }

  function medicalPage(path, title, description, specialty) {
    return {
      '@context': 'https://schema.org',
      '@type': 'MedicalWebPage',
      '@id': 'https://oakvilles.com' + path + '#webpage',
      url: 'https://oakvilles.com' + path,
      name: title,
      description: description,
      isPartOf: org,
      about: org,
      lastReviewed: '2026-06-01',
      inLanguage: 'zh-HK',
      medicalAudience: { '@type': 'MedicalAudience', audienceType: 'Patient' },
      specialty: specialty || 'Traditional Chinese Medicine'
    };
  }

  function article(path, title, description, datePublished, imagePath) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      '@id': 'https://oakvilles.com' + path + '#article',
      headline: title,
      description: description,
      url: 'https://oakvilles.com' + path,
      datePublished: datePublished,
      dateModified: datePublished,
      author: physician,
      publisher: org,
      image: 'https://oakvilles.com/images/' + (imagePath || 'og/og-default.png'),
      inLanguage: 'zh-HK',
      isPartOf: { '@id': 'https://oakvilles.com/blog/#collection' }
    };
  }

  function newsArticle(path, title, description, datePublished) {
    return {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      '@id': 'https://oakvilles.com' + path + '#article',
      headline: title,
      description: description,
      url: 'https://oakvilles.com' + path,
      datePublished: datePublished,
      dateModified: datePublished,
      author: physician,
      publisher: org,
      inLanguage: 'zh-HK'
    };
  }

  window.SITE_SCHEMA_BY_PATH = {
    '/about.html': webPage('/about.html', '關於伍厚臻中醫師', '伍厚臻中醫師資歷、醫道理念與二十五年臨床經驗。'),
    '/about/central-hk.html': webPage('/about/central-hk.html', '中環中醫診所 · 頤安本草', '伍厚臻中醫診所位於香港中環錦安大廈，交通便利，私隱度高。'),
    '/clinic.html': webPage('/clinic.html', '診所環境', '頤安本草中環診所候診區、診症室與治療空間一覽。'),
    '/services.html': medicalPage('/services.html', '診症專科總覽', '痛症、皮膚、婦科、內科及針灸中藥等中醫服務。'),
    '/process.html': webPage('/process.html', '診症流程與收費', '了解伍厚臻中醫師的診症流程、收費標準及預約政策。'),
    '/contact.html': webPage('/contact.html', '聯絡與預約', 'WhatsApp 或電話預約伍厚臻中醫師診症。'),
    '/services/pain.html': medicalPage('/services/pain.html', '中醫痛症治療', '針灸推拿治療頸椎痛、腰背痛、坐骨神經痛等痛症。', 'Pain Management'),
    '/services/skin.html': medicalPage('/services/skin.html', '中醫皮膚科', '暗瘡、濕疹、敏感的中醫內外調理。', 'Dermatology'),
    '/services/internal.html': medicalPage('/services/internal.html', '中醫內科調理', '失眠、腸胃、疲勞、免疫的中醫調理。', 'Internal Medicine'),
    '/services/gynaecology.html': medicalPage('/services/gynaecology.html', '中醫婦科調理', '月經、痛經、備孕、PCOS 的婦科中醫調理。', 'Gynecology'),
    '/services/acupuncture.html': medicalPage('/services/acupuncture.html', '針灸療法', '傳統針灸、美顏針及減肥針等療法。', 'Acupuncture'),
    '/services/herbs.html': medicalPage('/services/herbs.html', '中藥處方', '一人一方中藥煎劑與免煎顆粒沖劑。', 'Traditional Chinese Medicine'),
    '/services/moxibustion.html': medicalPage('/services/moxibustion.html', '艾灸療法', '溫通經絡、祛寒除濕的艾灸調理。', 'Acupuncture'),
    '/services/cupping.html': medicalPage('/services/cupping.html', '拔罐刮痧', '活血散瘀、舒筋活絡的拔罐刮痧療法。', 'Traditional Chinese Medicine'),
    '/blog': {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': 'https://oakvilles.com/blog/#collection',
      name: '養生專欄',
      description: '中醫養生知識與健康調理文章。',
      url: 'https://oakvilles.com/blog/',
      isPartOf: org,
      inLanguage: 'zh-HK'
    },
    '/news': {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': 'https://oakvilles.com/news/#collection',
      name: '最新消息',
      description: '頤安本草診所公告與營業資訊。',
      url: 'https://oakvilles.com/news/',
      isPartOf: org,
      inLanguage: 'zh-HK'
    },
    '/news/saturday-hours-2026.html': newsArticle('/news/saturday-hours-2026.html', '週六應診時間更新', '週六應診時間調整為 10:30–17:30。', '2026-06-01')
  };
})();
