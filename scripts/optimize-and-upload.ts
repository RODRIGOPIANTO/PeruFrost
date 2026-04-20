import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// ─────────────────────────────────────────────────────────────────────────────
// CONFIGURACIÓN
// ─────────────────────────────────────────────────────────────────────────────
const SUPABASE_URL = 'https://rywzpyzdyxzdhivjlclm.supabase.co';
// Usamos la clave anon que encontramos en el script anterior (final-upload.ts)
// Si falla, es posible que se necesite la Service Role Key.
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5d3pweXpkeXh6ZGhpdmpsY2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NzExMzUsImV4cCI6MjA5MTE0NzEzNX0.El4__fTVNE4xKgRVKQIwO1WtThLoFN5UtXPR6whkfqs';
const BUCKET_NAME = 'productos';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// Carpetas de origen (en orden de prioridad: las de 'actualizar' sobrescriben a 'productos')
const SOURCE_DIRS = [
  'c:/Users/Xitanium/Documents/rodri/peru fro/productos',
  'c:/Users/Xitanium/Documents/rodri/peru fro/actualizar en productos'
];

async function processFile(filePath: string) {
  const fileName = path.basename(filePath);
  const ext = path.extname(fileName).toLowerCase();
  
  if (!['.jpg', '.jpeg', '.png', '.webp'].includes(ext)) return;
  if (fileName === 'desktop.ini') return;

  try {
    const fileContent = fs.readFileSync(filePath);
    const nameWithoutExt = path.parse(fileName).name;
    
    // Normalizar nombres (reemplazar espacios por guiones, etc.)
    const normalizedName = nameWithoutExt
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[()]/g, '')
      .replace(/--+/g, '-');
      
    const targetName = `${normalizedName}.webp`;

    console.log(`\n📦 Procesando: ${fileName} -> ${targetName}`);

    // Optimización con Sharp
    const buffer = await sharp(fileContent)
      .resize({ width: 1200, withoutEnlargement: true }) // Máx 1200px para web
      .webp({ quality: 80, effort: 6 }) // Calidad balanceada
      .toBuffer();

    console.log(`🔼 Subiendo a Supabase (${(buffer.length / 1024).toFixed(1)} KB)...`);

    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(targetName, buffer, {
        contentType: 'image/webp',
        upsert: true
      });

    if (error) {
      console.error(`❌ Error al subir ${targetName}:`, error.message);
    } else {
      console.log(`✅ ¡Subida exitosa! URL: ${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${targetName}`);
    }
  } catch (err) {
    console.error(`❌ Error procesando ${fileName}:`, err);
  }
}

async function main() {
  console.log('🚀 Iniciando optimización y carga de productos...\n');

  // Mapa para evitar duplicados y dar prioridad a la carpeta de 'actualizar'
  const filesToProcess = new Map<string, string>();

  for (const dir of SOURCE_DIRS) {
    if (!fs.existsSync(dir)) {
      console.warn(`⚠️ Directorio no encontrado: ${dir}`);
      continue;
    }

    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isFile()) {
        // En un Map, el último que entra gana (prioridad a la última carpeta en el array)
        // Usamos el nombre base para detectar "el mismo producto"
        const base = path.parse(file).name.toLowerCase().replace(/\s+/g, '-');
        filesToProcess.set(base, fullPath);
      }
    }
  }

  console.log(`📝 Encontrados ${filesToProcess.size} archivos únicos para procesar.\n`);

  for (const [_, fullPath] of filesToProcess) {
    await processFile(fullPath);
  }

  console.log('\n🏁 Proceso finalizado.');
}

main();
