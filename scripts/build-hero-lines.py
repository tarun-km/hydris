"""Build the hero's 'reading' layer: the plant redrawn as white structure lines on ink.

The hero lens reveals this layer under the cursor. It must match the regular hero photo
pixel for pixel, so it is made from the same source at the same size.

Usage:  python scripts/build-hero-lines.py ["<source folder>"]
Output: public/photos/tanks-grid-lines-<width>.webp
"""
import os, sys
import cv2
import numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = sys.argv[1] if len(sys.argv) > 1 else r'E:/Startup/Hydris/website/0. assets/photos'
OUT = os.path.join(HERE, '..', 'public', 'photos')
NAME, TOP, WIDTHS = 'tanks-grid', 2000, [1024, 1600, 2000]
INK = np.array([24, 18, 11], np.float32)        # BGR of #0b1218, the darkest tone of the duotone

im = cv2.imread(os.path.join(SRC, f'{NAME}.jpg'))
h0, w0 = im.shape[:2]
im = cv2.resize(im, (TOP, round(h0 * TOP / w0)), interpolation=cv2.INTER_AREA)
gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)

# Structure lines: edges of tanks, walkways and pipes
edges = cv2.Canny(cv2.GaussianBlur(gray, (5, 5), 0), 45, 130)
edges = cv2.dilate(edges, np.ones((2, 2), np.uint8))
lines = cv2.GaussianBlur(edges.astype(np.float32) / 255.0, (3, 3), 0)

# A faint ghost of the photograph underneath, so the lines sit in context
ghost = (gray.astype(np.float32) / 255.0) ** 1.4 * 0.22
base = np.clip(INK[None, None, :] / 255.0 + ghost[..., None] * 0.9, 0, 1)
out = base * (1 - lines[..., None] * 0.92) + lines[..., None] * 0.92 * np.array([1.0, 0.98, 0.96])
out = (np.clip(out, 0, 1) * 255).astype(np.uint8)

for w in WIDTHS:
    o = out if w == TOP else cv2.resize(out, (w, round(out.shape[0] * w / TOP)), interpolation=cv2.INTER_AREA)
    cv2.imwrite(os.path.join(OUT, f'{NAME}-lines-{w}.webp'), o, [cv2.IMWRITE_WEBP_QUALITY, 74])
    print(f'{NAME}-lines-{w}.webp', o.shape[1], 'x', o.shape[0])
