/* Quizzes. Question shape: { q, options:[...], answer:index, why }.
   Placement = recommendation only. Checkpoints unlock the next level (pass mark 70%).
   Skip-ahead tests combine the checkpoints of all lower levels (pass mark 80%). */
(function (A) {
  A.data = A.data || {};

  A.data.quizzes = {
    placement: [
      { q: 'Which HTML attribute gives an informative image its text alternative?',
        options: ['title', 'alt', 'src', 'longdesc'], answer: 1,
        why: 'The alt attribute is what screen readers use as the image\'s text alternative (technique H37).' },
      { q: 'What is the minimum contrast ratio for normal-size text at WCAG Level AA?',
        options: ['3:1', '4.5:1', '7:1', '2:1'], answer: 1,
        why: '1.4.3 requires 4.5:1 for normal text (3:1 for large text); 7:1 is the AAA level.' },
      { q: 'What does aria-live="polite" do?',
        options: ['Moves focus to the changed content', 'Announces updates when the user is idle, without interrupting',
          'Hides content from screen readers', 'Makes the element focusable'], answer: 1,
        why: 'Polite live regions queue announcements after the current speech. They never move focus.' },
      { q: 'Which of these is NEW in WCAG 2.2?',
        options: ['Keyboard (2.1.1)', 'Contrast (Minimum) (1.4.3)', 'Dragging Movements (2.5.7)', 'Info and Relationships (1.3.1)'], answer: 2,
        why: '2.5.7 Dragging Movements (AA) was added in 2.2 along with 2.4.11, 2.5.8, 3.2.6, 3.3.7 and 3.3.8.' },
      { q: 'What is the first rule of ARIA?',
        options: ['Add role="button" to everything clickable', 'Use a native HTML element when one exists',
          'Always add aria-label', 'Never use ARIA'], answer: 1,
        why: 'Native elements ship with role, state and keyboard behaviour for free. No ARIA is better than bad ARIA.' },
      { q: 'A modal dialog opens. Where should focus go, and where should it return when it closes?',
        options: ['Stay on the trigger; go to the top of the page', 'Into the dialog; back to the element that opened it',
          'To the browser address bar; to the first link', 'Nowhere; nothing needs to move'], answer: 1,
        why: 'Move focus into the dialog, keep it there while open, and restore it to the trigger on close.' }
    ],

    checkpoints: {
      beginner: [
        { q: 'How do you mark an image as purely decorative?',
          options: ['alt="decorative"', 'alt=""', 'Leave the alt attribute off', 'title=""'], answer: 1,
          why: 'An empty alt tells assistive tech to skip the image. A missing alt is a failure (F65) — screen readers may read the file name.' },
        { q: 'What do the four WCAG principles spell?',
          options: ['PAIR', 'POUR', 'PURE', 'POUT'], answer: 1,
          why: 'Perceivable, Operable, Understandable, Robust.' },
        { q: 'Why is a link that just says "Click here" a problem?',
          options: ['It is too short', 'Its purpose is unclear out of context (2.4.4)', 'Links must be blue', 'It cannot be focused'], answer: 1,
          why: 'Screen reader users often list all links on a page. "Click here" ×12 tells them nothing.' },
        { q: 'Which control can a keyboard-only user NOT operate?',
          options: ['<button>', '<a href>', '<div onclick> with no tabindex or role', '<input type="checkbox">'], answer: 2,
          why: 'A div is not focusable and exposes no role. Use a real <button> instead.' }
      ],
      intermediate: [
        { q: 'At 3:1, what counts as "large text" for 1.4.3?',
          options: ['12pt regular', '14pt bold or 18pt regular (≈18.66px bold / 24px)', '16px bold', 'Any heading'], answer: 1,
          why: 'Large text is at least 18pt (24 CSS px), or 14pt (18.66px) bold.' },
        { q: 'Which criterion requires a visible keyboard focus indicator?',
          options: ['2.4.3 Focus Order', '2.4.7 Focus Visible', '2.1.2 No Keyboard Trap', '1.4.11 Non-text Contrast'], answer: 1,
          why: '2.4.7 (AA) requires that a keyboard focus indicator is visible.' },
        { q: 'What is the minimum target size under 2.5.8 (AA)?',
          options: ['24 × 24 CSS px', '44 × 44 CSS px', '10 × 10 CSS px', '48 × 48 device px'], answer: 0,
          why: '2.5.8 sets 24×24 CSS px (with spacing exceptions). 44×44 is the AAA target in 2.5.5.' },
        { q: 'Reflow (1.4.10) means content works without two-dimensional scrolling at…',
          options: ['a 320 CSS px wide viewport (400% zoom)', '1024 px wide', '200% zoom only', 'landscape only'], answer: 0,
          why: '320 CSS px wide is equivalent to 400% zoom on a 1280px window.' }
      ],
      advanced: [
        { q: 'How should a "Saved!" message be exposed without moving focus (4.1.3)?',
          options: ['alert() dialog', 'role="status" / a polite live region', 'tabindex="0" on the message', 'title attribute'], answer: 1,
          why: 'Status messages are announced via role=status, role=alert or aria-live — focus stays put.' },
        { q: 'A button shows "Search" but its aria-label is "Find items". Which criterion does this risk failing?',
          options: ['2.5.3 Label in Name', '1.4.3 Contrast', '2.4.2 Page Titled', '3.1.1 Language of Page'], answer: 0,
          why: 'The accessible name must contain the visible label text so voice-control users can say what they see.' },
        { q: 'What is the purpose of roving tabindex in a tab list or toolbar?',
          options: ['Makes every item a tab stop', 'One tab stop for the widget; arrow keys move within it', 'Hides items from screen readers', 'Sets the reading order'], answer: 1,
          why: 'The active item has tabindex=0, the rest -1; arrow keys move the zero.' },
        { q: 'A sticky header covers the focused field. Which criterion is at risk?',
          options: ['2.4.11 Focus Not Obscured (Minimum)', '1.3.4 Orientation', '3.2.6 Consistent Help', '1.2.2 Captions'], answer: 0,
          why: '2.4.11 (AA, new in 2.2) – a focused item must not be entirely hidden by author-created content.' }
      ],
      pro: [
        { q: 'Which document states a product\'s conformance, usually built from the VPAT template?',
          options: ['Accessibility statement', 'Accessibility Conformance Report (ACR)', 'Privacy policy', 'SLA'], answer: 1,
          why: 'A VPAT is the blank template; the completed document is an ACR.' },
        { q: 'What does 3.3.7 Redundant Entry require?',
          options: ['Users re-enter data to confirm it', 'Info already entered in the same process is auto-populated or selectable', 'No form may have two fields', 'Passwords must be typed twice'], answer: 1,
          why: 'Exceptions exist (security, essential re-entry), but the default is: do not make people repeat themselves.' },
        { q: 'Which severity best fits an issue that blocks a keyboard user from completing checkout?',
          options: ['Low', 'Minor', 'Critical / Blocker', 'Enhancement'], answer: 2,
          why: 'Severity follows user impact on a core task, not how hard the fix is.' },
        { q: 'Accessible Authentication (3.3.8) is satisfied when…',
          options: ['The login uses a CAPTCHA puzzle', 'Password managers and paste are allowed, with no cognitive-function test required', 'Users must memorise a code', 'Login is disabled'], answer: 1,
          why: 'Do not require remembering, transcribing or solving a puzzle unless an alternative or assistance exists.' }
      ]
    }
  };
})(window.A11Y = window.A11Y || {});
