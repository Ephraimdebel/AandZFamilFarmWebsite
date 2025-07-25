const conn = require('../config/db.config');

// Create
async function create({ category_id, base_price, slaughter_price = null, cutting_price = null }) {
  try {
    await conn.query(
      `INSERT INTO price (category_id, base_price, slaughter_price, cutting_price)
       VALUES (?, ?, ?, ?)`,
      [category_id, base_price, slaughter_price, cutting_price]
    );
    return { status: 201, message: 'Price added successfully' };
  } catch (err) {
    console.error('Price create error:', err);
    return { status: 500, message: 'Server error' };
  }
}

// Read All
async function getAll() {
  try {
    const data = await conn.query(`
      SELECT p.*, c.name as category_name
      FROM price p
      JOIN category c ON p.category_id = c.id
      ORDER BY p.id DESC
    `);
    return { status: 200, data };
  } catch (err) {
    console.error('Price fetch error:', err);
    return { status: 500, data: [] };
  }
}

// Update 
async function update(id, { category_id, base_price, slaughter_price = null, cutting_price = null }) {
  try {
    await conn.query(
      `UPDATE price
       SET category_id = ?, base_price = ?, slaughter_price = ?, cutting_price = ?
       WHERE id = ?`,
      [category_id, base_price, slaughter_price, cutting_price, id]
    );
    return { status: 200, message: 'Price updated successfully' };
  } catch (err) {
    console.error('Price update error:', err);
    return { status: 500, message: 'Server error' };
  }
}

// Delete
async function remove(id) {
  try {
    await conn.query(`DELETE FROM price WHERE id = ?`, [id]);
    return { status: 200, message: 'Price deleted successfully' };
  } catch (err) {
    console.error('Price delete error:', err);
    return { status: 500, message: 'Server error' };
  }
}

module.exports = {
  create,
  getAll,
  update,
  remove
};
