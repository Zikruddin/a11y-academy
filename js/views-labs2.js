/* Phase 6: Labs index, Bug Hunt, Keyboard-Only Challenge, Screen Reader Simulator, Contrast Lab,
   Vision simulators, Flashcards, Resources, Certificate and the "How to add lessons" guide. */
(function (A) {
  'use strict';
  const D = A.data, S = A.store, ui = A.ui, esc = ui.esc, V = A.views;
  const crumbs = (cur, mid) => `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="#/">Home</a></li><li><a href="#/labs">Labs</a></li><li><span aria-current="page">${esc(cur)}</span></li></ol></nav>`;
  const award = (key, xp, msg) => { if (S.awardOnce(key, xp)) { S.commit(); ui.toast(msg + ' +' + xp + ' XP'); ui.confetti(); return true; } return false; };
  V.labExtra = {};

  /* ---------------- Labs index ---------------- */
  const LABS = [
    ['dnd', '🧲', 'Drag-and-Drop Lab', 'Move Kanban cards by mouse, keyboard and menu.'],
    ['components', '🧱', 'Component Lab', 'Broken vs fixed dialogs, tabs, accordions and more.'],
    ['bughunt', '🐞', 'Bug Hunt', 'Inspect a flawed page and spot every accessibility bug.'],
    ['keyboard', '⌨️', 'Keyboard-Only Challenge', 'Finish an order form without touching the mouse.'],
    ['screenreader', '🔊', 'Screen Reader Simulator', 'See what a screen reader says for broken and fixed markup.'],
    ['contrast', '🎨', 'Contrast Lab', 'Check ratios and fix failing colour pairs.'],
    ['vision', '👁️', 'Vision Simulators', 'Preview colour blindness, blur, low contrast and tunnel vision.'],
    ['cards', '🃏', 'Flashcards', 'Review glossary terms with flip cards.']
  ];
  V.labs = function () {
    return { title: 'Labs', html: `<h1 id="h1" tabindex="-1">Labs and simulators</h1><p class="lead">Hands-on practice. Each lab runs offline in your browser.</p>
      <ul class="grid grid-3" style="list-style:none;padding:0">${LABS.map(l => `<li class="card"><h2 style="font-size:1.15rem"><span aria-hidden="true">${l[1]}</span> <a href="#/lab/${l[0]}">${esc(l[2])}</a></h2><p class="muted">${esc(l[3])}</p></li>`).join('')}</ul>
      <p><a class="btn" href="#/resources">Cheat sheets and tools</a> <a class="btn" href="#/certificate">Progress certificate</a></p>` };
  };

  /* ---------------- Bug Hunt ---------------- */
  const BUGPAGE = `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Bloom Café</title><style>body{font:16px system-ui;margin:12px;color:#222}a{color:#0645ad;outline:none}.muted{color:#aaa}.sub{display:inline-block;background:#e11;color:#fff;padding:6px 10px;cursor:pointer}button.ic{width:36px;height:36px}input{padding:6px}</style></head><body>
<h1>Bloom Café</h1><img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='50'%3E%3Crect width='120' height='50' fill='%23fc6'/%3E%3C/svg%3E" width="120" height="50">
<h4>Today’s special</h4><p>Fresh croissants and filter coffee. <a href="#">Click here</a></p><p class="muted">Open daily 8am to 6pm.</p>
<button class="ic"><svg width="18" height="18" viewBox="0 0 18 18"><circle cx="8" cy="8" r="5" fill="none" stroke="#333" stroke-width="2"/></svg></button><p><input placeholder="Your email"> <span class="sub">Subscribe</span></p><p tabindex="3"><a href="#">Menu</a> · <a href="#">Contact</a></p></body></html>`;
  const BUGS = [
    ['The logo image has no alt attribute.', true, '1.1.1: images need alt text (empty alt only if decorative).'],
    ['The icon-only search button has no accessible name.', true, '4.1.2: add aria-label="Search" or visible text.'],
    ['The grey “Open daily” text has insufficient contrast.', true, '1.4.3: #aaa on white is about 2.3:1; needs 4.5:1.'],
    ['The email field has only a placeholder, no label.', true, '3.3.2 / 1.3.1: add a visible <label>.'],
    ['“Subscribe” is a div and cannot be reached by keyboard.', true, '2.1.1 / 4.1.2: use a real button.'],
    ['Links have no visible focus indicator.', true, '2.4.7: outline:none removes it.'],
    ['The heading jumps from h1 to h4.', true, '1.3.1 / 2.4.6: keep heading levels in order.'],
    ['A link says “Click here”, and a paragraph uses tabindex="3".', true, '2.4.4 link purpose and 2.4.3 focus order (positive tabindex).'],
    ['The page has no title.', false, 'False: the title is “Bloom Café”.'],
    ['The page has no language set.', false, 'False: <html lang="en"> is present.'],
    ['A video on the page has no captions.', false, 'False: there is no video.'],
    ['The page has a keyboard trap.', false, 'False: focus can always move on.']
  ];
  V.labExtra.bughunt = function () {
    return { title: 'Bug Hunt', recent: { route: '#/lab/bughunt', title: 'Bug Hunt' },
      html: `${crumbs('Bug Hunt')}<h1 id="h1" tabindex="-1">Bug Hunt</h1>
      <p class="lead">Inspect the page below with your eyes, keyboard and (if you like) DevTools. Then tick every statement you think is <strong>true</strong>. There are 8 real bugs and 4 false alarms.</p>
      <iframe id="bug-frame" title="Page under test: Bloom Café home page" class="card" style="width:100%;height:340px;border:1px solid var(--border)" sandbox srcdoc="${esc(BUGPAGE)}"></iframe>
      <form id="bug-form" class="card" style="margin-top:var(--s-4)"><fieldset><legend><strong>Which statements are true?</strong></legend>
        <ul style="list-style:none;padding:0">${BUGS.map((b, i) => `<li><label><input type="checkbox" name="b" value="${i}"> ${esc(b[0])}</label><p class="small muted" id="bx-${i}" hidden></p></li>`).join('')}</ul></fieldset>
        <div class="btn-row"><button class="btn btn-primary" type="submit">Check my answers</button><button class="btn" type="button" id="bug-reset">Start over</button></div>
        <p id="bug-result" role="status"></p></form>`,
      init(root) {
        const form = root.querySelector('#bug-form'), res = root.querySelector('#bug-result');
        form.addEventListener('submit', e => {
          e.preventDefault(); let good = 0, wrong = 0, missed = 0;
          BUGS.forEach((b, i) => { const on = form.elements.b[i].checked, x = root.querySelector('#bx-' + i); x.hidden = false;
            if (b[1] && on) good++; else if (b[1] && !on) missed++; else if (!b[1] && on) wrong++;
            x.textContent = (b[1] ? (on ? 'Correct. ' : 'Missed. ') : (on ? 'Not a bug. ' : 'Correctly left unticked. ')) + b[2]; });
          const perfect = good === 8 && wrong === 0;
          res.textContent = `Found ${good} of 8 bugs; ${wrong} false alarm${wrong === 1 ? '' : 's'}; ${missed} missed.` + (perfect ? ' Perfect!' : ' Try again after reading the explanations.');
          if (perfect) award('lab:bughunt', 40, 'Bug Hunter!');
        });
        root.querySelector('#bug-reset').addEventListener('click', () => { form.reset(); form.querySelectorAll('p[id^=bx-]').forEach(p => { p.hidden = true; }); res.textContent = ''; });
      } };
  };

  /* ---------------- Keyboard-Only Challenge ---------------- */
  V.labExtra.keyboard = function () {
    return { title: 'Keyboard-Only Challenge', recent: { route: '#/lab/keyboard', title: 'Keyboard-Only Challenge' },
      html: `${crumbs('Keyboard-Only Challenge')}<h1 id="h1" tabindex="-1">Keyboard-Only Challenge</h1>
      <p class="lead">Complete the order without using the mouse or touch. Use <kbd>Tab</kbd>, <kbd>Shift</kbd>+<kbd>Tab</kbd>, <kbd>Enter</kbd>, <kbd>Space</kbd> and arrow keys. If you click, the attempt is voided.</p>
      <div class="grid grid-2" id="k-wrap"><section class="card" aria-labelledby="kc-t"><h2 id="kc-t">Order form</h2>
        <button class="btn" type="button" id="k-start">Start the challenge</button>
        <form id="k-form" class="stack" style="margin-top:var(--s-3)" novalidate>
          <div><button type="button" class="btn" id="k-disc" aria-expanded="false" aria-controls="k-panel">Show delivery options</button>
            <div id="k-panel" hidden class="card"><fieldset><legend>Delivery speed</legend>
              <label><input type="radio" name="speed" value="std"> Standard</label> <label><input type="radio" name="speed" value="exp"> Express</label></fieldset></div></div>
          <label><input type="checkbox" id="k-gift"> Gift wrap</label>
          <label>City <select id="k-city"><option value="">Choose…</option><option value="del">Delhi</option><option value="mum">Mumbai</option><option value="pun">Pune</option></select></label>
          <button class="btn btn-primary" type="submit" id="k-submit">Place order</button></form></section>
        <section class="card" aria-labelledby="kc-s"><h2 id="kc-s">Your tasks</h2>
          <ol id="k-steps" class="stack"><li data-s="1">Show the delivery options</li><li data-s="2">Choose Express delivery</li><li data-s="3">Tick Gift wrap</li><li data-s="4">Select Mumbai</li><li data-s="5">Place the order</li></ol>
          <p id="k-status" role="status"></p><p class="small muted">Time: <span id="k-time">0.0</span>s</p><button class="btn" type="button" id="k-reset">Reset</button></section></div>`,
      init(root) {
        let running = false, failed = false, t0 = 0, timer = null; const done = new Set();
        const st = root.querySelector('#k-status'), steps = root.querySelectorAll('#k-steps li');
        const mark = n => { if (!running || done.has(n)) return; done.add(n); const li = root.querySelector(`#k-steps li[data-s="${n}"]`); li.innerHTML = '<span aria-hidden="true">✓ </span><s>' + li.textContent + '</s><span class="sr-only"> (done)</span>'; ui.announce('Step ' + n + ' done'); };
        const stop = () => { running = false; clearInterval(timer); };
        const reset = () => { stop(); failed = false; done.clear(); root.querySelector('#k-form').reset(); root.querySelector('#k-panel').hidden = true; root.querySelector('#k-disc').setAttribute('aria-expanded', 'false');
          const txt = ['Show the delivery options', 'Choose Express delivery', 'Tick Gift wrap', 'Select Mumbai', 'Place the order']; steps.forEach((li, i) => { li.textContent = txt[i]; }); st.textContent = ''; root.querySelector('#k-time').textContent = '0.0'; };
        root.querySelector('#k-start').addEventListener('click', () => { reset(); running = true; t0 = Date.now(); timer = setInterval(() => { root.querySelector('#k-time').textContent = ((Date.now() - t0) / 1000).toFixed(1); }, 200); st.textContent = 'Challenge started. Go!'; root.querySelector('#k-disc').focus(); });
        root.querySelector('#k-wrap').addEventListener('pointerdown', e => { if (running && (e.pointerType === 'mouse' || e.pointerType === 'touch' || e.pointerType === 'pen') && !e.target.closest('#k-reset') ) { failed = true; stop(); st.textContent = 'You used a pointer, so this attempt is void. Press Reset and try again with the keyboard only.'; } });
        root.querySelector('#k-reset').addEventListener('click', reset);
        const disc = root.querySelector('#k-disc'), panel = root.querySelector('#k-panel');
        disc.addEventListener('click', () => { const o = disc.getAttribute('aria-expanded') === 'true'; disc.setAttribute('aria-expanded', !o); panel.hidden = o; if (!o) mark(1); });
        root.querySelectorAll('input[name=speed]').forEach(r => r.addEventListener('change', () => { if (r.value === 'exp' && r.checked) mark(2); }));
        root.querySelector('#k-gift').addEventListener('change', e => { if (e.target.checked) mark(3); });
        root.querySelector('#k-city').addEventListener('change', e => { if (e.target.value === 'mum') mark(4); });
        root.querySelector('#k-form').addEventListener('submit', e => { e.preventDefault(); if (!running) return;
          mark(5); if (done.size === 5 && !failed) { stop(); const sec = ((Date.now() - t0) / 1000).toFixed(1); st.textContent = `Done in ${sec} seconds with the keyboard only. Great work!`; award('lab:keyboard', 30, 'Keyboard Ninja!'); }
          else { st.textContent = 'Not all tasks are complete yet.'; } });
      } };
  };

  /* ---------------- Screen Reader Simulator ---------------- */
  const EXAMPLES = [
    { id: 'btn', name: 'Icon button', broken: '<button><svg width="16" height="16" viewBox="0 0 16 16"><circle cx="7" cy="7" r="5"/></svg></button>', fixed: '<button aria-label="Search"><svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><circle cx="7" cy="7" r="5"/></svg></button>' },
    { id: 'img', name: 'Image', broken: '<img src="chart.png">', fixed: '<img src="chart.png" alt="Sales rose 40% in Q4">' },
    { id: 'field', name: 'Form field', broken: '<input type="email" placeholder="Email">', fixed: '<label for="e">Email</label><input id="e" type="email" required aria-describedby="h"><p id="h">We never share it.</p>' },
    { id: 'link', name: 'Links', broken: '<p>Pricing <a href="#">Read more</a></p><p>Shipping <a href="#">Read more</a></p>', fixed: '<p>Pricing <a href="#">Read more<span class="sr-only"> about pricing</span></a></p><p>Shipping <a href="#">Read more<span class="sr-only"> about shipping</span></a></p>' },
    { id: 'toggle', name: 'Toggle', broken: '<div onclick="flip()">Notifications</div>', fixed: '<button role="switch" aria-checked="false">Notifications</button>' },
    { id: 'struct', name: 'Page structure', broken: '<div class="top">Menu</div><div class="title">Welcome</div><div>Welcome to our site.</div>', fixed: '<nav aria-label="Main"><ul><li><a href="#">Menu</a></li></ul></nav><main><h1>Welcome</h1><p>Welcome to our site.</p></main>' },
    { id: 'disc', name: 'Accordion', broken: '<div onclick="t()">Shipping</div>', fixed: '<h3><button aria-expanded="false">Shipping</button></h3>' }
  ];
  // A tiny accessible-name/role engine: reads a parsed (detached) DOM and returns speech strings.
  function speak(html) {
    const doc = new DOMParser().parseFromString('<body>' + html + '</body>', 'text/html'), out = [];
    const txt = n => (n.textContent || '').replace(/\s+/g, ' ').trim();
    const byId = id => doc.getElementById(id);
    function hiddenOf(el) { for (let n = el; n && n.nodeType === 1; n = n.parentElement) { if (n.getAttribute('aria-hidden') === 'true' || n.hasAttribute('hidden')) return true; } return false; }
    function nameOf(el) {
      const lb = el.getAttribute('aria-labelledby'); if (lb) return lb.split(/\s+/).map(id => byId(id) ? txt(byId(id)) : '').join(' ').trim();
      if (el.getAttribute('aria-label')) return el.getAttribute('aria-label');
      const tag = el.tagName.toLowerCase();
      if (tag === 'img') return el.getAttribute('alt');
      if (['input', 'select', 'textarea'].includes(tag)) { const l = el.id && doc.querySelector(`label[for="${el.id}"]`); if (l) return txt(l); const w = el.closest('label'); if (w) return txt(w); }
      if (['button', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag) || el.getAttribute('role') === 'switch') return clean(el);
      return null;
    }
    function clean(el) { const c = el.cloneNode(true); c.querySelectorAll('[aria-hidden="true"]').forEach(n => n.remove()); return txt(c); }
    function roleOf(el) {
      const r = el.getAttribute('role'); if (r) return r === 'switch' ? 'switch' : r;
      const t = el.tagName.toLowerCase();
      if (/^h[1-6]$/.test(t)) return 'heading level ' + t[1];
      if (t === 'a' && el.hasAttribute('href')) return 'link';
      if (t === 'button') return 'button';
      if (t === 'img') return 'graphic';
      if (t === 'input') { const ty = el.getAttribute('type') || 'text'; return ty === 'checkbox' ? 'check box' : ty === 'radio' ? 'radio button' : 'edit text'; }
      if (t === 'select') return 'combo box';
      if (t === 'nav') return 'navigation landmark'; if (t === 'main') return 'main landmark';
      if (t === 'ul' || t === 'ol') return 'list'; return null;
    }
    function state(el) {
      const s = [];
      if (el.hasAttribute('aria-expanded')) s.push(el.getAttribute('aria-expanded') === 'true' ? 'expanded' : 'collapsed');
      if (el.hasAttribute('aria-checked')) s.push(el.getAttribute('aria-checked') === 'true' ? 'on' : 'off');
      if (el.hasAttribute('aria-pressed')) s.push(el.getAttribute('aria-pressed') === 'true' ? 'pressed' : 'not pressed');
      if (el.hasAttribute('required') || el.getAttribute('aria-required') === 'true') s.push('required');
      if (el.getAttribute('aria-invalid') === 'true') s.push('invalid entry');
      return s;
    }
    function walk(node) {
      if (node.nodeType === 3) { const t = node.textContent.replace(/\s+/g, ' ').trim(); if (t) out.push({ text: t, kind: 'text' }); return; }
      if (node.nodeType !== 1) return; const el = node; if (hiddenOf(el)) return;
      const tag = el.tagName.toLowerCase(), role = roleOf(el);
      if (['label', 'script', 'style', 'svg'].includes(tag)) return;
      if (el.classList.contains('sr-only') && !el.closest('a,button')) { out.push({ text: txt(el), kind: 'text' }); return; }
      if (role && tag !== 'ul' && tag !== 'ol') {
        const nm = nameOf(el); const parts = [];
        if (tag === 'img' && nm === '') return; // decorative
        const landmark = ['nav', 'main'].includes(tag);
        const missing = !landmark && (nm === null || nm === undefined || nm === '');
        let nmFinal = missing ? '' : nm; let flag = false;
        if (missing && tag === 'input' && el.getAttribute('placeholder')) { nmFinal = el.getAttribute('placeholder'); parts.push('(from placeholder only)'); flag = true; }
        else if (missing) { flag = true; if (tag === 'img') nmFinal = 'chart.png'; else nmFinal = 'unlabelled'; }
        const sp = [nmFinal, role, ...state(el)].filter(Boolean);
        const d = el.getAttribute('aria-describedby'); if (d) { const e2 = byId(d); if (e2) sp.push(txt(e2)); }
        out.push({ text: sp.join(', ') + (parts.length ? ' ' + parts.join(' ') : ''), kind: flag ? 'bad' : 'good' });
        if (!['a', 'button'].includes(tag) && !/^h/.test(tag)) el.childNodes.forEach(walk);
        return;
      }
      if (el.getAttribute('onclick') !== null && !role) { out.push({ text: clean(el) + ', clickable', kind: 'bad' }); return; }
      if (tag === 'ul' || tag === 'ol') out.push({ text: 'list', kind: 'good' });
      el.childNodes.forEach(walk);
    }
    doc.body.childNodes.forEach(walk);
    const names = {}; out.forEach(o => { if (/, link$/.test(o.text)) names[o.text] = (names[o.text] || 0) + 1; });
    out.forEach(o => { if (names[o.text] > 1) { o.kind = 'bad'; o.text += ' (same name as another link)'; } });
    return out.length ? out : [{ text: 'blank', kind: 'bad' }];
  }
  V.labExtra.screenreader = function () {
    return { title: 'Screen Reader Simulator', recent: { route: '#/lab/screenreader', title: 'Screen Reader Simulator' },
      html: `${crumbs('Screen Reader Simulator')}<h1 id="h1" tabindex="-1">Screen Reader Simulator</h1>
      <p class="lead">This is a simplified model of what a screen reader says, built from the real accessible-name rules. Real screen readers differ, so always test with NVDA, JAWS, VoiceOver and TalkBack too.</p>
      <div class="card"><div class="btn-row"><label>Example <select id="sr-ex">${EXAMPLES.map(e => `<option value="${e.id}">${esc(e.name)}</option>`).join('')}</select></label>
        <fieldset class="segmented" style="border:0;padding:0"><legend class="sr-only">Version</legend><button type="button" class="btn" id="sr-b" aria-pressed="true">Broken</button><button type="button" class="btn" id="sr-f" aria-pressed="false">Fixed</button></fieldset></div>
        <div id="sr-code"></div>
        <h2 style="font-size:1.1rem">Speech output</h2><ol id="sr-out" class="stack" style="min-height:3rem"></ol>
        <div class="btn-row"><button class="btn" type="button" id="sr-prev">Previous</button><button class="btn btn-primary" type="button" id="sr-next">Next item</button><button class="btn" type="button" id="sr-all">Read everything</button></div>
        <p id="sr-say" role="status" class="small muted"></p></div>`,
      init(root) {
        let mode = 'broken', cur = -1, items = [];
        const ex = root.querySelector('#sr-ex'), out = root.querySelector('#sr-out'), say = root.querySelector('#sr-say');
        function render() {
          const e = EXAMPLES.find(x => x.id === ex.value); const html = e[mode];
          root.querySelector('#sr-code').innerHTML = ui.codeBlock(html, { title: e.name + ' (' + mode + ')' });
          items = speak(html); cur = -1;
          out.innerHTML = items.map((it, i) => `<li class="card" data-i="${i}" style="border-left:6px solid ${it.kind === 'bad' ? 'var(--danger, #b91c1c)' : 'var(--primary)'}"><span class="small muted">${it.kind === 'bad' ? '⚠ Problem · ' : ''}</span>“${esc(it.text)}”</li>`).join('');
          say.textContent = '';
          root.querySelector('#sr-b').setAttribute('aria-pressed', mode === 'broken'); root.querySelector('#sr-f').setAttribute('aria-pressed', mode === 'fixed');
        }
        function go(i) { cur = Math.max(0, Math.min(items.length - 1, i)); out.querySelectorAll('li').forEach((li, k) => { li.style.outline = k === cur ? '3px solid var(--primary)' : ''; }); const t = items[cur].text; say.textContent = 'Speaking: ' + t; ui.announce(t); }
        ex.addEventListener('change', render);
        root.querySelector('#sr-b').addEventListener('click', () => { mode = 'broken'; render(); });
        root.querySelector('#sr-f').addEventListener('click', () => { mode = 'fixed'; render(); });
        root.querySelector('#sr-next').addEventListener('click', () => go(cur + 1));
        root.querySelector('#sr-prev').addEventListener('click', () => go(cur - 1));
        root.querySelector('#sr-all').addEventListener('click', () => { say.textContent = 'Reading everything: ' + items.map(i => i.text).join('. '); ui.announce(items.map(i => i.text).join('. ')); });
        render();
      } };
  };

  /* ---------------- Contrast Lab ---------------- */
  const hex2rgb = h => { h = h.replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); const n = parseInt(h, 16); return [(n >> 16) & 255, (n >> 8) & 255, n & 255]; };
  const lum = ([r, g, b]) => { const f = c => { c /= 255; return c <= .03928 ? c / 12.92 : Math.pow((c + .055) / 1.055, 2.4); }; return .2126 * f(r) + .7152 * f(g) + .0722 * f(b); };
  const ratio = (a, b) => { const l1 = lum(hex2rgb(a)), l2 = lum(hex2rgb(b)); return (Math.max(l1, l2) + .05) / (Math.min(l1, l2) + .05); };
  const validHex = h => /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.test(h.trim());
  const norm = h => { h = h.trim().replace('#', ''); if (h.length === 3) h = h.split('').map(c => c + c).join(''); return '#' + h.toLowerCase(); };
  function suggest(fg, bg, target) {
    let [r, g, b] = hex2rgb(fg); const darkBg = lum(hex2rgb(bg)) < .4; const step = darkBg ? 6 : -6;
    for (let i = 0; i < 60 && ratio('#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join(''), bg) < target; i++) { r = Math.max(0, Math.min(255, r + step)); g = Math.max(0, Math.min(255, g + step)); b = Math.max(0, Math.min(255, b + step)); }
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
  }
  V.labExtra.contrast = function () {
    const pairs = [['#aaaaaa', '#ffffff'], ['#7a9cff', '#ffffff'], ['#777788', '#222233']];
    return { title: 'Contrast Lab', recent: { route: '#/lab/contrast', title: 'Contrast Lab' },
      html: `${crumbs('Contrast Lab')}<h1 id="h1" tabindex="-1">Contrast Lab</h1>
      <p class="lead">Check text and UI contrast against WCAG 2.2. Then fix three failing pairs to earn the badge.</p>
      <div class="grid grid-2"><section class="card" aria-labelledby="cl-t"><h2 id="cl-t">Colours</h2>
        <div class="stack"><label>Text colour <input type="color" id="c-fg-pick" value="#aaaaaa"> <input type="text" id="c-fg" value="#aaaaaa" size="8" autocomplete="off" aria-describedby="c-err"></label>
        <label>Background <input type="color" id="c-bg-pick" value="#ffffff"> <input type="text" id="c-bg" value="#ffffff" size="8" autocomplete="off" aria-describedby="c-err"></label>
        <p id="c-err" class="small" role="alert"></p>
        <fieldset><legend>Text size</legend><label><input type="radio" name="sz" value="normal" checked> Normal text</label> <label><input type="radio" name="sz" value="large"> Large text (18pt+ or 14pt bold)</label></fieldset>
        <div class="btn-row"><button class="btn" type="button" id="c-sug">Suggest a passing text colour</button></div></div></section>
        <section class="card" aria-labelledby="cr-t"><h2 id="cr-t">Result</h2><p style="font-size:2.2rem;font-weight:700;margin:0" id="c-ratio">1.00:1</p>
          <ul id="c-list" class="stack" style="list-style:none;padding:0"></ul>
          <iframe id="c-sample" title="Preview of the chosen text and background colours" sandbox style="width:100%;height:110px;border:1px solid var(--border);border-radius:8px"></iframe></section></div>
      <section class="section card" aria-labelledby="ch-t"><h2 id="ch-t">Challenge: fix three failing pairs</h2>
        <p>Load each pair, then change the <em>text colour</em> until normal text passes AA (4.5:1).</p>
        <div class="btn-row">${pairs.map((p, i) => `<button class="btn" type="button" data-pair="${i}">Load pair ${i + 1}</button>`).join('')}</div>
        <p id="ch-status" role="status">Fixed 0 of 3.</p></section>`,
      init(root) {
        const fg = root.querySelector('#c-fg'), bg = root.querySelector('#c-bg'), fgp = root.querySelector('#c-fg-pick'), bgp = root.querySelector('#c-bg-pick'), err = root.querySelector('#c-err');
        const fixed = new Set(); let loaded = -1;
        function update() {
          if (!validHex(fg.value) || !validHex(bg.value)) { err.textContent = 'Enter a hex colour like #1a73e8.'; return; } err.textContent = '';
          const f = norm(fg.value), b = norm(bg.value), r = ratio(f, b), large = root.querySelector('input[name=sz]:checked').value === 'large';
          fgp.value = f; bgp.value = b; root.querySelector('#c-ratio').textContent = r.toFixed(2) + ':1';
          const row = (label, ok) => `<li><span class="check" style="font-weight:700">${ok ? '✓ Pass' : '✗ Fail'}</span> ${label}</li>`;
          root.querySelector('#c-list').innerHTML = row('AA ' + (large ? 'large' : 'normal') + ' text (' + (large ? '3' : '4.5') + ':1)', r >= (large ? 3 : 4.5)) + row('AAA ' + (large ? 'large' : 'normal') + ' text (' + (large ? '4.5' : '7') + ':1)', r >= (large ? 4.5 : 7)) + row('UI components and graphics (3:1)', r >= 3);
          root.querySelector('#c-sample').srcdoc = `<body style="margin:0;padding:16px;background:${b};color:${f};font:${large ? '700 24px' : '16px'} system-ui">The quick brown fox jumps over the lazy dog.</body>`;
          ui.announce('Contrast ratio ' + r.toFixed(2) + ' to 1');
          if (loaded >= 0 && r >= 4.5 && !fixed.has(loaded)) { fixed.add(loaded); root.querySelector('#ch-status').textContent = 'Fixed ' + fixed.size + ' of 3.'; if (fixed.size === 3) award('lab:contrast', 30, 'Contrast Pro!'); }
        }
        fg.addEventListener('input', update); bg.addEventListener('input', update);
        fgp.addEventListener('input', () => { fg.value = fgp.value; update(); }); bgp.addEventListener('input', () => { bg.value = bgp.value; update(); });
        root.querySelectorAll('input[name=sz]').forEach(r => r.addEventListener('change', update));
        root.querySelector('#c-sug').addEventListener('click', () => { if (!validHex(fg.value) || !validHex(bg.value)) return; fg.value = suggest(norm(fg.value), norm(bg.value), root.querySelector('input[name=sz]:checked').value === 'large' ? 3 : 4.5); update(); });
        root.querySelectorAll('[data-pair]').forEach(b => b.addEventListener('click', () => { const p = pairs[+b.dataset.pair]; loaded = -1; fg.value = p[0]; bg.value = p[1]; root.querySelector('input[name=sz][value=normal]').checked = true; update(); loaded = +b.dataset.pair; fg.focus(); }));
        update();
      } };
  };

  /* ---------------- Vision simulators ---------------- */
  const VPAGE = `<body style="margin:0;padding:16px;font:16px system-ui;color:#222;background:#fff"><h2 style="margin-top:0">System status</h2><p><span style="background:#2a9d4a;color:#fff;padding:4px 10px;border-radius:12px">Online</span> <span style="background:#d63d3d;color:#fff;padding:4px 10px;border-radius:12px">Offline</span> <span style="background:#e7b416;color:#222;padding:4px 10px;border-radius:12px">Degraded</span></p><p>These chips rely on colour alone. Add icons or text such as “✓ Online” so everyone can tell them apart.</p><p style="color:#aaa">Low contrast hint text sits here.</p><p><span style="color:#d63d3d">Required field is missing.</span> <u style="color:#0645ad">A link</u></p></body>`;
  V.labExtra.vision = function () {
    const sims = [['none', 'None (normal vision)'], ['protan', 'Protanopia (no red cones)'], ['deutan', 'Deuteranopia (no green cones)'], ['tritan', 'Tritanopia (no blue cones)'], ['achroma', 'Achromatopsia (no colour)'], ['blur', 'Low acuity (blur)'], ['lowcon', 'Low contrast sensitivity'], ['tunnel', 'Tunnel vision']];
    return { title: 'Vision Simulators', recent: { route: '#/lab/vision', title: 'Vision Simulators' },
      html: `${crumbs('Vision Simulators')}<h1 id="h1" tabindex="-1">Vision Simulators</h1>
      <p class="lead">Preview how a design looks with different vision conditions. These are approximations, not medical models.</p>
      <svg width="0" height="0" aria-hidden="true" focusable="false" style="position:absolute"><defs>
        <filter id="f-protan"><feColorMatrix type="matrix" values="0.567 0.433 0 0 0  0.558 0.442 0 0 0  0 0.242 0.758 0 0  0 0 0 1 0"/></filter>
        <filter id="f-deutan"><feColorMatrix type="matrix" values="0.625 0.375 0 0 0  0.7 0.3 0 0 0  0 0.3 0.7 0 0  0 0 0 1 0"/></filter>
        <filter id="f-tritan"><feColorMatrix type="matrix" values="0.95 0.05 0 0 0  0 0.433 0.567 0 0  0 0.475 0.525 0 0  0 0 0 1 0"/></filter>
        <filter id="f-achroma"><feColorMatrix type="matrix" values="0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 1 0"/></filter></defs></svg>
      <fieldset class="card"><legend>Simulation</legend><div class="btn-row">${sims.map((s, i) => `<label><input type="radio" name="vs" value="${s[0]}" ${i === 0 ? 'checked' : ''}> ${esc(s[1])}</label>`).join('')}</div></fieldset>
      <div style="position:relative;margin-top:var(--s-4)"><iframe id="v-sample" title="Sample interface: system status chips, hint text and a required-field message" sandbox style="width:100%;height:250px;border:1px solid var(--border);border-radius:8px;background:#fff;transition:filter .2s" srcdoc="${esc(VPAGE)}"></iframe>
        <div id="v-tunnel" aria-hidden="true" style="display:none;position:absolute;inset:0;pointer-events:none;border-radius:8px;background:radial-gradient(circle at 50% 50%,transparent 0,transparent 22%,rgba(0,0,0,.92) 48%)"></div></div>
      <p id="v-note" role="status" class="small muted"></p>`,
      init(root) {
        const sample = root.querySelector('#v-sample'), tun = root.querySelector('#v-tunnel'), note = root.querySelector('#v-note');
        const filt = { none: 'none', protan: 'url(#f-protan)', deutan: 'url(#f-deutan)', tritan: 'url(#f-tritan)', achroma: 'url(#f-achroma)', blur: 'blur(3px)', lowcon: 'contrast(0.45) brightness(1.1)', tunnel: 'none' };
        const msg = { none: 'Normal vision.', protan: 'Red looks darker; red and green become hard to tell apart.', deutan: 'Red and green look similar.', tritan: 'Blue and yellow are harder to tell apart.', achroma: 'Only brightness differences are visible, so contrast and shape matter.', blur: 'Small text and thin lines become unreadable; zoom and large text help.', lowcon: 'Light grey text nearly disappears: aim for strong contrast.', tunnel: 'Only the centre is visible; keep related content close and avoid edge-only cues.' };
        root.querySelectorAll('input[name=vs]').forEach(r => r.addEventListener('change', () => { sample.style.filter = filt[r.value]; tun.style.display = r.value === 'tunnel' ? 'block' : 'none'; note.textContent = msg[r.value]; }));
      } };
  };

  /* ---------------- Flashcards ---------------- */
  V.labExtra.cards = function () {
    return { title: 'Flashcards', recent: { route: '#/lab/cards', title: 'Flashcards' },
      html: `${crumbs('Flashcards')}<h1 id="h1" tabindex="-1">Glossary Flashcards</h1>
      <p class="lead">Think of the definition, reveal it, then say whether you knew it. Review 20 cards for a badge.</p>
      <div class="card" style="text-align:center"><p class="small muted" id="fc-count">Card 1</p><h2 id="fc-term" style="font-size:1.8rem"></h2>
        <p id="fc-def" class="lead" hidden></p>
        <div class="btn-row" style="justify-content:center"><button class="btn btn-primary" type="button" id="fc-show" aria-expanded="false" aria-controls="fc-def">Show definition</button></div>
        <div class="btn-row" style="justify-content:center;margin-top:var(--s-3)" id="fc-rate" hidden><button class="btn" type="button" id="fc-yes">I knew it</button><button class="btn" type="button" id="fc-no">Review again</button></div>
        <p id="fc-stat" role="status" class="small muted"></p></div>`,
      init(root) {
        const deck = D.glossary.slice().sort(() => Math.random() - .5); let i = 0, seen = 0, knew = 0;
        const t = root.querySelector('#fc-term'), d = root.querySelector('#fc-def'), show = root.querySelector('#fc-show'), rate = root.querySelector('#fc-rate'), stat = root.querySelector('#fc-stat');
        function draw() { const c = deck[i % deck.length]; t.textContent = c.term; d.textContent = c.def; d.hidden = true; rate.hidden = true; show.setAttribute('aria-expanded', 'false'); show.hidden = false; root.querySelector('#fc-count').textContent = 'Card ' + (seen + 1); show.focus(); }
        show.addEventListener('click', () => { d.hidden = false; rate.hidden = false; show.setAttribute('aria-expanded', 'true'); show.hidden = true; root.querySelector('#fc-yes').focus(); });
        const next = k => { seen++; if (k) knew++; i++; stat.textContent = `${seen} reviewed · ${knew} known`; if (seen >= 20) award('lab:cards', 20, 'Flash Master!'); draw(); };
        root.querySelector('#fc-yes').addEventListener('click', () => next(true)); root.querySelector('#fc-no').addEventListener('click', () => next(false));
        draw();
      } };
  };

  /* ---------------- Resources ---------------- */
  const AUDIT_TEMPLATE = `# Accessibility audit report\n\n**Product / URL:**\n**Date tested:**  **Tester:**\n**Standard:** WCAG 2.2 Level AA\n**Scope:** (templates, journeys, devices)\n**Tested with:** (browsers, assistive technology and versions)\n\n## Summary\n- Issues found: ___  (Critical ___ / High ___ / Medium ___ / Low ___)\n- Overall conformance: Supports / Partially supports / Does not support\n\n## Issue 1\n- **Title:**\n- **WCAG criterion:** (e.g. 1.1.1 Non-text Content, Level A)\n- **Severity:** Critical / High / Medium / Low\n- **Where:** (URL, component, selector)\n- **What we found:**\n- **Who is affected:**\n- **Steps to reproduce:**\n- **Recommendation:**\n- **Code example:**\n\n## Notes and out-of-scope items\n`;
  const CHEAT = [
    ['Keyboard keys', [['Tab / Shift+Tab', 'Move forward / back between interactive elements'], ['Enter', 'Activate links and buttons'], ['Space', 'Activate buttons, toggle checkboxes, scroll page'], ['Arrow keys', 'Move within radio groups, tabs, menus, listboxes, sliders'], ['Esc', 'Close dialogs, menus and popups'], ['Home / End', 'First / last item in lists, tabs and menus']]],
    ['Contrast and size quick facts', [['Normal text', '4.5:1 (AA) · 7:1 (AAA)'], ['Large text (18pt / 14pt bold)', '3:1 (AA) · 4.5:1 (AAA)'], ['UI components and graphics', '3:1'], ['Target size', '24×24 CSS px (AA 2.5.8) · 44×44 (AAA 2.5.5)'], ['Reflow', 'No 2-D scrolling at 320 CSS px wide'], ['Flashing', 'No more than 3 flashes per second']]],
    ['New in WCAG 2.2', [['2.4.11 Focus Not Obscured (Minimum)', 'AA'], ['2.4.12 Focus Not Obscured (Enhanced)', 'AAA'], ['2.4.13 Focus Appearance', 'AAA'], ['2.5.7 Dragging Movements', 'AA'], ['2.5.8 Target Size (Minimum)', 'AA'], ['3.2.6 Consistent Help', 'A'], ['3.3.7 Redundant Entry', 'A'], ['3.3.8 Accessible Authentication (Minimum)', 'AA'], ['3.3.9 Accessible Authentication (Enhanced)', 'AAA']]],
    ['Common ARIA patterns', [['Button toggle', 'button + aria-pressed'], ['Disclosure', 'button + aria-expanded + aria-controls'], ['Tabs', 'tablist / tab / tabpanel + roving tabindex'], ['Dialog', 'native <dialog> or role="dialog" + aria-modal + label'], ['Status message', 'role="status" (polite) · role="alert" (assertive)'], ['Current page', 'aria-current="page"']]],
    ['Screen reader basics', [['NVDA (Windows)', 'Insert+Space toggles modes · H headings · D landmarks · F form fields · K links · T tables'], ['JAWS (Windows)', 'Insert+F7 links list · H headings · R regions · F form fields'], ['VoiceOver (macOS)', 'Ctrl+Option+U rotor · Ctrl+Option+Right next item'], ['VoiceOver (iOS)', 'Swipe right/left · rotor with two-finger twist'], ['TalkBack (Android)', 'Swipe right/left · swipe up/down for reading controls']]]
  ];
  const TOOLS = [['axe DevTools', 'Automated checks inside browser DevTools; guided manual tests.', 'https://www.deque.com/axe/devtools/'], ['WAVE', 'Visual overlay showing errors, structure and ARIA.', 'https://wave.webaim.org/'], ['Accessibility Insights', 'FastPass, tab-stops visualiser and assessment.', 'https://accessibilityinsights.io/'], ['Colour Contrast Analyser', 'Desktop eyedropper contrast checker.', 'https://www.tpgi.com/color-contrast-checker/'], ['Lighthouse', 'Automated audit in Chrome DevTools.', 'https://developer.chrome.com/docs/lighthouse/'], ['NVDA', 'Free Windows screen reader.', 'https://www.nvaccess.org/'], ['ANDI', 'Bookmarklet to inspect names and descriptions.', 'https://www.ssa.gov/accessibility/andi/help/install.html'], ['PAC', 'PDF Accessibility Checker.', 'https://pdfua.foundation/en/pdf-accessibility-checker-pac/']];
  const LINKS = [['WCAG 2.2 Quick Reference', 'https://www.w3.org/WAI/WCAG22/quickref/'], ['Understanding WCAG 2.2', 'https://www.w3.org/WAI/WCAG22/Understanding/'], ['ARIA Authoring Practices Guide', 'https://www.w3.org/WAI/ARIA/apg/'], ['MDN Accessibility', 'https://developer.mozilla.org/docs/Web/Accessibility'], ['WebAIM', 'https://webaim.org/'], ['The A11y Project', 'https://www.a11yproject.com/'], ['Inclusive Components', 'https://inclusive-components.design/'], ['IAAP', 'https://www.accessibilityassociation.org/'], ['Game Accessibility Guidelines', 'https://gameaccessibilityguidelines.com/']];
  const ext = (u, t) => `<a href="${u}" target="_blank" rel="noopener noreferrer">${esc(t)}<span class="sr-only"> (opens in a new tab)</span></a>`;
  V.resources = function () {
    return { title: 'Resources', recent: { route: '#/resources', title: 'Resources' },
      html: `<h1 id="h1" tabindex="-1">Cheat sheets, tools and resources</h1><p class="lead">Quick references that work offline, plus the tools and links professionals use. External links open in a new tab.</p>
      <nav aria-label="On this page"><ul class="btn-row" style="list-style:none;padding:0"><li><a class="btn" href="#res-cheat">Cheat sheets</a></li><li><a class="btn" href="#res-tools">Tool guide</a></li><li><a class="btn" href="#res-audit">Audit template</a></li><li><a class="btn" href="#res-links">Links</a></li></ul></nav>
      <section class="section" id="res-cheat" aria-labelledby="rc"><h2 id="rc">Cheat sheets</h2><div class="grid grid-2">${CHEAT.map((c, i) => `<div class="card"><h3>${esc(c[0])}</h3><table><caption class="sr-only">${esc(c[0])}</caption><tbody>${c[1].map(r => `<tr><th scope="row">${esc(r[0])}</th><td>${esc(r[1])}</td></tr>`).join('')}</tbody></table></div>`).join('')}</div></section>
      <section class="section" id="res-tools" aria-labelledby="rt"><h2 id="rt">Tool guide</h2><ul class="grid grid-2" style="list-style:none;padding:0">${TOOLS.map(t => `<li class="card"><h3 style="font-size:1.05rem">${ext(t[2], t[0])}</h3><p class="muted">${esc(t[1])}</p></li>`).join('')}</ul>
        <p class="callout"><strong>Remember:</strong> automated tools find only part of the issues. Always add keyboard and screen reader testing.</p></section>
      <section class="section" id="res-audit" aria-labelledby="ra"><h2 id="ra">Audit report template</h2><div class="card"><p>Copy this Markdown template or download it.</p>${ui.codeBlock(AUDIT_TEMPLATE, { title: 'Template text' })}
        <p><button class="btn" type="button" id="dl-audit">Download template (.md)</button></p></div></section>
      <section class="section" id="res-links" aria-labelledby="rl"><h2 id="rl">Further reading</h2><ul>${LINKS.map(l => `<li>${ext(l[1], l[0])}</li>`).join('')}</ul></section>`,
      init(root) {
        root.querySelector('#dl-audit').addEventListener('click', () => { const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([AUDIT_TEMPLATE], { type: 'text/markdown' })); a.download = 'accessibility-audit-template.md'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000); ui.toast('Template downloaded'); });
        root.querySelectorAll('a[href^="#res-"]').forEach(a => a.addEventListener('click', e => { e.preventDefault(); const t = root.querySelector(a.getAttribute('href')); if (t) { t.scrollIntoView(); const h = t.querySelector('h2'); if (h) { h.setAttribute('tabindex', '-1'); h.focus(); } } }));
      } };
  };

  /* ---------------- Certificate ---------------- */
  V.certificate = function () {
    const st = S.s, badges = D.badges.filter(b => st.badges[b.id]), passed = D.levels.filter(l => st.passed && st.passed[l.id]);
    return { title: 'Progress certificate', recent: { route: '#/certificate', title: 'Progress certificate' },
      html: `<h1 id="h1" tabindex="-1">Progress summary</h1><p class="lead">A self-reported summary of what you have completed in A11y Academy. It is not an official certification.</p>
      <div class="card" id="cert" style="padding:var(--s-6);text-align:center"><p class="eyebrow">A11y Academy</p><h2 style="font-size:2rem;margin:0" id="cert-name">Your name</h2>
        <p>has completed the following learning activities:</p>
        <ul style="list-style:none;padding:0;display:inline-block;text-align:left"><li><strong>${S.learnedCount()}</strong> of 86 WCAG 2.2 criteria mastered</li><li><strong>${passed.length}</strong> of ${D.levels.length} level checkpoints passed${passed.length ? ' (' + passed.map(l => esc(l.name)).join(', ') + ')' : ''}</li><li><strong>${badges.length}</strong> of ${D.badges.length} badges earned</li><li><strong>${st.xp}</strong> XP · Rank ${S.rank()}</li></ul>
        <p class="small muted">Generated ${new Date().toLocaleDateString()}</p></div>
      <div class="btn-row" style="margin-top:var(--s-4)"><label>Name on summary <input type="text" id="cert-in" autocomplete="name"></label><button class="btn btn-primary" type="button" id="cert-print">Print or save as PDF</button></div>`,
      init(root) { const n = root.querySelector('#cert-in'); n.addEventListener('input', () => { root.querySelector('#cert-name').textContent = n.value.trim() || 'Your name'; }); root.querySelector('#cert-print').addEventListener('click', () => window.print()); } };
  };

  /* ---------------- How to add lessons ---------------- */
  V.guide = function () {
    return { title: 'How to add lessons', html: `<h1 id="h1" tabindex="-1">How to add new lessons</h1><p class="lead">A11y Academy is plain HTML, CSS and JavaScript. Content lives in data files under <code>js/data/</code>; no build step is needed.</p>
      <section class="section"><h2>1. Add a lesson</h2><p>Create or edit a file like <code>lessons-p2.js</code> and call <code>A.data.lessons.push({...})</code> (or use the <code>L(...)</code> helper) with an id, topic, level, minutes, criteria, title, summary, body (HTML using <code>&lt;h2&gt;</code> headings) and a quiz.</p>
        ${ui.codeBlock("A.data.lessons.push({\n  id: 'forms-my-lesson', topic: 'forms', level: 'beginner', minutes: 5,\n  criteria: ['3.3.2'], title: 'My lesson', summary: 'One sentence.',\n  body: '<p>Intro</p><h2>Key points</h2><ul><li>Point</li></ul>',\n  quiz: [{ q: 'Question?', options: ['A', 'B'], answer: 0, why: 'Because.' }]\n});", { title: 'Lesson example' })}</section>
      <section class="section"><h2>2. Add a criterion mini-lesson</h2><p>In <code>criteria-p1.js</code> style, call <code>C(num, explain, who[], test[], failures[], techniques[], demo, quiz)</code> to fill <code>A.data.criteriaContent</code>.</p></section>
      <section class="section"><h2>3. Add a hub</h2><p>Add an entry to <code>A.data.hubs[topicId]</code> with patterns, demo, failures, checklist, audit, challenge and quiz. A badge is created automatically when you push it to <code>A.data.badges</code> as shown in <code>hubs-p6.js</code>.</p></section>
      <section class="section"><h2>4. Register scripts and test</h2><p>List new files in <code>index.html</code> before <code>store.js</code>. Run axe on new pages and check the console for errors.</p></section>
      <section class="section"><h2>5. Glossary</h2><p>Push <code>{ term, def }</code> items to <code>A.data.glossary</code>.</p></section>` };
  };
})(window.A11Y = window.A11Y || {});
