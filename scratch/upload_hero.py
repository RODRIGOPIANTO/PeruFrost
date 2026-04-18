import os
import requests

PROJECT_REF = "rywzpyzdyxzdhivjlclm"
SUPABASE_URL = f"https://{PROJECT_REF}.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5d3pweXpkeXh6ZGhpdmpsY2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NzExMzUsImV4cCI6MjA5MTE0NzEzNX0.El4__fTVNE4xKgRVKQIwO1WtThLoFN5UtXPR6whkfqs"
BUCKET_NAME = "productos"

FILE_PATH = r"c:\Users\Xitanium\Documents\rodri\peru fro\perufrost-web\scripts\optimized_new\fondo_inicio.webp"
FILENAME = "fondo_inicio.webp"

def upload():
    url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET_NAME}/{FILENAME}"
    
    with open(FILE_PATH, 'rb') as f:
        headers = {
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "image/webp",
            "x-upsert": "true"
        }
        response = requests.post(url, headers=headers, data=f)
        
    if response.status_code in (200, 201):
        print(f"Uploaded: {FILENAME}")
        print(f"URL: {SUPABASE_URL}/storage/v1/object/public/{BUCKET_NAME}/{FILENAME}")
    else:
        print(f"Failed to upload {FILENAME}: {response.status_code} - {response.text}")

if __name__ == "__main__":
    upload()
