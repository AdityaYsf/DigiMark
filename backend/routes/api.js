const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload');
const embedController = require('../controllers/embedController');
const extractController = require('../controllers/extractController');

router.post('/embed', upload.single('image'), embedController.embedCopyright);
router.post('/extract', upload.single('image'), extractController.extractCopyright);

module.exports = router;
