# A11y Academy

Interactive web-accessibility course. Plain HTML + CSS + vanilla JS — no build step, no server.
**Open `index.html` in a browser.** Works offline. Progress is saved in `localStorage`.

## Status
All 6 phases complete: 86 WCAG 2.2 criteria, 28 topic hubs (each with a Beginner → Pro+ track), 119 lessons,
172 glossary terms, 8 labs and simulators, cheat sheets, tool guide, audit template and a printable progress summary.
See `SELF-CHECK.md` for the automated accessibility check results and what still needs manual testing.

## Structure
```
index.html          shell: header, sidebar, dialogs, live regions; lists every script in load order
css/styles.css      design tokens, themes (light/dark/high-contrast), components
js/store.js         progress, XP, streaks, badges, level unlocks (localStorage)
js/ui.js            toast, confetti, code blocks, quiz runner, Broken-vs-Fixed demo, classify game
js/views.js         one function per page/route (home, learn, level, topic, lesson, criterion, explorer, dashboard…)
js/views-labs.js    Drag-and-Drop Lab and Component Lab, plus the #/lab/<id> dispatcher
js/views-labs2.js   Labs index, Bug Hunt, Keyboard-Only Challenge, Screen Reader Simulator, Contrast Lab,
                    Vision Simulators, Flashcards, Resources, Progress summary, "How to add lessons" page
js/app.js           hash router, sidebar, display preferences, Ctrl/Cmd+K palette
js/data/            content as data (classic scripts so file:// works):
  levels.js         4 levels + base badges
  criteria.js       all 86 criteria (level, difficulty, who it helps)
  topics.js         28 topic hubs + mapped criteria (cross-links are computed)
  lessons.js, lessons-p2…p6b.js        lessons, appended to A11Y.data.lessons
  criteria-content.js, criteria-p1/p2/p3.js   authored criterion mini-lessons (Principles 1–4)
  hubs.js, hubs-p3…p6.js               hub content + auto-generated hub badges; hubs.js also holds the Beginner path
  components.js     component patterns shared by hubs and the Component Lab
  quizzes.js        placement + level checkpoints
  glossary.js, glossary-p6.js          glossary terms
```
Script order in `index.html` matters: data files first, then `store.js`, `ui.js`, `views.js`, `views-labs*.js`, `app.js`.
`hubs.js` must load before any `hubs-p*.js` (they use `A.data.paths` and `A.data.badges`).

## Routes
`#/` home · `#/learn` · `#/level/<id>` · `#/topic/<id>` · `#/lesson/<id>` · `#/criteria` · `#/criterion/<num>` ·
`#/dashboard` · `#/glossary` · `#/placement` · `#/checkpoint/<level>` · `#/skip/<level>` · `#/labs` · `#/lab/<id>` ·
`#/resources` · `#/certificate` · `#/guide` · `#/roadmap` · `#/accessibility-statement`

## Add a lesson
Create a file such as `js/data/lessons-mine.js` (or append to an existing one) and push to `A11Y.data.lessons`:
```js
A11Y.data.lessons.push({ id: 'unique-id', topic: 'forms', level: 'beginner', minutes: 5, criteria: ['3.3.2'],
  title: '…', summary: '…', demo: '3.3.2' /* optional: a criterion number whose demo to reuse */,
  body: '<p>…</p><h2>…</h2>', quiz: [ { q: '…', options: ['A', 'B'], answer: 0, why: '…' } ] });
```
Use `<h2>` (not `<h3>`) for section headings inside a lesson body so heading order stays valid.
Register the file in `index.html` after `lessons.js`. It then appears in its topic hub, level page, matrix and search.
To feature it on the Beginner path, push its id onto `A11Y.data.paths.beginner` in a file that loads after `hubs.js`.

## Add a criterion mini-lesson
Fill `A11Y.data.criteriaContent['<num>']` with `explain, who[], test[], failures[], techniques[{id,label}], demo, quiz[]`
(see `criteria-p1.js` for the `C(...)` / `demo(...)` helpers). Use `{{IMG}}` in demo HTML for a built-in sample image.
Changed lines in the code view are highlighted automatically by diffing Broken vs Fixed.
Do not put flashing or strobing content in a demo.

## Add or edit a hub
Set `A11Y.data.hubs['<topic-id>'] = { patterns:{do,dont}, demo, failures, checklist:{manual,tools,sr}, audit, challenge, quiz }`
and push a badge `{ id: 'hub-<topic-id>', … test: s => !!(s.hubs && s.hubs['<topic-id>']) }` (see `hubs-p6.js`).
`demo` can be a criterion number or an inline `{ broken, fixed, findings, height, code }` object.

## Add a glossary term
Append `['Term', 'Definition']` to the array in `js/data/glossary.js`, or push `{ term, def }` in a later file.

## Add a lab
Register a function in `A11Y.views.labExtra['<id>']` returning `{ title, html, init(root) }`, and add it to the `LABS`
array in `views-labs2.js` so it shows on the Labs page. Keep any deliberately inaccessible example inside a sandboxed
`<iframe srcdoc>` so the site itself stays clean when scanned.

## Testing checklist before you ship changes
1. Open the site from disk (`file://`) and check the browser console: no errors.
2. Run axe DevTools on every new page, in light, dark and high-contrast themes.
3. Tab through new pages with the keyboard only; check focus is visible and never hidden.
4. Check 320 px width and 200 % text size for horizontal scrolling.
5. Test with a screen reader (NVDA + Firefox, VoiceOver + Safari at minimum).
