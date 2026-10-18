/* Phase 5: mini-lessons for Principle 3 (Understandable) and Principle 4 (Robust) criteria. */
(function (A) {
  'use strict';
  const content = A.data.criteriaContent;
  const C = (num, explain, who, test, failures, techniques, demo, quiz) => {
    content[num] = { explain, who, test, failures, techniques: techniques.map(([id, label]) => ({ id, label })), demo, quiz: quiz.map(([q, options, answer, why]) => ({ q, options, answer, why })) };
  };
  const demo = (broken, fixed, fb, ff, height, code) => ({ broken, fixed, findings: { broken: fb, fixed: ff }, height: height || 150, code });
  const S = '<style>body{font:15px system-ui;margin:8px}input,select,button{font:inherit;padding:6px 8px}label{display:block;margin-top:8px}.err{color:#b91c1c}:focus-visible{outline:3px solid #1d4ed8;outline-offset:2px}</style>';

  /* ---------- 3.1 Readable ---------- */
  C('3.1.1', 'The default human language of each page is set programmatically, so screen readers choose the right voice and pronunciation.',
    ['Screen reader users', 'People using translation tools', 'People with dyslexia using text-to-speech'],
    ['View source: does <html> have a valid lang attribute?', 'Does it match the actual content language?', 'Test with a screen reader: is the voice correct?'],
    ['H57 missing: no lang on <html>', 'lang="en" on a Spanish page', 'Invalid codes like lang="english"'],
    [['H57', 'Using the language attribute on the HTML element']],
    demo(S + '<p style="font-family:monospace;font-size:13px">&lt;html&gt;<br>&lt;body&gt; Bonjour tout le monde…</p><p lang="fr">Bonjour tout le monde</p>', S + '<p style="font-family:monospace;font-size:13px">&lt;html lang="fr"&gt;<br>&lt;body&gt; Bonjour tout le monde…</p><p lang="fr">Bonjour tout le monde</p>',
      ['No lang: a screen reader may read French with an English voice.', 'Fails 3.1.1 (H57).'], ['lang="fr" tells assistive tech which voice to use.'], 130,
      { broken: '<html>', fixed: '<html lang="fr">' }),
    [['Where is the page language set?', ['<body>', '<html lang>', '<meta charset>', '<title>'], 1, 'On the html element.'], ['Which is a valid code?', ['english', 'en', 'EN-us-XX', 'eng-lish'], 1, 'BCP 47 codes like en.']]);
  C('3.1.2', 'AA: passages or phrases in a different language from the page are marked with their own lang attribute (proper names, technical terms and words used in the surrounding language are exempt).',
    ['Screen reader users', 'Text-to-speech users'],
    ['Find foreign phrases and quotes', 'Do they have lang="xx"?', 'Listen with a screen reader for wrong pronunciation'],
    ['A French quote read with English pronunciation'],
    [['H58', 'Using language attributes to identify changes in the human language']],
    demo(S + '<p>As the French say, <q>c\'est la vie</q>.</p>', S + '<p>As the French say, <q lang="fr">c\'est la vie</q>.</p>', ['The phrase is read with the page’s English voice.', 'Fails 3.1.2.'], ['lang="fr" switches the pronunciation.'], 100,
      { broken: '<q>c\'est la vie</q>', fixed: '<q lang="fr">c\'est la vie</q>' }),
    [['Which attribute marks a French phrase?', ['lang="fr"', 'dir="fr"', 'title="fr"', 'xml'], 0, 'lang.'], ['3.1.2 level?', ['A', 'AA', 'AAA', 'None'], 1, 'AA.']]);
  C('3.1.3', 'AAA: a mechanism is available for identifying specific definitions of unusual words, idioms and jargon.',
    ['People with cognitive or learning disabilities', 'Non-native speakers'],
    ['Find jargon and idioms', 'Is there a glossary, inline definition or dfn/abbr?'],
    ['Industry jargon with no explanation'],
    [['G101', 'Providing the definition of a word or phrase used in an unusual or restricted way'], ['G62', 'Providing a glossary']],
    demo(S + '<p>We use a <b>blue-green deployment</b> for every release.</p>', S + '<p>We use a <dfn>blue-green deployment</dfn> (two identical environments, switched at release) for every release. <a href="#">Glossary</a></p>', ['Jargon with no help.', 'Not met (AAA).'], ['Inline definition plus a glossary link.'], 110),
    [['A mechanism could be…', ['A glossary', 'A bigger font', 'Colour', 'Video'], 0, 'Glossary or inline definitions.'], ['Level?', ['A', 'AA', 'AAA', 'None'], 2, 'AAA.']]);
  C('3.1.4', 'AAA: the expanded form or meaning of abbreviations is available.',
    ['People with cognitive disabilities', 'Screen reader users', 'Anyone new to a field'],
    ['Find abbreviations; is the first use expanded?'],
    ['“WCAG” never explained'],
    [['G102', 'Providing the expansion or explanation of an abbreviation'], ['H28', 'Providing definitions for abbreviations by using the abbr element']],
    demo(S + '<p>Follow WCAG for all pages.</p>', S + '<p>Follow <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> (Web Content Accessibility Guidelines) for all pages.</p>', ['Unexplained abbreviation.', 'Not met (AAA).'], ['Expanded at first use.'], 100),
    [['Best practice?', ['Expand at first use', 'Never use abbreviations', 'Use title only', 'Use colour'], 0, 'Write it out first.'], ['abbr title alone is…', ['Reliable for touch users', 'Not reliable by itself', 'Required', 'Banned'], 1, 'Many users cannot see titles.']]);
  C('3.1.5', 'AAA: when text needs more than lower-secondary reading ability, supplemental content or a simpler version is available.',
    ['People with dyslexia or cognitive disabilities', 'Non-native speakers'],
    ['Run a readability score (Flesch-Kincaid)', 'Is there a summary or Easy Read version?'],
    ['Dense legal text with no plain-language summary'],
    [['G86', 'Providing a text summary that can be understood by people with lower secondary education reading ability'], ['G103', 'Providing visual illustrations']],
    demo(S + '<p>The aforementioned party shall indemnify the counterparty notwithstanding…</p>', S + '<p><b>In short:</b> If something goes wrong because of you, you pay for it.</p><details><summary>Full legal text</summary>The aforementioned party shall…</details>', ['No plain version.', 'Not met (AAA).'], ['Summary first, full text available.'], 130),
    [['A good supplement?', ['Plain-language summary', 'Smaller font', 'Autoplay', 'Image only'], 0, 'Summary or Easy Read.'], ['Target reading level?', ['University', 'Lower secondary', 'PhD', 'None'], 1, 'About lower secondary.']]);
  C('3.1.6', 'AAA: a mechanism is available for identifying the specific pronunciation of words where meaning is ambiguous without it.',
    ['Screen reader users', 'People learning to read'],
    ['Find heteronyms like “read” and “lead” where pronunciation changes meaning'],
    ['“Lead” read incorrectly in a safety instruction'],
    [['G120', 'Providing the pronunciation immediately following the word'], ['G121', 'Linking to pronunciations']],
    demo(S + '<p>The workers will lead the group.</p>', S + '<p>The workers will lead (rhymes with “feed”) the group.</p>', ['Ambiguous.', 'Not met (AAA).'], ['Pronunciation given.'], 100),
    [['Applies when…', ['Meaning is ambiguous without pronunciation', 'Always', 'Never', 'On video only'], 0, 'Only where needed.'], ['Level?', ['A', 'AA', 'AAA', 'None'], 2, 'AAA.']]);

  /* ---------- 3.2 Predictable ---------- */
  C('3.2.1', 'Receiving focus does not trigger a change of context (new window, form submission, moving focus).',
    ['Keyboard and screen reader users', 'People with cognitive disabilities'],
    ['Tab through all controls: does anything navigate, open or submit on focus alone?'],
    ['F52: opening a new window on focus', 'onfocus handlers that move focus or submit'],
    [['G107', 'Using “activate” rather than “focus” as the trigger for changes of context'], ['F55', 'Failure: using script to remove focus when focus is received']],
    demo(S + '<input aria-label="Name" onfocus="document.getElementById(\'o\').textContent=\'Focus moved you away! (page jumped)\'"><p id="o" role="status"></p>', S + '<input aria-label="Name"><p id="o" role="status">Focusing does nothing unexpected.</p>', ['Focus alone triggers a change.', 'Fails 3.2.1.'], ['Nothing happens until the user activates a control.'], 110,
      { broken: 'field.addEventListener("focus", () => location.href = "/next");', fixed: '/* Do not change context on focus. Use a button. */' }),
    [['Focus should…', ['Submit forms', 'Never cause a context change', 'Open windows', 'Move away'], 1, 'Change on activation only.'], ['Which is a context change?', ['Opening a new window', 'Highlighting a button', 'Hover colour', 'Typing'], 0, 'New window.']]);
  C('3.2.2', 'Changing a setting or entering data does not automatically cause a context change unless users are told beforehand.',
    ['Keyboard and screen reader users', 'People with cognitive disabilities'],
    ['Change selects, radios and checkboxes: does the page navigate or submit?'],
    ['F36: auto-submit when the last field is filled', 'Select onchange navigates away'],
    [['G13', 'Describing what will happen before a change to a form control that causes a change of context'], ['H32', 'Providing submit buttons']],
    demo(S + '<label>Country <select onchange="document.getElementById(\'o\').textContent=\'Page navigated on change!\'"><option>Choose</option><option>India</option><option>UK</option></select></label><p id="o" role="status"></p>', S + '<label>Country <select><option>Choose</option><option>India</option><option>UK</option></select></label> <button onclick="document.getElementById(\'o\').textContent=\'Go pressed\'">Go</button><p id="o" role="status"></p>', ['Changing the select navigates immediately; arrow-key users can only reach the first options.', 'Fails 3.2.2.'], ['A Go button makes the action explicit.'], 130,
      { broken: '<select onchange="location=this.value">', fixed: '<select>…</select>\n<button>Go</button>' }),
    [['Safe pattern?', ['onchange navigation', 'A Go button', 'Auto-submit', 'Hover'], 1, 'Explicit button.'], ['Warning in advance is…', ['Not enough', 'An accepted alternative', 'Banned', 'AAA'], 1, 'Telling users beforehand is allowed.']]);
  C('3.2.3', 'AA: navigation mechanisms repeated on multiple pages appear in the same relative order each time.',
    ['Screen reader and keyboard users', 'People with cognitive disabilities'],
    ['Compare nav order across five pages'],
    ['Menu items reordered between sections'],
    [['G61', 'Presenting repeated components in the same relative order each time they appear']],
    demo(S + '<p>Page A: Home · Shop · About<br>Page B: Shop · About · Home</p>', S + '<p>Page A: Home · Shop · About<br>Page B: Home · Shop · About</p>', ['Order changes.', 'Fails 3.2.3.'], ['Consistent order.'], 100),
    [['Consistent navigation means…', ['Same relative order', 'Same colour', 'Same text', 'Same page'], 0, 'Same relative order.'], ['Level?', ['A', 'AA', 'AAA', 'None'], 1, 'AA.']]);
  C('3.2.4', 'AA: components with the same function are identified consistently across pages.',
    ['Screen reader users', 'People with cognitive disabilities'],
    ['Check that the same icon/function has the same name everywhere'],
    ['Search labelled “Search” on one page and “Find” on another'],
    [['G197', 'Using labels, names, and text alternatives consistently for content that has the same functionality']],
    demo(S + '<p>Page A: <button>Search</button><br>Page B: <button>Find</button></p>', S + '<p>Page A: <button>Search</button><br>Page B: <button>Search</button></p>', ['Same function, different name.', 'Fails 3.2.4.'], ['Same name everywhere.'], 110),
    [['Same function should have…', ['The same name', 'Different icons', 'Different colours', 'Random labels'], 0, 'Consistent identification.'], ['Level?', ['A', 'AA', 'AAA', 'None'], 1, 'AA.']]);
  C('3.2.5', 'AAA: changes of context happen only on user request, or a mechanism lets users turn them off.',
    ['People with cognitive or motor disabilities'],
    ['Look for auto-redirects, pop-ups and refreshes'],
    ['Auto-redirect after 5 seconds', 'Pop-up on page load'],
    [['G110', 'Using an instant client-side redirect'], ['SCR19', 'Using an onchange event on a select element without causing a change of context']],
    demo(S + '<p>Redirecting you in 5 seconds…</p>', S + '<p>This page has moved. <a href="#">Go to the new page</a></p>', ['Automatic redirect.', 'Not met (AAA).'], ['The user decides.'], 100),
    [['Context changes should happen…', ['On user request', 'Automatically', 'On a timer', 'On scroll'], 0, 'On request.'], ['Level?', ['A', 'AA', 'AAA', 'None'], 2, 'AAA.']]);
  C('3.2.6', 'New in 2.2 (A): help mechanisms (contact details, chat, FAQ, self-help) that repeat across pages appear in the same relative place.',
    ['People with cognitive disabilities', 'Screen reader users', 'Anyone stuck on a task'],
    ['Check where Help/Contact appears across several pages'],
    ['Help link in the header on one page and the footer on another'],
    [['G220', 'Providing a contact-us link in a consistent location']],
    demo(S + '<p>Page A: Help in header<br>Page B: Help in footer</p>', S + '<p>Page A: Help in header<br>Page B: Help in header</p>', ['Help moves around.', 'Fails 3.2.6.'], ['Same place each time.'], 100),
    [['3.2.6 is new in…', ['2.2', '2.1', '2.0', '1.0'], 0, 'WCAG 2.2.'], ['Level?', ['A', 'AA', 'AAA', 'None'], 0, 'A.']]);

  /* ---------- 3.3 Input assistance ---------- */
  C('3.3.1', 'If an input error is automatically detected, the item in error is identified and the error is described to the user in text.',
    ['Screen reader users', 'Colour-blind users', 'People with cognitive disabilities'],
    ['Submit the form with errors: is each error in text, near the field and programmatically linked?'],
    ['Red border only', 'Error not announced', 'Generic “Invalid input”'],
    [['G83', 'Providing text descriptions to identify required fields that were not completed'], ['G84', 'Providing a text description when the user provides information that is not in the list'], ['ARIA21', 'Using aria-invalid to indicate an error field']],
    demo(S + '<label>Email<input style="border:2px solid red" value="bob"></label>', S + '<label for="e">Email</label><input id="e" value="bob" aria-invalid="true" aria-describedby="m" style="border:2px solid #b91c1c"><p id="m" class="err" role="alert">Error: enter an email like name@example.com.</p>', ['Colour-only error.', 'Fails 3.3.1.'], ['Text error linked with aria-describedby and announced.'], 140,
      { broken: '<input style="border:red">', fixed: '<input aria-invalid="true" aria-describedby="m">\n<p id="m" role="alert">Error: enter an email like name@example.com.</p>' }),
    [['Errors must be described in…', ['Colour', 'Text', 'Sound', 'Icon only'], 1, 'Text.'], ['Link error to field with…', ['aria-describedby', 'alt', 'lang', 'title'], 0, 'aria-describedby.']]);
  C('3.3.2', 'Labels or instructions are provided when content requires user input.',
    ['Everyone, especially screen reader and voice users', 'People with cognitive disabilities'],
    ['Does each field have a visible persistent label?', 'Are formats and requirements stated up front?'],
    ['Placeholder as the only label', 'Required fields not indicated'],
    [['H44', 'Using label elements to associate text labels with form controls'], ['G89', 'Providing expected data format and example'], ['G131', 'Providing descriptive labels']],
    demo(S + '<input placeholder="Date of birth">', S + '<label for="d">Date of birth (DD/MM/YYYY)</label><input id="d" autocomplete="bday">', ['Placeholder vanishes; no format.', 'Fails 3.3.2.'], ['Visible label with format.'], 110,
      { broken: '<input placeholder="Date of birth">', fixed: '<label for="d">Date of birth (DD/MM/YYYY)</label>\n<input id="d" autocomplete="bday">' }),
    [['Placeholder alone is…', ['A label', 'Not a substitute for a label', 'Required', 'Best'], 1, 'It disappears.'], ['Instructions should be…', ['Before the field', 'Hidden', 'After submit', 'Optional'], 0, 'Up front.']]);
  C('3.3.3', 'AA: when an error is detected and a suggestion is known, the suggestion is provided (unless it harms security or purpose).',
    ['Dyslexic users', 'People with cognitive disabilities', 'Everyone'],
    ['Trigger errors: does the message say how to fix it?'],
    ['“Invalid date” with no format'],
    [['G85', 'Providing a text description when user input falls outside the required format or values'], ['G177', 'Providing suggested correction text']],
    demo(S + '<p class="err">Error: Invalid date.</p>', S + '<p class="err">Error: Enter the date as DD/MM/YYYY, for example 05/03/2026.</p>', ['No fix offered.', 'Fails 3.3.3.'], ['Tells users how to fix it.'], 90),
    [['A good error says…', ['What is wrong and how to fix it', 'Invalid', 'Error', 'Oops'], 0, 'Name and fix.'], ['Level?', ['A', 'AA', 'AAA', 'None'], 1, 'AA.']]);
  C('3.3.4', 'AA: for pages causing legal commitments, financial transactions or data changes, submissions are reversible, checked, or confirmed.',
    ['Everyone, especially people with cognitive or motor disabilities'],
    ['Does the checkout offer review, confirm or undo?'],
    ['One-click purchase with no review'],
    [['G98', 'Providing the ability for the user to review and correct answers before submitting'], ['G155', 'Providing a checkbox in addition to a submit button'], ['G164', 'Providing a stated time within which an online request can be cancelled']],
    demo(S + '<button onclick="document.getElementById(\'o\').textContent=\'Order placed. No review.\'">Buy now</button><p id="o" role="status"></p>', S + '<p>Review: 1× Lamp, $40</p><button onclick="document.getElementById(\'o\').textContent=\'Order placed. You can cancel within 24h.\'">Confirm order</button><p id="o" role="status"></p>', ['No review or cancel.', 'Fails 3.3.4.'], ['Review step and cancel window.'], 140),
    [['One of the three safeguards:', ['Reversible', 'Faster', 'Colourful', 'Silent'], 0, 'Reversible, checked or confirmed.'], ['Applies to…', ['Legal/financial/data changes', 'All text', 'Videos', 'Images'], 0, 'Those transactions.']]);
  C('3.3.5', 'AAA: context-sensitive help is available.',
    ['People with cognitive disabilities'],
    ['Is help available next to complex fields?'],
    ['Complex field with no explanation'],
    [['G71', 'Providing a help link on every Web page'], ['G193', 'Providing help by an assistant in the Web page']],
    demo(S + '<label>VAT number<input></label>', S + '<label>VAT number<input aria-describedby="h"></label><p id="h" class="small">Found on your invoice, 9–12 digits.</p>', ['No help.', 'Not met (AAA).'], ['Inline help.'], 110),
    [['Help should be…', ['Close to the field', 'Hidden', 'Elsewhere', 'Audio only'], 0, 'Context-sensitive.'], ['Level?', ['A', 'AA', 'AAA', 'None'], 2, 'AAA.']]);
  C('3.3.6', 'AAA: all submissions are reversible, checked or confirmed (not only legal/financial).',
    ['Everyone'],
    ['Check every form for review/confirm/undo'],
    ['Profile form saves with no way back'],
    [['G98', 'Providing the ability for the user to review and correct answers before submitting']],
    demo(S + '<button>Save profile</button>', S + '<button>Review changes</button> <button>Save</button>', ['Immediate and final.', 'Not met (AAA).'], ['Review before saving.'], 90),
    [['3.3.6 extends 3.3.4 to…', ['All submissions', 'Images', 'Video', 'Audio'], 0, 'All pages.'], ['Level?', ['A', 'AA', 'AAA', 'None'], 2, 'AAA.']]);
  C('3.3.7', 'New in 2.2 (A): information already entered by or provided to the user is auto-populated or selectable, rather than re-entered in the same process.',
    ['People with cognitive or motor disabilities', 'Anyone typing on mobile'],
    ['Walk through a multi-step process: is anything asked twice?'],
    ['Billing address typed again for shipping'],
    [['G221', 'Providing data from a previous step to help avoid re-entry'], ['G15', 'Using a checkbox to enable the use of previously entered data']],
    demo(S + '<label>Shipping address<input></label><label>Billing address<input></label>', S + '<label>Shipping address<input value="12 Park St"></label><label><input type="checkbox" checked> Billing address same as shipping</label>', ['Same data typed twice.', 'Fails 3.3.7.'], ['Reuse option.'], 140),
    [['3.3.7 is about…', ['Redundant entry', 'Contrast', 'Captions', 'Motion'], 0, 'Redundant entry.'], ['Allowed exception?', ['Security re-entry of a password', 'Names', 'Emails', 'Addresses'], 0, 'Security can require re-entry.']]);
  C('3.3.8', 'New in 2.2 (AA): authentication does not require a cognitive function test (remembering, transcribing, puzzles) unless an alternative or help is provided.',
    ['People with dyslexia, memory or cognitive disabilities', 'Everyone using a password manager'],
    ['Can you paste passwords? Does a password manager work?', 'Are CAPTCHAs avoidable?'],
    ['Paste blocked on password fields', 'Image-puzzle CAPTCHA with no alternative'],
    [['G218', 'Email link authentication'], ['H100', 'Providing properly marked up email and password inputs']],
    demo(S + '<label>Password<input type="password" onpaste="return false;"></label>', S + '<label for="p">Password</label><input id="p" type="password" autocomplete="current-password">', ['Paste blocked: password managers fail.', 'Fails 3.3.8.'], ['Paste and autofill allowed.'], 120,
      { broken: '<input type="password" onpaste="return false">', fixed: '<input type="password" autocomplete="current-password">' }),
    [['A fix for blocked paste?', ['Allow paste and autocomplete', 'Block harder', 'Hide field', 'Use image'], 0, 'Allow password managers.'], ['Level?', ['A', 'AA', 'AAA', 'None'], 1, 'AA.']]);
  C('3.3.9', 'AAA: authentication requires no cognitive function test at all, even with an object-recognition or personal-content exception.',
    ['People with cognitive disabilities'],
    ['Look for any recognition or puzzle step'],
    ['Select all images with traffic lights'],
    [['G218', 'Email link authentication']],
    demo(S + '<p>Select all squares with traffic lights.</p>', S + '<p>We emailed you a sign-in link.</p>', ['Visual puzzle.', 'Not met (AAA).'], ['Link authentication.'], 100),
    [['3.3.9 differs from 3.3.8 by…', ['Removing the object-recognition exception', 'Adding colour', 'Nothing', 'Adding audio'], 0, 'Stricter.'], ['Level?', ['A', 'AA', 'AAA', 'None'], 2, 'AAA.']]);

  /* ---------- 4.1 Compatible ---------- */
  C('4.1.2', 'Every UI component has a programmatic name and role, and its states, properties and values can be set and announced by assistive technology.',
    ['Screen reader users', 'Voice-control users', 'Switch users'],
    ['Inspect the accessibility tree: does each control have a role, name and state?', 'Use axe/Lighthouse for names; verify custom widgets by hand'],
    ['F59: div with onclick and no role', 'Icon button without a name', 'Custom checkbox with no aria-checked'],
    [['ARIA14', 'Using aria-label to provide an invisible label'], ['ARIA16', 'Using aria-labelledby to provide a name'], ['G108', 'Using markup features to expose the name and role'], ['F59', 'Failure: using script to make div or span a user interface control']],
    demo(S + '<div onclick="document.getElementById(\'o\').textContent=\'Clicked\'" style="display:inline-block;border:1px solid #333;padding:6px 10px;cursor:pointer">🔍</div><span id="o" role="status"></span>', S + '<button aria-label="Search" onclick="document.getElementById(\'o\').textContent=\'Clicked\'">🔍</button> <span id="o" role="status"></span>', ['No role, no name, not focusable.', 'Fails 4.1.2 (F59).'], ['Native button with a name.'], 100,
      { broken: '<div onclick="go()">🔍</div>', fixed: '<button aria-label="Search" onclick="go()">🔍</button>' }),
    [['Every control needs…', ['Name, role, value', 'Colour', 'Animation', 'Tooltip'], 0, 'Name, role, state/value.'], ['Best first choice?', ['Native element', 'div + ARIA', 'Canvas', 'Image'], 0, 'Native first.']]);
  C('4.1.3', 'AA: status messages can be programmatically determined through role or properties so they are presented to users without receiving focus.',
    ['Screen reader users', 'Screen magnifier users'],
    ['Trigger search results, errors and success messages: are they announced?'],
    ['“3 results found” updated silently', 'Toast with no live region'],
    [['ARIA22', 'Using role=status to present status messages'], ['ARIA19', 'Using ARIA role=alert for error messages'], ['ARIA23', 'Using role=log to identify sequential information updates']],
    demo(S + '<button onclick="document.getElementById(\'o\').textContent=\'3 results found\'">Search</button><p id="o"></p>', S + '<button onclick="document.getElementById(\'o\').textContent=\'3 results found\'">Search</button><p id="o" role="status"></p>', ['Result text appears silently.', 'Fails 4.1.3.'], ['role=status announces politely.'], 110,
      { broken: '<p id="out"></p>', fixed: '<p id="out" role="status"></p>' }),
    [['A polite announcement uses…', ['role="status"', 'role="button"', 'tabindex', 'alt'], 0, 'role=status.'], ['Error messages that interrupt use…', ['role="alert"', 'role="img"', 'lang', 'title'], 0, 'role=alert.']]);
})(window.A11Y = window.A11Y || {});
