/* Progress + gamification engine. State lives in localStorage (with an in-memory fallback
   when storage is blocked). Everything is saved under one key so it is easy to export/reset. */
(function (A) {
  'use strict';
  const KEY = 'a11y-academy:v1';

  const bus = { fns: {}, on(e, f) { (this.fns[e] = this.fns[e] || []).push(f); }, emit(e, d) { (this.fns[e] || []).forEach(f => f(d)); } };
  A.bus = bus;

  function today() {
    const d = new Date();
    return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
  }
  function dayDiff(a, b) { return Math.round((new Date(b + 'T00:00:00') - new Date(a + 'T00:00:00')) / 864e5); }

  function defaults() {
    return {
      v: 1, xp: 0,
      streak: { count: 0, best: 0, last: null },
      criteria: {},   // '1.1.1': dateISO  (mastered)
      lessons: {},    // lessonId: dateISO
      quiz: {},       // key: best score
      awarded: {},    // once-only XP keys
      levels: { beginner: true },
      passed: {},     // level checkpoints passed
      badges: {},     // badgeId: dateISO
      hubs: {},       // hub quizzes passed
      perfect: false, placement: null, recent: null, mode: 'level',
      prefs: { theme: 'auto', font: '100', spacing: 'normal', dyslexia: false, motion: 'system' }
    };
  }

  let s = defaults();
  let storageOK = true;

  function load() {
    let raw = null;
    try { raw = localStorage.getItem(KEY); } catch (e) { storageOK = false; }
    if (!raw) return;
    try {
      const p = JSON.parse(raw), d = defaults();
      s = Object.assign(d, p);
      s.prefs = Object.assign(d.prefs, p.prefs || {});
      s.streak = Object.assign(d.streak, p.streak || {});
      s.levels = Object.assign({ beginner: true }, p.levels || {});
    } catch (e) { s = defaults(); }
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(s)); } catch (e) { storageOK = false; }
    bus.emit('change');
  }

  function touchStreak() {
    const t = today();
    if (s.streak.last === t) return;
    if (s.streak.last && dayDiff(s.streak.last, t) === 1) s.streak.count += 1; else s.streak.count = 1;
    s.streak.best = Math.max(s.streak.best, s.streak.count);
    s.streak.last = t;
  }

  function checkBadges() {
    const fresh = [];
    A.data.badges.forEach(b => {
      if (!s.badges[b.id] && b.test(s)) { s.badges[b.id] = new Date().toISOString(); fresh.push(b); }
    });
    if (fresh.length) bus.emit('badges', fresh);
    return fresh;
  }

  const store = {
    get s() { return s; },
    get storageOK() { return storageOK; },
    today, load, save,
    rank() { return Math.floor(s.xp / 100) + 1; },
    rankProgress() { return s.xp % 100; },

    awardOnce(key, xp) {
      if (s.awarded[key]) return 0;
      s.awarded[key] = 1; s.xp += xp; return xp;
    },
    commit() { touchStreak(); checkBadges(); save(); },

    isLearned(num) { return !!s.criteria[num]; },
    setLearned(num, on) {
      if (on) { s.criteria[num] = new Date().toISOString(); store.awardOnce('crit:' + num, 10); }
      else delete s.criteria[num];
      store.commit();
    },
    learnedCount() { return Object.keys(s.criteria).length; },

    lessonDone(id) { return !!s.lessons[id]; },
    completeLesson(id) {
      if (s.lessons[id]) return;
      s.lessons[id] = new Date().toISOString();
      store.awardOnce('lesson:' + id, 20);
      store.commit();
    },

    recordQuiz(key, score, total) {
      const prev = s.quiz[key] || 0;
      let gained = 0;
      if (score > prev) { gained = (score - prev) * 5; s.xp += gained; s.quiz[key] = score; }
      if (score === total && total > 0) s.perfect = true;
      store.commit();
      return gained;
    },

    levelUnlocked(id) { return !!s.levels[id]; },
    unlockThrough(levelId) {
      const order = A.data.levels.find(l => l.id === levelId).order;
      A.data.levels.filter(l => l.order <= order).forEach(l => { s.levels[l.id] = true; });
      store.commit();
    },
    passCheckpoint(levelId) {
      s.passed[levelId] = true;
      const next = A.data.levels.find(l => l.order === A.data.levels.find(x => x.id === levelId).order + 1);
      if (next) s.levels[next.id] = true;
      store.awardOnce('pass:' + levelId, 50);
      store.commit();
      return next;
    },

    passHub(id) {
      s.hubs = s.hubs || {}; s.hubs[id] = true;
      store.awardOnce('hub:' + id, 40);
      store.commit();
    },
    setRecent(route, title) { s.recent = { route, title }; save(); },
    setMode(m) { s.mode = m; save(); },
    setPlacement(levelId) { s.placement = levelId; store.commit(); },
    setPrefs(p) { Object.assign(s.prefs, p); save(); },

    reset() { s = defaults(); save(); },
    exportJSON() { return JSON.stringify(s, null, 2); },
    importJSON(txt) {
      const p = JSON.parse(txt);
      if (!p || typeof p !== 'object' || p.v !== 1) throw new Error('Not an A11y Academy progress file');
      const d = defaults();
      s = Object.assign(d, p); s.prefs = Object.assign(d.prefs, p.prefs || {});
      save();
    }
  };

  A.store = store;
  store.load();
})(window.A11Y = window.A11Y || {});
