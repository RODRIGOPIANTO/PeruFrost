import os
from PIL import Image

RECURSOS_DIR = r"c:\Users\Xitanium\Documents\rodri\peru fro\recursos"
OUTPUT_DIR = r"c:\Users\Xitanium\Documents\rodri\peru fro\perufrost-web\public\recursos"

def compress_image(filename, output_name):
    input_path = os.path.join(RECURSOS_DIR, filename)
    output_path = os.path.join(OUTPUT_DIR, output_name)
    
    if not os.path.exists(input_path):
        print(f"Not found: {input_path}")
        return

    print(f"Compressing {filename}...")
    with Image.open(input_path) as img:
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        img.save(output_path, "WEBP", quality=80, optimize=True)
    print(f"Saved to {output_path} (Size: {os.path.getsize(output_path)/1024:.2f} KB)")

if __name__ == "__main__":
    compress_image("sanipes.jpg", "sanipes.webp")
    # Also optimize infra background just in case
    compress_image("infrafondo.jpg", "infrafondo.webp")
