const galleryService = require('../services/gallery.service');

async function uploadGallery(req, res) {
  const { title } = req.body;
  const image = req.file?.filename;

  if (!title || !image) {
    return res.status(400).json({ message: 'Title and image are required' });
  }

  const result = await galleryService.upload({ title, image });
  res.status(result.status).json({ message: result.message });
}

async function getGallery(req, res) {
  const result = await galleryService.getAll();
  res.status(result.status).json({ data: result.data });
}

module.exports = { uploadGallery, getGallery };
