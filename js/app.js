/* ============================================================
   Lingo5 – Uygulama Mantığı (app.js)
   Görünümler: Ana Sayfa, Program, Kelime, Dilbilgisi, Diyaloglar,
   Sınav, İstatistik.  SRS (srs.js) ve Speech (speech.js) ile entegre.
   Not: Bu dosya Windows Script Host (JScript) ile sözdizimi
   denetiminden geçtiği için ES5 yazım stili kullanılmıştır.
   ============================================================ */
"use strict";

var App = (function () {

  /* ---------- Yardımcılar ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }

  function $$(sel, root) {
    var list = (root || document).querySelectorAll(sel);
    var arr = [];
    for (var i = 0; i < list.length; i++) { arr.push(list[i]); }
    return arr;
  }

  function esc(s) {
    return String(s === null || s === undefined ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
  }

  function pad2(n) { return (n < 10 ? "0" : "") + n; }

  function todayKey() {
    var d = new Date();
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
  }

  function addDaysKey(key, delta) {
    var p = key.split("-");
    var d = new Date(parseInt(p[0], 10), parseInt(p[1], 10) - 1, parseInt(p[2], 10));
    d.setDate(d.getDate() + delta);
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1) + "-" + pad2(d.getDate());
  }

  function todayLong() {
    var gunler = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
    var aylar = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz",
                 "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];
    var d = new Date();
    return d.getDate() + " " + aylar[d.getMonth()] + " " + d.getFullYear() + ", " + gunler[d.getDay()];
  }

  function pct(part, total) {
    if (!total) { return 0; }
    return Math.max(0, Math.min(100, Math.round((part / total) * 100)));
  }

  /* ---------- Kalıcı depolama ---------- */
  var STATS_KEY = "lingo5.stats.v1";
  var PREFS_KEY = "lingo5.prefs.v1";
  var DRAFT_KEY = "lingo5.drafts.v1";
  var QUIZ_KEY = "lingo5.quizzes.v1";

  function loadJSON(key, def) {
    try {
      var raw = window.localStorage.getItem(key);
      return raw ? JSON.parse(raw) : def;
    } catch (e) { return def; }
  }

  function saveJSON(key, val) {
    try { window.localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }

  function defaultStats() {
    return {
      day: todayKey(), minutes: 0, words: 0, reviews: 0, xp: 0,
      totalXp: 0, totalMinutes: 0, totalWords: 0, totalReviews: 0,
      streak: 0, lastDay: "", quizCorrect: 0, quizTotal: 0, shadowDone: 0, examsDone: 0
    };
  }

  var stats = loadJSON(STATS_KEY, defaultStats());
  var prefs = loadJSON(PREFS_KEY, { currentWeek: 1, rate: 1.0, showTr: true });
  var drafts = loadJSON(DRAFT_KEY, {});
  var quizBest = loadJSON(QUIZ_KEY, {});

  function saveStats() { saveJSON(STATS_KEY, stats); }
  function savePrefs() { saveJSON(PREFS_KEY, prefs); }

  function rollDay() {
    var t = todayKey();
    if (stats.day !== t) {
      stats.day = t;
      stats.minutes = 0;
      stats.words = 0;
      stats.reviews = 0;
      stats.xp = 0;
      saveStats();
    }
  }

  function touchStreak() {
    var t = todayKey();
    if (stats.lastDay === t) { return; }
    if (stats.lastDay === addDaysKey(t, -1)) { stats.streak += 1; }
    else { stats.streak = 1; }
    stats.lastDay = t;
    saveStats();
  }

  function gainXp(n) {
    stats.xp += n;
    stats.totalXp += n;
    touchStreak();
    saveStats();
  }

  function addMinutes(m) {
    rollDay();
    stats.minutes += m;
    stats.totalMinutes += m;
    touchStreak();
    saveStats();
  }

  function countWord() {
    rollDay();
    stats.words += 1;
    stats.totalWords += 1;
    touchStreak();
    saveStats();
  }

  function countReview() {
    rollDay();
    stats.reviews += 1;
    stats.totalReviews += 1;
    touchStreak();
    saveStats();
  }

  /* ---------- Toast ---------- */
  var toastTimer = null;
  function toast(msg) {
    var t = $("#toast");
    if (!t) { return; }
    t.innerHTML = esc(msg);
    t.className = "toast show";
    if (toastTimer) { window.clearTimeout(toastTimer); }
    toastTimer = window.setTimeout(function () { t.className = "toast"; }, 2600);
  }

  /* ---------- Alan yardımcıları ---------- */
  function levelBadge(level) {
    return '<span class="badge level-' + esc(level) + '">' + esc(level) + "</span>";
  }

  function bar(pctVal, cls) {
    return '<div class="progress ' + (cls || "") + '"><span style="width:' + pctVal + '%"></span></div>';
  }

  function allWordIds() {
    var ids = [];
    for (var k in VOCAB) {
      if (!VOCAB.hasOwnProperty(k)) { continue; }
      for (var i = 0; i < VOCAB[k].words.length; i++) { ids.push(k + "#" + i); }
    }
    return ids;
  }

  function setWordIds(setKey) {
    var ids = [];
    var set = VOCAB[setKey];
    if (!set) { return ids; }
    for (var i = 0; i < set.words.length; i++) { ids.push(setKey + "#" + i); }
    return ids;
  }

  function wordById(id) {
    var parts = String(id).split("#");
    var set = VOCAB[parts[0]];
    if (!set) { return null; }
    var w = set.words[parseInt(parts[1], 10)];
    if (!w) { return null; }
    return {
      id: id, setKey: parts[0], setTitle: set.title, level: set.level,
      en: w[0], tr: w[1], ex: w[2], exTr: w[3]
    };
  }

  function speakBtn(text, label) {
    return '<button class="btn small ghost" data-action="speak" data-text="' + esc(text) +
      '" title="Telaffuzu dinle">🔊 ' + esc(label || "Dinle") + "</button>";
  }

  /* ---------- Oturum durumları ---------- */
  var state = { pane: null };
  var vocabSession = null;   /* { ids, pos, flipped, mode, title } */
  var quizSession = null;    /* { topicId, title, qs, pos, correct, chosen, done } */
  var dialogSession = null;  /* { id, playing, scores } */
  var examSession = { tab: "overview", answers: {}, showSample: {}, transcript: {} };

  function renderPane() {
    var pane = $("#pane");
    if (pane && state.pane) {
      pane.innerHTML = state.pane();
    }
  }

  /* ---------- Ana Sayfa ---------- */
  function viewHome() {
    var goal = LINGO5.dailyGoal;
    var week = LINGO5.weeks[prefs.currentWeek - 1] || LINGO5.weeks[0];
    var dueIds = SRS.partition(allWordIds()).due;
    var hour = new Date().getHours();
    var selam = hour < 11 ? "Günaydın" : (hour < 18 ? "İyi günler" : "İyi akşamlar");

    var h = '<div class="hero">' +
      "<div><h1>" + selam + " 👋</h1><p>" + esc(todayLong()) + " · Seri: <strong>" + stats.streak + " gün</strong> · " +
      "Bugün <strong>" + stats.xp + " XP</strong> kazandın</p></div>" +
      '<div class="btn-row" style="margin:0">' +
      '<a class="btn primary" href="#/vocab/' + esc(week.vocab[0]) + '">▶ Günlük derse başla</a>' +
      '<a class="btn' + (dueIds.length ? " warn" : "") + '" href="#/review">🔁 Tekrar: ' + dueIds.length + " kart</a>" +
      "</div></div>";

    h += '<div class="section-title"><h2>🎯 Günlük Hedef</h2><span class="muted small">' +
      esc(LINGO5.dailyMinutes) + " dakikalık plan</span></div>";

    function goalCard(icon, label, val, target, cls) {
      return '<div class="card goal-card"><div class="stat-num">' + icon + " " + val + " / " + target + "</div>" +
        '<div class="stat-label">' + esc(label) + "</div>" + bar(pct(val, target), cls) + "</div>";
    }
    h += '<div class="grid cols-4">' +
      goalCard("⏱️", "Çalışma (dakika)", stats.minutes, goal.minutes, "") +
      goalCard("🔤", "Yeni kelime", stats.words, goal.words, "ok") +
      goalCard("🔁", "Tekrar", stats.reviews, goal.reviews, "warn") +
      goalCard("⚡", "XP", stats.xp, goal.xp, "") +
      "</div>";

    h += '<div class="section-title"><h2>📅 Bugünün Planı — Hafta ' + week.w + "</h2>" +
      '<a class="btn small" href="#/program">Tüm program →</a></div>';
    h += '<div class="card"><h3 style="margin-top:0">' + esc(week.title) + "</h3>" +
      '<p class="muted" style="margin-top:0">' + esc(week.focus) + "</p>" +
      '<div class="chip-row">';
    for (var g = 0; g < week.grammar.length; g++) {
      if (GRAMMAR[week.grammar[g]]) {
        h += '<a class="chip" href="#/grammar/' + esc(week.grammar[g]) + '">📗 ' + esc(GRAMMAR[week.grammar[g]].title) + "</a>";
      }
    }
    for (var v = 0; v < week.vocab.length; v++) {
      if (VOCAB[week.vocab[v]]) {
        h += '<a class="chip" href="#/vocab/' + esc(week.vocab[v]) + '">🔤 ' + esc(VOCAB[week.vocab[v]].title) + "</a>";
      }
    }
    var phase = week.p;
    for (var d = 0; d < DIALOGS.length; d++) {
      if (DIALOGS[d].phase === phase) {
        h += '<a class="chip" href="#/dialogs/' + esc(DIALOGS[d].id) + '">🗣️ ' + esc(DIALOGS[d].title) + "</a>";
        break;
      }
    }
    h += "</div></div>";

    h += '<div class="section-title"><h2>🧪 Yöntem — Neden işe yarıyor?</h2></div>';
    h += '<div class="grid cols-2">';
    for (var m = 0; m < LINGO5.method.length; m++) {
      var it = LINGO5.method[m];
      h += '<div class="card method-item"><h3 style="margin-bottom:2px">' + esc(it.icon + " " + it.title) + "</h3>" +
        '<p class="who">' + esc(it.who) + "</p><p style=\"margin:0\">" + esc(it.text) + "</p></div>";
    }
    h += "</div>";
    return h;
  }

  /* ---------- Program ---------- */
  function viewProgram() {
    var h = '<div class="view-head"><h1>📅 22 Haftalık Program</h1>' +
      "<p>6 faz · 5 ay · sıfırdan sınav seviyesine. Mevcut haftan: <strong>" + prefs.currentWeek + "</strong></p></div>";

    h += '<div class="grid cols-3">';
    for (var p = 0; p < LINGO5.phases.length; p++) {
      var ph = LINGO5.phases[p];
      h += '<div class="card phase-card" style="border-top-color:' + esc(ph.color) + '">' +
        '<h3 style="margin-bottom:2px">' + esc(ph.name) + "</h3>" +
        '<p class="weeks">Hafta ' + esc(ph.weeks) + " · " + esc(ph.level) + "</p>" +
        '<p class="muted small" style="margin-bottom:0">' + esc(ph.goal) + "</p></div>";
    }
    h += "</div>";

    h += '<div class="section-title"><h2>Haftalar</h2></div>';
    for (var w = 0; w < LINGO5.weeks.length; w++) {
      var wk = LINGO5.weeks[w];
      var cur = wk.w === prefs.currentWeek ? " current" : "";
      h += '<div class="card week-card' + cur + '" style="margin-bottom:12px">' +
        '<div class="week-num">' + wk.w + "</div><div style=\"flex:1\">" +
        "<strong>" + esc(wk.title) + "</strong> " +
        '<span class="badge">Faz ' + wk.p + "</span>" +
        '<div class="focus">' + esc(wk.focus) + "</div>" +
        '<div class="chip-row">';
      for (var gi = 0; gi < wk.grammar.length; gi++) {
        if (GRAMMAR[wk.grammar[gi]]) {
          h += '<a class="chip" href="#/grammar/' + esc(wk.grammar[gi]) + '">📗 ' + esc(GRAMMAR[wk.grammar[gi]].title) + "</a>";
        }
      }
      for (var vi = 0; vi < wk.vocab.length; vi++) {
        if (VOCAB[wk.vocab[vi]]) {
          h += '<a class="chip" href="#/vocab/' + esc(wk.vocab[vi]) + '">🔤 ' + esc(VOCAB[wk.vocab[vi]].title) + "</a>";
        }
      }
      h += "</div>";
      if (wk.w !== prefs.currentWeek) {
        h += '<div class="btn-row"><button class="btn small" data-action="set-week" data-week="' + wk.w + '">Bu haftaya geç</button></div>';
      }
      h += "</div></div>";
    }
    return h;
  }

  /* ---------- Kelime ---------- */
  function viewVocabList() {
    var h = '<div class="view-head"><h1>🔤 Kelime Bankası</h1>' +
      "<p>37 set · ~370 kelime ve öbek · SM-2 aralıklı tekrar ile kalıcı öğrenme</p></div>";
    h += '<div class="btn-row" style="margin:0 0 16px"><a class="btn primary" href="#/review">🔁 Tekrar Kartları</a></div>';
    h += '<div class="grid cols-3">';
    for (var k in VOCAB) {
      if (!VOCAB.hasOwnProperty(k)) { continue; }
      var set = VOCAB[k];
      var m = SRS.mastery(setWordIds(k));
      h += '<div class="card set-card clickable" data-action="open-set" data-id="' + esc(k) + '">' +
        '<div class="title-row"><strong>' + esc(set.title) + "</strong>" + levelBadge(set.level) + "</div>" +
        '<p class="muted small" style="margin:6px 0 10px">' + set.words.length + " kelime · öğrenme: %" + m + "</p>" +
        bar(m, m >= 60 ? "ok" : "") + "</div>";
    }
    h += "</div>";
    return h;
  }

  function viewVocabSet(setKey) {
    var set = VOCAB[setKey];
    if (!set) { return '<div class="card">Set bulunamadı. <a href="#/vocab">Kelime listesine dön</a></div>'; }
    vocabSession = { ids: setWordIds(setKey), pos: 0, flipped: false, mode: "set", title: set.title, nextSet: nextSetKey(setKey) };
    state.pane = paneVocab;
    var h = '<div class="view-head"><h1>🔤 ' + esc(set.title) + "</h1>" +
      "<p>" + levelBadge(set.level) + " " + set.words.length + " kelime · kartları çevir, kendini test et</p></div>";
    h += '<div class="toolbar"><a class="btn small" href="#/vocab">← Tüm setler</a>' +
      '<div class="btn-row" style="margin:0">' +
      '<button class="btn small" data-action="toggle-list">📋 Listeyi gör</button>' +
      '<button class="btn small" data-action="shuffle">🔀 Karıştır</button></div></div>';
    h += '<div id="pane"></div>';
    return h;
  }

  function nextSetKey(cur) {
    var keys = [];
    for (var k in VOCAB) { if (VOCAB.hasOwnProperty(k)) { keys.push(k); } }
    var i = keys.indexOf(cur);
    return i >= 0 && i + 1 < keys.length ? keys[i + 1] : "";
  }

  function viewReview() {
    var part = SRS.partition(allWordIds());
    var ids = part.due.slice(0, 20);
    if (!ids.length) {
      return '<div class="view-head"><h1>🔁 Tekrar Kartları</h1></div>' +
        '<div class="card"><h3>Şu an tekrar zamanı gelen kart yok 🎉</h3>' +
        '<p class="muted">Yeni kelimeler öğrendikçe (1-3-7-14-30-60 gün aralıklarla) burada karşına çıkacaklar.</p>' +
        '<div class="btn-row"><a class="btn primary" href="#/vocab">Yeni kelime çalış</a></div></div>';
    }
    vocabSession = { ids: ids, pos: 0, flipped: false, mode: "review", title: "Tekrar Kartları", nextSet: "" };
    state.pane = paneVocab;
    var h = '<div class="view-head"><h1>🔁 Tekrar Kartları</h1>' +
      "<p>" + ids.length + " kart tekrar zamanı geldi (toplam " + part.due.length + " · öğrenilen: " + part.learned + ")</p></div>";
    h += '<div class="toolbar"><a class="btn small" href="#/home">← Ana sayfa</a></div>';
    h += '<div id="pane"></div>';
    return h;
  }

  function paneVocab() {
    var s = vocabSession;
    if (!s) { return ""; }
    if (s.showList) {
      var h = '<div class="card"><table class="word-table"><thead><tr><th>#</th><th>İngilizce</th><th>Türkçe</th><th>Örnek</th><th></th></tr></thead><tbody>';
      for (var i = 0; i < s.ids.length; i++) {
        var lw = wordById(s.ids[i]);
        if (!lw) { continue; }
        h += "<tr><td>" + (i + 1) + "</td><td><strong>" + esc(lw.en) + "</strong></td><td>" + esc(lw.tr) + "</td>" +
          "<td>" + esc(lw.ex) + "<br><span class='muted small'>" + esc(lw.exTr) + "</span></td>" +
          "<td>" + speakBtn(lw.en, "") + "</td></tr>";
      }
      h += "</tbody></table></div>";
      return h;
    }
    if (s.pos >= s.ids.length) {
      return '<div class="card quiz-result"><div class="stat-num">🎉</div>' +
        "<h3>Tur tamamlandı!</h3><p class='muted'>" + s.ids.length + " kart çalışıldı.</p>" +
        '<div class="btn-row" style="justify-content:center">' +
        '<button class="btn primary" data-action="vocab-repeat">🔁 Bir tur daha</button>' +
        (s.nextSet ? '<a class="btn" href="#/vocab/' + esc(s.nextSet) + '">➡ Sonraki set</a>' : "") +
        '<a class="btn" href="#/vocab">📋 Set listesi</a></div></div>';
    }
    var w = wordById(s.ids[s.pos]);
    if (!w) { s.pos++; return paneVocab(); }
    var h2 = '<div class="toolbar"><span class="muted">Kart ' + (s.pos + 1) + " / " + s.ids.length + "</span>" +
      bar(pct(s.pos, s.ids.length)) + "</div>";
    h2 += '<div class="flashcard' + (s.flipped ? " flipped" : "") + '" data-action="flip">' +
      '<div class="flashcard-inner">' +
      '<div class="flash-face front"><div class="flash-sub">' + esc(w.setTitle) + "</div>" +
      '<div class="flash-word">' + esc(w.en) + "</div>" +
      '<div class="flash-sub">Kartı çevirmek için dokun</div>' +
      speakBtn(w.en, "Telaffuzu dinle") + "</div>" +
      '<div class="flash-face back"><div class="flash-word">' + esc(w.tr) + "</div>" +
      '<div class="flash-example">' + esc(w.ex) + "</div>" +
      '<div class="flash-sub">' + esc(w.exTr) + "</div>" +
      speakBtn(w.ex, "Örneği dinle") + "</div></div></div>";
    if (s.flipped) {
      h2 += '<div class="grade-btns">' +
        '<button class="btn bad" data-action="grade" data-q="0"><b>Unuttum</b><small>10 dk sonra</small></button>' +
        '<button class="btn warn" data-action="grade" data-q="3"><b>Zor</b><small>yakın tekrar</small></button>' +
        '<button class="btn ok" data-action="grade" data-q="4"><b>Orta</b><small>akılda</small></button>' +
        '<button class="btn primary" data-action="grade" data-q="5"><b>Kolay</b><small>tam öğrenildi</small></button>' +
        "</div>";
    } else {
      h2 += '<div class="btn-row" style="justify-content:center"><button class="btn primary" data-action="flip">Cevabı göster</button></div>';
    }
    return h2;
  }

  /* ---------- Dilbilgisi ---------- */
  function viewGrammarList() {
    var h = '<div class="view-head"><h1>📗 Dilbilgisi Modülleri</h1>' +
      "<p>42 konu · kural (Türkçe) + örnekler + otomatik mini test</p></div>";
    h += '<div class="grid cols-3">';
    for (var k in GRAMMAR) {
      if (!GRAMMAR.hasOwnProperty(k)) { continue; }
      var g = GRAMMAR[k];
      var best = quizBest["g:" + k];
      h += '<div class="card clickable" data-action="open-grammar" data-id="' + esc(k) + '">' +
        '<div style="display:flex;justify-content:space-between;gap:8px;align-items:center">' +
        "<strong>" + esc(g.title) + "</strong>" + levelBadge(g.level) + "</div>" +
        '<p class="muted small" style="margin:6px 0 0">' + esc(g.tr.slice(0, 90)) + "…</p>" +
        '<p class="small" style="margin:8px 0 0">' + (best !== undefined ? "🏆 En iyi test: %" + best : "Test çözülmedi") + "</p></div>";
    }
    h += "</div>";
    return h;
  }

  function viewGrammarTopic(topicId) {
    var g = GRAMMAR[topicId];
    if (!g) { return '<div class="card">Konu bulunamadı. <a href="#/grammar">Listeye dön</a></div>'; }
    quizSession = {
      kind: "grammar", topicId: topicId, title: g.title,
      qs: g.quiz, pos: 0, correct: 0, chosen: -1, done: false
    };
    state.pane = paneQuiz;

    var h = '<div class="view-head"><h1>📗 ' + esc(g.title) + "</h1><p>" + levelBadge(g.level) + "</p></div>";
    h += '<div class="toolbar"><a class="btn small" href="#/grammar">← Tüm konular</a></div>';
    h += '<div class="card"><h3 style="margin-top:0">Kural</h3><p style="margin-top:0">' + esc(g.tr) + "</p>";
    h += '<ul class="rule-list">';
    for (var r = 0; r < g.rules.length; r++) {
      h += "<li>" + esc(g.rules[r]) + "</li>";
    }
    h += "</ul>";
    h += "<h3>Örnekler</h3>";
    for (var e = 0; e < g.ex.length; e++) {
      h += '<div class="example-row">' + speakBtn(g.ex[e][0], "") +
        '<div><div class="en">' + esc(g.ex[e][0]) + '</div><div class="tr">' + esc(g.ex[e][1]) + "</div></div></div>";
    }
    h += "</div>";
    h += '<div class="section-title"><h2>🧪 Mini Test</h2><span class="muted small">' + g.quiz.length + " soru</span></div>";
    h += '<div id="pane"></div>';
    return h;
  }

  function paneQuiz() {
    var s = quizSession;
    if (!s) { return ""; }
    if (s.pos >= s.qs.length || s.done) {
      var pc = pct(s.correct, s.qs.length);
      return '<div class="card quiz-result"><div class="stat-num">%' + pc + "</div>" +
        "<h3>" + s.correct + " / " + s.qs.length + " doğru</h3>" +
        '<p class="muted">' + (pc >= 80 ? "Harika! Konuyu kavramışsın." :
            (pc >= 50 ? "Fena değil — kuralları bir kez daha gözden geçir." :
              "Kuralları tekrar okuyup testi yeniden çöz.")) + "</p>" +
        '<div class="btn-row" style="justify-content:center">' +
        '<button class="btn primary" data-action="quiz-repeat">🔁 Testi tekrarla</button>' +
        '<a class="btn" href="#/grammar">← Konu listesi</a></div></div>';
    }
    var q = s.qs[s.pos];
    var h = '<div class="card"><div class="muted small">Soru ' + (s.pos + 1) + " / " + s.qs.length + "</div>" +
      '<div class="quiz-q">' + esc(q.q) + '</div><div class="quiz-opts">';
    for (var i = 0; i < q.a.length; i++) {
      var cls = "quiz-opt";
      if (s.chosen >= 0) {
        cls += " locked";
        if (i === q.c) { cls += " correct"; }
        else if (i === s.chosen) { cls += " wrong"; }
      }
      h += '<button class="' + cls + '" data-action="quiz-choose" data-i="' + i + '">' + esc(q.a[i]) + "</button>";
    }
    h += "</div>";
    if (s.chosen >= 0) {
      h += '<div class="btn-row">' +
        '<button class="btn primary" data-action="quiz-next">' +
        (s.pos + 1 >= s.qs.length ? "Sonucu gör" : "Sonraki soru →") + "</button></div>";
    }
    h += "</div>";
    return h;
  }

  /* ---------- Diyaloglar (Gölgeleme) ---------- */
  function viewDialogList() {
    var h = '<div class="view-head"><h1>🗣️ Gölgeleme Diyalogları</h1>' +
      "<p>Sesi dinle, hemen ardından tekrarla. Telaffuz + dinleme + akıcılık aynı anda gelişir.</p></div>";
    h += '<div class="grid cols-2">';
    for (var i = 0; i < DIALOGS.length; i++) {
      var d = DIALOGS[i];
      h += '<div class="card clickable" data-action="open-dialog" data-id="' + esc(d.id) + '">' +
        "<strong>" + esc(d.title) + "</strong> " + levelBadge(d.level) +
        '<p class="muted small" style="margin:6px 0 0">Faz ' + d.phase + " · " + d.lines.length + " satır</p></div>";
    }
    h += "</div>";
    return h;
  }

  function findDialog(id) {
    for (var i = 0; i < DIALOGS.length; i++) {
      if (DIALOGS[i].id === id) { return DIALOGS[i]; }
    }
    return null;
  }

  function viewDialog(dialogId) {
    var d = findDialog(dialogId);
    if (!d) { return '<div class="card">Diyalog bulunamadı. <a href="#/dialogs">Listeye dön</a></div>'; }
    dialogSession = { id: dialogId, playing: false, scores: {} };
    state.pane = paneDialog;

    var h = '<div class="view-head"><h1>🗣️ ' + esc(d.title) + "</h1><p>" + levelBadge(d.level) +
      " · " + d.lines.length + " satır · gölgeleme pratiği</p></div>";
    h += '<div class="toolbar"><a class="btn small" href="#/dialogs">← Tüm diyaloglar</a>' +
      '<div class="btn-row" style="margin:0">' +
      '<button class="btn small primary" data-action="dialog-play-all">▶ Tümünü dinle</button>' +
      '<button class="btn small" data-action="dialog-stop">⏹ Durdur</button>' +
      '<button class="btn small" data-action="dialog-toggle-tr">' +
      (prefs.showTr ? "🇹🇷 Türkçeyi gizle" : "🇹🇷 Türkçeyi göster") + "</button>" +
      "</div></div>";
    h += '<div id="pane"></div>';
    return h;
  }

  function paneDialog() {
    var d = findDialog(dialogSession.id);
    if (!d) { return ""; }
    var h = "";
    for (var li = 0; li < d.lines.length; li++) {
      var ln = d.lines[li];
      h += '<div class="dialog-line" id="dline-' + li + '">' +
        speakBtn(ln.en, "") +
        '<div class="line-body"><div class="en">' + esc(ln.en) + "</div>" +
        (prefs.showTr ? '<div class="tr">' + esc(ln.tr) + "</div>" : "") +
        '<div id="shadow-' + li + '"></div></div>' +
        '<button class="btn small" data-action="shadow" data-i="' + li + '">🎤 Gölgele</button>' +
        "</div>";
    }
    h += '<div class="card" style="margin-top:14px"><h3 style="margin-top:0">Gölgeleme nasıl yapılır?</h3>' +
      '<ul class="tip-list"><li>Önce 🔊 ile satırı dinle.</li>' +
      "<li>Ses biter bitmez aynen tekrar et (gölgeleme).</li>" +
      "<li>🎤 düğmesiyle konuş; uygulama benzerlik puanını ve kaçırdığın kelimeleri göstersin.</li>" +
      "<li>Ses tanıma desteklenmiyorsa metin kutusuna yazıp karşılaştırabilirsin.</li></ul></div>";
    return h;
  }

  function shadowResultHtml(lineIdx, res, spokenText) {
    var cls = res.score >= 80 ? "ok" : (res.score >= 50 ? "warn" : "");
    var h = '<div class="score-bar">' + bar(res.score, cls) +
      '<span class="score-val">%' + res.score + "</span></div>";
    if (spokenText) {
      h += '<div class="heard-text">🗣️ Duyduklarım: ' + esc(spokenText) + "</div>";
    }
    if (res.missing && res.missing.length) {
      h += '<div class="missing-words">Kaçırılan: ' + esc(res.missing.join(", ")) + "</div>";
    }
    return h;
  }

  function applyShadowScore(lineIdx, res, spokenText) {
    var box = $("#shadow-" + lineIdx);
    if (box) { box.innerHTML = shadowResultHtml(lineIdx, res, spokenText); }
    dialogSession.scores[lineIdx] = res.score;
    if (res.score >= 60) {
      gainXp(5);
      stats.shadowDone += 1;
      saveStats();
    }
    var allDone = true;
    var d = findDialog(dialogSession.id);
    for (var i = 0; i < d.lines.length; i++) {
      if (dialogSession.scores[i] === undefined) { allDone = false; break; }
    }
    if (allDone) {
      gainXp(15);
      toast("Gölgeleme turu tamamlandı! +15 XP bonus 🎉");
    }
  }

  /* ---------- Sınav (IELTS / TOEFL pratiği) ---------- */
  function examTabBtn(tab, label) {
    return '<button class="btn small' + (examSession.tab === tab ? " active" : "") +
      '" data-action="exam-tab" data-tab="' + tab + '">' + label + "</button>";
  }

  function questionBlock(qi, q, answerKey, checked) {
    var chosen = examSession.answers[answerKey];
    var h = '<div class="quiz-q">' + (qi + 1) + ". " + esc(q.q) + '</div><div class="quiz-opts">';
    for (var i = 0; i < q.a.length; i++) {
      var cls = "quiz-opt";
      if (checked) {
        cls += " locked";
        if (i === q.c) { cls += " correct"; }
        else if (i === chosen) { cls += " wrong"; }
      } else if (i === chosen) {
        cls += " correct";
      }
      h += '<button class="' + cls + '" data-action="exam-answer" data-key="' + esc(answerKey) +
        '" data-i="' + i + '"' + (checked ? " disabled" : "") + ">" + esc(q.a[i]) + "</button>";
    }
    h += "</div>";
    return h;
  }

  function viewExam() {
    var h = '<div class="view-head"><h1>🎯 Sınav Pratiği</h1>' +
      "<p>IELTS / TOEFL formatında okuma, dinleme, yazma ve konuşma görevleri</p></div>";
    h += '<div class="tabs">' + examTabBtn("overview", "📋 Genel Bakış") +
      examTabBtn("reading", "📖 Okuma") + examTabBtn("listening", "🎧 Dinleme") +
      examTabBtn("writing", "✍️ Yazma") + examTabBtn("speaking", "🎤 Konuşma") + "</div>";

    if (examSession.tab === "overview") { h += examOverviewHtml(); }
    else if (examSession.tab === "reading") { h += examReadingHtml(); }
    else if (examSession.tab === "listening") { h += examListeningHtml(); }
    else if (examSession.tab === "writing") { h += examWritingHtml(); }
    else { h += examSpeakingHtml(); }
    return h;
  }

  function examOverviewHtml() {
    var h = "";
    for (var key in LINGO5.exams) {
      if (!LINGO5.exams.hasOwnProperty(key)) { continue; }
      var ex = LINGO5.exams[key];
      h += '<div class="card" style="margin-bottom:14px"><h2 style="margin-top:0">' + esc(ex.name) + "</h2>" +
        '<p class="muted" style="margin-top:0">' + esc(ex.full) + "</p>";
      for (var s = 0; s < ex.sections.length; s++) {
        var sec = ex.sections[s];
        h += '<div class="example-row"><div><div class="en">' + esc(sec.part) + " — " + esc(sec.detail) + "</div>" +
          '<div class="tr">💡 ' + esc(sec.tip) + "</div></div></div>";
      }
      h += '<p class="small muted" style="margin-bottom:0">' + esc(ex.bands) + "</p></div>";
    }
    h += '<div class="card"><h3 style="margin-top:0">Bu bölümde neler var?</h3>' +
      '<ul class="tip-list"><li><strong>Okuma:</strong> pasaj + True/False tarzı sorular, anında puan.</li>' +
      "<li><strong>Dinleme:</strong> TTS ile dinleme kaydı, transkript, sorular.</li>" +
      "<li><strong>Yazma:</strong> Task 1 / Task 2 kompozisyonları, taslak kaydetme, örnek cevap.</li>" +
      "<li><strong>Konuşma:</strong> cue card görevleri, sesli pratik, kelime sayısı takibi.</li></ul></div>";
    return h;
  }

  function examReadingHtml() {
    var h = "";
    for (var i = 0; i < EXAM.reading.length; i++) {
      var item = EXAM.reading[i];
      var checked = !!examSession.answers["checked:" + item.id];
      var scoreH = "";
      if (checked) {
        var correct = 0;
        for (var q1 = 0; q1 < item.questions.length; q1++) {
          if (examSession.answers[item.id + ":" + q1] === item.questions[q1].c) { correct += 1; }
        }
        scoreH = '<div class="card" style="margin-bottom:10px"><strong>Sonuç: ' + correct + " / " +
          item.questions.length + "</strong> · " + pct(correct, item.questions.length) + " / 100</div>";
      }
      h += '<div class="card" style="margin-bottom:16px">' +
        '<h2 style="margin-top:0">📖 ' + esc(item.title) + " " + levelBadge(item.level) + "</h2>" +
        '<div class="passage">';
      for (var p = 0; p < item.passage.length; p++) {
        h += "<p>" + esc(item.passage[p]) + "</p>";
      }
      h += "</div>";
      for (var q = 0; q < item.questions.length; q++) {
        h += questionBlock(q, item.questions[q], item.id + ":" + q, checked);
      }
      h += scoreH;
      if (!checked) {
        h += '<div class="btn-row"><button class="btn primary" data-action="exam-check" data-id="' +
          esc(item.id) + '" data-kind="reading">Cevapları kontrol et</button></div>';
      }
      h += "</div>";
    }
    return h;
  }

  function examListeningHtml() {
    var h = '<div class="card" style="margin-bottom:14px"><h3 style="margin-top:0">🎧 Dinleme modu</h3>' +
      '<p class="muted" style="margin-top:0">Her metni 🔊 ile dinle; istersen önce transkripti gizle. ' +
      "Soruları dinlemeden önce taramak sınav taktiğidir.</p></div>";
    for (var i = 0; i < EXAM.listening.length; i++) {
      var item = EXAM.listening[i];
      var checked = !!examSession.answers["checked:" + item.id];
      h += '<div class="card" style="margin-bottom:16px">' +
        '<h2 style="margin-top:0">🎧 ' + esc(item.title) + " " + levelBadge(item.level) + "</h2>" +
        '<div class="btn-row" style="margin:0 0 10px">' +
        '<button class="btn small primary" data-action="listen-play" data-id="' + esc(item.id) + '">▶ Kaydı dinle</button>' +
        '<button class="btn small" data-action="listen-stop">⏹ Durdur</button>' +
        '<button class="btn small" data-action="listen-toggle-tr">' +
        (prefs.showTr ? "Transkripti gizle" : "Transkripti göster") + "</button></div>";
      if (prefs.showTr) {
        h += '<div class="passage">';
        for (var t = 0; t < item.transcript.length; t++) {
          h += '<div class="dialog-line" id="dline-' + t + '">' + speakBtn(item.transcript[t].en, "") +
            '<div class="line-body"><div class="en">' + esc(item.transcript[t].en) + '</div><div class="tr">' +
            esc(item.transcript[t].tr) + "</div></div></div>";
        }
        h += "</div>";
      }
      for (var q = 0; q < item.questions.length; q++) {
        h += questionBlock(q, item.questions[q], item.id + ":" + q, checked);
      }
      if (!checked) {
        h += '<div class="btn-row"><button class="btn primary" data-action="exam-check" data-id="' +
          esc(item.id) + '" data-kind="listening">Cevapları kontrol et</button></div>';
      } else {
        var correct = 0;
        for (var q2 = 0; q2 < item.questions.length; q2++) {
          if (examSession.answers[item.id + ":" + q2] === item.questions[q2].c) { correct += 1; }
        }
        h += '<div class="card" style="margin-top:10px"><strong>Sonuç: ' + correct + " / " +
          item.questions.length + "</strong> · " + pct(correct, item.questions.length) + " / 100</div>";
      }
      h += "</div>";
    }
    return h;
  }

  function examWritingHtml() {
    var h = "";
    for (var i = 0; i < EXAM.writing.length; i++) {
      var item = EXAM.writing[i];
      var draft = drafts[item.id] || "";
      var showS = !!examSession.showSample[item.id];
      var words = draft.trim() ? draft.trim().split(/\s+/).length : 0;
      h += '<div class="card" style="margin-bottom:16px">' +
        '<h2 style="margin-top:0">✍️ ' + esc(item.type) + " — " + esc(item.title) + " " + levelBadge(item.level) + "</h2>" +
        '<p class="muted">' + esc(item.prompt) + "</p>" +
        "<h3>İpuçları</h3><ul class=\"tip-list\">";
      for (var t = 0; t < item.tips.length; t++) { h += "<li>" + esc(item.tips[t]) + "</li>"; }
      h += "</ul>" +
        '<textarea data-action="draft" data-id="' + esc(item.id) +
        '" placeholder="Cevabını buraya yaz… (otomatik kaydedilir)">' + esc(draft) + "</textarea>" +
        '<div class="toolbar" style="margin:10px 0 0"><span class="muted small" id="wc-' + esc(item.id) + '">' +
        words + " kelime</span>" +
        '<div class="btn-row" style="margin:0">' +
        '<button class="btn small" data-action="toggle-sample" data-id="' + esc(item.id) + '">' +
        (showS ? "Örneği gizle" : "Örnek cevabı göster") + "</button>" +
        '<button class="btn small bad" data-action="clear-draft" data-id="' + esc(item.id) + '">Temizle</button>' +
        "</div></div>";
      if (showS) {
        h += '<div class="sample-box">' + esc(item.sample) + "</div>";
      }
      h += "</div>";
    }
    return h;
  }

  function examSpeakingHtml() {
    var h = "";
    for (var i = 0; i < EXAM.speaking.length; i++) {
      var item = EXAM.speaking[i];
      var said = examSession.transcript[item.id] || "";
      h += '<div class="card" style="margin-bottom:16px">' +
        '<h2 style="margin-top:0">🎤 ' + esc(item.part) + " — " + esc(item.title) + " " + levelBadge(item.level) + "</h2>" +
        '<p class="muted">' + esc(item.prompt) + "</p>" +
        "<h3>İpuçları</h3><ul class=\"tip-list\">";
      for (var t = 0; t < item.tips.length; t++) { h += "<li>" + esc(item.tips[t]) + "</li>"; }
      h += "</ul>";
      if (item.followups && item.followups.length) {
        h += "<h3>Follow-up soruları</h3><div class=\"chip-row\">";
        for (var f = 0; f < item.followups.length; f++) {
          h += '<span class="chip">💬 ' + esc(item.followups[f]) + "</span>";
        }
        h += "</div>";
      }
      h += '<div class="btn-row">' +
        '<button class="btn primary" data-action="speak-record" data-id="' + esc(item.id) + '">🎤 Konuşmayı başlat</button>' +
        '<button class="btn" data-action="speak-stop">⏹ Durdur</button></div>' +
        '<div id="spk-' + esc(item.id) + '">';
      if (said) {
        h += '<div class="heard-text">🗣️ Konuştukların: ' + esc(said) + "</div>" +
          '<div class="muted small">' + (said.trim() ? said.trim().split(/\s+/).length : 0) + " kelime</div>";
      }
      h += "</div></div>";
    }
    if (!Speech.sttSupported) {
      h += '<div class="card"><strong>Not:</strong> <span class="muted">Bu tarayıcı ses tanımayı desteklemiyor. ' +
        "Chrome veya Edge kullanabilir ya da konuşmayı yüksek sesle yapıp kendini dinleyebilirsin.</span></div>";
    }
    return h;
  }

  /* ---------- İstatistik & Ayarlar ---------- */
  function viewStats() {
    var allIds = allWordIds();
    var mastery = SRS.mastery(allIds);
    var part = SRS.partition(allIds);
    var acc = pct(stats.quizCorrect, stats.quizTotal);

    var h = '<div class="view-head"><h1>📊 İstatistik & Ayarlar</h1>' +
      "<p>İlerlemen, SRS yedeğin ve uygulama ayarların</p></div>";

    h += '<div class="grid cols-4">' +
      '<div class="card stat-card"><div class="stat-num">🔥 ' + stats.streak + '</div><div class="stat-label">Günlük seri</div></div>' +
      '<div class="card stat-card"><div class="stat-num">⚡ ' + stats.totalXp + '</div><div class="stat-label">Toplam XP</div></div>' +
      '<div class="card stat-card"><div class="stat-num">⏱️ ' + stats.totalMinutes + '</div><div class="stat-label">Toplam dakika</div></div>' +
      '<div class="card stat-card"><div class="stat-num">🎯 ' + acc + '%</div><div class="stat-label">Test doğruluğu</div></div>' +
      "</div>";

    h += '<div class="grid cols-2" style="margin-top:14px">' +
      '<div class="card"><h3 style="margin-top:0">Kelime ustalığı</h3>' +
      "<div class=\"stat-num\">%" + mastery + "</div>" +
      bar(mastery, mastery >= 60 ? "ok" : "") +
      '<p class="muted small">Öğrenilen: ' + part.learned + " / " + allIds.length +
      " · Tekrar bekleyen: " + part.due.length + " · Yeni: " + part.fresh.length + "</p></div>" +
      '<div class="card"><h3 style="margin-top:0">Etkinlik</h3>' +
      '<p class="muted" style="margin-top:0">Bugün: ' + stats.minutes + " dk · " + stats.words +
      " kelime · " + stats.reviews + " tekrar · " + stats.xp + " XP</p>" +
      '<p class="muted">Toplam: ' + stats.totalWords + " kelime · " + stats.totalReviews +
      " tekrar · " + stats.shadowDone + " gölgeleme</p></div></div>";

    h += '<div class="section-title"><h2>Faz bazında ustalık</h2></div><div class="card">';
    for (var p = 0; p < LINGO5.phases.length; p++) {
      var ph = LINGO5.phases[p];
      var ids = [];
      for (var w = 0; w < LINGO5.weeks.length; w++) {
        var wk = LINGO5.weeks[w];
        if (wk.p !== ph.id) { continue; }
        for (var v = 0; v < wk.vocab.length; v++) {
          ids = ids.concat(setWordIds(wk.vocab[v]));
        }
      }
      var m = SRS.mastery(ids);
      h += '<div class="bar-row"><span class="name">' + esc(ph.name) + "</span>" +
        bar(m, m >= 60 ? "ok" : "") + '<span class="pct">%' + m + "</span></div>";
    }
    h += "</div>";

    h += '<div class="section-title"><h2>⚙️ Ses Ayarları</h2></div><div class="card">' +
      '<p class="muted" style="margin-top:0">Konuşma hızı: <strong id="rateVal">' +
      (Math.round(prefs.rate * 100) / 100) + "</strong></p>" +
      '<input type="range" min="0.5" max="1.5" step="0.05" value="' + prefs.rate +
      '" data-action="rate">' +
      '<div class="pill-row" style="margin-top:12px">' +
      '<span class="badge">' + (Speech.ttsSupported ? "✅ Telaffuz (TTS) hazır" : "❌ Telaffuz desteklenmiyor") + "</span>" +
      '<span class="badge">' + (Speech.sttSupported ? "✅ Ses tanıma (STT) hazır" : "⚠️ Ses tanıma desteklenmiyor") + "</span>" +
      "</div></div>";

    h += '<div class="section-title"><h2>💾 Yedekleme</h2></div><div class="card">' +
      '<p class="muted" style="margin-top:0">Aralıklı tekrar verini (SRS) dışa aktarabilir veya geri yükleyebilirsin.</p>' +
      '<textarea id="srsBox" style="min-height:110px" placeholder="SRS JSON…"></textarea>' +
      '<div class="btn-row">' +
      '<button class="btn" data-action="srs-export">📤 Dışa aktar</button>' +
      '<button class="btn primary" data-action="srs-import">📥 İçe aktar</button>' +
      '<button class="btn warn" data-action="srs-reset">🔁 SRS sıfırla</button>' +
      '<button class="btn bad" data-action="reset-all">🗑️ Tüm verileri sil</button>' +
      "</div></div>";

    h += '<div class="card" style="margin-top:14px"><h3 style="margin-top:0">Hakkında</h3>' +
      '<p class="muted" style="margin-bottom:0">Lingo5 v' + esc(LINGO5.version) +
      " · " + esc(LINGO5.dailyMinutes) + " dakikalık günlük plan · SM-2 + 1-3-7-14-30-60 merdiveni · " +
      "Tüm veriler yalnızca bu cihazda saklanır.</p></div>";
    return h;
  }

  /* ---------- Eylem işleyicileri ---------- */
  function shuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
    }
    return arr;
  }

  function handleAction(action, node) {
    var id = node.getAttribute("data-id") || "";
    var i = parseInt(node.getAttribute("data-i") || "-1", 10);

    if (action === "speak") {
      Speech.speak(node.getAttribute("data-text") || "", { rate: prefs.rate });
      return;
    }

    /* ---- Kelime kartları ---- */
    if (action === "open-set") { window.location.hash = "#/vocab/" + id; return; }
    if (action === "open-grammar") { window.location.hash = "#/grammar/" + id; return; }
    if (action === "open-dialog") { window.location.hash = "#/dialogs/" + id; return; }
    if (action === "set-week") {
      prefs.currentWeek = parseInt(node.getAttribute("data-week") || "1", 10);
      savePrefs();
      route(true);
      toast("Mevcut hafta " + prefs.currentWeek + " olarak ayarlandı.");
      return;
    }
    if (action === "flip") {
      if (vocabSession) {
        vocabSession.flipped = !vocabSession.flipped;
        renderPane();
      }
      return;
    }
    if (action === "grade") {
      if (!vocabSession) { return; }
      var q = parseInt(node.getAttribute("data-q") || "3", 10);
      var wid = vocabSession.ids[vocabSession.pos];
      SRS.grade(wid, q);
      if (vocabSession.mode === "review") { countReview(); } else { countWord(); }
      gainXp(q < 3 ? 1 : 3);
      vocabSession.pos += 1;
      vocabSession.flipped = false;
      renderPane();
      return;
    }
    if (action === "shuffle") {
      if (vocabSession) {
        shuffle(vocabSession.ids);
        vocabSession.pos = 0;
        vocabSession.flipped = false;
        vocabSession.showList = false;
        renderPane();
        toast("Kartlar karıştırıldı.");
      }
      return;
    }
    if (action === "toggle-list") {
      if (vocabSession) {
        vocabSession.showList = !vocabSession.showList;
        renderPane();
      }
      return;
    }
    if (action === "vocab-repeat") {
      if (vocabSession) {
        vocabSession.pos = 0;
        vocabSession.flipped = false;
        vocabSession.showList = false;
        renderPane();
      }
      return;
    }

    /* ---- Mini test ---- */
    if (action === "quiz-choose") {
      if (!quizSession || quizSession.chosen >= 0) { return; }
      quizSession.chosen = i;
      stats.quizTotal += 1;
      if (i === quizSession.qs[quizSession.pos].c) {
        quizSession.correct += 1;
        stats.quizCorrect += 1;
        gainXp(10);
      }
      saveStats();
      renderPane();
      return;
    }
    if (action === "quiz-next") {
      if (!quizSession) { return; }
      if (quizSession.pos + 1 >= quizSession.qs.length) {
        quizSession.done = true;
        var score = pct(quizSession.correct, quizSession.qs.length);
        var bestKey = "g:" + quizSession.topicId;
        if (quizBest[bestKey] === undefined || quizBest[bestKey] < score) {
          quizBest[bestKey] = score;
          saveJSON(QUIZ_KEY, quizBest);
        }
      } else {
        quizSession.pos += 1;
        quizSession.chosen = -1;
      }
      renderPane();
      return;
    }
    if (action === "quiz-repeat") {
      if (quizSession) {
        quizSession.pos = 0;
        quizSession.correct = 0;
        quizSession.chosen = -1;
        quizSession.done = false;
        renderPane();
      }
      return;
    }

    return handleAction2(action, node, id, i);
  }

  /* ---------- Ortak: satırları sırayla seslendirme ---------- */
  var activeStop = null;   /* çalışan STT/işlemin durdurma fonksiyonu */

  function playLines(lines, onDone) {
    Speech.stop();
    var idx = 0;
    function clearHighlight() {
      var olds = $$(".dialog-line.playing");
      for (var k = 0; k < olds.length; k++) { olds[k].className = "dialog-line"; }
    }
    function step() {
      clearHighlight();
      if (idx >= lines.length) {
        if (onDone) { onDone(); }
        return;
      }
      var row = $("#dline-" + idx);
      if (row) { row.className = "dialog-line playing"; }
      var text = lines[idx].en;
      idx += 1;
      Speech.speak(text, {
        rate: prefs.rate,
        onend: function () { window.setTimeout(step, 350); },
        onerror: function () { window.setTimeout(step, 100); }
      });
    }
    step();
  }

  /* ---------- Eylem işleyicileri (2): diyaloglar ---------- */
  function handleAction2(action, node, id, i) {
    if (action === "dialog-play-all") {
      var d = findDialog(dialogSession.id);
      playLines(d.lines);
      return;
    }
    if (action === "dialog-stop" || action === "listen-stop" || action === "speak-stop") {
      Speech.stop();
      if (activeStop) { try { activeStop(); } catch (e) {} activeStop = null; }
      var olds = $$(".dialog-line.playing");
      for (var k = 0; k < olds.length; k++) { olds[k].className = "dialog-line"; }
      return;
    }
    if (action === "dialog-toggle-tr" || action === "listen-toggle-tr") {
      prefs.showTr = !prefs.showTr;
      savePrefs();
      route(true);
      return;
    }
    if (action === "shadow") {
      startShadow(i);
      return;
    }
    if (action === "shadow-manual") {
      var input = $("#shadowInput-" + i);
      var typed = input ? input.value : "";
      if (!typed.trim()) { toast("Önce duyduğunu yaz."); return; }
      var dlg = findDialog(dialogSession.id);
      applyShadowScore(i, Speech.compare(dlg.lines[i].en, typed), typed);
      return;
    }

    return handleAction3(action, node, id, i);
  }

  function manualShadowHtml(lineIdx) {
    return '<textarea id="shadowInput-' + lineIdx + '" style="min-height:70px" ' +
      'placeholder="Duyduğunu buraya yaz…"></textarea>' +
      '<div class="btn-row"><button class="btn small primary" data-action="shadow-manual" data-i="' +
      lineIdx + '">Karşılaştır</button></div>';
  }

  function startShadow(lineIdx) {
    var d = findDialog(dialogSession.id);
    if (!d) { return; }
    var expected = d.lines[lineIdx].en;
    var box = $("#shadow-" + lineIdx);
    if (!Speech.sttSupported) {
      if (box) {
        box.innerHTML = '<div class="muted small">Ses tanıma desteklenmiyor; yazarak karşılaştır:</div>' +
          manualShadowHtml(lineIdx);
      }
      return;
    }
    if (box) { box.innerHTML = '<span class="rec-dot"></span><span class="muted">Dinliyorum… konuş!</span>'; }
    var lastFinal = "";
    activeStop = Speech.listen({
      lang: "en-US",
      onresult: function (finalText, interim) {
        if (finalText) { lastFinal = finalText; }
        if (box) {
          box.innerHTML = '<span class="rec-dot"></span><span class="muted">Duyduklarım: ' +
            esc((lastFinal || "") + (interim || "")) + "</span>";
        }
      },
      onerror: function (err) {
        activeStop = null;
        if (box && !lastFinal) {
          box.innerHTML = '<div class="muted small">Ses tanıma hatası (' + esc(err) +
            "). Yazarak karşılaştır:</div>" + manualShadowHtml(lineIdx);
        }
      },
      onend: function () {
        activeStop = null;
        if (lastFinal) {
          applyShadowScore(lineIdx, Speech.compare(expected, lastFinal), lastFinal);
        } else if (box) {
          box.innerHTML = '<div class="muted small">Ses duyulamadı. Yazarak karşılaştır:</div>' +
            manualShadowHtml(lineIdx);
        }
      }
    });
    if (!activeStop && box) {
      box.innerHTML = '<div class="muted small">Mikrofon başlatılamadı. Yazarak karşılaştır:</div>' +
        manualShadowHtml(lineIdx);
    }
  }

  /* ---------- Eylem işleyicileri (3): sınav ---------- */
  function findExamItem(kind, itemId) {
    var arr = EXAM[kind] || [];
    for (var n = 0; n < arr.length; n++) {
      if (arr[n].id === itemId) { return arr[n]; }
    }
    return null;
  }

  function handleAction3(action, node, id, i) {
    if (action === "exam-tab") {
      examSession.tab = node.getAttribute("data-tab") || "overview";
      route(true);
      return;
    }
    if (action === "exam-answer") {
      var key = node.getAttribute("data-key");
      examSession.answers[key] = i;
      route(true);
      return;
    }
    if (action === "exam-check") {
      var kind = node.getAttribute("data-kind") || "reading";
      var item = findExamItem(kind, id);
      if (!item) { return; }
      var correct = 0;
      for (var qi = 0; qi < item.questions.length; qi++) {
        if (examSession.answers[id + ":" + qi] === item.questions[qi].c) {
          correct += 1;
          gainXp(10);
        }
      }
      examSession.answers["checked:" + id] = true;
      stats.examsDone += 1;
      saveStats();
      route(true);
      toast("Sonuç: " + correct + " / " + item.questions.length + " doğru");
      return;
    }
    if (action === "listen-play") {
      var li = findExamItem("listening", id);
      if (li) {
        playLines(li.transcript);
        toast("Kayıt çalınıyor…");
      }
      return;
    }
    if (action === "toggle-sample") {
      examSession.showSample[id] = !examSession.showSample[id];
      route(true);
      return;
    }
    if (action === "clear-draft") {
      delete drafts[id];
      saveJSON(DRAFT_KEY, drafts);
      route(true);
      toast("Taslağın temizlendi.");
      return;
    }
    if (action === "speak-record") {
      startSpeaking(id);
      return;
    }

    return handleAction4(action, node, id, i);
  }

  function startSpeaking(itemId) {
    var box = $("#spk-" + itemId);
    if (!Speech.sttSupported) {
      if (box) {
        box.innerHTML = '<div class="muted small">Ses tanıma desteklenmiyor; kendini yüksek sesle dinleyip ' +
          "İpuçları'na göre değerlendirme yapabilirsin.</div>";
      }
      return;
    }
    if (box) { box.innerHTML = '<span class="rec-dot"></span><span class="muted">Konuşuyorsun… (1-2 dakika kesintisiz konuş)</span>'; }
    var lastFinal = "";
    activeStop = Speech.listen({
      lang: "en-US",
      onresult: function (finalText, interim) {
        if (finalText) { lastFinal = finalText; }
        if (box) {
          box.innerHTML = '<span class="rec-dot"></span><span class="muted">🗣️ ' +
            esc((lastFinal || "") + (interim || "")) + "</span>";
        }
      },
      onerror: function (err) {
        activeStop = null;
        if (box && !lastFinal) {
          box.innerHTML = '<div class="muted small">Ses tanıma hatası (' + esc(err) + ")</div>";
        }
      },
      onend: function () {
        activeStop = null;
        if (lastFinal) {
          examSession.transcript[itemId] = lastFinal;
          var words = lastFinal.trim().split(/\s+/).length;
          gainXp(20);
          if (box) {
            box.innerHTML = '<div class="heard-text">🗣️ Konuştukların: ' + esc(lastFinal) + "</div>" +
              '<div class="muted small">' + words + " kelime · +20 XP</div>";
          }
          toast("Konuşma pratiği tamamlandı! +20 XP");
        } else if (box) {
          box.innerHTML = '<div class="muted small">Ses duyulamadı, tekrar dene.</div>';
        }
      }
    });
    if (!activeStop && box) {
      box.innerHTML = '<div class="muted small">Mikrofon başlatılamadı.</div>';
    }
  }

  /* ---------- Eylem işleyicileri (4): ayarlar & yedek ---------- */
  function handleAction4(action, node) {
    if (action === "srs-export") {
      var box = $("#srsBox");
      if (box) {
        box.value = SRS.exportJSON();
        box.select && box.select();
        toast("SRS verisi panoya hazırlandı (kopyalayabilirsin).");
      }
      return;
    }
    if (action === "srs-import") {
      var box2 = $("#srsBox");
      var txt = box2 ? box2.value.trim() : "";
      if (!txt) { toast("Önce SRS JSON verisini yapıştır."); return; }
      if (SRS.importJSON(txt)) {
        toast("SRS verisi içe aktarıldı.");
        route(true);
      } else {
        toast("Geçersiz veri! JSON biçimini kontrol et.");
      }
      return;
    }
    if (action === "srs-reset") {
      if (window.confirm("Tüm aralıklı tekrar (SRS) verisi silinsin mi?")) {
        SRS.resetAll();
        toast("SRS verisi sıfırlandı.");
        route(true);
      }
      return;
    }
    if (action === "reset-all") {
      if (window.confirm("Tüm ilerleme, taslaklar ve ayarlar silinsin mi? Bu işlem geri alınamaz!")) {
        localStorage.removeItem(STATS_KEY);
        localStorage.removeItem(PREFS_KEY);
        localStorage.removeItem(DRAFT_KEY);
        localStorage.removeItem(QUIZ_KEY);
        SRS.resetAll();
        stats = loadJSON(STATS_KEY, defaultStats());
        prefs = loadJSON(PREFS_KEY, defaultPrefs());
        drafts = loadJSON(DRAFT_KEY, {});
        quizBest = loadJSON(QUIZ_KEY, {});
        route(true);
        toast("Tüm veriler silindi.");
      }
      return;
    }
  }

  /* ---------- Olay delegasyonu ---------- */
  function onDocumentClick(e) {
    var node = e.target;
    while (node && node !== document) {
      if (node.getAttribute) {
        var action = node.getAttribute("data-action");
        if (action) {
          e.preventDefault();
          handleAction(action, node);
          return;
        }
      }
      node = node.parentNode;
    }
  }

  function onDocumentInput(e) {
    var node = e.target;
    if (!node || !node.getAttribute) { return; }
    var action = node.getAttribute("data-action");
    if (action === "draft") {
      var id = node.getAttribute("data-id");
      drafts[id] = node.value;
      saveJSON(DRAFT_KEY, drafts);
      var wc = $("#wc-" + id);
      if (wc) {
        wc.textContent = (node.value.trim() ? node.value.trim().split(/\s+/).length : 0) + " kelime";
      }
      return;
    }
    if (action === "rate") {
      prefs.rate = parseFloat(node.value) || 1;
      Speech.setRate(prefs.rate);
      savePrefs();
      var lbl = $("#rateVal");
      if (lbl) { lbl.textContent = String(Math.round(prefs.rate * 100) / 100); }
    }
  }

  /* ---------- Yönlendirici ---------- */
  function markNav(name) {
    var links = $$("[data-nav]");
    for (var n = 0; n < links.length; n++) {
      var isIt = links[n].getAttribute("data-nav") === name;
      links[n].className = isIt ? "active" : "";
    }
  }

  function route(keepScroll) {
    var old = window.location.hash || "#/home";
    var parts = old.replace(/^#\//, "").split("/");
    var name = parts[0] || "home";
    var arg = parts[1] || "";
    var html = "";
    var navName = name;

    state.pane = null;
    if (name === "program") { html = viewProgram(); }
    else if (name === "vocab") { html = arg ? viewVocabSet(arg) : viewVocabList(); }
    else if (name === "grammar") { html = arg ? viewGrammarTopic(arg) : viewGrammarList(); }
    else if (name === "dialogs") { html = arg ? viewDialog(arg) : viewDialogList(); }
    else if (name === "exam") { html = viewExam(); }
    else if (name === "stats") { html = viewStats(); }
    else if (name === "review") { html = viewReview(); navName = "vocab"; }
    else { html = viewHome(); navName = "home"; }

    var view = $("#view");
    if (view) { view.innerHTML = html; }
    renderPane();
    markNav(navName);
    if (!keepScroll) { window.scrollTo(0, 0); }
  }

  /* ---------- Başlatma ---------- */
  function init() {
    rollDay();
    Speech.setRate(prefs.rate);

    document.addEventListener("click", onDocumentClick);
    document.addEventListener("input", onDocumentInput);

    var menuBtn = $("#navToggle");
    var navLinks = $("#nav");
    if (menuBtn && navLinks) {
      menuBtn.addEventListener("click", function () {
        var open = navLinks.className.indexOf("open") >= 0;
        navLinks.className = open ? "app-nav" : "app-nav open";
        menuBtn.setAttribute("aria-expanded", open ? "false" : "true");
      });
    }

    window.addEventListener("hashchange", function () {
      route(false);
      var nl = $("#nav");
      if (nl) { nl.className = "app-nav"; }
      var mb = $("#navToggle");
      if (mb) { mb.setAttribute("aria-expanded", "false"); }
    });

    route(false);

    /* Haftada 1 günlük dakika ölçümü (sayaç benzeri) */
    window.setInterval(function () {
      if (!document.hidden) { addMinutes(1); }
    }, 60000);

    /* Service worker (offline PWA) */
    if ("serviceWorker" in navigator) {
      /* Not: "catch" JScript'te ayrikmis sozcuk; koseli parantezle cagiriyoruz */
      navigator.serviceWorker.register("sw.js")["catch"](function () { /* yoksay */ });
    }
  }

  init();

  /* Dışa açılan ufak API (debug/test için) */
  return {
    route: route,
    stats: function () { return stats; },
    prefs: function () { return prefs; }
  };
})();

document.addEventListener("DOMContentLoaded", function () { /* App.init() zaten çağrıldı */ });