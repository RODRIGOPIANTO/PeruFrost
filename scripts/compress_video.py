import subprocess
import os
import requests
from static_ffmpeg import run

# Configuración
INPUT_VIDEO = r"c:\Users\Xitanium\Documents\rodri\peru fro\perufrost-web\public\recursos\infra.mp4"
OUTPUT_VIDEO = r"c:\Users\Xitanium\Documents\rodri\peru fro\perufrost-web\scripts\infra_compressed.mp4"
PROJECT_REF = "rywzpyzdyxzdhivjlclm"
SUPABASE_URL = f"https://{PROJECT_REF}.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5d3pweXpkeXh6ZGhpdmpsY2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NzExMzUsImV4cCI6MjA5MTE0NzEzNX0.El4__fTVNE4xKgRVKQIwO1WtThLoFN5UtXPR6whkfqs"
BUCKET_NAME = "productos"

def compress():
    print(f"Compressing {INPUT_VIDEO}...")
    # Target bitrate calculation for ~45MB over 21s
    # (45 * 8 * 1024) / 21 =~ 17500 kbps
    # We will use crf 23 and a maxrate/bufsize to be safe or just a two-pass like approach but simple crf should work.
    # Actually, the quickest is to just set a target bitrate.
    
    cmd = [
        "ffmpeg", "-y", "-i", INPUT_VIDEO,
        "-vcodec", "libx264", "-crf", "24", "-preset", "slow",
        "-maxrate", "15M", "-bufsize", "30M",
        "-acodec", "aac", "-b:a", "128k",
        OUTPUT_VIDEO
    ]
    
    # run() from static_ffmpeg handles the binary path
    ffmpeg_path, _ = run.get_or_fetch_platform_executables_else_raise()
    cmd[0] = ffmpeg_path
    
    subprocess.run(cmd, check=True)
    
    size = os.path.getsize(OUTPUT_VIDEO)
    print(f"Compression complete. New size: {size / (1024*1024):.2f} MB")
    return size

def upload():
    filename = "infra.mp4"
    url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET_NAME}/{filename}"
    print(f"Uploading {filename} to Supabase...")
    
    with open(OUTPUT_VIDEO, 'rb') as f:
        headers = {
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "video/mp4",
            "x-upsert": "true"
        }
        response = requests.post(url, headers=headers, data=f)
        
    if response.status_code in (200, 201):
        print(f"Successfully uploaded: {filename}")
    else:
        print(f"Failed to upload: {response.status_code} - {response.text}")

if __name__ == "__main__":
    if compress() < 52428800: # 50MB limit
        upload()
    else:
        print("Still over 50MB. Adjusting parameters...")
