/* Authored mini-lesson content, keyed by criterion number. Criteria without an entry here
   still appear everywhere (explorer, hubs, matrix) with a "lesson arriving in Phase N" card.
   Shape: { explain, who:[...], test:[...], failures:[...], techniques:[{id,label}], demo:{...}, quiz:[...] }
   demo: { broken:'<html>', fixed:'<html>', findings:{broken:[..], fixed:[..]}, height:px }
   Use {{IMG}} in demo HTML for a built-in sample image; code view shows it as sales-chart.png. */
(function (A) {
  A.data = A.data || {};
  A.data.criteriaContent = {

    '1.1.1': {
      explain: 'Every image, icon, chart or other non-text content needs a text alternative that serves the same purpose. Decorative content is the exception: mark it so assistive technology ignores it.',
      who: ['Blind and low-vision people using screen readers or braille displays', 'People who turn images off on slow connections', 'People with cognitive disabilities who benefit from text equivalents'],
      test: ['Turn images off or inspect each <img>: does it have an alt attribute?', 'Read the alt aloud — does it convey the same purpose as the image?', 'Run axe or WAVE to catch missing alt, then review quality manually', 'With NVDA/VoiceOver, tab through linked images and icon buttons: are they named?'],
      failures: ['F65: <img> with no alt attribute', 'F30: alt text that is a file name or placeholder (“image1.png”)', 'F3: CSS background image carrying meaning, with no text alternative', 'Icon-only buttons with no accessible name'],
      techniques: [{ id: 'H37', label: 'Using alt attributes on img elements' }, { id: 'H67', label: 'Null alt for decorative images' }, { id: 'ARIA6', label: 'aria-label to provide labels for objects' }, { id: 'G94', label: 'Short text alternative for non-text content' }],
      demo: {
        broken: '<h2>Q2 Results</h2>\n<img src="{{IMG}}" width="240">\n<p>See the chart above.</p>',
        fixed: '<h2>Q2 Results</h2>\n<img src="{{IMG}}" width="240" alt="Bar chart: sales rose 20% from Q1 to Q2">\n<p>See the chart above.</p>',
        findings: {
          broken: ['Screen reader says “graphic” or reads the file name. The message of the chart is lost.', 'Fails 1.1.1 (F65).'],
          fixed: ['Screen reader says “Bar chart: sales rose 20% from Q1 to Q2”.', 'Alt conveys purpose, not pixels.']
        },
        height: 200
      },
      quiz: [
        { q: 'An <img> with alt="" is…', options: ['A failure', 'Treated as decorative and skipped by screen readers', 'Read as "empty"', 'Invalid HTML'], answer: 1, why: 'Empty alt is the sanctioned way to hide purely decorative images.' },
        { q: 'Best alt text for an icon-only “search” button image?', options: ['"magnifying glass"', '"Search"', '"button"', '""'], answer: 1, why: 'Name the function, not the picture.' }
      ]
    },

    '1.4.3': {
      explain: 'Text and images of text need a contrast ratio of at least 4.5:1 against the background (3:1 for large text). Logos and purely decorative text are exempt.',
      who: ['People with low vision or colour-vision deficiency', 'Older adults', 'Anyone reading on a phone in bright sunlight'],
      test: ['Use a contrast checker (CCA, DevTools, WebAIM) on foreground/background pairs', 'Check text on images and gradients at the worst-case spot', 'Check hover, focus, disabled-looking and placeholder states', 'Test in dark mode and forced-colors mode'],
      failures: ['G18-failing pairs such as #aaa on #fff (2.3:1)', 'Light placeholder text in inputs', 'White text over variable photographs without an overlay', 'Brand-colour buttons with thin low-contrast labels'],
      techniques: [{ id: 'G18', label: 'Ensuring 4.5:1 text contrast' }, { id: 'G145', label: 'Ensuring 3:1 for large text' }, { id: 'F24', label: 'Failure: specifying only one of foreground/background colour' }, { id: 'F83', label: 'Failure: background images with insufficient text contrast' }],
      demo: {
        broken: '<p style="color:#aaaaaa;font-size:18px">Free shipping on orders over $50 — today only.</p>\n<button style="background:#9ad;color:#fff;border:0;padding:10px 16px;font-size:16px">Shop now</button>',
        fixed: '<p style="color:#595959;font-size:18px">Free shipping on orders over $50 — today only.</p>\n<button style="background:#1b4b8f;color:#fff;border:0;padding:10px 16px;font-size:16px">Shop now</button>',
        findings: {
          broken: ['#aaaaaa on white = 2.3:1 — fails 4.5:1.', 'White on #99aadd = 2.4:1 — fails.'],
          fixed: ['#595959 on white = 7.0:1 — passes AA and AAA.', 'White on #1b4b8f = 8.7:1 — passes.']
        },
        height: 150
      },
      quiz: [
        { q: 'What ratio does normal-size text need at AA?', options: ['3:1', '4.5:1', '7:1', '21:1'], answer: 1, why: '1.4.3 (AA): 4.5:1; large text 3:1.' },
        { q: 'Which text is exempt from 1.4.3?', options: ['Button labels', 'Placeholder text', 'Pure decoration and logotypes', 'Headings'], answer: 2, why: 'Incidental text, logotypes and inactive controls are exempt.' }
      ]
    },

    '2.4.7': {
      explain: 'Any keyboard-operable interface must have a mode of operation where the keyboard focus indicator is visible. If you cannot see where focus is, you cannot operate the page.',
      who: ['Keyboard-only users', 'People with low vision', 'Switch and sip-and-puff users who simulate keys', 'Power users who prefer the keyboard'],
      test: ['Tab through the whole page: can you always see where you are?', 'Try every state: links, buttons, form fields, custom widgets, menus', 'Check on dark and light backgrounds and in forced-colors mode', 'Search CSS for outline:none / outline:0 without a replacement'],
      failures: ['F55: using script to remove focus when focus is received', 'F78: styling that removes or hides the focus indicator', 'Custom focus rings with insufficient contrast', 'Focus ring clipped by overflow:hidden'],
      techniques: [{ id: 'G149', label: 'Using user interface components that are highlighted by the user agent' }, { id: 'G195', label: 'Using an author-supplied, highly visible focus indicator' }, { id: 'C15', label: 'Using CSS to change the presentation of a component on focus' }, { id: 'F78', label: 'Failure: removing the focus indicator' }],
      demo: {
        broken: '<style>a,button{outline:none}\na,button{margin-right:12px}</style>\n<p>Press Tab to move through the links.</p>\n<a href="#">One</a> <a href="#">Two</a> <button>Three</button>',
        fixed: '<style>a:focus-visible,button:focus-visible{\n  outline:3px solid #1d4ed8;\n  outline-offset:3px;\n}\na,button{margin-right:12px}</style>\n<p>Press Tab to move through the links.</p>\n<a href="#">One</a> <a href="#">Two</a> <button>Three</button>',
        findings: {
          broken: ['Focus ring removed (outline:none). Tabbing works but nothing shows where you are.', 'Fails 2.4.7 (F78).'],
          fixed: ['3px solid ring with 3px offset is visible on every control.', ':focus-visible shows it for keyboard use without cluttering mouse clicks.']
        },
        height: 150
      },
      quiz: [
        { q: 'Which selector shows a focus ring for keyboard users but usually not on mouse click?', options: [':hover', ':focus-visible', ':active', ':target'], answer: 1, why: ':focus-visible matches when the browser decides a visible indicator is helpful.' },
        { q: 'Which is the failure?', options: ['outline: 3px solid blue', 'a:focus { outline: none } with nothing else', 'box-shadow focus ring', 'outline-offset: 2px'], answer: 1, why: 'Removing the indicator with no replacement fails 2.4.7.' }
      ]
    },

    '2.5.7': {
      explain: 'Anything that can be done by dragging must also be possible with a single pointer click or tap (or via buttons / keyboard). New in WCAG 2.2 at Level AA.',
      who: ['People with tremors, arthritis or limited dexterity', 'Voice-control and eye-tracking users', 'Switch users', 'Keyboard-only users'],
      test: ['List every drag interaction: sortable lists, sliders, Kanban, map panning, file drop zones', 'Can each be done with simple clicks or taps (e.g. up/down buttons, “move to…” menu)?', 'Can it be done with the keyboard alone?', 'Is the result announced to screen readers (live region)?'],
      failures: ['Sortable list with drag handles only', 'Slider with no keyboard or click-to-set alternative', 'Kanban card moves available only via drag', 'Image cropper with only drag-to-resize'],
      techniques: [{ id: 'G219', label: 'Ensuring that an alternative is available for dragging movements that operate on content' }],
      demo: {
        broken: '<style>li{padding:8px 12px;margin:4px 0;background:#eef;border:1px solid #99c;cursor:grab;list-style:none}</style>\n<p>Reorder by dragging:</p>\n<ul id="l"><li draggable="true">Plan</li><li draggable="true">Build</li><li draggable="true">Test</li></ul>\n<script>\nvar d;document.querySelectorAll("li").forEach(function(li){\n li.addEventListener("dragstart",function(){d=li});\n li.addEventListener("dragover",function(e){e.preventDefault()});\n li.addEventListener("drop",function(e){e.preventDefault();if(d&&d!==li){var l=li.parentNode;var a=Array.prototype.slice.call(l.children);l.insertBefore(d,a.indexOf(d)<a.indexOf(li)?li.nextSibling:li)}});\n});\n<\/script>',
        fixed: '<style>li{padding:8px 12px;margin:4px 0;background:#eef;border:1px solid #99c;list-style:none;display:flex;gap:8px;align-items:center}\nli span{flex:1}button{min-width:32px;min-height:32px}</style>\n<p>Reorder by dragging <em>or</em> with the buttons:</p>\n<ul id="l"></ul><p id="s" role="status"></p>\n<script>\nvar items=["Plan","Build","Test"],l=document.getElementById("l"),s=document.getElementById("s");\nfunction r(f){l.innerHTML="";items.forEach(function(t,i){var li=document.createElement("li");li.innerHTML="<span>"+t+"</span><button aria-label=\\"Move "+t+" up\\""+(i==0?" disabled":"")+">↑</button><button aria-label=\\"Move "+t+" down\\""+(i==items.length-1?" disabled":"")+">↓</button>";var b=li.querySelectorAll("button");b[0].onclick=function(){m(i,-1)};b[1].onclick=function(){m(i,1)};l.appendChild(li)});if(f!=null){var q=l.children[f].querySelectorAll("button:not([disabled])");q[0].focus()}}\nfunction m(i,d){var t=items.splice(i,1)[0];items.splice(i+d,0,t);s.textContent=t+" moved to position "+(i+d+1)+" of "+items.length;r(i+d)}\nr();\n<\/script>',
        findings: {
          broken: ['Reordering works with a mouse drag only. No click, keyboard or touch alternative.', 'Fails 2.5.7 and 2.1.1.'],
          fixed: ['Up/down buttons give a single-pointer and keyboard alternative.', 'A live region announces the new position; focus stays with the moved item.']
        },
        height: 230
      },
      quiz: [
        { q: 'What does 2.5.7 require?', options: ['No dragging allowed', 'A single-pointer alternative to any dragging movement', 'Drag handles 44px wide', 'Haptic feedback'], answer: 1, why: 'Dragging is allowed, but it can’t be the only way.' },
        { q: 'Which is a valid alternative for a sortable list?', options: ['A tooltip', 'Move up / move down buttons', 'A longer drag distance', 'Hover icons'], answer: 1, why: 'Buttons work with a single pointer, keyboard and voice.' }
      ]
    }
  };
})(window.A11Y = window.A11Y || {});
