/* Phase 3 lessons: Drag-and-drop, Pointer/touch, Keyboard/focus and Voice hubs (Beginner → Pro+). */
(function (A) {
  'use strict';
  const L = (id, topic, level, minutes, criteria, title, summary, demo, body, quiz) =>
    A.data.lessons.push({ id, topic, level, minutes, criteria, title, summary, demo, body, quiz: quiz.map(([q, options, answer, why]) => ({ q, options, answer, why })) });

  /* ================= Drag and drop ================= */
  L('dragdrop-why-alternatives', 'drag-drop', 'beginner', 5, ['2.5.7', '2.1.1'], 'Dragging needs an alternative',
    'Anything you can drag must also be possible with a single click or the keyboard.', '2.5.7',
    `<p>Dragging is hard or impossible for people with tremors, switch devices, eye-gaze, voice control, one-handed use, or a screen reader. WCAG 2.2 adds <strong>2.5.7 Dragging Movements</strong> (AA): offer a single-pointer alternative.</p>
     <h2>Easy alternatives</h2>
     <ul><li>“Move up / Move down” buttons beside sortable list items.</li>
     <li>A “Move to…” menu on each card.</li>
     <li>Click to pick up, click a target to drop.</li></ul>
     <div class="callout"><strong>Rule:</strong> if you can only do it by holding and moving, it fails.</div>`,
    [['2.5.7 requires…', ['No dragging at all', 'A single-pointer alternative to dragging', 'Only touch support', 'Animation'], 1, 'An alternative that needs no drag.'],
     ['A good alternative to dragging a list item?', ['A longer drag', 'Move up/down buttons', 'Hover', 'Double-tap'], 1, 'Buttons are simple.']]);

  L('dragdrop-keyboard-pattern', 'drag-drop', 'intermediate', 8, ['2.1.1', '4.1.2', '4.1.3'], 'Keyboard sorting with announcements',
    'Space to grab, arrows to move, Space to drop, Esc to cancel — and say it out loud.', null,
    `<p>A keyboard drag pattern needs four things: a focusable handle, clear keys, live announcements and a way out.</p>
     <h2>The pattern</h2>
     <ol><li><strong>Space/Enter</strong> grabs the item (<code>aria-pressed</code> or <code>aria-grabbed</code>-free state text).</li>
     <li><strong>Arrow keys</strong> move it; each move updates a polite live region: “Task B, position 2 of 4”.</li>
     <li><strong>Space</strong> drops, <strong>Esc</strong> cancels and returns it.</li>
     <li>Focus stays on the moved item after every step.</li></ol>
     <div class="callout"><strong>Tip:</strong> <code>aria-grabbed</code> and <code>aria-dropeffect</code> are deprecated — announce with live regions instead.</div>`,
    [['Which key usually cancels a keyboard drag?', ['Tab', 'Esc', 'Enter', 'Shift'], 1, 'Esc.'],
     ['How should moves be communicated?', ['Colour only', 'A polite live region message', 'A tooltip', 'Nothing'], 1, 'Screen readers need to hear position changes.']]);

  L('dragdrop-touch-targets', 'drag-drop', 'advanced', 8, ['2.5.7', '2.5.8', '2.5.1'], 'Handles, targets and drop zones',
    'Make handles big, drop zones forgiving and cancellation easy.', null,
    `<p>Even with alternatives, the drag itself should be usable.</p>
     <h2>Design for imprecision</h2>
     <ul><li>Handles at least 24px (aim for 44px) with spacing.</li>
     <li>Large drop zones with visible highlight, not thin lines.</li>
     <li>Complete on pointer <em>up</em>; dropping outside a zone cancels (2.5.2).</li>
     <li>Don't rely on hover or long-press alone: iOS and Android already use long-press.</li></ul>
     <h2>Undo</h2><p>Offer Undo after an accidental drop. It is kinder than a confirmation dialog.</p>`,
    [['Drops should complete on…', ['Pointer down', 'Pointer up, with cancel possible', 'Hover', 'Focus'], 1, 'Up-event with cancel.'],
     ['A handle that is 12px wide is…', ['Fine', 'Too small (aim ≥24px, ideally 44px)', 'Required', 'Ideal'], 1, '2.5.8.']]);

  L('dragdrop-kanban-pro', 'drag-drop', 'pro', 10, ['2.5.7', '4.1.3', '2.4.3'], 'Kanban boards for everyone',
    'Cross-list moves, focus recovery and a mode switch for assistive tech.', null,
    `<p>Boards combine every hard problem: multiple lists, large item counts and re-rendering.</p>
     <h2>Production checklist</h2>
     <ul><li>Every card has a “Move” menu listing destination columns and positions.</li>
     <li>After a move, keep focus on the card (re-find it by id if the DOM re-renders).</li>
     <li>Announce: “Moved ‘Write tests’ to Done, position 1 of 3.”</li>
     <li>Support pointer, keyboard and menu equally — never test only one.</li>
     <li>Respect <code>prefers-reduced-motion</code> for drop animations.</li></ul>
     <div class="callout"><strong>Try it:</strong> the Drag-and-Drop Lab lets you compare mouse, keyboard and screen-reader modes.</div>`,
    [['After a card is moved and the board re-renders…', ['Focus can reset to the page top', 'Focus should stay on the moved card', 'Nothing matters', 'Focus should go to the footer'], 1, 'Preserve context.'],
     ['A move menu is useful because…', ['It looks nice', 'It needs no drag or gesture', 'It is faster for everyone', 'It is required in AAA only'], 1, 'Single-pointer alternative.']]);

  /* ================= Pointer, touch and gestures ================= */
  L('pointer-target-size', 'pointer', 'beginner', 5, ['2.5.8', '2.5.5'], 'Big enough to tap',
    'At least 24×24 CSS px (AA), ideally 44×44.', '2.5.8',
    `<p>Small targets cause mis-taps for people with tremors, large fingers, or anyone using a phone on a bus.</p>
     <h2>Sizes</h2>
     <ul><li><strong>AA (2.5.8):</strong> 24×24 CSS px, or enough spacing so a 24px circle around it doesn't overlap another target.</li>
     <li><strong>AAA (2.5.5):</strong> 44×44 CSS px.</li></ul>
     <p>Increase hit area with padding or <code>min-width/min-height</code> instead of enlarging the icon.</p>
     <div class="callout"><strong>Exceptions:</strong> inline text links, native controls the browser sizes, and essential cases.</div>`,
    [['AA minimum target size?', ['10px', '24×24 CSS px', '44×44', '100px'], 1, '24 CSS px.'],
     ['Which grows hit area without growing the icon?', ['Padding', 'Colour', 'Shadow', 'Opacity'], 0, 'Padding or min sizes.']]);

  L('pointer-gestures-alternatives', 'pointer', 'intermediate', 7, ['2.5.1', '2.5.4'], 'Gestures need simple alternatives',
    'Swipe, pinch, shake and tilt all need a button.', '2.5.1',
    `<p>Complex gestures exclude people who use a mouth stick, head pointer, switch or voice control.</p>
     <h2>Replace or supplement</h2>
     <ul><li>Swipe carousel → Previous / Next buttons.</li>
     <li>Pinch zoom → + / − buttons.</li>
     <li>Shake to undo → Undo button, plus a setting to disable motion.</li>
     <li>Draw a path to unlock → numeric or tap alternative.</li></ul>
     <p>Essential path-based interaction (like a signature) is the only exception.</p>`,
    [['Which is a single-pointer alternative to pinch-zoom?', ['Three-finger pinch', '+ and − buttons', 'Shake', 'Rotate'], 1, 'Buttons.'],
     ['Motion actuation must also…', ['Be mandatory', 'Be possible to disable', 'Use sound', 'Be hidden'], 1, 'Opt-out.']]);

  L('pointer-cancel-up-event', 'pointer', 'advanced', 7, ['2.5.2', '1.4.13'], 'Down-events, hover and content on hover',
    'Fire on release, keep tooltips dismissible, hoverable and persistent.', '2.5.2',
    `<p><strong>2.5.2</strong>: don't commit on <code>mousedown</code>/<code>touchstart</code>. Native <code>click</code> fires on release and lets users slide away to cancel.</p>
     <h2>Content on hover or focus (1.4.13)</h2>
     <ul><li><strong>Dismissible</strong> with Esc without moving the pointer.</li>
     <li><strong>Hoverable</strong>: the pointer can move onto the tooltip.</li>
     <li><strong>Persistent</strong> until dismissed, hover leaves, or content is no longer valid.</li></ul>`,
    [['Which event is safest for an action?', ['mousedown', 'click', 'mouseover', 'touchmove'], 1, 'click, on release.'],
     ['A tooltip must be…', ['Impossible to dismiss', 'Dismissible with Esc', 'Hover-only', 'Auto-hiding in 1s'], 1, 'Dismissible, hoverable, persistent.']]);

  L('pointer-pointer-events-pro', 'pointer', 'pro', 9, ['2.5.1', '2.5.2', '2.5.6'], 'Pointer Events and input-agnostic design',
    'Use pointer events, touch-action and never sniff the device.', null,
    `<p>Pointer Events unify mouse, touch and pen. Combine them with keyboard handlers and you support every modality at once (2.5.6).</p>
     <h2>Patterns</h2>
     <ul><li><code>pointerdown</code> to start tracking, <code>pointerup</code> to commit, <code>pointercancel</code> to roll back.</li>
     <li><code>touch-action</code> controls browser panning/zooming — don't disable pinch-zoom globally.</li>
     <li>Never use <code>'ontouchstart' in window</code> to disable mouse or keyboard.</li>
     <li>Test: touch, mouse, keyboard and voice in one session.</li></ul>`,
    [['Which event lets you roll back an interrupted gesture?', ['pointercancel', 'hover', 'focus', 'resize'], 0, 'pointercancel.'],
     ['Device sniffing to turn off mouse input is…', ['Recommended', 'An anti-pattern (breaks hybrid users)', 'Required', 'Harmless'], 1, 'Support all inputs.']]);

  /* ================= Keyboard and focus ================= */
  L('keyboard-skip-links', 'keyboard', 'beginner', 5, ['2.4.1', '2.4.3'], 'Skip links and tab order',
    'Let keyboard users jump past repeated navigation, and keep tab order logical.', '2.4.1',
    `<p>Without a skip link, a keyboard user may press Tab thirty times on every page.</p>
     <h2>Do</h2>
     <ul><li>Make “Skip to main content” the first focusable element, visible on focus.</li>
     <li>Target an element with <code>id</code> (use <code>tabindex="-1"</code> on <code>&lt;main&gt;</code> so focus actually moves).</li>
     <li>Keep DOM order identical to visual order.</li>
     <li>Never use positive <code>tabindex</code> values.</li></ul>`,
    [['A skip link should be…', ['Hidden from keyboard', 'The first focusable element', 'In the footer', 'Mouse-only'], 1, 'First focusable.'],
     ['Which tabindex values are safe?', ['0 and -1', 'Any positive number', '5', '99'], 0, '0 and -1 only.']]);

  L('keyboard-focus-obscured-visible', 'keyboard', 'intermediate', 7, ['2.4.7', '2.4.11', '2.4.13'], 'Focus indicators that survive sticky UI',
    'Make focus visible, strong, and never hidden behind headers or banners.', '2.4.11',
    `<p>WCAG 2.2 adds <strong>2.4.11 Focus Not Obscured (Minimum)</strong> at AA, and 2.4.13 Focus Appearance at AAA.</p>
     <h2>Fixes</h2>
     <ul><li><code>html { scroll-padding-top: 5rem; }</code> keeps focused items below sticky headers.</li>
     <li>Two-tone focus ring (dark + light) works on any background.</li>
     <li>Don't use <code>outline: none</code> without a replacement.</li>
     <li>Test at 200% and 400% zoom.</li></ul>`,
    [['CSS that helps keep focus visible below a sticky header?', ['scroll-padding-top', 'overflow:hidden', 'z-index', 'float'], 0, 'scroll-padding-top.'],
     ['outline:none without replacement…', ['Is fine', 'Fails 2.4.7', 'Is required', 'Boosts speed'], 1, 'No visible focus.']]);

  L('keyboard-focus-management', 'keyboard', 'advanced', 9, ['2.4.3', '2.1.2', '4.1.2'], 'Managing focus in dialogs and SPAs',
    'Move focus in, trap it kindly, return it, and handle route changes.', null,
    `<p>Focus is a promise: after any change, the user should be able to continue from a sensible place.</p>
     <h2>Rules</h2>
     <ul><li><strong>Dialog opens:</strong> focus moves inside (first control or the heading). Use native <code>&lt;dialog&gt;.showModal()</code> where you can.</li>
     <li><strong>Dialog closes:</strong> return focus to the trigger.</li>
     <li><strong>Route change in an SPA:</strong> move focus to the new h1 and announce the page.</li>
     <li><strong>Deleted item:</strong> move focus to the next item or a heading, not nowhere.</li></ul>
     <div class="callout"><strong>Trap vs. contain:</strong> modals contain focus on purpose, but Esc or a Close button must always release it (2.1.2).</div>`,
    [['When a dialog closes, focus should…', ['Go to the footer', 'Return to the trigger', 'Disappear', 'Go to the logo'], 1, 'Return to trigger.'],
     ['After an SPA route change, a good move is…', ['Leave focus on the old link', 'Move focus to the new heading', 'Reload', 'Nothing'], 1, 'Focus the new h1.']]);

  L('keyboard-roving-widgets', 'keyboard', 'pro', 10, ['2.1.1', '2.1.4', '4.1.2'], 'Roving tabindex and composite widgets',
    'One tab stop, arrow keys inside: tabs, menus, grids and toolbars.', null,
    `<p>Composite widgets (tabs, toolbars, menus, grids) should be <strong>one</strong> tab stop, with arrow keys moving inside.</p>
     <h2>Two patterns</h2>
     <ul><li><strong>Roving tabindex:</strong> the active item has <code>tabindex="0"</code>, the rest <code>-1</code>; arrows swap them and call <code>focus()</code>.</li>
     <li><strong>aria-activedescendant:</strong> focus stays on the container; the attribute points to the active child (used by comboboxes, listboxes).</li></ul>
     <h2>Shortcuts</h2><p>Single-character shortcuts must be remappable, disabled, or active only on focus (2.1.4). Document keys with <code>aria-keyshortcuts</code>.</p>`,
    [['In roving tabindex, inactive items have…', ['tabindex="-1"', 'tabindex="5"', 'no role', 'display:none'], 0, 'tabindex -1.'],
     ['A composite widget should present…', ['Many tab stops', 'One tab stop', 'No keyboard', 'Only mouse'], 1, 'One tab stop.']]);

  /* ================= Voice control ================= */
  L('voice-label-in-name', 'voice', 'beginner', 5, ['2.5.3', '4.1.2'], 'Say what you see',
    'The accessible name must contain the visible label.', '2.5.3',
    `<p>Voice-control users (Dragon, Windows Voice Access, Apple Voice Control) say <em>“click Search”</em>. If the accessible name is “Find items”, the command fails.</p>
     <h2>Best practice</h2>
     <ul><li>Use the visible text as the accessible name: <code>&lt;button&gt;Search&lt;/button&gt;</code>.</li>
     <li>If you need more, start with the visible words: <code>aria-label="Search the catalogue"</code>.</li>
     <li>Icon-only buttons need clear, short names users would say.</li></ul>`,
    [['A voice user says “click Search”. Which name works?', ['Find items', 'Search the catalogue', 'Go', 'Submit query'], 1, 'Contains “Search”.'],
     ['Safest practice?', ['Replace visible text with aria-label', 'Let visible text be the name', 'Hide labels', 'Use title'], 1, 'Visible text as the name.']]);

  L('voice-shortcuts-dictation', 'voice', 'intermediate', 6, ['2.1.4', '3.3.2'], 'Dictation, shortcuts and labels',
    'Single-letter shortcuts and speech do not mix.', '2.1.4',
    `<p>Dictation can turn spoken words into single key events. A site with an “s” shortcut might trigger search while someone dictates an email.</p>
     <h2>Do</h2>
     <ul><li>Use modifier keys, or only active shortcuts when the component has focus.</li>
     <li>Let users turn shortcuts off or remap them.</li>
     <li>Give every field a visible, persistent label so users can say “click Email”.</li>
     <li>Avoid labels that repeat (“Name”, “Name”) — voice users can't tell them apart.</li></ul>`,
    [['A speech-safe shortcut?', ['“s”', 'Alt+S', 'Hover', 'Any letter'], 1, 'Modifier required.'],
     ['Duplicate visible labels cause…', ['Colour issues', 'Ambiguous voice commands', 'Nothing', 'Faster speech'], 1, 'Voice users cannot target a specific field.']]);

  L('voice-overlays-grids', 'voice', 'advanced', 8, ['2.5.3', '2.4.4', '4.1.2'], 'Numbers, grids and custom controls',
    'Make everything addressable by name or by number overlay.', null,
    `<p>When names are hard, voice tools show numbered overlays on clickable things. They find controls by role, so <strong>real roles matter</strong>.</p>
     <h2>Do</h2>
     <ul><li>Use native links and buttons. Click handlers on <code>&lt;div&gt;</code> may get no number.</li>
     <li>Give custom controls the right <code>role</code> and name.</li>
     <li>Unique link text lets “click Pricing details” hit exactly one link.</li>
     <li>Test with Voice Control or Voice Access: say “show numbers”.</li></ul>`,
    [['Why do click handlers on divs fail for voice users?', ['They are too fast', 'No role, so no number or name', 'They are green', 'They are huge'], 1, 'Voice tools look at roles.'],
     ['A tool to test voice access on Windows?', ['Voice Access', 'Paint', 'Notepad', 'Excel'], 0, 'Windows Voice Access.']]);

  L('voice-testing-pro', 'voice', 'pro', 8, ['2.5.3', '2.1.4', '3.3.2'], 'A voice-control test pass',
    'A repeatable five-step test for any page.', null,
    `<p>You do not need to be a Dragon expert to test the essentials.</p>
     <h2>The five-step pass</h2>
     <ol><li>Turn on Voice Control (macOS/iOS) or Voice Access (Windows/Android).</li>
     <li>Say <em>“show numbers”</em> / <em>“show names”</em>: is every control covered?</li>
     <li>Say each visible label: does it activate that control?</li>
     <li>Dictate in a text field: do shortcuts fire?</li>
     <li>Log label-in-name mismatches in the audit report (F96).</li></ol>
     <p>Pair with automated checks: axe has a rule for label-content-name-mismatch.</p>`,
    [['“Show numbers” is used to…', ['Count characters', 'Reveal numbered click targets', 'Zoom', 'Mute audio'], 1, 'Numbered overlays.'],
     ['A mismatch between label and name is failure…', ['F96', 'F1', 'F2', 'F54'], 0, 'F96.']]);
})(window.A11Y = window.A11Y || {});
