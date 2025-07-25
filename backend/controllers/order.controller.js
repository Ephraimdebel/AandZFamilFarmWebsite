
const orderService = require('../services/order.service');

// 1. Create Order
// Create order
async function placeOrder(req, res) {
  try {
    const {
      customer,
      phone,
      animal,
      quantity,
      size,
      selectedDate,
      reservationFee,
      status,
      paymentStatus,
      notes
    } = req.body;

    const response = await orderService.createOrder({
      customer,
      phone,
      animal,
      quantity,
      size,
      selectedDate,
      reservationFee,
      status,
      paymentStatus,
      notes
    });

    res.status(201).json(response);
  } catch (error) {
    console.error("Order create error:", error);
    res.status(500).json({ message: "Failed to place order" });
  }
}


// async function getAllOrders(req, res) {
//   try {
//     const orders = await orderService.getAllOrders();
//     console.log(orders)
//     res.status(200).json(orders);
//   } catch (error) {
//     console.error("Get all orders error:", error);
//     res.status(500).json({ message: "Failed to retrieve orders" });
//   }
// }

async function getAllOrders(req, res) {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const result = await orderService.getAllOrders(page, limit);
    res.status(200).json(result);
  } catch (err) {
    console.error("Get all orders error:", err);
    res.status(500).json({ message: "Failed to retrieve orders" });
  }
}



async function updateOrderStatus(req, res) {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const result = await orderService.updateStatus(id, status);
    res.status(200).json(result);
  } catch (error) {
    console.error("Update status error:", error);
    res.status(500).json({ message: "Failed to update status" });
  }
}


async function updatePaymentStatus(req, res) {
  try {
    const { id } = req.params;
    const { paymentStatus } = req.body;
    const result = await orderService.updatePaymentStatus(id, paymentStatus);
    res.status(200).json(result);
  } catch (error) {
    console.error("Update payment error:", error);
    res.status(500).json({ message: "Failed to update payment status" });
  }
}


// 5. Delete Order
async function deleteOrder(req, res) {
  try {
    const { id } = req.params;
    const result = await orderService.deleteOrder(id);
    res.status(200).json(result);
  } catch (err) {
    console.error("Delete order error:", err);
    res.status(500).json({ message: "Failed to delete order" });
  }
}

// 6. Get Orders by User
async function getOrdersByUser(req, res) {
  try {
    const { id } = req.params;
    const result = await orderService.getOrdersByUser(id);
    res.status(200).json(result);
  } catch (err) {
    console.error("User orders error:", err);
    res.status(500).json({ message: "Failed to get user orders" });
  }
}

// Delete an order by ID
async function deleteOrder(req, res) {
  try {
    const { id } = req.params;
    const result = await orderService.deleteOrder(id);
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Order deleted successfully" });
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Delete order error:", error);
    res.status(500).json({ message: "Failed to delete order" });
  }
}


module.exports = {
  placeOrder,
  getAllOrders,
  updateOrderStatus,
  updatePaymentStatus,
  deleteOrder
};
