const fs = require('fs-extra');

const PNG_SIG = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
const IEND_TYPE = Buffer.from('IEND');
const TEXT_TYPE = Buffer.from('tEXt');

const CRC_TABLE = makeCRCTable();

function makeCRCTable() {
  const table = [];
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    table[n] = c;
  }
  return table;
}

function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc = CRC_TABLE[(crc ^ buf[i]) & 0xFF] ^ (crc >>> 8);
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

async function embed(imagePath, encryptedData) {
  let buffer = await fs.readFile(imagePath);
  const payload = Buffer.from(JSON.stringify(encryptedData), 'utf8');

  const lower = imagePath.toLowerCase();
  if (lower.endsWith('.png')) {
    buffer = embedPng(buffer, payload);
  } else {
    buffer = embedJpeg(buffer, payload);
  }

  await fs.writeFile(imagePath, buffer);
}

async function extract(imagePath) {
  const buffer = await fs.readFile(imagePath);

  const lower = imagePath.toLowerCase();
  let dataStr;
  if (lower.endsWith('.png')) {
    dataStr = extractPng(buffer);
  } else {
    dataStr = extractJpeg(buffer);
  }

  if (!dataStr) return null;
  return JSON.parse(dataStr);
}

function embedJpeg(buffer, payload) {
  const length = payload.length + 2;
  const com = Buffer.alloc(2 + 2 + payload.length);
  com[0] = 0xFF;
  com[1] = 0xFE;
  com.writeUInt16BE(length, 2);
  payload.copy(com, 4);

  const eoi = buffer.lastIndexOf(Buffer.from([0xFF, 0xD9]));
  if (eoi === -1) return buffer;
  return Buffer.concat([buffer.subarray(0, eoi), com, buffer.subarray(eoi)]);
}

function embedPng(buffer, payload) {
  const keyword = 'DigiMark';
  const chunkData = Buffer.concat([Buffer.from(keyword + '\0', 'utf8'), payload]);
  const toCrc = Buffer.concat([TEXT_TYPE, chunkData]);
  const crc = crc32(toCrc);

  const chunk = Buffer.alloc(4 + 4 + chunkData.length + 4);
  chunk.writeUInt32BE(chunkData.length, 0);
  TEXT_TYPE.copy(chunk, 4);
  chunkData.copy(chunk, 8);
  chunk.writeUInt32BE(crc, 8 + chunkData.length);

  const iend = buffer.lastIndexOf(IEND_TYPE);
  if (iend === -1) return buffer;
  const beforeIend = iend - 4;
  return Buffer.concat([buffer.subarray(0, beforeIend), chunk, buffer.subarray(beforeIend)]);
}

function extractJpeg(buffer) {
  const eoi = buffer.lastIndexOf(Buffer.from([0xFF, 0xD9]));
  if (eoi === -1) return null;

  let pos = buffer.lastIndexOf(Buffer.from([0xFF, 0xFE]), eoi);
  if (pos === -1 || pos + 2 >= eoi) return null;

  const length = buffer.readUInt16BE(pos + 2);
  const dataEnd = pos + 4 + length - 2;
  if (dataEnd > buffer.length) return null;
  return buffer.subarray(pos + 4, dataEnd).toString('utf8');
}

function extractPng(buffer) {
  if (!PNG_SIG.equals(buffer.subarray(0, 8))) return null;

  let pos = 8;
  while (pos + 8 <= buffer.length) {
    const length = buffer.readUInt32BE(pos);
    const type = buffer.subarray(pos + 4, pos + 8);

    if (type.equals(IEND_TYPE)) break;

    if (type.equals(TEXT_TYPE)) {
      const data = buffer.subarray(pos + 8, pos + 8 + length);
      const nullIdx = data.indexOf(0);
      if (nullIdx !== -1) {
        const text = data.subarray(nullIdx + 1).toString('utf8');
        return text;
      }
    }

    pos += 12 + length;
  }
  return null;
}

module.exports = { embed, extract };
