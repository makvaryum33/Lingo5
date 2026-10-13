/* ============================================================
   Lingo5 – SM-2 Aralıklı Tekrar (SRS) Motoru
   SuperMemo 2 algoritması + Lingo5 1-3-7-14-30-60 merdiveni
   ============================================================ */
"use strict";

var SRS = (function () {
  var KEY = "lingo5.srs.v1";
  var MIN = 60 * 1000;
  var DAY = 24 * 60 * 60 * 1000;
  /* Lingo5 yöntem kartı: 1-3-7-14-30-60 gün */
  var LADDER = [1, 3, 7, 14, 30, 60];

  function now() { return new Date().getTime(); }

  function load() {
    try {
      var raw = window.localStorage.getItem(KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) { return {}; }
  }

  function save(deck) {
    try { window.localStorage.setItem(KEY, JSON.stringify(deck)); } catch (e) {}
  }

  function create(id) {
    return { id: id, ef: 2.5, reps: 0, interval: 0, due: now(), lapses: 0, last: 0, seen: 1 };
  }

  /* quality: 0 = unuttum, 3 = zor, 4 = orta, 5 = kolay */
  function grade(id, quality) {
    var deck = load();
    var it = deck[id] || create(id);
    if (quality < 3) {
      it.reps = 0;
      it.interval = 0;
      it.due = now() + 10 * MIN;      /* hızlı tekrar: 10 dk sonra */
      it.lapses += 1;
    } else {
      if (it.reps < LADDER.length) {
        it.interval = LADDER[it.reps];
      } else {
        it.interval = Math.max(1, Math.round(it.interval * it.ef));
      }
      it.reps += 1;
      /* SM-2 easiness factor güncellemesi */
      it.ef = it.ef + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
      if (it.ef < 1.3) { it.ef = 1.3; }
      if (it.ef > 3.0) { it.ef = 3.0; }
      it.due = now() + it.interval * DAY;
    }
    it.last = now();
    deck[id] = it;
    save(deck);
    return it;
  }

  function get(id) {
    var deck = load();
    return deck[id] || null;
  }

  function forget(id) {
    var deck = load();
    delete deck[id];
    save(deck);
  }

  function resetAll() { save({}); }

  /* ids: kart kimlikleri; dönen değer: {newList, dueList, laterList} */
  function partition(ids) {
    var deck = load();
    var t = now();
    var res = { fresh: [], due: [], later: [], learned: 0 };
    for (var i = 0; i < ids.length; i++) {
      var id = ids[i];
      var it = deck[id];
      if (!it) { res.fresh.push(id); continue; }
      if (it.reps >= 3) { res.learned += 1; }
      if (it.due <= t) { res.due.push(id); }
      else { res.later.push(id); }
    }
    return res;
  }

  function dueCount(ids) {
    return partition(ids).due.length;
  }

  function mastery(ids) {
    /* 0-100 arası öğrenme yüzdesi */
    if (!ids.length) { return 0; }
    var deck = load();
    var total = 0;
    for (var i = 0; i < ids.length; i++) {
      var it = deck[ids[i]];
      if (!it) { total += 0; continue; }
      var s = Math.min(1, it.reps / 6);
      total += s * (it.ef / 2.5);
    }
    return Math.round(Math.min(100, (total / ids.length) * 100));
  }

  function exportJSON() { return JSON.stringify(load()); }

  function importJSON(text) {
    try {
      var obj = JSON.parse(text);
      if (obj && typeof obj === "object") { save(obj); return true; }
    } catch (e) {}
    return false;
  }

  return {
    grade: grade, get: get, forget: forget, resetAll: resetAll,
    partition: partition, dueCount: dueCount, mastery: mastery,
    exportJSON: exportJSON, importJSON: importJSON
  };
})();