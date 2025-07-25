const express = require('express');
const router = express.Router();
const controller = require('../controllers/service.controller');

// Create new service
router.post('/service', controller.create);

// Update service
router.put('/service/:id', controller.update);

// Delete service
router.delete('/service/:id', controller.remove);

// Get all services
router.get('/service', controller.getAll);

module.exports = router;
