const conn = require('../config/db.config');

// Create order
async function createOrder(data) {
  const sql = `
    INSERT INTO orders (customer, phone, animal, quantity, size, selected_date, reservation_fee, status, payment_status, notes)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    data.customer,
    data.phone,
    data.animal,
    data.quantity,
    data.size,
    data.selectedDate,
    data.reservationFee,
    data.status,
    data.paymentStatus,
    data.notes
  ];

  const result = await conn.query(sql, values);
  return { message: "Order placed successfully", orderId: result.insertId };
}

async function getAllOrders(page = 1, limit = 10) {
  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const offset = (pageNum - 1) * limitNum;
  // Validate numbers
  if (isNaN(pageNum) || isNaN(limitNum)) {
    throw new Error("Invalid pagination parameters");
  }

  const countResult = await conn.query(`SELECT COUNT(*) as total FROM orders`);
  const totalRecords = countResult[0].total;

  // const rows = await conn.query(
  //   `SELECT * FROM orders ORDER BY created_at DESC LIMIT ? OFFSET ?`,
  //   [limitNum, offset] // ✅ Pass as numbers
  // );

   const sql = `SELECT * FROM orders ORDER BY created_at DESC LIMIT ${limitNum} OFFSET ${offset}`;
     const rows = await conn.query(sql);
  return {
    orders: rows,
    pagination: {
      currentPage: pageNum,
      totalPages: Math.ceil(totalRecords / limitNum),
      totalRecords,
      pageSize: limitNum
    }
  };
}



async function updateStatus(id, status) {
  const result = await conn.query(`UPDATE orders SET status = ? WHERE id = ?`, [status, id]);
  return { message: "Order status updated", affectedRows: result.affectedRows };
}

async function updatePaymentStatus(id, paymentStatus) {
  const result= await conn.query(`UPDATE orders SET payment_status = ? WHERE id = ?`, [paymentStatus, id]);
  return { message: "Payment status updated", affectedRows: result.affectedRows };
}

async function deleteOrder(id) {
  const result = await conn.query(`DELETE FROM orders WHERE id = ?`, [id]);
  return result;
}

module.exports = {
  createOrder,
  getAllOrders,
  updateStatus,
  updatePaymentStatus,
  deleteOrder
};
