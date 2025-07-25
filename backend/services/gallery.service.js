const conn = require('../config/db.config');

async function upload({ title, image }) {
  try {
    await conn.query('INSERT INTO gallery (title, image) VALUES (?, ?)', [title, image]);
    return { status: 201, message: 'Gallery item uploaded' };
  } catch (err) {
    console.error('Gallery upload error:', err);
    return { status: 500, message: 'Upload failed' };
  }
}

async function getAll() {
  try {
    const data = await conn.query('SELECT * FROM gallery ORDER BY id DESC');
    return { status: 200, data };
  } catch (err) {
    console.error('Gallery fetch error:', err);
    return { status: 500, data: [] };
  }
}

module.exports = { upload, getAll };
