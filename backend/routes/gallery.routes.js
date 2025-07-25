const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { uploadGallery, getGallery } = require('../controllers/gallery.controller');

// Set up multer to store images in 'uploads/' folder
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// POST /api/gallery
router.post('/gallery', upload.single('image'), uploadGallery);

// GET /api/gallery
router.get('/gallery', getGallery);

module.exports = router;
