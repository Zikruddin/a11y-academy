/* Phase 2 lessons: Beginner path + Intermediate/Advanced/Pro+ for Media, Images and Typography hubs. */
(function (A) {
  'use strict';
  const L = (id, topic, level, minutes, criteria, title, summary, demo, body, quiz) =>
    A.data.lessons.push({ id, topic, level, minutes, criteria, title, summary, demo, body, quiz: quiz.map(([q, options, answer, why]) => ({ q, options, answer, why })) });

  /* ---------- Beginner ---------- */
  L('images-functional-icons', 'images', 'beginner', 5, ['1.1.1'], 'Icons and linked images',
    'Name what a control does, not what it looks like.', null,
    `<p>An image inside a link or button is <strong>functional</strong>: its alt text is the control's name.</p>
     <h2>Rules of thumb</h2>
     <ul><li>Magnifier icon in a Search button → <code>alt="Search"</code>, not “magnifying glass”.</li>
     <li>Logo that links home → <code>alt="Acme, home"</code>.</li>
     <li>Icon next to visible text that says the same thing → <code>alt=""</code> (avoid saying it twice).</li>
     <li>SVG icon buttons: <code>&lt;svg aria-hidden="true"&gt;</code> inside a button that has a text name or <code>aria-label</code>.</li></ul>
     <div class="callout"><strong>Test:</strong> can you tell what every button does when you tab through with images off?</div>`,
    [['What is the best alt for a magnifier icon in a Search button?', ['magnifying glass', 'Search', 'icon', '(empty alt)'], 1, 'Name the function.'],
     ['An icon sits beside the visible text “Settings”. The icon’s alt should be…', ['"settings icon"', '"" (empty)', '"gear"', 'none'], 1, 'Avoid redundancy.']]);

  L('typography-color-alone', 'typography', 'beginner', 5, ['1.4.1'], 'Never colour alone',
    'Add an icon, text or underline whenever colour carries meaning.', '1.4.1',
    `<p>About 1 in 12 men have some form of colour-vision deficiency, and everyone sees colours differently in sunlight. If colour is the only clue, some users miss it.</p>
     <h2>Fix it with a second cue</h2>
     <ul><li><strong>Errors:</strong> icon + “Error:” text, not just a red border.</li>
     <li><strong>Links in text:</strong> underline them.</li>
     <li><strong>Charts:</strong> patterns, labels or direct labelling, not just hues.</li>
     <li><strong>Required fields:</strong> an asterisk plus the words “required”.</li></ul>
     <p>Quick test: switch your display to greyscale and try to use the page.</p>`,
    [['Which is a non-colour cue?', ['A redder red', 'An error icon with text', 'A darker background', 'Italic font'], 1, 'Icon + text.'],
     ['Links inside paragraphs should be…', ['Colour only', 'Underlined', 'Hidden', 'Bold only'], 1, 'Underline.']]);

  L('typography-text-resize', 'typography', 'beginner', 5, ['1.4.4'], 'Text you can resize',
    'Why px heights and user-scalable=no break people’s zoom.', '1.4.4',
    `<p>Users must be able to zoom text to <strong>200%</strong> with nothing cut off or hidden.</p>
     <h2>Common causes of failure</h2>
     <ul><li><code>height: 44px; overflow: hidden</code> clips text. Use <code>min-height</code>.</li>
     <li><code>&lt;meta name="viewport" content="user-scalable=no"&gt;</code> disables pinch-zoom. Remove it.</li>
     <li>Fonts set in px inside components that can't flex. Prefer <code>rem</code> and <code>em</code>.</li></ul>
     <div class="callout"><strong>Test:</strong> zoom the browser to 200% and tab through every page.</div>`,
    [['Which fixes clipped text on zoom?', ['overflow: hidden', 'min-height instead of height', 'font-size: 10px', 'user-scalable=no'], 1, 'Flexible boxes.'],
     ['Required zoom level for 1.4.4?', ['100%', '150%', '200%', '300%'], 2, '200%.']]);

  L('video-player-basics', 'video', 'beginner', 5, ['1.4.2', '2.2.2', '2.3.1'], 'Accessible video players',
    'Native controls, labelled buttons, no autoplay, and nothing that flashes.', null,
    `<p>The simplest accessible player is the browser's own: <code>&lt;video controls&gt;</code>. Build a custom player only if you can match its keyboard and screen reader support.</p>
     <h2>Checklist</h2>
     <ul><li>Every control is a <code>&lt;button&gt;</code> with a text name (Play, Mute, Captions, Full screen).</li>
     <li>State is exposed: <code>aria-pressed</code> for toggles, or change the label (Play ↔ Pause).</li>
     <li>No autoplay with sound; if autoplay is muted and loops, give a pause button.</li>
     <li>Keyboard: Space/K play-pause, M mute, arrow keys seek, visible focus.</li>
     <li>Content never flashes more than three times per second.</li></ul>
     <h2>Embeds</h2><p>YouTube/Vimeo iframes need a <code>title</code> attribute and captions published on the platform.</p>`,
    [['Which is the simplest accessible start for video?', ['A custom canvas player', '<video controls>', 'A GIF', 'Flash'], 1, 'Native controls.'],
     ['An iframe embed needs…', ['A title attribute', 'Autoplay', 'No captions', 'A colour'], 0, 'A descriptive title.']]);

  L('audio-transcripts-basics', 'audio', 'beginner', 4, ['1.2.1'], 'Transcripts for audio',
    'The text equivalent that makes podcasts and recordings usable by everyone.', '1.2.1',
    `<p>A <strong>transcript</strong> turns audio into text: who is speaking, what they say, and meaningful sounds.</p>
     <ul><li>Put it on the same page, or link it directly beside the player.</li>
     <li>Use real HTML text (not an image) so screen readers and braille displays can use it.</li>
     <li>Use headings and speaker labels to make it skimmable.</li></ul>
     <p>Bonus: transcripts help search engines and everyone who prefers reading.</p>`,
    [['A transcript should be…', ['An image', 'Real text with speaker names', 'Optional marketing copy', 'A podcast summary only'], 1, 'Real text.'],
     ['Who benefits besides Deaf users?', ['Nobody', 'Deafblind users, skimmers, search engines', 'Only developers', 'Only translators'], 1, 'Many people.']]);

  L('audio-autoplay-control', 'audio', 'beginner', 4, ['1.4.2'], 'No surprise sound',
    'Autoplaying audio drowns out screen readers. Give users control.', '1.4.2',
    `<p>If audio plays for more than <strong>3 seconds</strong> automatically, users need a way to pause, stop or change its volume.</p>
     <ul><li>Best: do not autoplay. Let people press Play.</li>
     <li>If you must, put a visible Mute/Pause control first in the page.</li>
     <li>Muted autoplay video that loops still needs a pause control (2.2.2).</li></ul>`,
    [['How long can audio autoplay before control is required?', ['3 seconds', '10 seconds', '30 seconds', 'Any time'], 0, '3 seconds.'],
     ['Why is autoplay worse for screen reader users?', ['It looks bad', 'It talks over the screen reader', 'It is slow', 'It costs data'], 1, 'Competing speech.']]);

  L('animation-reduced-motion', 'animation', 'beginner', 5, ['2.2.2', '2.3.1'], 'Motion and prefers-reduced-motion',
    'Pause controls, reduced-motion CSS, and the three-flash rule.', null,
    `<p>Motion can be distracting, nauseating or dangerous. Three rules cover most of it:</p>
     <ol><li><strong>Pause, stop or hide</strong> anything that moves automatically for more than 5 seconds (2.2.2).</li>
     <li><strong>No more than three flashes</strong> in any one second (2.3.1).</li>
     <li><strong>Respect the OS setting</strong>: wrap non-essential motion in <code>@media (prefers-reduced-motion: no-preference)</code>.</li></ol>
     <h2>Example</h2>
     <p><code>@media (prefers-reduced-motion: reduce) { * { animation: none !important; } }</code> is a safety net, but better to design a calm alternative per effect.</p>`,
    [['Which media query respects the OS motion setting?', ['prefers-contrast', 'prefers-reduced-motion', 'hover', 'orientation'], 1, 'prefers-reduced-motion.'],
     ['Moving content longer than 5 seconds needs…', ['Nothing', 'A pause/stop/hide control', 'Sound', 'A border'], 1, '2.2.2.']]);

  L('live-announcements-basics', 'live', 'beginner', 5, ['4.1.3'], 'Announcing changes',
    'role=status, role=alert and live regions in plain language.', null,
    `<p>When something changes on screen without a page load — “Saved”, “3 results”, an error — screen reader users need to <em>hear</em> it. Live regions do that.</p>
     <table class="table"><caption class="sr-only">Live region choices</caption><thead><tr><th scope="col">Use</th><th scope="col">For</th></tr></thead><tbody>
       <tr><th scope="row"><code>role="status"</code></th><td>Polite updates: saved, filter results, cart</td></tr>
       <tr><th scope="row"><code>role="alert"</code></th><td>Urgent errors needing attention now</td></tr>
       <tr><th scope="row"><code>role="log"</code></th><td>Chat or append-only feeds</td></tr></tbody></table>
     <div class="callout"><strong>Gotcha:</strong> the live region must exist in the DOM <em>before</em> you update its text.</div>`,
    [['A “Saved” confirmation should use…', ['role="alert"', 'role="status"', 'tabindex=-1', 'title'], 1, 'Polite status.'],
     ['A live region should…', ['Be created with its message', 'Exist before the message appears', 'Be display:none', 'Have no role'], 1, 'Pre-exist.']]);

  /* ---------- Intermediate ---------- */
  L('video-audio-description', 'video', 'intermediate', 6, ['1.2.3', '1.2.5'], 'Audio description in practice',
    'Describe what matters, in the gaps, in the same voice.', '1.2.5',
    `<p>Audio description (AD) narrates the visual information that dialogue does not cover.</p>
     <h2>What to describe</h2><ul><li>On-screen text, charts and slides not read aloud.</li><li>Actions, scene changes, expressions that carry the story.</li><li>Who is speaking if it is unclear.</li></ul>
     <h2>How to deliver it</h2><ul><li>A second, described version of the video.</li><li>A selectable audio track.</li><li>A <code>&lt;track kind="descriptions"&gt;</code> read by a screen reader (browser support varies).</li></ul>
     <p>If your script already narrates every visual, you may need no extra AD — design videos that way from the start.</p>`,
    [['Audio description is required at…', ['A for all video', 'AA (1.2.5) for prerecorded video', 'AAA only', 'Never'], 1, '1.2.5 is AA.'],
     ['Best way to avoid needing AD?', ['Cut visuals', 'Narrate visuals in the script', 'Add music', 'Speed up'], 1, 'Self-describing scripts.']]);

  L('live-captions-webinars', 'live', 'intermediate', 5, ['1.2.4'], 'Live captions for webinars',
    'CART, live ASR and how to plan accessible live events.', '1.2.4',
    `<p>Live captions are required for live video with audio (AA).</p>
     <h2>Options</h2><ul><li><strong>CART</strong> (human captioners) — most accurate, best for technical or high-stakes events.</li>
     <li><strong>Live ASR</strong> — fast and cheap; train it with glossary terms and review accuracy.</li></ul>
     <h2>Plan ahead</h2><ul><li>Book captioners before announcing the event.</li><li>Send slides and a glossary in advance.</li><li>Tell attendees how to find the captions.</li><li>Keep captions in the recording.</li></ul>`,
    [['Most accurate live captioning?', ['Basic ASR', 'CART', 'No captions', 'Chat only'], 1, 'CART.'],
     ['Where is live captioning required?', ['Level A', 'Level AA', 'Level AAA', 'No level'], 1, 'AA.']]);

  L('images-text-in-images', 'images', 'intermediate', 5, ['1.4.5'], 'Text in images',
    'When an image of text is acceptable and when to use CSS instead.', '1.4.5',
    `<p>Images of text can’t be resized crisply, recoloured by the user or translated. Use real text styled with CSS and web fonts.</p>
     <h2>Allowed</h2><ul><li>Logotypes.</li><li>Cases where a specific presentation is essential (e.g. a font specimen).</li></ul>
     <h2>Not allowed (when CSS can do it)</h2><ul><li>Hero banners and headings.</li><li>Button labels.</li><li>Infographics whose text can be live text over an image.</li></ul>`,
    [['Which is exempt?', ['A banner', 'A logotype', 'A button', 'A paragraph'], 1, 'Logos.'],
     ['Real text can be…', ['Zoomed crisply and recoloured', 'Never styled', 'Not translated', 'Hidden'], 0, 'Flexible.']]);

  L('typography-contrast-nontext', 'typography', 'intermediate', 5, ['1.4.11'], 'Contrast for UI components',
    'Borders, icons, focus rings and chart elements need 3:1.', '1.4.11',
    `<p>Contrast is not just for text. <strong>1.4.11</strong> requires 3:1 for visual information needed to identify UI components and understand graphics.</p>
     <ul><li>Input borders and checkbox outlines.</li><li>Icons that carry meaning.</li><li>Focus indicators.</li><li>Chart lines and bars against their background.</li></ul>
     <p>Exempt: inactive (disabled) components and decorative graphics.</p>`,
    [['UI component contrast ratio?', ['1.5:1', '3:1', '4.5:1', '7:1'], 1, '3:1.'],
     ['Which is exempt?', ['Input border', 'Disabled control', 'Focus ring', 'Meaningful icon'], 1, 'Inactive controls.']]);

  L('typography-reflow-spacing', 'typography', 'intermediate', 6, ['1.4.10', '1.4.12'], 'Reflow and text spacing',
    'Make layouts survive 320px width and user spacing overrides.', '1.4.10',
    `<p><strong>Reflow (1.4.10):</strong> at 320 CSS px wide there must be no horizontal scrolling and no lost content.</p>
     <ul><li>Use flexible widths, <code>flex-wrap</code>, CSS grid with <code>minmax()</code>.</li><li>Avoid <code>min-width</code> in px on containers.</li><li>Data tables, maps and code may scroll.</li></ul>
     <p><strong>Text spacing (1.4.12):</strong> users can set line-height 1.5, paragraph 2×, letter 0.12em, word 0.16em. Nothing should clip or overlap.</p>
     <div class="callout"><strong>Try:</strong> apply the text-spacing bookmarklet to your own pages.</div>`,
    [['Reflow width?', ['320 CSS px', '768', '1024', '480'], 0, '320 px.'],
     ['Which breaks text spacing?', ['min-height', 'Fixed height + overflow hidden', 'em units', 'flex-wrap'], 1, 'Clipping.']]);

  /* ---------- Advanced / Pro+ ---------- */
  L('typography-aaa-visual-presentation', 'typography', 'advanced', 6, ['1.4.6', '1.4.8'], 'AAA reading comfort',
    '7:1 contrast, 80-character lines and user-controlled presentation.', '1.4.8',
    `<p>AAA criteria raise the bar for readers who need maximum comfort.</p>
     <ul><li><strong>1.4.6:</strong> 7:1 contrast (4.5:1 for large text).</li>
     <li><strong>1.4.8:</strong> line width ≤ 80 characters, no justified text, line spacing ≥ 1.5, paragraph spacing ≥ 1.5× line spacing, user-chosen colours.</li></ul>
     <p>A good practical target: <code>max-width: 65ch</code>, <code>line-height: 1.6</code>, left-aligned text, and a theme switcher (like this site’s!).</p>`,
    [['Max line width at AAA?', ['40', '80 characters', '120', 'Unlimited'], 1, '80.'],
     ['AAA contrast for normal text?', ['3:1', '4.5:1', '7:1', '10:1'], 2, '7:1.']]);

  L('video-extended-ad-sign', 'video', 'pro', 7, ['1.2.6', '1.2.7', '1.2.8'], 'AAA media: sign language, extended AD, media alternatives',
    'When to go beyond AA for media — and how.', '1.2.7',
    `<p>Three AAA criteria extend media access:</p>
     <ul><li><strong>1.2.6 Sign language:</strong> an interpreter for prerecorded audio. Many Deaf people’s first language is a sign language.</li>
     <li><strong>1.2.7 Extended AD:</strong> pause the video so descriptions are never cut short.</li>
     <li><strong>1.2.8 Media alternative:</strong> a full text document combining dialogue and visual descriptions — usable by deafblind people with braille displays.</li></ul>
     <h2>When it pays off</h2><p>Public information, training, government and education content, and anything aimed at Deaf or deafblind audiences. Plan these at script stage: it is far cheaper than retrofitting.</p>`,
    [['Who needs a full media alternative most?', ['Hearing sighted users', 'Deafblind braille readers', 'Gamers', 'Nobody'], 1, 'Braille users.'],
     ['Extended AD does what?', ['Speeds playback', 'Pauses video for longer descriptions', 'Adds captions', 'Removes music'], 1, 'Pauses video.']]);
})(window.A11Y = window.A11Y || {});
