/* Phase 2: mini-lessons for the remaining Principle 1 (Perceivable) criteria.
   1.1.1 and 1.4.3 live in criteria-content.js. Authoring helper:
   C(num, explain, who[], test[], failures[], techniques[[id,label]], demo, quiz[[q, options, answerIndex, why]]) */
(function (A) {
  'use strict';
  const content = A.data.criteriaContent;
  const C = (num, explain, who, test, failures, techniques, demo, quiz) => {
    content[num] = {
      explain, who, test, failures,
      techniques: techniques.map(([id, label]) => ({ id, label })),
      demo, quiz: quiz.map(([q, options, answer, why]) => ({ q, options, answer, why }))
    };
  };
  // demo(brokenLiveHTML, fixedLiveHTML, brokenFindings[], fixedFindings[], height, {broken, fixed} code to display)
  const demo = (broken, fixed, fb, ff, height, code) => ({ broken, fixed, findings: { broken: fb, fixed: ff }, height: height || 170, code });
  const VID = '<div class="vid"><img src="{{IMG}}" alt="">';

  /* ---------------- 1.2 Time-based media ---------------- */
  C('1.2.1',
    'Audio-only (podcasts, recordings) and video-only (silent animations) content needs a text alternative: a transcript for audio, and a transcript or audio track for silent video.',
    ['Deaf and deafblind people', 'People who cannot play audio in their environment', 'Screen reader and braille users', 'Anyone who prefers to skim'],
    ['List every audio-only and video-only item on the page', 'Is there a transcript (or audio description track for silent video) nearby and linked?', 'Does the transcript include speaker names and meaningful sounds?', 'Is the transcript reachable by keyboard?'],
    ['Podcast with no transcript', 'Silent product demo with no text or audio description', 'Transcript only available as an image'],
    [['G158', 'Providing an alternative for time-based media for audio-only content'], ['G159', 'Providing an alternative for time-based media for video-only content'], ['G166', 'Providing audio that describes the important video content']],
    demo('{{PLAYERCSS}}<p class="note"><b>Episode 12:</b> Designing for focus</p><audio controls style="width:100%"></audio>',
      '{{PLAYERCSS}}<p class="note"><b>Episode 12:</b> Designing for focus</p><audio controls style="width:100%"></audio><details open><summary>Transcript</summary><p class="note"><b>Host:</b> Welcome back. Today we talk about focus indicators.<br><b>[Applause]</b></p></details>',
      ['Audio only. Deaf visitors get nothing.', 'Fails 1.2.1 (G158).'], ['A transcript sits right below the player, with speaker names and sounds.', 'Search engines and screen readers can use it too.'], 190,
      { broken: '<h2>Episode 12: Designing for focus</h2>\n<audio controls src="ep12.mp3"></audio>', fixed: '<h2>Episode 12: Designing for focus</h2>\n<audio controls src="ep12.mp3"></audio>\n<details>\n  <summary>Transcript</summary>\n  <p><b>Host:</b> Welcome back…</p>\n</details>' }),
    [['Which alternative serves an audio-only podcast?', ['Captions', 'A transcript', 'Sign language', 'Audio description'], 1, 'Audio-only content needs a text equivalent: a transcript.'],
     ['A silent screen-capture demo needs…', ['Nothing', 'A text or audio alternative describing what happens', 'Only a title', 'Autoplay'], 1, 'Video-only content needs a text description or an audio track.']]);

  C('1.2.2',
    'Prerecorded video that has audio needs synchronised captions that include speech, speaker identification and meaningful sounds. Level A.',
    ['Deaf and hard-of-hearing people', 'People in noisy or silent environments', 'Non-native speakers', 'People with auditory processing difficulties'],
    ['Play the video muted: can you follow everything?', 'Are captions synchronised, accurate and complete (speaker names, [music], [door slams])?', 'Can captions be turned on with the keyboard?', 'Check embedded YouTube/Vimeo videos: are captions actually published, not just auto-generated?'],
    ['No caption track at all', 'Unreviewed auto-captions with many errors', 'Captions that cover only speech, not meaningful sounds', 'Captions burned in that cannot be resized (acceptable but less flexible)'],
    [['G93', 'Providing open (always visible) captions'], ['G87', 'Providing closed captions'], ['H95', 'Using the track element to provide captions'], ['F8', 'Failure: captions that do not include all dialogue or important sounds']],
    demo('{{PLAYERCSS}}' + VID + '<div class="bar">▶ 0:12 / 1:30 &nbsp; CC (none available)</div></div>',
      '{{PLAYERCSS}}' + VID + '<div class="cap">[Maya] Welcome to the quarterly review.</div><div class="bar">▶ 0:12 / 1:30 &nbsp; CC ✓ English</div></div>',
      ['Muted playback shows nothing — the content is inaccessible to Deaf viewers.', 'Fails 1.2.2 (F8).'], ['Speaker name and speech appear as synchronised text.', 'The caption toggle is a real button in the player.'], 190,
      { broken: '<video controls src="review.mp4"></video>', fixed: '<video controls src="review.mp4">\n  <track kind="captions" src="review.en.vtt"\n         srclang="en" label="English">\n</video>' }),
    [['What should captions include besides speech?', ['Nothing', 'Speaker identification and meaningful sounds', 'Only music titles', 'A summary'], 1, 'Captions convey dialogue and meaningful non-speech audio like [alarm].'],
     ['Auto-generated captions that are never reviewed…', ['Always pass', 'Often fail because accuracy is not guaranteed', 'Are required at AAA', 'Are the same as a transcript'], 1, 'Accuracy matters: unreviewed auto captions frequently fail 1.2.2.']]);

  C('1.2.3',
    'Prerecorded video needs either a text alternative (full transcript) or audio description of the important visual content. At Level A you may choose either; AA (1.2.5) then requires audio description.',
    ['Blind and low-vision people', 'People with cognitive disabilities who benefit from text', 'Deafblind people using braille'],
    ['Listen without watching: is anything important only visible (on-screen text, actions, charts)?', 'Is a descriptive transcript or description track provided?', 'Does the alternative include visual information, not just dialogue?'],
    ['A talking-head video with a slide deck, and the slide content is never spoken', 'A transcript that has only the spoken words'],
    [['G69', 'Providing an alternative for time-based media'], ['G78', 'Providing a second, user-selectable audio track with audio descriptions'], ['H96', 'Using the track element to provide audio descriptions']],
    demo('{{PLAYERCSS}}' + VID + '<div class="bar">▶ Product tour</div></div><p class="note">(No description or transcript)</p>',
      '{{PLAYERCSS}}' + VID + '<div class="bar">▶ Product tour</div></div><p class="note"><a href="#">Read the full text version</a> — includes what appears on screen: “Click Settings (gear icon, top right)…”</p>',
      ['A blind viewer hears “and then click here” but never learns what “here” is.', 'Fails 1.2.3.'], ['A text alternative describes both dialogue and visuals.'], 200,
      { broken: '<video controls src="tour.mp4"></video>', fixed: '<video controls src="tour.mp4">\n  <track kind="descriptions" src="tour.desc.vtt" srclang="en">\n</video>\n<a href="tour-text.html">Read the full text version</a>' }),
    [['At Level A, which satisfies 1.2.3?', ['Captions', 'Either audio description or a full text alternative', 'Sign language', 'Nothing for silent video'], 1, 'A or B: media alternative OR audio description.'],
     ['A good descriptive transcript includes…', ['Dialogue only', 'Dialogue plus important visual information', 'A marketing summary', 'Timestamps only'], 1, 'It must convey the visual content too.']]);

  C('1.2.4',
    'Live video with audio (webinars, streams, meetings) needs live captions (AA). Real-time captioners (CART) or accurate live ASR, with delays kept small.',
    ['Deaf and hard-of-hearing attendees', 'Non-native speakers', 'People in noisy places'],
    ['Join a live event: is a caption stream available from the start?', 'Are captions accurate enough to follow technical terms and names?', 'Is the caption control keyboard accessible in the player/meeting tool?', 'Are captions kept in the recording?'],
    ['“We’ll add captions after the event” for a live webinar', 'Caption feed hidden behind an unlabelled icon'],
    [['G9', 'Providing captions for live synchronised media'], ['G93', 'Providing open captions'], ['SM11', 'Providing captions through synchronised text (SMIL)']],
    demo('{{PLAYERCSS}}' + VID + '<div class="badge2">● LIVE</div><div class="bar">Webinar · 214 watching</div></div>',
      '{{PLAYERCSS}}' + VID + '<div class="badge2">● LIVE</div><div class="cap">…and that is why we ship accessibility early.</div><div class="bar">Webinar · CC ✓ live captions</div></div>',
      ['Live stream with audio but no captions: Deaf attendees are excluded in real time.', 'Fails 1.2.4 (AA).'], ['Live captions displayed in the stream.', 'Pro tip: book a CART captioner for high-stakes events; check ASR with technical vocabulary.'], 190,
      { broken: '<iframe src="https://stream.example/live"></iframe>', fixed: '<iframe src="https://stream.example/live?captions=on"></iframe>\n<p>Live captions provided by a CART captioner.\n   Need another option? <a href="/contact">Contact us</a>.</p>' }),
    [['Which level requires live captions?', ['A', 'AA', 'AAA', 'None'], 1, '1.2.4 Captions (Live) is Level AA.'],
     ['Which best meets the requirement for a live conference?', ['Captions added next week', 'A real-time captioner or accurate live captioning', 'A transcript later', 'A louder speaker'], 1, 'Captions must be available in real time.']]);

  C('1.2.5',
    'Prerecorded video needs audio description of important visual content (AA). Unlike 1.2.3, a text alternative alone no longer satisfies it.',
    ['Blind and low-vision people'],
    ['Listen with eyes closed: do you understand the story, actions and on-screen text?', 'Is there a described version or description track the user can select?', 'If dialogue already covers all visuals, is that documented?'],
    ['Video with no description and visuals that matter (charts, demos)', 'Description only available as a separate untagged file'],
    [['G173', 'Providing a version of a movie with audio descriptions'], ['G78', 'Second audio track with audio descriptions'], ['G203', 'Using a static text alternative for talking-head videos'], ['H96', 'track kind="descriptions"']],
    demo('{{PLAYERCSS}}' + VID + '<div class="bar">▶ Quarterly results</div></div><p class="note">Audio: “As you can see here, revenue grew…”</p>',
      '{{PLAYERCSS}}' + VID + '<div class="bar">▶ Quarterly results · AD ✓</div></div><p class="note">Audio: “…revenue grew. <i>[Description: a bar chart shows sales up 20% from Q1 to Q2.]</i>”</p>',
      ['“As you can see here” — blind viewers cannot.', 'Fails 1.2.5.'], ['Description fills the pauses with the missing visual information.'], 200,
      { broken: '<video controls src="results.mp4"></video>', fixed: '<video controls src="results.mp4">\n  <track kind="descriptions" src="results.desc.vtt" srclang="en">\n</video>\n<!-- or offer results-described.mp4 as a second version -->' }),
    [['Audio description narrates…', ['All dialogue', 'Important visual information not in the audio', 'Music', 'Subtitles'], 1, 'AD voices the visuals that matter.'],
     ['Can a transcript alone satisfy 1.2.5 (AA)?', ['Yes', 'No — audio description is required', 'Only for live', 'Only for silent video'], 1, 'The 1.2.3 alternative is no longer enough at AA.']]);

  C('1.2.6',
    'Prerecorded video with audio should provide sign language interpretation (AAA). For many Deaf people, sign language is a first language and captions are a second.',
    ['Deaf sign-language users', 'People with low literacy in the written language'],
    ['Is a sign-language interpreter shown (picture-in-picture or separate stream)?', 'Is the interpreter large and clear enough to read?', 'Can the user toggle the interpreter?'],
    ['Captions only for content aimed at Deaf audiences', 'Interpreter window too small to read'],
    [['G54', 'Including a sign language interpreter in the video stream'], ['G81', 'Providing a synchronised sign language interpretation']],
    demo('{{PLAYERCSS}}' + VID + '<div class="cap">Captions only</div><div class="bar">▶ Public safety notice</div></div>',
      '{{PLAYERCSS}}' + VID + '<div class="cap">Captions</div><div class="badge2" style="top:auto;bottom:34px;right:6px;width:64px;height:64px;font-size:11px;display:flex;align-items:center;justify-content:center;text-align:center">🤟 Sign language</div><div class="bar">▶ Public safety notice</div></div>',
      ['Captions help, but not everyone who signs reads the written language fluently.', 'Not met (AAA).'], ['An interpreter is shown in a toggleable inset.'], 200,
      { broken: '<video controls src="notice.mp4"></video>', fixed: '<video controls src="notice.mp4"></video>\n<video controls src="notice-sign.mp4"\n       aria-label="Sign language interpretation"></video>' }),
    [['Which level is sign language for prerecorded media?', ['A', 'AA', 'AAA', 'Not in WCAG'], 2, '1.2.6 is AAA.'],
     ['Why is sign language not covered by captions?', ['It is', 'It is a distinct language, not a transcription', 'Captions are illegal', 'No reason'], 1, 'Sign languages have their own grammar; captions are text in another language.']]);

  C('1.2.7',
    'When pauses in the dialogue are too short for audio description, extended audio description pauses the video so the description can finish (AAA).',
    ['Blind and low-vision people'],
    ['Find scenes with dense visuals and little dialogue gap', 'Does the player pause automatically while description plays?', 'Is extended AD selectable?'],
    ['Description cut off mid-sentence because there is no pause', 'Important visuals skipped because the gap was too short'],
    [['G8', 'Providing a movie with extended audio descriptions']],
    demo('{{PLAYERCSS}}' + VID + '<div class="bar">▶ Fast-paced demo · standard AD</div></div><p class="note">Gap: 1.5 s · Description needs 6 s → skipped.</p>',
      '{{PLAYERCSS}}' + VID + '<div class="bar">⏸ Paused for description…</div></div><p class="note">Gap: 1.5 s · Video pauses 4.5 s so the 6 s description finishes.</p>',
      ['Standard AD cannot fit important visuals into short gaps.', 'Not met (AAA).'], ['The player pauses, the description plays, then playback resumes.'], 200,
      { broken: '<video controls src="demo.mp4">\n  <track kind="descriptions" src="demo.desc.vtt">\n</video>', fixed: '<!-- extended AD requires a player that can pause for description -->\n<video controls src="demo.mp4">\n  <track kind="descriptions" src="demo.ext-desc.vtt"\n         data-pause-on-cue="true">\n</video>' }),
    [['Extended audio description…', ['Speeds up the video', 'Pauses the video to fit longer descriptions', 'Adds captions', 'Removes dialogue'], 1, 'It pauses so description is never truncated.'],
     ['It is required at…', ['A', 'AA', 'AAA', 'Never'], 2, '1.2.7 is AAA.']]);

  C('1.2.8',
    'Prerecorded synchronised media and video-only content needs a full descriptive text alternative: a document that combines dialogue, speaker names and visual descriptions (AAA).',
    ['Deafblind users', 'Blind and Deaf users using braille displays', 'People with cognitive disabilities'],
    ['Is there a document containing both dialogue and visual descriptions in order?', 'Is it reachable next to the video?', 'Is it readable by braille displays (real text, not an image)?'],
    ['A transcript with dialogue only', 'A transcript hosted as an image PDF'],
    [['G69', 'Providing an alternative for time-based media'], ['G58', 'Placing a link to the alternative next to the non-text content'], ['G159', 'Alternative for video-only content']],
    demo('{{PLAYERCSS}}' + VID + '<div class="bar">▶ Safety training</div></div>',
      '{{PLAYERCSS}}' + VID + '<div class="bar">▶ Safety training</div></div><p class="note"><a href="#">Full text version</a> (dialogue + visuals)</p>',
      ['No full text equivalent for deafblind users.', 'Not met (AAA).'], ['A link to a complete text version sits next to the video.'], 190,
      { broken: '<video controls src="training.mp4"></video>', fixed: '<video controls src="training.mp4"></video>\n<p><a href="training-text.html">Full text version\n   (dialogue and visual descriptions)</a></p>' }),
    [['A media alternative (1.2.8) combines…', ['Only captions', 'Dialogue, sounds and visual descriptions as text', 'A thumbnail', 'A summary'], 1, 'It is a full text rendition of the experience.'],
     ['Who needs it most?', ['Sighted hearing users', 'Deafblind people using braille', 'Gamers', 'Nobody'], 1, 'Braille displays only work with text.']]);

  C('1.2.9',
    'Live audio-only content (live radio, audio streams) needs a real-time text alternative (AAA).',
    ['Deaf and hard-of-hearing people'],
    ['Is there a live text stream for audio-only broadcasts?', 'Is the text stream linked near the player?'],
    ['A live podcast stream with no text alternative'],
    [['G150', 'Providing text alternatives for live audio-only content'], ['G151', 'Real-time text transcript'], ['G157', 'Incorporating a live audio captioning service']],
    demo('<p class="note"><b>Live radio</b></p><audio controls style="width:100%"></audio>',
      '<p class="note"><b>Live radio</b></p><audio controls style="width:100%"></audio><p class="note" role="log" aria-live="off"><b>Live text:</b> “…today’s guest is…”</p>',
      ['Live audio only. Nothing for Deaf listeners.', 'Not met (AAA).'], ['A live text feed accompanies the audio.'], 200,
      { broken: '<audio controls src="https://radio.example/live"></audio>', fixed: '<audio controls src="https://radio.example/live"></audio>\n<div role="log" aria-live="off" id="live-text">\n  <!-- real-time transcript appended here -->\n</div>' }),
    [['1.2.9 applies to…', ['Prerecorded video', 'Live audio-only content', 'Silent animations', 'Images'], 1, 'Live audio-only streams.'],
     ['A fix is…', ['Add a logo', 'Provide a real-time text transcript', 'Autoplay', 'Mute it'], 1, 'Real-time text alternative.']]);

  /* ---------------- 1.3 Adaptable ---------------- */
  C('1.3.1',
    'Structure and relationships conveyed visually must also be available in code: headings, lists, tables, form labels, groups and landmarks should use the correct elements or ARIA.',
    ['Screen reader users', 'People who navigate by headings or landmarks', 'Voice-control users (labels)', 'People using custom stylesheets'],
    ['Turn off CSS (or inspect): does the structure survive?', 'Do headings use h1–h6, lists use ul/ol, data uses table with th?', 'Is every form control tied to a label?', 'Navigate by headings and landmarks with a screen reader'],
    ['F2: using CSS pseudo-content to convey info', 'F43: layout tables that convey meaning incorrectly', 'F46: using th for non-header cells', 'Bold div used as a heading; “•” typed to fake a list'],
    [['H42', 'Using h1–h6 to identify headings'], ['H44', 'Using label elements to associate text labels with form controls'], ['H48', 'Using ol, ul and dl for lists'], ['H51', 'Using table markup to present tabular information'], ['ARIA11', 'Using ARIA landmarks']],
    demo('<div style="font:bold 22px system-ui">Pricing</div>\n<div>• Basic</div><div>• Pro</div>\n<div>Email</div><input>',
      '<h2>Pricing</h2>\n<ul><li>Basic</li><li>Pro</li></ul>\n<label for="e">Email</label><input id="e">',
      ['Looks like a heading, list and label — but code says “text, text, text”.', 'A screen reader cannot list headings or announce the field name. Fails 1.3.1.'], ['Real h2, ul and label expose the structure.', 'Clicking the label focuses the field.'], 200),
    [['Which is the right way to make a heading?', ['<div class="big">', '<h2>', '<b>', '<span role="text">'], 1, 'Use a real heading element.'],
     ['A text label next to an input should be linked using…', ['A nearby div', 'label for / aria-labelledby', 'title only', 'placeholder only'], 1, 'Programmatic association is the key.']]);

  C('1.3.2',
    'When the order of content affects meaning, the reading order in the code (DOM) must match the intended order. CSS can look right while the DOM order is wrong.',
    ['Screen reader users', 'Keyboard users (tab order follows DOM)', 'People using reader modes'],
    ['Compare visual order with the DOM order (disable CSS or use a reading-order tool)', 'Tab through: does focus follow the visual order?', 'Check CSS order, float, absolute positioning and grid placement'],
    ['F49: layout tables that become meaningless when linearised', 'CSS order: property reorders steps in a how-to list', 'Sidebar placed before main content in DOM but visually after'],
    [['G57', 'Ordering the content in a meaningful sequence'], ['C27', 'Making the DOM order match the visual order']],
    demo('<style>.r{display:flex;flex-direction:row-reverse;justify-content:flex-end;gap:8px}</style>\n<p class="note">Visual order: Back → Next. Press Tab.</p>\n<div class="r"><button>Next</button><button>Back</button></div>',
      '<style>.r{display:flex;gap:8px}</style>\n<p class="note">Visual order: Back → Next. Press Tab.</p>\n<div class="r"><button>Back</button><button>Next</button></div>',
      ['row-reverse shows Back → Next but Tab and screen readers hit Next first.', 'Fails 1.3.2 / 2.4.3.'], ['DOM order equals visual order: Back, then Next.'], 140),
    [['Reading order for assistive tech follows…', ['Visual position only', 'The DOM order', 'Alphabetical order', 'Colour'], 1, 'The DOM is the source of truth.'],
     ['A CSS-only reorder that changes meaning is risky because…', ['It is slow', 'The DOM order stays the same', 'It breaks colours', 'It is illegal'], 1, 'AT ignores the visual reordering.']]);

  C('1.3.3',
    'Instructions must not rely solely on shape, size, visual location, orientation or sound. “Click the green button on the right” fails for people who cannot see the page.',
    ['Blind and low-vision people', 'Colour-blind people', 'Deaf people (sound cues)', 'People using small or reflowed layouts'],
    ['Search instructions for “above”, “right”, “round”, “red”, “beep”', 'Could a screen reader user follow each instruction?', 'Do sound cues have a visual/text equivalent?'],
    ['F14: identifying content only by its location', 'F26: identifying content only by shape', '“Press the round button”', 'Error signalled only by a beep'],
    [['G96', 'Providing textual identification of items that otherwise rely only on sensory information']],
    demo('<p>Click the green button on the right to continue.</p>\n<div style="display:flex;justify-content:space-between"><button style="background:#c33;color:#fff;border:0;padding:8px 12px">Cancel</button><button style="background:#2a7a3a;color:#fff;border:0;padding:8px 12px">Continue</button></div>',
      '<p>Select <strong>Continue</strong> (green button on the right) to proceed.</p>\n<div style="display:flex;justify-content:space-between"><button style="background:#c33;color:#fff;border:0;padding:8px 12px">Cancel</button><button style="background:#2a7a3a;color:#fff;border:0;padding:8px 12px">Continue</button></div>',
      ['Relies on colour and position alone.', 'Fails 1.3.3 (F14).'], ['Names the control. Sensory hints are an extra, not the only clue.'], 150),
    [['Which instruction passes?', ['Click the round icon', 'Select Save (the disk icon)', 'Press the button on the right', 'Listen for the beep'], 1, 'It names the control.'],
     ['Why avoid “the menu on the left”?', ['It is long', 'Layouts change on mobile and screen readers do not see position', 'It is rude', 'Never a problem'], 1, 'Position is not stable or perceivable.']]);

  C('1.3.4',
    'Content must not be locked to portrait or landscape unless a specific orientation is essential (e.g. a piano app or a bank cheque deposit).',
    ['People whose device is mounted in one orientation (wheelchair mounts)', 'People with low vision who rotate to enlarge text', 'Anyone'],
    ['Rotate the device or resize the viewport: does content still work?', 'Search CSS for orientation media queries that hide or block content', 'Check native app manifests for locked orientation'],
    ['“Please rotate your device” overlays', 'screen.orientation.lock() on a standard content page'],
    [['G214', 'Using a control to allow access to content in different orientations which is otherwise restricted']],
    demo('<style>.msg{background:#fee;padding:8px;border-radius:6px}</style>\n<div class="msg">⟳ Please rotate your device to landscape to use this app.</div>',
      '<style>.app{padding:8px;border:1px solid #999;border-radius:6px}</style>\n<div class="app">The app works in portrait and landscape.</div>',
      ['Blocks portrait users — including people whose tablet is fixed to a wheelchair.', 'Fails 1.3.4.'], ['Layout adapts to either orientation.'], 120,
      { broken: '@media (orientation: portrait) {\n  .app { display: none; }\n  .rotate-msg { display: block; }\n}', fixed: '/* No orientation lock. Use flexible layouts: */\n.app { display: flex; flex-wrap: wrap; }' }),
    [['An orientation lock is acceptable when…', ['It looks nicer', 'A specific orientation is essential', 'Always', 'Never'], 1, 'E.g. a piano keyboard.'],
     ['Which is a failure?', ['Responsive layout', 'Overlay demanding landscape', 'Flexbox', 'Media queries for width'], 1, 'Blocking one orientation.']]);

  C('1.3.5',
    'Fields that collect personal data should state their purpose programmatically using the autocomplete attribute, so browsers and assistive tech can autofill and show familiar icons.',
    ['People with motor impairments (less typing)', 'People with cognitive and memory disabilities', 'Dyslexic users'],
    ['Find fields for name, email, phone, address, card, birthday…', 'Does each have the right autocomplete token (e.g. given-name, email, tel)?', 'Try browser autofill: does it fill correctly?'],
    ['Missing autocomplete on name/email', 'autocomplete="off" on login or address fields', 'Wrong token (name for family-name)'],
    [['H98', 'Using HTML 5.2 autocomplete attributes']],
    demo('<p><label for="n">Full name</label><br><input id="n"></p>\n<p><label for="m">Email</label><br><input id="m" type="email"></p>',
      '<p><label for="n">Full name</label><br><input id="n" autocomplete="name"></p>\n<p><label for="m">Email</label><br><input id="m" type="email" autocomplete="email"></p>',
      ['Autofill cannot identify the purpose reliably.', 'Fails 1.3.5.'], ['Browsers and tools fill fields correctly, and symbol-based tools can add icons.'], 190),
    [['Which attribute declares input purpose?', ['name', 'autocomplete', 'role', 'pattern'], 1, 'autocomplete tokens.'],
     ['autocomplete="off" on a login form is…', ['Best practice', 'Often harmful for accessibility', 'Required', 'Irrelevant'], 1, 'It stops password managers and autofill.']]);

  C('1.3.6',
    'Where technology allows, the purpose of UI components, icons and regions should be programmatically determinable so user agents can personalise the interface (AAA).',
    ['People with cognitive and language disabilities', 'People using symbol-based or simplified interfaces'],
    ['Do landmarks and regions have correct roles?', 'Are icons and controls tagged with purpose via standard vocabularies where supported?'],
    ['Div-only layouts with no landmarks', 'Icons with no machine-readable purpose'],
    [['ARIA11', 'Using ARIA landmarks to identify regions'], ['WAI-Adapt', 'Content Module (emerging personalization semantics)']],
    demo('<div class="n">Home · Shop · Help</div><div class="m">Welcome</div>',
      '<nav aria-label="Main">Home · Shop · Help</nav><main>Welcome</main>',
      ['Generic divs: tools cannot tell navigation from content.', 'Not met (AAA).'], ['Landmarks give regions machine-readable purposes.'], 110),
    [['Which uses a landmark?', ['<div id=nav>', '<nav>', '<span>', '<b>'], 1, 'Native landmark.'],
     ['1.3.6 is…', ['A', 'AA', 'AAA', 'Obsolete'], 2, 'AAA.']]);

  /* ---------------- 1.4 Distinguishable ---------------- */
  C('1.4.1',
    'Colour must not be the only way to convey information, indicate an action, prompt a response or distinguish an element.',
    ['Colour-blind people (about 1 in 12 men)', 'Low-vision people', 'Users in forced-colors or monochrome modes', 'Anyone viewing in bright light'],
    ['View in greyscale (DevTools rendering emulation)', 'Can you still tell errors, required fields, selected items and links apart?', 'Check charts and legends'],
    ['F13: colour as the only indicator of an error', 'Required fields marked only by red labels', 'Links inside text with only a colour difference', 'Charts distinguished only by hue'],
    [['G14', 'Providing information in text as well as colour'], ['G182', 'Ensuring that additional visual cues are available'], ['G183', 'Using a contrast ratio of 3:1 with surrounding text and providing additional visual cues on focus/hover for links']],
    demo('<label for="e" style="color:#c00">Email</label><br><input id="e" style="border:2px solid #c00" value="sam@">\n<p>Read our <a href="#" style="text-decoration:none;color:#06c">terms</a> and conditions.</p>',
      '<label for="e" style="color:#a00">Email</label><br><input id="e" style="border:2px solid #a00" value="sam@" aria-describedby="er">\n<p id="er" style="color:#a00;margin:4px 0">⚠ Error: enter a full email address.</p>\n<p>Read our <a href="#" style="color:#06c">terms</a> and conditions.</p>',
      ['The only error signal is red. Colour-blind users see nothing.', 'The link has no underline.'], ['An icon plus text states the problem.', 'The link is underlined.'], 200),
    [['Which fixes a red-only error?', ['Make it redder', 'Add an icon and error text', 'Use bold', 'Remove it'], 1, 'Add a non-colour cue.'],
     ['Links in body text should…', ['Be colour only', 'Be underlined or have another non-colour cue', 'Be hidden', 'Be grey'], 1, 'Underline them.']]);

  C('1.4.2',
    'Audio that plays automatically for more than 3 seconds needs a way to pause, stop or control its volume independently of the system volume.',
    ['Screen reader users (page audio drowns speech)', 'People with attention and anxiety conditions', 'People in shared spaces'],
    ['Load pages and listen: does anything autoplay with sound?', 'Is there a prominent pause/mute control at the top of the page?', 'Check embedded videos with autoplay'],
    ['Background music on page load with no control', 'Autoplaying video with sound'],
    [['G60', 'Playing a sound that turns off automatically within 3 seconds'], ['G170', 'Providing a control near the top of the web page that turns off sounds that play automatically'], ['F23', 'Failure: playing sound for more than 3 seconds without a stop mechanism']],
    demo('<p class="note">Page loads with a theme tune:</p>\n<audio autoplay loop></audio><p>🔊 Playing… (no controls)</p>',
      '<p class="note">Page loads quietly:</p>\n<audio controls></audio><p>🔇 Audio is off. Press play if you want music.</p>',
      ['Sound starts on its own and cannot be stopped.', 'Fails 1.4.2 (F23).'], ['Nothing plays by default; controls are visible.'], 150,
      { broken: '<audio src="theme.mp3" autoplay loop></audio>', fixed: '<audio src="theme.mp3" controls></audio>\n<!-- no autoplay -->' }),
    [['How long may auto-played audio run before needing a control?', ['10 s', '3 s', '30 s', 'Forever'], 1, 'More than 3 seconds needs control.'],
     ['Best practice for audio?', ['Autoplay', 'Do not autoplay', 'Hide controls', 'Loop it'], 1, 'Let the user start it.']]);

  C('1.4.4',
    'Text must be resizable up to 200% without assistive technology and without loss of content or functionality.',
    ['Low-vision people', 'Older adults', 'Anyone with a small phone'],
    ['Zoom the browser to 200% (text-only zoom if possible)', 'Is any text clipped, overlapped or cut off?', 'Check meta viewport does not disable zooming', 'Check fixed-height containers'],
    ['meta viewport with user-scalable=no / maximum-scale=1', 'Fixed pixel heights with overflow: hidden', 'Text in images'],
    [['G142', 'Using a technology that has commonly-available user agents that support zoom'], ['C12', 'Using percent for font sizes'], ['C14', 'Using em units for font sizes'], ['F69', 'Failure: resizing text to 200% causes loss of content']],
    demo('<style>.box{height:44px;overflow:hidden;border:1px solid #888;padding:4px;font-size:16px}</style>\n<p class="note">Zoom to 200% to compare. Here is the same box at 200%:</p>\n<div class="box" style="font-size:32px">Only 44px tall — this text is cut off.</div>',
      '<style>.box{min-height:44px;border:1px solid #888;padding:4px;font-size:16px}</style>\n<p class="note">Zoom to 200% to compare. Here is the same box at 200%:</p>\n<div class="box" style="font-size:32px">Grows with the text — nothing is cut off.</div>',
      ['Fixed height clips enlarged text.', 'Fails 1.4.4 (F69).'], ['min-height lets the box grow.'], 190,
      { broken: '.box { height: 44px; overflow: hidden; }', fixed: '.box { min-height: 2.75rem; }\n/* use rem/em; never block zoom: */\n/* <meta name="viewport" content="width=device-width, initial-scale=1"> */' }),
    [['Which viewport setting is a failure?', ['initial-scale=1', 'user-scalable=no', 'width=device-width', 'none'], 1, 'Disabling zoom blocks resizing.'],
     ['Use … for flexible text sizing:', ['px heights', 'rem/em and min-height', 'overflow:hidden', 'absolute positions'], 1, 'Relative units and flexible boxes.']]);

  C('1.4.5',
    'If the same visual presentation can be made with real text, use text instead of an image of text. Logos are exempt.',
    ['Low-vision people who change size, font or colours', 'Screen reader users', 'People on slow connections'],
    ['Find images containing words (banners, buttons, headings)', 'Could the same look be built with CSS and web fonts?', 'Zoom in: does the text stay sharp?'],
    ['Hero banner text baked into a JPG', 'Button labels as images', 'Text rasterised in PDF scans without OCR'],
    [['C22', 'Using CSS to control visual presentation of text'], ['C30', 'Using CSS to replace text with images of text'], ['G140', 'Separating information and structure from presentation']],
    demo('<img src="{{IMG}}" width="120" alt="50% off summer sale"><p class="note">(banner is a picture; it blurs when zoomed)</p>',
      '<div style="background:#4338ca;color:#fff;padding:14px;border-radius:8px;font:bold 22px system-ui">50% off summer sale</div><p class="note">(real text; crisp at any zoom)</p>',
      ['Text in an image pixelates and cannot adopt user styles.', 'Fails 1.4.5.'], ['Real text scales, reflows and respects user colours.'], 170,
      { broken: '<img src="sale-banner.jpg" alt="50% off summer sale">', fixed: '<div class="banner">50% off summer sale</div>\n/* .banner { background:#4338ca; color:#fff; font:700 1.4rem system-ui } */' }),
    [['Which is exempt from 1.4.5?', ['Headings', 'Logotypes', 'Buttons', 'Banners'], 1, 'Logos are exempt.'],
     ['Better than a banner image:', ['Bigger JPG', 'Styled real text', 'PNG', 'GIF'], 1, 'CSS-styled text.']]);

  C('1.4.6',
    'Enhanced contrast (AAA): text needs 7:1 (4.5:1 for large text).',
    ['People with low vision (more than 20/40 acuity loss)', 'Older adults'],
    ['Check text colours against 7:1 (4.5:1 large)', 'Check text over images and states'],
    ['Mid-grey text on white that passes AA but not AAA'],
    [['G17', 'Ensuring that a contrast ratio of at least 7:1 exists'], ['G18', 'Ensuring 4.5:1 contrast']],
    demo('<p style="color:#767676;font-size:18px">Body text at 4.5:1 passes AA only.</p>',
      '<p style="color:#595959;font-size:18px">Body text at 7:1 passes AAA.</p>',
      ['#767676 on white is 4.5:1: AA passes, AAA fails.', 'Not met (AAA).'], ['#595959 on white is 7:1.'], 120),
    [['AAA contrast for normal text is…', ['3:1', '4.5:1', '7:1', '21:1'], 2, '7:1.'],
     ['AAA contrast for large text is…', ['3:1', '4.5:1', '7:1', '10:1'], 1, '4.5:1.']]);

  C('1.4.7',
    'Prerecorded speech-only audio should have no background sound, or background at least 20 dB (about four times) quieter than the speech, or a way to switch it off (AAA).',
    ['People with hearing loss', 'People with auditory processing difficulties'],
    ['Listen to narration with its music bed', 'Measure levels: is speech ≥ 20 dB above background (or is there a no-background version)?'],
    ['Podcast with loud music under the voice'],
    [['G56', 'Mixing audio files so that non-speech sounds are at least 20 dB lower than the speech content']],
    demo('<p class="note">Speech −18 LUFS · music −20 LUFS<br>Difference: 2 dB</p>',
      '<p class="note">Speech −18 LUFS · music −38 LUFS<br>Difference: 20 dB ✓</p>',
      ['Music nearly as loud as speech. Hard to follow.', 'Not met (AAA).'], ['Music sits 20 dB below speech.'], 110),
    [['Required gap between speech and background?', ['2 dB', '10 dB', '20 dB', '40 dB'], 2, '20 dB.'],
     ['Alternative to meeting the gap?', ['Louder music', 'A way to turn the background off', 'Autoplay', 'Nothing'], 1, 'A no-background option.']]);

  C('1.4.8',
    'Visual presentation (AAA): users can choose colours; lines are at most 80 characters wide; text is not justified; line spacing is at least 1.5 within paragraphs and paragraph spacing at least 1.5× line spacing; text resizes to 200% without horizontal scrolling.',
    ['People with dyslexia', 'Low-vision people', 'People with cognitive and reading difficulties'],
    ['Measure line length (≤ 80 characters)', 'Check text-align: justify', 'Check line-height and paragraph spacing', 'Can users change foreground/background colours?'],
    ['Full-width justified text', 'Tight line-height under 1.2'],
    [['C20', 'Using relative measurements to set column widths'], ['C21', 'Specifying line spacing in CSS'], ['G146', 'Using liquid layout']],
    demo('<p style="text-align:justify;line-height:1.1;max-width:none">Long lines of justified text create uneven rivers of white space and are hard to track for many readers, especially people with dyslexia who rely on consistent spacing between words.</p>',
      '<p style="text-align:left;line-height:1.6;max-width:60ch">Shorter lines of left-aligned text with generous spacing are easier to track for many readers, especially people with dyslexia who rely on consistent spacing between words.</p>',
      ['Justified, tight and very wide lines.', 'Not met (AAA).'], ['≈60ch measure, left aligned, 1.6 line-height.'], 190),
    [['Maximum line width recommended?', ['40', '80 characters', '120', 'Unlimited'], 1, '80 characters.'],
     ['Which hurts readability?', ['text-align:left', 'text-align:justify', 'line-height 1.6', 'max-width 60ch'], 1, 'Justified text.']]);

  C('1.4.9',
    'Images of text are used only for pure decoration or where a particular presentation is essential, such as logos (AAA, no exception for “it can’t be done”).',
    ['Low-vision people', 'Screen reader users'],
    ['Search for images containing text; is each a logo or essential?', 'Can CSS achieve the look?'],
    ['Styled heading as an image'],
    [['C22', 'CSS to control visual presentation'], ['G140', 'Separating information and structure from presentation']],
    demo('<img src="{{IMG}}" width="120" alt="Welcome to Acme">',
      '<h2 style="font:800 24px Georgia,serif;margin:0">Welcome to Acme</h2>',
      ['A decorative heading as an image.', 'Not met (AAA).'], ['Real text styled with CSS.'], 140),
    [['Which text-image is allowed?', ['A heading', 'A logotype', 'A button', 'A paragraph'], 1, 'Logos.'],
     ['The AAA version differs from AA by…', ['Nothing', 'Removing the “can’t be done with text” exception', 'Adding colour rules', 'Adding audio'], 1, 'AA allows images when the look can’t be done with text; AAA does not.']]);

  C('1.4.10',
    'Content must reflow to a 320 CSS px wide viewport (equivalent to 400% zoom at 1280px) with no loss of information and no horizontal scrolling for vertically scrolling content. Exceptions: maps, data tables, diagrams, code.',
    ['Low-vision people who zoom', 'Mobile users', 'People using magnifiers'],
    ['Set the browser to 1280px wide and zoom to 400%', 'Or use DevTools at 320px width', 'Is there horizontal scroll, clipped content or lost controls?', 'Check sticky headers do not swallow the viewport'],
    ['Fixed-width layouts (min-width: 600px)', 'Fixed-position panels that fill the screen at zoom', 'Tables without a scroll container'],
    [['C31', 'Using CSS Flexbox/grid to reflow'], ['C32', 'Using media queries and grid'], ['C33', 'Allowing for reflow with long URLs and strings of text']],
    demo('<div style="min-width:600px;background:#eef;padding:10px;border:1px solid #99c">This card has min-width: 600px. This preview is narrower, so it scrolls sideways.</div>',
      '<div style="max-width:100%;background:#eef;padding:10px;border:1px solid #99c">This card adapts to any width and wraps its text, so there is no sideways scroll.</div>',
      ['A fixed min-width forces horizontal scrolling at narrow widths.', 'Fails 1.4.10.'], ['Flexible width means content reflows.'], 140,
      { broken: '.card { min-width: 600px; }', fixed: '.card { max-width: 100%; }\n.row { display: flex; flex-wrap: wrap; gap: 1rem; }' }),
    [['Reflow width in CSS px?', ['768', '320', '480', '1024'], 1, '320 CSS px.'],
     ['Which is exempt?', ['Paragraphs', 'Data tables and maps', 'Menus', 'Forms'], 1, 'Content needing two-dimensional layout.']]);

  C('1.4.11',
    'User interface components (borders of inputs, buttons, focus rings, checked states) and graphical objects needed to understand content need at least 3:1 contrast against adjacent colours.',
    ['Low-vision people', 'Anyone in bright light'],
    ['Check input borders, checkboxes, toggles and focus indicators at 3:1', 'Check chart lines, icons and key graphics', 'Check hover/selected states'],
    ['Light grey input borders on white', 'Pale icons without text'],
    [['G195', 'Highly visible focus indicator'], ['G207', 'Ensuring that a 3:1 contrast ratio exists between an icon and its background'], ['G209', 'Providing sufficient contrast at the boundary between adjacent colours']],
    demo('<input placeholder="Search" style="border:1px solid #ddd;padding:8px;width:90%">',
      '<input placeholder="Search" style="border:2px solid #757575;padding:8px;width:90%">',
      ['#ddd on white is ≈1.3:1: the field is nearly invisible.', 'Fails 1.4.11.'], ['#757575 border is ≈4.6:1.'], 100),
    [['UI component contrast requirement?', ['1.5:1', '3:1', '4.5:1', '7:1'], 1, '3:1.'],
     ['Which needs 3:1?', ['A decorative flourish', 'A text input border', 'A logo', 'Disabled button'], 1, 'The input boundary is needed to find the field.']]);

  C('1.4.12',
    'Content and functionality must survive user overrides of line height (1.5×), paragraph spacing (2×), letter spacing (0.12em) and word spacing (0.16em) with no clipping or overlap.',
    ['People with dyslexia', 'Low-vision people', 'People using custom stylesheets or bookmarklets'],
    ['Apply the Text Spacing Bookmarklet (or the demo button)', 'Check buttons, cards, headings and menus for clipping/overlap', 'Check fixed heights and line-height in px'],
    ['Fixed-height boxes with overflow hidden', 'Absolute-positioned text overlapping when spaced'],
    [['C36', 'Allowing for text spacing override'], ['C35', 'Allowing for text spacing without wrapping']],
    demo('<button id="sp" style="margin-bottom:8px">Apply WCAG text spacing</button>\n<div id="c" style="height:34px;overflow:hidden;border:1px solid #888;padding:4px">This single-line box has a fixed height and will cut off text when the spacing grows.</div>\n<script>document.getElementById("sp").onclick=function(){var c=document.getElementById("c");c.style.lineHeight="1.5";c.style.letterSpacing="0.12em";c.style.wordSpacing="0.16em"}</script>',
      '<button id="sp" style="margin-bottom:8px">Apply WCAG text spacing</button>\n<div id="c" style="min-height:34px;border:1px solid #888;padding:4px">This box grows, so nothing is cut off when the spacing grows.</div>\n<script>document.getElementById("sp").onclick=function(){var c=document.getElementById("c");c.style.lineHeight="1.5";c.style.letterSpacing="0.12em";c.style.wordSpacing="0.16em"}</script>',
      ['Press the button: the text is clipped.', 'Fails 1.4.12.'], ['Press the button: the box expands and everything is readable.'], 190,
      { broken: '.box { height: 34px; overflow: hidden; }', fixed: '.box { min-height: 34px; }' }),
    [['Required line-height override?', ['1.0', '1.5', '2.5', '3'], 1, '1.5× font size.'],
     ['What breaks 1.4.12?', ['min-height', 'Fixed heights with overflow hidden', 'em units', 'flex-wrap'], 1, 'Clipping.']]);

  C('1.4.13',
    'Content that appears on hover or focus (tooltips, popovers) must be dismissible without moving pointer or focus, hoverable (the pointer can move onto it), and persistent until dismissed or no longer relevant.',
    ['Low-vision and magnifier users', 'Keyboard users', 'People with tremors who overshoot'],
    ['Hover a trigger: can you move the pointer onto the popup without it vanishing?', 'Press Esc: does it close without moving focus?', 'Does the same content show on keyboard focus?', 'Does it stay until you act?'],
    ['Tooltip disappears when the mouse moves toward it', 'Hover-only popover, never shown on focus', 'Popover cannot be dismissed and covers other content'],
    [['SCR39', 'Making content on focus or hover hoverable, dismissible, and persistent']],
    demo('<style>.w{position:relative;display:inline-block}.t{display:none;position:absolute;top:100%;left:0;background:#222;color:#fff;padding:6px 8px;border-radius:4px;white-space:nowrap;margin-top:6px}.w:hover .t{display:block}</style>\n<div class="w"><button>Hover me</button><span class="t">Hover-only tip</span></div>',
      '<style>.w{position:relative;display:inline-block}.t{display:none;position:absolute;top:100%;left:0;background:#222;color:#fff;padding:6px 8px;border-radius:4px;white-space:nowrap;padding-top:6px}.w:hover .t,.w:focus-within .t{display:block}.w.x .t{display:none!important}</style>\n<div class="w" id="w"><button aria-describedby="tip">Hover or focus me</button><span class="t" id="tip" role="tooltip">Press Esc to dismiss</span></div>\n<script>var w=document.getElementById("w");document.addEventListener("keydown",function(e){if(e.key==="Escape")w.classList.add("x")});w.addEventListener("mouseleave",function(){w.classList.remove("x")});w.addEventListener("focusin",function(){w.classList.remove("x")})</script>',
      ['Tip appears on hover only: keyboard users never see it; there is a gap so the pointer loses it.', 'Fails 1.4.13.'], ['Appears on focus too, can be hovered, and Esc dismisses it.'], 130,
      { broken: '.w:hover .tip { display: block; }', fixed: '.w:hover .tip,\n.w:focus-within .tip { display: block; }\n/* tip is adjacent (hoverable); Esc adds .dismissed */\n.w.dismissed .tip { display: none; }' }),
    [['Which key typically dismisses a tooltip?', ['Enter', 'Escape', 'Tab', 'Space'], 1, 'Esc.'],
     ['“Hoverable” means…', ['Visible on hover only', 'The pointer can move over the popup without it closing', 'It floats', 'It has a hover colour'], 1, 'Users can reach it with the pointer.']]);
})(window.A11Y = window.A11Y || {});
