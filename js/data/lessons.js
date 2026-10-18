/* Lessons (bite-sized, ~5 min). Each lesson belongs to one TOPIC and one LEVEL.
   Shape: { id, topic, level, title, minutes, criteria:[...], summary, body:'<html>', demo:'1.4.3' (optional criterion
   whose demo is embedded), quiz:[...] }
   To add a lesson: append an object below. It appears automatically in its topic hub, level page,
   the matrix, the command palette and the roadmap. */
(function (A) {
  A.data = A.data || {};
  A.data.lessons = [
    {
      id: 'images-alt-basics', topic: 'images', level: 'beginner', minutes: 5, criteria: ['1.1.1'],
      title: 'Alt text in five minutes',
      summary: 'Decide in seconds whether an image needs alt text, and write one that helps.',
      demo: '1.1.1',
      body: `
        <p>Every image answers one question for a sighted user: <em>what is this doing here?</em> Alt text answers the same question for everyone else.</p>
        <h2>The three-question decision tree</h2>
        <ol>
          <li><strong>Is it purely decorative</strong> (flourish, background texture, duplicate of nearby text)? Use <code>alt=""</code>.</li>
          <li><strong>Does it carry information or trigger an action</strong> (chart, photo that matters, icon button)? Describe the <em>purpose</em>, not the pixels.</li>
          <li><strong>Is it too complex for a sentence</strong> (infographic, map)? Give a short alt and a long description nearby.</li>
        </ol>
        <h2>Do and don't</h2>
        <ul>
          <li>Do keep it short and specific: “Sales rose 20% from Q1 to Q2”.</li>
          <li>Don't start with “image of” — the screen reader already says “graphic”.</li>
          <li>Don't leave the attribute off. Without <code>alt</code>, many screen readers read the file name.</li>
        </ul>`,
      quiz: [
        { q: 'A decorative divider line between sections should use…',
          options: ['alt="divider line"', 'alt=""', 'no alt attribute', 'title="divider"'], answer: 1,
          why: 'An empty alt value removes it from the accessibility tree.' },
        { q: 'A logo that links to the home page. The best alt text is…',
          options: ['"logo"', '"Acme — home"', '""', '"image of the Acme logo"'], answer: 1,
          why: 'For a linked image, describe the link destination/purpose.' }
      ]
    },
    {
      id: 'video-captions-basics', topic: 'video', level: 'beginner', minutes: 6, criteria: ['1.2.1', '1.2.2', '1.2.3'],
      title: 'Captions, transcripts and audio description',
      summary: 'Know which media alternative each audience needs, and which WCAG level requires it.',
      body: `
        <p>Media is where the <strong>time-based</strong> criteria (1.2.x) live. Three alternatives cover most needs:</p>
        <table class="table">
          <caption class="sr-only">Media alternatives compared</caption>
          <thead><tr><th scope="col">Alternative</th><th scope="col">Helps</th><th scope="col">Required at</th></tr></thead>
          <tbody>
            <tr><th scope="row">Captions</th><td>Deaf, hard-of-hearing, noisy rooms</td><td>A (prerecorded), AA (live)</td></tr>
            <tr><th scope="row">Audio description</th><td>Blind and low-vision users</td><td>A (or alternative), AA (description)</td></tr>
            <tr><th scope="row">Transcript</th><td>Deafblind users (braille), search, skimming</td><td>A for audio-only</td></tr>
          </tbody>
        </table>
        <h2>Open vs closed captions</h2>
        <p><strong>Closed</strong> captions can be turned on and off and styled by the viewer — prefer these. <strong>Open</strong> captions are baked into the picture: reliable on social platforms but not adjustable.</p>
        <h2>Standard vs extended audio description</h2>
        <p>Standard fits descriptions into natural pauses. <strong>Extended</strong> (AAA, 1.2.7) pauses the video when the pauses are too short.</p>`,
      quiz: [
        { q: 'Which alternative is required for prerecorded video WITH audio at Level A?',
          options: ['Sign language', 'Captions', 'Extended audio description', 'Live captions'], answer: 1,
          why: '1.2.2 Captions (Prerecorded) is Level A.' },
        { q: 'Viewers can switch these on and off:',
          options: ['Open captions', 'Closed captions', 'Burned-in subtitles', 'None of the above'], answer: 1,
          why: 'Closed captions are a separate track the player can toggle.' }
      ]
    },
    {
      id: 'keyboard-focus-visible', topic: 'keyboard', level: 'beginner', minutes: 5, criteria: ['2.4.7', '2.1.1'],
      title: 'Make focus visible',
      summary: 'Why outline:none is a bug, and how to design a focus ring people can actually see.',
      demo: '2.4.7',
      body: `
        <p>If you can't see where keyboard focus is, you can't use the page. <code>outline: none</code> without a replacement is one of the most common failures on the web.</p>
        <h2>A reliable recipe</h2>
        <ul>
          <li>Use <code>:focus-visible</code> so mouse clicks don't show rings but keyboard use does.</li>
          <li>Make the ring at least 2px thick with 3:1 contrast against its surroundings (1.4.11, and 2.4.13 at AAA).</li>
          <li>Add <code>outline-offset</code> so it doesn't collide with the element's own border.</li>
          <li>Check sticky headers don't cover the focused element (2.4.11) — try <code>scroll-padding-top</code>.</li>
        </ul>`,
      quiz: [
        { q: 'Which CSS removes the focus indicator and is a failure unless replaced?',
          options: ['outline: none', 'outline-offset: 2px', ':focus-visible { outline: 3px solid }', 'scroll-padding-top'], answer: 0,
          why: 'Removing the outline without providing another visible indicator fails 2.4.7 (F78).' }
      ]
    },
    {
      id: 'typography-contrast-basics', topic: 'typography', level: 'beginner', minutes: 5, criteria: ['1.4.3', '1.4.1'],
      title: 'Contrast that works',
      summary: 'Hit 4.5:1 for text and 3:1 for UI, and stop relying on colour alone.',
      demo: '1.4.3',
      body: `
        <p>Contrast is the criterion most often failed. The numbers are simple:</p>
        <ul>
          <li><strong>4.5:1</strong> for normal text, <strong>3:1</strong> for large text (≥24px, or ≥18.66px bold).</li>
          <li><strong>3:1</strong> for UI boundaries, icons and focus rings (1.4.11).</li>
          <li>Placeholder text and disabled controls are exempt from the rule only if disabled; placeholders still need contrast.</li>
        </ul>
        <h2>Colour alone is not enough</h2>
        <p>An error field that only turns red fails 1.4.1. Add an icon and text such as “Error: enter a valid email”. The same goes for links inside paragraphs: underline them or give 3:1 contrast against surrounding text <em>and</em> a non-colour cue on hover/focus.</p>`,
      quiz: [
        { q: 'Grey (#aaa) text on white has a ratio of about 2.3:1. For normal text at AA this…',
          options: ['Passes', 'Fails — needs 4.5:1', 'Passes only for headings', 'Is exempt'], answer: 1,
          why: '#aaa on white is ~2.32:1 and fails 1.4.3.' }
      ]
    }
  ];
})(window.A11Y = window.A11Y || {});
