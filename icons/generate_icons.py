# -*- coding: utf-8 -*-
"""Lingo5 PWA icon generator (Pillow)."""
from PIL import Image, ImageDraw, ImageFont

def gradient(size, c1, c2):
    img = Image.new("RGB", (size, size))
    d = ImageDraw.Draw(img)
    for y in range(size):
        t = y / (size - 1)
        r = int(c1[0] + (c2[0] - c1[0]) * t)
        g = int(c1[1] + (c2[1] - c1[1]) * t)
        b = int(c1[2] + (c2[2] - c1[2]) * t)
        d.line([(0, y), (size, y)], fill=(r, g, b))
    return img

def make_icon(size, path, maskable=False):
    img = gradient(size, (79, 70, 229), (124, 58, 237)).convert("RGBA")
    d = ImageDraw.Draw(img)
    pad = int(size * (0.22 if maskable else 0.14))
    # speech bubble
    bubble = [pad, pad, size - pad, size - pad - int(size * 0.10)]
    radius = int(size * 0.12)
    d.rounded_rectangle(bubble, radius=radius, fill=(255, 255, 255, 255))
    # bubble tail
    tx = size // 2 - int(size * 0.05)
    ty = bubble[3]
    d.polygon([(tx, ty - 2), (tx + int(size * 0.10), ty - 2),
               (tx + int(size * 0.02), ty + int(size * 0.09))],
              fill=(255, 255, 255, 255))
    try:
        font = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", int(size * 0.30))
    except Exception:
        font = ImageFont.load_default()
    text = "EN"
    bbox = d.textbbox((0, 0), text, font=font)
    w = bbox[2] - bbox[0]
    h = bbox[3] - bbox[1]
    cx = (bubble[0] + bubble[2]) // 2
    cy = (bubble[1] + bubble[3]) // 2
    d.text((cx - w / 2 - bbox[0], cy - h / 2 - bbox[1]), text,
           font=font, fill=(79, 70, 229))
    img.save(path)
    print("saved", path)

make_icon(192, "icon-192.png")
make_icon(512, "icon-512.png")
make_icon(512, "icon-maskable-512.png", maskable=True)