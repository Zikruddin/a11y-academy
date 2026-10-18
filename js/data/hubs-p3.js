/* Phase 3 hub content: Drag-and-drop, Pointer/touch, Keyboard/focus, Voice. Adds hubs + badges. */
(function (A) {
  'use strict';
  const add = (id, h) => { A.data.hubs[id] = h; const t = A.data.topicById[id];
    A.data.badges.push({ id: 'hub-' + id, name: t.name + ' Hub', desc: 'Pass the ' + t.name + ' hub quiz.', icon: t.icon, test: s => !!(s.hubs && s.hubs[id]) }); };
  const F = (title, story, fix) => ({ title, story, fix });
  const Q = (q, options, answer, why) => ({ q, options, answer, why });

  add('drag-drop', {
    patterns: {
      do: ['Offer a click or button alternative for every drag (Move up/down, Move to…).', 'Support keyboard pick-up, arrow-key move, drop and Esc to cancel.', 'Announce each step in a polite live region.', 'Keep focus on the moved item after re-render.', 'Make drop zones large and highlighted.'],
      dont: ['Make dragging the only way to reorder or upload.', 'Complete a drop on pointer down.', 'Rely on colour alone to show the drop target.', 'Use deprecated aria-grabbed as your only feedback.']
    },
    demo: '2.5.7',
    failures: [
      F('The Kanban board nobody could update', 'A project tool allows moving cards only by drag. A user with a tremor and a switch-access user cannot change status, so they email teammates to move cards for them.', 'Add a “Move to…” menu on each card and keyboard handling. Announce moves.'),
      F('The file uploader with a drop zone only', 'An upload page says “Drag files here”. There is no button, so screen reader and keyboard users cannot attach documents to a claim.', 'Always include a real “Choose files” button (a labelled file input).'),
      F('The playlist that lost focus', 'After reordering a playlist, the list re-renders and focus jumps to the top of the page. A keyboard user has to tab through everything again.', 'Re-focus the moved item by id after rendering.')
    ],
    checklist: {
      manual: ['Can you do everything the drag does with only a single click or tap?', 'Can you reorder using only the keyboard?', 'Does Esc cancel a pick-up?', 'Does focus stay on the item after a move?', 'Are drop zones visible without colour?'],
      tools: ['axe DevTools (roles, names, live regions)', 'Browser DevTools: check handlers and tabindex', 'Zoom and mobile emulation for target size'],
      sr: ['NVDA/JAWS: is the pick-up state announced?', 'VoiceOver: is the new position read after each move?', 'Is a final “dropped” message announced?']
    },
    audit: { title: 'Cards can only be reordered by dragging', criteria: '2.5.7 Dragging Movements · Level AA · also 2.1.1', severity: 'High', location: 'Project board', found: 'Cards respond to mouse drag only. No buttons, menu or keyboard alternative exists.', impact: 'Keyboard, switch, voice and many touch users cannot change task status.', recommendation: 'Add a “Move” menu or Up/Down buttons and keyboard handling; announce results.', code: '<!-- Fix: add a single-pointer alternative -->\n<li draggable="true">\n  Write tests\n  <button aria-label="Move Write tests up">↑</button>\n  <button aria-label="Move Write tests down">↓</button>\n</li>' },
    challenge: { title: 'Alternative or failure?', prompt: 'Is each design an acceptable alternative to dragging, or a failure?', buckets: ['Acceptable alternative', 'Not acceptable'], items: [
      { t: 'Up and Down buttons next to each list item.', a: 0 },
      { t: 'A “Move to…” menu on every card.', a: 0 },
      { t: 'A longer press that starts the drag.', a: 1 },
      { t: 'Hover over the card and use the mouse wheel.', a: 1 },
      { t: 'Click an item, then click the destination to drop.', a: 0 }
    ] },
    quiz: [
      Q('2.5.7 Dragging Movements is at level…', ['A', 'AA', 'AAA', 'It is not a criterion'], 1, 'New in 2.2 at AA.'),
      Q('Which is a valid single-pointer alternative?', ['A longer drag', 'Click to pick up, click to drop', 'Hover', 'Shake'], 1, 'Click-click works with a single pointer.'),
      Q('How should a keyboard drag be communicated?', ['Colour only', 'Live region announcements', 'Nothing', 'A tooltip'], 1, 'Polite live region.'),
      Q('A file uploader should always include…', ['Only a drop zone', 'A labelled Choose files button', 'Only a link', 'Animation'], 1, 'File input as a fallback.')
    ]
  });

  add('pointer', {
    patterns: {
      do: ['Make targets at least 24×24 CSS px (aim for 44×44).', 'Add button alternatives to swipe, pinch, and shake.', 'Fire actions on release and allow cancel.', 'Keep hover content dismissible, hoverable and persistent.', 'Handle pointer, touch and keyboard together.'],
      dont: ['Rely on path-based or multi-finger gestures only.', 'Trigger on mousedown/touchstart with no undo.', 'Pack tiny icon buttons next to each other.', 'Disable pinch zoom or sniff devices to turn inputs off.']
    },
    demo: '2.5.8',
    failures: [
      F('The map that only zoomed with pinch', 'A store locator allowed zoom by pinch or scroll wheel only. A user with limited hand function using a head pointer could not zoom in.', 'Add + and − buttons and keyboard shortcuts.'),
      F('Delete on touch-down', 'Tapping the trash icon deleted the item instantly. A user with a tremor deleted several items by brushing the screen.', 'Fire on release, allow cancel, and offer Undo.'),
      F('Tiny close buttons', 'A cookie banner has a 14px × close button with no spacing. Users with large fingers keep hitting “Accept all” next to it.', 'Use 24px minimum and spacing; 44px preferred.')
    ],
    checklist: {
      manual: ['Measure targets: at least 24×24 CSS px or spaced?', 'Every gesture has a one-tap alternative?', 'Press, drag away, release: does the action cancel?', 'Hover content: Esc dismisses, pointer can move onto it?', 'Shake/tilt has a button and an off switch?'],
      tools: ['DevTools element inspector (box size)', 'axe DevTools (target-size rule)', 'Device mode with touch emulation'],
      sr: ['VoiceOver iOS: swipe and double-tap still work on custom controls', 'TalkBack: gestures not overridden by the page']
    },
    audit: { title: 'Icon buttons are too small', criteria: '2.5.8 Target Size (Minimum) · Level AA', severity: 'Medium', location: 'Toolbar', found: 'Icon buttons measure 16×16 CSS px with 2px spacing.', impact: 'Users with tremors or large fingers mis-hit adjacent buttons.', recommendation: 'Increase to 24×24 minimum (44×44 preferred) with padding.', code: '.icon-btn {\n  min-width: 44px;\n  min-height: 44px;\n  padding: 10px;\n}' },
    challenge: { title: 'Which criterion?', prompt: 'Match each problem with the criterion it breaks.', buckets: ['Target size (2.5.8)', 'Pointer gestures (2.5.1)', 'Pointer cancellation (2.5.2)', 'Motion actuation (2.5.4)'], items: [
      { t: 'A 14px close button next to “Accept all”.', a: 0 },
      { t: 'Image gallery changes only by swiping.', a: 1 },
      { t: 'Delete fires on touchstart.', a: 2 },
      { t: 'Shake the phone to undo, with no Undo button.', a: 3 }
    ] },
    quiz: [
      Q('AA minimum target size?', ['16×16', '24×24 CSS px', '44×44', '10×10'], 1, '24 CSS px.'),
      Q('Which event allows users to cancel by moving away?', ['mousedown', 'click (up-event)', 'touchstart', 'mouseover'], 1, 'Completion on release.'),
      Q('A swipe-only carousel needs…', ['Faster swipe', 'Next/Previous buttons', 'Nothing', 'Shake'], 1, 'Single-pointer alternative.'),
      Q('Tooltips on hover must be…', ['Auto-hide in 1s', 'Dismissible, hoverable, persistent', 'Colour only', 'Mouse only'], 1, '1.4.13.')
    ]
  });

  add('keyboard', {
    patterns: {
      do: ['Use native links, buttons and form controls.', 'Provide a skip link as the first focusable element.', 'Keep DOM order, tab order and visual order aligned.', 'Show a strong two-tone focus ring; use scroll-padding for sticky UI.', 'Move focus into dialogs, return it on close, and focus new route headings.'],
      dont: ['Remove outline without a replacement.', 'Use positive tabindex values.', 'Trap focus without an exit.', 'Use single-letter shortcuts without a way to turn them off.']
    },
    demo: '2.4.11',
    failures: [
      F('The cookie banner that covered the form', 'A fixed bottom banner covered focused fields. Keyboard users tabbed into fields they could not see and filled the form blind.', 'Add scroll-padding-bottom, or avoid covering content while the banner is open.'),
      F('The dialog that kept focus behind it', 'A modal opened but focus stayed on the page behind it. Screen reader users kept reading the background content.', 'Use native <dialog>.showModal() or move focus in and return it on close.'),
      F('The editor that swallowed Tab', 'A code editor trapped Tab to indent. Keyboard users could not leave the field.', 'Provide an escape (Esc then Tab), and document it.')
    ],
    checklist: {
      manual: ['Unplug the mouse and complete the main task.', 'First Tab shows a skip link?', 'Focus order matches reading order?', 'Focus indicator visible on every control (also at 400% zoom)?', 'Any trap? Can you always leave with Tab or Esc?'],
      tools: ['axe DevTools (focus-order, tabindex rules)', 'Accessibility Insights FastPass tab stops view', 'Browser DevTools focus tracking: document.activeElement'],
      sr: ['NVDA/JAWS: focus enters and exits dialogs predictably?', 'VoiceOver: does route change announce the new page?']
    },
    audit: { title: 'Sticky header hides focused links', criteria: '2.4.11 Focus Not Obscured (Minimum) · Level AA', severity: 'High', location: 'All pages with long link lists', found: 'When tabbing down, focused links scroll behind the fixed header.', impact: 'Keyboard and low-vision zoom users lose track of where focus is.', recommendation: 'Add scroll-padding-top equal to the header height.', code: 'html { scroll-padding-top: 5rem; }\n.header { position: fixed; top: 0; height: 4rem; }' },
    challenge: { title: 'Fix or failure?', prompt: 'Is each practice acceptable, or a keyboard failure?', buckets: ['Good practice', 'Keyboard failure'], items: [
      { t: 'A skip link that becomes visible on focus.', a: 0 },
      { t: 'tabindex="5" to reorder the form fields.', a: 1 },
      { t: 'outline: none with no replacement style.', a: 1 },
      { t: 'Returning focus to the trigger when a dialog closes.', a: 0 },
      { t: 'A modal dialog with a Close button and Esc handling.', a: 0 }
    ] },
    quiz: [
      Q('Safe tabindex values are…', ['0 and -1', 'Any positive number', '10', '100'], 0, 'Avoid positive values.'),
      Q('When a dialog closes, focus should…', ['Go to the footer', 'Return to the trigger', 'Be lost', 'Go to the logo'], 1, 'Return to the opener.'),
      Q('CSS that stops sticky headers hiding focus?', ['scroll-padding-top', 'z-index', 'float', 'visibility'], 0, 'scroll-padding.'),
      Q('A composite widget (tabs, toolbar) should be…', ['Many tab stops', 'One tab stop with arrow keys', 'Mouse-only', 'Hidden'], 1, 'Roving tabindex.')
    ]
  });

  add('voice', {
    patterns: {
      do: ['Make the accessible name contain the visible label text.', 'Use native buttons and links so voice tools find them.', 'Give every field a visible label.', 'Require a modifier for keyboard shortcuts, or allow remapping.', 'Use unique link text so “click …” is unambiguous.'],
      dont: ['Replace visible text with a different aria-label.', 'Use click handlers on divs with no role.', 'Repeat identical labels on different controls.', 'Use single-letter shortcuts with no off switch.']
    },
    demo: '2.5.3',
    failures: [
      F('“Click Search” did nothing', 'A search button said “Search” but had aria-label=“Find items”. A Dragon user said “click Search” repeatedly and nothing happened.', 'Make the accessible name start with the visible text, or remove aria-label.'),
      F('Dictation fired the shortcuts', 'A web mail app used single-letter shortcuts. A voice-typing user composing a message triggered delete and archive.', 'Require a modifier, or add a setting to disable single-key shortcuts.'),
      F('Ten “Read more” links', 'A news list had ten identical “Read more” links. Voice users saying “click Read more” got a disambiguation overlay every time.', 'Make link text unique, or include the headline in the name.')
    ],
    checklist: {
      manual: ['Say each visible label: does it activate the control?', 'Show numbers/names (Voice Control, Voice Access): is everything clickable covered?', 'Dictate into fields: do shortcuts fire?', 'Are labels unique and visible?'],
      tools: ['axe DevTools (label-content-name-mismatch)', 'DevTools Accessibility pane: computed name', 'macOS/iOS Voice Control, Windows Voice Access, Dragon'],
      sr: ['Compare what the screen reader announces to what is visible', 'Ensure custom controls expose role + name']
    },
    audit: { title: 'Accessible name does not contain visible label', criteria: '2.5.3 Label in Name · Level A (F96)', severity: 'High', location: 'Header search button', found: 'Visible text “Search”; accessible name “Find items”.', impact: 'Voice-control users cannot activate the button by saying what they see.', recommendation: 'Remove aria-label or make it start with “Search”.', code: '<!-- Before -->\n<button aria-label="Find items">Search</button>\n<!-- After -->\n<button>Search</button>' },
    challenge: { title: 'Will voice control work?', prompt: 'A user says “click <visible label>”. Does the control respond?', buckets: ['Works', 'Fails'], items: [
      { t: '<button>Search</button>', a: 0 },
      { t: '<button aria-label="Find items">Search</button>', a: 1 },
      { t: '<button aria-label="Search the catalogue">Search</button>', a: 0 },
      { t: '<div onclick="go()">Checkout</div>', a: 1 }
    ] },
    quiz: [
      Q('2.5.3 Label in Name is at level…', ['A', 'AA', 'AAA', 'None'], 0, 'Level A.'),
      Q('Best way to name a button?', ['aria-label that differs from text', 'Visible text', 'title only', 'An image'], 1, 'Visible text as name.'),
      Q('Dictation is a risk for…', ['Single-key shortcuts', 'Modifier shortcuts', 'Headings', 'Images'], 0, '2.1.4.'),
      Q('“Show numbers” helps users…', ['See contrast', 'Click unnamed controls by number', 'Zoom', 'Hear captions'], 1, 'Numbered overlay.')
    ]
  });

  A.data.paths.beginner.push('dragdrop-why-alternatives', 'pointer-target-size', 'keyboard-skip-links', 'voice-label-in-name');
})(window.A11Y = window.A11Y || {});
