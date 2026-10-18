/* Phase 4 hubs: Overlays, Navigation components, Selection/input widgets, Data-rich components, Rich content tools. */
(function (A) {
  'use strict';
  const add = (id, h) => { A.data.hubs[id] = h; const t = A.data.topicById[id];
    A.data.badges.push({ id: 'hub-' + id, name: t.name + ' Hub', desc: 'Pass the ' + t.name + ' hub quiz.', icon: t.icon, test: s => !!(s.hubs && s.hubs[id]) }); };
  const F = (title, story, fix) => ({ title, story, fix });
  const Q = (q, options, answer, why) => ({ q, options, answer, why });
  const CD = id => A.data.componentById[id].demo;

  add('overlays', {
    patterns: {
      do: ['Use native <dialog>.showModal() for modals: focus, inertness and Esc come built in.', 'Give every dialog an accessible name (aria-labelledby on its heading).', 'Return focus to the trigger when it closes.', 'Use a toggletip (button + live region) for help text instead of title tooltips.', 'Make cookie banners reachable early and never cover focused elements.'],
      dont: ['Build dialogs from divs with clickable spans.', 'Let Tab escape into the page behind a modal.', 'Rely on hover-only tooltips or title attributes.', 'Auto-dismiss toasts that carry important errors.']
    },
    demo: CD('dialog'),
    failures: [
      F('The consent banner that blocked checkout', 'A consent manager opened at the bottom of the page but focus stayed on the page. Keyboard users tabbed through the whole site behind the banner and could not find “Reject”.', 'Place the banner early in the DOM or move focus to it, and make every choice a real button.'),
      F('The modal with no way out', 'A promo dialog trapped focus and had no Close button; Esc did nothing. Screen reader users had to restart the browser.', 'Always provide a Close button and Esc handling.'),
      F('Errors in vanishing toasts', 'A form error appeared as a toast for 4 seconds. Screen magnifier users never saw it.', 'Keep errors persistent and inline; announce toasts through a live region.')
    ],
    checklist: {
      manual: ['Open the overlay with the keyboard: does focus move inside?', 'Is Tab contained while open, and does Esc close it?', 'Does focus return to the trigger?', 'Can all help text be reached without a mouse?', 'Does anything cover the focused element (2.4.11)?'],
      tools: ['axe DevTools (dialog name, aria-hidden-focus)', 'DevTools: inspect inert / aria-modal', 'Tab-stop visualiser in Accessibility Insights'],
      sr: ['NVDA/JAWS: is the dialog role and name announced on open?', 'VoiceOver: can you reach background content while the modal is open?']
    },
    audit: { title: 'Modal dialog does not manage focus', criteria: '2.4.3 Focus Order · 4.1.2 Name, Role, Value · Level A', severity: 'High', location: 'Newsletter pop-up', found: 'The pop-up is a div. Focus stays on the page; there is no role, name or Esc handling.', impact: 'Keyboard and screen reader users interact with the page behind the pop-up.', recommendation: 'Use <dialog> with showModal(), label it, and return focus on close.', code: '<dialog id="news" aria-labelledby="nt">\n  <h2 id="nt">Subscribe</h2>\n  <button id="close">Close</button>\n</dialog>\n<script>opener.addEventListener("click", () => news.showModal());</script>' },
    challenge: { title: 'Modal or not?', prompt: 'Choose the right pattern for each situation.', buckets: ['Modal dialog', 'Toggletip', 'Inline message', 'Toast with live region'], items: [
      { t: 'Confirm deleting an account.', a: 0 },
      { t: 'Explain what “CVV” means beside a field.', a: 1 },
      { t: 'A form field has an invalid value.', a: 2 },
      { t: '“Saved” after autosave.', a: 3 }
    ] },
    quiz: [
      Q('Best way to build a modal?', ['Div plus z-index', 'Native <dialog> with showModal()', 'iframe', 'title attribute'], 1, 'Native dialog handles focus and inertness.'),
      Q('When a modal closes, focus goes to…', ['The footer', 'The trigger', 'Nowhere', 'The logo'], 1, 'Return to the opener.'),
      Q('A title-attribute tooltip fails because…', ['It is red', 'Keyboard and touch users cannot reach it', 'It is long', 'It is blue'], 1, '1.4.13 and 2.1.1.'),
      Q('Errors should be…', ['Short-lived toasts', 'Persistent and inline', 'Colour only', 'Hidden'], 1, 'Do not rely on vanishing messages.')
    ]
  });

  add('navigation', {
    patterns: {
      do: ['Use <nav> with a label for each navigation landmark.', 'Mark the current page with aria-current="page".', 'Build disclosure menus with buttons and aria-expanded rather than hover-only mega menus.', 'Tabs: tablist/tab/tabpanel with roving tabindex and arrow keys.', 'Accordions: a button in a heading with aria-expanded.'],
      dont: ['Open menus on hover only.', 'Use role="menu" for site navigation.', 'Build tabs and accordions from divs and spans.', 'Hide skip links permanently.']
    },
    demo: CD('tabs'),
    failures: [
      F('The mega menu that needed a mouse', 'Sub-menus appeared on hover. Keyboard focus never opened them, so half the site was unreachable.', 'Use a button with aria-expanded that toggles the menu; open on Enter/Space, close on Esc.'),
      F('Breadcrumbs with no current page', 'A deep documentation site showed a breadcrumb with every item as a link, including the current page.', 'Mark the last item with aria-current="page".'),
      F('Tabs that were all tab stops', 'Ten tabs each took a Tab key press; users had to tab through all of them to reach the panel.', 'Use roving tabindex: one tab stop, arrows inside.')
    ],
    checklist: {
      manual: ['Reach and open every menu with the keyboard.', 'Does Esc close menus and return focus?', 'Is the current page indicated by more than colour?', 'Do tabs behave as one tab stop with arrow keys?'],
      tools: ['axe DevTools (landmarks, aria-roles)', 'HeadingsMap / Landmarks extension', 'Accessibility Insights tab-stops'],
      sr: ['Landmarks list: are navs labelled?', 'Are expanded/collapsed states announced?']
    },
    audit: { title: 'Dropdown menu opens on hover only', criteria: '2.1.1 Keyboard · 4.1.2 Name, Role, Value · Level A', severity: 'High', location: 'Main navigation', found: 'Sub-navigation appears on mouse hover; no button, no aria-expanded.', impact: 'Keyboard, touch and voice users cannot open sub-menus.', recommendation: 'Use a disclosure button with aria-expanded.', code: '<button aria-expanded="false" aria-controls="sub">Products</button>\n<ul id="sub" hidden>…</ul>' },
    challenge: { title: 'Pick the right pattern', prompt: 'Which pattern fits each need?', buckets: ['Tabs', 'Accordion', 'Breadcrumb', 'Disclosure nav menu'], items: [
      { t: 'Switch between Details and Reviews for one product.', a: 0 },
      { t: 'Show FAQ answers one at a time, several can be open.', a: 1 },
      { t: 'Show where you are in a deep hierarchy.', a: 2 },
      { t: 'A site menu with sub-menus.', a: 3 }
    ] },
    quiz: [
      Q('A menu button needs…', ['aria-expanded', 'title', 'alt', 'lang'], 0, 'Expose state.'),
      Q('Tabs should be…', ['Many tab stops', 'One tab stop with arrows', 'Mouse only', 'Hidden'], 1, 'Roving tabindex.'),
      Q('Mark the current page with…', ['aria-current="page"', 'color', 'title', 'id'], 0, 'aria-current.'),
      Q('Hover-only menus fail…', ['2.1.1', '1.1.1', '3.1.1', '2.3.1'], 0, 'Keyboard.')
    ]
  });

  add('widgets', {
    patterns: {
      do: ['Prefer native inputs: select, radio, checkbox, range, input type.', 'Custom switch: role="switch" with aria-checked and a text or icon state.', 'Combobox: aria-expanded, aria-controls, aria-activedescendant.', 'Rating and stepper: operable with arrows and visible labels.', 'OTP/passcode: allow paste, avoid per-digit traps, add autocomplete="one-time-code".'],
      dont: ['Build controls from divs.', 'Rely on colour alone for a switch state.', 'Block paste in passcode fields.', 'Use dragging as the only way to set a slider.']
    },
    demo: CD('switch'),
    failures: [
      F('The star rating nobody could set', 'Stars were images with click handlers. Keyboard users could not rate, and screen readers announced nothing.', 'Use radio buttons styled as stars with a visible group label.'),
      F('The OTP field that blocked paste', 'Six separate boxes auto-advanced and blocked paste. A user with a password manager could not complete login.', 'Use one input with autocomplete="one-time-code", or allow paste across boxes.'),
      F('The toggle that only changed colour', 'A green/grey switch was all that signalled On/Off. Colour-blind users could not tell.', 'Add text or an icon and expose role="switch".')
    ],
    checklist: {
      manual: ['Operate every widget with the keyboard only.', 'Are state and value visible without colour?', 'Can sliders be set with arrow keys and a text field?', 'Do autocompletes allow paste and have 1.3.5 tokens?'],
      tools: ['axe DevTools (aria-allowed-attr, label)', 'DevTools accessibility tree for names and states', 'Accessibility Insights'],
      sr: ['Announced as the right role (switch, slider, combobox)?', 'Value changes announced?']
    },
    audit: { title: 'Custom toggle has no role or state', criteria: '4.1.2 Name, Role, Value · 1.4.1 Use of Colour · Level A', severity: 'High', location: 'Settings', found: 'A div with a colour change is used as a toggle.', impact: 'Screen reader and keyboard users cannot find or operate the setting.', recommendation: 'Use a button with role="switch" and aria-checked; add On/Off text.', code: '<button role="switch" aria-checked="false"\n  aria-labelledby="lbl">Off</button>' },
    challenge: { title: 'Native or custom?', prompt: 'Pick the best element for each control.', buckets: ['Native <select>', 'role="switch" button', 'Radio group', 'input type="range"'], items: [
      { t: 'Choose a country from a list.', a: 0 },
      { t: 'Turn notifications on or off.', a: 1 },
      { t: 'Choose one of three shipping speeds.', a: 2 },
      { t: 'Set volume from 0 to 100.', a: 3 }
    ] },
    quiz: [
      Q('A toggle state must not rely on…', ['Text', 'Colour alone', 'aria-checked', 'Role'], 1, '1.4.1.'),
      Q('Passcode fields should…', ['Block paste', 'Allow paste and use one-time-code', 'Be hidden', 'Auto-submit'], 1, 'Allow paste.'),
      Q('Prefer…', ['Native controls', 'Divs', 'Images', 'Canvas'], 0, 'Native first.'),
      Q('Switch uses role…', ['switch', 'toggle', 'checkbox only', 'button only'], 0, 'role="switch".')
    ]
  });

  add('data-rich', {
    patterns: {
      do: ['Use real <table> with caption, th and scope for data.', 'Sortable columns: a button in the th with aria-sort on the th.', 'Announce updates (sorted, filtered, loaded more) through a polite live region.', 'Infinite scroll: provide a “Load more” button and keep the footer reachable.', 'Make calendar and Kanban cells operable by keyboard with a clear focus model.'],
      dont: ['Build tables from divs without roles.', 'Use tables for layout.', 'Replace content silently on sort or filter.', 'Use infinite scroll with no way to reach the footer.']
    },
    demo: CD('table'),
    failures: [
      F('The grid with no headers', 'A dashboard built with div grids looked like a table. Screen readers read a stream of numbers without knowing which column they belonged to.', 'Use a real table with th scope, or full ARIA grid roles with keyboard support.'),
      F('Infinite scroll with a hidden footer', 'Keyboard users tabbed through new items forever and never reached the contact link in the footer.', 'Use “Load more”, and manage focus on the first new item.'),
      F('Sort that said nothing', 'Clicking a column re-ordered rows with no feedback; screen reader users did not know it had worked.', 'Set aria-sort and announce “Sorted by Price, ascending”.')
    ],
    checklist: {
      manual: ['Zoom to 400%: does the table reflow or scroll inside its own region?', 'Can you sort and filter with the keyboard?', 'Is there a way to reach the footer past long lists?', 'Does focus stay sensible after updates?'],
      tools: ['axe DevTools (th-has-data-cells, scope)', 'DevTools accessibility tree for table structure', 'Accessibility Insights'],
      sr: ['Table navigation keys announce row and column headers.', 'Sort and filter changes are announced.']
    },
    audit: { title: 'Data table built from divs', criteria: '1.3.1 Info and Relationships · Level A', severity: 'High', location: 'Reports page', found: 'Layout divs with CSS grid imitate a table.', impact: 'Screen reader users cannot navigate by row or column or hear headers.', recommendation: 'Use a real table with caption and th scope.', code: '<table>\n  <caption>Q1 sales by region</caption>\n  <thead><tr><th scope="col">Region</th><th scope="col">Sales</th></tr></thead>\n  <tbody><tr><th scope="row">North</th><td>120</td></tr></tbody>\n</table>' },
    challenge: { title: 'Fix the data component', prompt: 'Which fix applies?', buckets: ['Add th and scope', 'Add aria-sort and announce', 'Add a Load more button', 'Add a caption'], items: [
      { t: 'Screen readers cannot tell which column a number belongs to.', a: 0 },
      { t: 'Users do not know the table has been re-sorted.', a: 1 },
      { t: 'Infinite scroll hides the footer.', a: 2 },
      { t: 'The table has no accessible name.', a: 3 }
    ] },
    quiz: [
      Q('Table headers use…', ['td', 'th with scope', 'span', 'div'], 1, 'th scope.'),
      Q('Infinite scroll needs…', ['Nothing', 'A way to reach the footer and a Load more option', 'Animation', 'Hover'], 1, 'Provide control.'),
      Q('aria-sort goes on…', ['th', 'td', 'tr', 'table'], 0, 'The column header.'),
      Q('Dynamic updates should be…', ['Silent', 'Announced politely', 'Flashed', 'Hidden'], 1, '4.1.3.')
    ]
  });

  add('rich-content', {
    patterns: {
      do: ['Rich text editors: toolbar with role="toolbar", labelled buttons, aria-pressed states.', 'Provide an Esc-then-Tab escape from editors that capture Tab.', 'File uploaders: always include a real “Choose file” button and a status message.', 'AI chat: announce new responses, keep input labelled, allow stop and retry by keyboard.', 'Comment threads: heading structure and clear reply buttons with unique names.'],
      dont: ['Drag-only upload zones.', 'Icon-only toolbar buttons without names.', 'Trap Tab inside editors.', 'Stream chat text into a live region character by character.']
    },
    demo: CD('upload'),
    failures: [
      F('The editor that swallowed Tab', 'A rich text editor used Tab for indentation. Keyboard users could never leave the field.', 'Document an escape, such as Esc then Tab, and show it in the UI.'),
      F('The chatbot that talked over itself', 'Each streamed token was announced. Screen reader users heard a babble of fragments.', 'Announce once when a response is complete; keep a visible status while it is generating.'),
      F('The image cropper with no keyboard', 'Cropping required dragging handles. Keyboard users could not crop their avatar.', 'Add numeric fields or arrow-key controls for crop area.')
    ],
    checklist: {
      manual: ['Reach every toolbar button and menu by keyboard.', 'Can you leave the editor with Tab or a documented key?', 'Is there a non-drag way to upload and crop?', 'Are new chat messages announced once?'],
      tools: ['axe DevTools (button-name, label)', 'Browser accessibility pane', 'Keyboard-only walkthrough'],
      sr: ['Toolbar buttons announced with names and pressed states.', 'Upload status announced after selection.']
    },
    audit: { title: 'File upload only works by drag-and-drop', criteria: '2.1.1 Keyboard · 2.5.7 Dragging Movements · Level A/AA', severity: 'High', location: 'Document upload', found: 'A drop zone is the only way to attach files.', impact: 'Keyboard, voice and screen reader users cannot upload.', recommendation: 'Add a labelled file input and a status message.', code: '<label>Choose file <input type="file" aria-describedby="help"></label>\n<p id="help">PDF or JPG, max 5 MB.</p>\n<p role="status"></p>' },
    challenge: { title: 'Keyboard-safe or not?', prompt: 'Which designs work for keyboard and screen reader users?', buckets: ['Works', 'Fails'], items: [
      { t: 'A real Choose file button plus a drop zone.', a: 0 },
      { t: 'A drop zone only.', a: 1 },
      { t: 'Editor toolbar buttons labelled “Bold”, “Italic”.', a: 0 },
      { t: 'An editor that captures Tab with no escape.', a: 1 }
    ] },
    quiz: [
      Q('An uploader must always have…', ['A drop zone only', 'A real file input button', 'Animation', 'A tooltip'], 1, 'A keyboard-operable control.'),
      Q('Editors capturing Tab need…', ['Nothing', 'A documented escape', 'More colour', 'Mouse only'], 1, '2.1.2.'),
      Q('AI chat responses should be announced…', ['Per character', 'Once when complete', 'Never', 'In red'], 1, 'Avoid babble.'),
      Q('Toolbar toggles need…', ['aria-pressed', 'title', 'alt', 'lang'], 0, 'Expose state.')
    ]
  });
  A.data.paths.beginner.push('overlays-native-dialog', 'navigation-landmarks-current', 'widgets-native-first', 'datarich-real-tables', 'richcontent-uploads');
})(window.A11Y = window.A11Y || {});
