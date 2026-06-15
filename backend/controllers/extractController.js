const fs = require('fs-extra');
const aesService = require('../services/aesService');
const eofService = require('../services/eofService');

async function extractCopyright(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const { secret_key } = req.body;
    if (!secret_key) {
      await fs.remove(req.file.path);
      return res.status(400).json({ error: 'Missing required field: secret_key' });
    }

    const encryptedData = await eofService.extract(req.file.path);

    await fs.remove(req.file.path);

    const copyrightData = aesService.decrypt(encryptedData.ciphertext, secret_key);

    res.json({ success: true, data: copyrightData });
  } catch (error) {
    if (req.file) await fs.remove(req.file.path);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { extractCopyright };
