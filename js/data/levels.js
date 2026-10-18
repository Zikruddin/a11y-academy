/* Levels (Axis A) and badge definitions. Classic script (not an ES module) so the
   site works when opened straight from disk via file:// — no server needed. */
(function (A) {
  A.data = A.data || {};

  A.data.levels = [
    { id: 'beginner', name: 'Beginner', icon: '●', order: 1, requires: null,
      blurb: 'Core ideas, the four principles, and the Level A basics every page needs.' },
    { id: 'intermediate', name: 'Intermediate', icon: '◆', order: 2, requires: 'beginner',
      blurb: 'Level AA in practice: contrast, focus, forms, target size and reflow.' },
    { id: 'advanced', name: 'Advanced', icon: '▲', order: 3, requires: 'intermediate',
      blurb: 'ARIA, complex widgets, status messages and testing with assistive tech.' },
    { id: 'pro', name: 'Pro+', icon: '★', order: 4, requires: 'advanced',
      blurb: 'AAA, auditing, reporting, legal context and building a11y into workflow.' }
  ];

  // Badges. `test(state)` runs after every progress change.
  A.data.badges = [
    { id: 'first-lesson', name: 'First Step', desc: 'Complete your first lesson.', icon: '🌱', test: s => Object.keys(s.lessons).length >= 1 },
    { id: 'crit-5', name: 'Getting Warm', desc: 'Master 5 success criteria.', icon: '🔥', test: s => Object.keys(s.criteria).length >= 5 },
    { id: 'crit-25', name: 'Quarter Master', desc: 'Master 25 success criteria.', icon: '🧭', test: s => Object.keys(s.criteria).length >= 25 },
    { id: 'crit-43', name: 'Halfway There', desc: 'Master 43 success criteria (half of WCAG 2.2).', icon: '⛰️', test: s => Object.keys(s.criteria).length >= 43 },
    { id: 'crit-86', name: 'WCAG 2.2 Master', desc: 'Master all 86 success criteria.', icon: '👑', test: s => Object.keys(s.criteria).length >= 86 },
    { id: 'streak-3', name: 'Three-Day Streak', desc: 'Learn on 3 days in a row.', icon: '📅', test: s => s.streak.best >= 3 },
    { id: 'streak-7', name: 'Week Warrior', desc: 'Learn on 7 days in a row.', icon: '🗓️', test: s => s.streak.best >= 7 },
    { id: 'perfect', name: 'Perfect Score', desc: 'Get every question right in a quiz.', icon: '🎯', test: s => !!s.perfect },
    { id: 'placed', name: 'Know Thyself', desc: 'Take the placement quiz.', icon: '🧪', test: s => !!s.placement },
    { id: 'pass-beginner', name: 'Beginner Checkpoint', desc: 'Pass the Beginner checkpoint.', icon: '●', test: s => !!s.passed.beginner },
    { id: 'pass-intermediate', name: 'Intermediate Checkpoint', desc: 'Pass the Intermediate checkpoint.', icon: '◆', test: s => !!s.passed.intermediate },
    { id: 'pass-advanced', name: 'Advanced Checkpoint', desc: 'Pass the Advanced checkpoint.', icon: '▲', test: s => !!s.passed.advanced },
    { id: 'pass-pro', name: 'Pro+ Checkpoint', desc: 'Pass the Pro+ checkpoint.', icon: '★', test: s => !!s.passed.pro }
  ];
})(window.A11Y = window.A11Y || {});
