const fs = require('fs-extra');

const EOF_MARKER = '__EOF_DATA__';
const MARKER_BUFFER = Buffer.from(EOF_MARKER, 'utf8');

async function embed(imagePath, encryptedData, outputPath) {
  const [imageBuffer, dataBuffer] = await Promise.all([
    fs.readFile(imagePath),
    Promise.resolve(Buffer.from(EOF_MARKER + JSON.stringify(encryptedData), 'utf8'))
  ]);
  await fs.writeFile(outputPath, Buffer.concat([imageBuffer, dataBuffer]));
}

async function extract(imagePath) {
  const buffer = await fs.readFile(imagePath);
  const markerIndex = buffer.lastIndexOf(MARKER_BUFFER);
  if (markerIndex === -1) {
    throw new Error('No embedded data found in the image');
  }
  const dataBuffer = buffer.subarray(markerIndex + MARKER_BUFFER.length);
  return JSON.parse(dataBuffer.toString('utf8'));
}

module.exports = { embed, extract };
