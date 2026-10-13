# -*- coding: utf-8 -*-
"""app.js icindeki class="..." adlarinin app.css'te tanimli olup olmadigini kontrol eder.
Kullanim: python tools/check_css.py"""
import os, re, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
js = open(os.path.join(ROOT, "js", "app.js"), encoding="utf-8").read()
css = open(os.path.join(ROOT, "css", "app.css"), encoding="utf-8").read()

used = set()
for m in re.finditer(r'class=\\?"([\w\s-]+)', js):
    for tok in m.group(1).split():
        if re.match(r"^[A-Za-z][\w-]*$", tok) and not tok.endswith("-"):
            used.add(tok)
# dinamik olusturulan siniflar
used.update(["ok", "warn", "bad", "active", "playing", "show", "open",
             "flipped", "correct", "wrong", "level-A1", "level-A2", "level-B1",
             "level-B2", "level-C1", "level-C2"])

missing = sorted(t for t in used if ("." + t) not in css)
print("kullanilan sinif: %d" % len(used))
if missing:
    print("CSS'TE TANIMSIZ: " + ", ".join(missing))
    sys.exit(1)
print("CSS-OK")