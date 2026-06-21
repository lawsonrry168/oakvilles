/* ============================================================
   Oakville Wellness — shared behavior (dongfang.js)
   ============================================================ */

const LOCALE = (document.body && document.body.dataset.locale) || 'zh';
const UI_STR = {
  zh: {
    waGreetingLong: '您好，我想預約伍厚臻中醫師診症。請問近期還有檔期嗎？',
    waLegacy: ['您好，我想預約伍醫師診症。', '您好，我想預約伍厚臻中醫師診症。'],
    waFallbackTitle: 'WhatsApp 未能自動開啟',
    waFallbackText: '請點下方按鈕開啟對話，或複製預約內容後手動傳送至 <strong>6734 9532</strong>。',
    waOpen: '開啟 WhatsApp',
    waCopy: '複製預約內容',
    waCopied: '已複製 ✓',
    searchLabel: '全站搜尋',
    searchPlaceholder: '搜尋症狀、專科、文章…',
    searchEmpty: '找不到相關內容，請試其他關鍵字',
    menuOpen: '開啟選單',
    menuClose: '關閉選單',
    bookingHeader: '【頤安本草 · 預約申請】',
    name: '姓名',
    phone: '電話',
    service: '科別',
    date: '日期',
    time: '時段',
    notes: '備註'
  },
  en: {
    waGreetingLong: "Hello, I'd like to book an appointment with Dr. Ng Hau Chun. Are there any available slots soon?",
    waLegacy: ["Hello, I'd like to book an appointment with Dr. Ng.", "Hello, I'd like to book an appointment with Dr. Ng Hau Chun."],
    waFallbackTitle: 'Could not open WhatsApp',
    waFallbackText: 'Tap below to open the chat, or copy your message and send it manually to <strong>6734 9532</strong>.',
    waOpen: 'Open WhatsApp',
    waCopy: 'Copy message',
    waCopied: 'Copied ✓',
    searchLabel: 'Site search',
    searchPlaceholder: 'Search symptoms, services, articles…',
    searchEmpty: 'No results found. Try another keyword.',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    bookingHeader: '【Oakville Wellness · Booking request】',
    name: 'Name',
    phone: 'Phone',
    service: 'Service',
    date: 'Date',
    time: 'Time',
    notes: 'Notes'
  }
};
const UI = UI_STR[LOCALE] || UI_STR.zh;

window.SITE_WA = '85267349532';
window.SITE_WA_GREETING = UI.waGreetingLong;

window.waUrl = function (text) {
  return 'https://wa.me/' + window.SITE_WA + '?text=' + encodeURIComponent(text || window.SITE_WA_GREETING);
};

window.openWhatsApp = function (message, options) {
  options = options || {};
  const url = window.waUrl(message);
  let opened = false;
  try {
    const w = window.open(url, '_blank', 'noopener');
    opened = !!(w && !w.closed);
  } catch (e) { opened = false; }
  try { sessionStorage.setItem('df-last-booking', message); } catch (e) { /* ignore */ }
  if (!opened) showWaFallback(url, message, options.mount);
  return opened;
};

function showWaFallback(url, message, mount) {
  let box = document.getElementById('df-wa-fallback');
  if (!box) {
    box = document.createElement('div');
    box.id = 'df-wa-fallback';
    box.className = 'df-wa-fallback';
    box.setAttribute('role', 'alert');
    document.body.appendChild(box);
  }
  const safe = message.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  box.innerHTML =
    '<p class="df-wa-fallback__title">' + UI.waFallbackTitle + '</p>' +
    '<p class="df-wa-fallback__text">' + UI.waFallbackText + '</p>' +
    '<div class="df-wa-fallback__actions">' +
    '<a href="' + url + '" target="_blank" rel="noopener" class="df-btn df-btn--wa">' + UI.waOpen + '</a>' +
    '<button type="button" class="df-btn df-btn--ghost df-wa-fallback__copy">' + UI.waCopy + '</button>' +
    '</div>' +
    '<textarea class="df-wa-fallback__msg" readonly rows="5">' + safe + '</textarea>';
  box.querySelector('.df-wa-fallback__copy').addEventListener('click', function () {
    navigator.clipboard.writeText(message).then(function () {
      this.textContent = UI.waCopied;
    }.bind(this));
  });
  box.classList.add('open');
  if (mount) {
    mount.appendChild(box);
    box.classList.add('df-wa-fallback--inline');
  }
  box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function initWaChat() {
  document.querySelectorAll('a[href*="wa.me/' + window.SITE_WA + '"]').forEach(function (el) {
    try {
      const u = new URL(el.href);
      const text = u.searchParams.get('text') || '';
      if (!text || UI.waLegacy.indexOf(text) !== -1) {
        u.searchParams.set('text', window.SITE_WA_GREETING);
        el.href = u.toString();
      }
    } catch (e) { /* ignore malformed href */ }
  });
}

function normPath(p) {
  if (!p || p === '/' || p === '/index.html') return '/';
  let path = p.replace(/\/index\.html$/i, '').replace(/\/$/, '') || '/';
  if (path.startsWith('/en')) path = path.slice(3) || '/';
  return path;
}

function initPageSchema() {
  const map = window.SITE_SCHEMA_BY_PATH;
  if (!map) return;
  const path = normPath(location.pathname);
  if (path === '/') return;
  const lookup = map[path] || map[path + '/'] || map[path + '/index.html'];
  if (!lookup) return;
  if (document.querySelector('script[type="application/ld+json"]')) return;
  const el = document.createElement('script');
  el.type = 'application/ld+json';
  el.textContent = JSON.stringify(lookup);
  document.head.appendChild(el);
}

function gaEvent(name, params) {
  if (typeof gtag !== 'function') return;
  gtag('event', name, params || {});
}

function trackEvent(name, params) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(Object.assign({ event: name }, params || {}));
  gaEvent(name, params);
}

function initAnalytics() {
  window.dataLayer = window.dataLayer || [];

  const id = window.SITE_GA4_ID;
  if (id) {
    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);

    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', id, { anonymize_ip: true });
  }

  document.addEventListener('click', function (e) {
    const cta = e.target.closest('[data-cta-id]');
    if (cta) {
      trackEvent('cta_click', {
        cta_id: cta.getAttribute('data-cta-id'),
        element: cta.tagName.toLowerCase(),
        page_path: location.pathname
      });
    }
    const a = e.target.closest('a[href*="wa.me/"]');
    if (a) {
      trackEvent('whatsapp_click', {
        link_url: a.href,
        cta_id: a.getAttribute('data-cta-id') || '',
        page_path: location.pathname
      });
    }
  });

  document.addEventListener('submit', function (e) {
    if (e.target.matches('#appointment-form, .df-contact-form')) {
      trackEvent('booking_submit', {
        form_id: e.target.id || 'contact',
        page_path: location.pathname
      });
    }
  });
}

window.handleBookingSubmit = function handleBookingSubmit(e, getMessage, successEl, onAfterReset) {
  e.preventDefault();
  const message = getMessage();
  window.openWhatsApp(message, { mount: successEl ? successEl.parentElement : null });
  if (successEl) {
    successEl.classList.remove('hidden');
    successEl.classList.add('show');
    successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
  e.target.reset();
  if (typeof onAfterReset === 'function') onAfterReset();
  document.querySelectorAll('input[type="date"]').forEach(function (d) {
    d.min = new Date().toISOString().split('T')[0];
  });
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.documentElement.dataset.dongfangInit === '1') return;
  document.documentElement.dataset.dongfangInit = '1';

  /* scroll-progress hairline */
  const bar = document.createElement('div');
  bar.className = 'df-progress';
  document.body.appendChild(bar);

  /* nav scroll state + progress */
  const nav = document.querySelector('.df-nav');
  const onScroll = () => {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 30);
    const h = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + '%';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  initNavDrawer();
  initNavDropdown();
  initNavActive();
  initFooterSitemap();

  /* reveal on scroll — above-fold first, no flash */
  const revealEls = document.querySelectorAll('.reveal');
  const revealIn = (el) => { el.classList.add('in'); };
  const inViewport = (el) => {
    const r = el.getBoundingClientRect();
    return r.top < window.innerHeight * 0.92 && r.bottom > 0;
  };
  revealEls.forEach(el => { if (inViewport(el)) revealIn(el); });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { revealIn(en.target); io.unobserve(en.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
  revealEls.forEach(el => { if (!el.classList.contains('in')) io.observe(el); });

  /* FAQ accordion */
  document.querySelectorAll('.df-faq-q').forEach((btn, i) => {
    if (!btn.type) btn.type = 'button';
    const item = btn.closest('.df-faq-item');
    const body = item && item.querySelector('.df-faq-a');
    if (body && !body.id) {
      body.id = 'faq-a-' + (i + 1);
      btn.setAttribute('aria-controls', body.id);
    }
    btn.addEventListener('click', () => {
      const item = btn.closest('.df-faq-item');
      const body = item.querySelector('.df-faq-a');
      const open = item.classList.contains('open');
      // close siblings in same category
      const scope = item.closest('.df-faq') || document;
      scope.querySelectorAll('.df-faq-item.open').forEach(el => {
        el.classList.remove('open');
        el.querySelector('.df-faq-a').style.maxHeight = null;
        el.querySelector('.df-faq-q').setAttribute('aria-expanded', 'false');
      });
      if (!open) {
        item.classList.add('open');
        body.style.maxHeight = body.scrollHeight + 'px';
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* contact form → WhatsApp */
  const form = document.querySelector('.df-contact-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      const val = n => (form.querySelector('[name="' + n + '"]') || {}).value || '';
      const lines = [
        UI.bookingHeader,
        UI.name + '：' + val('name'),
        UI.phone + '：' + val('phone'),
        val('service') && UI.service + '：' + val('service'),
        val('date') && UI.date + '：' + val('date'),
        val('time') && UI.time + '：' + val('time'),
        val('notes') && UI.notes + '：' + val('notes'),
      ].filter(Boolean);
      handleBookingSubmit(e, () => lines.join('\n'), form.querySelector('.df-form-success'));
    });
  }

  initWaChat();
  initPageSchema();
  initAnalytics();

  /* min date = today */
  document.querySelectorAll('input[type="date"]').forEach(d => {
    d.min = new Date().toISOString().split('T')[0];
  });

  /* site search */
  initSiteSearch();
});

function initSiteSearch() {
  const index = window.SITE_SEARCH_INDEX || [];
  const triggers = document.querySelectorAll('[data-search-open]');
  if (!triggers.length || !index.length) return;

  const overlay = document.createElement('div');
  overlay.className = 'df-search-overlay';
  overlay.innerHTML = `
    <div class="df-search-panel" role="dialog" aria-label="${UI.searchLabel}">
      <input class="df-search-input" type="search" placeholder="${UI.searchPlaceholder}" autocomplete="off">
      <div class="df-search-results"></div>
    </div>`;
  document.body.appendChild(overlay);

  const input = overlay.querySelector('.df-search-input');
  const results = overlay.querySelector('.df-search-results');

  const close = () => { overlay.classList.remove('open'); input.value = ''; render(''); };
  const open = () => { overlay.classList.add('open'); input.focus(); render(input.value); };

  const render = (q) => {
    const term = q.trim().toLowerCase();
    const list = term
      ? index.filter(i => (i.title + i.keywords + i.type).toLowerCase().includes(term)).slice(0, 12)
      : index.slice(0, 8);
    results.innerHTML = list.length
      ? list.map(i => `<a class="df-search-item" href="${i.url}"><div class="df-search-item__type">${i.type}</div><div class="df-search-item__title">${i.title}</div></a>`).join('')
      : '<div class="df-search-empty">' + UI.searchEmpty + '</div>';
  };

  triggers.forEach(btn => btn.addEventListener('click', open));
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) close();
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); open(); }
  });
  input.addEventListener('input', () => render(input.value));
  results.addEventListener('click', () => close());
}

function initFooterSitemap() {
  const details = document.querySelector('.df-footer__sitemap-details');
  if (!details) return;
  const mq = window.matchMedia('(min-width: 768px)');
  const sync = () => { details.open = mq.matches; };
  sync();
  mq.addEventListener('change', sync);
}

function initNavDrawer() {
  const nav = document.querySelector('.df-nav');
  const burger = document.querySelector('.df-burger');
  const backdrop = document.querySelector('.df-nav__backdrop');
  const drawer = document.getElementById('df-nav-drawer');
  if (!nav || !burger || !drawer) return;

  const close = () => {
    nav.classList.remove('drawer-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', UI.menuOpen);
    document.body.classList.remove('nav-locked');
    if (backdrop) backdrop.hidden = true;
    document.querySelectorAll('.nav-drop.open').forEach(drop => {
      drop.classList.remove('open');
      drop.querySelector('.nav-drop__trigger')?.setAttribute('aria-expanded', 'false');
    });
  };

  const open = () => {
    nav.classList.add('drawer-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', UI.menuClose);
    document.body.classList.add('nav-locked');
    if (backdrop) backdrop.hidden = false;
  };

  burger.addEventListener('click', e => {
    e.stopPropagation();
    nav.classList.contains('drawer-open') ? close() : open();
  });

  if (backdrop) backdrop.addEventListener('click', close);

  drawer.querySelectorAll('a[href]').forEach(a => {
    a.addEventListener('click', () => {
      if (window.innerWidth < 1280) close();
    });
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('drawer-open')) close();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1280) close();
  });
}

function initNavDropdown() {
  const CLOSE_DELAY = 220;
  const DESKTOP = window.matchMedia('(min-width: 1280px)');
  let closeTimer = null;

  const setOpen = (drop, open) => {
    const trigger = drop.querySelector('.nav-drop__trigger');
    drop.classList.toggle('open', open);
    trigger?.setAttribute('aria-expanded', open ? 'true' : 'false');
  };

  const closeAll = (except) => {
    document.querySelectorAll('.nav-drop.open').forEach(d => {
      if (d !== except) setOpen(d, false);
    });
  };

  const openDrop = (drop) => {
    clearTimeout(closeTimer);
    closeAll(drop);
    setOpen(drop, true);
  };

  const scheduleClose = (drop) => {
    clearTimeout(closeTimer);
    closeTimer = setTimeout(() => setOpen(drop, false), CLOSE_DELAY);
  };

  document.querySelectorAll('.nav-drop').forEach(drop => {
    const trigger = drop.querySelector('.nav-drop__trigger');
    const panel = drop.querySelector('.nav-drop__panel');
    if (!trigger || !panel) return;

    trigger.addEventListener('click', e => {
      e.preventDefault();
      e.stopPropagation();
      if (drop.classList.contains('open')) {
        setOpen(drop, false);
      } else {
        openDrop(drop);
      }
    });

    drop.addEventListener('mouseenter', () => {
      if (!DESKTOP.matches) return;
      openDrop(drop);
    });

    drop.addEventListener('mouseleave', () => {
      if (!DESKTOP.matches) return;
      scheduleClose(drop);
    });

    trigger.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        openDrop(drop);
        panel.querySelector('a')?.focus();
      }
      if (e.key === 'Escape') {
        setOpen(drop, false);
        trigger.focus();
      }
    });

    panel.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        setOpen(drop, false);
        trigger.focus();
      }
    });
  });

  document.addEventListener('click', e => {
    if (e.target.closest('.nav-drop')) return;
    closeAll();
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAll();
  });
}

function initNavActive() {
  const norm = p => {
    if (!p || p === '/') return '/';
    let path = p.replace(/\/index\.html$/i, '').replace(/\/$/, '');
    if (path.startsWith('/en')) path = path.slice(3) || '/';
    return path || '/';
  };
  const path = norm(location.pathname);
  const prefix = LOCALE === 'en' ? '/en' : '';

  document.querySelectorAll('.df-nav__link[href]').forEach(a => {
    const href = norm(a.getAttribute('href'));
    if (path === href) a.classList.add('active');
  });

  const groups = {
    about: [prefix + '/about.html', prefix + '/about/', prefix + '/clinic.html'],
    services: [prefix + '/services.html', prefix + '/services/'],
    conditions: [prefix + '/conditions/'],
    blog: [prefix + '/blog/', prefix + '/blog/index.html'],
    news: [prefix + '/news/', prefix + '/news/index.html'],
    guide: [prefix + '/process.html', prefix + '/faq.html', prefix + '/contact.html']
  };

  const isGroupActive = (patterns) => patterns.some(p => {
    const base = norm(p);
    if (path === base) return true;
    if (base.endsWith('/') && path.startsWith(base)) return true;
    if (base.endsWith('.html') && path === base.replace(/\.html$/, '')) return true;
    return false;
  });

  document.querySelectorAll('.nav-drop').forEach(drop => {
    const trigger = drop.querySelector('.nav-drop__trigger');
    const key = drop.getAttribute('data-nav');
    if (!key || !groups[key]) return;
    const active = isGroupActive(groups[key]);
    if (active) trigger?.classList.add('active');
  });
}
