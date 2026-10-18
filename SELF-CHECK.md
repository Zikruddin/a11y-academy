# Self-check results

Run on 2026-10-18 against the files in this folder, opened from `file://` in Chromium.

## Automated (axe-core, tags wcag2a, wcag2aa, wcag21a, wcag21aa, wcag22aa, best-practice)
| Theme | Pages scanned | Violations | Console errors |
|---|---|---|---|
| Light | 261 | 0 | 0 |
| Dark | 114 (sample) | 0 | 0 |
| High contrast | 114 (sample) | 0 | 0 |

Pages covered: home, learn views, all 4 level pages, all 28 hubs, all 86 criteria (Broken and Fixed demo states in separate runs),
all 119 lessons, explorer, dashboard, glossary, placement, checkpoints, every lab, resources, summary, guide, roadmap and statement.

Also checked: no horizontal overflow at 320, 768, 1024 and 1920 px; keyboard-only completion of the Keyboard Challenge;
all hub quizzes award their badges; 233 routes load without console errors.

## Not done (needs a human)
- **Real screen reader testing** (NVDA, JAWS, VoiceOver, TalkBack). The Screen Reader Simulator is a simplified model, not a real screen reader.
- **Lighthouse**: could not be run in the build environment. Run it in Chrome DevTools; axe covers the same accessibility rules.
- **Technique IDs** (G, H, F, ARIA, C, SCR numbers) were written from memory; verify against https://www.w3.org/WAI/WCAG22/Techniques/.
- **Accessibility statement contact**: replace the placeholder "[Add your contact email or issue-tracker link here.]" in `js/views.js`.
- Manual checks at 200 % browser zoom, Windows forced-colors mode, and on real phones.
- Automated tools find only part of the issues; the demos intentionally contain inaccessible "Broken" code inside sandboxed frames.
