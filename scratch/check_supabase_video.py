import requests
url = "https://rywzpyzdyxzdhivjlclm.supabase.co/storage/v1/object/public/productos/video_institucional.mp4"
try:
    r = requests.head(url, timeout=10)
    print(f"Status Code: {r.status_code}")
    print(f"Headers: {r.headers}")
except Exception as e:
    print(f"Error: {e}")
