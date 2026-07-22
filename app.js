// ═══════════════════════════════════════════════
//  PWA INSTALL PROMPT
// ═══════════════════════════════════════════════
let deferredPrompt;

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;

  // Show your custom banner
  const banner = document.getElementById('install-banner');
  if (banner) banner.style.display = 'flex';
});

document.getElementById('install-btn')?.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  deferredPrompt = null;
  document.getElementById('install-banner').style.display = 'none';
});

document.getElementById('install-dismiss')?.addEventListener('click', () => {
  document.getElementById('install-banner').style.display = 'none';
});


// ═══════════════════════════════════════════════
//  STATE
// ═══════════════════════════════════════════════
let current = null;

// ═══════════════════════════════════════════════
//  BUILD SIDEBAR NAV
// ═══════════════════════════════════════════════
function buildNav() {
  const nav = document.getElementById('nav');
  DATA.forEach((cat, ci) => {
    const sec = document.createElement('div');
    sec.className = 'cat-sec';
    if (ci !== 0) sec.classList.add('collapsed'); // only the first category starts open

    const head = document.createElement('div');
    head.className = 'cat-head';
    head.innerHTML = `<span class="cat-chevron">▾</span><span class="cat-head-text">${cat.title}</span>`;
    head.addEventListener('click', () => {
      sec.classList.toggle('collapsed');
    });
    sec.appendChild(head);

    const body = document.createElement('div');
    body.className = 'cat-body';

    cat.formulas.forEach((f, fi) => {
      const btn = document.createElement('button');
      btn.className = 'f-btn';
      btn.textContent = f.title;
      btn.addEventListener('click', () => select(btn, ci, fi));
      body.appendChild(btn);
    });

    sec.appendChild(body);
    nav.appendChild(sec);
  });
}

// ═══════════════════════════════════════════════
//  SELECT A FORMULA
// ═══════════════════════════════════════════════
function select(btn, ci, fi) {
  document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  current = DATA[ci].formulas[fi];
  renderCard(DATA[ci].title, current);

  // On mobile, picking a formula should close the drawer
  if (window.innerWidth <= 720) closeDrawer();
}

// ═══════════════════════════════════════════════
//  RENDER FORMULA CARD
// ═══════════════════════════════════════════════
function renderCard(catTitle, formula) {
  const main = document.getElementById('main');
  main.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'f-card';

  card.innerHTML = `
    <span class="f-tag">${catTitle}</span>
    <h1 class="f-title">${formula.title}</h1>
    ${formula.inputs.map(inp => `
      <div class="inp-row">
        <label class="inp-lbl" for="${inp.id}">${inp.label}</label>
        ${inp.type === 'select'
          ? `<select class="inp" id="${inp.id}">
               ${inp.options.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
             </select>`
          : `<input class="inp" id="${inp.id}" type="number" step="any"
                     placeholder="${inp.placeholder || '0'}" autocomplete="off" inputmode="decimal">`
        }
      </div>
    `).join('')}
    <button class="calc-btn" id="calc-btn">محاسبه</button>
    <p class="err-msg" id="err-msg">لطفاً تمام مقادیر را با عدد وارد کنید.</p>
    <div class="res-box" id="res-box">
      <span class="res-lbl">نتیجه:</span>
      <span class="res-val" id="res-val">—</span>
      <span class="res-unit">${formula.unit}</span>
    </div>
  `;
  // Decimal gauge only
  // ${formula.inputs.map(inp => `
  //   <div class="inp-row">
  //     <label class="inp-lbl" for="${inp.id}">${inp.label}</label>
  //     <input class="inp" id="${inp.id}" type="number" step="any"
  //            placeholder="${inp.placeholder || '0'}" autocomplete="off" inputmode="decimal">
  //
  // Fraction gauge
  // ${formula.inputs.map(inp => `
  //   <div class="inp-row">
  //     <label class="inp-lbl" for="${inp.id}">${inp.label}</label>
  //     ${inp.type === 'fraction'
  //       ? `<input class="inp" id="${inp.id}" type="text"
  //                  placeholder="1/8" autocomplete="off">`
  //       : `<input class="inp" id="${inp.id}" type="number" step="any"
  //                  placeholder="${inp.placeholder || '0'}" autocomplete="off" inputmode="decimal">`
  //     }

  main.appendChild(card);

  document.getElementById('calc-btn').addEventListener('click', calculate);
  card.querySelectorAll('.inp').forEach(inp => {
    inp.addEventListener('keydown', e => { if (e.key === 'Enter') calculate(); });
  });

  // Auto-focus first field
  setTimeout(() => {
    const first = card.querySelector('.inp');
    if (first) first.focus();
  }, 40);
}

// ═══════════════════════════════════════════════
//  CALCULATE
// ═══════════════════════════════════════════════
function calculate() {
  if (!current) return;

  const errMsg = document.getElementById('err-msg');
  const resBox = document.getElementById('res-box');
  const resVal = document.getElementById('res-val');

  errMsg.classList.remove('show');
  resBox.classList.remove('show');

  // Collect + validate inputs
  const vals = {};
  let valid = true;
  current.inputs.forEach(inp => {
    const el  = document.getElementById(inp.id);
    // const num = parseFloat(el.value);
    const raw = el.value.trim();

    let num;
    if (raw === '' && inp.default !== undefined) {
      num = inp.default;
    // } else if (inp.type === 'fraction') {    // Accept fraction from entry
    //   num = parseFraction(el.value);
    } else {
      num = parseFloat(el.value);
    }
    if (isNaN(num)) {
      el.classList.add('err');
      valid = false;
    } else {
      el.classList.remove('err');
      vals[inp.id] = num;
    }
  });

  if (!valid) { errMsg.classList.add('show'); return; }

  try {
    const result = current.calc(vals);
    if (!isFinite(result)) throw new Error('non-finite');

    // Format: integers show without decimals, others 2dp
    const display = Number.isInteger(result)
      ? result.toString()
      : result.toFixed(2);

    resVal.textContent = display;

    // Re-trigger animation on recalculate
    void resBox.offsetWidth;
    resBox.classList.add('show');

  } catch {
    errMsg.textContent = 'خطا در محاسبه — مقادیر وارد شده را بررسی کنید.';
    errMsg.classList.add('show');
  }
}

// ═══════════════════════════════════════════════
//  MOBILE DRAWER (hamburger menu)
// ═══════════════════════════════════════════════
const hamburger = document.getElementById('hamburger');
const sidebar   = document.getElementById('sidebar');
const overlay   = document.getElementById('overlay');

function openDrawer() {
  sidebar.classList.add('open');
  overlay.classList.add('show');
  hamburger.classList.add('open');
}
function closeDrawer() {
  sidebar.classList.remove('open');
  overlay.classList.remove('show');
  hamburger.classList.remove('open');
}
function toggleDrawer() {
  sidebar.classList.contains('open') ? closeDrawer() : openDrawer();
}

hamburger.addEventListener('click', toggleDrawer);
overlay.addEventListener('click', closeDrawer);

// ═══════════════════════════════════════════════
//  INIT
// ═══════════════════════════════════════════════
buildNav();