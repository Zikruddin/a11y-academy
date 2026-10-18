/* Phase 5 hubs: Charts/maps, Cognitive, Forms, E-commerce, SPA, CMS, PDF, E-learning, Mobile. */
(function (A) {
  'use strict';
  const add = (id, h) => { A.data.hubs[id] = h; const t = A.data.topicById[id];
    A.data.badges.push({ id: 'hub-' + id, name: t.name + ' Hub', desc: 'Pass the ' + t.name + ' hub quiz.', icon: t.icon, test: s => !!(s.hubs && s.hubs[id]) }); };
  const F = (title, story, fix) => ({ title, story, fix });
  const Q = (q, options, answer, why) => ({ q, options, answer, why });
  const AU = (title, criteria, severity, location, found, impact, recommendation, code) => ({ title, criteria, severity, location, found, impact, recommendation, code });
  const CH = (title, prompt, buckets, items) => ({ title, prompt, buckets, items: items.map(([t, a]) => ({ t, a })) });
  const K = (manual, tools, sr) => ({ manual, tools, sr });

  add('charts-maps', {
    patterns: { do: ['Give every chart a short text alternative and a longer description or data table.', 'Use patterns, labels or direct annotation, not colour alone.', 'Keep tooltips keyboard-reachable, dismissible and persistent.', 'Offer a list or table alternative to interactive maps.'],
      dont: ['Export a chart as an image with no alt text.', 'Encode categories only with colour.', 'Show values only on hover.', 'Make a map the only way to find locations.'] },
    demo: '1.4.1',
    failures: [F('The dashboard of colours', 'Status was shown as red, amber and green dots. Colour-blind users could not distinguish them and screen readers heard nothing.', 'Add text labels and icons; expose the data in a table.'),
      F('Hover-only values', 'A bar chart revealed numbers on mouse hover. Keyboard and touch users never saw them.', 'Show values permanently or on focus, and provide a data table.'),
      F('The store locator map', 'Finding a store required panning a map. Keyboard users could not do it.', 'Provide a searchable list of locations beside the map.')],
    checklist: K(['Can you get every number without hovering?', 'Is meaning clear in greyscale?', 'Is there a table or text summary?', 'Can the map be operated by keyboard or replaced by a list?'], ['Colour Contrast Analyser (3:1 for graphics)', 'Greyscale / colour-blindness simulators', 'axe DevTools'], ['Does the chart expose a name and summary?', 'Can the data table be read cell by cell?']),
    audit: AU('Chart conveys data by colour only', '1.4.1 Use of Colour · 1.1.1 Non-text Content · Level A', 'High', 'Sales dashboard', 'Series differ only by hue; no labels, no text alternative.', 'Colour-blind and screen reader users cannot read the chart.', 'Add direct labels or patterns and provide a data table.', '<figure>\n  <img src="sales.png" alt="Sales rose from 10 to 40 between Q1 and Q4">\n  <figcaption>Quarterly sales. <a href="#data">View data table</a></figcaption>\n</figure>'),
    challenge: CH('Which fix?', 'Match each chart problem to its fix.', ['Add data table', 'Add patterns/labels', 'Make tooltip keyboard accessible', 'Add list alternative'], [['Screen reader users cannot get the numbers.', 0], ['Series are only distinguished by hue.', 1], ['Values appear on mouse hover only.', 2], ['A map is the only way to find stores.', 3]]),
    quiz: [Q('Charts should not rely on…', ['Labels', 'Colour alone', 'Tables', 'Text'], 1, '1.4.1.'), Q('A good alternative to a chart is…', ['A data table', 'A bigger chart', 'Animation', 'Sound'], 0, 'Provide the data.'), Q('Graphical objects need contrast of…', ['3:1', '7:1', '1.5:1', '4.5:1'], 0, '1.4.11.'), Q('Hover-only values fail for…', ['Keyboard and touch users', 'Nobody', 'Mouse users', 'Printers'], 0, 'Keyboard and touch.')]
  });

  add('cognitive', {
    patterns: { do: ['Use plain language, short sentences and clear headings.', 'Expand abbreviations and explain jargon.', 'Keep navigation and help in consistent places.', 'Avoid redundant entry and allow enough time.', 'Mark the page and passages with the correct lang.'],
      dont: ['Use idioms and unexplained jargon.', 'Move help or navigation between pages.', 'Make users re-enter known information.', 'Set short silent timeouts.'] },
    demo: '3.3.7',
    failures: [F('The benefits form nobody finished', 'A government form used legal wording and a 10-minute silent timeout. Many applicants lost their work.', 'Plain language, a timeout warning and autosave.'),
      F('Help that kept moving', 'Contact details appeared in the header on some pages and the footer on others. Users stuck on a task could not find help.', 'Place help consistently (3.2.6).'),
      F('Typing the same address three times', 'A multi-step flow asked for the address at every step.', 'Reuse previous answers (3.3.7).')],
    checklist: K(['Read content aloud: does it make sense at lower secondary level?', 'Is help in the same place on every page?', 'Is anything asked twice?', 'Are time limits adjustable?'], ['Hemingway / readability scores', 'WAVE language checks', 'Accessibility Insights'], ['Is lang correct for every passage?', 'Are abbreviations announced properly?']),
    audit: AU('Help moves between pages', '3.2.6 Consistent Help · Level A', 'Medium', 'Header and footer', 'Contact link is in the header on 3 templates and the footer on 4.', 'People who need help cannot predict where it is.', 'Place help in the same relative location on every page.', '<header>…<a href="/help">Help</a></header>\n<!-- same position in every template -->'),
    challenge: CH('Cognitive load', 'Does each practice help or hinder?', ['Helps', 'Hinders'], [['Plain-language summary above a legal text.', 0], ['An unexplained acronym in the first sentence.', 1], ['Help link in the same place on every page.', 0], ['Silent 10-minute timeout.', 1]]),
    quiz: [Q('Redundant entry is covered by…', ['3.3.7', '1.4.3', '2.4.7', '4.1.2'], 0, '3.3.7.'), Q('The page language is set with…', ['lang on html', 'title', 'meta', 'dir'], 0, '3.1.1.'), Q('Consistent Help is…', ['3.2.6', '3.2.3', '2.5.8', '1.1.1'], 0, '3.2.6.'), Q('Plain language benefits…', ['Many users', 'Nobody', 'Only experts', 'Only children'], 0, 'Everyone.')]
  });

  add('forms', {
    patterns: { do: ['Use a visible <label> for every control, linked with for/id.', 'Group related controls with fieldset and legend.', 'Add autocomplete tokens for personal data.', 'On error: summarise at the top, link to fields, set aria-invalid and aria-describedby.', 'Allow paste and password managers.'],
      dont: ['Use placeholders as labels.', 'Indicate required or errors by colour alone.', 'Auto-advance or auto-submit on input.', 'Block paste or use cognitive puzzles to sign in.'] },
    demo: '3.3.1',
    failures: [F('Placeholders as labels', 'Fields showed labels only as placeholders. After typing, users forgot what the field was and screen reader users heard “edit text”.', 'Use persistent visible labels.'),
      F('The error nobody heard', 'Errors appeared in red under fields without any announcement. Screen reader users submitted repeatedly and never learned why it failed.', 'Move focus to an error summary or use role=alert, and link each error to its field.'),
      F('Password paste blocked', 'A bank blocked pasting into password fields. Password-manager users could not sign in.', 'Allow paste and autocomplete (3.3.8).')],
    checklist: K(['Click each label: does the field focus?', 'Submit empty: are errors in text, linked and announced?', 'Is autocomplete set on name, email, address?', 'Can you complete the form with keyboard only?'], ['axe DevTools (label, autocomplete-valid)', 'WAVE', 'Browser accessibility tree'], ['Is the label read with each field?', 'Are errors announced on submit?']),
    audit: AU('Fields have no programmatic labels', '1.3.1 · 3.3.2 · 4.1.2 · Level A', 'High', 'Checkout form', 'Inputs use placeholders only; no label elements.', 'Screen reader and voice users cannot identify the fields.', 'Add visible labels linked with for/id.', '<label for="email">Email</label>\n<input id="email" type="email" autocomplete="email">'),
    challenge: CH('Form fix', 'Match each issue to its fix.', ['Add label', 'Add error text + aria-describedby', 'Add autocomplete', 'Allow paste'], [['Placeholder is the only label.', 0], ['Error shown by red border only.', 1], ['Name and address fields lack tokens (1.3.5).', 2], ['Password manager cannot fill the field.', 3]]),
    quiz: [Q('Linking a label to an input uses…', ['for/id', 'alt', 'title', 'class'], 0, 'for and id.'), Q('Errors must be in…', ['Text', 'Colour only', 'Icons only', 'Sound'], 0, '3.3.1.'), Q('Grouping radios uses…', ['fieldset/legend', 'div', 'span', 'section'], 0, 'fieldset.'), Q('3.3.8 forbids…', ['Cognitive tests to log in', 'Passwords', 'Email', 'Buttons'], 0, 'Cognitive function tests.')]
  });

  add('ecommerce', {
    patterns: { do: ['Product images with useful alt text; price and sale info in text.', 'Filters as real checkboxes/radios with announced result counts.', 'Cart updates announced via role=status.', 'Checkout: review step, confirmation and a way to cancel (3.3.4).', 'Show prices with clear original/sale wording.'],
      dont: ['Show a sale only by strikethrough colour.', 'Update cart totals silently.', 'Hide shipping costs until the last step.', 'Use image-only buttons like “Buy”.'] },
    demo: '3.3.4',
    failures: [F('The cart that said nothing', 'Adding to cart updated an icon badge only. Screen reader users did not know it worked.', 'Announce “Added to cart, 3 items” politely.'),
      F('Filters as divs', 'Filter chips were clickable divs. Keyboard users could not narrow results.', 'Use checkboxes in a fieldset, announce result counts.'),
      F('Order with no review', 'A single “Pay now” button charged immediately. Users with motor impairments placed accidental orders.', 'Add a review step and a cancel window.')],
    checklist: K(['Complete a purchase using only the keyboard.', 'Is every status (added, removed, error) announced?', 'Is the total visible before paying?', 'Can the order be reviewed and cancelled?'], ['axe DevTools', 'Lighthouse', 'Keyboard walkthrough'], ['Add-to-cart announced?', 'Price and discount read in the right order?']),
    audit: AU('No order review before payment', '3.3.4 Error Prevention (Legal, Financial, Data) · Level AA', 'High', 'Checkout', 'The Pay button completes the order immediately.', 'Users cannot correct mistakes before committing.', 'Add a review step and a cancellation window.', '<h2>Review your order</h2>\n<button>Edit</button> <button>Place order</button>'),
    challenge: CH('Commerce pattern', 'Choose the right fix.', ['Live region message', 'Real checkboxes', 'Review step', 'Text price'], [['Add to cart gives no feedback.', 0], ['Filters are clickable divs.', 1], ['Pay now charges instantly.', 2], ['Sale shown only by colour.', 3]]),
    quiz: [Q('Cart updates should be…', ['Announced', 'Silent', 'Hidden', 'Colour only'], 0, '4.1.3.'), Q('3.3.4 requires…', ['Review, confirm or undo', 'Captions', 'Contrast', 'Alt text'], 0, 'Safeguards.'), Q('Filters are best as…', ['Checkboxes', 'Divs', 'Images', 'Links to nowhere'], 0, 'Native controls.'), Q('Redundant entry applies to…', ['Billing = shipping', 'Alt text', 'Video', 'Audio'], 0, '3.3.7.')]
  });

  add('spa', {
    patterns: { do: ['On route change: update document.title and move focus to the new h1 or main.', 'Announce loading and results through a polite live region.', 'Use real links for navigation and buttons for actions.', 'Manage focus after deleting or inserting content.', 'Expose custom elements’ name, role and state.'],
      dont: ['Swap content with no focus move or announcement.', 'Use div+click for navigation.', 'Leave the title unchanged across routes.', 'Lose scroll or focus position on back/forward.'] },
    demo: '4.1.3',
    failures: [F('Silent route changes', 'Clicking a link swapped the page content but screen readers announced nothing and focus stayed on the old link.', 'Move focus to the new h1 and update the title.'),
      F('Spinner with no words', 'A visual spinner was the only loading cue.', 'Add role=status text such as “Loading results”.'),
      F('Router links as divs', 'Navigation used div click handlers so links lists and right-click did not work.', 'Use anchor elements with href.')],
    checklist: K(['After navigation, where is focus?', 'Does the title change per route?', 'Is loading announced?', 'Do back/forward restore position?'], ['axe DevTools', 'React/Vue accessibility lint plugins', 'Accessibility Insights'], ['Is the new page announced?', 'Is focus visible on the new heading?']),
    audit: AU('Route changes are not announced', '2.4.2 · 2.4.3 · 4.1.3 · Level A/AA', 'High', 'All client-side routes', 'Title stays the same; focus stays on the clicked link; no announcement.', 'Screen reader users do not know the page changed.', 'Update the title, move focus to the h1 and announce.', 'router.afterEach(to => {\n  document.title = to.meta.title;\n  document.querySelector("h1").focus();\n});'),
    challenge: CH('SPA fix', 'What should happen?', ['Move focus to h1', 'Update the title', 'Live region message', 'Use an anchor'], [['After navigation, focus is lost.', 0], ['Every route shows the same tab title.', 1], ['Results load asynchronously.', 2], ['Menu item is a div with click.', 3]]),
    quiz: [Q('After a route change, focus should go to…', ['New heading', 'Old link', 'Footer', 'Nowhere'], 0, 'Orient the user.'), Q('Loading states need…', ['Text announced', 'A spinner only', 'Colour', 'Nothing'], 0, '4.1.3.'), Q('Navigation uses…', ['Anchors', 'Divs', 'Spans', 'Images'], 0, 'Real links.'), Q('Page title should…', ['Change per route', 'Stay the same', 'Be empty', 'Be hidden'], 0, '2.4.2.')]
  });

  add('cms', {
    patterns: { do: ['Choose an accessibility-ready theme and test it.', 'Set the site language in settings.', 'Use heading blocks in order; avoid bolded paragraphs as headings.', 'Require alt text in the media library.', 'Test every plugin (forms, sliders, popups) before use.'],
      dont: ['Pick page builders without testing output.', 'Upload images without alt text.', 'Use sliders that auto-advance without pause.', 'Install plugins that inject overlays as “fixes”.'] },
    demo: '3.1.1',
    failures: [F('Headings chosen by size', 'Editors used bold text styled big instead of heading blocks. Screen reader users could not navigate by heading.', 'Use heading blocks and fix levels.'),
      F('The slider plugin', 'A homepage slider auto-rotated and had mouse-only arrows.', 'Choose an accessible carousel or avoid it; add pause and keyboard controls.'),
      F('Form plugin without labels', 'A popular form plugin rendered placeholders only.', 'Configure visible labels or switch plugins.')],
    checklist: K(['Is the lang set in settings?', 'Does the theme have skip link, landmarks and focus styles?', 'Do all plugins pass a keyboard test?', 'Does the media library require alt text?'], ['WAVE', 'axe DevTools', 'WordPress Theme Check'], ['Headings list sensible?', 'Landmarks present?']),
    audit: AU('Theme lacks skip link and landmarks', '2.4.1 Bypass Blocks · Level A', 'Medium', 'Theme header', 'No skip link; content is not in <main>.', 'Keyboard users must tab through the menu on every page.', 'Add a skip link and wrap the page content in main.', '<a class="skip" href="#content">Skip to content</a>\n<main id="content">…</main>'),
    challenge: CH('CMS choice', 'Pick the fix.', ['Heading block', 'Alt text field', 'Language setting', 'Replace plugin'], [['Editors fake headings with bold.', 0], ['Images have empty alt in media.', 1], ['Page lacks lang.', 2], ['Slider has no keyboard support.', 3]]),
    quiz: [Q('Headings should be…', ['Real heading blocks', 'Bold text', 'Images', 'Colour'], 0, 'Structure.'), Q('Overlay plugins…', ['Do not fix the underlying code', 'Fix everything', 'Are required', 'Are free'], 0, 'They do not replace remediation.'), Q('Where is language set?', ['Site settings', 'Footer', 'Image', 'Menu'], 0, '3.1.1.'), Q('Plugins should be…', ['Tested', 'Trusted blindly', 'Hidden', 'Colourful'], 0, 'Test them.')]
  });

  add('pdf-docs', {
    patterns: { do: ['Start from an accessible Word/PowerPoint source with styles and alt text.', 'Export tagged PDF with title, language and bookmarks.', 'Set reading order and tag tables and forms.', 'Provide an accessible HTML alternative where possible.', 'Run the PDF Accessibility Checker and test with a screen reader.'],
      dont: ['Publish scanned images of text.', 'Use spaces and tabs for layout.', 'Leave the document title and language empty.', 'Add alt text “image123.jpg”.'] },
    demo: '3.1.1',
    failures: [F('The scanned annual report', 'A PDF was a scan with no text layer. Screen reader users could not read it.', 'Re-create from source or OCR and tag it.'),
      F('Tables that read like soup', 'A table was not tagged, so cells were read in arbitrary order.', 'Tag header cells and verify reading order.'),
      F('Form fields without tooltips', 'A PDF form had fields without labels.', 'Add tooltips/labels and tab order.')],
    checklist: K(['Can you select and copy text?', 'Is the title set (not the filename)?', 'Is there a tag tree and reading order?', 'Do forms tab in logical order?'], ['Adobe Acrobat Accessibility Checker', 'PAC (PDF Accessibility Checker)', 'Word Accessibility Checker'], ['Does the document read in the right order?', 'Are headings and tables navigable?']),
    audit: AU('PDF is untagged', '1.3.1 · 2.4.2 · 3.1.1 · Level A', 'High', 'Annual report PDF', 'No tags, no title, no language set.', 'Screen reader users cannot navigate or understand the structure.', 'Remediate from the source with styles and re-export a tagged PDF.', 'Word → File → Info → Check for Issues → Check Accessibility\nSave as PDF with “Document structure tags for accessibility”'),
    challenge: CH('Document fix', 'Match the problem to the fix.', ['Set title and language', 'Tag headers in table', 'OCR and tag', 'Set tab order'], [['The tab shows the filename as title.', 0], ['Cells read in random order.', 1], ['A scanned page has no text.', 2], ['Form fields jump around.', 3]]),
    quiz: [Q('Best starting point?', ['Accessible source document', 'Scan', 'Screenshot', 'Image'], 0, 'Fix at source.'), Q('A PDF needs…', ['Tags, title, language', 'Colour', 'Animation', 'Fonts only'], 0, 'Basic metadata and structure.'), Q('A scan needs…', ['OCR and tagging', 'Nothing', 'Zoom', 'Hover'], 0, 'Text layer.'), Q('Tool for checking?', ['PAC', 'Paint', 'Notepad', 'Excel'], 0, 'PAC/Acrobat.')]
  });

  add('elearning', {
    patterns: { do: ['Provide captions and transcripts for course media.', 'Keep keyboard focus order logical across slide layers.', 'Warn and let learners extend timers.', 'Offer a click alternative to drag-and-drop interactions.', 'Name every custom control (Storyline: set Alt text and tab order).'],
      dont: ['Use drag-and-drop as the only way to answer.', 'Auto-advance slides with a fixed timer.', 'Hide required text in images.', 'Trap focus in slide layers.'] },
    demo: '2.2.1',
    failures: [F('The timed quiz', 'A compliance quiz expired after 60 seconds per question. Learners using screen readers could not finish.', 'Remove or extend the limit.'),
      F('Drag-and-drop matching', 'A matching activity could only be completed with a mouse.', 'Provide dropdown or click-to-place alternatives.'),
      F('Focus lost in layers', 'Opening a layer left focus on the base slide.', 'Set focus order and move focus into the layer.')],
    checklist: K(['Complete the course with only the keyboard.', 'Check focus order on every slide and layer.', 'Are all media captioned?', 'Are timers adjustable?'], ['Storyline Accessibility settings', 'Rise preview with keyboard', 'axe on the published HTML'], ['NVDA/JAWS: are objects named and in order?', 'Is feedback announced?']),
    audit: AU('Drag-and-drop interaction has no alternative', '2.1.1 Keyboard · 2.5.7 Dragging Movements · Level A/AA', 'High', 'Module 3, slide 12', 'Matching can be completed only by dragging.', 'Keyboard and screen reader users cannot complete the activity.', 'Add a dropdown or click-to-place alternative.', 'Replace with: <select> next to each item, or Storyline “Pick one” interaction'),
    challenge: CH('E-learning fix', 'Which fix applies?', ['Remove/extend timer', 'Add click alternative', 'Set focus order', 'Add captions'], [['Quiz expires after 60 seconds.', 0], ['Matching needs a mouse.', 1], ['Layer opens but focus stays behind.', 2], ['Video with no captions.', 3]]),
    quiz: [Q('Drag-and-drop needs…', ['An alternative', 'Nothing', 'Colour', 'Hover'], 0, '2.5.7.'), Q('Timed activities need…', ['Adjustable limits', 'Shorter limits', 'Sound', 'Animation'], 0, '2.2.1.'), Q('Slide layers need…', ['Logical focus order', 'Random order', 'Hidden focus', 'None'], 0, '2.4.3.'), Q('Course videos need…', ['Captions', 'Autoplay', 'Loops', 'Filters'], 0, '1.2.2.')]
  });

  add('mobile', {
    patterns: { do: ['Use platform controls and accessibility APIs (labels, traits, roles).', 'Support dynamic type / text resize and both orientations.', 'Targets at least 44pt/48dp; space them.', 'Offer single-tap alternatives to custom gestures.', 'Test with VoiceOver and TalkBack.'],
      dont: ['Lock orientation without reason.', 'Use text in images that cannot scale.', 'Hide controls in gesture-only menus.', 'Rely on shake or tilt only.'] },
    demo: '2.5.8',
    failures: [F('Locked to portrait', 'An app forced portrait. A user with a mounted tablet could not rotate.', 'Support both orientations (1.3.4).'),
      F('Icon buttons without labels', 'Toolbar icons had no accessibilityLabel; VoiceOver read “button”.', 'Add labels.'),
      F('Custom swipe only', 'Deleting an email required a two-finger swipe.', 'Add a visible Delete button and a menu.')],
    checklist: K(['Rotate the device: does everything still work?', 'Set the largest text size: does it reflow?', 'Operate with VoiceOver/TalkBack.', 'Are all gestures optional?'], ['Accessibility Scanner (Android)', 'Xcode Accessibility Inspector', 'Lighthouse mobile'], ['VoiceOver rotor and TalkBack reading controls work.', 'Custom actions are exposed.']),
    audit: AU('Icon buttons have no accessible labels', '4.1.2 Name, Role, Value · Level A', 'High', 'Main toolbar', 'Buttons expose no labels to VoiceOver or TalkBack.', 'Blind users hear only “button”.', 'Set accessibilityLabel (iOS) / contentDescription (Android).', 'button.accessibilityLabel = "Share"   // iOS\nandroid:contentDescription="Share"       // Android'),
    challenge: CH('Mobile fix', 'Choose the right fix.', ['Support rotation', 'Add labels', 'Add Delete button', 'Support text scaling'], [['App locked to portrait.', 0], ['Toolbar icons read “button”.', 1], ['Two-finger swipe is the only way to delete.', 2], ['Large text gets cut off.', 3]]),
    quiz: [Q('Orientation lock fails…', ['1.3.4', '1.4.3', '2.4.7', '3.1.1'], 0, '1.3.4.'), Q('Android labels use…', ['contentDescription', 'alt', 'title', 'lang'], 0, 'contentDescription.'), Q('Custom gestures need…', ['Alternatives', 'Nothing', 'Colour', 'Animation'], 0, '2.5.1.'), Q('Text should…', ['Scale', 'Be fixed', 'Be an image', 'Be hidden'], 0, '1.4.4.')]
  });

  A.data.paths.beginner.push('forms-labels-basics', 'ecommerce-cart-status', 'spa-route-changes', 'cognitive-plain-language', 'cms-theme-basics', 'pdf-start-at-source', 'elearning-timers-keyboard', 'mobile-targets-orientation', 'charts-text-alternatives');
})(window.A11Y = window.A11Y || {});
