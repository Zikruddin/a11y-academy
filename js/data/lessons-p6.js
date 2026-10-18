/* Phase 6 lessons: Games, Auditing, Reporting, Workflow (Beginner → Pro+). */
(function (A) {
  'use strict';
  const ul = a => '<ul>' + a.map(x => `<li>${x}</li>`).join('') + '</ul>';
  const lesson = (id, topic, level, minutes, criteria, title, summary, intro, points, quiz) => A.data.lessons.push({
    id, topic, level, minutes, criteria, title, summary, demo: null, body: `<p>${intro}</p><h2>Key points</h2>${ul(points)}`,
    quiz: quiz.map(([q, options, answer, why]) => ({ q, options, answer, why })) });

  lesson('games-canvas-basics', 'games', 'beginner', 5, ['1.1.1', '2.1.1'], 'Canvas needs a fallback', 'Real controls outside, text inside.',
    'A canvas is a bitmap: assistive tech sees nothing unless you provide it.',
    ['Give the canvas a role and name, with fallback text.', 'Put buttons and status outside the canvas.', 'Support keyboard controls.', 'Do not paint essential instructions only on the canvas.'],
    [['Canvas content is exposed by…', ['Fallback and ARIA', 'Nothing', 'Colour', 'Hover'], 0, 'You must provide it.'], ['Controls should be…', ['Real elements', 'Painted pixels', 'Images', 'Hidden'], 0, 'Native.']]);
  lesson('games-controls-cues', 'games', 'intermediate', 7, ['2.1.1', '2.5.1', '1.4.2'], 'Controls, remapping and cues', 'Flexible input and multiple channels.',
    'Players use different devices and senses.',
    ['Allow remapping and one-switch play.', 'Provide visual, audio and haptic cues together.', 'Offer click alternatives to drags and gestures.', 'Let players control or mute audio.'],
    [['Cues should use…', ['Multiple channels', 'Sound only', 'Colour only', 'Flash'], 0, 'Redundancy.'], ['Remapping helps…', ['Many players', 'Nobody', 'Only pros', 'Only mobile'], 0, 'Flexibility.']]);
  lesson('games-difficulty-cognitive', 'games', 'advanced', 8, ['2.2.1', '2.3.1', '2.5.4'], 'Time, difficulty and sensory options', 'Assist modes and safe effects.',
    'Assist options widen your audience without removing challenge.',
    ['Adjustable timers and game speed.', 'Reduced effects and no flashing over 3 per second.', 'Motion controls optional.', 'Clear, simple language in tutorials.'],
    [['Time pressure needs…', ['Adjustable limits', 'Shorter limits', 'Flash', 'Sound'], 0, '2.2.1.'], ['Motion controls must be…', ['Optional', 'Mandatory', 'Hidden', 'Loud'], 0, '2.5.4.']]);
  lesson('games-webgl-pro', 'games', 'pro', 9, ['1.1.1', '4.1.2', '4.1.3'], 'WebGL, 3D and screen readers', 'Parallel DOM and announcements.',
    'Complex scenes can mirror their state in a hidden-but-accessible DOM.',
    ['Maintain a parallel DOM tree for interactive objects.', 'Announce state changes via live regions.', 'Avoid pointer-lock traps; provide an exit.', 'Test with real assistive tech.'],
    [['A parallel DOM is…', ['An accessible mirror of the scene', 'A second game', 'A theme', 'A font'], 0, 'Semantic mirror.'], ['Pointer-lock needs…', ['An exit', 'Nothing', 'Colour', 'Sound'], 0, '2.1.2.']]);

  lesson('auditing-first-scan', 'auditing', 'beginner', 5, [], 'Your first scan', 'Run axe, then keep going.',
    'Automated scans are fast but find only part of the problems.',
    ['Run axe DevTools or WAVE on a page.', 'Treat results as a starting point.', 'Tab through the page yourself.', 'Zoom to 200% and 400%.'],
    [['Automated tools find…', ['Part of the issues', 'All issues', 'None', 'Only colours'], 0, 'Not all.'], ['After a scan, you should…', ['Test manually', 'Stop', 'Ignore', 'Delete'], 0, 'Add manual checks.']]);
  lesson('auditing-manual-keyboard', 'auditing', 'intermediate', 7, ['2.1.1', '2.4.3', '2.4.7'], 'Manual keyboard and zoom testing', 'A 10-minute pass that finds big problems.',
    'A keyboard pass catches focus, traps and operability issues tools cannot see.',
    ['Unplug the mouse and complete key tasks.', 'Check focus visibility and order.', 'Test at 200% and 400% zoom, plus text spacing.', 'Test forced-colours mode.'],
    [['Keyboard passes find…', ['Focus and operability issues', 'Typos', 'Fonts', 'Prices'], 0, 'Operability.'], ['Zoom test levels?', ['200% and 400%', '50%', '10%', '25%'], 0, 'Reflow and resize.']]);
  lesson('auditing-screen-readers', 'auditing', 'advanced', 9, ['4.1.2', '1.3.1', '4.1.3'], 'Screen reader test scripts', 'Browser × SR matrices.',
    'Different screen readers and browsers behave differently.',
    ['Pairs: NVDA+Firefox, JAWS+Chrome, VoiceOver+Safari, TalkBack+Chrome.', 'Script the journeys: navigate by headings, landmarks, forms, tables.', 'Record what was announced.', 'Compare with expected output.'],
    [['Test with…', ['Several SR/browser pairs', 'One only', 'None', 'Only Edge'], 0, 'Combinations matter.'], ['Scripts should record…', ['What was announced', 'Colours', 'Fonts', 'Ads'], 0, 'Evidence.']]);
  lesson('auditing-user-testing-pro', 'auditing', 'pro', 9, [], 'Usability testing with disabled people', 'Recruit, pay, listen.',
    'Real users reveal problems conformance testing misses.',
    ['Recruit a range of assistive technology users and pay them.', 'Test real tasks, not features.', 'Make the test environment accessible.', 'Share findings with the whole team.'],
    [['User testing participants should be…', ['Paid for their time', 'Unpaid', 'Only staff', 'Only developers'], 0, 'Value their expertise.'], ['Test…', ['Real tasks', 'Features', 'Colours', 'Fonts'], 0, 'Task success.']]);

  lesson('reporting-write-issue', 'reporting', 'beginner', 5, [], 'Write a useful issue', 'Where, what, who, how to fix.',
    'A good issue is reproducible and actionable.',
    ['Give the URL and element.', 'Describe expected vs actual.', 'Name who is affected and the WCAG criterion.', 'Suggest a fix with code.'],
    [['An issue should include…', ['Steps and a fix', 'Only a score', 'Only a screenshot', 'Nothing'], 0, 'Actionable.'], ['Always add…', ['The criterion', 'A joke', 'A logo', 'Nothing'], 0, 'Traceability.']]);
  lesson('reporting-severity-vpat', 'reporting', 'intermediate', 7, [], 'Severity and VPAT/ACR', 'Rate by impact and be specific.',
    'Severity guides priorities; an ACR communicates conformance to buyers.',
    ['Define severity by impact, frequency and workaround.', 'Use Supports / Partially / Does not support honestly.', 'Add remarks and test methods.', 'Date and version every report.'],
    [['ACR is produced from…', ['A VPAT', 'A font', 'A logo', 'A theme'], 0, 'VPAT.'], ['Severity depends on…', ['User impact', 'Colour', 'Page size', 'Opinion'], 0, 'Impact.']]);
  lesson('reporting-law-regulation', 'reporting', 'advanced', 8, [], 'ADA, 508, EN 301 549 and the EAA', 'Which rule applies where.',
    'Laws change; standards (WCAG) are the shared yardstick.',
    ['ADA (US civil rights) – courts reference WCAG.', 'Section 508 (US federal) – references WCAG 2.0 AA.', 'EN 301 549 (EU standard) – references WCAG 2.1 AA, updating.', 'European Accessibility Act – applies to many digital products and services; check current guidance.'],
    [['WCAG is…', ['A technical standard', 'A law', 'A tool', 'A browser'], 0, 'Standard.'], ['Section 508 applies to…', ['US federal ICT', 'All websites', 'EU', 'Games'], 0, 'Federal.']]);
  lesson('reporting-statements-pro', 'reporting', 'pro', 8, [], 'Accessibility statements and remediation plans', 'Be honest, specific and current.',
    'A statement shows diligence and gives users a route to help.',
    ['State the standard and conformance status.', 'List known limitations and plans.', 'Provide a contact method and response time.', 'Date it and review regularly.'],
    [['A statement must have…', ['A contact route', 'A joke', 'A logo', 'Nothing'], 0, 'Contact.'], ['Claims must be…', ['Accurate', 'Bold', 'Vague', 'Hidden'], 0, 'Honest.']]);

  lesson('workflow-shift-left', 'workflow', 'beginner', 5, [], 'Shift left', 'Cheaper to design in than bolt on.',
    'Fixing accessibility late costs many times more.',
    ['Review requirements and designs early.', 'Use accessible components.', 'Add a checklist to PRs.', 'Share ownership.'],
    [['Shift left means…', ['Test earlier', 'Test later', 'Skip', 'Outsource'], 0, 'Earlier.'], ['Accessibility belongs to…', ['The whole team', 'One person', 'Nobody', 'Legal'], 0, 'Everyone.']]);
  lesson('workflow-design-tokens-figma', 'workflow', 'intermediate', 7, ['1.4.3', '1.4.11', '2.4.7'], 'Design tokens and Figma annotations', 'Make the right thing the default.',
    'Tokens encode contrast, spacing and focus; annotations specify behaviour.',
    ['Document allowed colour pairings with ratios.', 'Define a focus ring token.', 'Annotate headings, landmarks, focus order and alt text.', 'Use accessible component specs.'],
    [['Tokens should include…', ['Tested contrast pairs', 'Random colours', 'Fonts only', 'Nothing'], 0, 'Pairs.'], ['Annotations describe…', ['Behaviour for developers', 'Branding', 'Pricing', 'Jokes'], 0, 'Specifications.']]);
  lesson('workflow-ci-linting', 'workflow', 'advanced', 8, ['4.1.2'], 'CI, linting and automated tests', 'Stop regressions automatically.',
    'Automate what can be automated; keep manual checks for the rest.',
    ['Run axe-core in unit, component and end-to-end tests.', 'Lint with eslint-plugin-jsx-a11y.', 'Fail the build on new violations.', 'Track trends over time.'],
    [['Linting catches…', ['Some problems early', 'All problems', 'None', 'Only colours'], 0, 'Early feedback.'], ['CI should…', ['Fail on regressions', 'Ignore', 'Delete', 'Hide'], 0, 'Guard quality.']]);
  lesson('workflow-procurement-training-pro', 'workflow', 'pro', 8, [], 'Procurement, training and governance', 'Scale accessibility across an organisation.',
    'Policy and training make improvements stick.',
    ['Require an ACR and testing evidence from vendors.', 'Train designers, developers, QA and content teams by role.', 'Assign owners and metrics.', 'Create a feedback and escalation path.'],
    [['Vendors should provide…', ['An ACR/VPAT', 'A logo', 'A discount', 'Nothing'], 0, 'Evidence.'], ['Training should be…', ['Role-based', 'One-size', 'Optional only', 'Absent'], 0, 'Targeted.']]);

})(window.A11Y = window.A11Y || {});
