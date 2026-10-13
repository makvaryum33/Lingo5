# -*- coding: utf-8 -*-
"""Her JS dosyasini ayri ayri JScript ile sozdizimi denetiminden gecirir.
python tools/check_each.py [dosya ...]            -> tek tek derle
python tools/check_each.py --bisect dosya.js      -> hatali satiri bul"""
import json, os, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import check_js as c

SHIM = ("var __code = %s;\n"
        "try { new Function(__code); WScript.Echo('OK'); }\n"
        "catch (e) { WScript.Echo('FAIL: ' + (e.message || e)); }\n")


def compile_src(src):
    rc, out = c.run_jscript(SHIM % json.dumps(c.transform(src)), "each")
    return out.strip()


def bisect(path):
    lines = open(path, "r", encoding="utf-8").read().split("\n")
    lo, hi = 1, len(lines)
    first = None
    # dogrusal tarama (kisa dosyalar icin yeterince hizli)
    for n in range(1, len(lines) + 1):
        out = compile_src("\n".join(lines[:n]))
        if "Belirleyici" in out:
            first = n
            break
        if n % 50 == 0:
            print("  ... %d/%d satir tarandi (sonuc: %s)" % (n, len(lines), out))
    if first is None:
        print("Tek satirli on eklerde hata bulunamadi.")
        return
    print("Ilk hatali satir: %d" % first)
    for k in range(max(1, first - 6), min(len(lines), first + 3) + 1):
        print("%5d| %s" % (k, lines[k - 1]))


names = sys.argv[1:] or ["srs.js", "speech.js", "app.js"]
if names[0] == "--bisect":
    bisect(os.path.join(c.JS, names[1]))
else:
    for fn in names:
        path = os.path.join(c.JS, fn)
        src = open(path, "r", encoding="utf-8").read()
        print("%-14s %s" % (fn, compile_src(src)))