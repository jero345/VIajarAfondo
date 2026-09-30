import sys
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
src, chunk = sys.argv[1], int(sys.argv[2])
scale = float(sys.argv[3]) if len(sys.argv) > 3 else 1.0
im = Image.open(src).convert("RGB")
if scale != 1.0:
    im = im.resize((int(im.width * scale), int(im.height * scale)))
n = 0
for y in range(0, im.height, chunk):
    im.crop((0, y, im.width, min(im.height, y + chunk))).save(src.replace(".png", f"_p{n}.jpg"), quality=78)
    n += 1
print(src, im.size, n)
