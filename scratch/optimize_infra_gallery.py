import os
from PIL import Image

OUTPUT_DIR = r"c:\Users\Xitanium\Documents\rodri\peru fro\perufrost-web\public\recursos"

def compress_image(filename, output_name):
    path = os.path.join(OUTPUT_DIR, filename)
    out = os.path.join(OUTPUT_DIR, output_name)
    if not os.path.exists(path): return
    print(f"Optimizing {filename}...")
    with Image.open(path) as img:
        img.convert("RGB").save(out, "WEBP", quality=80)

if __name__ == "__main__":
    compress_image("planta_osmosis.jpg", "planta_osmosis.webp")
    compress_image("120m.jpg", "120m.webp")
    compress_image("marel.jpg", "marel.webp")
