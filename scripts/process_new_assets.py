import os
from PIL import Image

# Configuración de carpetas
RECURSOS_DIR = r"c:\Users\Xitanium\Documents\rodri\peru fro\recursos"
LOGOS_DIR = r"c:\Users\Xitanium\Documents\rodri\peru fro\updatelogos"
OUTPUT_DIR = r"c:\Users\Xitanium\Documents\rodri\peru fro\perufrost-web\scripts\optimized_new"

os.makedirs(OUTPUT_DIR, exist_ok=True)

# Mapeo de archivos origen -> destino
assets = {
    # Noticias
    os.path.join(RECURSOS_DIR, "contrato_yantai_moon.jpg"): "news_yantai.webp",
    os.path.join(RECURSOS_DIR, "planta_osmosis.jpg"): "news_osmosis.webp",
    os.path.join(RECURSOS_DIR, "planta.webp"): "news_planta.webp",
    # Socios
    os.path.join(LOGOS_DIR, "sociedad nacional de pesqueria.png"): "partner_snp_new.webp",
    os.path.join(LOGOS_DIR, "capecal.png"): "partner_capecal_new.webp",
    os.path.join(LOGOS_DIR, "sni.png"): "partner_sni_new.webp",
    # Certificaciones
    os.path.join(LOGOS_DIR, "brcgs.png"): "cert_brcgs_new.webp",
    os.path.join(LOGOS_DIR, "haccp.png"): "cert_haccp_new.webp",
    os.path.join(LOGOS_DIR, "smeeta.png"): "cert_smeta_new.webp",
}

def optimize_image(src, dest_name):
    if not os.path.exists(src):
        print(f"Skipping {src} (Not found)")
        return
    
    dest_path = os.path.join(OUTPUT_DIR, dest_name)
    try:
        with Image.open(src) as img:
            # Convert to RGB if needed (for JPG/PNG with alpha)
            if img.mode in ("RGBA", "P"):
                img = img.convert("RGBA")
            
            # Optimization
            img.save(dest_path, "WEBP", quality=85, method=6)
            print(f"Optimized: {dest_name}")
    except Exception as e:
        print(f"Error processing {src}: {e}")

if __name__ == "__main__":
    for src, dest in assets.items():
        optimize_image(src, dest)
