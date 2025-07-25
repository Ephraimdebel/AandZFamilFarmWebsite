const express = require('express');
const router = express.Router();
const controller = require('../controllers/testimonial.controller');

// Create a new testimonial (by user)
router.post('/testimonial', controller.create);

// Get approved testimonials (for users)
router.get('/testimonial', controller.getApproved);

// Get all testimonials (for admin)
router.get('/testimonial/all', controller.getAll);

// Delete a testimonial by ID (admin)
router.delete('/testimonial/:id', controller.deleteById);

// Approve a testimonial (admin)
router.patch('/testimonial/:id/accept', controller.approve);

// Reject a testimonial (admin)
router.patch('/testimonial/:id/reject', controller.reject);

module.exports = router;
