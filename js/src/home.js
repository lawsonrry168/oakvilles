/* ============================================================
   頤安本草 · 首頁專用 — 計算器、預約 funnel、sticky CTA (home.js)
   依賴 dongfang.js 的 trackEvent、handleBookingSubmit
   ============================================================ */

const HOME_LOCALE = (document.body && document.body.dataset.locale) || 'zh';
const HOME_UI = {
  zh: {
    calc: { treatment: { '0': '純把脈諮詢', '280': '針灸療法', '380': '推拿手法' }, meds: { '0': '不需開藥', '3': '三天調理', '6': '六天調理' } },
    specialty: { pain: '痛症治療', skin: '皮膚調理', gyn: '婦科調理', gynaecology: '婦科調理', internal: '內科調理' },
    prefill: '已帶入診金估算：',
    step1: '步驟 1 / 2 · 選擇科別與日期',
    step2: '步驟 2 / 2 · 聯絡資料',
    bookingHeader: '【頤安本草 · 預約申請】',
    name: '姓名', specialtyField: '科別', date: '日期', phone: '電話',
    estimate: '估算方案：', fee: '預估診金：HK$'
  },
  en: {
    calc: { treatment: { '0': 'Consultation only', '280': 'Acupuncture', '380': 'Tuina massage' }, meds: { '0': 'No herbs', '3': '3-day herbs', '6': '6-day herbs' } },
    specialty: { pain: 'Pain management', skin: 'Dermatology', gyn: 'Gynaecology', gynaecology: 'Gynaecology', internal: 'Internal medicine' },
    prefill: 'Estimate applied: ',
    step1: 'Step 1 / 2 · Service & date',
    step2: 'Step 2 / 2 · Contact details',
    bookingHeader: '【Oakville Wellness · Booking request】',
    name: 'Name', specialtyField: 'Service', date: 'Date', phone: 'Phone',
    estimate: 'Estimate: ', fee: 'Est. fee: HK$'
  }
};
const H = HOME_UI[HOME_LOCALE] || HOME_UI.zh;

window.bookingCalcState = null;

const CALC_LABELS = H.calc;

function readCalcState() {
  const treatment = document.getElementById('calc-treatment');
  const meds = document.getElementById('calc-meds');
  const total = document.getElementById('total-price');
  if (!treatment || !meds || !total) return null;
  const tVal = treatment.value;
  const mVal = meds.value;
  const tNum = parseInt(tVal, 10) || 0;
  const mNum = parseInt(mVal, 10) || 0;
  return {
    treatment: { value: tVal, label: CALC_LABELS.treatment[tVal] || treatment.options[treatment.selectedIndex].text },
    meds: { value: mVal, label: CALC_LABELS.meds[mVal] || meds.options[meds.selectedIndex].text },
    total: parseInt(total.textContent, 10) || 150 + tNum + mNum * 100
  };
}

function saveBookingPrefill(extra) {
  const payload = Object.assign({ calc: window.bookingCalcState }, extra || {});
  try { sessionStorage.setItem('df-booking-prefill', JSON.stringify(payload)); } catch (e) { /* ignore */ }
}

function loadBookingPrefill() {
  try {
    const raw = sessionStorage.getItem('df-booking-prefill');
    return raw ? JSON.parse(raw) : null;
  } catch (e) { return null; }
}

function initPriceCalculator() {
  const treatment = document.getElementById('calc-treatment');
  const meds = document.getElementById('calc-meds');
  const total = document.getElementById('total-price');
  if (!treatment || !meds || !total) return;

  const update = function () {
    const t = parseInt(treatment.value, 10) || 0;
    const m = (parseInt(meds.value, 10) || 0) * 100;
    total.textContent = String(150 + t + m);
    window.bookingCalcState = readCalcState();
    trackEvent('calculator_update', {
      treatment: window.bookingCalcState.treatment.label,
      meds_days: window.bookingCalcState.meds.value,
      total: window.bookingCalcState.total,
      page_path: location.pathname
    });
  };

  treatment.addEventListener('change', update);
  meds.addEventListener('change', update);
  update();

  const calcBtn = document.getElementById('calc-to-booking');
  if (calcBtn) {
    calcBtn.addEventListener('click', function () {
      window.bookingCalcState = readCalcState();
      saveBookingPrefill({ from: 'calculator' });
      trackEvent('calculator_to_booking', {
        total: window.bookingCalcState.total,
        page_path: location.pathname
      });
      const booking = document.getElementById('booking');
      if (booking) {
        booking.scrollIntoView({ behavior: 'smooth', block: 'start' });
        location.hash = 'booking';
      }
      applyBookingPrefill();
    });
  }
}

const SPECIALTY_MAP = H.specialty;

function applyBookingPrefill() {
  const prefill = loadBookingPrefill();
  const params = new URLSearchParams(location.search);
  const specialtyKey = params.get('specialty');
  const specialtyFromUrl = specialtyKey ? (SPECIALTY_MAP[specialtyKey] || '') : '';

  const hidden = document.getElementById('form-specialty');
  const note = document.getElementById('calc-prefill-note');
  if (!hidden) return;

  let specialty = specialtyFromUrl;
  if (prefill && prefill.specialty) specialty = prefill.specialty;

  if (specialty) {
    hidden.value = specialty;
    document.querySelectorAll('.df-funnel__opt').forEach(function (btn) {
      const sel = btn.getAttribute('data-value') === specialty;
      btn.classList.toggle('is-selected', sel);
      btn.setAttribute('aria-pressed', sel ? 'true' : 'false');
    });
  }

  if (note && prefill && prefill.calc) {
    const c = prefill.calc;
    note.textContent = H.prefill + c.treatment.label + ' · ' + c.meds.label + ' · HK$' + c.total;
    note.hidden = false;
  } else if (note) {
    note.hidden = true;
    note.textContent = '';
  }
}

function isValidHKPhone(raw) {
  const digits = String(raw || '').replace(/\D/g, '');
  const local = digits.replace(/^852/, '');
  return local.length === 8;
}

function initBookingFunnel() {
  const form = document.getElementById('appointment-form');
  if (!form) return;

  const step1 = form.querySelector('[data-funnel-step="1"]');
  const step2 = form.querySelector('[data-funnel-step="2"]');
  const stepLabel = document.getElementById('funnel-step-label');
  const dots = form.querySelectorAll('[data-step-dot]');
  const specialtyInput = document.getElementById('form-specialty');
  const nextBtn = form.querySelector('.df-funnel__next');
  const backBtn = form.querySelector('.df-funnel__back');

  let currentStep = 1;

  function setStep(n) {
    currentStep = n;
    const on1 = n === 1;
    step1.hidden = !on1;
    step1.classList.toggle('is-active', on1);
    step2.hidden = !on1 ? false : true;
    step2.classList.toggle('is-active', !on1);
    dots.forEach(function (d) {
      d.classList.toggle('is-active', parseInt(d.getAttribute('data-step-dot'), 10) <= n);
    });
    if (stepLabel) {
      stepLabel.textContent = on1 ? H.step1 : H.step2;
    }
    trackEvent('funnel_step', {
      step_index: n,
      step_name: on1 ? 'specialty_date' : 'contact',
      page_path: location.pathname
    });
    if (!on1) {
      const nameEl = document.getElementById('form-name');
      if (nameEl) nameEl.focus();
    }
  }

  form.querySelectorAll('.df-funnel__opt').forEach(function (btn) {
    btn.addEventListener('click', function () {
      form.querySelectorAll('.df-funnel__opt').forEach(function (b) {
        b.classList.remove('is-selected');
        b.setAttribute('aria-pressed', 'false');
      });
      btn.classList.add('is-selected');
      btn.setAttribute('aria-pressed', 'true');
      if (specialtyInput) specialtyInput.value = btn.getAttribute('data-value') || '';
      const err = document.getElementById('funnel-specialty-error');
      if (err) err.hidden = true;
    });
  });

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      let ok = true;
      const specErr = document.getElementById('funnel-specialty-error');
      const dateErr = document.getElementById('funnel-date-error');
      const dateEl = document.getElementById('form-date');

      if (!specialtyInput || !specialtyInput.value) {
        if (specErr) specErr.hidden = false;
        ok = false;
      }
      if (!dateEl || !dateEl.value) {
        if (dateErr) dateErr.hidden = false;
        ok = false;
      } else if (dateErr) {
        dateErr.hidden = true;
      }
      if (ok) setStep(2);
    });
  }

  if (backBtn) {
    backBtn.addEventListener('click', function () { setStep(1); });
  }

  document.getElementById('form-date')?.addEventListener('change', function () {
    const dateErr = document.getElementById('funnel-date-error');
    if (dateErr) dateErr.hidden = !!this.value;
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const nameEl = document.getElementById('form-name');
    const phoneEl = document.getElementById('form-phone');
    const nameErr = document.getElementById('funnel-name-error');
    const phoneErr = document.getElementById('funnel-phone-error');
    let ok = true;

    if (!nameEl || !nameEl.value.trim()) {
      if (nameErr) nameErr.hidden = false;
      if (nameEl) nameEl.setAttribute('aria-invalid', 'true');
      ok = false;
    } else if (nameErr) {
      nameErr.hidden = true;
      nameEl.removeAttribute('aria-invalid');
    }

    if (!phoneEl || !isValidHKPhone(phoneEl.value)) {
      if (phoneErr) phoneErr.hidden = false;
      if (phoneEl) phoneEl.setAttribute('aria-invalid', 'true');
      ok = false;
    } else if (phoneErr) {
      phoneErr.hidden = true;
      phoneEl.removeAttribute('aria-invalid');
    }

    if (!ok) return;

    const v = function (id) { return (document.getElementById(id) || {}).value || ''; };
    const prefill = loadBookingPrefill();
    const lines = [
      H.bookingHeader,
      H.name + '：' + v('form-name'),
      H.specialtyField + '：' + v('form-specialty'),
      H.date + '：' + v('form-date'),
      H.phone + '：' + v('form-phone')
    ];
    if (prefill && prefill.calc) {
      const c = prefill.calc;
      lines.push(H.estimate + c.treatment.label + ' · ' + c.meds.label);
      lines.push(H.fee + c.total);
    }
    handleBookingSubmit(e, function () { return lines.join('\n'); }, document.getElementById('form-success'), function () {
      setStep(1);
      form.querySelectorAll('.df-funnel__opt').forEach(function (b) {
        b.classList.remove('is-selected');
        b.setAttribute('aria-pressed', 'false');
      });
      if (specialtyInput) specialtyInput.value = '';
      try { sessionStorage.removeItem('df-booking-prefill'); } catch (err) { /* ignore */ }
      const note = document.getElementById('calc-prefill-note');
      if (note) { note.hidden = true; note.textContent = ''; }
    });
  });

  applyBookingPrefill();
  if (location.hash === '#booking') applyBookingPrefill();

  window.addEventListener('hashchange', function () {
    if (location.hash === '#booking') applyBookingPrefill();
  });
}

function initStickyCta() {
  const bar = document.getElementById('df-sticky-cta');
  const hero = document.getElementById('top');
  const booking = document.getElementById('booking');
  if (!bar || !hero) return;

  const mq = window.matchMedia('(max-width: 1023px)');

  const update = function () {
    if (!mq.matches) {
      bar.hidden = true;
      document.body.classList.remove('sticky-cta-visible');
      return;
    }
    const heroBottom = hero.getBoundingClientRect().bottom;
    const bookingVisible = booking && booking.getBoundingClientRect().top < window.innerHeight * 0.85;
    const show = heroBottom < 0 && !bookingVisible;
    bar.hidden = !show;
    document.body.classList.toggle('sticky-cta-visible', show);
  };

  window.addEventListener('scroll', update, { passive: true });
  mq.addEventListener('change', update);
  update();
}

document.addEventListener('DOMContentLoaded', function () {
  if (document.documentElement.dataset.homeInit === '1') return;
  document.documentElement.dataset.homeInit = '1';

  const appt = document.getElementById('appointment-form');
  if (appt && appt.classList.contains('df-funnel')) {
    initBookingFunnel();
  }
  if (document.getElementById('calc-treatment')) initPriceCalculator();
  if (document.getElementById('df-sticky-cta')) initStickyCta();
});
