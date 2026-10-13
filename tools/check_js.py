# -*- coding: utf-8 -*-
"""
Lingo5 JS dogrulayici.
Node olmadigi icin Windows Script Host (JScript) uzerinden gercek sozdizimi
denetimi yapar; veri dosyalari icin yapi kontrolu de ekler.
Kullanim: python tools\\check_js.py [app]
"""
import os, re, subprocess, sys, tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
JS = os.path.join(ROOT, "js")

DATA_FILES = ["data-meta.js", "data-vocab.js", "data-grammar.js",
              "data-dialogs.js", "data-exam.js"]
APP_FILES = ["srs.js", "speech.js", "app.js"]

HARNESS = r"""
function has(o, k) { return o != null && typeof o === "object" && (k in o); }
function isArr(x) { return Object.prototype.toString.call(x) === "[object Array]"; }
function out(s) { WScript.Echo(s); }
var fails = 0;
function chk(name, cond, msg) {
  if (!cond) { fails++; out("FAIL " + name + " :: " + msg); }
  return cond;
}
function keys(o) { var r = []; for (var k in o) { if (o.hasOwnProperty(k)) { r.push(k); } } return r; }

try {
  chk("vocab-count", keys(VOCAB).length >= 37, "sets=" + keys(VOCAB).length);
  for (var vk in VOCAB) {
    if (!VOCAB.hasOwnProperty(vk)) { continue; }
    var s = VOCAB[vk];
    chk("vocab-set", has(s, "title") && has(s, "words") && isArr(s.words), vk + " ozellikler");
    for (var wi = 0; wi < s.words.length; wi++) {
      var w = s.words[wi];
      chk("vocab-word", isArr(w) && w.length === 4 && typeof w[0] === "string" && typeof w[1] === "string",
          vk + "[" + wi + "] 4'lü [en, tr, ornek, ceviri] olmali");
    }
    chk("vocab-size", s.words.length >= 8, vk + " en az 8 kelime, su an " + s.words.length);
  }
  chk("grammar-count", keys(GRAMMAR).length >= 42, "topics=" + keys(GRAMMAR).length);
  for (var gk in GRAMMAR) {
    if (!GRAMMAR.hasOwnProperty(gk)) { continue; }
    var g = GRAMMAR[gk];
    chk("grammar-topic", has(g, "title") && has(g, "tr") && isArr(g.rules) && isArr(g.ex) && isArr(g.quiz), gk + " ozellikler");
    for (var qi = 0; qi < g.quiz.length; qi++) {
      var q = g.quiz[qi];
      chk("grammar-quiz", isArr(q.a) && q.a.length === 4 && q.c >= 0 && q.c < 4 && typeof q.q === "string",
          gk + " quiz[" + qi + "] q/a[4]/c gerekli");
    }
    for (var ei = 0; ei < g.ex.length; ei++) {
      chk("grammar-ex", isArr(g.ex[ei]) && g.ex[ei].length === 2, gk + " ornek[" + ei + "] [en, tr]");
    }
  }
  chk("weeks", isArr(LINGO5.weeks) && LINGO5.weeks.length === 22, "weeks=" + (isArr(LINGO5.weeks) ? LINGO5.weeks.length : "yok"));
  for (var wi2 = 0; wi2 < LINGO5.weeks.length; wi2++) {
    var wk = LINGO5.weeks[wi2];
    for (var gi = 0; gi < wk.grammar.length; gi++) {
      chk("week-grammar-ref", has(GRAMMAR, wk.grammar[gi]), "week " + wk.w + " -> " + wk.grammar[gi] + " GRAMMAR icinde yok");
    }
    for (var vi = 0; vi < wk.vocab.length; vi++) {
      chk("week-vocab-ref", has(VOCAB, wk.vocab[vi]), "week " + wk.w + " -> " + wk.vocab[vi] + " VOCAB icinde yok");
    }
  }
  chk("dialogs", isArr(DIALOGS) && DIALOGS.length >= 8, "dialogs=" + (isArr(DIALOGS) ? DIALOGS.length : "yok"));
  for (var di = 0; di < DIALOGS.length; di++) {
    var d = DIALOGS[di];
    chk("dialog", has(d, "id") && has(d, "title") && isArr(d.lines) && d.lines.length >= 4, "dialog[" + di + "] id/title/lines");
    for (var li = 0; li < d.lines.length; li++) {
      chk("dialog-line", has(d.lines[li], "en") && has(d.lines[li], "tr"), "dialog[" + di + "] line[" + li + "] en/tr");
    }
  }
  chk("exam", has(EXAM, "reading") && has(EXAM, "listening") && has(EXAM, "writing") && has(EXAM, "speaking"), "exam bolumleri");
  chk("exam-reading", isArr(EXAM.reading) && EXAM.reading.length >= 2, "reading=" + (isArr(EXAM.reading) ? EXAM.reading.length : "yok"));
  chk("exam-listening", isArr(EXAM.listening) && EXAM.listening.length >= 2, "listening=" + (isArr(EXAM.listening) ? EXAM.listening.length : "yok"));
  chk("exam-writing", isArr(EXAM.writing) && EXAM.writing.length >= 2, "writing=" + (isArr(EXAM.writing) ? EXAM.writing.length : "yok"));
  chk("exam-speaking", isArr(EXAM.speaking) && EXAM.speaking.length >= 2, "speaking=" + (isArr(EXAM.speaking) ? EXAM.speaking.length : "yok"));
  out(fails === 0 ? "ALL-DATA-OK" : ("FAILURES=" + fails));
} catch (e) {
  out("HARNESS-ERROR " + (e && e.message ? e.message : e));
}
"""


def transform(src):
    src = re.sub(r"\b(const|let)\b", "var", src)
    return src


def write_utf16(path, text):
    with open(path, "wb") as f:
        f.write(b"\xff\xfe")
        f.write(text.encode("utf-16-le"))


def run_jscript(code, tag):
    tmp = os.path.join(tempfile.gettempdir(), "lingo5_check_%s.js" % tag)
    write_utf16(tmp, code)
    p = subprocess.run(["cscript", "//Nologo", "//E:JScript", tmp], capture_output=True)
    raw = (p.stdout or b"") + (p.stderr or b"")
    out = raw.decode("utf-8", errors="replace")
    return p.returncode, out


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except Exception:
        pass
    mode = sys.argv[1] if len(sys.argv) > 1 else "all"
    files = DATA_FILES + APP_FILES if mode == "all" else DATA_FILES
    parts, missing = [], []
    for fn in files:
        path = os.path.join(JS, fn)
        if not os.path.exists(path):
            missing.append(fn)
            continue
        with open(path, "r", encoding="utf-8") as f:
            parts.append("// ---- %s ----\n" % fn + transform(f.read()))
    if missing:
        print("MISSING-FILES " + ", ".join(missing))
    code = "\n".join(parts)
    if mode == "all":
        # sozdizimi: kaynagi calistirmadan Function govdesi olarak derle
        import json
        shim = ("var __code = %s;\n"
                "try { new Function(__code); WScript.Echo('SYNTAX-OK'); }\n"
                "catch (e) { WScript.Echo('SYNTAX-FAIL: ' + (e.message || e)); }\n") % json.dumps(code)
        rc, out = run_jscript(shim, "all")
    else:
        rc, out = run_jscript(code + "\n" + HARNESS, "data")
    with open(os.path.join(tempfile.gettempdir(), "lingo5_check_out.txt"), "w", encoding="utf-8") as f:
        f.write(out)
    print("RC=%d" % rc)
    print(out.strip()[:2000] if out.strip() else "(no output)")


if __name__ == "__main__":
    main()