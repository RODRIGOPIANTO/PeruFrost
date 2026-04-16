import os
import requests

# Configuración Supabase
PROJECT_REF = "rywzpyzdyxzdhivjlclm"
SUPABASE_URL = f"https://{PROJECT_REF}.supabase.co"
# Anon key from MCP
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5d3pweXpkeXh6ZGhpdmpsY2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NzExMzUsImV4cCI6MjA5MTE0NzEzNX0.El4__fTVNE4xKgRVKQIwO1WtThLoFN5UtXPR6whkfqs"
BUCKET_NAME = "productos"

OPTIMIZED_DIR = r"c:\Users\Xitanium\Documents\rodri\peru fro\perufrost-web\scripts\optimized_new"

def upload_file(filename):
    file_path = os.path.join(OPTIMIZED_DIR, filename)
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        return

    url = f"{SUPABASE_URL}/storage/v1/object/{BUCKET_NAME}/{filename}"
    
    with open(file_path, 'rb') as f:
        headers = {
            "Authorization": f"Bearer {SUPABASE_KEY}",
            "Content-Type": "image/webp",
            "x-upsert": "true"
        }
        # Using PUT for upsert
        response = requests.post(url, headers=headers, data=f)
        
    if response.status_code in (200, 201):
        print(f"Uploaded: {filename}")
    else:
        print(f"Failed to upload {filename}: {response.status_code} - {response.text}")

if __name__ == "__main__":
    files = [
        "news_yantai.webp",
        "news_osmosis.webp",
        "news_planta.webp",
        "partner_snp_new.webp",
        "partner_capecal_new.webp",
        "partner_sni_new.webp",
        "cert_brcgs_new.webp",
        "cert_haccp_new.webp",
        "cert_smeta_new.webp"
    ]
    for f in files:
        upload_file(f)
