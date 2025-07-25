const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');

// Create
router.post('/category', controller.create);

// Read all
router.get('/category', controller.getAll);

// Update
router.put('/category/:id', controller.update);

// Delete
router.delete('/category/:id', controller.remove);

module.exports = router;

