/* All 86 WCAG 2.2 success criteria (4.1.1 Parsing was removed in 2.2: it is obsolete).
   Counts: 31 Level A, 24 Level AA, 31 Level AAA.
   Row format: number | level | name | who (v=vision, h=hearing, m=motor, c=cognitive, s=seizure/vestibular) */
(function (A) {
  A.data = A.data || {};

  A.data.principles = {
    1: { name: 'Perceivable', blurb: 'Information must be presentable in ways users can perceive.' },
    2: { name: 'Operable', blurb: 'Interface components and navigation must be operable.' },
    3: { name: 'Understandable', blurb: 'Information and operation of the UI must be understandable.' },
    4: { name: 'Robust', blurb: 'Content must work with current and future assistive technologies.' }
  };

  A.data.guidelines = {
    '1.1': 'Text Alternatives', '1.2': 'Time-based Media', '1.3': 'Adaptable', '1.4': 'Distinguishable',
    '2.1': 'Keyboard Accessible', '2.2': 'Enough Time', '2.3': 'Seizures and Physical Reactions',
    '2.4': 'Navigable', '2.5': 'Input Modalities', '3.1': 'Readable', '3.2': 'Predictable',
    '3.3': 'Input Assistance', '4.1': 'Compatible'
  };

  A.data.whoLabels = { v: 'Vision', h: 'Hearing', m: 'Motor', c: 'Cognitive', s: 'Seizure / vestibular' };

  const RAW = `
1.1.1|A|Non-text Content|vc
1.2.1|A|Audio-only and Video-only (Prerecorded)|vhc
1.2.2|A|Captions (Prerecorded)|hc
1.2.3|A|Audio Description or Media Alternative (Prerecorded)|vc
1.2.4|AA|Captions (Live)|hc
1.2.5|AA|Audio Description (Prerecorded)|v
1.2.6|AAA|Sign Language (Prerecorded)|h
1.2.7|AAA|Extended Audio Description (Prerecorded)|v
1.2.8|AAA|Media Alternative (Prerecorded)|vhc
1.2.9|AAA|Audio-only (Live)|h
1.3.1|A|Info and Relationships|vc
1.3.2|A|Meaningful Sequence|vc
1.3.3|A|Sensory Characteristics|vhc
1.3.4|AA|Orientation|mv
1.3.5|AA|Identify Input Purpose|cm
1.3.6|AAA|Identify Purpose|c
1.4.1|A|Use of Color|v
1.4.2|A|Audio Control|vhc
1.4.3|AA|Contrast (Minimum)|v
1.4.4|AA|Resize Text|v
1.4.5|AA|Images of Text|v
1.4.6|AAA|Contrast (Enhanced)|v
1.4.7|AAA|Low or No Background Audio|hc
1.4.8|AAA|Visual Presentation|vc
1.4.9|AAA|Images of Text (No Exception)|v
1.4.10|AA|Reflow|vm
1.4.11|AA|Non-text Contrast|v
1.4.12|AA|Text Spacing|vc
1.4.13|AA|Content on Hover or Focus|vmc
2.1.1|A|Keyboard|vm
2.1.2|A|No Keyboard Trap|vm
2.1.3|AAA|Keyboard (No Exception)|vm
2.1.4|A|Character Key Shortcuts|mc
2.2.1|A|Timing Adjustable|mc
2.2.2|A|Pause, Stop, Hide|vcs
2.2.3|AAA|No Timing|mc
2.2.4|AAA|Interruptions|c
2.2.5|AAA|Re-authenticating|mc
2.2.6|AAA|Timeouts|c
2.3.1|A|Three Flashes or Below Threshold|s
2.3.2|AAA|Three Flashes|s
2.3.3|AAA|Animation from Interactions|s
2.4.1|A|Bypass Blocks|vm
2.4.2|A|Page Titled|vc
2.4.3|A|Focus Order|vm
2.4.4|A|Link Purpose (In Context)|vc
2.4.5|AA|Multiple Ways|c
2.4.6|AA|Headings and Labels|vc
2.4.7|AA|Focus Visible|vm
2.4.8|AAA|Location|c
2.4.9|AAA|Link Purpose (Link Only)|vc
2.4.10|AAA|Section Headings|vc
2.4.11|AA|Focus Not Obscured (Minimum)|vm
2.4.12|AAA|Focus Not Obscured (Enhanced)|vm
2.4.13|AAA|Focus Appearance|v
2.5.1|A|Pointer Gestures|m
2.5.2|A|Pointer Cancellation|m
2.5.3|A|Label in Name|vm
2.5.4|A|Motion Actuation|m
2.5.5|AAA|Target Size (Enhanced)|m
2.5.6|AAA|Concurrent Input Mechanisms|m
2.5.7|AA|Dragging Movements|m
2.5.8|AA|Target Size (Minimum)|m
3.1.1|A|Language of Page|vc
3.1.2|AA|Language of Parts|vc
3.1.3|AAA|Unusual Words|c
3.1.4|AAA|Abbreviations|c
3.1.5|AAA|Reading Level|c
3.1.6|AAA|Pronunciation|vc
3.2.1|A|On Focus|vmc
3.2.2|A|On Input|vmc
3.2.3|AA|Consistent Navigation|vc
3.2.4|AA|Consistent Identification|vc
3.2.5|AAA|Change on Request|mc
3.2.6|A|Consistent Help|c
3.3.1|A|Error Identification|vc
3.3.2|A|Labels or Instructions|vc
3.3.3|AA|Error Suggestion|vc
3.3.4|AA|Error Prevention (Legal, Financial, Data)|c
3.3.5|AAA|Help|c
3.3.6|AAA|Error Prevention (All)|c
3.3.7|A|Redundant Entry|mc
3.3.8|AA|Accessible Authentication (Minimum)|c
3.3.9|AAA|Accessible Authentication (Enhanced)|c
4.1.2|A|Name, Role, Value|v
4.1.3|AA|Status Messages|v
`;

  // Difficulty tag = level axis. Default follows conformance level; overrides tune it.
  const DIFF_DEFAULT = { A: 'beginner', AA: 'intermediate', AAA: 'advanced' };
  const DIFF_OVERRIDE = {
    '1.2.3': 'intermediate', '1.3.2': 'intermediate', '2.1.4': 'intermediate', '2.2.1': 'intermediate',
    '2.3.1': 'intermediate', '2.4.3': 'intermediate', '2.5.1': 'intermediate', '2.5.2': 'intermediate',
    '2.5.4': 'intermediate', '4.1.2': 'advanced', '4.1.3': 'advanced', '1.4.13': 'advanced',
    '2.4.11': 'advanced', '2.5.7': 'advanced', '3.3.8': 'advanced', '1.3.5': 'advanced',
    // AAA items that make good Pro+ material
    '1.2.6': 'pro', '1.2.7': 'pro', '1.2.9': 'pro', '1.3.6': 'pro', '2.2.5': 'pro', '2.2.6': 'pro',
    '2.3.2': 'pro', '2.4.9': 'pro', '2.4.10': 'pro', '2.4.12': 'pro', '2.4.13': 'pro', '3.1.3': 'pro',
    '3.1.6': 'pro', '3.3.9': 'pro', '2.5.6': 'pro', '1.4.9': 'pro'
  };

  A.data.criteria = RAW.trim().split('\n').map(line => {
    const [num, level, name, who] = line.split('|');
    const p = Number(num[0]);
    return {
      num, level, name,
      who: who.split(''),
      principle: p,
      guideline: num.split('.').slice(0, 2).join('.'),
      difficulty: DIFF_OVERRIDE[num] || DIFF_DEFAULT[level],
      isNew22: ['2.4.11', '2.4.12', '2.4.13', '2.5.7', '2.5.8', '3.2.6', '3.3.7', '3.3.8', '3.3.9'].includes(num),
      topics: [] // filled in by A.data.link() once topics are loaded
    };
  });

  A.data.criterionByNum = {};
  A.data.criteria.forEach(c => { A.data.criterionByNum[c.num] = c; });

  // Build the W3C "Understanding" URL from the criterion name.
  A.data.w3cUrl = function (c) {
    const slug = c.name.toLowerCase().replace(/[(),]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    return 'https://www.w3.org/WAI/WCAG22/Understanding/' + slug + '.html';
  };
})(window.A11Y = window.A11Y || {});
