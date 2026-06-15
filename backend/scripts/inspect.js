const fs = require('fs-extra');
const path = require('path');
const CryptoJS = require('crypto-js');

const EOF_MARKER = '__EOF_DATA__';
const MARKER_BUFFER = Buffer.from(EOF_MARKER, 'utf8');

async function inspect(filePath) {
  const resolved = path.resolve(filePath);

  if (!(await fs.pathExists(resolved))) {
    console.error(`File not found: ${resolved}`);
    process.exit(1);
  }

  const stat = await fs.stat(resolved);
  const ext = path.extname(resolved).toLowerCase();
  const isImage = ['.jpg', '.jpeg', '.png'].includes(ext);

  console.log('\n=== File Info ===');
  console.log(`Path:     ${resolved}`);
  console.log(`Size:     ${(stat.size / 1024).toFixed(2)} KB (${stat.size} bytes)`);
  console.log(`Type:     ${ext || '(unknown)'}`);

  if (!isImage) {
    console.log(`\nWarning: "${ext}" is not JPG/JPEG/PNG — EOF data may not survive re-encoding.`);
  }

  const buffer = await fs.readFile(resolved);
  const markerIndex = buffer.lastIndexOf(MARKER_BUFFER);

  if (markerIndex === -1) {
    console.log('\nResult: No embedded data found.');
    return;
  }

  const dataBuffer = buffer.subarray(markerIndex + MARKER_BUFFER.length);
  let parsed;
  try {
    parsed = JSON.parse(dataBuffer.toString('utf8'));
  } catch {
    console.log(`\nResult: Found marker at byte ${markerIndex}, but data is not valid JSON (corrupted?).`);
    console.log(`Raw tail (hex): ${dataBuffer.slice(0, 100).toString('hex')}`);
    return;
  }

  console.log(`\nResult: Embedded data found!`);
  console.log(`Marker at byte: ${markerIndex}`);
  console.log(`Data size:      ${dataBuffer.length} bytes`);
  console.log(`\n=== Encrypted Data ===`);
  console.log(`Ciphertext: ${parsed.ciphertext}`);
  console.log(`IV:         ${parsed.iv}`);

  const secretKey = process.argv[3];
  if (secretKey) {
    console.log(`\n=== Decrypted (key provided) ===`);
    try {
      const decrypted = CryptoJS.AES.decrypt(parsed.ciphertext, secretKey);
      const jsonStr = decrypted.toString(CryptoJS.enc.Utf8);
      if (!jsonStr) {
        console.log('Decryption failed — wrong key or corrupted data.');
      } else {
        const data = JSON.parse(jsonStr);
        console.log(`Owner:         ${data.owner_name}`);
        console.log(`Copyright ID:  ${data.copyright_id}`);
        console.log(`Description:   ${data.description || '—'}`);
        console.log(`Created At:    ${data.created_at}`);
      }
    } catch (err) {
      console.log(`Decryption error: ${err.message}`);
    }
  } else {
    console.log(`\nTo decrypt: node scripts/inspect.js "${filePath}" your-secret-key`);
  }
}

const filePath = process.argv[2];
if (!filePath) {
  console.log('Usage: node scripts/inspect.js <image-file> [secret-key]');
  console.log('');
  console.log('Inspects an image file for embedded EOF copyright data.');
  console.log('If secret-key is provided, also decrypts the data.');
  process.exit(0);
}

inspect(filePath).catch((err) => {
  console.error(`Error: ${err.message}`);
  process.exit(1);
});
