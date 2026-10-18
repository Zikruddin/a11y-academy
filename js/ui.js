/* Reusable UI building blocks: escaping, announcements, toasts, confetti, rings,
   badges, code blocks, quiz runner and the Broken-vs-Fixed demo component. */
(function (A) {
  'use strict';
  const ui = A.ui = {};
  let uid = 0;
  ui.id = p => (p || 'id') + '-' + (++uid);

  ui.esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  ui.$ = (sel, root) => (root || document).querySelector(sel);
  ui.$$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));
  const esc = ui.esc;

  /* ---- announcements ---- */
  ui.announce = function (msg, assertive) {
    const el = document.getElementById(assertive ? 'live-assertive' : 'live-polite');
    if (!el) return;
    el.textContent = '';
    setTimeout(() => { el.textContent = msg; }, 60);
  };

  ui.reducedMotion = function () {
    const m = A.store.s.prefs.motion;
    return m === 'reduce' || window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  };

  /* Toast: stays until dismissed or ~8s; pauses while hovered/focused (WCAG 2.2.1 friendly). */
  ui.toast = function (msg, opts) {
    opts = opts || {};
    const region = document.getElementById('toast-region');
    const t = document.createElement('div');
    t.className = 'toast';
    t.innerHTML = '<span></span><button type="button" aria-label="Dismiss notification">✕</button>';
    t.firstChild.textContent = msg;
    region.appendChild(t);
    let timer, paused = false;
    const close = () => { clearTimeout(timer); t.remove(); };
    const arm = () => { clearTimeout(timer); timer = setTimeout(() => { if (!paused) close(); else arm(); }, 8000); };
    t.addEventListener('mouseenter', () => { paused = true; });
    t.addEventListener('mouseleave', () => { paused = false; arm(); });
    t.addEventListener('focusin', () => { paused = true; });
    t.addEventListener('focusout', () => { paused = false; arm(); });
    t.querySelector('button').addEventListener('click', close);
    arm();
    if (!opts.silent) ui.announce(msg);
  };

  ui.confetti = function () {
    if (ui.reducedMotion()) return;
    const colors = ['#4338ca', '#0b8a4a', '#d99a00', '#c2255c', '#1d7fd6'];
    const frag = document.createDocumentFragment();
    for (let i = 0; i < 60; i++) {
      const c = document.createElement('i');
      c.className = 'confetti'; c.setAttribute('aria-hidden', 'true');
      c.style.left = Math.random() * 100 + 'vw';
      c.style.background = colors[i % colors.length];
      c.style.setProperty('--dx', (Math.random() * 160 - 80) + 'px');
      c.style.animationDelay = Math.random() * .4 + 's';
      frag.appendChild(c);
    }
    document.body.appendChild(frag);
    setTimeout(() => ui.$$('.confetti').forEach(n => n.remove()), 2600);
  };

  /* ---- small components (return HTML strings) ---- */
  ui.levelBadge = function (id) {
    const l = A.data.levels.find(x => x.id === id);
    return `<span class="badge badge-${l.id}"><span aria-hidden="true">${l.icon}</span> ${esc(l.name)}</span>`;
  };
  ui.wcagBadge = lvl => `<span class="badge badge-level" title="WCAG conformance level">Level ${esc(lvl)}</span>`;
  ui.topicTag = function (id) {
    const t = A.data.topicById[id];
    return `<a class="tag" href="#/topic/${t.id}"><span aria-hidden="true">${t.icon}</span> ${esc(t.name)}</a>`;
  };
  ui.ring = function (pct, label, big) {
    pct = Math.max(0, Math.min(100, Math.round(pct)));
    return `<div class="ring${big ? ' lg' : ''}" style="--p:${pct}" role="img" aria-label="${esc(label)}: ${pct}%"><span aria-hidden="true">${pct}%</span></div>`;
  };
  ui.bar = (pct, label) => `<div class="bar" role="img" aria-label="${esc(label)}: ${Math.round(pct)}%"><i style="width:${Math.round(pct)}%"></i></div>`;

  /* ---- code blocks ---- */
  function highlightLine(line) {
    let e = esc(line);
    e = e.replace(/(&lt;!--.*?--&gt;)/g, '\u0001$1\u0002');
    e = e.replace(/(&lt;\/?)([a-zA-Z][\w-]*)/g, '$1<span class="tk-t">$2</span>');
    e = e.replace(/([\w:-]+)=(&quot;.*?&quot;)/g, '<span class="tk-a">$1</span>=<span class="tk-s">$2</span>');
    e = e.replace(/\u0001(.*?)\u0002/g, '<span class="tk-c">$1</span>');
    return e;
  }
  ui.codeBlock = function (code, opts) {
    opts = opts || {};
    const changed = opts.changed || new Set();
    const id = ui.id('code');
    const lines = code.split('\n').map(l =>
      `<span class="cl${changed.has(l.trim()) && l.trim() ? ' chg' : ''}">${changed.has(l.trim()) && l.trim() ? '<span class="sr-only">Changed line: </span>' : ''}${highlightLine(l) || ' '}</span>`
    ).join('');
    return `<div class="codeblock">
      ${opts.title ? `<div class="code-title" id="${id}-t">${esc(opts.title)}</div>` : ''}
      <button type="button" class="copy" data-copy="${esc(code)}" aria-label="Copy code${opts.title ? ' for ' + esc(opts.title) : ''}">Copy</button>
      <pre tabindex="0" role="region" aria-label="${esc(opts.title || 'Code example')}"><code>${lines}</code></pre>
    </div>`;
  };
  ui.bindCopy = function (root) {
    ui.$$('button.copy', root).forEach(btn => {
      if (btn.__bound) return; btn.__bound = true;
      btn.addEventListener('click', async () => {
        const text = btn.getAttribute('data-copy');
        try { await navigator.clipboard.writeText(text); }
        catch (e) {
          const ta = document.createElement('textarea'); ta.value = text; ta.setAttribute('aria-hidden', 'true');
          document.body.appendChild(ta); ta.select(); try { document.execCommand('copy'); } catch (_) { /* ignore */ } ta.remove();
        }
        const old = btn.textContent; btn.textContent = 'Copied ✓';
        ui.announce('Code copied to clipboard');
        setTimeout(() => { btn.textContent = old; }, 1800);
      });
    });
  };

  /* ---- quiz runner ----
     questions: [{q, options, answer, why}]; opts: {key, passMark(0..1), onComplete(score,total,gainedXP)} */
  ui.quiz = function (root, questions, opts) {
    opts = opts || {};
    let i = 0, score = 0, checked = false;
    const shuffle = opts.shuffle !== false;
    // Shuffle options per attempt but keep track of the right one.
    const qs = questions.map(q => {
      const idx = q.options.map((o, k) => k);
      if (shuffle) idx.sort(() => Math.random() - .5);
      return { q: q.q, why: q.why, options: idx.map(k => q.options[k]), answer: idx.indexOf(q.answer) };
    });
    root.innerHTML = '<div class="quiz-body"></div><div class="feedback" role="status" aria-live="polite"></div>';
    const body = root.querySelector('.quiz-body'), fb = root.querySelector('.feedback');

    function render() {
      checked = false; fb.textContent = ''; fb.className = 'feedback';
      const q = qs[i], name = ui.id('q');
      body.innerHTML = `<form class="quiz" novalidate>
        <fieldset tabindex="-1">
          <legend><span class="muted small">Question ${i + 1} of ${qs.length}</span><br>${esc(q.q)}</legend>
          ${q.options.map((o, k) => `<label class="opt"><input type="radio" name="${name}" value="${k}"><span>${esc(o) || "(blank)"}</span><span class="mark" aria-hidden="true"></span></label>`).join('')}
        </fieldset>
        <div class="btn-row"><button type="submit" class="btn btn-primary">Check answer</button></div>
      </form>`;
      const form = body.querySelector('form');
      form.addEventListener('submit', e => {
        e.preventDefault();
        if (checked) { next(); return; }
        const sel = form.querySelector('input:checked');
        if (!sel) { fb.className = 'feedback no'; fb.textContent = 'Choose an answer first.'; return; }
        checked = true;
        const pick = Number(sel.value), ok = pick === q.answer;
        if (ok) score++;
        form.querySelectorAll('.opt').forEach((lab, k) => {
          lab.querySelector('input').disabled = true;
          if (k === q.answer) { lab.classList.add('correct'); lab.querySelector('.mark').textContent = '✓ Correct'; }
          else if (k === pick) { lab.classList.add('wrong'); lab.querySelector('.mark').textContent = '✗ Your answer'; }
        });
        fb.className = 'feedback ' + (ok ? 'ok' : 'no');
        fb.innerHTML = `<strong>${ok ? 'Correct!' : 'Not quite.'}</strong> ${esc(q.why || '')}`;
        const btn = form.querySelector('button[type=submit]');
        btn.textContent = i === qs.length - 1 ? 'See results' : 'Next question';
        btn.focus();
      });
      if (i > 0) body.querySelector('fieldset').focus();
    }
    function next() {
      i++;
      if (i < qs.length) { render(); return; }
      finish();
    }
    function finish() {
      const pass = opts.passMark != null ? score / qs.length >= opts.passMark : null;
      const gained = opts.key ? A.store.recordQuiz(opts.key, score, qs.length) : 0;
      fb.textContent = ''; fb.className = 'feedback';
      const extra = opts.onComplete ? (opts.onComplete(score, qs.length, gained, pass) || '') : '';
      body.innerHTML = `<div class="quiz-result" tabindex="-1">
        <p class="result-score">${score} / ${qs.length}</p>
        <p>${score === qs.length ? 'Perfect — every answer right!' : pass === false ? 'Not there yet — review the explanations and try again.' : 'Nice work.'}${gained ? ` <strong>+${gained} XP</strong>` : ''}</p>
        ${extra}
        <div class="btn-row"><button type="button" class="btn" data-retry>Try again</button></div>
      </div>`;
      body.querySelector('.quiz-result').focus();
      ui.announce(`Quiz finished. You scored ${score} out of ${qs.length}.`);
      if (score === qs.length) ui.confetti();
      body.querySelector('[data-retry]').addEventListener('click', () => ui.quiz(root, questions, opts));
    }
    render();
  };

  /* ---- Broken vs Fixed demo ---- */
  const IMG = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="240" height="140" viewBox="0 0 240 140"><rect width="240" height="140" fill="#eef"/><rect x="40" y="70" width="40" height="50" fill="#4338ca"/><rect x="100" y="40" width="40" height="80" fill="#4338ca"/><rect x="160" y="20" width="40" height="100" fill="#0b8a4a"/><path d="M20 125H220" stroke="#333" stroke-width="2"/></svg>');

  ui.demo = function (root, demo) {
    const id = ui.id('demo');
    const PLAYERCSS = '<style>.vid{position:relative;width:240px;max-width:100%;background:#000;border-radius:6px;overflow:hidden;line-height:0}.vid img{width:100%;opacity:.85}.vid .cap{position:absolute;left:8px;right:8px;bottom:30px;background:rgba(0,0,0,.8);color:#fff;font:14px/1.3 system-ui;padding:3px 6px;text-align:center;border-radius:3px}.vid .bar{position:absolute;left:0;right:0;bottom:0;background:#222;color:#fff;font:12px system-ui;padding:6px 8px;line-height:1.2}.vid .badge2{position:absolute;top:6px;right:6px;background:#fff;color:#000;font:12px system-ui;padding:2px 6px;border-radius:4px;line-height:1.2}.note{font-size:14px;margin:6px 0}</style>';
    const sub = h => h.replace(/\{\{IMG\}\}/g, IMG).replace(/\{\{PLAYERCSS\}\}/g, PLAYERCSS);
    const codeOf = h => h.replace(/\{\{IMG\}\}/g, 'sales-chart.png');
    const codeSrc = m => (demo.code && demo.code[m]) || demo[m];
    const lineSet = h => new Set(codeOf(h).split('\n').map(l => l.trim()).filter(Boolean));
    const bSet = lineSet(codeSrc('broken')), fSet = lineSet(codeSrc('fixed'));
    const diffB = new Set([...bSet].filter(l => !fSet.has(l))), diffF = new Set([...fSet].filter(l => !bSet.has(l)));
    let mode = 'broken';

    root.innerHTML = `<div class="demo">
      <div class="demo-bar">
        <div role="group" aria-label="Choose version to preview" class="segmented">
          <button type="button" class="btn" data-mode="broken" aria-pressed="true">✗ Broken</button>
          <button type="button" class="btn" data-mode="fixed" aria-pressed="false">✓ Fixed</button>
        </div>
        <span class="muted small">Tab inside the preview to try it with your keyboard.</span>
      </div>
      <div class="demo-split">
        <div class="demo-preview">
          <iframe id="${id}-f" sandbox="allow-scripts" style="height:${demo.height || 200}px" title="Live preview of the broken version"></iframe>
          <ul class="demo-findings is-broken" id="${id}-find" aria-label="What this version does"></ul>
        </div>
        <div id="${id}-code"></div>
      </div>
    </div>`;

    const frame = root.querySelector('iframe'), find = root.querySelector('#' + id + '-find'), codeHost = root.querySelector('#' + id + '-code');
    function paint() {
      const html = sub(demo[mode]);
      frame.title = 'Live preview of the ' + mode + ' version';
      frame.srcdoc = '<!doctype html><html lang="en"><meta charset="utf-8"><body style="font:16px/1.5 system-ui,sans-serif;padding:12px;margin:0;color:#191b29">' + html + '</body></html>';
      find.className = 'demo-findings is-' + mode;
      find.innerHTML = demo.findings[mode].map(f => `<li>${esc(f)}</li>`).join('');
      codeHost.innerHTML = ui.codeBlock(codeOf(codeSrc(mode)), { title: (demo.name ? demo.name + ': ' : '') + (mode === 'broken' ? 'Broken code' : 'Fixed code (changed lines marked +)'), changed: mode === 'broken' ? diffB : diffF });
      ui.bindCopy(codeHost);
      root.querySelectorAll('[data-mode]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === mode)));
    }
    root.querySelectorAll('[data-mode]').forEach(b => b.addEventListener('click', () => {
      mode = b.dataset.mode; paint();
      ui.announce(mode === 'broken' ? 'Showing the broken version. ' + demo.findings.broken[0] : 'Showing the fixed version. ' + demo.findings.fixed[0]);
    }));
    paint();
  };

  /* ---- classify challenge: put each item in the right bucket (selects: keyboard + screen reader friendly) ---- */
  ui.classify = function (root, ch, opts) {
    opts = opts || {};
    const name = ui.id('cls');
    function render() {
      root.innerHTML = `<form novalidate>
        <p>${esc(ch.prompt)}</p>
        ${ch.items.map((it, i) => `<div class="cls-item" data-i="${i}">
          <label for="${name}-${i}">${esc(it.t)}</label>
          <select id="${name}-${i}"><option value="">Choose…</option>${ch.buckets.map((b, k) => `<option value="${k}">${esc(b)}</option>`).join('')}</select>
          <span class="cls-mark" aria-hidden="true"></span>
        </div>`).join('')}
        <div class="btn-row"><button type="submit" class="btn btn-primary">Check answers</button></div>
        <div class="feedback" role="status" aria-live="polite"></div>
      </form>`;
      const form = root.querySelector('form'), fb = form.querySelector('.feedback');
      form.addEventListener('submit', e => {
        e.preventDefault();
        const sels = ch.items.map((it, i) => form.querySelector('#' + name + '-' + i));
        if (sels.some(x => x.value === '')) { fb.className = 'feedback no'; fb.textContent = 'Choose an answer for every item first.'; return; }
        let score = 0; const wrong = [];
        ch.items.forEach((it, i) => {
          const ok = Number(sels[i].value) === it.a, row = form.querySelector(`.cls-item[data-i="${i}"]`);
          row.classList.toggle('ok', ok); row.classList.toggle('bad', !ok);
          row.querySelector('.cls-mark').textContent = ok ? '✓ Correct' : '✗ Answer: ' + ch.buckets[it.a];
          sels[i].disabled = true;
          if (ok) score++; else wrong.push(it.t);
        });
        const gained = opts.key ? A.store.recordQuiz(opts.key, score, ch.items.length) : 0;
        fb.className = 'feedback ' + (score === ch.items.length ? 'ok' : 'no');
        fb.innerHTML = `<strong>${score} of ${ch.items.length} correct.</strong> ${score === ch.items.length ? 'Perfect match!' : 'The correct answers are shown beside each item.'}${gained ? ` <strong>+${gained} XP</strong>` : ''}`;
        if (score === ch.items.length) ui.confetti();
        form.querySelector('button[type=submit]').outerHTML = '<button type="button" class="btn" data-retry>Try again</button>';
        form.querySelector('[data-retry]').addEventListener('click', render);
      });
    }
    render();
  };
})(window.A11Y = window.A11Y || {});
