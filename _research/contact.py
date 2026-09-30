"""Build numbered contact sheets of the downloaded images for visual review."""
import os, json
from PIL import Image, ImageDraw, ImageFont

Image.MAX_IMAGE_PIXELS = None
SRC = "raw"
files = sorted(f for f in os.listdir(SRC) if not f.endswith(".svg"))
meta = []
thumbs = []
for i, f in enumerate(files):
    try:
        im = Image.open(os.path.join(SRC, f))
        w, h = im.size
        im = im.convert("RGB")
        im.thumbnail((300, 220))
        thumbs.append((i, f, im))
        meta.append({"i": i, "file": f, "w": w, "h": h, "kb": os.path.getsize(os.path.join(SRC, f)) // 1024})
    except Exception as e:
        meta.append({"i": i, "file": f, "err": str(e)})
json.dump(meta, open("raw_meta.json", "w"), indent=1)

COLS, ROWS = 6, 5
CW, CH = 310, 250
font = ImageFont.load_default()
os.makedirs("sheets", exist_ok=True)
per = COLS * ROWS
for s in range(0, len(thumbs), per):
    sheet = Image.new("RGB", (COLS * CW, ROWS * CH), (30, 30, 30))
    d = ImageDraw.Draw(sheet)
    for k, (i, f, im) in enumerate(thumbs[s:s + per]):
        x, y = (k % COLS) * CW + 5, (k // COLS) * CH + 5
        sheet.paste(im, (x, y))
        d.rectangle([x, y + 222, x + 300, y + 244], fill=(0, 0, 0))
        d.text((x + 3, y + 226), f"{i}: {f[:44]}", fill=(255, 255, 0), font=font)
    sheet.save(f"sheets/sheet_{s // per:02d}.jpg", quality=80)
print(len(thumbs), "thumbs")
for m in meta:
    print(m)
