/* Rich hub content (Phase 2 hubs). A hub with an entry here shows: patterns, live demo,
   real-life failures, testing checklist, audit snippet, challenge and quiz + badge.
   demo: either a criterion number (reuses its demo) or an inline demo object.
   challenge: classify each item into a bucket (keyboard/screen-reader friendly selects). */
(function (A) {
  'use strict';
  A.data.hubs = {

    video: {
      patterns: {
        do: ['Publish human-checked closed captions with <track kind="captions">.', 'Link a transcript (with speaker names and sounds) next to the player.', 'Offer audio description for visuals that matter — a described version or a descriptions track.', 'Use native controls, or a player whose buttons are labelled, focusable and operable by keyboard.'],
        dont: ['Ship unreviewed auto-captions as “done”.', 'Autoplay with sound, or autoplay with no pause control.', 'Hide the controls until the mouse moves.', 'Use more than three flashes in any one second.']
      },
      demo: '1.2.2',
      failures: [
        { title: 'The onboarding video nobody could follow', story: 'A company publishes onboarding videos with raw auto-generated captions. Product names and technical terms come out as nonsense, speakers are never identified, and a new Deaf hire cannot complete training.', fix: 'Edit captions for accuracy, identify speakers, include meaningful sounds, and review before publishing.' },
        { title: 'The demo that said “click here”', story: 'A software demo narrates “then click here and choose that option” while the mouse moves on screen. Blind users hear the sentence but never learn what “here” was.', fix: 'Add audio description, or script the narration to name every control and result.' },
        { title: 'The player with hover-only controls', story: 'A custom player hides its buttons until the pointer hovers. Keyboard users tab into the video and nothing appears to take focus.', fix: 'Make controls visible on focus, give each a text name, and support Space/K to play and M to mute.' }
      ],
      checklist: {
        manual: ['Watch with sound off: can you follow everything via captions?', 'Listen with eyes closed: is anything important visual-only?', 'Operate every player control with the keyboard alone.', 'Check there is no flash more than three times per second.'],
        tools: ['axe DevTools / Lighthouse (flag missing <track> and unlabelled controls)', 'Subtitle Edit or Amara for caption QA', 'Photosensitive Epilepsy Analysis Tool (PEAT) for flashing'],
        sr: ['NVDA + Firefox/Chrome: are Play, Mute, Captions and Volume announced with names and states?', 'VoiceOver + Safari: does the transcript link read sensibly?', 'JAWS: are caption toggles reachable?']
      },
      audit: { title: 'Video has no captions', criteria: '1.2.2 Captions (Prerecorded) · Level A', severity: 'High', location: 'https://example.com/training — “Welcome” video', found: 'The <video> element has no <track kind="captions"> and no burned-in captions. The audio track contains speech.', impact: 'Deaf and hard-of-hearing users cannot access the speech content.', recommendation: 'Add an accurate, synchronised captions file (WebVTT) with speaker identification and meaningful sounds, and expose the CC control in the player.', code: '<video controls src="welcome.mp4">\n  <track kind="captions" src="welcome.en.vtt" srclang="en" label="English">\n</video>' },
      challenge: { title: 'Match the need to the alternative', prompt: 'For each viewer, choose the media alternative that serves them best.', buckets: ['Captions', 'Audio description', 'Transcript', 'Sign language'], items: [
        { t: 'A Deaf viewer wants to follow the dialogue in a prerecorded video.', a: 0 },
        { t: 'A blind viewer cannot see the chart that appears on screen.', a: 1 },
        { t: 'A deafblind reader uses a braille display.', a: 2 },
        { t: 'A Deaf person whose first language is a sign language.', a: 3 }
      ] },
      quiz: [
        { q: 'Which is required at Level A for prerecorded video with audio?', options: ['Sign language', 'Captions', 'Extended audio description', 'Live captions'], answer: 1, why: '1.2.2 Captions (Prerecorded) is Level A.' },
        { q: 'Autoplaying audio longer than 3 seconds needs…', options: ['Nothing', 'A way to pause, stop or control volume', 'Captions', 'A transcript'], answer: 1, why: '1.4.2 Audio Control.' },
        { q: 'Which element provides a captions file?', options: ['<caption>', '<track>', '<source>', '<figcaption>'], answer: 1, why: '<track kind="captions"> with a WebVTT file.' },
        { q: 'No more than how many flashes per second?', options: ['1', '3', '10', 'No limit'], answer: 1, why: '2.3.1: three flashes or below threshold.' }
      ]
    },

    audio: {
      patterns: {
        do: ['Provide a transcript for every podcast or recording.', 'Start silent. Let people press play.', 'Keep background music at least 20 dB below speech, or offer a no-music version.', 'Make visible button labels match their accessible names so voice control works.'],
        dont: ['Autoplay music on page load.', 'Hide the pause/mute control inside a menu.', 'Mix loud music under narration.', 'Label a visible “Search” button aria-label="Find".']
      },
      demo: '1.4.2',
      failures: [
        { title: 'The homepage that sang over the screen reader', story: 'A restaurant site starts a music loop on load. A blind visitor’s screen reader is drowned out and the stop control is the last element in the DOM.', fix: 'Remove autoplay; if needed, put a clearly labelled mute button first in the tab order.' },
        { title: 'The podcast archive with no text', story: 'An organisation hosts 200 episodes as audio only. Deaf visitors, and anyone searching for a quote, get nothing.', fix: 'Publish transcripts alongside each episode and link them from the player.' }
      ],
      checklist: {
        manual: ['Load the page with sound on: does anything play by itself?', 'Is there a transcript for each audio-only item?', 'Can you mute or pause from the keyboard?'],
        tools: ['axe / Lighthouse (autoplay and media checks)', 'Loudness meters (e.g. Youlean) to compare speech vs music levels'],
        sr: ['Check that page audio does not mask NVDA/JAWS speech.', 'Check the audio element is announced with a name and its play state.']
      },
      audit: { title: 'Autoplaying audio cannot be stopped', criteria: '1.4.2 Audio Control · Level A', severity: 'High', location: 'Home page', found: 'A background track plays automatically for over 3 seconds. No pause, stop or volume control is provided.', impact: 'Screen reader users cannot hear their speech output; people with attention difficulties cannot concentrate.', recommendation: 'Remove autoplay, or provide a visible, keyboard-operable mute/pause control as the first interactive element.', code: '<audio src="theme.mp3" controls></audio> <!-- no autoplay -->' },
      challenge: { title: 'Which criterion is at stake?', prompt: 'Match each situation to the issue it triggers.', buckets: ['Needs a transcript (1.2.1)', 'Needs audio control (1.4.2)', 'Background too loud (1.4.7)', 'Label in Name (2.5.3)'], items: [
        { t: 'A podcast episode page with only an audio player.', a: 0 },
        { t: 'The homepage plays music as soon as it loads.', a: 1 },
        { t: 'Narration is hard to follow over a loud music bed.', a: 2 },
        { t: 'A button reads “Search” but its aria-label is “Find items”.', a: 3 }
      ] },
      quiz: [
        { q: 'What does a transcript serve?', options: ['Only SEO', 'Deaf, deafblind and many other users', 'Only developers', 'Nobody'], answer: 1, why: 'It is the text equivalent for audio.' },
        { q: 'Best default for audio on a page?', options: ['Autoplay loop', 'Silent until the user chooses to play', 'Autoplay at low volume', 'Hidden audio'], answer: 1, why: 'Do not autoplay.' },
        { q: 'AAA background audio should sit how far below speech?', options: ['2 dB', '10 dB', '20 dB', '40 dB'], answer: 2, why: '1.4.7: at least 20 dB.' },
        { q: 'Voice-control users rely on…', options: ['Colour', 'The accessible name containing the visible label', 'Hover', 'Title tooltips'], answer: 1, why: '2.5.3 Label in Name.' }
      ]
    },

    animation: {
      patterns: {
        do: ['Respect prefers-reduced-motion by removing or simplifying non-essential motion.', 'Give auto-playing movement longer than 5 seconds a visible pause/stop/hide control.', 'Keep carousels paused by default or add a clear pause button.', 'Test any flashing content with PEAT.'],
        dont: ['Auto-advance carousels with no pause.', 'Use heavy parallax or zoom effects with no opt-out.', 'Flash more than three times per second.', 'Hide the pause control behind hover.']
      },
      demo: {
        broken: '<style>.pulse{width:70px;height:70px;border-radius:50%;background:#4338ca;animation:p 1s infinite alternate}@keyframes p{from{transform:scale(.6)}to{transform:scale(1.2)}}</style>\n<div class="pulse"></div><p class="note">Moves forever. No way to stop it.</p>',
        fixed: '<style>.pulse{width:70px;height:70px;border-radius:50%;background:#4338ca;animation:p 1s infinite alternate}.pulse.off{animation:none}@keyframes p{from{transform:scale(.6)}to{transform:scale(1.2)}}@media (prefers-reduced-motion:reduce){.pulse{animation:none}}</style>\n<div class="pulse" id="d"></div><p><button id="b" aria-pressed="false">Pause animation</button></p>\n<script>var d=document.getElementById("d"),b=document.getElementById("b");b.onclick=function(){var off=d.classList.toggle("off");b.setAttribute("aria-pressed",off);b.textContent=off?"Play animation":"Pause animation"}</script>',
        findings: { broken: ['Endless motion with no control.', 'Fails 2.2.2 and ignores prefers-reduced-motion.'], fixed: ['A pause button, and the animation is off when the OS requests reduced motion.'] },
        height: 190,
        code: { broken: '.pulse { animation: p 1s infinite alternate; }', fixed: '.pulse { animation: p 1s infinite alternate; }\n.pulse.off { animation: none; }\n@media (prefers-reduced-motion: reduce) {\n  .pulse { animation: none; }\n}\n<button aria-pressed="false">Pause animation</button>' }
      },
      failures: [
        { title: 'The carousel that never stopped', story: 'A homepage hero rotates every four seconds. People with ADHD cannot read it, screen magnifier users lose the slide mid-sentence, and keyboard users cannot pause it.', fix: 'Start paused or add a clearly labelled pause button; stop rotation on focus and hover.' },
        { title: 'Parallax that made visitors dizzy', story: 'A scroll-driven parallax effect causes nausea for people with vestibular disorders. There is no reduced-motion fallback.', fix: 'Wrap the effect in @media (prefers-reduced-motion: no-preference) so it is opt-out by default.' }
      ],
      checklist: {
        manual: ['Wait 5+ seconds: does anything keep moving? Is there a pause?', 'Turn on “Reduce motion” in your OS: does the page calm down?', 'Tab to carousels: can you stop and step through slides?'],
        tools: ['PEAT (Photosensitive Epilepsy Analysis Tool)', 'Browser DevTools → Rendering → Emulate prefers-reduced-motion', 'axe (auto-update / blink rules)'],
        sr: ['Check that carousel slides are announced politely, not on every tick (avoid aria-live on auto-rotation).']
      },
      audit: { title: 'Auto-rotating carousel has no pause control', criteria: '2.2.2 Pause, Stop, Hide · Level A', severity: 'High', location: 'Home page hero carousel', found: 'Slides advance every 4 seconds indefinitely. No pause, stop or hide control exists.', impact: 'Users who read slowly, use magnifiers or have attention difficulties cannot read the content.', recommendation: 'Add a visible pause button, pause on hover and focus, and respect prefers-reduced-motion.', code: '<button type="button" aria-pressed="false">Pause slideshow</button>' },
      challenge: { title: 'What does each effect need?', prompt: 'Choose the right response for each motion pattern.', buckets: ['Provide pause/stop/hide', 'Honour reduced motion', 'Remove (seizure risk)', 'Fine as is'], items: [
        { t: 'A carousel that rotates automatically every 5 seconds.', a: 0 },
        { t: 'A scroll-linked parallax hero.', a: 1 },
        { t: 'A banner that flashes red/white five times a second.', a: 2 },
        { t: 'A loading spinner that lasts about a second.', a: 3 }
      ] },
      quiz: [
        { q: 'Auto-moving content lasting more than…', options: ['1 second', '5 seconds', '30 seconds', '1 minute'], answer: 1, why: '2.2.2: more than five seconds needs a mechanism to pause/stop/hide.' },
        { q: 'Which media query respects OS motion settings?', options: ['prefers-color-scheme', 'prefers-reduced-motion', 'orientation', 'hover'], answer: 1, why: 'prefers-reduced-motion.' },
        { q: 'Flashing limit?', options: ['None', 'Three per second', 'Ten per second', 'One per minute'], answer: 1, why: '2.3.1.' },
        { q: 'A good carousel default is…', options: ['Auto-rotate fast', 'Paused, or with an obvious pause button', 'No controls', 'Hidden slides'], answer: 1, why: 'Give users control.' }
      ]
    },

    live: {
      patterns: {
        do: ['Provide live captions for webinars and meetings (CART or accurate live ASR).', 'Announce status changes (“Saved”, “3 results”) with role="status" or aria-live="polite".', 'Use role="alert" only for urgent, time-sensitive errors.', 'Put the live region in the DOM before you change its text.'],
        dont: ['Inject a new aria-live element and its message at the same time (it often goes unannounced).', 'Announce every tick of a fast-updating feed.', 'Use aria-live="assertive" for routine messages.', 'Move focus just to announce a status.']
      },
      demo: {
        broken: '<button id="go">Add to cart</button>\n<div id="box"></div>\n<script>document.getElementById("go").onclick=function(){document.getElementById("box").innerHTML="<p>✓ Added to cart</p>"}</script>',
        fixed: '<button id="go">Add to cart</button>\n<div id="box" role="status"></div>\n<script>document.getElementById("go").onclick=function(){document.getElementById("box").textContent="✓ Added to cart"}</script>',
        findings: { broken: ['A plain div: screen readers say nothing when the message appears.', 'Fails 4.1.3 Status Messages.'], fixed: ['role="status" is a polite live region: “Added to cart” is announced without moving focus.'] },
        height: 140,
        code: { broken: '<div id="box"></div>', fixed: '<div id="box" role="status"></div>' }
      },
      failures: [
        { title: 'The silent “Saved!” toast', story: 'A form shows a green “Saved!” banner that fades after three seconds. Screen reader users never hear it and keep pressing Save.', fix: 'Render toasts into a persistent role="status" region and keep them visible long enough to be read.' },
        { title: 'The webinar with captions “coming later”', story: 'A live webinar offered recordings with captions afterwards. Deaf attendees were excluded from the live Q&A.', fix: 'Book live captioning (CART) or enable accurate live captions before the event.' }
      ],
      checklist: {
        manual: ['Trigger each status message: does it appear visually and in text?', 'Check toasts persist long enough or can be paused/reopened.', 'Join a live event: are live captions available from the start?'],
        tools: ['axe DevTools (aria-live misuse)', 'Browser accessibility tree inspector', 'Screen reader speech viewer (NVDA Speech Viewer)'],
        sr: ['NVDA/JAWS: is the message announced once, politely, with no focus change?', 'VoiceOver: confirm announcements in Safari and iOS.']
      },
      audit: { title: 'Cart updates are not announced', criteria: '4.1.3 Status Messages · Level AA', severity: 'Medium', location: 'Product page → Add to cart', found: 'After activating “Add to cart” a confirmation appears visually but is not exposed through role=status/alert or a live region.', impact: 'Screen reader users receive no confirmation and may add the item repeatedly.', recommendation: 'Add a persistent container with role="status" and update its text on success.', code: '<div role="status" id="cart-msg"></div>' },
      challenge: { title: 'Pick the right announcement', prompt: 'Choose how each message should reach a screen reader user.', buckets: ['role="status" (polite)', 'role="alert" (assertive)', 'role="log"', 'Move focus'], items: [
        { t: 'An item was added to the shopping cart.', a: 0 },
        { t: 'Your payment failed — action needed now.', a: 1 },
        { t: 'A new message arrives in a chat conversation.', a: 2 },
        { t: 'A modal dialog opens.', a: 3 }
      ] },
      quiz: [
        { q: 'A polite announcement role is…', options: ['alert', 'status', 'dialog', 'banner'], answer: 1, why: 'role=status.' },
        { q: 'For live regions to announce reliably, the region should…', options: ['Be created with its text', 'Exist before its content changes', 'Be hidden', 'Be offscreen only'], answer: 1, why: 'Pre-existing live region.' },
        { q: 'Live captioning is required at…', options: ['A', 'AA', 'AAA', 'Never'], answer: 1, why: '1.2.4 is AA.' },
        { q: 'Avoid assertive for…', options: ['Critical errors', 'Routine updates', 'Time-sensitive alerts', 'Security warnings'], answer: 1, why: 'Reserve assertive for urgent messages.' }
      ]
    },

    images: {
      patterns: {
        do: ['Decide per image: decorative (alt=""), informative (describe purpose), functional (describe action).', 'Give complex images a short alt plus a nearby long description or data table.', 'Use real text instead of images of text.', 'Give icon-only buttons an accessible name.'],
        dont: ['Start alt with “image of”.', 'Leave alt off (screen readers may read the file name).', 'Stuff keywords into alt.', 'Put important text into an image.']
      },
      demo: '1.1.1',
      failures: [
        { title: 'The image-only coupon', story: 'A promotion banner carries the discount code as text inside a JPG with alt="sale". Blind users never learn the code; zooming makes it blurry.', fix: 'Put the code in real text and keep the image decorative or give it a meaningful alt.' },
        { title: 'The logo link that said “link”', story: 'A linked logo had no alt, so screen readers announced the file name “logo_final_v3.svg”.', fix: 'Use alt describing the destination: “Acme home”.' }
      ],
      checklist: {
        manual: ['Turn images off: is meaning preserved?', 'For each <img>, read the alt aloud: does it serve the same purpose?', 'Check icon buttons, SVGs and CSS backgrounds that carry meaning.'],
        tools: ['axe / WAVE (missing alt)', 'Accessibility tree inspector', 'Stylebot or CSS off to see background images'],
        sr: ['NVDA: browse by graphic (G) and listen to each name.', 'VoiceOver rotor: Images.']
      },
      audit: { title: 'Informative image has no alternative text', criteria: '1.1.1 Non-text Content · Level A', severity: 'High', location: 'Q2 Results chart', found: '<img> has no alt attribute.', impact: 'Blind users receive no information from the chart.', recommendation: 'Add alt text conveying the chart’s message, plus a data table if the chart is detailed.', code: '<img src="chart.png" alt="Bar chart: sales rose 20% from Q1 to Q2">' },
      challenge: { title: 'Alt text decision tree', prompt: 'Choose the right treatment for each image.', buckets: ['alt="" (decorative)', 'Describe the purpose', 'Short alt + long description', 'Use real text instead'], items: [
        { t: 'A decorative swirl behind the heading.', a: 0 },
        { t: 'A magnifying-glass icon on a Search button.', a: 1 },
        { t: 'A chart showing twelve data series over five years.', a: 2 },
        { t: 'A banner with “50% off” baked into the picture.', a: 3 }
      ] },
      quiz: [
        { q: 'How do you mark an image decorative?', options: ['alt="decorative"', 'alt=""', 'No alt', 'title=""'], answer: 1, why: 'Empty alt.' },
        { q: 'Which alt is best for a linked company logo?', options: ['logo', 'Acme — home', 'image', '(empty alt)'], answer: 1, why: 'Describe the link destination.' },
        { q: 'Text inside an image is…', options: ['Preferred', 'Avoided where real text will do (1.4.5)', 'Required', 'Always a failure'], answer: 1, why: 'Logos are exempt.' },
        { q: 'A missing alt attribute is…', options: ['Fine', 'Failure F65', 'AAA only', 'Decorative'], answer: 1, why: 'F65.' }
      ]
    },

    typography: {
      patterns: {
        do: ['Meet 4.5:1 for text and 3:1 for UI components.', 'Use relative units (rem/em) and min-height so text can resize and reflow to 320px.', 'Never use colour as the only signal; add an icon, text or underline.', 'Test with text-spacing overrides and forced-colors mode.'],
        dont: ['Disable zoom with user-scalable=no.', 'Use fixed heights with overflow: hidden.', 'Put light-grey text on white.', 'Remove outlines without a replacement.']
      },
      demo: '1.4.10',
      failures: [
        { title: 'The pale-grey placeholder form', story: 'A signup form used #bbb placeholders as labels. They vanished on typing and failed contrast for everyone with low vision.', fix: 'Use visible labels with ≥4.5:1 contrast; placeholders only as hints.' },
        { title: 'The page that broke at 400% zoom', story: 'A fixed 1100px layout required horizontal scrolling on every zoomed view. Low-vision users had to pan left and right on each line.', fix: 'Use flexible grids and test at 320 CSS px.' }
      ],
      checklist: {
        manual: ['Zoom to 200% and 400%: any clipping, overlap or sideways scroll?', 'Apply a text-spacing bookmarklet.', 'View in greyscale.', 'Turn on forced colors / Windows High Contrast.'],
        tools: ['Colour Contrast Analyser (CCA)', 'axe / Lighthouse contrast rules', 'DevTools → Rendering → emulate vision deficiencies and forced-colors'],
        sr: ['Verify that reflowed/collapsed layouts keep a logical reading order.']
      },
      audit: { title: 'Body text fails minimum contrast', criteria: '1.4.3 Contrast (Minimum) · Level AA', severity: 'Medium', location: 'Site-wide — secondary text', found: 'Text colour #aaaaaa on #ffffff has a contrast ratio of 2.32:1; 4.5:1 is required.', impact: 'People with low vision or colour-vision deficiency cannot read the text.', recommendation: 'Darken the text colour to at least #767676 (4.54:1); #595959 gives 7:1.', code: '.muted { color: #595959; }' },
      challenge: { title: 'Name the criterion', prompt: 'Match each problem to the WCAG criterion it breaks.', buckets: ['Contrast (1.4.3)', 'Use of colour (1.4.1)', 'Text spacing (1.4.12)', 'Reflow (1.4.10)'], items: [
        { t: 'Grey #aaa text on a white page.', a: 0 },
        { t: 'A form error shown only by turning the border red.', a: 1 },
        { t: 'A fixed-height card clips text when line-height is increased.', a: 2 },
        { t: 'Sideways scrolling at a 320px-wide viewport.', a: 3 }
      ] },
      quiz: [
        { q: 'AA contrast for normal text?', options: ['3:1', '4.5:1', '7:1', '2:1'], answer: 1, why: '4.5:1.' },
        { q: 'Reflow viewport width?', options: ['320 CSS px', '768 CSS px', '1024 CSS px', '200 px'], answer: 0, why: '320 CSS px.' },
        { q: 'Which meta viewport is a failure?', options: ['initial-scale=1', 'user-scalable=no', 'width=device-width', 'none of these'], answer: 1, why: 'Blocks zoom.' },
        { q: 'UI component contrast?', options: ['1.5:1', '3:1', '4.5:1', '7:1'], answer: 1, why: '1.4.11 needs 3:1.' }
      ]
    }
  };

  // One badge per hub quiz.
  Object.keys(A.data.hubs).forEach(id => {
    const t = A.data.topicById[id];
    A.data.badges.push({ id: 'hub-' + id, name: t.name + ' Hub', desc: 'Pass the ' + t.name + ' hub quiz.', icon: t.icon, test: s => !!(s.hubs && s.hubs[id]) });
  });

  // Beginner path: the recommended order through Beginner lessons.
  A.data.paths = {
    beginner: ['images-alt-basics', 'images-functional-icons', 'typography-contrast-basics', 'typography-color-alone', 'typography-text-resize',
      'video-captions-basics', 'video-player-basics', 'audio-transcripts-basics', 'audio-autoplay-control', 'animation-reduced-motion',
      'live-announcements-basics', 'keyboard-focus-visible']
  };
})(window.A11Y = window.A11Y || {});
