# -*- coding: utf-8 -*-
"""Lingo5 duman testi: DOM stub'lari ile butun gorunum/panel ureticilerini ve
SRS akisini gercek JScript motorunda calistirir.  Kullanim:
python tools/smoke_test.py"""
import os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import check_js as c

STUB = r"""
if (!Date.now) { Date.now = function () { return (new Date()).getTime(); }; }
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (v, s) {
    var st = s || 0;
    for (var i = st; i < this.length; i++) { if (this[i] === v) { return i; } }
    return -1;
  };
}
if (!String.prototype.trim) {
  String.prototype.trim = function () { return this.replace(/^\s+|\s+$/g, ""); };
}
/* JScript motorunda JSON yok; tarayicilarda yerindedir — yalnizca test icin */
if (typeof JSON === "undefined" || !JSON) {
  var JSON = {
    stringify: function (v) {
      function escStr(s) {
        return String(s).replace(/\\/g, "\\\\").replace(/"/g, '\\"')
          .replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t");
      }
      function fmt(x) {
        if (x === null || x === undefined) { return "null"; }
        var t = typeof x;
        if (t === "number") { return isFinite(x) ? String(x) : "null"; }
        if (t === "boolean") { return String(x); }
        if (t === "string") { return '"' + escStr(x) + '"'; }
        if (t === "object") {
          var parts = [], i;
          if (typeof x.length === "number" && typeof x.splice === "function") {
            for (i = 0; i < x.length; i++) { parts.push(fmt(x[i])); }
            return "[" + parts.join(",") + "]";
          }
          for (var k in x) {
            if (x.hasOwnProperty(k) && typeof x[k] !== "function" && typeof x[k] !== "undefined") {
              parts.push('"' + escStr(k) + '":' + fmt(x[k]));
            }
          }
          return "{" + parts.join(",") + "}";
        }
        return "null";
      }
      return fmt(v);
    },
    parse: function (s) { return eval("(" + s + ")"); }
  };
}
var localStorage = {
  _d: {},
  getItem: function (k) { return (k in this._d) ? this._d[k] : null; },
  setItem: function (k, v) { this._d[k] = String(v); },
  removeItem: function (k) { delete this._d[k]; }
};
function fakeNode() {
  return {
    innerHTML: "", className: "", value: "", textContent: "",
    setAttribute: function () {}, getAttribute: function () { return null; },
    addEventListener: function () {}, select: function () {}
  };
}
var document = {
  hidden: false,
  addEventListener: function () {},
  querySelector: function () { return fakeNode(); },
  querySelectorAll: function () { return []; }
};
var navigator = {};
var window = {
  localStorage: localStorage,
  location: { hash: "#/home" },
  addEventListener: function () {},
  scrollTo: function () {},
  setTimeout: function () { return 0; },
  clearTimeout: function () {},
  setInterval: function () { return 0; },
  clearInterval: function () {},
  confirm: function () { return true; }
};
"""

POST = r"""
try {
  var setKey = null, gKey = null, dId = null, k;
  for (k in VOCAB) { if (VOCAB.hasOwnProperty(k) && !setKey) { setKey = k; } }
  for (k in GRAMMAR) { if (GRAMMAR.hasOwnProperty(k) && !gKey) { gKey = k; } }
  dId = DIALOGS[0].id;
  var routes = [
    "#/home", "#/program", "#/vocab", "#/vocab/" + setKey, "#/review",
    "#/grammar", "#/grammar/" + gKey, "#/dialogs", "#/dialogs/" + dId,
    "#/exam", "#/stats", "#/bilinmeyen"
  ];
  for (var i = 0; i < routes.length; i++) {
    window.location.hash = routes[i];
    App.route(true);
    WScript.Echo("route ok: " + routes[i]);
  }

  var ids = [];
  for (var vk in VOCAB) {
    if (!VOCAB.hasOwnProperty(vk)) { continue; }
    for (var w = 0; w < VOCAB[vk].words.length; w++) { ids.push(vk + ":" + w); }
  }
  SRS.grade(ids[0], 4);
  SRS.grade(ids[1], 2);
  SRS.grade(ids[0], 3);
  var part = SRS.partition(ids);
  WScript.Echo("srs ids=" + ids.length + " mastery=" + SRS.mastery(ids) + " due=" + part.due.length +
               " learned=" + part.learned + " fresh=" + part.fresh.length + " later=" + part.later.length);
  var exp = SRS.exportJSON();
  WScript.Echo("srs export/import: " + (SRS.importJSON(exp) ? "OK" : "FAIL"));
  SRS.forget(ids[0]);
  WScript.Echo("srs forget: OK");

  var cmp = Speech.compare("Hello world this is a test", "hello world this is test");
  WScript.Echo("speech.compare score=" + cmp.score + " missing=" + cmp.missing.join(","));
  WScript.Echo("speech flags tts=" + Speech.ttsSupported + " stt=" + Speech.sttSupported);
  WScript.Echo("stats xp=" + App.stats().totalXp + " prefs week=" + App.prefs().currentWeek);
  WScript.Echo("SMOKE-OK");
} catch (e) {
  WScript.Echo("SMOKE-FAIL: " + (e && e.message ? e.message : e) +
               (e && e.line ? " (line " + e.line + ")" : ""));
}
"""


def main():
    parts = [STUB]
    for fn in ["data-meta.js", "data-vocab.js", "data-grammar.js", "data-dialogs.js",
               "data-exam.js", "srs.js", "speech.js", "app.js"]:
        with open(os.path.join(c.JS, fn), "r", encoding="utf-8") as f:
            parts.append("// ---- %s ----\n" % fn + c.transform(f.read()))
    parts.append(POST)
    rc, out = c.run_jscript("\n".join(parts), "smoke")
    print(out.strip())
    return 0 if "SMOKE-OK" in out else 1


if __name__ == "__main__":
    sys.exit(main())