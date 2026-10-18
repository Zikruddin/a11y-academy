/* Phase 5 lessons: Charts/maps, Cognitive, Forms, E-commerce, SPA, CMS, PDF, E-learning, Mobile (Beginner → Pro+). */
(function (A) {
  'use strict';
  const ul = a => '<ul>' + a.map(x => `<li>${x}</li>`).join('') + '</ul>';
  // lesson(id, topic, level, minutes, criteria, title, summary, intro, points, [[q, options, idx, why] x2])
  const lesson = (id, topic, level, minutes, criteria, title, summary, intro, points, quiz) => A.data.lessons.push({
    id, topic, level, minutes, criteria, title, summary, demo: null, body: `<p>${intro}</p><h2>Key points</h2>${ul(points)}`,
    quiz: quiz.map(([q, options, answer, why]) => ({ q, options, answer, why })) });

  /* ---- Forms ---- */
  lesson('forms-labels-basics', 'forms', 'beginner', 5, ['3.3.2', '1.3.1'], 'Every field needs a label', 'Visible, persistent and programmatically linked.',
    'A label tells everyone what a field is for. Placeholders disappear and are not labels.',
    ['Use <code>&lt;label for="id"&gt;</code> with a matching input id.', 'Keep the label visible while typing.', 'Mark required fields in text, not colour alone.', 'Put format hints before the field.'],
    [['Which is a label?', ['placeholder', 'label for/id', 'title', 'alt'], 1, 'A linked label element.'], ['Required fields should be marked…', ['In text', 'By colour only', 'Not at all', 'By sound'], 0, 'In text.']]);
  lesson('forms-errors-groups', 'forms', 'intermediate', 8, ['3.3.1', '3.3.3', '1.3.1'], 'Errors, groups and instructions', 'Say what is wrong and how to fix it.',
    'Good error handling covers detection, identification, suggestion and announcement.',
    ['Describe the error in text, next to the field.', 'Link with <code>aria-describedby</code> and set <code>aria-invalid</code>.', 'Group radios and checkboxes in <code>fieldset</code>/<code>legend</code>.', 'Offer a correction suggestion when known.'],
    [['Link an error to its field with…', ['aria-describedby', 'alt', 'lang', 'role=img'], 0, 'Programmatic association.'], ['Radio groups use…', ['fieldset/legend', 'div', 'span', 'p'], 0, 'Group with a legend.']]);
  lesson('forms-autocomplete-summary', 'forms', 'advanced', 9, ['1.3.5', '3.3.4', '3.3.7'], 'Autocomplete, summaries and review steps', 'Reduce typing and protect users.',
    'Autocomplete tokens, an error summary and a review step make forms safer and faster.',
    ['Add <code>autocomplete="given-name"</code>, <code>email</code>, <code>postal-code</code> etc.', 'Place an error summary at the top and move focus to it on submit.', 'Do not ask for the same data twice (3.3.7).', 'Add review/confirm for legal and financial data.'],
    [['Autocomplete helps with…', ['1.3.5', '1.4.3', '2.3.1', '4.1.1'], 0, 'Identify Input Purpose.'], ['Where does focus go after a failed submit?', ['Error summary', 'Footer', 'Nowhere', 'Logo'], 0, 'To the summary.']]);
  lesson('forms-auth-wizards-pro', 'forms', 'pro', 10, ['3.3.8', '3.3.9', '2.2.1'], 'Authentication and multi-step wizards', 'No puzzles, no lost progress.',
    'Sign-in and long forms are where users give up. Remove memory and transcription burdens.',
    ['Allow paste and password managers; support passkeys and email links.', 'Offer alternatives to CAPTCHA.', 'Save progress and warn before timeouts.', 'Keep step indicators accessible with text and aria-current.'],
    [['3.3.8 forbids…', ['Blocking paste or puzzles at login', 'Passwords', 'Labels', 'Buttons'], 0, 'Cognitive tests.'], ['Wizard steps should…', ['Show current step in text', 'Use colour only', 'Hide progress', 'Auto-advance'], 0, 'Text indication.']]);

  /* ---- E-commerce ---- */
  lesson('ecommerce-cart-status', 'ecommerce', 'beginner', 5, ['4.1.3', '1.1.1'], 'Say what happened in the cart', 'Announce adds, removes and totals.',
    'Visual badges are invisible to screen readers unless announced.',
    ['Use <code>role="status"</code> for “Added to cart”.', 'Give product images meaningful alt text.', 'Show price as text, with clear sale wording.', 'Keep focus where the user acted.'],
    [['Cart changes should be…', ['Announced', 'Silent', 'Hidden', 'Colour only'], 0, '4.1.3.'], ['A sale price must not rely on…', ['Colour alone', 'Text', 'Labels', 'Order'], 0, '1.4.1.']]);
  lesson('ecommerce-filters-listings', 'ecommerce', 'intermediate', 7, ['1.3.1', '2.4.6', '4.1.3'], 'Filters and product listings', 'Real controls and announced counts.',
    'Filters and sort controls are forms. Treat them as such.',
    ['Checkboxes/radios in fieldsets with legends.', 'Announce “24 results” after filtering.', 'Headings per product card, unique link names.', 'Keep focus stable after updates.'],
    [['Filter controls should be…', ['Native inputs', 'Divs', 'Images', 'Canvas'], 0, 'Native.'], ['After filtering, announce…', ['Result count', 'Nothing', 'The URL', 'Colour'], 0, 'Counts.']]);
  lesson('ecommerce-checkout', 'ecommerce', 'advanced', 9, ['3.3.4', '3.3.7', '3.3.1'], 'Accessible checkout', 'Review, reuse and recover.',
    'Checkout combines forms, errors and money. It is the most legally sensitive flow.',
    ['Reuse shipping data for billing (3.3.7).', 'Provide a review step and a cancel window (3.3.4).', 'Associate payment field errors with fields.', 'Confirm the order in text and by email.'],
    [['3.3.7 is about…', ['Redundant entry', 'Captions', 'Contrast', 'Focus'], 0, 'Do not ask twice.'], ['Before paying, offer…', ['A review step', 'A timer', 'A pop-up ad', 'Nothing'], 0, '3.3.4.']]);
  lesson('ecommerce-payments-pro', 'ecommerce', 'pro', 9, ['3.3.8', '4.1.2', '2.5.8'], 'Payment widgets and 3-D Secure', 'Third-party frames and strong authentication.',
    'Payment iframes and SCA flows are accessibility hot-spots you may not control.',
    ['Choose providers with accessible hosted fields; test them.', 'Ensure iframes have titles and keyboard order.', 'Avoid cognitive tests in authentication.', 'Large, spaced targets on mobile wallets.'],
    [['Payment iframes need…', ['A title', 'Nothing', 'Autoplay', 'Hover'], 0, 'An accessible name.'], ['Strong authentication should avoid…', ['Cognitive tests', 'Biometrics', 'SMS', 'Apps'], 0, '3.3.8.']]);

  /* ---- SPA ---- */
  lesson('spa-route-changes', 'spa', 'beginner', 5, ['2.4.2', '2.4.3'], 'Route changes need focus and titles', 'Tell users the page changed.',
    'Client-side routing does not reload the page, so assistive tech gets no signal.',
    ['Update <code>document.title</code>.', 'Move focus to the new h1 or main.', 'Announce the new page if focus move is not suitable.', 'Use anchors with href for links.'],
    [['After a route change, focus should…', ['Move to the heading', 'Stay put', 'Vanish', 'Go to footer'], 0, 'Orient users.'], ['Navigation links are…', ['Anchors', 'Divs', 'Spans', 'Images'], 0, 'Anchors.']]);
  lesson('spa-live-loading', 'spa', 'intermediate', 7, ['4.1.3', '3.2.2'], 'Loading states and live regions', 'Status messages without focus.',
    'Spinners alone are invisible to screen readers.',
    ['Use <code>role="status"</code> for “Loading… / Loaded”.', 'Use <code>role="alert"</code> for errors that block.', 'Do not announce every keystroke.', 'Avoid changing context on input.'],
    [['Polite messages use…', ['role="status"', 'role="alert"', 'tabindex', 'alt'], 0, 'status.'], ['A spinner needs…', ['Text', 'Colour', 'Sound only', 'Nothing'], 0, 'Text equivalent.']]);
  lesson('spa-focus-management', 'spa', 'advanced', 9, ['2.4.3', '4.1.2', '2.1.2'], 'Focus management patterns', 'After delete, insert, expand and navigate.',
    'Focus must never fall to the body after an action.',
    ['After deleting an item, focus the next item or a heading.', 'After inserting content, announce it politely.', 'Preserve focus on re-render (keys, refs).', 'Restore focus when closing overlays.'],
    [['After deleting a list item, focus goes to…', ['Next item or heading', 'Body', 'Nowhere', 'Footer'], 0, 'A sensible target.'], ['Re-render must preserve…', ['Focus', 'Colour', 'Fonts', 'Cache'], 0, 'Focus.']]);
  lesson('spa-web-components-pro', 'spa', 'pro', 9, ['4.1.2', '1.3.1'], 'Web components and frameworks', 'Shadow DOM, ARIA references and testing.',
    'Shadow DOM breaks id references across boundaries.',
    ['ARIA id references (for, aria-labelledby) do not cross shadow roots.', 'Use ElementInternals and delegatesFocus.', 'Automate with axe in unit tests.', 'Lint JSX for accessibility.'],
    [['ID references across shadow roots…', ['Do not work', 'Always work', 'Are required', 'Are visible'], 0, 'They are scoped.'], ['Automated tests catch…', ['Many but not all issues', 'All issues', 'None', 'Only colours'], 0, 'Roughly a third to half.']]);

  /* ---- Cognitive ---- */
  lesson('cognitive-plain-language', 'cognitive', 'beginner', 5, ['3.1.1', '3.1.5'], 'Plain language and page language', 'Short sentences, one idea at a time.',
    'Plain language benefits everyone, including people with cognitive disabilities and non-native speakers.',
    ['Prefer short sentences and common words.', 'Use headings and lists to chunk.', 'Set <code>lang</code> on the page.', 'Put the key point first.'],
    [['Where is page language set?', ['html lang', 'title', 'meta', 'footer'], 0, '3.1.1.'], ['Plain language helps…', ['Everyone', 'Nobody', 'Only experts', 'Only kids'], 0, 'Everyone.']]);
  lesson('cognitive-consistency-help', 'cognitive', 'intermediate', 7, ['3.2.3', '3.2.4', '3.2.6'], 'Consistency and help', 'Same place, same name.',
    'Predictability reduces cognitive load.',
    ['Keep navigation order the same on every page.', 'Name the same function the same way.', 'Put help in the same relative place.', 'Avoid surprise context changes.'],
    [['Consistent Help is…', ['3.2.6', '2.1.1', '1.4.3', '4.1.2'], 0, '3.2.6.'], ['Same function should have…', ['The same name', 'Different names', 'No name', 'Colour'], 0, '3.2.4.']]);
  lesson('cognitive-time-memory', 'cognitive', 'advanced', 8, ['2.2.1', '2.2.5', '3.3.7'], 'Time, memory and redundant entry', 'Do not make users remember.',
    'Time limits and re-entry punish people with memory or processing differences.',
    ['Warn before timeouts and allow extension.', 'Save data across re-authentication.', 'Auto-populate known answers.', 'Show progress and let users go back.'],
    [['Time limits should be…', ['Adjustable', 'Fixed', 'Hidden', 'Shorter'], 0, '2.2.1.'], ['Re-entry is avoided by…', ['Reusing known data', 'Typing twice', 'Colour', 'Hover'], 0, '3.3.7.']]);
  lesson('cognitive-aaa-pro', 'cognitive', 'pro', 9, ['3.1.3', '3.1.4', '3.1.6'], 'Jargon, abbreviations and pronunciation', 'AAA techniques for hard text.',
    'AAA criteria address words that are hard to understand or pronounce.',
    ['Provide a glossary or inline definitions.', 'Expand abbreviations at first use.', 'Give pronunciation where meaning depends on it.', 'Offer Easy Read or summaries (3.1.5).'],
    [['Abbreviations should be…', ['Expanded', 'Hidden', 'Coloured', 'Avoided'], 0, '3.1.4.'], ['Heteronyms may need…', ['Pronunciation help', 'Colour', 'Icons', 'Nothing'], 0, '3.1.6.']]);

  /* ---- CMS ---- */
  lesson('cms-theme-basics', 'cms', 'beginner', 5, ['2.4.1', '3.1.1'], 'Pick and test an accessible theme', 'Skip links, landmarks, language and focus.',
    'Your theme decides most of the structure. Test before building.',
    ['Check skip link, landmarks and heading order.', 'Set the site language.', 'Test focus styles and zoom to 400%.', 'Avoid themes that remove outlines.'],
    [['A theme should include…', ['Skip link and landmarks', 'Autoplay', 'Pop-ups', 'Overlays'], 0, '2.4.1.'], ['Language is set in…', ['Site settings', 'Footer', 'Logo', 'Menu'], 0, '3.1.1.']]);
  lesson('cms-editor-content', 'cms', 'intermediate', 7, ['1.1.1', '1.3.1', '2.4.6'], 'Writing accessible content in the editor', 'Headings, alt text and links.',
    'Editors create most of a site’s accessibility issues, one post at a time.',
    ['Use heading blocks in order.', 'Fill alt text for every image.', 'Write descriptive link text.', 'Use real lists and tables.'],
    [['Fake headings use…', ['Bold text', 'Heading blocks', 'h1 only', 'Images'], 0, 'Bold is not a heading.'], ['Alt text is entered…', ['In the media library/block', 'In CSS', 'In the footer', 'Never'], 0, 'At upload.']]);
  lesson('cms-plugins-builders', 'cms', 'advanced', 8, ['4.1.2', '2.2.2', '3.3.2'], 'Plugins and page builders', 'Test the output, not the marketing.',
    'Plugins add markup you did not write. Test each.',
    ['Run axe on pages using the plugin.', 'Check sliders for pause and keyboard use.', 'Check form plugins for labels and errors.', 'Avoid “accessibility overlay” plugins as a fix.'],
    [['Overlay plugins…', ['Do not fix underlying issues', 'Fix everything', 'Are WCAG', 'Are free'], 0, 'Remediate code.'], ['Sliders need…', ['Pause control', 'Autoplay', 'Hover', 'Colour'], 0, '2.2.2.']]);
  lesson('cms-theme-dev-pro', 'cms', 'pro', 10, ['2.4.1', '4.1.2', '2.4.11'], 'Building accessibility-ready themes', 'Templates, focus and the checklist.',
    'Theme developers carry the responsibility for structure, focus and templates.',
    ['Use semantic templates with landmarks.', 'Provide visible focus and scroll-padding.', 'Follow the WordPress accessibility-ready requirements.', 'Test with keyboard, screen reader and zoom.'],
    [['Theme templates should use…', ['Semantic HTML', 'Divs only', 'Tables for layout', 'Images'], 0, 'Semantics.'], ['Sticky headers need…', ['scroll-padding', 'z-index', 'float', 'none'], 0, '2.4.11.']]);

  /* ---- PDF ---- */
  lesson('pdf-start-at-source', 'pdf-docs', 'beginner', 5, ['1.3.1', '2.4.2'], 'Start at the source document', 'Styles in, tags out.',
    'An accessible PDF begins as an accessible Word or PowerPoint file.',
    ['Use real heading styles and lists.', 'Add alt text to images.', 'Set the document title.', 'Run the built-in Accessibility Checker.'],
    [['Best way to make an accessible PDF?', ['Fix the source and export tagged', 'Scan paper', 'Screenshot', 'Print'], 0, 'Source first.'], ['Headings in Word use…', ['Heading styles', 'Bold', 'Big font', 'Colour'], 0, 'Styles.']]);
  lesson('pdf-tags-reading-order', 'pdf-docs', 'intermediate', 8, ['1.3.1', '1.3.2', '3.1.1'], 'Tags, reading order and language', 'Fix the tag tree.',
    'Tags give a PDF its structure for assistive tech.',
    ['Check the tag tree and reading order in Acrobat.', 'Tag table headers.', 'Set document language.', 'Mark artifacts (decoration) correctly.'],
    [['Tags provide…', ['Structure', 'Colour', 'Sound', 'Fonts'], 0, 'Structure.'], ['Decoration should be…', ['Marked as artifact', 'Tagged as text', 'Left alone', 'Bold'], 0, 'Artifact.']]);
  lesson('pdf-forms-tables', 'pdf-docs', 'advanced', 9, ['3.3.2', '1.3.1', '2.4.3'], 'PDF forms and complex tables', 'Labels, tab order and header cells.',
    'Form fields and tables need extra care.',
    ['Add tooltips (labels) to every field.', 'Set the tab order to follow structure.', 'Use table headers and IDs for complex tables.', 'Provide instructions at the start.'],
    [['Fields need…', ['Tooltips/labels', 'Nothing', 'Colour', 'Sound'], 0, '3.3.2.'], ['Tab order should follow…', ['Structure', 'Random', 'Colour', 'Size'], 0, 'Logical order.']]);
  lesson('pdf-office-email-pro', 'pdf-docs', 'pro', 9, ['1.1.1', '1.3.1', '3.1.1'], 'Office files and accessible email', 'Excel, PowerPoint and HTML email.',
    'Other formats follow the same ideas with their own tools.',
    ['PowerPoint: layouts, reading order, alt text.', 'Excel: header rows, named tables, no merged cells.', 'HTML email: semantic tables for layout need role=presentation, lang and alt text.', 'Provide plain-text alternatives.'],
    [['Merged cells in Excel…', ['Hurt navigation', 'Help', 'Are required', 'Are free'], 0, 'Avoid them.'], ['Layout tables in email need…', ['role="presentation"', 'role="grid"', 'th', 'caption'], 0, 'Presentation role.']]);

  /* ---- E-learning ---- */
  lesson('elearning-timers-keyboard', 'elearning', 'beginner', 5, ['2.2.1', '2.1.1'], 'Timers and keyboard basics', 'Let learners take their time.',
    'Course tools often add timers and mouse-only interactions by default.',
    ['Avoid or extend timers.', 'Test every slide with the keyboard.', 'Provide captions for all media.', 'Allow replay of audio.'],
    [['Learner time limits should be…', ['Adjustable', 'Short', 'Hidden', 'Fixed'], 0, '2.2.1.'], ['Course navigation must be…', ['Keyboard operable', 'Mouse only', 'Touch only', 'Voice only'], 0, '2.1.1.']]);
  lesson('elearning-storyline-focus', 'elearning', 'intermediate', 8, ['2.4.3', '4.1.2'], 'Storyline: focus order and alt text', 'Name objects and set the order.',
    'Storyline uses a focus order list that can differ from the visual order.',
    ['Set Alt Text for every meaningful object; mark decorative ones.', 'Fix the focus order panel.', 'Check layers move focus correctly.', 'Test published output with NVDA.'],
    [['Focus order in Storyline is set in…', ['The focus order panel', 'The timeline only', 'CSS', 'The LMS'], 0, 'Panel.'], ['Decorative objects should be…', ['Marked decorative', 'Given long alt', 'Hidden', 'Bold'], 0, 'Decorative.']]);
  lesson('elearning-dragdrop-quizzes', 'elearning', 'advanced', 9, ['2.5.7', '2.1.1', '3.3.1'], 'Accessible quizzes and drag-and-drop', 'Alternatives and feedback.',
    'Quiz interactions must be operable and the feedback announced.',
    ['Provide dropdown or click alternatives to drag-and-drop.', 'Announce correct/incorrect feedback.', 'Do not rely on colour for results.', 'Allow retries without penalty for accessibility.'],
    [['Drag-and-drop needs…', ['An alternative', 'Nothing', 'Colour', 'Timer'], 0, '2.5.7.'], ['Feedback should be…', ['Announced', 'Silent', 'Colour only', 'Hidden'], 0, '4.1.3.']]);
  lesson('elearning-scorm-pro', 'elearning', 'pro', 9, ['2.2.6', '2.2.5', '4.1.2'], 'SCORM, LMS and Rise', 'Suspend data, sessions and published output.',
    'The LMS wrapper can break accessibility even if your content is fine.',
    ['Save progress (suspend data) so learners can resume.', 'Warn about LMS session timeouts.', 'Test in the LMS, not only preview.', 'Check Rise blocks for keyboard use.'],
    [['Always test…', ['In the target LMS', 'In preview only', 'Never', 'On paper'], 0, 'LMS wrappers matter.'], ['Resume support helps…', ['People who need breaks', 'Nobody', 'Only admins', 'Only mobile'], 0, '2.2.6.']]);

  /* ---- Mobile ---- */
  lesson('mobile-targets-orientation', 'mobile', 'beginner', 5, ['2.5.8', '1.3.4'], 'Targets and orientation', 'Big enough, any way up.',
    'Phones are used one-handed, on the move, in any orientation.',
    ['Targets at least 44pt/48dp with spacing.', 'Do not lock orientation.', 'Support text scaling.', 'Test on a real device.'],
    [['Do not lock…', ['Orientation', 'Colour', 'Fonts', 'Links'], 0, '1.3.4.'], ['Target size on mobile?', ['44pt/48dp', '10px', '5px', '1px'], 0, 'Larger is better.']]);
  lesson('mobile-voiceover-talkback', 'mobile', 'intermediate', 8, ['4.1.2', '1.1.1'], 'VoiceOver and TalkBack basics', 'Labels, traits and swipe navigation.',
    'Native screen readers read the accessibility tree you expose.',
    ['iOS: <code>accessibilityLabel</code>, traits, hints.', 'Android: <code>contentDescription</code>, roles, headings.', 'Swipe through the screen: is the order logical?', 'Group related elements.'],
    [['iOS label property?', ['accessibilityLabel', 'alt', 'title', 'aria'], 0, 'accessibilityLabel.'], ['Android label?', ['contentDescription', 'alt', 'title', 'lang'], 0, 'contentDescription.']]);
  lesson('mobile-gestures-motion', 'mobile', 'advanced', 8, ['2.5.1', '2.5.2', '2.5.4'], 'Gestures and motion', 'Alternatives to swipe, pinch and shake.',
    'Custom gestures conflict with screen reader gestures.',
    ['Offer buttons for every gesture.', 'Expose custom actions to assistive tech.', 'Allow cancelling a touch by moving away.', 'Provide a switch to turn off motion actuation.'],
    [['Gestures need…', ['Single-pointer alternatives', 'More fingers', 'Speed', 'Colour'], 0, '2.5.1.'], ['Shake-to-undo needs…', ['A button and opt-out', 'Nothing', 'Sound', 'Flash'], 0, '2.5.4.']]);
  lesson('mobile-responsive-vs-native-pro', 'mobile', 'pro', 9, ['1.4.4', '1.4.10', '2.5.8'], 'Responsive web vs native vs hybrid', 'Choosing and testing the stack.',
    'WCAG applies to web content; native apps follow the same ideas (WCAG2ICT, platform guidelines).',
    ['Responsive web: reflow at 320px, zoom, orientation.', 'Native: use platform controls and Dynamic Type/sp units.', 'Hybrid: check the WebView exposes semantics.', 'Test with real assistive tech on real devices.'],
    [['Dynamic Type is…', ['iOS text scaling', 'A font', 'A chart', 'A gesture'], 0, 'User text size.'], ['WebViews should…', ['Expose semantics', 'Hide content', 'Block zoom', 'Be images'], 0, 'Keep accessibility.']]);

  /* ---- Charts and maps ---- */
  lesson('charts-text-alternatives', 'charts-maps', 'beginner', 5, ['1.1.1', '1.4.1'], 'Text alternatives for charts', 'Say the point, give the data.',
    'A chart image needs a short alternative stating its message and a longer one with data.',
    ['Short alt: the main insight.', 'Long description or data table nearby.', 'Do not rely on colour alone.', 'Label lines and bars directly.'],
    [['A chart needs…', ['Text alternative and data', 'Only colour', 'Animation', 'Sound'], 0, '1.1.1.'], ['Colour alone is…', ['Not enough', 'Enough', 'Required', 'Banned'], 0, '1.4.1.']]);
  lesson('charts-contrast-patterns', 'charts-maps', 'intermediate', 7, ['1.4.11', '1.4.1'], 'Contrast and patterns in graphics', '3:1 for meaningful marks.',
    'Meaningful graphical objects need 3:1 contrast against adjacent colours.',
    ['Check lines and bars at 3:1.', 'Use patterns or shapes as well as colour.', 'Check greyscale.', 'Keep legends near the data.'],
    [['Graphics need contrast of…', ['3:1', '7:1', '1.1:1', '4.5:1'], 0, '1.4.11.'], ['Patterns help…', ['Colour-blind users', 'Nobody', 'Printers only', 'Screen readers only'], 0, 'Non-colour cue.']]);
  lesson('charts-interactive-tooltips', 'charts-maps', 'advanced', 8, ['1.4.13', '2.1.1', '4.1.2'], 'Interactive charts and tooltips', 'Keyboard and focus.',
    'Interactive charts must be reachable and tooltips persistent.',
    ['Make data points focusable or provide a table.', 'Tooltips: dismissible, hoverable, persistent.', 'Announce selected values.', 'Avoid hover-only details.'],
    [['Tooltips should be…', ['Dismissible/hoverable/persistent', 'Hover only', 'Timed', 'Hidden'], 0, '1.4.13.'], ['Alternative to interaction?', ['Data table', 'Nothing', 'Colour', 'Sound'], 0, 'Provide the data.']]);
  lesson('charts-maps-pro', 'charts-maps', 'pro', 9, ['1.1.1', '2.1.1', '1.3.1'], 'Maps and dashboards', 'Lists, search and layered data.',
    'Maps are visual by nature; provide equivalent routes to the information.',
    ['Offer a searchable list of places.', 'Keyboard pan/zoom and +/− buttons.', 'Dashboards: each widget has a heading and text summary.', 'Provide export to CSV.'],
    [['Alternative to a store map?', ['Searchable list', 'Bigger map', 'Colour', 'Video'], 0, 'List.'], ['Dashboards need…', ['Headings and summaries', 'Nothing', 'Autoplay', 'Hover'], 0, 'Structure.']]);
})(window.A11Y = window.A11Y || {});
