import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Configuración
const SUPABASE_URL = 'https://rywzpyzdyxzdhivjlclm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5d3pweXpkeXh6ZGhpdmpsY2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NzExMzUsImV4cCI6MjA5MTE0NzEzNX0.El4__fTVNE4xKgRVKQIwO1WtThLoFN5UtXPR6whkfqs';
const BUCKET_NAME = 'productos';
const SOURCES = [
  'C:/Users/Xitanium/Documents/rodri/peru fro/productos',
  'C:/Users/Xitanium/Documents/rodri/peru fro/perufrost-web/public/recursos'
];

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function optimizeAndUpload() {
  for (const SOURCE_DIR of SOURCES) {
    if (!fs.existsSync(SOURCE_DIR)) {
      console.warn(`Directorio no encontrado: ${SOURCE_DIR}`);
      continue;
    }
    
    const files = fs.readdirSync(SOURCE_DIR).filter(f => 
      f.endsWith('.jpg') || f.endsWith('.jpeg') || f.endsWith('.png') || f.endsWith('.webp')
    );
    console.log(`Procesando carpeta: ${SOURCE_DIR} (${files.length} archivos)`);

    for (const file of files) {
      if (file.endsWith('.mp4')) continue;
      try {
        const filePath = path.join(SOURCE_DIR, file);
        const fileName = path.parse(file).name;
        const targetName = `${fileName}.webp`;

        // 1. Optimización con Sharp
        const buffer = await sharp(filePath)
          .resize(1200, 1200, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80 })
          .toBuffer();

        // 2. Subida a Supabase
        const { error } = await supabase.storage
          .from(BUCKET_NAME)
          .upload(targetName, buffer, {
            contentType: 'image/webp',
            upsert: true
          });

        if (error) {
          console.error(`Error subiendo ${file}:`, error.message);
        } else {
          console.log(`✅ Subido: ${targetName}`);
        }
      } catch (err) {
        console.error(`Fallo en ${file}:`, err);
      }
    }
  }
}

optimizeAndUpload();
