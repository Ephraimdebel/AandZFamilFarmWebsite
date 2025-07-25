const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order.controller');
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');

router.post('/order', orderController.placeOrder);
router.get('/orders', authMiddleware, adminMiddleware, orderController.getAllOrders);
router.put('/order/:id/status',authMiddleware, adminMiddleware, orderController.updateOrderStatus);
router.put('/order/:id/payment',authMiddleware, adminMiddleware, orderController.updatePaymentStatus);
router.delete('/order/:id',authMiddleware, adminMiddleware, orderController.deleteOrder);

module.exports = router;
