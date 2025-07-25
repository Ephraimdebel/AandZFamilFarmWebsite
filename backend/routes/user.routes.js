const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Get all users
router.get('/users', userController.getAllUsers);

// Add admin
router.post('/users/add-admin', userController.addAdmin);

// Delete user
router.delete('/users/:id', userController.deleteUser);

// Change role
router.put('/users/role', userController.changeUserRole);

module.exports = router;
