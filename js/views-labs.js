/* Labs (Phase 3: Drag-and-Drop Lab). Registered on A.views; routed via #/lab/<id>. */
(function (A) {
  'use strict';
  const S = A.store, ui = A.ui, esc = ui.esc, V = A.views;

  function dndLab() {
    return {
      title: 'Drag-and-Drop Lab',
      recent: { route: '#/lab/dnd', title: 'Drag-and-Drop Lab' },
      html: `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="#/">Home</a></li><li><a href="#/topic/drag-drop">Drag-and-drop &amp; sortable UIs</a></li><li><span aria-current="page">Drag-and-Drop Lab</span></li></ol></nav>
      <h1 id="h1" tabindex="-1">Drag-and-Drop Lab</h1>
      <p class="lead">One Kanban board, three ways to move a card. Switch the input method and feel what each user group experiences. The log shows what a screen reader would announce.</p>
      <fieldset class="card" style="margin-bottom:var(--s-4)"><legend>Input method</legend>
        <div class="btn-row">
          <label><input type="radio" name="mode" value="mouse" checked> Mouse drag only</label>
          <label><input type="radio" name="mode" value="keyboard"> Keyboard only</label>
          <label><input type="radio" name="mode" value="menu"> “Move to…” menu (single pointer)</label>
        </div>
        <p id="mode-help" class="small muted" role="status"></p>
      </fieldset>
      <div class="grid grid-3" id="board"></div>
      <section class="section" aria-labelledby="lg"><h2 id="lg">Screen-reader log</h2>
        <p class="small muted">Everything announced is listed here (newest last). In real use these messages are spoken through a polite live region.</p>
        <ol id="log" class="card" style="min-height:4rem"></ol></section>
      <section class="section" aria-labelledby="lt"><h2 id="lt">What to notice</h2>
        <ul><li>Mouse-only mode shows why dragging alone fails keyboard, switch and voice users (2.5.7, 2.1.1).</li>
        <li>Keyboard: <kbd>Space</kbd> picks up, <kbd>↑ ↓ ← →</kbd> move, <kbd>Space</kbd> drops, <kbd>Esc</kbd> cancels.</li>
        <li>The menu is the simplest accessible alternative: no gesture at all.</li>
        <li>Focus stays on the card after every move, even though the board re-renders.</li></ul>
        <p><a class="btn" href="#/topic/drag-drop">Back to the Drag-and-drop hub</a></p></section>`,
      init(root) {
        const cols = [['todo', 'To do'], ['doing', 'Doing'], ['done', 'Done']];
        const data = { todo: ['Write tests', 'Fix focus bug'], doing: ['Add skip link'], done: ['Set up CI'] };
        const board = root.querySelector('#board'), log = root.querySelector('#log'), help = root.querySelector('#mode-help');
        let mode = 'mouse', orig = null, grabbed = null, focusName = null, dragName = null;
        const helps = {
          mouse: 'Only mouse dragging works. Keyboard and menu are disabled to show how excluding this is.',
          keyboard: 'Tab to a card, press Space to pick it up, move with arrow keys, Space to drop, Esc to cancel.',
          menu: 'Use the “Move to” menu on each card. No dragging or special keys needed.'
        };
        const say = m => { ui.announce(m); const li = document.createElement('li'); li.textContent = m; log.appendChild(li); log.lastChild.scrollIntoView && 0; };
        const where = n => { for (const [k, label] of cols) { const i = data[k].indexOf(n); if (i > -1) return { k, label, i, len: data[k].length }; } };
        const award = m => { if (S.awardOnce('lab:dnd:' + m, 10)) { S.commit(); ui.toast && ui.toast('+10 XP: moved a card by ' + m); } };
        function render() {
          board.innerHTML = cols.map(([k, label]) => `<section class="card col" data-col="${k}" aria-labelledby="c-${k}"><h2 id="c-${k}" style="font-size:1.1rem">${label} <span class="chip">${data[k].length}</span></h2>
            <ul class="stack" style="list-style:none;padding:0;min-height:3rem" data-drop="${k}">${data[k].map(n => `<li class="card" draggable="${mode === 'mouse'}" data-name="${esc(n)}">
              <button type="button" class="btn" data-card="${esc(n)}" aria-pressed="${grabbed === n}" ${mode === 'mouse' || mode === 'menu' ? 'tabindex="-1"' : ''} ${mode === 'menu' ? 'disabled' : ''}>${esc(n)}</button>
              ${mode === 'menu' ? `<label class="small">Move ${esc(n)} to <select data-move="${esc(n)}"><option value="">choose…</option>${cols.filter(c => c[0] !== k).map(c => `<option value="${c[0]}">${c[1]}</option>`).join('')}</select></label>` : ''}</li>`).join('')}</ul></section>`).join('');
          if (focusName) { const b = board.querySelector(`[data-card="${CSS.escape(focusName)}"]`); if (b && mode === 'keyboard') b.focus(); }
        }
        function move(n, toCol, toIdx) {
          const w = where(n); data[w.k].splice(w.i, 1);
          const arr = data[toCol]; toIdx = Math.max(0, Math.min(arr.length, toIdx == null ? arr.length : toIdx)); arr.splice(toIdx, 0, n);
        }
        function pos(n) { const w = where(n); return `${n}, ${w.label}, position ${w.i + 1} of ${w.len}`; }
        root.querySelectorAll('input[name=mode]').forEach(r => r.addEventListener('change', () => {
          mode = r.value; grabbed = null; help.textContent = helps[mode]; render(); say('Input method: ' + r.parentElement.textContent.trim());
        }));
        help.textContent = helps[mode];
        board.addEventListener('dragstart', e => { const li = e.target.closest('[data-name]'); if (!li || mode !== 'mouse') return; dragName = li.dataset.name; e.dataTransfer.setData('text/plain', dragName); say('Picked up ' + dragName + ' with the mouse. A screen reader user gets no equivalent action.'); });
        board.addEventListener('dragover', e => { if (mode === 'mouse' && e.target.closest('[data-drop]')) e.preventDefault(); });
        board.addEventListener('drop', e => { const z = e.target.closest('[data-drop]'); if (!z || !dragName || mode !== 'mouse') return; e.preventDefault(); move(dragName, z.dataset.drop); const n = dragName; dragName = null; render(); say('Dropped. ' + pos(n)); award('mouse'); });
        board.addEventListener('keydown', e => {
          const b = e.target.closest('[data-card]'); if (!b || mode !== 'keyboard') return; const n = b.dataset.card;
          if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (grabbed === n) { grabbed = null; focusName = n; render(); say('Dropped. ' + pos(n)); award('keyboard'); } else { { const w0 = where(n); orig = { col: w0.k, idx: w0.i }; } grabbed = n; focusName = n; render(); say('Picked up ' + pos(n) + '. Use arrow keys to move, Space to drop, Escape to cancel.'); } }
          else if (e.key === 'Escape' && grabbed) { e.preventDefault(); move(n, orig.col, orig.idx); grabbed = null; focusName = n; render(); say('Cancelled. ' + pos(n)); }
          else if (grabbed === n && e.key.startsWith('Arrow')) {
            e.preventDefault(); const w = where(n), ci = cols.findIndex(c => c[0] === w.k);
            if (e.key === 'ArrowUp') move(n, w.k, w.i - 1); else if (e.key === 'ArrowDown') move(n, w.k, w.i + 1);
            else { const nc = cols[ci + (e.key === 'ArrowRight' ? 1 : -1)]; if (!nc) return; move(n, nc[0], Math.min(w.i, data[nc[0]].length)); }
            focusName = n; render(); say('Moved. ' + pos(n));
          }
        });
        board.addEventListener('change', e => { const sel = e.target.closest('[data-move]'); if (!sel || !sel.value) return; const n = sel.dataset.move; move(n, sel.value); focusName = null; render(); say('Moved. ' + pos(n)); award('menu');
          const nb = board.querySelector(`select[data-move="${CSS.escape(n)}"]`); if (nb) nb.focus(); });
        render(); say('Board ready. 4 cards in 3 columns.');
      }
    };
  }

  function componentLab() {
    const comps = A.data.components;
    return {
      title: 'Component Lab',
      recent: { route: '#/lab/components', title: 'Component Lab' },
      html: `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol><li><a href="#/">Home</a></li><li><a href="#/learn?mode=topic">Topics</a></li><li><span aria-current="page">Component Lab</span></li></ol></nav>
      <h1 id="h1" tabindex="-1">Component Lab</h1>
      <p class="lead">Seven everyday components, each built two ways. Try the broken version with your keyboard, switch to the fixed one, and read the keys and screen reader output you should expect.</p>
      <nav aria-label="Components on this page"><ul class="btn-row" style="list-style:none;padding:0">${comps.map(c => `<li><a class="btn" href="#cmp-${c.id}">${esc(c.name)}</a></li>`).join('')}</ul></nav>
      ${comps.map(c => `<section class="section" id="cmp-${c.id}" aria-labelledby="h-${c.id}"><h2 id="h-${c.id}" tabindex="-1">${esc(c.name)}</h2>
        <div class="grid grid-2"><div class="card"><h3>Keyboard</h3><table><caption class="sr-only">${esc(c.name)} keyboard interaction</caption><thead><tr><th scope="col">Keys</th><th scope="col">Action</th></tr></thead><tbody>${c.keys.map(k => `<tr><th scope="row">${esc(k[0])}</th><td>${esc(k[1])}</td></tr>`).join('')}</tbody></table></div>
        <div class="card"><h3>Screen reader should say</h3><p>${esc(c.sr)}</p></div></div>
        <div id="lab-${c.id}" class="mt"></div></section>`).join('')}
      <p><a class="btn" href="#/topic/overlays">Go to the Overlays hub</a> <a class="btn" href="#/lab/dnd">Drag-and-Drop Lab</a></p>`,
      init(root) {
        comps.forEach(c => {
          ui.demo(root.querySelector('#lab-' + c.id), Object.assign({ name: c.name }, c.demo));
          if (S.awardOnce) { /* XP for visiting the lab once */ }
        });
        if (S.awardOnce('lab:components', 10)) S.commit();
        // in-page anchors must not hit the hash router
        root.querySelectorAll('a[href^="#cmp-"]').forEach(a => a.addEventListener('click', e => {
          e.preventDefault(); const t = root.querySelector(a.getAttribute('href')); if (t) { t.scrollIntoView(); const h = t.querySelector('h2'); if (h) h.focus(); }
        }));
      }
    };
  }

  V.lab = function (id) {
    if (V.labExtra && V.labExtra[id]) return V.labExtra[id]();
    if (id === 'dnd') return dndLab();
    if (id === 'components') return componentLab();
    return V.notFound();
  };
})(window.A11Y = window.A11Y || {});
