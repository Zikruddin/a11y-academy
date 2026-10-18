/* Phase 3: mini-lessons for the Principle 2 (Operable) criteria.
   2.4.7 and 2.5.7 live in criteria-content.js. SAFETY: no demo here flashes or strobes —
   2.3.1/2.3.2 are shown as static mock-ups only. */
(function (A) {
  'use strict';
  const content = A.data.criteriaContent;
  const C = (num, explain, who, test, failures, techniques, demo, quiz) => {
    content[num] = {
      explain, who, test, failures,
      techniques: techniques.map(([id, label]) => ({ id, label })),
      demo, quiz: quiz.map(([q, options, answer, why]) => ({ q, options, answer, why }))
    };
  };
  const demo = (broken, fixed, fb, ff, height, code) => ({ broken, fixed, findings: { broken: fb, fixed: ff }, height: height || 160, code });
  const BTN = '<style>.b{display:inline-block;background:#4338ca;color:#fff;padding:8px 14px;border-radius:6px;cursor:pointer;font:600 15px system-ui;border:0}</style>';

  /* ---------------- 2.1 Keyboard accessible ---------------- */
  C('2.1.1',
    'All functionality must be operable through a keyboard interface (without requiring specific timings), except where the underlying task needs analog input such as freehand drawing.',
    ['Blind screen reader users', 'People with motor impairments who cannot use a mouse', 'Switch and voice-control users (they emulate keys)', 'Power users'],
    ['Unplug the mouse and tab through the whole page', 'Can you activate every link, button, menu, tab, slider and dialog?', 'Look for click handlers on div/span elements', 'Check hover-only menus and drag-only interactions'],
    ['F54: only mouse event handlers (onclick on a div with no keyboard handler)', 'F42: emulating links with script', 'Hover-only dropdown menus', 'Custom controls with no tabindex or role'],
    [['G202', 'Ensuring keyboard control for all functionality'], ['H91', 'Using HTML form controls and links'], ['SCR20', 'Using both keyboard and other device-specific functions'], ['F54', 'Failure: only mouse event handlers']],
    demo(BTN + '<div class="b" onclick="document.getElementById(\'o\').textContent=\'Saved!\'">Save</div> <span id="o" role="status"></span><p class="note" style="font-size:14px">Try pressing Tab, then Enter.</p>',
      BTN + '<button class="b" onclick="document.getElementById(\'o\').textContent=\'Saved!\'">Save</button> <span id="o" role="status"></span><p class="note" style="font-size:14px">Try pressing Tab, then Enter.</p>',
      ['A div with onclick cannot receive focus: Tab skips it.', 'Fails 2.1.1 (F54).'], ['A real button is focusable, announced as a button and activates with Enter and Space.'], 130,
      { broken: '<div class="b" onclick="save()">Save</div>', fixed: '<button class="b" onclick="save()">Save</button>' }),
    [['The simplest fix for a clickable div is…', ['Add onmouseover', 'Use a <button>', 'Add title', 'Use a bigger div'], 1, 'Native controls bring keyboard support free.'],
     ['Which task may legitimately need non-keyboard input?', ['Submitting a form', 'Freehand drawing', 'Opening a menu', 'Reading text'], 1, 'The path of a drawing depends on movement; the control around it must still be keyboard operable.']]);

  C('2.1.2',
    'If keyboard focus can move into a component using the keyboard, it must be able to move out again using only the keyboard (or users must be told how).',
    ['Keyboard-only users', 'Screen reader users'],
    ['Tab into every widget, embed, rich text editor and iframe: can you Tab or Esc out?', 'Test embedded video players, maps, chat widgets and code editors', 'Check modal dialogs: they trap focus on purpose but must offer Esc/Close'],
    ['F10: a plug-in that captures focus with no exit', 'A code editor that swallows Tab with no documented escape', 'A custom date picker that never releases focus'],
    [['G21', 'Ensuring that users are not trapped in content'], ['F10', 'Failure: a keyboard trap in embedded content']],
    demo('<p style="font-size:14px">Click in the box, then press Tab:</p><input id="t" value="trapped" aria-label="Trapped field"><br><button style="margin-top:8px">Next control</button><script>document.getElementById("t").addEventListener("keydown",function(e){if(e.key==="Tab")e.preventDefault()})</script>',
      '<p style="font-size:14px">Click in the box, then press Tab:</p><input id="t" value="free" aria-label="Free field"><br><button style="margin-top:8px">Next control</button>',
      ['preventDefault on Tab keeps focus inside the field forever.', 'Fails 2.1.2 (F10).'], ['Tab moves on as users expect.'], 140,
      { broken: "field.addEventListener('keydown', e => {\n  if (e.key === 'Tab') e.preventDefault();\n});", fixed: '/* Do not intercept Tab.\n   If an editor must capture Tab, document an escape (e.g. Esc then Tab). */' }),
    [['A modal dialog that holds focus inside is…', ['Always a failure', 'OK if it can be closed with the keyboard', 'Required to be hidden', 'Never allowed'], 1, 'Intentional focus containment is fine when there is an exit.'],
     ['Preventing the default Tab action in a field…', ['Helps keyboard users', 'Risks a keyboard trap', 'Is required', 'Speeds typing'], 1, 'It traps focus.']]);

  C('2.1.3',
    'AAA: all functionality is available from a keyboard with no exceptions — even tasks that depend on the path of movement need a keyboard-operable alternative.',
    ['People with motor impairments', 'Screen reader users'],
    ['Look for freehand, path-dependent or timing-dependent interactions', 'Provide numeric input, steps or presets as keyboard alternatives'],
    ['Signature pads with no typed option', 'Gesture-only drawing tools'],
    [['G202', 'Ensuring keyboard control for all functionality']],
    demo('<p style="font-size:14px">Colour wheel (mouse only):</p><div style="width:120px;height:20px;background:linear-gradient(90deg,red,yellow,lime,cyan,blue,magenta,red);border-radius:4px" onmousedown="this.title=\'picked\'"></div>',
      '<p style="font-size:14px">Colour (hue, 0–360):</p><input type="range" min="0" max="360" value="200" aria-label="Hue"> <input type="number" min="0" max="360" value="200" aria-label="Hue value" style="width:60px">',
      ['Only a pointer can choose a colour.', 'Not met (AAA).'], ['A slider and number field give full keyboard control.'], 130),
    [['2.1.3 differs from 2.1.1 by…', ['Adding colour rules', 'Removing the “path of movement” exception', 'Requiring captions', 'Nothing'], 1, 'No exceptions.'],
     ['A good alternative for freehand input?', ['Bigger canvas', 'Typed or stepped input', 'Hover', 'Animation'], 1, 'Provide another keyboard-operable path.']]);

  C('2.1.4',
    'If a shortcut uses only letter, number, punctuation or symbol keys, users must be able to turn it off, remap it, or it must only work when that component has focus.',
    ['Speech-input users (spoken words trigger single keys)', 'People with tremors or cerebral palsy', 'Screen reader users (they use single-letter navigation)'],
    ['Search the code for single-key shortcuts', 'Type in inputs: does a letter trigger an action?', 'Is there a setting to disable or remap?'],
    ['A “/” or “s” shortcut that fires while typing', 'No way to turn off single-key shortcuts in a web app'],
    [['G217', 'Providing a mechanism to allow users to remap or turn off character key shortcuts']],
    demo('<input aria-label="Notes" placeholder="Type the letter s here" style="width:90%"><p id="o" role="status" style="font-size:14px"></p><script>document.addEventListener("keydown",function(e){if(e.key==="s"){document.getElementById("o").textContent="Shortcut fired: Search opened (while typing!)"}})</script>',
      '<input aria-label="Notes" placeholder="Type the letter s here" style="width:90%"><p id="o" role="status" style="font-size:14px">Shortcut: Alt+S (single keys are off).</p><script>document.addEventListener("keydown",function(e){if(e.altKey&&e.key==="s"){document.getElementById("o").textContent="Search opened with Alt+S"}})</script>',
      ['Typing “s” triggers the shortcut. Speech-input users hit this constantly.', 'Fails 2.1.4.'], ['A modifier key is required, so ordinary typing is safe.'], 150,
      { broken: "document.addEventListener('keydown', e => {\n  if (e.key === 's') openSearch();\n});", fixed: "document.addEventListener('keydown', e => {\n  if (e.altKey && e.key === 's') openSearch();\n});" }),
    [['A safe shortcut uses…', ['A single letter', 'A modifier plus a key', 'Hover', 'Colour'], 1, 'Modifier combinations or user control.'],
     ['Who is most affected by single-key shortcuts?', ['Voice-control users', 'Nobody', 'Only mouse users', 'Only designers'], 0, 'Dictation can emit single letters by accident.']]);

  /* ---------------- 2.2 Enough time ---------------- */
  C('2.2.1',
    'If there is a time limit, users can turn it off, adjust it, or extend it (at least 10× the default) with a warning of at least 20 seconds. Exceptions: real-time events and essential limits.',
    ['People who read or type slowly', 'Screen reader and switch users', 'People with cognitive disabilities'],
    ['Find sessions, timed forms and auto-advance steps', 'Is there a warning before expiry and a simple way to extend?', 'Is the warning announced to screen readers?'],
    ['Sessions that expire silently and delete form data', 'Auto-logout with a 1-minute hard limit'],
    [['G4', 'Allowing the content to be paused and restarted'], ['G133', 'Providing a checkbox on the first page to turn off time limits'], ['G198', 'Providing a way for the user to turn the time limit off']],
    demo('<p style="font-size:15px"><span id="s">Session ends in <b id="t">8</b> s</span></p><script>var n=8,t=document.getElementById("t");var i=setInterval(function(){n--;t.textContent=n;if(n<=0){clearInterval(i);document.getElementById("s").textContent="Session expired. Your data is lost."}},1000)</script>',
      '<p style="font-size:15px"><span id="s">Session ends in <b id="t">8</b> s</span></p><p id="w" role="alert" hidden>Your session is about to end. <button id="x">Extend session</button></p><script>var n=8,t=document.getElementById("t"),w=document.getElementById("w");document.getElementById("x").onclick=function(){n+=10;w.hidden=true};var i=setInterval(function(){n--;t.textContent=n;if(n===5)w.hidden=false;if(n<=0){clearInterval(i);document.getElementById("s").textContent="Session expired."}},1000)</script>',
      ['Wait 8 seconds: the session simply dies with no warning.', 'Fails 2.2.1.'], ['At 5 seconds a warning appears with an Extend button (announced as an alert).'], 150),
    [['Users must be able to extend a time limit…', ['Never', 'With a simple action, after a warning', 'Only on mobile', 'Only once'], 1, 'Warn and allow extension.'],
     ['A real-time auction is…', ['Never allowed', 'An exception (the limit is essential)', 'Always a failure', 'AAA only'], 1, 'Essential/real-time exceptions apply.']]);

  C('2.2.2',
    'Moving, blinking or scrolling content that starts automatically, lasts more than 5 seconds and sits beside other content needs a way to pause, stop or hide it. Auto-updating content needs the same.',
    ['People with ADHD or attention difficulties', 'Low-vision magnifier users', 'People with vestibular disorders', 'Screen reader users (live updates)'],
    ['Load the page and wait 5 seconds: does anything keep moving?', 'Is there a visible, keyboard-operable pause control?', 'Check carousels, tickers, GIFs and auto-refreshing feeds'],
    ['F16: scrolling content with no pause', 'Auto-advancing carousel', 'Looping background video with no pause'],
    [['G4', 'Allowing the content to be paused and restarted'], ['G11', 'Creating content that blinks for less than 5 seconds'], ['G152', 'Setting animated gifs to stop within 5 seconds'], ['F16', 'Failure: scrolling content with no pause mechanism']],
    demo('<style>.tk{overflow:hidden;white-space:nowrap;border:1px solid #999;border-radius:4px}.tk span{display:inline-block;padding-left:100%;animation:m 8s linear infinite}@keyframes m{to{transform:translateX(-100%)}}</style>\n<div class="tk"><span>Breaking: accessibility matters · Sale ends soon · New features released ·</span></div>',
      '<style>.tk{overflow:hidden;white-space:nowrap;border:1px solid #999;border-radius:4px}.tk span{display:inline-block;padding-left:100%;animation:m 8s linear infinite}.tk.p span{animation-play-state:paused}@keyframes m{to{transform:translateX(-100%)}}@media (prefers-reduced-motion:reduce){.tk span{animation:none;padding-left:0}}</style>\n<div class="tk" id="k"><span>Breaking: accessibility matters · Sale ends soon · New features released ·</span></div><p><button id="p" aria-pressed="false">Pause ticker</button></p><script>var k=document.getElementById("k"),p=document.getElementById("p");p.onclick=function(){var x=k.classList.toggle("p");p.setAttribute("aria-pressed",x);p.textContent=x?"Play ticker":"Pause ticker"}</script>',
      ['A ticker that never stops and cannot be paused.', 'Fails 2.2.2 (F16).'], ['A Pause button stops it; reduced-motion users see static text.'], 150),
    [['Moving content longer than…', ['1 second', '5 seconds', '30 seconds', '1 minute'], 1, 'More than 5 seconds.'],
     ['Which control satisfies 2.2.2?', ['A hidden toggle', 'A visible, keyboard-operable pause button', 'A tooltip', 'Faster motion'], 1, 'Visible and operable.']]);

  C('2.2.3',
    'AAA: timing is not an essential part of the event or activity, except for non-interactive synchronised media and real-time events.',
    ['People with cognitive or motor disabilities', 'Screen reader users'],
    ['Remove or make optional every time limit that is not essential'],
    ['A timed quiz where timing is not part of what is being tested'],
    [['G5', 'Allowing users to complete an activity without any time limit']],
    demo('<p style="font-size:15px">Quiz — <b>You have 30 seconds</b> to answer 10 questions.</p>', '<p style="font-size:15px">Quiz — take as long as you need.</p>',
      ['A time limit that adds nothing educational.', 'Not met (AAA).'], ['No limit, so no one is excluded.'], 100),
    [['2.2.3 removes time limits except for…', ['Forms', 'Real-time events and non-interactive media', 'Logins', 'Images'], 1, 'Those exceptions remain.'],
     ['Level?', ['A', 'AA', 'AAA', 'None'], 2, 'AAA.']]);

  C('2.2.4',
    'AAA: interruptions (alerts, updates, popups) can be postponed or suppressed by the user, except emergencies.',
    ['People with ADHD or cognitive disabilities', 'Screen reader users', 'Low-vision users'],
    ['Does anything pop up while users work?', 'Can non-urgent notifications be turned off or deferred?'],
    ['Chat popups and promo banners that appear mid-task'],
    [['G75', 'Providing a mechanism to postpone any updating of content'], ['G76', 'Providing a mechanism to request an update of the content instead of updating automatically']],
    demo('<p style="font-size:15px">Writing your report…</p><div style="background:#fee;padding:8px;border-radius:6px;font-size:14px">🔔 Promo! 20% off — click now</div>',
      '<p style="font-size:15px">Writing your report…</p><p style="font-size:14px"><button>Show 2 updates</button> <label><input type="checkbox"> Pause notifications</label></p>',
      ['Interrupts the task.', 'Not met (AAA).'], ['Updates wait until the user asks.'], 130),
    [['What may still interrupt?', ['Promos', 'Emergencies', 'Chat', 'Newsletters'], 1, 'Emergencies.'],
     ['Good pattern?', ['Auto popups', 'A “Show updates” button', 'Autoplay', 'Hidden alerts'], 1, 'User-controlled updates.']]);

  C('2.2.5',
    'AAA: when an authenticated session expires, users can continue after re-authenticating without losing data.',
    ['People who work slowly', 'People with cognitive disabilities'],
    ['Let a session expire mid-form, sign in again: is the entered data still there?'],
    ['Session timeout wipes a long application form'],
    [['G105', 'Saving data so it can be used after a user re-authenticates'], ['G181', 'Encoding user data as hidden or encrypted data in a re-authorization page']],
    demo('<p style="font-size:14px">Session expired → <b>Login page</b>. Your 40-minute application is gone.</p>', '<p style="font-size:14px">Session expired → <b>Login page</b>. After signing in your application is restored.</p>',
      ['Work is lost.', 'Not met (AAA).'], ['Data is saved so work continues.'], 100),
    [['2.2.5 is about…', ['Colour', 'Not losing data after re-authentication', 'Captions', 'Sound'], 1, 'Preserve work.'],
     ['Level?', ['A', 'AA', 'AAA', 'None'], 2, 'AAA.']]);

  C('2.2.6',
    'AAA: users are warned about the duration of inactivity that could cause data loss — unless data is preserved for more than 20 hours.',
    ['People with cognitive disabilities or who need more time'],
    ['Does the form warn how long you can be idle?', 'Or is data kept at least 20 hours?'],
    ['Silent 15-minute timeout on a long form'],
    [['Tip', 'State timeout length up front, or autosave and keep data for 20 hours or more']],
    demo('<p style="font-size:14px">Application form — <i>(no information about timeouts)</i></p>', '<p style="font-size:14px">Application form — Your answers are saved for 24 hours.</p>',
      ['A silent timeout surprises people.', 'Not met (AAA).'], ['Users know their work is safe.'], 100),
    [['Data preserved for more than how long avoids the warning?', ['1 hour', '20 hours', '2 hours', '5 minutes'], 1, '20 hours.'],
     ['A simple fix?', ['Hide the timer', 'Warn up front or autosave', 'Speed up', 'Remove labels'], 1, 'Warn or save.']]);

  /* ---------------- 2.3 Seizures ---------------- */
  C('2.3.1',
    'Nothing on the page flashes more than three times in any one second, or the flash is below the general and red flash thresholds. Level A. Flashing can trigger seizures.',
    ['People with photosensitive epilepsy', 'People with vestibular and migraine conditions'],
    ['Look for flashing banners, GIFs, videos and animations', 'Run video through PEAT (Photosensitive Epilepsy Analysis Tool)', 'Check transitions between high-contrast frames'],
    ['Strobing hero animation', 'GIF with rapid red/white alternation'],
    [['G19', 'Ensuring that no component of the content flashes more than three times in any 1-second period'], ['G176', 'Keeping the flashing area small enough']],
    demo('<p style="font-size:15px">⚠ Safety note: this demo is a still mock-up and does not flash.</p><div style="background:#eee;padding:10px;border-radius:6px;font-size:14px">Banner animation: <b>6 flashes per second</b> ✗</div>',
      '<p style="font-size:15px">⚠ Safety note: this demo is a still mock-up and does not flash.</p><div style="background:#eee;padding:10px;border-radius:6px;font-size:14px">Banner animation: <b>1 fade per second</b> ✓</div>',
      ['More than 3 flashes per second can trigger seizures.', 'Fails 2.3.1.'], ['Slow, soft changes are safe.'], 140),
    [['Maximum flashes per second?', ['1', '3', '10', '30'], 1, 'Three.'],
     ['A tool to check video?', ['PEAT', 'Photoshop', 'Excel', 'Word'], 0, 'PEAT.']]);

  C('2.3.2',
    'AAA: no content flashes more than three times per second — with no threshold exception.',
    ['People with photosensitive epilepsy'],
    ['Check that no part of the content flashes more than three times per second at any size'],
    ['Small fast flashes allowed at A but not at AAA'],
    [['G19', 'No component flashes more than three times in any 1-second period']],
    demo('<p style="font-size:14px">Still mock-up (no flashing). Flash rate: 5/s in a small area.</p>', '<p style="font-size:14px">Still mock-up (no flashing). Flash rate: 2/s.</p>',
      ['Passes 2.3.1’s small-area exception but not AAA.', 'Not met (AAA).'], ['Three or fewer per second.'], 90),
    [['Difference from 2.3.1?', ['None', 'No threshold exception', 'Needs captions', 'Needs audio'], 1, 'No exceptions.'],
     ['Level?', ['A', 'AA', 'AAA', 'None'], 2, 'AAA.']]);

  C('2.3.3',
    'AAA: motion animation triggered by interaction (parallax, zooming, sliding panels) can be disabled unless essential.',
    ['People with vestibular disorders', 'People prone to motion sickness'],
    ['Enable OS “reduce motion” and check the site calms down', 'Look for scroll-linked and click-triggered animations'],
    ['Parallax scrolling with no reduced-motion handling', 'Large slide-in transitions on every click'],
    [['C39', 'Using the CSS reduce-motion query to prevent motion']],
    demo('<style>.p{width:60px;height:60px;background:#4338ca;border-radius:8px;transition:transform 1.2s}.go{transform:translateX(160px) rotate(180deg)}</style>\n<div class="p" id="p"></div><p><button id="b">Run</button></p><script>document.getElementById("b").onclick=function(){document.getElementById("p").classList.toggle("go")}</script>',
      '<style>.p{width:60px;height:60px;background:#4338ca;border-radius:8px;transition:transform 1.2s}.go{transform:translateX(160px) rotate(180deg)}@media (prefers-reduced-motion:reduce){.p{transition:none}}</style>\n<div class="p" id="p"></div><p><button id="b">Run</button></p><script>document.getElementById("b").onclick=function(){document.getElementById("p").classList.toggle("go")}</script>',
      ['A sweeping motion plays regardless of OS settings.', 'Not met (AAA).'], ['With “reduce motion” on, the change is instant.'], 160,
      { broken: '.p { transition: transform 1.2s; }', fixed: '.p { transition: transform 1.2s; }\n@media (prefers-reduced-motion: reduce) {\n  .p { transition: none; }\n}' }),
    [['Which CSS honours reduced motion?', ['prefers-contrast', 'prefers-reduced-motion', 'hover', 'orientation'], 1, 'prefers-reduced-motion.'],
     ['Parallax is a problem for…', ['Colour-blind users', 'People with vestibular disorders', 'Deaf users', 'Nobody'], 1, 'Vestibular.']]);

  /* ---------------- 2.4 Navigable ---------------- */
  C('2.4.1',
    'A mechanism lets users bypass blocks of content repeated on pages, such as navigation. Typical solutions: skip links, landmarks and headings.',
    ['Keyboard-only users', 'Screen reader users', 'Switch users'],
    ['Press Tab once on page load: is there a visible “Skip to main content”?', 'Does it move focus to the main area?', 'Check landmarks (main, nav) and headings'],
    ['No skip link and 30 nav links before content', 'Skip link that targets a missing id'],
    [['G1', 'Adding a link at the top of each page that goes directly to the main content'], ['G123', 'Adding a link at the beginning of a block of repeated content'], ['ARIA11', 'Using ARIA landmarks'], ['H69', 'Providing heading elements at the beginning of each section']],
    demo('<nav style="font-size:14px"><a href="#">Home</a> <a href="#">Shop</a> <a href="#">About</a> <a href="#">News</a> <a href="#">Help</a> <a href="#">Contact</a></nav><main id="m"><h2>Main content</h2><p>Press Tab to count the stops before here.</p></main>',
      '<style>.s{position:absolute;left:8px;top:-60px;background:#4338ca;color:#fff;padding:6px 10px;border-radius:4px}.s:focus{top:8px}</style><a class="s" href="#m">Skip to main content</a><nav style="font-size:14px;margin-top:30px"><a href="#">Home</a> <a href="#">Shop</a> <a href="#">About</a> <a href="#">News</a> <a href="#">Help</a> <a href="#">Contact</a></nav><main id="m" tabindex="-1"><h2>Main content</h2><p>Press Tab once, then Enter.</p></main>',
      ['Six tab stops before the content, on every page.', 'Fails 2.4.1.'], ['The first Tab reveals a skip link that jumps to main.'], 170,
      { broken: '<nav>…six links…</nav>\n<main>…</main>', fixed: '<a class="skip" href="#main">Skip to main content</a>\n<nav>…six links…</nav>\n<main id="main" tabindex="-1">…</main>' }),
    [['A skip link should be…', ['Always visible only to mouse users', 'The first focusable element', 'Hidden forever', 'Last on the page'], 1, 'First focusable.'],
     ['Which also satisfies 2.4.1?', ['Landmarks and headings', 'Autoplay', 'Tooltips', 'Colours'], 0, 'Structure helps bypass.']]);

  C('2.4.2',
    'Web pages need titles that describe topic or purpose. The title is the first thing a screen reader announces and appears in tabs, bookmarks and history.',
    ['Screen reader users', 'People with cognitive disabilities', 'Anyone with many tabs open'],
    ['Check each page’s <title>', 'Is it unique and descriptive (page name – site name)?', 'In single-page apps, does the title update on route change?'],
    ['F25: title does not identify the page', 'Every page titled “Home” or “Untitled”', 'SPA that never updates the title'],
    [['H25', 'Providing a title using the title element'], ['G88', 'Providing descriptive titles for web pages'], ['F25', 'Failure: the title of a page does not identify the contents']],
    demo('<p style="font-size:14px;font-family:monospace">Tab 1: <b>Untitled</b><br>Tab 2: <b>Untitled</b><br>Tab 3: <b>Untitled</b></p>',
      '<p style="font-size:14px;font-family:monospace">Tab 1: <b>Cart – Acme Shop</b><br>Tab 2: <b>Checkout – Acme Shop</b><br>Tab 3: <b>Order 4821 – Acme Shop</b></p>',
      ['Identical titles: users cannot tell tabs or windows apart.', 'Fails 2.4.2.'], ['Page name first, site name last.'], 120,
      { broken: '<title>Untitled</title>', fixed: '<title>Checkout – Acme Shop</title>' }),
    [['A good title pattern?', ['Home', 'Page name – Site name', 'Untitled', 'The URL'], 1, 'Specific page name first.'],
     ['Which element sets it?', ['<h1>', '<title>', '<meta>', '<header>'], 1, '<title>.']]);

  C('2.4.3',
    'If a page can be navigated sequentially, focusable components receive focus in an order that preserves meaning and operability.',
    ['Keyboard users', 'Screen reader users', 'Switch users'],
    ['Tab through the page and watch the focus path', 'Does it follow visual and logical order?', 'Check modals: focus moves in on open and back on close', 'Search for positive tabindex values'],
    ['tabindex values above 0', 'Dialog opens but focus stays behind it', 'Dynamically inserted content placed at the end of the DOM'],
    [['G59', 'Placing the interactive elements in an order that follows sequences and relationships'], ['H4', 'Creating a logical tab order through links, form controls, and objects'], ['F44', 'Failure: using tabindex to create a tab order that does not preserve meaning']],
    demo('<button tabindex="3">A (tabindex 3)</button> <button tabindex="1">B (tabindex 1)</button> <button tabindex="2">C (tabindex 2)</button><p style="font-size:14px">Press Tab: order is B, C, A.</p>',
      '<button>A</button> <button>B</button> <button>C</button><p style="font-size:14px">Press Tab: order is A, B, C.</p>',
      ['Positive tabindex scrambles the order.', 'Fails 2.4.3 (F44).'], ['DOM order drives focus order.'], 120),
    [['Avoid…', ['tabindex="0"', 'Positive tabindex values', 'Native buttons', 'Landmarks'], 1, 'Positive values scramble order.'],
     ['When a dialog opens, focus should…', ['Stay put', 'Move into the dialog', 'Go to the footer', 'Disappear'], 1, 'Move into it.']]);

  C('2.4.4',
    'The purpose of each link can be determined from the link text alone or together with its surrounding context (paragraph, list item, table cell or heading).',
    ['Screen reader users who list all links', 'Voice-control users', 'People with cognitive disabilities'],
    ['List all links (screen reader links list)', 'Do “Read more”, “Click here” and “More” links have unique context?', 'Check linked images and icon links for names'],
    ['Many identical “Read more” links', 'Links that say “here”', 'F89: image link with empty alt'],
    [['H30', 'Providing link text that describes the purpose of a link'], ['ARIA8', 'Using aria-label for link purpose'], ['G91', 'Providing link text that describes the purpose of a link'], ['F89', 'Failure: using null alt on an image as the only content in a link']],
    demo('<p style="font-size:14px"><b>Accessible forms</b> <a href="#">Read more</a></p><p style="font-size:14px"><b>Keyboard basics</b> <a href="#">Read more</a></p>',
      '<p style="font-size:14px"><b>Accessible forms</b> <a href="#">Read more<span style="position:absolute;left:-9999px"> about accessible forms</span></a></p><p style="font-size:14px"><b>Keyboard basics</b> <a href="#">Read more<span style="position:absolute;left:-9999px"> about keyboard basics</span></a></p>',
      ['A links list shows “Read more, Read more”.', 'Weak link purpose.'], ['Links have unique, descriptive names for assistive tech.'], 110,
      { broken: '<a href="/forms">Read more</a>', fixed: '<a href="/forms">Read more<span class="sr-only"> about accessible forms</span></a>' }),
    [['Which link text is best?', ['Click here', 'Download the 2025 annual report (PDF)', 'More', 'Link'], 1, 'Descriptive.'],
     ['Hidden extra text can be done with…', ['display:none', 'A visually hidden class', 'title only', 'Colour'], 1, 'Visually hidden text.']]);

  C('2.4.5',
    'More than one way is available to locate a page within a set, except for steps in a process. Ways include navigation, search, sitemap, index and links between pages.',
    ['People with cognitive disabilities', 'Screen reader and keyboard users', 'Anyone who prefers search'],
    ['Can you find the same page via menu AND search or sitemap?'],
    ['Sites with only a deep menu and no search or sitemap'],
    [['G125', 'Providing links to navigate to related web pages'], ['G63', 'Providing a site map'], ['G161', 'Providing a search function to help users find content']],
    demo('<p style="font-size:14px"><b>Menu</b> only. No search. No sitemap.</p>', '<p style="font-size:14px"><b>Menu</b> + <b>Search</b> + <a href="#">Sitemap</a></p>',
      ['One way to find pages.', 'Fails 2.4.5.'], ['Several routes to each page.'], 90),
    [['Which counts as a second way?', ['A site search', 'A colour', 'A logo', 'Autoplay'], 0, 'Search.'],
     ['Steps in a checkout are…', ['Subject to 2.4.5', 'Exempt from 2.4.5', 'AAA', 'Banned'], 1, 'Process steps are exempt.']]);

  C('2.4.6',
    'Headings and labels describe topic or purpose. They do not need to exist everywhere, but where they do, they should be clear.',
    ['Screen reader users who navigate by heading', 'People with cognitive disabilities', 'Voice-control users'],
    ['Read the headings list: does it make sense out of context?', 'Are field labels specific (“Billing postcode”, not “Code”)?'],
    ['Headings like “Section 1”', 'Duplicate generic labels “Name” on different fields'],
    [['G130', 'Providing descriptive headings'], ['G131', 'Providing descriptive labels']],
    demo('<h2 style="font-size:17px">Info</h2><label for="a" style="font-size:14px">Code</label><br><input id="a">', '<h2 style="font-size:17px">Delivery details</h2><label for="a" style="font-size:14px">Postcode</label><br><input id="a" autocomplete="postal-code">',
      ['“Info” and “Code” do not say what they are.', 'Weak 2.4.6.'], ['Specific heading and label.'], 140),
    [['Best label?', ['Code', 'Billing postcode', 'Thing', 'Field 1'], 1, 'Specific.'],
     ['Headings should work…', ['Only visually', 'Read out of context in a headings list', 'Only in print', 'Never'], 1, 'Navigation by heading.']]);

  C('2.4.8',
    'AAA: information about the user’s location within a set of pages is available — breadcrumbs, site maps or highlighted current items.',
    ['People with cognitive disabilities', 'Screen reader users'],
    ['Is there a breadcrumb or other location cue?', 'Is the current page marked with aria-current?'],
    ['Deep site with no breadcrumbs or current-page indicator'],
    [['G65', 'Providing a breadcrumb trail'], ['G63', 'Providing a site map'], ['G127', 'Identifying a Web page’s relationship to a larger collection of Web pages']],
    demo('<p style="font-size:14px">You are somewhere in the site…</p>', '<nav aria-label="Breadcrumb" style="font-size:14px"><ol style="display:flex;gap:6px;list-style:none;padding:0"><li><a href="#">Home</a> ›</li><li><a href="#">Courses</a> ›</li><li><span aria-current="page">Forms</span></li></ol></nav>',
      ['No sense of place.', 'Not met (AAA).'], ['Breadcrumb with aria-current.'], 110,
      { broken: '<!-- nothing -->', fixed: '<nav aria-label="Breadcrumb">\n  <ol>\n    <li><a href="/">Home</a></li>\n    <li><a href="/courses">Courses</a></li>\n    <li aria-current="page">Forms</li>\n  </ol>\n</nav>' }),
    [['Which marks the current page?', ['aria-current="page"', 'tabindex', 'title', 'alt'], 0, 'aria-current.'],
     ['Level?', ['A', 'AA', 'AAA', 'None'], 2, 'AAA.']]);

  C('2.4.9',
    'AAA: the purpose of each link can be identified from the link text alone, without surrounding context.',
    ['Screen reader users', 'Voice-control users'],
    ['Read each link on its own, as in a links list'],
    ['“Learn more”, “Details”, “Click here”'],
    [['H30', 'Providing link text that describes the purpose of a link'], ['G91', 'Providing link text that describes the purpose of a link']],
    demo('<p style="font-size:14px"><a href="#">Details</a> · <a href="#">Details</a></p>', '<p style="font-size:14px"><a href="#">Pricing details</a> · <a href="#">Shipping details</a></p>',
      ['Meaningless alone.', 'Not met (AAA).'], ['Self-explanatory links.'], 90),
    [['2.4.9 differs from 2.4.4 by…', ['Allowing context', 'Requiring link text alone', 'Adding colour', 'Nothing'], 1, 'Link text only.'],
     ['Level?', ['A', 'AA', 'AAA', 'None'], 2, 'AAA.']]);

  C('2.4.10',
    'AAA: section headings organise content, where the content is divided into sections.',
    ['Screen reader users', 'People with cognitive disabilities and ADHD', 'Skimmers'],
    ['Does long content use headings to divide it?'],
    ['A long article with no subheadings'],
    [['G141', 'Organizing a page using headings']],
    demo('<p style="font-size:14px">Long text without any sections. Long text without any sections. Long text without any sections. Long text without any sections.</p>', '<h2 style="font-size:16px">Why it matters</h2><p style="font-size:14px">Short paragraph.</p><h2 style="font-size:16px">How to start</h2><p style="font-size:14px">Short paragraph.</p>',
      ['A wall of text.', 'Not met (AAA).'], ['Headings divide the content.'], 140),
    [['Headings help…', ['Only sighted users', 'Navigation for many people', 'Only SEO', 'Nobody'], 1, 'Navigation.'],
     ['Level?', ['A', 'AA', 'AAA', 'None'], 2, 'AAA.']]);

  C('2.4.11',
    'New in 2.2 (AA): when a component receives keyboard focus, it is not entirely hidden by author-created content such as sticky headers, footers and cookie banners.',
    ['Keyboard users', 'Low-vision users using zoom', 'Switch users'],
    ['Tab through pages with sticky headers/footers: is the focused item ever fully covered?', 'Test at 200–400% zoom', 'Check cookie banners and chat widgets'],
    ['F110: sticky headers or footers that hide focused elements', 'A fixed cookie banner covering the form fields'],
    [['C43', 'Using CSS scroll-padding to un-obscure content'], ['F110', 'Failure: sticky footers or headers that obscure focus']],
    demo('<style>body{margin:0}.h{position:fixed;top:0;left:0;right:0;background:#222;color:#fff;padding:12px;font:15px system-ui}.c{padding:60px 8px 8px}.c a{display:block;padding:18px 0}</style><div class="h">Sticky header</div><div class="c"><a href="#">Link 1</a><a href="#">Link 2</a><a href="#">Link 3</a><a href="#">Link 4</a><a href="#">Link 5</a><a href="#">Link 6</a><a href="#">Link 7</a></div>',
      '<style>html{scroll-padding-top:70px}body{margin:0}.h{position:fixed;top:0;left:0;right:0;background:#222;color:#fff;padding:12px;font:15px system-ui}.c{padding:60px 8px 8px}.c a{display:block;padding:18px 0}</style><div class="h">Sticky header</div><div class="c"><a href="#">Link 1</a><a href="#">Link 2</a><a href="#">Link 3</a><a href="#">Link 4</a><a href="#">Link 5</a><a href="#">Link 6</a><a href="#">Link 7</a></div>',
      ['Tab down: links scroll under the sticky header.', 'Fails 2.4.11 (F110).'], ['scroll-padding-top keeps focused links visible.'], 200,
      { broken: '.header { position: fixed; top: 0; }', fixed: '.header { position: fixed; top: 0; }\nhtml { scroll-padding-top: 5rem; }' }),
    [['CSS that helps?', ['scroll-padding', 'z-index:999', 'overflow:hidden', 'pointer-events'], 0, 'scroll-padding.'],
     ['2.4.11 level?', ['A', 'AA', 'AAA', 'None'], 1, 'AA.']]);

  C('2.4.12',
    'AAA: the focused component is not hidden at all by author-created content (stricter than 2.4.11, which allows partial obscuring).',
    ['Keyboard users', 'Low-vision users'],
    ['Check no part of the focus area is covered by sticky UI'],
    ['A bottom banner that covers half of a focused button'],
    [['C43', 'Using CSS scroll-padding to un-obscure content']],
    demo('<style>body{margin:0}.f{position:fixed;bottom:0;left:0;right:0;background:#222;color:#fff;padding:12px;font:15px system-ui}.c a{display:block;padding:18px 8px}</style><div class="c"><a href="#">Link 1</a><a href="#">Link 2</a><a href="#">Link 3</a><a href="#">Link 4</a><a href="#">Link 5</a><a href="#">Link 6</a></div><div class="f">Cookie banner</div>',
      '<style>html{scroll-padding-bottom:70px}body{margin:0}.f{position:fixed;bottom:0;left:0;right:0;background:#222;color:#fff;padding:12px;font:15px system-ui}.c a{display:block;padding:18px 8px}</style><div class="c"><a href="#">Link 1</a><a href="#">Link 2</a><a href="#">Link 3</a><a href="#">Link 4</a><a href="#">Link 5</a><a href="#">Link 6</a></div><div class="f">Cookie banner</div>',
      ['Tab to the last links: the banner can cover them.', 'Not met (AAA).'], ['scroll-padding-bottom keeps focus clear.'], 200),
    [['Difference from 2.4.11?', ['Nothing', 'No part may be hidden', 'Needs sound', 'Needs colour'], 1, 'Stricter.'],
     ['Level?', ['A', 'AA', 'AAA', 'None'], 2, 'AAA.']]);

  C('2.4.13',
    'AAA: the focus indicator is at least as large as a 2px perimeter around the component and has 3:1 contrast between focused and unfocused states.',
    ['Low-vision users', 'Keyboard users'],
    ['Measure the focus indicator thickness and contrast change'],
    ['A 1px dotted indicator', 'A subtle underline-only focus style'],
    [['C40', 'Creating a two-colour focus indicator to ensure sufficient contrast'], ['C41', 'Creating a strong visual indicator of focus with colour change']],
    demo('<style>button{outline:1px dotted #bbb;margin:8px;padding:8px 14px}</style><button>One</button><button>Two</button>', '<style>button{margin:8px;padding:8px 14px}button:focus-visible{outline:3px solid #1d4ed8;outline-offset:2px;box-shadow:0 0 0 6px #fff}</style><button>One</button><button>Two</button>',
      ['Thin, faint dotted outline.', 'Not met (AAA).'], ['3px ring with offset and a white halo for contrast.'], 110,
      { broken: 'button:focus { outline: 1px dotted #bbb; }', fixed: 'button:focus-visible {\n  outline: 3px solid #1d4ed8;\n  outline-offset: 2px;\n  box-shadow: 0 0 0 6px #fff;\n}' }),
    [['Minimum focus thickness (AAA)?', ['1px', '2px perimeter', '10px', '0'], 1, 'About 2 CSS px.'],
     ['A two-tone ring helps because…', ['It is pretty', 'It contrasts on any background', 'It is faster', 'It hides'], 1, 'Contrast everywhere.']]);

  /* ---------------- 2.5 Input modalities ---------------- */
  C('2.5.1',
    'Functionality that uses multipoint or path-based gestures (pinch, swipe, draw) must also work with a single pointer without a path (tap/click).',
    ['People with motor impairments', 'Switch, head-pointer and eye-gaze users', 'People using a stylus or mouth stick'],
    ['List swipe, pinch, rotate and path gestures', 'Is there a one-tap alternative (Next/Prev buttons, zoom +/−)?'],
    ['Swipe-only carousel', 'Pinch-only zoom on a map with no buttons'],
    [['G215', 'Providing controls to achieve the same result as path-based or multipoint gestures'], ['G216', 'Providing single point activation for a control slider']],
    demo('<div id="s" style="padding:14px;background:#eef;border-radius:6px;font-size:15px">Slide 1 — swipe to change</div><script>var x0,s=document.getElementById("s"),n=1;s.addEventListener("touchstart",function(e){x0=e.touches[0].clientX});s.addEventListener("touchend",function(e){if(Math.abs(e.changedTouches[0].clientX-x0)>40){n++;s.textContent="Slide "+n+" — swipe to change"}})</script>',
      '<div id="s" style="padding:14px;background:#eef;border-radius:6px;font-size:15px" role="status">Slide 1 of 3</div><p><button id="p">Previous</button> <button id="n">Next</button></p><script>var s=document.getElementById("s"),i=1;function u(){s.textContent="Slide "+i+" of 3"}document.getElementById("n").onclick=function(){i=Math.min(3,i+1);u()};document.getElementById("p").onclick=function(){i=Math.max(1,i-1);u()}</script>',
      ['Swipe only: a mouse or switch cannot change slides.', 'Fails 2.5.1.'], ['Buttons offer a single-pointer alternative.'], 130),
    [['A single-pointer alternative to swipe is…', ['A longer swipe', 'Next/Previous buttons', 'Shake', 'Pinch'], 1, 'Buttons.'],
     ['A path-based gesture is…', ['A tap', 'A swipe or drawn shape', 'A click', 'A keypress'], 1, 'Path matters.']]);

  C('2.5.2',
    'For single-pointer actions, completion happens on the up-event, or can be aborted/undone — users can move away before releasing.',
    ['People with tremors', 'Touchscreen users who tap accidentally', 'Switch users'],
    ['Press a control and drag off before releasing: does it still fire?', 'Search for mousedown/touchstart that trigger actions'],
    ['F101: activating on the down-event with no undo', 'Delete on mousedown'],
    [['G210', 'Ensuring that drag-and-drop actions can be cancelled'], ['G212', 'Using native controls to ensure functionality is triggered on the up-event'], ['F101', 'Failure: activating a control on the down-event']],
    demo('<button id="b" style="padding:10px 16px" onmousedown="document.getElementById(\'o\').textContent=\'Deleted on mouse DOWN\'">Delete</button><p id="o" role="status" style="font-size:14px">Press and hold, then drag away.</p>',
      '<button id="b" style="padding:10px 16px" onclick="document.getElementById(\'o\').textContent=\'Deleted on click (up)\'">Delete</button><p id="o" role="status" style="font-size:14px">Press and hold, then drag away. Nothing happens.</p>',
      ['It fires the moment you press: no chance to abort.', 'Fails 2.5.2 (F101).'], ['Click fires on release inside the control, so you can cancel by moving away.'], 130,
      { broken: '<button onmousedown="del()">Delete</button>', fixed: '<button onclick="del()">Delete</button>' }),
    [['Which event pattern is safe?', ['mousedown', 'click (up-event)', 'touchstart', 'mouseover'], 1, 'Completion on the up-event.'],
     ['Native <button> click fires…', ['On press', 'On release', 'On hover', 'Never'], 1, 'On release.']]);

  C('2.5.3',
    'For controls with visible text labels, the accessible name must contain that text, ideally at the start. Voice-control users say what they see.',
    ['Voice-control users (Dragon, Voice Control)', 'Screen reader users', 'People with speech-recognition tools'],
    ['Compare each visible label to its accessible name (DevTools accessibility pane)', 'Say “click <visible label>” with voice control'],
    ['F96: name does not contain the visible label', 'aria-label that replaces the label with different words'],
    [['G208', 'Including the text of the visible label as part of the accessible name'], ['G211', 'Matching the accessible name to the visible label'], ['F96', 'Failure: accessible name does not contain the visible label']],
    demo('<button id="b" aria-label="Find items" style="padding:8px 14px">Search</button><p id="o" style="font-size:14px"></p><script>var b=document.getElementById("b");document.getElementById("o").textContent="Visible: "+b.textContent+" | Accessible name: "+b.getAttribute("aria-label")</script>',
      '<button id="b" aria-label="Search the catalogue" style="padding:8px 14px">Search</button><p id="o" style="font-size:14px"></p><script>var b=document.getElementById("b");document.getElementById("o").textContent="Visible: "+b.textContent+" | Accessible name: "+b.getAttribute("aria-label")</script>',
      ['Saying “click Search” fails: the name is “Find items”.', 'Fails 2.5.3 (F96).'], ['The name starts with “Search”, so speech commands work.'], 120,
      { broken: '<button aria-label="Find items">Search</button>', fixed: '<button aria-label="Search the catalogue">Search</button>\n<!-- or simply: <button>Search</button> -->' }),
    [['Best practice?', ['Always use aria-label', 'Let visible text be the name', 'Hide the label', 'Use title'], 1, 'Visible text as the name.'],
     ['Voice users say…', ['The hidden name', 'What they see', 'The URL', 'The class'], 1, 'What they see.']]);

  C('2.5.4',
    'Functionality triggered by device or user motion (shake, tilt) can also be done with a normal control, and motion actuation can be disabled.',
    ['People with tremors or limited mobility', 'People who mount devices on wheelchairs', 'People with conditions affected by movement'],
    ['Does shaking, tilting or waving trigger anything?', 'Is there a button alternative and a setting to turn motion off?'],
    ['Shake to undo with no Undo button'],
    [['G213', 'Providing conventional controls and an option to disable motion actuation']],
    demo('<p style="font-size:14px">Shake to undo.</p><button id="s">📳 Simulate shake</button> <span id="o" role="status" style="font-size:14px"></span><script>document.getElementById("s").onclick=function(){document.getElementById("o").textContent="Undone by shake"}</script>',
      '<p style="font-size:14px">Shake to undo, or use the button.</p><button id="s">📳 Simulate shake</button> <button id="u">Undo</button> <label style="font-size:14px"><input type="checkbox" id="d"> Disable shake</label> <span id="o" role="status" style="font-size:14px"></span><script>var o=document.getElementById("o");document.getElementById("s").onclick=function(){if(!document.getElementById("d").checked)o.textContent="Undone by shake"};document.getElementById("u").onclick=function(){o.textContent="Undone with button"}</script>',
      ['Motion is the only way to undo.', 'Fails 2.5.4.'], ['A button and a disable option are provided.'], 150),
    [['A fix for shake-to-undo?', ['Shake harder', 'An Undo button and a motion toggle', 'Remove undo', 'Add sound'], 1, 'Control + opt-out.'],
     ['Who benefits?', ['People who cannot shake the device', 'Nobody', 'Only developers', 'Only mouse users'], 0, 'People unable to move the device.']]);

  C('2.5.5',
    'AAA: targets are at least 44 by 44 CSS pixels, with exceptions for inline text links, user-agent controls and essential presentations.',
    ['People with motor impairments', 'Touch-screen and older users', 'Anyone in motion (bus, walking)'],
    ['Measure targets in DevTools', 'Test with a finger on a phone'],
    ['16px icon buttons packed together'],
    [['C42', 'Using min-height and min-width to ensure sufficient target size']],
    demo('<style>.i{width:22px;height:22px;border:1px solid #666;background:#fff;margin:2px;padding:0}</style><button class="i" aria-label="Edit">✎</button><button class="i" aria-label="Copy">⧉</button><button class="i" aria-label="Delete">🗑</button>',
      '<style>.i{min-width:44px;min-height:44px;border:1px solid #666;background:#fff;margin:2px;padding:0}</style><button class="i" aria-label="Edit">✎</button><button class="i" aria-label="Copy">⧉</button><button class="i" aria-label="Delete">🗑</button>',
      ['22px targets are hard to hit.', 'Not met (AAA 2.5.5).'], ['44px targets are easy to hit.'], 110,
      { broken: '.icon-btn { width: 22px; height: 22px; }', fixed: '.icon-btn { min-width: 44px; min-height: 44px; }' }),
    [['AAA target size?', ['16px', '24px', '44px', '100px'], 2, '44 CSS px.'],
     ['Use … to guarantee size:', ['min-width/min-height', 'font-size', 'overflow', 'z-index'], 0, 'C42.']]);

  C('2.5.6',
    'AAA: the page does not restrict input to a single modality — users can switch between touch, mouse, keyboard and voice at will.',
    ['Users with hybrid setups (touchscreen laptop plus keyboard)', 'People using assistive technology alongside other inputs'],
    ['Does anything disable mouse when touch is detected, or vice versa?', 'Use touch, mouse and keyboard in one session'],
    ['Code that disables mouse handlers on touch devices'],
    [['Tip', 'Handle all input types with pointer and keyboard events instead of device sniffing']],
    demo('<p style="font-size:14px;font-family:monospace">if ("ontouchstart" in window) {<br>&nbsp;&nbsp;disableMouse();<br>}</p>', '<p style="font-size:14px;font-family:monospace">element.addEventListener("pointerup", act);<br>element.addEventListener("keydown", actOnEnter);</p>',
      ['Locks users into touch only.', 'Not met (AAA).'], ['All inputs are always accepted.'], 120),
    [['Better than device sniffing?', ['Pointer + keyboard events', 'User-agent checks', 'Screen size only', 'Cookies'], 0, 'Handle all modalities.'],
     ['Level?', ['A', 'AA', 'AAA', 'None'], 2, 'AAA.']]);

  C('2.5.8',
    'New in 2.2 (AA): pointer targets are at least 24×24 CSS pixels, unless spacing leaves a 24px circle clear around the target, the target is inline in text, or the size is essential.',
    ['People with tremors', 'Touch-screen users', 'People with large fingers or limited dexterity'],
    ['Measure targets in DevTools', 'Check small icon buttons, close buttons, pagination and chips', 'Is there at least 24px spacing if smaller?'],
    ['16px close buttons side by side', 'Tiny pagination dots'],
    [['C42', 'Using min-height and min-width to ensure sufficient target size'], ['C42', 'Spacing can substitute for size under the spacing exception']],
    demo('<style>.i{width:16px;height:16px;border:1px solid #666;background:#fff;margin:1px;padding:0;font-size:10px}</style><button class="i" aria-label="Close one">×</button><button class="i" aria-label="Close two">×</button><button class="i" aria-label="Close three">×</button>',
      '<style>.i{min-width:24px;min-height:24px;border:1px solid #666;background:#fff;margin:4px;padding:0;font-size:14px}</style><button class="i" aria-label="Close one">×</button><button class="i" aria-label="Close two">×</button><button class="i" aria-label="Close three">×</button>',
      ['16px targets with 2px gaps are easy to mis-hit.', 'Fails 2.5.8.'], ['24px minimum with spacing.'], 110,
      { broken: '.close { width: 16px; height: 16px; }', fixed: '.close { min-width: 24px; min-height: 24px; }' }),
    [['2.5.8 minimum size?', ['16×16', '24×24 CSS px', '44×44', '10×10'], 1, '24 CSS px.'],
     ['An exception is…', ['Inline text links', 'Buttons', 'Menus', 'Forms'], 0, 'Inline links.']]);
})(window.A11Y = window.A11Y || {});
