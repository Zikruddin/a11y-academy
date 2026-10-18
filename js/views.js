/* Views: each returns { title, html, init(root) } and is rendered into <main> by the router. */
(function (A) {
  'use strict';
  const D = A.data, S = A.store, ui = A.ui, esc = ui.esc;
  const V = A.views = {};

  /* ---------- shared helpers ---------- */
  const lessonsOf = (topic, level) => D.lessons.filter(l => l.topic === topic && (!level || l.level === level));
  const critOf = (topic, level) => D.topicById[topic].criteria.map(n => D.criterionByNum[n]).filter(c => !level || c.difficulty === level);
  function cellStats(topic, level) {
    const cs = critOf(topic, level), ls = lessonsOf(topic, level);
    return { done: cs.filter(c => S.isLearned(c.num)).length + ls.filter(l => S.lessonDone(l.id)).length, total: cs.length + ls.length };
  }
  function levelStats(level) {
    const cs = D.criteria.filter(c => c.difficulty === level), ls = D.lessons.filter(l => l.level === level);
    return { done: cs.filter(c => S.isLearned(c.num)).length + ls.filter(l => S.lessonDone(l.id)).length, total: cs.length + ls.length, crit: cs.length };
  }
  function topicStats(topic) {
    const cs = critOf(topic), ls = lessonsOf(topic);
    const done = cs.filter(c => S.isLearned(c.num)).length + ls.filter(l => S.lessonDone(l.id)).length;
    return { done, total: cs.length + ls.length };
  }
  const pct = (d, t) => (t ? (d / t) * 100 : 0);
  const levelById = id => D.levels.find(l => l.id === id);
  const principleOf = c => `${c.principle}. ${D.principles[c.principle].name}`;
  const phaseForCriterion = c => ({ 1: 2, 2: 3, 3: 5, 4: 5 }[c.principle]);
  const crumbs = items => `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${items.map((it, i) =>
    i === items.length - 1 ? `<li><span aria-current="page">${esc(it[0])}</span></li>` : `<li><a href="${it[1]}">${esc(it[0])}</a></li>`).join('')}</ol></nav>`;

  function topicCard(t) {
    const st = topicStats(t.id);
    return `<article class="card card-link">
      <div class="btn-row" style="justify-content:space-between"><span aria-hidden="true" style="font-size:1.8rem">${t.icon}</span>${ui.ring(pct(st.done, st.total), t.name + ' progress')}</div>
      <h4 style="margin:0"><a class="stretched" href="#/topic/${t.id}">${esc(t.name)}</a></h4>
      <p class="muted small" style="margin:0">${esc(t.summary)}</p>
      <p class="small" style="margin:0"><span class="chip">${t.criteria.length ? t.criteria.length + ' criteria' : 'Cross-cutting'}</span> <span class="chip">${st.done}/${st.total} done</span></p>
    </article>`;
  }
  function topicGrid() {
    return D.groups.map(g => `<section aria-labelledby="grp-${g.id}" class="section" style="margin-top:var(--s-5)">
      <h3 id="grp-${g.id}"><span class="muted">${g.id}.</span> ${esc(g.name)}</h3>
      <div class="grid">${D.topics.filter(t => t.group === g.id).map(topicCard).join('')}</div></section>`).join('');
  }
  function levelCard(l) {
    const st = levelStats(l.id), open = S.levelUnlocked(l.id);
    return `<article class="card card-link">
      <div class="btn-row" style="justify-content:space-between">${ui.levelBadge(l.id)}${ui.ring(pct(st.done, st.total), l.name + ' progress')}</div>
      <h3><a class="stretched" href="#/level/${l.id}">${esc(l.name)}${open ? '' : ' <span aria-hidden="true">🔒</span><span class="sr-only">(locked)</span>'}</a></h3>
      <p class="muted small" style="margin:0">${esc(l.blurb)}</p>
      <p class="small" style="margin:0">${open ? `<span class="chip">${st.done}/${st.total} done</span>` : '<span class="chip">Locked — pass the checkpoint</span>'}</p>
    </article>`;
  }
  function matrixHTML() {
    const head = D.levels.map(l => `<th scope="col">${ui.levelBadge(l.id)}</th>`).join('');
    const rows = D.topics.map(t => `<tr><th scope="row"><a href="#/topic/${t.id}"><span aria-hidden="true">${t.icon}</span> ${esc(t.name)}</a></th>${D.levels.map(l => {
      const st = cellStats(t.id, l.id);
      const cls = st.total === 0 ? 'none' : st.done === st.total ? 'full' : st.done > 0 ? 'part' : '';
      const txt = st.total === 0 ? '—' : `${st.done}/${st.total}`;
      const vis = (st.done === st.total && st.total ? '✓ ' : '') + txt;
      const lab = st.total === 0 ? `${vis}, ${t.name}, ${l.name}: no items yet` : `${vis}, ${t.name}, ${l.name}: ${st.done} of ${st.total} done`;
      return `<td><a class="cell ${cls}" href="#/topic/${t.id}" aria-label="${esc(lab)}">${st.done === st.total && st.total ? '✓ ' : ''}${txt}</a></td>`;
    }).join('')}</tr>`).join('');
    return `<div class="table-wrap" tabindex="0" role="region" aria-label="Topics by level completion matrix, scrollable">
      <table class="matrix"><caption>Completion by topic and level. Each cell counts mastered criteria plus finished lessons.</caption>
      <thead><tr><th scope="col">Topic</th>${head}</tr></thead><tbody>${rows}</tbody></table></div>`;
  }
  function criterionOfDay() {
    const day = Math.floor((Date.now() - new Date().getTimezoneOffset() * 6e4) / 864e5);
    return D.criteria[day % D.criteria.length];
  }
  function statsStrip() {
    const st = S.s;
    return `<div class="stats" role="list">
      <div class="stat" role="listitem"><b>${S.learnedCount()}<span style="font-size:1rem"> / 86</span></b><span>criteria mastered</span></div>
      <div class="stat" role="listitem"><b>${Object.keys(st.lessons).length}</b><span>lessons completed</span></div>
      <div class="stat" role="listitem"><b>${st.streak.count}<span aria-hidden="true"> 🔥</span></b><span>day streak (best ${st.streak.best})</span></div>
      <div class="stat" role="listitem"><b>${st.xp}</b><span>XP · rank ${S.rank()}</span></div>
    </div>`;
  }
  function continueCard() {
    const r = S.s.recent;
    if (!r) return '';
    return `<div class="card" style="margin-top:var(--s-5)"><p class="eyebrow">Continue where you left off</p>
      <p style="margin:0"><a class="btn btn-primary" href="${esc(r.route)}">Resume: ${esc(r.title)} →</a></p></div>`;
  }
  const phaseNote = n => `Full hub content arrives in Phase ${n}.`;

  /* ---------- HOME ---------- */
  V.home = function () {
    const c = criterionOfDay();
    return {
      title: 'Home',
      html: `
      <section class="hero" aria-labelledby="h1">
        <p class="eyebrow">Interactive web accessibility course</p>
        <h1 id="h1" tabindex="-1">Learn web accessibility by <em>doing</em>, not just reading.</h1>
        <p class="lead">All 86 WCAG 2.2 criteria, 28 topic hubs, live Broken vs Fixed demos, quizzes and games — in 5-minute lessons you can take by level or by topic.</p>
        <div class="hero-actions">
          <a class="btn btn-primary btn-lg" href="#/learn">Start learning</a>
          <a class="btn btn-lg" href="#/placement">Find your level</a>
          <a class="btn btn-lg btn-ghost" href="#/criteria">Browse all 86 criteria</a>
        </div>
        ${statsStrip()}
        ${continueCard()}
      </section>

      <section class="section" aria-labelledby="three-ways">
        <div class="section-head"><h2 id="three-ways">Three ways to learn</h2></div>
        <div class="grid grid-3">
          <article class="card card-link"><span aria-hidden="true" style="font-size:1.8rem">🪜</span><h3><a class="stretched" href="#/learn?mode=level">Learn by Level</a></h3><p class="muted" style="margin:0">Beginner → Intermediate → Advanced → Pro+. Pass a checkpoint to unlock the next, or skip ahead with a test.</p></article>
          <article class="card card-link"><span aria-hidden="true" style="font-size:1.8rem">🧩</span><h3><a class="stretched" href="#/learn?mode=topic">Learn by Topic</a></h3><p class="muted" style="margin:0">Only want to master video, forms or ARIA widgets? Each hub has its own Beginner → Pro+ track.</p></article>
          <article class="card card-link"><span aria-hidden="true" style="font-size:1.8rem">📖</span><h3><a class="stretched" href="#/learn?mode=criteria">Browse all 86 criteria</a></h3><p class="muted" style="margin:0">Filter WCAG 2.2 by principle, level, difficulty, topic or who it helps — and track what you’ve mastered.</p></article>
        </div>
      </section>

      <section class="section" aria-labelledby="cotd">
        <div class="section-head"><h2 id="cotd">Criterion of the day</h2></div>
        <div class="card">
          <p class="btn-row" style="margin-bottom:var(--s-2)">${ui.wcagBadge(c.level)} ${ui.levelBadge(c.difficulty)} ${c.isNew22 ? '<span class="badge badge-new">New in 2.2</span>' : ''}</p>
          <h3>${c.num} ${esc(c.name)}</h3>
          <p class="muted">${esc(principleOf(c))} · ${esc(D.guidelines[c.guideline])}</p>
          <a class="btn btn-primary" href="#/criterion/${c.num}">Learn this criterion</a>
        </div>
      </section>

      <section class="section" aria-labelledby="topics-h">
        <div class="section-head"><h2 id="topics-h">Topic hubs</h2><a href="#/learn?mode=topic">Open topic view</a></div>
        ${topicGrid()}
      </section>

      <section class="section" aria-labelledby="matrix-h">
        <div class="section-head"><h2 id="matrix-h">Your progress matrix</h2><a href="#/dashboard">Open dashboard</a></div>
        ${matrixHTML()}
      </section>`
    };
  };

  /* ---------- LEARN (level | topic | criteria) ---------- */
  V.learn = function (q) {
    let mode = q.get('mode') || S.s.mode || 'level';
    if (!['level', 'topic', 'criteria'].includes(mode)) mode = 'level';
    const modes = [['level', 'Learn by Level'], ['topic', 'Learn by Topic'], ['criteria', 'Browse all 86 WCAG criteria']];
    const body = m => m === 'level'
      ? `<div class="grid grid-3">${D.levels.map(levelCard).join('')}</div>
         <div class="card" style="margin-top:var(--s-5)"><h3>Already experienced?</h3><p class="muted">Take the placement quiz for a recommendation, or a skip-ahead test to unlock a higher level straight away.</p>
         <div class="btn-row"><a class="btn" href="#/placement">Find your level</a>${D.levels.slice(1).map(l => `<a class="btn btn-ghost" href="#/skip/${l.id}">Skip to ${esc(l.name)}</a>`).join('')}</div></div>`
      : m === 'topic' ? topicGrid() : explorerHTML();
    return {
      title: 'Learn',
      html: `<h1 id="h1" tabindex="-1">Learn</h1>
        <p class="lead">Every lesson has a <strong>level</strong> and a <strong>topic</strong>. Choose how you want to move through them.</p>
        <div role="group" aria-label="How do you want to learn?" class="segmented" id="mode-toggle">
          ${modes.map(([id, label]) => `<button type="button" class="btn" data-mode="${id}" aria-pressed="${id === mode}">${label}</button>`).join('')}
        </div>
        <div id="learn-body" class="section" style="margin-top:var(--s-5)"><h2 class="sr-only">Choose a path</h2>${body(mode)}</div>`,
      init(root) {
        const host = root.querySelector('#learn-body');
        if (mode === 'criteria') explorerInit(host);
        root.querySelectorAll('#mode-toggle [data-mode]').forEach(b => b.addEventListener('click', () => {
          const m = b.dataset.mode; S.setMode(m);
          root.querySelectorAll('#mode-toggle [data-mode]').forEach(x => x.setAttribute('aria-pressed', String(x === b)));
          host.innerHTML = '<h2 class="sr-only">Choose a path</h2>' + body(m);
          if (m === 'criteria') explorerInit(host);
          history.replaceState(null, '', '#/learn?mode=' + m);
          ui.announce(modes.find(x => x[0] === m)[1] + ' view shown');
        }));
      }
    };
  };

  /* ---------- LEVEL ---------- */
  V.level = function (id) {
    const l = levelById(id);
    if (!l) return V.notFound();
    const open = S.levelUnlocked(id), prev = l.requires && levelById(l.requires);
    const st = levelStats(id);
    const lessonRows = D.lessons.filter(x => x.level === id).map(x => lessonRow(x)).join('');
    const perTopic = D.topics.map(t => {
      const cs = critOf(t.id, id);
      if (!cs.length) return '';
      const done = cs.filter(c => S.isLearned(c.num)).length;
      return `<li class="lesson-row"><span class="title"><a href="#/topic/${t.id}"><span aria-hidden="true">${t.icon}</span> ${esc(t.name)}</a></span>
        <span class="muted small">${cs.map(c => `<a href="#/criterion/${c.num}">${c.num}</a>`).join(', ')}</span><span class="chip">${done}/${cs.length}</span></li>`;
    }).join('');
    return {
      title: l.name + ' level',
      html: `${crumbs([['Home', '#/'], ['Learn', '#/learn?mode=level'], [l.name, '']])}
        <div class="btn-row">${ui.levelBadge(id)} ${open ? '' : '<span class="chip">🔒 Locked</span>'}</div>
        <h1 id="h1" tabindex="-1">${esc(l.name)}</h1>
        <p class="lead">${esc(l.blurb)}</p>
        ${open ? `<div class="btn-row" style="margin-bottom:var(--s-5)">${ui.ring(pct(st.done, st.total), l.name + ' progress', true)}<p style="margin:0">${st.done} of ${st.total} items done</p></div>`
          : `<div class="card"><div class="locked-note"><span aria-hidden="true" style="font-size:2rem">🔒</span><div>
              <h2 style="margin-bottom:var(--s-2)">This level is locked</h2>
              <p>Pass the <strong>${esc(prev.name)}</strong> checkpoint (70% or more) to unlock it — or prove you already know the material with a skip-ahead test (80%).</p>
              <div class="btn-row"><a class="btn btn-primary" href="#/checkpoint/${prev.id}">Take the ${esc(prev.name)} checkpoint</a><a class="btn" href="#/skip/${id}">Skip-ahead test</a></div></div></div></div>`}
        ${pathHTML(id, open)}
        <section class="section" aria-labelledby="ll">
          <h2 id="ll">Lessons at this level</h2>
          ${lessonRows ? `<div>${lessonRows}</div>` : '<p class="muted">No lessons authored at this level yet — more arrive each phase. The criteria below are ready to study.</p>'}
        </section>
        <section class="section" aria-labelledby="cl">
          <h2 id="cl">WCAG criteria tagged ${esc(l.name)}</h2>
          <ul style="list-style:none;padding:0">${perTopic}</ul>
        </section>
        ${open ? `<section class="section card" aria-labelledby="ck"><h2 id="ck">${esc(l.name)} checkpoint</h2>
          <p class="muted">Four questions. Score 70% or more to ${l.order < 4 ? 'unlock the next level' : 'earn the Pro+ badge'}.</p>
          <a class="btn btn-primary" href="#/checkpoint/${id}">Start checkpoint</a></section>` : ''}`
    };
  };

  function pathHTML(levelId, open) {
    const ids = D.paths && D.paths[levelId];
    if (!ids || !open) return '';
    const items = ids.map(i => D.lessons.find(l => l.id === i)).filter(Boolean);
    const next = items.find(l => !S.lessonDone(l.id));
    const done = items.filter(l => S.lessonDone(l.id)).length;
    return `<section class="section" aria-labelledby="pth"><h2 id="pth">Your ${esc(levelById(levelId).name)} path</h2>
      <p class="muted">${items.length} short lessons in a recommended order — ${done} of ${items.length} complete.</p>
      ${ui.bar(pct(done, items.length), 'Path progress')}
      ${next ? `<p style="margin-top:var(--s-3)"><a class="btn btn-primary" href="#/lesson/${next.id}">${done ? 'Next up' : 'Start'}: ${esc(next.title)} →</a></p>` : '<p class="check" style="margin-top:var(--s-3)"><span aria-hidden="true">✓</span> Path complete! Take the checkpoint below.</p>'}
      <ol class="path-list">${items.map(l => `<li>${S.lessonDone(l.id) ? '<span class="check"><span aria-hidden="true">✓</span><span class="sr-only">Done: </span></span> ' : ''}<a href="#/lesson/${l.id}">${esc(l.title)}</a> <span class="muted small">· ${esc(D.topicById[l.topic].name)} · ${l.minutes} min</span></li>`).join('')}</ol></section>`;
  }

  function lessonRow(x) {
    const t = D.topicById[x.topic], done = S.lessonDone(x.id), open = S.levelUnlocked(x.level);
    return `<div class="lesson-row"><span class="title"><a href="#/lesson/${x.id}">${esc(x.title)}</a></span>
      ${ui.levelBadge(x.level)} <a class="tag" href="#/topic/${t.id}"><span aria-hidden="true">${t.icon}</span> ${esc(t.name)}</a>
      <span class="muted small">${x.minutes} min</span>${open ? '' : '<span class="chip">🔒 Locked</span>'}${done ? '<span class="check"><span aria-hidden="true">✓</span> Done</span>' : ''}</div>`;
  }

  /* ---------- TOPIC HUB ---------- */
  V.topic = function (id) {
    const t = D.topicById[id];
    if (!t) return V.notFound();
    const g = D.groups.find(x => x.id === t.group), st = topicStats(id), hub = D.hubs && D.hubs[id];
    const track = D.levels.map(l => {
      const ls = lessonsOf(id, l.id), cs = critOf(id, l.id), open = S.levelUnlocked(l.id);
      return `<section class="card" aria-labelledby="trk-${l.id}">
        <div class="btn-row" style="justify-content:space-between"><h3 id="trk-${l.id}" style="margin:0">${ui.levelBadge(l.id)}</h3>${open ? '' : '<span class="chip">🔒 Locked</span>'}</div>
        ${ls.length ? ls.map(lessonRow).join('') : `<div class="lesson-row todo">No lesson at this level yet${t.phase > 2 ? ' — ' + esc(phaseNote(t.phase).replace('Full hub content', 'arrives with the hub content')) : ' — more are added as the course grows'}.</div>`}
        ${cs.length ? `<p class="small muted" style="margin:var(--s-3) 0 var(--s-1)">Criteria at this level:</p><div class="btn-row" style="gap:var(--s-2)">${cs.map(c => `<a class="tag" href="#/criterion/${c.num}">${S.isLearned(c.num) ? '<span aria-hidden="true">✓</span><span class="sr-only">Learned: </span>' : ''}${c.num} ${esc(c.name)}</a>`).join('')}</div>` : ''}
      </section>`;
    }).join('');
    const parts = [
      ['Overview and who is affected', 'Ready'], ['Mapped WCAG 2.2 criteria', 'Ready'], ['Beginner → Pro+ lesson track', 'Structure ready'],
      ['Patterns (do / don’t)', 'Phase ' + t.phase], ['Live Broken vs Fixed demo', 'Phase ' + t.phase], ['Real-life failures', 'Phase ' + t.phase],
      ['Testing checklist (manual, tools, screen readers)', 'Phase ' + t.phase], ['Audit-report snippet', 'Phase ' + t.phase],
      ['Mini-game or challenge', 'Phase ' + t.phase], ['Hub quiz and badge', 'Phase ' + t.phase]
    ];
    const idx = D.topics.indexOf(t), prev = D.topics[idx - 1], next = D.topics[idx + 1];
    return {
      title: t.name,
      recent: { route: '#/topic/' + id, title: t.name },
      html: `${crumbs([['Home', '#/'], ['Learn', '#/learn?mode=topic'], [t.name, '']])}
        <p class="eyebrow">Hub ${t.n} of 28 · ${g.id}. ${esc(g.name)}</p>
        <div class="btn-row"><span aria-hidden="true" style="font-size:2.4rem">${t.icon}</span><h1 id="h1" tabindex="-1" style="margin:0">${esc(t.name)}</h1></div>
        <p class="lead">${esc(t.summary)}</p>
        <div class="btn-row">${ui.ring(pct(st.done, st.total), t.name + ' progress', true)}<p style="margin:0">${st.done} of ${st.total} items done</p></div>

        <section class="section" aria-labelledby="who"><h2 id="who">Who is affected</h2>
          <ul>${t.who.map(w => `<li>${esc(w)}</li>`).join('')}</ul></section>

        <section class="section" aria-labelledby="map"><h2 id="map">Mapped WCAG 2.2 criteria</h2>
          ${t.criteria.length ? `<div class="btn-row" style="gap:var(--s-2)">${t.criteria.map(n => { const c = D.criterionByNum[n]; return `<a class="tag" href="#/criterion/${n}">${S.isLearned(n) ? '<span aria-hidden="true">✓</span><span class="sr-only">Learned: </span>' : ''}${n} ${esc(c.name)} <b>${c.level}</b></a>`; }).join('')}</div>`
            : '<p class="muted">This hub is cross-cutting: it applies to every criterion rather than a fixed subset.</p>'}
        </section>

        <section class="section" aria-labelledby="trk"><h2 id="trk">Learning track: Beginner → Pro+</h2><div class="stack">${track}</div></section>

        ${hub ? hubSections(t, hub) : `<section class="section" aria-labelledby="parts"><h2 id="parts">What’s in this hub</h2>
          <p class="muted">${esc(phaseNote(t.phase))}</p>
          <ul class="feature-list">${parts.map(([n, s]) => `<li><strong>${esc(n)}</strong> — <span class="${s.startsWith('Phase') ? 'muted' : 'check'}">${s.startsWith('Phase') ? '<span aria-hidden="true">⏳</span> Arrives in ' + s : '<span aria-hidden="true">✓</span> ' + s}</span></li>`).join('')}</ul></section>`}

        <nav class="pager" aria-label="Topic navigation">
          ${prev ? `<a class="btn" href="#/topic/${prev.id}">← ${esc(prev.name)}</a>` : '<span></span>'}
          ${next ? `<a class="btn" href="#/topic/${next.id}">${esc(next.name)} →</a>` : ''}
        </nav>`,
      init(root) { if (hub) hubInit(root, t, hub); }
    };
  };

  /* ---------- hub sections (patterns, demo, failures, testing, audit, game, quiz) ---------- */
  function hubSections(t, h) {
    const list = a => `<ul>${a.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
    const a = h.audit, passed = !!(S.s.hubs && S.s.hubs[t.id]);
    const labLink = { 'drag-drop': ['dnd', 'Drag-and-Drop Lab', 'Move Kanban cards with the mouse, the keyboard and a menu, and read the screen-reader log.'] }[t.id] || (['overlays', 'navigation', 'widgets', 'data-rich', 'rich-content'].includes(t.id) ? ['components', 'Component Lab', 'Try broken and fixed dialogs, tabs, accordions, toggletips, switches, tables and uploaders.'] : ({ keyboard: ['keyboard', 'Keyboard-Only Challenge', 'Finish an order form without touching the mouse.'], auditing: ['bughunt', 'Bug Hunt', 'Find the accessibility bugs in a flawed page.'], typography: ['contrast', 'Contrast Lab', 'Check ratios and fix failing colour pairs.'], voice: ['screenreader', 'Screen Reader Simulator', 'Hear how names and roles are announced.'], images: ['screenreader', 'Screen Reader Simulator', 'Hear how alt text is announced.'] }[t.id] || null));
    const lab = labLink ? `<section class="section" aria-labelledby="lab"><h2 id="lab">${labLink[1]}</h2><div class="card"><p>${labLink[2]}</p><a class="btn btn-primary" href="#/lab/${labLink[0]}">Open the lab</a></div></section>` : '';
    return lab + `
      <section class="section" aria-labelledby="pat"><h2 id="pat">Patterns: do and don’t</h2>
        <div class="grid grid-3"><div class="card"><h3><span aria-hidden="true">✓</span> Do</h3>${list(h.patterns.do)}</div>
        <div class="card"><h3><span aria-hidden="true">✗</span> Don’t</h3>${list(h.patterns.dont)}</div></div></section>
      <section class="section" aria-labelledby="dm"><h2 id="dm">Live demo: Broken vs Fixed</h2><div id="hub-demo"></div></section>
      <section class="section" aria-labelledby="fl"><h2 id="fl">Typical real-life failures</h2>
        <p class="muted small">Composite scenarios based on patterns auditors see again and again.</p>
        <div class="stack">${h.failures.map(f => `<article class="card"><h3>${esc(f.title)}</h3><p>${esc(f.story)}</p><p class="callout"><strong>Fix:</strong> ${esc(f.fix)}</p></article>`).join('')}</div></section>
      <section class="section" aria-labelledby="ts"><h2 id="ts">Testing checklist</h2>
        <div class="grid grid-3"><div class="card"><h3>Manual</h3>${list(h.checklist.manual)}</div>
        <div class="card"><h3>Tools</h3>${list(h.checklist.tools)}</div>
        <div class="card"><h3>Screen readers</h3>${list(h.checklist.sr)}</div></div></section>
      <section class="section" aria-labelledby="au"><h2 id="au">Audit report snippet</h2>
        <div class="card"><p class="btn-row"><span class="badge badge-new">Severity: ${esc(a.severity)}</span> <span class="chip">${esc(a.criteria)}</span></p>
          <h3>${esc(a.title)}</h3>
          <dl><dt><strong>Where</strong></dt><dd>${esc(a.location)}</dd><dt><strong>What we found</strong></dt><dd>${esc(a.found)}</dd>
          <dt><strong>Who is affected</strong></dt><dd>${esc(a.impact)}</dd><dt><strong>Recommendation</strong></dt><dd>${esc(a.recommendation)}</dd></dl>
          ${ui.codeBlock(a.code, { title: 'Suggested fix' })}</div></section>
      <section class="section" aria-labelledby="gm"><h2 id="gm">Challenge: ${esc(h.challenge.title)}</h2><div class="card" id="hub-game"></div></section>
      <section class="section" aria-labelledby="hq"><h2 id="hq">Hub quiz ${passed ? '<span class="check"><span aria-hidden="true">✓</span> Badge earned</span>' : ''}</h2>
        <p class="muted">Pass with 75% or more to earn the <strong>${esc(t.name)} Hub</strong> badge.</p><div class="card" id="hub-quiz"></div></section>`;
  }
  function hubInit(root, t, h) {
    const demoObj = typeof h.demo === 'string' ? D.criteriaContent[h.demo].demo : h.demo;
    ui.demo(root.querySelector('#hub-demo'), demoObj);
    ui.classify(root.querySelector('#hub-game'), h.challenge, { key: 'game:' + t.id });
    ui.quiz(root.querySelector('#hub-quiz'), h.quiz, {
      key: 'hubquiz:' + t.id, passMark: .75,
      onComplete(score, total, gained, pass) {
        if (!pass) return '';
        S.passHub(t.id); ui.confetti();
        return `<div class="callout"><strong>${esc(t.name)} Hub badge earned! +40 XP</strong></div>`;
      }
    });
  }

  /* ---------- LESSON ---------- */
  V.lesson = function (id) {
    const l = D.lessons.find(x => x.id === id);
    if (!l) return V.notFound();
    const t = D.topicById[l.topic], lv = levelById(l.level);
    if (!S.levelUnlocked(l.level)) {
      const prev = levelById(lv.requires);
      return { title: 'Locked lesson', html: `${crumbs([['Home', '#/'], ['Learn', '#/learn'], [l.title, '']])}
        <h1 id="h1" tabindex="-1">${esc(l.title)}</h1>
        <div class="card"><p><span aria-hidden="true">🔒</span> This lesson is part of the <strong>${esc(lv.name)}</strong> level, which is locked.</p>
        <div class="btn-row"><a class="btn btn-primary" href="#/checkpoint/${prev.id}">Take the ${esc(prev.name)} checkpoint</a><a class="btn" href="#/skip/${lv.id}">Skip-ahead test</a></div></div>` };
    }
    const sib = lessonsOf(l.topic), i = sib.indexOf(l), prev = sib[i - 1], next = sib[i + 1];
    const done = S.lessonDone(id);
    return {
      title: l.title,
      recent: { route: '#/lesson/' + id, title: l.title },
      html: `${crumbs([['Home', '#/'], [t.name, '#/topic/' + t.id], [l.title, '']])}
        <div class="btn-row">${ui.levelBadge(l.level)} <a class="tag" href="#/topic/${t.id}"><span aria-hidden="true">${t.icon}</span> ${esc(t.name)}</a> <span class="chip">⏱ ${l.minutes} min</span></div>
        <h1 id="h1" tabindex="-1" style="margin-top:var(--s-3)">${esc(l.title)}</h1>
        <p class="lead">${esc(l.summary)}</p>
        <p class="small muted">WCAG: ${l.criteria.map(n => `<a href="#/criterion/${n}">${n} ${esc(D.criterionByNum[n].name)}</a>`).join(' · ')}</p>
        <div class="lesson-body">${l.body}</div>
        ${l.demo ? `<section class="section" aria-labelledby="try"><h2 id="try">Try it: Broken vs Fixed</h2><div id="lesson-demo"></div></section>` : ''}
        <section class="section" aria-labelledby="chk"><h2 id="chk">Check yourself</h2><div class="card" id="lesson-quiz"></div></section>
        <section class="section"><button type="button" class="btn btn-primary btn-lg" id="complete" aria-pressed="${done}">${done ? '✓ Lesson completed' : 'Mark lesson complete (+20 XP)'}</button></section>
        <nav class="pager" aria-label="Lesson navigation">
          ${prev ? `<a class="btn" href="#/lesson/${prev.id}">← ${esc(prev.title)}</a>` : `<a class="btn" href="#/topic/${t.id}">← Back to ${esc(t.name)}</a>`}
          ${next ? `<a class="btn" href="#/lesson/${next.id}">${esc(next.title)} →</a>` : ''}
        </nav>`,
      init(root) {
        if (l.demo) ui.demo(root.querySelector('#lesson-demo'), D.criteriaContent[l.demo].demo);
        ui.quiz(root.querySelector('#lesson-quiz'), l.quiz, { key: 'lesson:' + id });
        const btn = root.querySelector('#complete');
        btn.addEventListener('click', () => {
          if (S.lessonDone(id)) { ui.announce('Already completed'); return; }
          S.completeLesson(id);
          btn.textContent = '✓ Lesson completed'; btn.setAttribute('aria-pressed', 'true');
          ui.toast('Lesson complete! +20 XP'); ui.confetti();
        });
      }
    };
  };

  /* ---------- CRITERION ---------- */
  V.criterion = function (num) {
    const c = D.criterionByNum[num];
    if (!c) return V.notFound();
    const content = D.criteriaContent[num], learned = S.isLearned(num);
    const i = D.criteria.indexOf(c), prev = D.criteria[i - 1], next = D.criteria[i + 1];
    const who = c.who.map(w => D.whoLabels[w]);
    const authored = !!content;
    return {
      title: `${num} ${c.name}`,
      recent: { route: '#/criterion/' + num, title: `${num} ${c.name}` },
      html: `${crumbs([['Home', '#/'], ['WCAG Explorer', '#/criteria'], [num + ' ' + c.name, '']])}
        <div class="btn-row">${ui.wcagBadge(c.level)} ${ui.levelBadge(c.difficulty)} ${c.isNew22 ? '<span class="badge badge-new">New in 2.2</span>' : ''}</div>
        <h1 id="h1" tabindex="-1" style="margin-top:var(--s-3)"><span class="muted">${num}</span> ${esc(c.name)}</h1>
        <p class="muted">${esc(principleOf(c))} · Guideline ${c.guideline} ${esc(D.guidelines[c.guideline])}</p>
        <p class="btn-row" aria-label="Linked topic hubs">${c.topics.map(ui.topicTag).join('')}</p>

        <section class="section" aria-labelledby="exp"><h2 id="exp">In plain language</h2>
          ${authored ? `<p class="lead">${esc(content.explain)}</p>`
            : `<p>This criterion belongs to the <strong>${esc(D.principles[c.principle].name)}</strong> principle. A full mini-lesson with a live Broken vs Fixed demo, test steps, techniques and a quiz arrives in <strong>Phase ${phaseForCriterion(c)}</strong>.</p>
               <p class="callout">Until then, read the official explanation: <a href="${A.data.w3cUrl(c)}" rel="noopener">Understanding ${num} on w3.org<span class="sr-only"> (external site)</span></a>.</p>`}
        </section>

        <section class="section" aria-labelledby="who"><h2 id="who">Who it helps</h2>
          <ul>${(authored ? content.who : who.map(w => w + ' needs')).map(w => `<li>${esc(w)}</li>`).join('')}</ul>
          <p class="small muted">Disability groups tagged: ${who.map(esc).join(', ')}.</p></section>

        ${authored ? `
        <section class="section" aria-labelledby="demo"><h2 id="demo">Broken vs Fixed</h2><div id="crit-demo"></div></section>
        <section class="section" aria-labelledby="test"><h2 id="test">How to test it</h2><ol>${content.test.map(x => `<li>${esc(x)}</li>`).join('')}</ol></section>
        <section class="section" aria-labelledby="fail"><h2 id="fail">Common failures</h2><ul>${content.failures.map(x => `<li>${esc(x)}</li>`).join('')}</ul></section>
        <section class="section" aria-labelledby="tech"><h2 id="tech">WCAG techniques</h2>
          <ul>${content.techniques.map(x => `<li><code>${esc(x.id)}</code> — ${esc(x.label)}</li>`).join('')}</ul></section>
        <section class="section" aria-labelledby="qz"><h2 id="qz">Quick quiz</h2><div class="card" id="crit-quiz"></div></section>` : ''}

        <section class="section"><button type="button" class="btn btn-primary btn-lg" id="learned" aria-pressed="${learned}">${learned ? '✓ Marked as learned' : 'Mark as learned (+10 XP)'}</button>
          <p class="small muted" style="margin-top:var(--s-2)">Official text: <a href="${A.data.w3cUrl(c)}" rel="noopener">Understanding ${num}<span class="sr-only"> (external site)</span></a></p></section>

        <nav class="pager" aria-label="Criterion navigation">
          ${prev ? `<a class="btn" href="#/criterion/${prev.num}">← ${prev.num} ${esc(prev.name)}</a>` : '<span></span>'}
          ${next ? `<a class="btn" href="#/criterion/${next.num}">${next.num} ${esc(next.name)} →</a>` : ''}
        </nav>`,
      init(root) {
        if (authored) {
          ui.demo(root.querySelector('#crit-demo'), content.demo);
          ui.quiz(root.querySelector('#crit-quiz'), content.quiz, { key: 'crit:' + num });
        }
        const btn = root.querySelector('#learned');
        btn.addEventListener('click', () => {
          const on = !S.isLearned(num);
          S.setLearned(num, on);
          btn.setAttribute('aria-pressed', String(on));
          btn.textContent = on ? '✓ Marked as learned' : 'Mark as learned (+10 XP)';
          ui.announce(on ? `${num} marked as learned. You've mastered ${S.learnedCount()} of 86.` : `${num} unmarked. You've mastered ${S.learnedCount()} of 86.`);
          if (on) ui.confetti();
        });
      }
    };
  };

  /* ---------- WCAG EXPLORER ---------- */
  function explorerHTML() {
    const opt = (v, l) => `<option value="${esc(v)}">${esc(l)}</option>`;
    return `<div id="explorer">
      <form class="filters" role="search" aria-label="Filter WCAG criteria" onsubmit="return false">
        <div class="field"><label for="f-q">Search</label><input id="f-q" type="search" placeholder="e.g. 2.5.7 or focus"></div>
        <div class="field"><label for="f-p">Principle</label><select id="f-p"><option value="">All</option>${[1, 2, 3, 4].map(n => opt(n, n + '. ' + D.principles[n].name)).join('')}</select></div>
        <div class="field"><label for="f-l">Conformance level</label><select id="f-l"><option value="">All</option>${['A', 'AA', 'AAA'].map(x => opt(x, 'Level ' + x)).join('')}</select></div>
        <div class="field"><label for="f-d">Difficulty</label><select id="f-d"><option value="">All</option>${D.levels.map(l => opt(l.id, l.name)).join('')}</select></div>
        <div class="field"><label for="f-t">Topic hub</label><select id="f-t"><option value="">All</option>${D.topics.map(t => opt(t.id, t.name)).join('')}</select></div>
        <div class="field"><label for="f-w">Helps people with</label><select id="f-w"><option value="">Anyone</option>${Object.entries(D.whoLabels).map(([k, v]) => opt(k, v)).join('')}</select></div>
        <div class="field"><label for="f-s">Status</label><select id="f-s"><option value="">All</option><option value="learned">Mastered</option><option value="todo">Not yet mastered</option><option value="new">New in 2.2</option></select></div>
      </form>
      <p class="btn-row" style="justify-content:space-between"><span class="counter" id="ex-mastered">You've mastered ${S.learnedCount()} of 86</span>
        <span id="ex-count" class="muted" role="status" aria-live="polite"></span></p>
      <div class="table-wrap" tabindex="0" role="region" aria-label="WCAG 2.2 success criteria table, scrollable">
        <table><caption class="sr-only">WCAG 2.2 success criteria. Select a name to open its lesson.</caption>
        <thead><tr><th scope="col">No.</th><th scope="col">Criterion</th><th scope="col">Level</th><th scope="col">Difficulty</th><th scope="col">Topic hubs</th><th scope="col">Status</th></tr></thead>
        <tbody id="ex-body"></tbody></table></div></div>`;
  }
  function explorerInit(root) {
    const g = id => root.querySelector('#' + id), body = g('ex-body');
    function apply(announce) {
      const q = g('f-q').value.trim().toLowerCase(), p = g('f-p').value, l = g('f-l').value, d = g('f-d').value,
        t = g('f-t').value, w = g('f-w').value, s = g('f-s').value;
      const rows = D.criteria.filter(c =>
        (!q || (c.num + ' ' + c.name).toLowerCase().includes(q) || c.topics.some(id => D.topicById[id].name.toLowerCase().includes(q))) &&
        (!p || c.principle === Number(p)) && (!l || c.level === l) && (!d || c.difficulty === d) &&
        (!t || c.topics.includes(t)) && (!w || c.who.includes(w)) &&
        (!s || (s === 'learned' ? S.isLearned(c.num) : s === 'todo' ? !S.isLearned(c.num) : c.isNew22)));
      body.innerHTML = rows.length ? rows.map(c => `<tr>
        <th scope="row"><a href="#/criterion/${c.num}">${c.num}</a></th>
        <td><a href="#/criterion/${c.num}">${esc(c.name)}</a>${c.isNew22 ? ' <span class="badge badge-new">New in 2.2</span>' : ''}</td>
        <td>${ui.wcagBadge(c.level)}</td><td>${ui.levelBadge(c.difficulty)}</td>
        <td>${c.topics.slice(0, 3).map(id => `<a class="tag" href="#/topic/${id}">${D.topicById[id].icon} ${esc(D.topicById[id].name)}</a>`).join(' ')}${c.topics.length > 3 ? ` <span class="muted small">+${c.topics.length - 3} more</span>` : ''}</td>
        <td>${S.isLearned(c.num) ? '<span class="check"><span aria-hidden="true">✓</span> Mastered</span>' : '<span class="muted"><span aria-hidden="true">–</span><span class="sr-only">Not yet</span></span>'}</td></tr>`).join('')
        : '<tr><td colspan="6">No criteria match these filters. Try clearing one.</td></tr>';
      g('ex-count').textContent = `Showing ${rows.length} of 86`;
      g('ex-mastered').textContent = `You've mastered ${S.learnedCount()} of 86`;
    }
    ['f-q', 'f-p', 'f-l', 'f-d', 'f-t', 'f-w', 'f-s'].forEach(id => g(id).addEventListener(id === 'f-q' ? 'input' : 'change', () => apply(true)));
    apply(false);
  }
  V.criteria = function () {
    return { title: 'WCAG Explorer', html: `<h1 id="h1" tabindex="-1">WCAG 2.2 Explorer</h1>
      <p class="lead">All 86 success criteria — 31 Level A, 24 AA and 31 AAA. 4.1.1 Parsing was removed in WCAG 2.2 because it is obsolete.</p>${explorerHTML()}`,
      init(root) { explorerInit(root); } };
  };

  /* ---------- DASHBOARD ---------- */
  V.dashboard = function () {
    const st = S.s;
    const earned = D.badges.filter(b => st.badges[b.id]);
    return {
      title: 'Progress',
      html: `<h1 id="h1" tabindex="-1">Your progress</h1>${statsStrip()}
        <section class="section" aria-labelledby="xpl"><h2 id="xpl">Rank ${S.rank()}</h2>
          ${ui.bar(S.rankProgress(), 'Progress to next rank')}<p class="small muted">${100 - S.rankProgress()} XP to rank ${S.rank() + 1}.</p></section>
        <section class="section" aria-labelledby="lv"><h2 id="lv">Levels</h2>
          <div class="grid grid-3">${D.levels.map(levelCard).join('')}</div></section>
        <section class="section" aria-labelledby="mx"><h2 id="mx">Topics × levels</h2>${matrixHTML()}</section>
        <section class="section" aria-labelledby="bd"><h2 id="bd">Badges <span class="muted small">(${earned.length} of ${D.badges.length})</span></h2>
          <ul class="badge-grid">${D.badges.map(b => { const on = !!st.badges[b.id]; return `<li class="badge-card ${on ? '' : 'locked'}"><span class="ico" aria-hidden="true">${on ? b.icon : '🔒'}</span><strong>${esc(b.name)}</strong><br><span class="small">${esc(b.desc)}</span><br><span class="small ${on ? 'check' : ''}">${on ? 'Earned' : 'Locked'}</span></li>`; }).join('')}</ul></section>
        <section class="section card" aria-labelledby="dt"><h2 id="dt">Your data</h2>
          <p class="muted">Progress is stored only in this browser${S.storageOK ? '' : ' — <strong>storage is blocked right now, so progress will be lost when you close the tab</strong>'}. Export a backup to move it to another device.</p>
          <div class="btn-row"><button type="button" class="btn" id="exp">Export progress</button>
            <label class="btn" for="imp" style="cursor:pointer">Import progress</label><input id="imp" type="file" accept="application/json,.json" class="sr-only">
            <button type="button" class="btn" id="reset">Reset all progress…</button></div>
          <div id="reset-confirm" hidden class="callout warn" style="margin-top:var(--s-3)"><p><strong>This permanently deletes your XP, badges and mastered criteria.</strong></p>
            <div class="btn-row"><button type="button" class="btn btn-primary" id="reset-yes">Yes, reset everything</button><button type="button" class="btn" id="reset-no">Cancel</button></div></div></section>`,
      init(root) {
        root.querySelector('#exp').addEventListener('click', () => {
          const blob = new Blob([S.exportJSON()], { type: 'application/json' }), a = document.createElement('a');
          a.href = URL.createObjectURL(blob); a.download = 'a11y-academy-progress.json'; a.click(); setTimeout(() => URL.revokeObjectURL(a.href), 1000);
          ui.toast('Progress exported');
        });
        root.querySelector('#imp').addEventListener('change', e => {
          const f = e.target.files[0]; if (!f) return;
          const r = new FileReader();
          r.onload = () => { try { S.importJSON(String(r.result)); ui.toast('Progress imported'); A.app.render(); } catch (err) { ui.announce('Import failed: ' + err.message, true); ui.toast('Import failed: ' + err.message, { silent: true }); } };
          r.readAsText(f);
        });
        const box = root.querySelector('#reset-confirm');
        root.querySelector('#reset').addEventListener('click', () => { box.hidden = false; root.querySelector('#reset-no').focus(); });
        root.querySelector('#reset-no').addEventListener('click', () => { box.hidden = true; root.querySelector('#reset').focus(); });
        root.querySelector('#reset-yes').addEventListener('click', () => { S.reset(); ui.toast('Progress reset'); A.app.render(); });
      }
    };
  };

  /* ---------- GLOSSARY ---------- */
  V.glossary = function (q) {
    const term = (q.get('term') || '').toLowerCase();
    const items = D.glossary.slice().sort((a, b) => a.term.localeCompare(b.term));
    const list = f => items.filter(x => !f || (x.term + ' ' + x.def).toLowerCase().includes(f.toLowerCase()))
      .map(x => `<div id="g-${esc(x.term.toLowerCase().replace(/[^a-z0-9]+/g, '-'))}" class="card" style="margin-bottom:var(--s-3)"><dt><strong>${esc(x.term)}</strong></dt><dd style="margin:var(--s-2) 0 0">${esc(x.def)}</dd></div>`).join('');
    return {
      title: 'Glossary',
      html: `<h1 id="h1" tabindex="-1">Glossary</h1><p class="lead">${items.length} terms so far — the list grows every phase (target: 150+).</p>
        <div class="field" style="max-width:28rem"><label for="g-q">Filter terms</label><input id="g-q" type="search" value="${esc(term)}"></div>
        <p id="g-count" class="muted" role="status" aria-live="polite"></p><dl id="g-list" style="margin-top:var(--s-4)">${list(term)}</dl>`,
      init(root) {
        const inp = root.querySelector('#g-q'), host = root.querySelector('#g-list'), cnt = root.querySelector('#g-count');
        const upd = () => { host.innerHTML = list(inp.value.trim()); cnt.textContent = host.children.length + ' terms shown'; };
        inp.addEventListener('input', upd); upd();
      }
    };
  };

  /* ---------- PLACEMENT + CHECKPOINTS ---------- */
  V.placement = function () {
    return { title: 'Find your level', html: `${crumbs([['Home', '#/'], ['Find your level', '']])}
      <h1 id="h1" tabindex="-1">Find your level</h1><p class="lead">Six quick questions. We’ll recommend where to start — nothing is locked or unlocked by this quiz.</p>
      <div class="card" id="placement"></div>`,
      init(root) {
        ui.quiz(root.querySelector('#placement'), D.quizzes.placement, {
          key: 'placement', shuffle: true,
          onComplete(score) {
            const rec = score <= 2 ? 'beginner' : score <= 4 ? 'intermediate' : score === 5 ? 'advanced' : 'pro';
            S.setPlacement(rec);
            const l = levelById(rec);
            return `<div class="callout"><p style="margin:0"><strong>We suggest starting at ${ui.levelBadge(rec)}</strong></p><p class="muted" style="margin:var(--s-2) 0 0">${esc(l.blurb)}</p></div>
              <p class="btn-row"><a class="btn btn-primary" href="#/level/${rec}">Go to ${esc(l.name)}</a>${rec !== 'beginner' ? `<a class="btn" href="#/skip/${rec}">Take the skip-ahead test</a>` : ''}</p>`;
          }
        });
      } };
  };

  V.checkpoint = function (levelId, skip) {
    const l = levelById(levelId);
    if (!l) return V.notFound();
    const qs = skip
      ? D.levels.filter(x => x.order < l.order).flatMap(x => D.quizzes.checkpoints[x.id])
      : D.quizzes.checkpoints[levelId];
    const mark = skip ? .8 : .7;
    return {
      title: skip ? `Skip-ahead test: ${l.name}` : `${l.name} checkpoint`,
      html: `${crumbs([['Home', '#/'], ['Learn', '#/learn'], [skip ? 'Skip-ahead test' : 'Checkpoint', '']])}
        <div class="btn-row">${ui.levelBadge(levelId)}</div>
        <h1 id="h1" tabindex="-1" style="margin-top:var(--s-3)">${skip ? `Skip ahead to ${esc(l.name)}` : `${esc(l.name)} checkpoint`}</h1>
        <p class="lead">${qs.length} questions · pass mark ${Math.round(mark * 100)}%${skip ? ` · covers everything below ${esc(l.name)}` : ''}.</p>
        <div class="card" id="cp"></div>`,
      init(root) {
        ui.quiz(root.querySelector('#cp'), qs, {
          key: (skip ? 'skip:' : 'cp:') + levelId, passMark: mark,
          onComplete(score, total, gained, pass) {
            if (!pass) return '';
            ui.confetti();
            if (skip) {
              S.awardOnce('skip:' + levelId, 75); S.unlockThrough(levelId);
              return `<div class="callout"><strong>${esc(l.name)} unlocked!</strong> All lower levels are open too.</div><p><a class="btn btn-primary" href="#/level/${levelId}">Go to ${esc(l.name)}</a></p>`;
            }
            const next = S.passCheckpoint(levelId);
            return next
              ? `<div class="callout"><strong>Checkpoint passed — ${esc(next.name)} unlocked! +50 XP</strong></div><p><a class="btn btn-primary" href="#/level/${next.id}">Go to ${esc(next.name)}</a></p>`
              : '<div class="callout"><strong>Pro+ checkpoint passed! +50 XP</strong></div>';
          }
        });
      }
    };
  };

  /* ---------- STATIC PAGES ---------- */
  V.statement = function () {
    return { title: 'Accessibility statement', html: `<h1 id="h1" tabindex="-1">Accessibility statement</h1>
      <div class="lesson-body">
      <p>A11y Academy teaches accessibility, so it has to practise it. We aim to meet <strong>WCAG 2.2 Level AA</strong> across the whole site.</p>
      <h2>What we built in</h2>
      <ul><li>Semantic landmarks, one <code>h1</code> per view, logical headings and skip links.</li>
      <li>Full keyboard operation with a visible, unobscured focus ring and no keyboard traps. Dialogs use the native <code>&lt;dialog&gt;</code> element.</li>
      <li>Targets at least 24×24 CSS px (most are 44px).</li>
      <li>Light, dark and high-contrast themes; respects <code>prefers-color-scheme</code>, <code>prefers-contrast</code>, <code>prefers-reduced-motion</code> and forced-colors mode.</li>
      <li>Text size, line spacing and dyslexia-friendly font options in <em>Display settings</em>.</li>
      <li>Quiz results, progress and copy actions are announced through live regions. Colour is never the only cue: levels use a shape and a text label.</li>
      <li>Drag-and-drop is only used in demos that also provide button alternatives.</li></ul>
      <h2>Known limitations</h2>
      <ul><li>This is a work in progress delivered in phases; see the <a href="#/roadmap">build roadmap</a>. Placeholders say so explicitly.</li>
      <li>The embedded demos intentionally contain inaccessible code in their “Broken” state. They are labelled, and the “Fixed” state is one button away.</li>
      <li>The dyslexia-friendly font uses fonts installed on your device (OpenDyslexic, Lexend, Atkinson Hyperlegible) because the site works offline and ships no web fonts.</li></ul>
      <h2>Feedback</h2>
      <p>Found a barrier? Please tell us. <strong>[Add your contact email or issue-tracker link here.]</strong></p>
      <p class="small muted">Self-assessed against WCAG 2.2 AA using automated checks (axe-core) and manual keyboard review. Last reviewed during Phase 6.</p></div>` };
  };

  V.roadmap = function () {
    const phases = [
      ['Phase 1 — Foundation', 'done', 'Design system, layout, level + topic navigation, themes, progress engine, data modules, WCAG Explorer.'],
      ['Phase 2 — Perceivable', 'done', 'Principle 1 criteria, Media hubs (Video, Audio, Animation, Live), Images and Typography hubs, Beginner path.'],
      ['Phase 3 — Operable', 'done', 'Principle 2 criteria, Interaction hubs (Drag-and-drop, Pointer/touch, Keyboard/focus, Voice).'],
      ['Phase 4 — Complex components', 'done', 'Overlays, navigation, widgets, data-rich and rich-content hubs, plus the Component Lab.'],
      ['Phase 5 — Understandable & Robust', 'done', 'Principles 3 and 4; Forms, E-commerce, Cognitive, SPA, CMS, PDF, E-learning, Mobile hubs.'],
      ['Phase 6 — Labs, games & Pro+', 'done', 'Bug Hunt, Keyboard-Only Challenge, screen-reader simulator, Contrast Lab, vision simulators, Pro+ hubs, self-check summary and “how to add lessons” guide.']
    ];
    const label = { done: '✓ Done', next: '→ Up next', todo: 'Planned' };
    return { title: 'Build roadmap', html: `<h1 id="h1" tabindex="-1">Build roadmap</h1><p class="lead">The course ships in six phases. Each is checked before the next begins.</p>
      <ol class="phase-list">${phases.map(([n, s, d]) => `<li><h2 style="font-size:1.2rem;margin-bottom:var(--s-1)">${esc(n)} <span class="chip">${label[s]}</span></h2><p class="muted" style="margin:0">${esc(d)}</p></li>`).join('')}</ol>` };
  };

  V.notFound = function () {
    return { title: 'Page not found', html: `<h1 id="h1" tabindex="-1">Page not found</h1><p>That page doesn’t exist (yet). <a href="#/">Go home</a> or <a href="#/learn">browse lessons</a>.</p>` };
  };
})(window.A11Y = window.A11Y || {});
