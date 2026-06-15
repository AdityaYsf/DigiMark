const CryptoJS = require('crypto-js');

function encrypt(data, key) {
  const jsonStr = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(jsonStr, key);
  return {
    ciphertext: encrypted.toString(),
    iv: encrypted.iv.toString()
  };
}

function decrypt(ciphertext, key) {
  const decrypted = CryptoJS.AES.decrypt(ciphertext, key);
  const jsonStr = decrypted.toString(CryptoJS.enc.Utf8);
  if (!jsonStr) {
    throw new Error('Decryption failed — wrong key or corrupted data');
  }
  return JSON.parse(jsonStr);
}

module.exports = { encrypt, decrypt };
