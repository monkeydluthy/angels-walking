/**
 * Generates WebP versions of all PNG/JPG/JPEG images in public/.
 * Run via: npm run webp
 * Also runs automatically before build (prebuild).
 */
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const exts = ['.png', '.jpg', '.jpeg'];

let sharp;
try {
  sharp = require('sharp');
} catch (e) {
  console.warn('sharp not installed. Run: npm install sharp --save-dev');
  process.exit(0);
}

const files = fs.readdirSync(publicDir).filter((f) => {
  const ext = path.extname(f).toLowerCase();
  return exts.includes(ext);
});

async function main() {
  if (files.length === 0) {
    console.log('No images to convert in public/');
    return;
  }
  for (const file of files) {
    const input = path.join(publicDir, file);
    const base = path.basename(file, path.extname(file));
    const output = path.join(publicDir, `${base}.webp`);
    try {
      await sharp(input).webp({ quality: 85 }).toFile(output);
      console.log('Generated', path.basename(output));
    } catch (err) {
      console.error('Failed', file, err.message);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
