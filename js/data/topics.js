/* 28 topic hubs (Axis B), grouped A–G. Each hub maps to WCAG 2.2 criteria.
   `phase` = the delivery phase in which that hub's full content ships. */
(function (A) {
  A.data = A.data || {};

  A.data.groups = [
    { id: 'A', name: 'Media' },
    { id: 'B', name: 'Interaction and input' },
    { id: 'C', name: 'Complex components' },
    { id: 'D', name: 'Content and structure' },
    { id: 'E', name: 'Forms and transactions' },
    { id: 'F', name: 'Platforms and documents' },
    { id: 'G', name: 'Pro+ practice' }
  ];

  const T = (n, id, group, name, icon, phase, summary, who, criteria) =>
    ({ n, id, group, name, icon, phase, summary, who, criteria });

  A.data.topics = [
    T(1, 'video', 'A', 'Video accessibility', '🎬', 2,
      'Captions, transcripts, audio description, sign language, player controls, autoplay and flashing content.',
      ['Deaf and hard-of-hearing people', 'Blind and low-vision people', 'People with motor impairments', 'People with photosensitive epilepsy'],
      ['1.2.1', '1.2.2', '1.2.3', '1.2.5', '1.2.6', '1.2.7', '1.2.8', '1.2.9', '1.4.2', '2.2.2', '2.3.1']),
    T(2, 'audio', 'A', 'Audio accessibility', '🎧', 2,
      'Podcasts, transcripts, autoplaying audio, volume control, background noise and voice input.',
      ['Deaf and hard-of-hearing people', 'People with auditory processing difficulties', 'Screen reader users', 'Voice-control users'],
      ['1.2.1', '1.2.4', '1.2.9', '1.4.2', '1.4.7', '2.5.3']),
    T(3, 'animation', 'A', 'Animation, motion and carousels', '🎞️', 2,
      'Auto-play, pause/stop/hide, parallax, prefers-reduced-motion, GIFs, Lottie and carousels.',
      ['People with vestibular disorders', 'People with ADHD or cognitive disabilities', 'People with photosensitive epilepsy', 'Keyboard users'],
      ['2.2.2', '2.3.1', '2.3.2', '2.3.3']),
    T(4, 'live', 'A', 'Live content', '📡', 2,
      'Live captions, aria-live, toasts, notifications, chat and real-time updates.',
      ['Deaf and hard-of-hearing people', 'Screen reader users', 'People with cognitive disabilities'],
      ['1.2.4', '1.2.9', '2.2.4', '4.1.3']),

    T(5, 'drag-drop', 'B', 'Drag-and-drop', '🧲', 3,
      'Single-pointer alternatives, keyboard alternatives, live announcements, Kanban boards, uploads and sortables.',
      ['Keyboard-only users', 'People with tremors or limited dexterity', 'Voice-control users', 'Screen reader users'],
      ['2.1.1', '2.5.1', '2.5.7', '2.5.8', '4.1.2', '4.1.3']),
    T(6, 'pointer', 'B', 'Pointer, touch and gestures', '👆', 3,
      'Target size, pointer cancellation, path-based gestures, motion actuation, hover/focus content and swipe alternatives.',
      ['People with motor impairments', 'Switch and head-pointer users', 'Screen magnifier users', 'Touch-device users'],
      ['1.4.13', '2.5.1', '2.5.2', '2.5.4', '2.5.5', '2.5.6', '2.5.7', '2.5.8']),
    T(7, 'keyboard', 'B', 'Keyboard and focus management', '⌨️', 3,
      'Focus order, visible focus, traps, roving tabindex, skip links and shortcuts.',
      ['Keyboard-only users', 'Screen reader users', 'Switch users', 'Low-vision users'],
      ['2.1.1', '2.1.2', '2.1.3', '2.1.4', '2.4.1', '2.4.3', '2.4.7', '2.4.11', '2.4.12', '2.4.13', '3.2.1']),
    T(8, 'voice', 'B', 'Voice control and speech input', '🎙️', 3,
      'Dragon, Voice Control, Label in Name and matching visible labels.',
      ['People who cannot use hands', 'People with RSI', 'Speech-input users'],
      ['2.1.4', '2.5.3', '3.3.2', '4.1.2']),

    T(9, 'overlays', 'C', 'Overlays', '🪟', 4,
      'Modal dialogs, drawers, popovers, tooltips vs toggletips, toasts, cookie banners and consent managers.',
      ['Screen reader users', 'Keyboard-only users', 'Screen magnifier users'],
      ['1.4.13', '2.1.1', '2.1.2', '2.4.3', '2.4.11', '4.1.2', '4.1.3']),
    T(10, 'navigation', 'C', 'Navigation components', '🧭', 4,
      'Mega menus, dropdowns, hamburger menus, breadcrumbs, pagination, tabs, accordions and skip links.',
      ['Keyboard-only users', 'Screen reader users', 'People with cognitive disabilities'],
      ['2.4.1', '2.4.3', '2.4.4', '2.4.5', '2.4.8', '2.4.9', '2.4.10', '2.4.11', '3.2.3', '3.2.4', '4.1.2']),
    T(11, 'widgets', 'C', 'Selection and input widgets', '🎛️', 4,
      'Combobox, listbox, date picker, slider, switch, radio group, rating stars, stepper and OTP input.',
      ['Screen reader users', 'Keyboard-only users', 'Voice-control users', 'Switch users'],
      ['1.3.1', '1.3.5', '2.1.1', '2.5.7', '2.5.8', '3.3.2', '3.3.8', '4.1.2']),
    T(12, 'data-rich', 'C', 'Data-rich components', '📊', 4,
      'Data tables, sortable grids, tree views, infinite scroll, virtualized lists, calendars and Kanban.',
      ['Screen reader users', 'Keyboard-only users', 'Screen magnifier users'],
      ['1.3.1', '1.3.2', '1.4.10', '2.1.1', '2.2.2', '4.1.2', '4.1.3']),
    T(13, 'rich-content', 'C', 'Rich content tools', '✍️', 4,
      'Rich text editors, code editors, file uploaders, image croppers, comment threads and AI chat.',
      ['Screen reader users', 'Keyboard-only users', 'Voice-control users'],
      ['1.3.1', '2.1.1', '2.1.2', '3.3.2', '4.1.2', '4.1.3']),

    T(14, 'images', 'D', 'Images and graphics', '🖼️', 2,
      'Alt text decisions, decorative vs informative, complex images, SVG, icons, text in images and CAPTCHAs.',
      ['Blind and low-vision people', 'People on slow connections', 'People with cognitive disabilities'],
      ['1.1.1', '1.3.3', '1.4.5', '1.4.9', '1.4.11']),
    T(15, 'charts-maps', 'D', 'Charts, data visualization and maps', '📈', 5,
      'Text alternatives, data tables, patterns not just colour, tooltips, interactive maps and dashboards.',
      ['Blind and low-vision people', 'Colour-blind people', 'Keyboard-only users'],
      ['1.1.1', '1.3.1', '1.4.1', '1.4.3', '1.4.11', '1.4.13']),
    T(16, 'typography', 'D', 'Typography, colour and layout', '🎨', 2,
      'Contrast, colour alone, resize text, reflow, text spacing, orientation, dark mode and forced colours.',
      ['Low-vision people', 'Colour-blind people', 'People with dyslexia', 'Screen magnifier users'],
      ['1.3.4', '1.4.1', '1.4.3', '1.4.4', '1.4.5', '1.4.6', '1.4.8', '1.4.10', '1.4.11', '1.4.12']),
    T(17, 'cognitive', 'D', 'Language, reading and cognitive accessibility', '🧠', 5,
      'Plain language, reading level, abbreviations, language of parts, consistency, timeouts and memory-friendly design.',
      ['People with cognitive and learning disabilities', 'People with ADHD, dyslexia or autism', 'Non-native readers'],
      ['1.3.6', '2.2.3', '2.2.5', '2.2.6', '3.1.1', '3.1.2', '3.1.3', '3.1.4', '3.1.5', '3.1.6', '3.2.5', '3.2.6', '3.3.4', '3.3.6', '3.3.7']),

    T(18, 'forms', 'E', 'Forms', '📝', 5,
      'Labels, instructions, grouping, autocomplete, validation, error summaries, wizards and accessible authentication.',
      ['Screen reader users', 'Voice-control users', 'People with cognitive disabilities', 'Password-manager users'],
      ['1.3.1', '1.3.5', '3.2.2', '3.3.1', '3.3.2', '3.3.3', '3.3.4', '3.3.5', '3.3.6', '3.3.7', '3.3.8', '3.3.9', '4.1.3']),
    T(19, 'ecommerce', 'E', 'E-commerce and payments', '🛒', 5,
      'Product listings, filters, cart, checkout, address and payment fields, confirmations and pricing display.',
      ['Everyone who shops online', 'Screen reader users', 'Keyboard-only users'],
      ['1.1.1', '1.3.1', '2.4.6', '3.2.2', '3.3.1', '3.3.4', '3.3.7', '4.1.3']),

    T(20, 'spa', 'F', 'Single-page apps and frameworks', '⚛️', 5,
      'Route-change focus and announcements, page titles, dynamic content, loading states and web components.',
      ['Screen reader users', 'Keyboard-only users'],
      ['2.4.1', '2.4.2', '2.4.3', '3.2.1', '3.2.2', '4.1.2', '4.1.3']),
    T(21, 'cms', 'F', 'CMS and WordPress', '🧩', 5,
      'Accessible themes, Gutenberg blocks, page builders, plugins, form plugins and the accessibility-ready checklist.',
      ['Content editors', 'Everyone using a CMS-built site'],
      ['1.1.1', '1.3.1', '2.4.1', '2.4.2', '2.4.6', '3.1.1']),
    T(22, 'pdf-docs', 'F', 'PDF and documents', '📄', 5,
      'Tagged PDFs, reading order, forms, Word/PowerPoint/Excel accessibility and accessible HTML email.',
      ['Screen reader users', 'People with cognitive disabilities'],
      ['1.1.1', '1.3.1', '1.3.2', '2.4.2', '3.1.1', '3.3.2']),
    T(23, 'elearning', 'F', 'E-learning', '🎓', 5,
      'Articulate Storyline 360 and Rise, SCORM, quizzes, timers, drag-and-drop and focus order in slide layers.',
      ['Learners with disabilities', 'Keyboard-only users', 'Deaf and hard-of-hearing learners'],
      ['1.2.2', '2.1.1', '2.2.1', '2.2.6', '2.4.3', '2.5.7', '4.1.2']),
    T(24, 'mobile', 'F', 'Mobile and native apps', '📱', 5,
      'iOS VoiceOver, Android TalkBack, touch targets, orientation, dynamic type and responsive vs native.',
      ['Mobile screen reader users', 'People with motor impairments', 'Low-vision users'],
      ['1.3.4', '1.4.4', '2.5.1', '2.5.2', '2.5.4', '2.5.8', '4.1.2']),
    T(25, 'games', 'F', 'Games, canvas and WebGL', '🎮', 6,
      'Canvas fallbacks, control remapping, audio cues, difficulty and cognitive settings.',
      ['Gamers with disabilities', 'Keyboard and switch users'],
      ['1.1.1', '1.4.2', '2.1.1', '2.2.1', '2.3.1', '2.5.1', '2.5.4']),

    T(26, 'auditing', 'G', 'Auditing and testing', '🔍', 6,
      'Automated vs manual testing, screen reader scripts, browser × SR matrices and usability testing with disabled people.',
      ['Everyone — good audits find the problems real users hit'], []),
    T(27, 'reporting', 'G', 'Reporting and compliance', '📋', 6,
      'Writing issues and recommendations, severity ratings, VPAT/ACR, EAA, ADA, Section 508, EN 301 549 and statements.',
      ['Organizations and legal teams', 'Everyone affected by non-compliance'], []),
    T(28, 'workflow', 'G', 'Accessibility in the workflow', '⚙️', 6,
      'Design tokens, Figma annotations, CI/CD with axe-core, linting, QA checklists, procurement and team training.',
      ['Design, engineering and QA teams'], [])
  ];

  A.data.topicById = {};
  A.data.topics.forEach(t => { A.data.topicById[t.id] = t; });

  // Cross-link: every criterion lists the hubs it belongs to.
  A.data.link = function () {
    A.data.criteria.forEach(c => { c.topics = []; });
    A.data.topics.forEach(t => {
      t.criteria.forEach(num => {
        const c = A.data.criterionByNum[num];
        if (!c) throw new Error('Unknown criterion ' + num + ' in topic ' + t.id);
        c.topics.push(t.id);
      });
    });
    // Pro+ hubs (26–28) are cross-cutting; criteria not mapped elsewhere still belong to auditing.
    A.data.criteria.forEach(c => { if (!c.topics.length) c.topics.push('auditing'); });
  };
  A.data.link();
})(window.A11Y = window.A11Y || {});
