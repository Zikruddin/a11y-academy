/* App shell: hash router, sidebar roadmap, display preferences, command palette. */
(function (A) {
  'use strict';
  const D = A.data, S = A.store, ui = A.ui, V = A.views, esc = ui.esc;
  const main = document.getElementById('main');
  let first = true;

  /* ---------- router ---------- */
  function parse() {
    const h = location.hash.replace(/^#\/?/, '');
    const [path, qs] = h.split('?');
    return { parts: path.split('/').filter(Boolean).map(decodeURIComponent), q: new URLSearchParams(qs || '') };
  }
  function resolve(r) {
    const [a, b] = r.parts;
    switch (a) {
      case undefined: return { v: V.home(), nav: 'home' };
      case 'learn': return { v: V.learn(r.q), nav: 'learn' };
      case 'level': return { v: V.level(b), nav: 'learn' };
      case 'topic': return { v: V.topic(b), nav: 'learn' };
      case 'lesson': return { v: V.lesson(b), nav: 'learn' };
      case 'criteria': return { v: V.criteria(), nav: 'criteria' };
      case 'criterion': return { v: V.criterion(b), nav: 'criteria' };
      case 'dashboard': return { v: V.dashboard(), nav: 'dashboard' };
      case 'glossary': return { v: V.glossary(r.q), nav: 'glossary' };
      case 'placement': return { v: V.placement(), nav: 'learn' };
      case 'checkpoint': return { v: V.checkpoint(b, false), nav: 'learn' };
      case 'skip': return { v: V.checkpoint(b, true), nav: 'learn' };
      case 'accessibility-statement': return { v: V.statement(), nav: '' };
      case 'labs': return { v: V.labs(), nav: 'labs' };
      case 'resources': return { v: V.resources(), nav: 'resources' };
      case 'certificate': return { v: V.certificate(), nav: '' };
      case 'guide': return { v: V.guide(), nav: '' };
      case 'lab': return { v: V.lab(b), nav: 'labs' };
      case 'roadmap': return { v: V.roadmap(), nav: '' };
      default: return { v: V.notFound(), nav: '' };
    }
  }

  function render() {
    const r = parse(), res = resolve(r), v = res.v;
    main.innerHTML = v.html;
    document.title = v.title + ' — A11y Academy';
    document.querySelectorAll('[data-nav]').forEach(a => {
      if (a.dataset.nav === res.nav) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    if (v.recent) S.setRecent(v.recent.route, v.recent.title);
    if (v.init) v.init(main);
    ui.bindCopy(main);
    renderSidebar(r);
    const h1 = main.querySelector('h1');
    if (!first) {
      window.scrollTo(0, 0);
      if (h1) h1.focus({ preventScroll: true });
      ui.announce('Navigated to ' + v.title);
    }
    first = false;
  }
  A.app = { render };

  /* ---------- sidebar roadmap ---------- */
  function renderSidebar(r) {
    const nav = document.getElementById('sidebar-nav');
    const cur = '#/' + r.parts.join('/');
    const link = (href, html) => `<a href="${href}"${cur === href ? ' aria-current="page"' : ''}>${html}</a>`;
    const activeTopic = r.parts[0] === 'topic' ? D.topicById[r.parts[1]] : r.parts[0] === 'lesson' ? (D.lessons.find(l => l.id === r.parts[1]) || {}).topic && D.topicById[D.lessons.find(l => l.id === r.parts[1]).topic] : null;
    const lvStat = id => { const cs = D.criteria.filter(c => c.difficulty === id); return cs.filter(c => S.isLearned(c.num)).length + '/' + cs.length; };
    nav.innerHTML = `
      ${S.s.recent ? `<h2>Continue</h2><ul><li>${link(S.s.recent.route, '<span aria-hidden="true">▶</span> ' + esc(S.s.recent.title))}</li></ul>` : ''}
      <h2>Levels</h2>
      <ul>${D.levels.map(l => `<li>${link('#/level/' + l.id, `<span aria-hidden="true">${l.icon}</span> ${esc(l.name)}${S.levelUnlocked(l.id) ? '' : ' <span aria-hidden="true">🔒</span><span class="sr-only">(locked)</span>'}<span class="count">${lvStat(l.id)}</span>`)}</li>`).join('')}</ul>
      <h2>Topic hubs</h2>
      ${D.groups.map(g => `<details${activeTopic && activeTopic.group === g.id ? ' open' : ''}><summary>${g.id}. ${esc(g.name)}</summary>
        <ul>${D.topics.filter(t => t.group === g.id).map(t => `<li>${link('#/topic/' + t.id, `<span aria-hidden="true">${t.icon}</span> ${esc(t.name)}`)}</li>`).join('')}</ul></details>`).join('')}
      <h2>Tools</h2>
      <ul>
        <li>${link('#/criteria', '<span aria-hidden="true">✅</span> WCAG Explorer')}</li>
        <li>${link('#/dashboard', '<span aria-hidden="true">📈</span> Progress')}</li>
        <li>${link('#/labs', '<span aria-hidden="true">🧪</span> Labs and simulators')}</li>
        <li>${link('#/resources', '<span aria-hidden="true">🧰</span> Cheat sheets and tools')}</li>
        <li>${link('#/glossary', '<span aria-hidden="true">📖</span> Glossary')}</li>
        <li>${link('#/placement', '<span aria-hidden="true">🎯</span> Find your level')}</li>
      </ul>`;
  }

  /* ---------- display preferences ---------- */
  function applyPrefs() {
    const p = S.s.prefs, root = document.documentElement;
    root.dataset.theme = p.theme;
    root.style.setProperty('--font-scale', Number(p.font) / 100);
    root.dataset.spacing = p.spacing;
    root.dataset.dyslexia = p.dyslexia ? 'on' : 'off';
    root.dataset.motion = p.motion === 'reduce' ? 'reduce' : 'system';
  }
  function initPrefs() {
    const dlg = document.getElementById('prefs'), form = document.getElementById('prefs-form');
    function sync() {
      const p = S.s.prefs;
      ['theme', 'font', 'spacing'].forEach(k => { const el = form.querySelector(`input[name=${k}][value="${p[k]}"]`); if (el) el.checked = true; });
      form.querySelector('input[name=dyslexia]').checked = !!p.dyslexia;
      form.querySelector('input[name=motion]').checked = p.motion === 'reduce';
    }
    document.getElementById('open-prefs').addEventListener('click', () => { sync(); dlg.showModal(); });
    form.addEventListener('change', e => {
      const t = e.target;
      if (t.type === 'radio') S.setPrefs({ [t.name]: t.value });
      else if (t.name === 'dyslexia') S.setPrefs({ dyslexia: t.checked });
      else if (t.name === 'motion') S.setPrefs({ motion: t.checked ? 'reduce' : 'system' });
      applyPrefs();
    });
    document.getElementById('prefs-reset').addEventListener('click', () => {
      S.setPrefs({ theme: 'auto', font: '100', spacing: 'normal', dyslexia: false, motion: 'system' }); applyPrefs(); sync();
      ui.announce('Display settings reset');
    });
  }

  /* ---------- command palette (combobox + listbox) ---------- */
  let index = null;
  function buildIndex() {
    index = [];
    D.topics.forEach(t => index.push({ kind: 'Topic', title: t.name, sub: t.summary, href: '#/topic/' + t.id, text: (t.name + ' ' + t.summary).toLowerCase() }));
    D.criteria.forEach(c => index.push({ kind: 'Criterion', title: c.num + ' ' + c.name, sub: 'Level ' + c.level, href: '#/criterion/' + c.num, text: (c.num + ' ' + c.name + ' level ' + c.level).toLowerCase() }));
    D.lessons.forEach(l => index.push({ kind: 'Lesson', title: l.title, sub: l.summary, href: '#/lesson/' + l.id, text: (l.title + ' ' + l.summary).toLowerCase() }));
    D.glossary.forEach(g => index.push({ kind: 'Glossary', title: g.term, sub: g.def, href: '#/glossary?term=' + encodeURIComponent(g.term), text: (g.term + ' ' + g.def).toLowerCase() }));
    [['Labs and simulators', '#/labs'], ['Resources: cheat sheets and tools', '#/resources'], ['Progress certificate', '#/certificate'], ['How to add lessons', '#/guide'], ['Bug Hunt', '#/lab/bughunt'], ['Keyboard-Only Challenge', '#/lab/keyboard'], ['Screen Reader Simulator', '#/lab/screenreader'], ['Contrast Lab', '#/lab/contrast'], ['Vision Simulators', '#/lab/vision'], ['Glossary Flashcards', '#/lab/cards'], ['Drag-and-Drop Lab', '#/lab/dnd'], ['Component Lab', '#/lab/components']].forEach(x => index.push({ kind: 'Page', title: x[0], sub: '', href: x[1], text: x[0].toLowerCase() }));
    D.levels.forEach(l => index.push({ kind: 'Level', title: l.name, sub: l.blurb, href: '#/level/' + l.id, text: (l.name + ' ' + l.blurb).toLowerCase() }));
  }
  function initPalette() {
    const dlg = document.getElementById('palette'), inp = document.getElementById('palette-q'), list = document.getElementById('palette-list');
    let items = [], sel = 0, opener = null;

    function paint() {
      const q = inp.value.trim().toLowerCase();
      if (!index) buildIndex();
      const tokens = q.split(/\s+/).filter(Boolean);
      items = (tokens.length
        ? index.filter(x => tokens.every(t => x.text.includes(t)))
          .sort((a, b) => (b.title.toLowerCase().startsWith(q) - a.title.toLowerCase().startsWith(q)) || (b.title.toLowerCase().includes(q) - a.title.toLowerCase().includes(q)))
        : index.filter(x => x.kind === 'Level' || x.kind === 'Lesson' || (x.kind === 'Topic' && x.href.endsWith('video')))).slice(0, 30);
      sel = 0;
      list.innerHTML = items.length
        ? items.map((x, i) => `<li role="presentation"><div role="option" id="po-${i}" aria-selected="${i === 0}" data-i="${i}"><span class="kind">${x.kind}</span><span><strong>${esc(x.title)}</strong><br><span class="small" style="opacity:.85">${esc(x.sub.length > 90 ? x.sub.slice(0, 90) + '…' : x.sub)}</span></span></div></li>`).join('')
        : '<li role="presentation" class="muted" style="padding:var(--s-3)">No matches. Try a criterion number like 2.5.7 or a word like “focus”.</li>';
      inp.setAttribute('aria-activedescendant', items.length ? 'po-0' : '');
      ui.announce(items.length ? items.length + ' results' + (items.length === 30 ? ' (showing first 30)' : '') : 'No results');
    }
    function move(d) {
      if (!items.length) return;
      list.querySelector(`#po-${sel}`).setAttribute('aria-selected', 'false');
      sel = (sel + d + items.length) % items.length;
      const el = list.querySelector(`#po-${sel}`);
      el.setAttribute('aria-selected', 'true'); inp.setAttribute('aria-activedescendant', el.id);
      el.scrollIntoView({ block: 'nearest' });
    }
    function go(i) {
      const it = items[i]; if (!it) return;
      dlg.close(); location.hash = it.href;
    }
    function open() {
      opener = document.activeElement;
      inp.value = ''; paint(); dlg.showModal(); inp.focus();
    }
    inp.addEventListener('input', paint);
    inp.addEventListener('keydown', e => {
      if (e.key === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (e.key === 'Enter') { e.preventDefault(); go(sel); }
    });
    list.addEventListener('click', e => { const o = e.target.closest('[role=option]'); if (o) go(Number(o.dataset.i)); });
    dlg.addEventListener('close', () => { if (opener && document.contains(opener)) opener.focus(); });
    document.getElementById('palette-close').addEventListener('click', () => dlg.close());
    ['open-palette', 'open-palette-mobile'].forEach(id => document.getElementById(id).addEventListener('click', open));
    document.addEventListener('keydown', e => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (dlg.open) dlg.close(); else open();
      }
    });
    // clicking the backdrop closes
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  }

  /* ---------- boot ---------- */
  function boot() {
    applyPrefs();
    initPrefs();
    initPalette();
    // Skip links must not hit the router (they would change the hash route).
    document.querySelectorAll('.skip-link').forEach(a => a.addEventListener('click', e => {
      e.preventDefault();
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { t.setAttribute('tabindex', '-1'); t.focus(); t.scrollIntoView(); }
    }));
    const xp = document.getElementById('hdr-xp-num');
    const upd = () => { xp.textContent = S.s.xp; };
    A.bus.on('change', upd); upd();
    A.bus.on('badges', list => {
      list.forEach(b => ui.toast(`Badge earned: ${b.name}`));
      ui.confetti();
    });
    window.addEventListener('hashchange', render);
    // keep sidebar counts fresh without re-rendering the page
    A.bus.on('change', () => renderSidebar(parse()));
    render();
  }
  boot();
})(window.A11Y = window.A11Y || {});
