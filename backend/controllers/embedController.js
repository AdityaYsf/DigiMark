const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs-extra');
const aesService = require('../services/aesService');
const eofService = require('../services/eofService');
const metadataService = require('../services/metadataService');

async function embedCopyright(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const { owner_name, copyright_id, description, secret_key } = req.body;

    if (!owner_name || !copyright_id || !secret_key) {
      await fs.remove(req.file.path);
      return res.status(400).json({ error: 'Missing required fields: owner_name, copyright_id, secret_key' });
    }

    const copyrightData = {
      owner_name,
      copyright_id,
      description: description || '',
      created_at: new Date().toISOString()
    };

    const encryptedData = aesService.encrypt(copyrightData, secret_key);

    const ext = path.extname(req.file.originalname);
    const outputFilename = `embedded_${uuidv4()}${ext}`;
    const outputPath = path.join(__dirname, '..', 'outputs', outputFilename);

    await eofService.embed(req.file.path, encryptedData, outputPath);

    try {
      await metadataService.embed(outputPath, encryptedData);
    } catch (metaErr) {
      console.warn('Metadata embed skipped:', metaErr.message);
    }

    await fs.remove(req.file.path);

    res.download(outputPath, `protected_${req.file.originalname}`);
  } catch (error) {
    if (req.file) await fs.remove(req.file.path);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { embedCopyright };
