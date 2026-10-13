/* ============================================================
   Lingo5 – Konuşma Sarmalayıcıları (Web Speech API)
   TTS: konuşma sentezi (telaffuz dinleme / gölgeleme)
   STT: ses tanıma (konuşma pratiği karşılaştırma)
   ============================================================ */
"use strict";

var Speech = (function () {
  var ttsSupported = ("speechSynthesis" in window) && ("SpeechSynthesisUtterance" in window);
  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var sttSupported = !!SR;

  var voice = null;
  var rate = 1.0;

  function pickVoice() {
    if (!ttsSupported) { return null; }
    var voices = window.speechSynthesis.getVoices();
    if (!voices.length) { return null; }
    var pref = ["Google US English", "Microsoft Zira", "Microsoft David", "Samantha", "Daniel"];
    for (var i = 0; i < pref.length; i++) {
      for (var j = 0; j < voices.length; j++) {
        if (voices[j].name === pref[i] && voices[j].lang.indexOf("en") === 0) { return voices[j]; }
      }
    }
    for (var k = 0; k < voices.length; k++) {
      if (voices[k].lang === "en-US") { return voices[k]; }
    }
    for (var m = 0; m < voices.length; m++) {
      if (voices[m].lang.indexOf("en") === 0) { return voices[m]; }
    }
    return voices[0];
  }

  if (ttsSupported) {
    voice = pickVoice();
    /* bazı tarayıcılar sesleri geç yükler */
    window.speechSynthesis.onvoiceschanged = function () {
      voice = pickVoice();
    };
  }

  function speak(text, opts) {
    if (!ttsSupported) { return false; }
    opts = opts || {};
    try {
      window.speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      u.lang = opts.lang || "en-US";
      u.rate = opts.rate || rate;
      u.pitch = opts.pitch || 1.0;
      if (voice) { u.voice = voice; }
      if (typeof opts.onend === "function") { u.onend = opts.onend; }
      if (typeof opts.onerror === "function") { u.onerror = opts.onerror; }
      window.speechSynthesis.speak(u);
      return true;
    } catch (e) { return false; }
  }

  function stop() {
    if (ttsSupported) { try { window.speechSynthesis.cancel(); } catch (e) {} }
  }

  function setRate(r) {
    rate = Math.max(0.5, Math.min(1.5, r));
    return rate;
  }

  function getRate() { return rate; }

  /*
   * listen({ lang, onresult(finalText, interim), onerror(err), onend })
   * Dönen değer: durdurma fonksiyonu (veya null ise desteklenmiyor)
   */
  function listen(opts) {
    if (!sttSupported) {
      if (opts && typeof opts.onerror === "function") { opts.onerror("unsupported"); }
      return null;
    }
    opts = opts || {};
    var rec = new SR();
    rec.lang = opts.lang || "en-US";
    rec.interimResults = true;
    rec.continuous = false;
    rec.maxAlternatives = 1;

    rec.onresult = function (ev) {
      var interim = "";
      var finalText = "";
      for (var i = ev.resultIndex; i < ev.results.length; i++) {
        if (ev.results[i].isFinal) { finalText += ev.results[i][0].transcript; }
        else { interim += ev.results[i][0].transcript; }
      }
      if (typeof opts.onresult === "function") {
        opts.onresult(finalText, interim);
      }
    };
    rec.onerror = function (ev) {
      if (typeof opts.onerror === "function") { opts.onerror(ev.error || "error"); }
    };
    rec.onend = function () {
      if (typeof opts.onend === "function") { opts.onend(); }
    };
    try { rec.start(); } catch (e) {
      if (typeof opts.onerror === "function") { opts.onerror("start-failed"); }
      return null;
    }
    return function () { try { rec.stop(); } catch (e) {} };
  }

  /* İki metni kelime bazında karşılaştırıp benzerlik (0-100) ve fark listesi döndürür */
  function compare(expected, spoken) {
    var clean = function (s) {
      return s.toLowerCase().replace(/[^a-z0-9'\s]/g, " ").replace(/\s+/g, " ").trim();
    };
    var a = clean(expected).split(" ");
    var b = clean(spoken).split(" ");
    if (!a.length || !b.length) { return { score: 0, missing: a, extra: b }; }
    /* en uzun ortak alt dizi (LCS) uzunluğu */
    var m = a.length, n = b.length;
    var dp = [];
    for (var i = 0; i <= m; i++) {
      var row = [];
      for (var j = 0; j <= n; j++) { row.push(0); }
      dp.push(row);
    }
    for (var x = 1; x <= m; x++) {
      for (var y = 1; y <= n; y++) {
        if (a[x - 1] === b[y - 1]) { dp[x][y] = dp[x - 1][y - 1] + 1; }
        else { dp[x][y] = Math.max(dp[x - 1][y], dp[x][y - 1]); }
      }
    }
    var lcs = dp[m][n];
    var score = Math.round((2 * lcs / (m + n)) * 100);
    var missing = [];
    for (var p = 0; p < m; p++) {
      if (b.indexOf(a[p]) === -1) { missing.push(a[p]); }
    }
    return { score: score, missing: missing, total: m };
  }

  return {
    ttsSupported: ttsSupported,
    sttSupported: sttSupported,
    speak: speak,
    stop: stop,
    listen: listen,
    compare: compare,
    setRate: setRate,
    getRate: getRate
  };
})();