/* Phase 6 hubs: Games/canvas, Auditing, Reporting, Workflow. Also the Pro+ badge and meta-badges for labs. */
(function (A) {
  'use strict';
  const add = (id, h) => { A.data.hubs[id] = h; const t = A.data.topicById[id];
    A.data.badges.push({ id: 'hub-' + id, name: t.name + ' Hub', desc: 'Pass the ' + t.name + ' hub quiz.', icon: t.icon, test: s => !!(s.hubs && s.hubs[id]) }); };
  const F = (title, story, fix) => ({ title, story, fix });
  const Q = (q, options, answer, why) => ({ q, options, answer, why });
  const AU = (title, criteria, severity, location, found, impact, recommendation, code) => ({ title, criteria, severity, location, found, impact, recommendation, code });
  const CH = (title, prompt, buckets, items) => ({ title, prompt, buckets, items: items.map(([t, a]) => ({ t, a })) });
  const K = (manual, tools, sr) => ({ manual, tools, sr });
  const S = '<style>body{font:15px system-ui;margin:8px}button{font:inherit;padding:6px 10px}:focus-visible{outline:3px solid #1d4ed8;outline-offset:2px}</style>';

  add('games', {
    patterns: { do: ['Give <canvas> a text fallback and keep real controls outside it.', 'Let players remap controls and offer one-switch or keyboard play.', 'Never rely on audio or colour alone for key information; add visual/haptic/text cues.', 'Offer difficulty, timing and motion options, with no flashing over 3 per second.', 'Pause automatically when focus leaves the game.'],
      dont: ['Make a game mouse-only.', 'Hide essential instructions inside the canvas.', 'Use hard real-time timing with no assist option.', 'Autoplay sound or flashing effects.'] },
    demo: { broken: S + '<canvas id="c" width="220" height="70" style="border:1px solid #888"></canvas><script>var x=document.getElementById("c").getContext("2d");x.font="16px sans-serif";x.fillText("Score: 120   Press START",10,40)</script>',
      fixed: S + '<canvas id="c" width="220" height="70" style="border:1px solid #888" role="img" aria-label="Game board: score 120">Game board. Score 120.</canvas><p id="s" role="status">Score: 120</p><button id="b">Start game</button><script>var x=document.getElementById("c").getContext("2d");x.font="16px sans-serif";x.fillText("Score: 120",10,40);document.getElementById("b").onclick=function(){document.getElementById("s").textContent="Game started. Score: 120"}</script>',
      findings: { broken: ['All text is painted on the canvas: no fallback, no real button.', 'Fails 1.1.1 and 2.1.1.'], fixed: ['Canvas has a name and fallback; a real Start button and live status sit outside it.'] }, height: 190,
      code: { broken: '<canvas id="c"></canvas>\n/* score and START drawn with fillText */', fixed: '<canvas role="img" aria-label="Game board: score 120">…</canvas>\n<p role="status">Score: 120</p>\n<button>Start game</button>' } },
    failures: [F('Mouse-only puzzle game', 'A puzzle needed precise mouse drags. Keyboard and switch players could not play at all.', 'Add keyboard controls and click-to-place; allow remapping.'),
      F('Audio-only cues', 'Danger was signalled by a sound. Deaf players missed it.', 'Add visual and text cues, and captions for speech.'),
      F('Flashing power-ups', 'An effect flashed rapidly and triggered a seizure warning complaint.', 'Keep under three flashes per second and offer a reduced-effects mode.')],
    checklist: K(['Play with the keyboard only.', 'Can you remap or simplify controls?', 'Is every sound cue also visual?', 'Can you pause, slow down or extend time?', 'Any flashing?'], ['PEAT for flashing', 'Game Accessibility Guidelines checklist', 'axe on surrounding UI'], ['Menus and HUD exposed to screen readers?', 'Status changes announced politely?']),
    audit: AU('Canvas game has no keyboard controls or text alternative', '1.1.1 · 2.1.1 · Level A', 'High', 'Game page', 'Gameplay is canvas-only with mouse input.', 'Keyboard, switch and screen reader users cannot play.', 'Add keyboard controls, real buttons outside the canvas and a text status.', '<canvas role="img" aria-label="Board: 3 of 8 pairs found"></canvas>\n<p role="status">3 of 8 pairs found</p>'),
    challenge: CH('Game barrier or fix?', 'Is each choice a barrier or a good practice?', ['Barrier', 'Good practice'], [['Danger is signalled by sound only.', 0], ['Controls can be remapped.', 1], ['A 3-second reaction window, no assist mode.', 0], ['A pause key and adjustable speed.', 1]]),
    quiz: [Q('Canvas content needs…', ['A text alternative/fallback', 'Nothing', 'Hover', 'Sound'], 0, '1.1.1.'), Q('Flashing limit?', ['3 per second', '10', '30', 'None'], 0, '2.3.1.'), Q('Controls should be…', ['Remappable', 'Fixed', 'Hidden', 'Mouse-only'], 0, 'Flexible input.'), Q('Audio cues need…', ['A visual equivalent', 'Louder volume', 'Nothing', 'Flash'], 0, 'Multiple channels.')]
  });

  add('auditing', {
    patterns: { do: ['Combine automated scans, manual keyboard review and screen reader testing.', 'Test a representative sample of templates and key user journeys.', 'Document browser × screen reader combinations tested.', 'Include people with disabilities in usability testing.', 'Re-test after fixes and record the date and version.'],
      dont: ['Rely on an automated score alone.', 'Test only the home page.', 'Test only with one screen reader.', 'Report issues without steps to reproduce.'] },
    demo: '4.1.2',
    failures: [F('The 100 Lighthouse score', 'A site scored 100 yet had no keyboard access to its menu. Automated tools find roughly a third to half of issues.', 'Always add manual testing.'),
      F('Template blindness', 'Only the homepage was audited. Checkout and account templates failed badly.', 'Sample every template and critical journey.'),
      F('Untestable report', 'Issues said “fix contrast” without location or steps. Developers could not reproduce them.', 'Include URL, steps, expected vs actual and screenshot.')],
    checklist: K(['Run axe/WAVE on each template.', 'Complete key journeys with keyboard only.', 'Test at 200% and 400% zoom, and in forced colours.', 'Test with NVDA+Firefox/Chrome, JAWS+Chrome, VoiceOver+Safari, TalkBack.'], ['axe DevTools', 'WAVE', 'Accessibility Insights', 'Colour Contrast Analyser', 'Browser DevTools accessibility tree'], ['Reading order sensible?', 'Names, roles, states announced?']),
    audit: AU('Automated-only testing missed keyboard failures', 'Process finding', 'Medium', 'QA process', 'Release sign-off used only a Lighthouse score.', 'Real barriers shipped to users.', 'Add a manual keyboard and screen reader checklist to the definition of done.', '## Definition of done\n- [ ] axe: 0 violations\n- [ ] Keyboard-only pass\n- [ ] NVDA + Firefox pass'),
    challenge: CH('Which test finds it?', 'Choose the best method.', ['Automated scan', 'Keyboard test', 'Screen reader test', 'Usability test with users'], [['Missing alt attribute.', 0], ['Focus order jumps around.', 1], ['Announcement does not make sense.', 2], ['Real users cannot complete checkout.', 3]]),
    quiz: [Q('Automated tools find…', ['Only part of the issues', 'All issues', 'None', 'Only colours'], 0, 'Roughly a third to half.'), Q('A sample should include…', ['All templates and key journeys', 'Home page only', 'One page', 'Random PDFs'], 0, 'Representative.'), Q('Record…', ['Browser × AT combinations', 'Nothing', 'Colour', 'Fonts'], 0, 'Reproducibility.'), Q('Best evidence includes…', ['Users with disabilities', 'Only developers', 'Only tools', 'Only designers'], 0, 'Real users.')]
  });

  add('reporting', {
    patterns: { do: ['Write each issue: where, what, who is affected, WCAG criterion, severity, recommendation.', 'Use consistent severity levels (Critical, High, Medium, Low).', 'Offer a working code fix, not just “make it accessible”.', 'Publish an accessibility statement with contact and date.', 'Map findings to the right regulation: ADA, Section 508, EN 301 549, EAA.'],
      dont: ['Claim full conformance without testing.', 'Report only a score.', 'Bury critical issues in a long list.', 'Use legal advice language; say what you tested.'] },
    demo: '3.3.1',
    failures: [F('The vague VPAT', 'A VPAT said “Supports” for every row without evidence. A procurement review rejected it.', 'State how each criterion was tested and add remarks for partial support.'),
      F('Missing statement', 'A site had no accessibility statement. Users had nowhere to report barriers.', 'Publish a statement with contact details.'),
      F('Severity guesswork', 'Everything was “High”. Teams could not prioritise.', 'Define severity by user impact and frequency.')],
    checklist: K(['Does every issue have a URL, steps, criterion and fix?', 'Are severities consistent?', 'Is the test scope, date and AT list recorded?', 'Is the statement linked in the footer?'], ['VPAT 2.5 template', 'Issue tracker (Jira/GitHub)', 'Accessibility statement generators (W3C)'], ['Include the AT and version used for each failure.']),
    audit: AU('No accessibility statement', 'EAA / EN 301 549 · Best practice', 'Medium', 'Site footer', 'No statement and no contact route for accessibility feedback.', 'Users cannot report barriers; the organisation cannot show diligence.', 'Publish a statement with conformance status, known limitations, contact and date.', '<footer><a href="/accessibility">Accessibility statement</a></footer>'),
    challenge: CH('Law or standard?', 'Match the item to what it is.', ['Technical standard', 'US law', 'EU law', 'Report format'], [['WCAG 2.2', 0], ['ADA', 1], ['European Accessibility Act', 2], ['VPAT / ACR', 3]]),
    quiz: [Q('An issue report needs…', ['Where, what, who, fix', 'Only a score', 'Only a screenshot', 'Nothing'], 0, 'Actionable detail.'), Q('ACR stands for…', ['Accessibility Conformance Report', 'Auto Colour Report', 'Access Control Rule', 'None'], 0, 'ACR.'), Q('EN 301 549 is…', ['The European standard referencing WCAG', 'A US law', 'A tool', 'A font'], 0, 'EU standard.'), Q('A statement should include…', ['Contact route and date', 'A logo only', 'Jokes', 'Nothing'], 0, 'Contact and status.')]
  });

  add('workflow', {
    patterns: { do: ['Bake contrast and focus into design tokens.', 'Annotate designs (headings, landmarks, focus order, alt text) in Figma.', 'Run axe-core in CI and lint JSX/templates.', 'Add accessibility to the definition of done and PR checklists.', 'Train the whole team, not only specialists.'],
      dont: ['Leave accessibility to a final audit.', 'Block releases on tools alone and ignore manual checks.', 'Buy tools or components without checking accessibility (procurement).', 'Fix in code what design caused again and again.'] },
    demo: '2.4.7',
    failures: [F('The late audit', 'Accessibility was reviewed two weeks before launch. Core components needed redesign.', 'Shift left: review designs and components early.'),
      F('Tokens without contrast', 'A palette token passed on white but failed on the brand grey background.', 'Document allowed pairings and test them in CI.'),
      F('Unvetted component library', 'A purchased UI kit shipped with keyboard traps.', 'Add accessibility criteria to procurement and request an ACR.')],
    checklist: K(['Do designs include accessibility annotations?', 'Does CI fail on new axe violations?', 'Is there a PR template with a11y checks?', 'Are components tested in isolation?'], ['axe-core + jest-axe / Playwright', 'eslint-plugin-jsx-a11y', 'Storybook a11y addon', 'Pa11y CI'], ['Include a screen reader smoke test in release QA.']),
    audit: AU('No automated accessibility checks in CI', 'Process finding', 'Medium', 'CI pipeline', 'Pull requests merge without accessibility checks.', 'Regressions reach production.', 'Add axe-core to CI and fail on new violations.', 'npx playwright test --grep @a11y\n// test: await new AxeBuilder({ page }).analyze()'),
    challenge: CH('Where does it belong?', 'Place each practice in the workflow stage.', ['Design', 'Development', 'QA / release', 'Procurement'], [['Annotate focus order in Figma.', 0], ['Lint JSX for a11y problems.', 1], ['Run a screen reader smoke test.', 2], ['Request an ACR from the vendor.', 3]]),
    quiz: [Q('“Shift left” means…', ['Test early', 'Test later', 'Skip testing', 'Test less'], 0, 'Earlier is cheaper.'), Q('Tool for CI scanning?', ['axe-core', 'Paint', 'Excel', 'Word'], 0, 'axe-core.'), Q('Design tokens should include…', ['Tested contrast pairs', 'Random colours', 'Only fonts', 'Nothing'], 0, 'Pairings.'), Q('Procurement should request…', ['An ACR/VPAT', 'A logo', 'A trial', 'Nothing'], 0, 'Evidence.')]
  });

  A.data.paths.beginner.push('games-canvas-basics', 'auditing-first-scan', 'reporting-write-issue', 'workflow-shift-left');

  // Meta badges for labs and the finish line
  A.data.badges.push(
    { id: 'lab-bughunt', name: 'Bug Hunter', desc: 'Find every bug in the Bug Hunt.', icon: '🐞', test: s => !!(s.awarded && s.awarded['lab:bughunt']) },
    { id: 'lab-keyboard', name: 'Keyboard Ninja', desc: 'Complete the Keyboard-Only Challenge.', icon: '⌨️', test: s => !!(s.awarded && s.awarded['lab:keyboard']) },
    { id: 'lab-contrast', name: 'Contrast Pro', desc: 'Fix three failing colour pairs in the Contrast Lab.', icon: '🎨', test: s => !!(s.awarded && s.awarded['lab:contrast']) },
    { id: 'lab-cards', name: 'Flash Master', desc: 'Review 20 flashcards.', icon: '🃏', test: s => !!(s.awarded && s.awarded['lab:cards']) },
    { id: 'all-86', name: 'Master of 86', desc: 'Mark all 86 criteria as learned.', icon: '🏆', test: s => Object.keys(s.criteria || {}).length >= 86 }
  );
})(window.A11Y = window.A11Y || {});
