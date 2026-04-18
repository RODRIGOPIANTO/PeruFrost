import os
from PIL import Image

RECURSOS_DIR = r"c:\Users\Xitanium\Documents\rodri\peru fro\recursos"
OUTPUT_DIR = r"c:\Users\Xitanium\Documents\rodri\peru fro\perufrost-web\scripts\optimized_new"

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

def compress_image(filename, output_name):
    input_path = os.path.join(RECURSOS_DIR, filename)
    output_path = os.path.join(OUTPUT_DIR, output_name)
    
    print(f"Compressing {filename}...")
    with Image.open(input_path) as img:
        # Convert to RGB if needed
        if img.mode in ("RGBA", "P"):
            img = img.convert("RGB")
        # Resize if too large (optional, but good for hero)
        # img.thumbnail((1920, 1080)) 
        img.save(output_path, "WEBP", quality=85, optimize=True)
    print(f"Saved to {output_path} (Size: {os.path.getsize(output_path)/1024:.2f} KB)")

if __name__ == "__main__":
    compress_image("fondo incio.jpeg", "fondo_inicio.webp")
