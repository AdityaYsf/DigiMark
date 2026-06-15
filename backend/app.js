require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 3001;

fs.ensureDirSync(path.join(__dirname, 'uploads'));
fs.ensureDirSync(path.join(__dirname, 'outputs'));

app.use(cors());
app.use(express.json());

app.use('/api', apiRoutes);

app.use('/outputs', express.static(path.join(__dirname, 'outputs')));

app.use((err, req, res, next) => {
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(413).json({ error: 'File too large — max 10 MB' });
  }
  if (err.message && err.message.includes('Only JPG')) {
    return res.status(400).json({ error: err.message });
  }
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
