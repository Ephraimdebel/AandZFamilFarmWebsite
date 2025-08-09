const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');

// Get all users
router.get('/users',authMiddleware,adminMiddleware, userController.getAllUsers);

// Add admin
router.post('/users/add-admin',authMiddleware,adminMiddleware, userController.addAdmin);

// Delete user
router.delete('/users/:id',authMiddleware,adminMiddleware, userController.deleteUser);

// Change role
router.put('/users/role',authMiddleware,adminMiddleware, userController.changeUserRole);

module.exports = router;
