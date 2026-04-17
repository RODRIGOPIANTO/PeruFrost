const { createClient } = require('@supabase/supabase-js');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const SUPABASE_URL = 'https://rywzpyzdyxzdhivjlclm.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ5d3pweXpkeXh6ZGhpdmpsY2xtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU1NzExMzUsImV4cCI6MjA5MTE0NzEzNX0.El4__fTVNE4xKgRVKQIwO1WtThLoFN5UtXPR6whkfqs';
const BUCKET_NAME = 'productos';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const DIRECTORIES = [
  { p: './public/productos', type: 'product' },
  { p: './public/recursos', type: 'resource' }
];

async function uploadFile(filePath, fileName) {
  const fileContent = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  
  if (ext === '.mp4' || fileName === 'desktop.ini') return;

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
      console.error(`❌ Failed to upload ${targetName}: ${error.message}`);
    } else {
      console.log(`✅ Successfully uploaded ${targetName}`);
    }
  } catch (err) {
    console.error(`❌ Error processing ${fileName}: ${err.message}`);
  }
}

async function main() {
  for (const dir of DIRECTORIES) {
    console.log(`\n--- Processing ${dir.p} ---`);
    if (!fs.existsSync(dir.p)) {
      console.warn(`Dir not found: ${dir.p}`);
      continue;
    }

    const files = fs.readdirSync(dir.p);
    for (const file of files) {
      const fullPath = path.join(dir.p, file);
      if (fs.statSync(fullPath).isFile()) {
        await uploadFile(fullPath, file);
      }
    }
  }
}

main();
