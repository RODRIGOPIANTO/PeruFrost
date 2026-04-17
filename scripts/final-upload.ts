import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = 'https://rywzpyzdyxzdhivjlclm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5d3pweXpkeXh6ZGhpdmpsY2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NzExMzUsImV4cCI6MjA5MTE0NzEzNX0.El4__fTVNE4xKgRVKQIwO1WtThLoFN5UtXPR6whkfqs';
const BUCKET_NAME = 'productos';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const DIRECTORIES = [
  { path: './public/productos', type: 'product' },
  { path: './public/recursos', type: 'resource' }
];

async function uploadFile(filePath: string, fileName: string) {
  const fileContent = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  
  // Skip videos for now as they are too large or already there
  if (ext === '.mp4') return;
  if (fileName === 'desktop.ini') return;

  try {
    let buffer = fileContent;
    let targetName = fileName;

    if (ext !== '.webp' && ext !== '.svg') {
      const nameWithoutExt = path.parse(fileName).name;
      targetName = `${nameWithoutExt}.webp`;
      buffer = await sharp(fileContent)
        .webp({ quality: 85 })
        .toBuffer();
    }

    console.log(`Uploading ${targetName}...`);
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(targetName, buffer, {
        contentType: 'image/webp',
        upsert: true
      });

    if (error) {
      console.error(`❌ Failed to upload ${targetName}:`, error.message);
    } else {
      console.log(`✅ Successfully uploaded ${targetName}`);
    }
  } catch (err) {
    console.error(`❌ Error processing ${fileName}:`, err);
  }
}

async function main() {
  for (const dir of DIRECTORIES) {
    console.log(`\n--- Processing ${dir.path} ---`);
    if (!fs.existsSync(dir.path)) {
      console.warn(`Dir not found: ${dir.path}`);
      continue;
    }

    const files = fs.readdirSync(dir.path);
    for (const file of files) {
      const fullPath = path.join(dir.path, file);
      if (fs.statSync(fullPath).isFile()) {
        await uploadFile(fullPath, file);
      }
    }
  }
}

main();
