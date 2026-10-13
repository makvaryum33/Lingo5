import subprocess, os, tempfile
d = tempfile.gettempdir()
def w16(p, t):
    open(p, "wb").write(b"\xff\xfe" + t.encode("utf-16-le"))
def w8(p, t):
    open(p, "wb").write(t.encode("utf-8"))
res = []
p1 = os.path.join(d, "m1.js"); w8(p1, "WScript.Echo('HELLO1');\n")
p2 = os.path.join(d, "m2.js"); w16(p2, "WScript.Echo('HELLO2');\n")
for name, path, args in [("ansi+U", p1, ["//U"]), ("uni+U", p2, ["//U"]),
                         ("ansi-noU", p1, []), ("uni-noU", p2, [])]:
    r = subprocess.run(["cscript", "//Nologo", "//E:JScript"] + args + [path], capture_output=True)
    res.append("%s rc=%d out=%r err=%r" % (name, r.returncode, r.stdout[:80], r.stderr[:80]))
open(os.path.join(d, "cscript_matrix.txt"), "w", encoding="utf-8").write("\n".join(res))
print("written")