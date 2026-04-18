import requests
import os

PROJECT_REF = "rywzpyzdyxzdhivjlclm"
SUPABASE_URL = f"https://{PROJECT_REF}.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5d3pweXpkeXh6ZGhpdmpsY2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NzExMzUsImV4cCI6MjA5MTE0NzEzNX0.El4__fTVNE4xKgRVKQIwO1WtThLoFN5UtXPR6whkfqs"
BUCKET_NAME = "productos"

def upload_file(local_path, supabase_path):
    url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET_NAME}/{supabase_path}"
    print(f"Uploading {local_path} to {url}...")
    
    with open(local_path, 'rb') as f:
        headers = {
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "x-upsert": "true"
        }
        # Detect content type
        if local_path.endswith('.mp4'): headers["Content-Type"] = "video/mp4"
        elif local_path.endswith('.webp'): headers["Content-Type"] = "image/webp"
        
        response = requests.post(url, headers=headers, data=f)
        
    print(f"Result: {response.status_code} - {response.text}")

if __name__ == "__main__":
    # Upload video_institucional.mp4
    v_path = r"c:\Users\Xitanium\Documents\rodri\peru fro\perufrost-web\public\recursos\video_institucional.mp4"
    if os.path.exists(v_path):
        upload_file(v_path, "video_institucional.mp4")
    
    # Upload fondo_inicio.webp
    f_path = r"c:\Users\Xitanium\Documents\rodri\peru fro\perufrost-web\public\recursos\fondo_inicio.webp"
    if os.path.exists(f_path):
        upload_file(f_path, "fondo_inicio.webp")
