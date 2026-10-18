/* Phase 4 lessons: Overlays, Navigation, Widgets, Data-rich, Rich content (Beginner → Pro+). */
(function (A) {
  'use strict';
  const L = (id, topic, level, minutes, criteria, title, summary, body, quiz) =>
    A.data.lessons.push({ id, topic, level, minutes, criteria, title, summary, demo: null, body, quiz: quiz.map(([q, options, answer, why]) => ({ q, options, answer, why })) });
  const ul = a => '<ul>' + a.map(x => `<li>${x}</li>`).join('') + '</ul>';
  const lesson = (id, topic, level, min, crit, title, summary, intro, points, quiz) =>
    L(id, topic, level, min, crit, title, summary, `<p>${intro}</p><h2>Key points</h2>${ul(points)}`, quiz);

  /* Overlays */
  lesson('overlays-native-dialog', 'overlays', 'beginner', 5, ['4.1.2', '2.1.2'], 'Use the native dialog', 'Native <dialog> gives you focus handling for free.',
    'A modal must move focus in, keep it there, close with Esc and return focus. The native dialog element does most of it.',
    ['Open with <code>dialog.showModal()</code>; the page behind becomes inert.', 'Label with <code>aria-labelledby</code> pointing at its heading.', 'Always include a visible Close button.', 'Return focus to the trigger on close (native does this).'],
    [['Which method opens a modal dialog?', ['show()', 'showModal()', 'open()', 'display()'], 1, 'showModal().'], ['A dialog needs…', ['A name', 'Nothing', 'Hover', 'Autoplay'], 0, 'An accessible name.']]);
  lesson('overlays-toggletips', 'overlays', 'intermediate', 6, ['1.4.13', '4.1.3'], 'Tooltips vs toggletips', 'Help that works for keyboard, touch and screen readers.',
    'A tooltip describes a control on hover or focus; a toggletip is opened by a button and holds longer help text.',
    ['Tooltips: dismissible with Esc, hoverable and persistent (1.4.13).', 'Toggletip: a button opens text announced in a live region.', 'Never put essential information only in a <code>title</code> attribute.', 'Keep the content short and avoid interactive content in tooltips.'],
    [['Which attribute should not carry essential help?', ['title', 'aria-label', 'alt', 'lang'], 0, 'title is unreliable.'], ['A toggletip opens with…', ['Hover only', 'A button press', 'A timer', 'Scroll'], 1, 'A button.']]);
  lesson('overlays-consent-banners', 'overlays', 'advanced', 8, ['2.4.3', '2.4.11', '3.3.2'], 'Cookie banners and consent managers', 'Reachable, not obscuring, and equal choices.',
    'Consent UIs affect every first-time visitor, so a failure blocks the whole site.',
    ['Place the banner early in the DOM or move focus to it.', 'Reject and Accept must be equally easy, with real buttons.', 'Do not cover focused elements; use scroll-padding.', 'Remember the choice and make preferences reachable from the footer.'],
    [['Reject and Accept should be…', ['Equally prominent buttons', 'Hidden', 'Colour only', 'Timed'], 0, 'Equal effort.'], ['Banners must not…', ['Be keyboard reachable', 'Obscure focus', 'Have labels', 'Use buttons'], 1, '2.4.11.']]);
  lesson('overlays-stacked-pro', 'overlays', 'pro', 9, ['2.4.3', '2.1.2', '4.1.3'], 'Stacked overlays and focus restoration', 'Dialogs on dialogs, drawers and popover API.',
    'Complex flows open overlays from overlays. Each layer needs its own focus return path.',
    ['Track a stack of triggers so closing one returns focus to the right opener.', 'Only the top layer is interactive; the rest stay inert.', 'The Popover API supports light-dismiss for non-modal popovers.', 'Test with zoom and a sticky header to avoid obscured focus.'],
    [['Closing a nested dialog should return focus to…', ['The page top', 'Its own trigger', 'The footer', 'Nowhere'], 1, 'The element that opened it.'], ['Only the … layer is interactive.', ['Bottom', 'Top', 'Middle', 'All'], 1, 'Top.']]);

  /* Navigation */
  lesson('navigation-landmarks-current', 'navigation', 'beginner', 5, ['2.4.1', '2.4.8'], 'Navs, landmarks and current page', 'Label navigations and mark where you are.',
    'Users jump between landmarks. Label each nav and mark the current page.',
    ['Wrap site menus in <code>&lt;nav aria-label="Main"&gt;</code>.', 'Use <code>aria-current="page"</code> on the active link.', 'Provide a visible skip link.', 'Breadcrumbs: an ordered list in a labelled nav.'],
    [['Which attribute marks the current page?', ['aria-current', 'aria-live', 'role', 'tabindex'], 0, 'aria-current.'], ['Two navs on a page need…', ['Unique labels', 'No labels', 'Same label', 'Divs'], 0, 'Distinct names.']]);
  lesson('navigation-disclosure-menus', 'navigation', 'intermediate', 7, ['2.1.1', '4.1.2'], 'Disclosure menus, not role="menu"', 'Buttons that expand lists of links.',
    'Site navigation is a list of links. The simplest accessible pattern is a disclosure.',
    ['A <code>button</code> with <code>aria-expanded</code> and <code>aria-controls</code>.', 'Enter/Space toggles; Esc closes and returns focus to the button.', 'Avoid <code>role="menu"</code> for site navigation; it changes keyboard behaviour.', 'Mega menus must be reachable without hover.'],
    [['Site navigation is best built as…', ['role="menu"', 'A disclosure of links', 'Canvas', 'Image map'], 1, 'Disclosure.'], ['Esc in an open menu should…', ['Do nothing', 'Close and return focus', 'Reload', 'Mute'], 1, 'Close it.']]);
  lesson('navigation-tabs-accordions', 'navigation', 'advanced', 8, ['2.1.1', '4.1.2'], 'Tabs and accordions', 'Two patterns, two keyboard models.',
    'Tabs move with arrows inside a single tab stop; accordions are plain buttons that expand.',
    ['Tabs: <code>tablist</code>, <code>tab</code>, <code>tabpanel</code>, roving tabindex.', 'Accordion: button inside a heading with <code>aria-expanded</code>.', 'Do not mix the two models.', 'Only hide content that is truly hidden: use <code>hidden</code>.'],
    [['Tabs use…', ['Roving tabindex', 'Many tab stops', 'Hover', 'Colour'], 0, 'One tab stop.'], ['An accordion header is a…', ['Button in a heading', 'Div', 'Span', 'Image'], 0, 'Button.']]);
  lesson('navigation-pagination-spa-pro', 'navigation', 'pro', 8, ['2.4.3', '3.2.3', '3.2.4'], 'Pagination, consistent navigation and SPAs', 'Predictable across pages and routes.',
    'Consistent navigation order and identification (3.2.3, 3.2.4) matter more as products grow.',
    ['Keep menu order and labels the same across pages.', 'Pagination: a labelled nav with current page marked.', 'On route change, move focus to the new heading and update the title.', 'Announce loading states politely.'],
    [['On an SPA route change, focus should…', ['Stay put', 'Move to the new heading', 'Vanish', 'Go to footer'], 1, 'New heading.'], ['3.2.3 requires…', ['Consistent navigation', 'Captions', 'Contrast', 'Alt text'], 0, 'Consistent order.']]);

  /* Widgets */
  lesson('widgets-native-first', 'widgets', 'beginner', 5, ['1.3.1', '4.1.2'], 'Native first', 'A native control beats a custom one.',
    'select, radio, checkbox, range and date inputs bring roles, keyboard support and mobile pickers.',
    ['Use <code>select</code> for long lists, radio group for few options.', 'Style native controls rather than replacing them.', 'Always pair with a visible label.', 'Only build custom when native cannot do the job.'],
    [['Which is best for choosing one of three options?', ['Radio group', 'Div buttons', 'Canvas', 'Image'], 0, 'Radios.'], ['Custom controls should be…', ['First choice', 'Last resort', 'Required', 'Hidden'], 1, 'Native first.']]);
  lesson('widgets-switch-slider', 'widgets', 'intermediate', 7, ['1.4.1', '4.1.2', '2.5.7'], 'Switches, sliders and steppers', 'State, value and a non-drag way to change it.',
    'A switch is a button with role switch; a slider needs a value and a non-drag path.',
    ['Switch: <code>role="switch"</code>, <code>aria-checked</code>, text state.', 'Slider: native <code>input type="range"</code> plus a number field.', 'Stepper: minus/plus buttons with labels and a live value.', 'Never use colour alone to show state.'],
    [['A slider needs…', ['Drag only', 'A non-drag alternative', 'Colour', 'Hover'], 1, '2.5.7.'], ['Switch state attribute?', ['aria-checked', 'aria-label', 'title', 'alt'], 0, 'aria-checked.']]);
  lesson('widgets-combobox', 'widgets', 'advanced', 9, ['1.3.5', '3.3.2', '4.1.2'], 'Combobox and autocomplete', 'Input plus a popup list.',
    'The combobox pattern pairs a text input with a listbox. Focus stays in the input; the active option is referenced.',
    ['<code>role="combobox"</code>, <code>aria-expanded</code>, <code>aria-controls</code>, <code>aria-activedescendant</code>.', 'Arrow keys move through options; Enter selects; Esc closes.', 'Announce the number of results in a live region.', 'Add autocomplete tokens for personal data fields (1.3.5).'],
    [['Where does focus stay in a combobox?', ['The list', 'The input', 'The footer', 'Nowhere'], 1, 'The input.'], ['Active option is exposed via…', ['aria-activedescendant', 'tabindex', 'alt', 'lang'], 0, 'activedescendant.']]);
  lesson('widgets-otp-rating-pro', 'widgets', 'pro', 8, ['3.3.8', '2.5.8', '1.3.5'], 'OTP, passcodes and ratings', 'Authentication and rating without barriers.',
    'Accessible Authentication (3.3.8) forbids cognitive tests; passcode UIs must allow paste.',
    ['Allow paste and password managers (<code>autocomplete="one-time-code"</code>).', 'One input is safer than six auto-advancing boxes.', 'Ratings: radio group with a visible label and text value.', 'Targets at least 24px (2.5.8).'],
    [['3.3.8 is about…', ['Accessible authentication', 'Captions', 'Contrast', 'Motion'], 0, 'Authentication.'], ['Passcode fields must allow…', ['Paste', 'No input', 'Hover', 'Timers'], 0, 'Paste.']]);

  /* Data-rich */
  lesson('datarich-real-tables', 'data-rich', 'beginner', 5, ['1.3.1'], 'Real tables', 'Caption, th, scope.',
    'Data tables should be marked up so headers are announced with each cell.',
    ['Use <code>&lt;table&gt;</code> with a <code>&lt;caption&gt;</code>.', '<code>th scope="col"</code> and <code>th scope="row"</code>.', 'Never use tables for layout.', 'Keep tables simple; split complex ones.'],
    [['Header cells use…', ['td', 'th', 'span', 'li'], 1, 'th.'], ['A table caption provides…', ['A name', 'Colour', 'Sound', 'Links'], 0, 'An accessible name.']]);
  lesson('datarich-sort-filter', 'data-rich', 'intermediate', 7, ['1.3.1', '4.1.3'], 'Sorting, filtering and live updates', 'Tell users what changed.',
    'Silent changes leave screen reader users guessing.',
    ['Sort buttons inside <code>th</code> with <code>aria-sort</code>.', 'Announce “Sorted by Price, ascending” in a polite live region.', 'Filters: announce result counts.', 'Keep focus on the control that triggered the change.'],
    [['aria-sort is set on…', ['th', 'td', 'tr', 'body'], 0, 'The header.'], ['Result counts should be…', ['Announced', 'Silent', 'Red', 'Hidden'], 0, 'Announce.']]);
  lesson('datarich-reflow-scroll', 'data-rich', 'advanced', 8, ['1.4.10', '1.3.2', '2.2.2'], 'Reflow, scroll regions and infinite scroll', 'Wide data at 400% zoom.',
    'Tables can scroll inside their own region at 320px, but infinite scroll hides the footer.',
    ['Wrap wide tables in a focusable scroll region with a label.', 'Provide “Load more” instead of infinite scroll.', 'Pause auto-updating tickers (2.2.2).', 'Keep reading order in the DOM equal to visual order (1.3.2).'],
    [['Wide tables should…', ['Break the page', 'Scroll in their own region', 'Be cropped', 'Be images'], 1, '1.4.10.'], ['Infinite scroll needs…', ['A Load more option', 'More speed', 'No footer', 'Colour'], 0, 'User control.']]);
  lesson('datarich-grids-trees-pro', 'data-rich', 'pro', 10, ['2.1.1', '4.1.2'], 'Grids, trees and Kanban', 'Composite widgets with real keyboard models.',
    'Interactive grids and trees need roles, a single tab stop and arrow-key navigation.',
    ['Grid: role grid/row/gridcell; arrows move; Enter edits.', 'Tree: aria-expanded on nodes; Right expands, Left collapses.', 'Kanban: see the Drag-and-Drop Lab for move patterns.', 'Prefer a plain table with buttons if cells are not editable.'],
    [['A tree node exposes state with…', ['aria-expanded', 'alt', 'lang', 'title'], 0, 'aria-expanded.'], ['If cells are not editable, prefer…', ['A plain table', 'A grid', 'Canvas', 'Image'], 0, 'Simpler is better.']]);

  /* Rich content */
  lesson('richcontent-uploads', 'rich-content', 'beginner', 5, ['2.1.1', '3.3.2'], 'Accessible file upload', 'A button first, a drop zone second.',
    'Drop zones help some users but exclude others when they are the only option.',
    ['Always include a labelled file input.', 'State accepted types and size before selection.', 'Announce the chosen file name in a status region.', 'Allow removing or replacing a file with a button.'],
    [['An uploader must have…', ['A real file input', 'Only a drop zone', 'Only a link', 'Animation'], 0, 'File input.'], ['After selecting a file…', ['Say nothing', 'Announce the name', 'Hide it', 'Reload'], 1, 'Status message.']]);
  lesson('richcontent-editors', 'rich-content', 'intermediate', 8, ['2.1.2', '4.1.2'], 'Rich text editors and toolbars', 'Toolbars, names and escaping.',
    'Editors combine a toolbar and an editable region. Both need keyboard access.',
    ['Toolbar: <code>role="toolbar"</code> with a label and roving tabindex.', 'Toggle buttons use <code>aria-pressed</code>.', 'If Tab is captured, document and provide Esc then Tab.', 'Give the editable region a label and role textbox.'],
    [['Toggle buttons expose state via…', ['aria-pressed', 'alt', 'title', 'lang'], 0, 'aria-pressed.'], ['An editor capturing Tab needs…', ['An escape', 'Nothing', 'Colour', 'Mouse'], 0, 'An escape.']]);
  lesson('richcontent-ai-chat', 'rich-content', 'advanced', 8, ['4.1.3', '3.3.2', '2.2.2'], 'AI chat and streaming content', 'Announce once, not per token.',
    'Streaming text can flood screen readers. Announce on completion and keep controls reachable.',
    ['Show a visible and announced “Generating…” status.', 'Announce the full response (or a summary) once complete.', 'Stop, retry and copy buttons need names and keyboard access.', 'Do not auto-scroll in a way that steals focus.'],
    [['Streamed tokens should be announced…', ['Each one', 'Once complete', 'Never', 'Randomly'], 1, 'Avoid babble.'], ['Stop generating must be…', ['Mouse only', 'Keyboard reachable', 'Hidden', 'Timed'], 1, 'Keyboard operable.']]);
  lesson('richcontent-croppers-pro', 'rich-content', 'pro', 9, ['2.5.7', '2.1.1', '4.1.3'], 'Croppers, comments and collaboration', 'Non-drag editing and threaded content.',
    'Complex editors need alternatives to drag and clear structure for threads.',
    ['Crop: numeric fields or arrow-key resizing instead of drag handles.', 'Comments: headings per thread, unique reply button names.', 'Announce new collaborator edits politely, not assertively.', 'Provide undo for destructive changes.'],
    [['A crop alternative to dragging?', ['Numeric inputs', 'Longer drag', 'Hover', 'Shake'], 0, 'Single-pointer alternative.'], ['Reply buttons should have…', ['Unique names', 'Same name', 'No name', 'Colour'], 0, 'Unique names.']]);

})(window.A11Y = window.A11Y || {});
