import os
import subprocess
import requests
from PIL import Image
try:
    import static_ffmpeg
    static_ffmpeg.add_paths()
except ImportError:
    print("Warning: static_ffmpeg not found. Video compression might fail if ffmpeg is not in PATH.")

# Configuration
SOURCE_DIR = r"C:\Users\Xitanium\Documents\rodri\peru fro\actualizar en productos"
OUTPUT_DIR = r"c:\Users\Xitanium\Documents\rodri\peru fro\perufrost-web\temp_optimized"
PROJECT_REF = "rywzpyzdyxzdhivjlclm"
SUPABASE_URL = f"https://{PROJECT_REF}.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5d3pweXpkeXh6ZGhpdmpsY2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NzExMzUsImV4cCI6MjA5MTE0NzEzNX0.El4__fTVNE4xKgRVKQIwO1WtThLoFN5UtXPR6whkfqs"
BUCKET_NAME = "productos"

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR)

def compress_video(input_path, output_path):
    print(f"Compressing {input_path}...")
    # target < 50MB (buffer for safety)
    # 720p, 1.2M bitrate (should result in ~30MB for 3 mins)
    cmd = [
        'ffmpeg', '-y', '-i', input_path,
        '-vcodec', 'libx264', '-crf', '26', '-preset', 'medium',
        '-vf', 'scale=1280:720',
        '-b:v', '1.2M', '-maxrate', '1.8M', '-bufsize', '3M',
        '-acodec', 'aac', '-b:a', '128k',
        output_path
    ]
    subprocess.run(cmd, check=True)
    size_mb = os.path.getsize(output_path) / (1024 * 1024)
    print(f"Video compressed to {size_mb:.2f} MB")

def optimize_image(input_path, output_path, max_size=(1200, 1200)):
    print(f"Optimizing {input_path}...")
    img = Image.open(input_path)
    img.thumbnail(max_size, Image.LANCZOS)
    img.save(output_path, "WEBP", quality=80)
    print(f"Image saved to {output_path}")

def upload_to_supabase(local_path, supabase_name):
    url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET_NAME}/{supabase_name}"
    print(f"Uploading to {url}...")
    
    content_type = "application/octet-stream"
    if local_path.endswith(".webp"): content_type = "image/webp"
    elif local_path.endswith(".mp4"): content_type = "video/mp4"
    
    with open(local_path, 'rb') as f:
        headers = {
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "x-upsert": "true",
            "Content-Type": content_type
        }
        resp = requests.post(url, headers=headers, data=f)
    print(f"Upload Result: {resp.status_code} - {resp.text}")

def main():
    # 1. Video
    video_src = os.path.join(SOURCE_DIR, "PERUFROST INGLES ENVIAR.mp4")
    video_out = os.path.join(OUTPUT_DIR, "video_eng_optimized.mp4")
    compress_video(video_src, video_out)
    upload_to_supabase(video_out, "video_eng_optimized.mp4")

    # 2. Images
    images = {
        "ala-co.jpg": "ala_co_new.webp",
        "nuca3.jpg": "nuca_new.webp",
        "pota.png": "pota_new.webp",
        "rabas5.webp": "rabas_new.webp"
    }
    
    for src_name, out_name in images.items():
        src_path = os.path.join(SOURCE_DIR, src_name)
        out_path = os.path.join(OUTPUT_DIR, out_name)
        if os.path.exists(src_path):
            optimize_image(src_path, out_path)
            upload_to_supabase(out_path, out_name)
        else:
            print(f"Warning: {src_path} not found")

if __name__ == "__main__":
    main()
