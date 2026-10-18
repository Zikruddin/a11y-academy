/* Phase 6: fills the remaining Intermediate/Advanced/Pro+ gaps in the Media, Images and Typography hubs. */
(function (A) {
  'use strict';
  const ul = a => '<ul>' + a.map(x => `<li>${x}</li>`).join('') + '</ul>';
  const lesson = (id, topic, level, minutes, criteria, title, summary, intro, points, quiz) => A.data.lessons.push({
    id, topic, level, minutes, criteria, title, summary, demo: null, body: `<p>${intro}</p><h2>Key points</h2>${ul(points)}`,
    quiz: quiz.map(([q, options, answer, why]) => ({ q, options, answer, why })) });

  lesson('video-player-custom-advanced', 'video', 'advanced', 9, ['1.2.5', '2.1.1', '4.1.2'], 'Custom players and extended access', 'Build or buy a player that works for everyone.',
    'Custom video players often break keyboard access, captions and audio description.',
    ['Every control is a native button with a name and state.', 'Captions and audio description are toggles users can reach.', 'Provide a transcript and a way to pause on load.', 'Test with a screen reader and at 400% zoom.'],
    [['Player controls should be…', ['Native buttons with names', 'Divs', 'Images', 'Hover-only'], 0, '2.1.1 and 4.1.2.'], ['Audio description is needed for…', ['Visual-only information', 'Music', 'Silence', 'Text'], 0, '1.2.5.']]);
  lesson('audio-podcast-intermediate', 'audio', 'intermediate', 7, ['1.2.1', '1.4.7', '1.4.2'], 'Podcasts, transcripts and background audio', 'Text for every sound.',
    'Audio-only content needs a text equivalent, and background sound must not mask speech.',
    ['Publish a transcript with speaker names.', 'Keep background audio quiet or switchable.', 'Provide pause and volume controls.', 'Do not autoplay.'],
    [['Audio-only content needs…', ['A transcript', 'Captions only', 'Nothing', 'Colour'], 0, '1.2.1.'], ['Background audio should be…', ['Quiet or switchable', 'Louder', 'Hidden', 'Looped'], 0, '1.4.7.']]);
  lesson('audio-players-advanced', 'audio', 'advanced', 8, ['4.1.2', '2.1.1', '1.2.1'], 'Accessible audio players and sound design', 'Controls, status and non-speech sound.',
    'Players must expose play state, progress and volume to assistive technology.',
    ['Use native audio controls or fully labelled custom ones.', 'Announce play/pause state changes politely.', 'Provide a text alternative for meaningful sounds.', 'Never rely on sound alone for alerts.'],
    [['Alerts must not use…', ['Sound alone', 'Text', 'Icons', 'Colour and text'], 0, 'Add a visual/text cue.'], ['Native controls…', ['Include keyboard support', 'Cannot be used', 'Are slower', 'Are hidden'], 0, 'Free keyboard access.']]);
  lesson('audio-spatial-pro', 'audio', 'pro', 8, ['1.2.1', '1.4.2', '2.2.2'], 'Voice interfaces, spatial audio and soundscapes', 'Designing sound for all.',
    'Voice UI and immersive audio need visual and text equivalents.',
    ['Offer text input as an alternative to voice.', 'Provide captions for spoken responses.', 'Let users control volume per layer (voice, music, effects).', 'Avoid time limits on spoken prompts.'],
    [['Voice UI should offer…', ['A text alternative', 'Nothing', 'Only voice', 'Louder voice'], 0, 'Multiple modes.'], ['Layered volume helps…', ['Hard-of-hearing users', 'Nobody', 'Developers only', 'Printing'], 0, 'Separate mixes.']]);

  lesson('animation-controls-intermediate', 'animation', 'intermediate', 7, ['2.2.2', '2.3.3'], 'Pause, stop, hide and motion triggers', 'User control over movement.',
    'Moving content that lasts over 5 seconds needs a control; interaction-triggered motion should be optional.',
    ['Add a visible pause button to carousels and tickers.', 'Respect <code>prefers-reduced-motion</code>.', 'Avoid parallax or provide a toggle.', 'Keep auto-updating content pausable.'],
    [['Moving content over …s needs a control.', ['5', '1', '30', '60'], 0, '2.2.2.'], ['The CSS media query is…', ['prefers-reduced-motion', 'hover', 'orientation', 'print'], 0, 'Honour user settings.']]);
  lesson('animation-vestibular-advanced', 'animation', 'advanced', 8, ['2.3.3', '2.2.2', '2.3.1'], 'Vestibular safety and animation design', 'Large motion is a medical issue.',
    'Parallax, zooming and large-scale movement can cause nausea and dizziness.',
    ['Replace large movement with fades when reduced motion is on.', 'Avoid scroll-jacking.', 'Keep durations short and subtle.', 'Never flash more than 3 times per second.'],
    [['A safe alternative to a large slide is…', ['A fade', 'A spin', 'A shake', 'A flash'], 0, 'Subtle change.'], ['Scroll-jacking…', ['Harms many users', 'Helps', 'Is required', 'Is invisible'], 0, 'Avoid it.']]);
  lesson('animation-lottie-pro', 'animation', 'pro', 9, ['1.1.1', '2.2.2', '2.3.1'], 'Lottie, GIF, SVG and canvas animation', 'Formats and fallbacks.',
    'Different animation technologies need different accessibility handling.',
    ['GIFs cannot be paused natively: prefer video or provide a control.', 'Lottie/SVG: give a text alternative and pause control.', 'Provide static fallbacks for reduced motion.', 'Check animated GIFs for flashing.'],
    [['Animated GIFs…', ['Cannot be paused natively', 'Always pause', 'Include captions', 'Are accessible by default'], 0, 'Provide control.'], ['Reduced motion should show…', ['A static fallback', 'Faster animation', 'Nothing', 'A pop-up'], 0, 'Respect setting.']]);

  lesson('live-realtime-advanced', 'live', 'advanced', 9, ['1.2.4', '4.1.3', '2.2.1'], 'Live captions, chat and real-time updates', 'Streams, webinars and live regions.',
    'Live content needs live captions and careful announcements.',
    ['Provide live captions (CART or automatic with human review).', 'Make chat accessible and announce new messages sparingly.', 'Offer a recording with accurate captions afterwards.', 'Allow extra time for polls and Q&A.'],
    [['Live video needs…', ['Live captions', 'Nothing', 'Audio description only', 'A transcript later only'], 0, '1.2.4.'], ['Chat announcements should be…', ['Sparing and polite', 'Constant', 'Assertive', 'Silent'], 0, 'Avoid flooding.']]);
  lesson('live-regions-pro', 'live', 'pro', 9, ['4.1.3', '1.3.1'], 'Live region engineering', 'Make announcements reliable.',
    'Live regions must exist before content changes, and different screen readers handle them differently.',
    ['Render the empty region first, then insert text.', 'Use role=status for polite, role=alert for urgent.', 'Avoid re-announcing the whole region.', 'Test with NVDA, JAWS and VoiceOver.'],
    [['Live regions should be…', ['Present before updates', 'Added with the message', 'Hidden with display:none', 'Removed'], 0, 'Pre-render.'], ['display:none content is…', ['Not announced', 'Always announced', 'Assertive', 'Polite'], 0, 'Not in the tree.']]);

  lesson('images-complex-advanced', 'images', 'advanced', 9, ['1.1.1', '1.4.5', '1.3.1'], 'Complex images, diagrams and images of text', 'Long descriptions and alternatives.',
    'Charts, diagrams and maps need more than a short alt.',
    ['Short alt plus a long description or data table nearby.', 'Avoid images of text; use real text.', 'Use <code>figure</code> and <code>figcaption</code>.', 'Describe the purpose, not just the appearance.'],
    [['A complex diagram needs…', ['Short alt plus long description', 'Nothing', 'Only title', 'Only colour'], 0, 'Layered alternatives.'], ['Prefer…', ['Real text', 'Images of text', 'Canvas', 'GIFs'], 0, '1.4.5.']]);
  lesson('images-svg-pro', 'images', 'pro', 9, ['1.1.1', '1.4.11', '4.1.2'], 'SVG, icons, CSS images and responsive images', 'Technique choices for modern graphics.',
    'Inline SVG, icon fonts and CSS backgrounds each have different accessibility behaviour.',
    ['Inline SVG: <code>role="img"</code> with a title or aria-label.', 'Decorative SVG: <code>aria-hidden="true"</code>.', 'CSS background images carry no semantics.', 'Check icon-font glyphs are not read as odd characters.'],
    [['Decorative SVG uses…', ['aria-hidden="true"', 'role=button', 'alt', 'title'], 0, 'Hide it.'], ['CSS background images…', ['Have no alt text', 'Are always announced', 'Need aria-live', 'Are focusable'], 0, 'No semantics.']]);

  lesson('typography-systems-pro', 'typography', 'pro', 9, ['1.4.3', '1.4.4', '1.4.8', '1.4.12'], 'Accessible type systems and design tokens', 'Scale, contrast and spacing at system level.',
    'Typography problems repeat at scale; fix them in the system.',
    ['Use relative units (rem) and fluid type with sane limits.', 'Define tested colour pairs and a focus token.', 'Support text spacing overrides without clipping.', 'Document line length, line height and alignment rules.'],
    [['Relative units like rem…', ['Respect user preferences', 'Block zoom', 'Are invisible', 'Break reflow'], 0, 'Scale with user settings.'], ['Design tokens help by…', ['Making pass the default', 'Adding colour', 'Hiding text', 'Slowing pages'], 0, 'Consistency.']]);
})(window.A11Y = window.A11Y || {});
