const conn = require('../config/db.config');

// Create service
async function create(name) {
  try {
    await conn.query('INSERT INTO service (name) VALUES (?)', [name]);
    return { status: 201, message: 'Service created' };
  } catch (err) {
    console.error('Service create error:', err);
    return { status: 500, message: 'Server error' };
  }
}

// Update service
async function update(id, name) {
  try {
    const result = await conn.query('UPDATE service SET name = ? WHERE id = ?', [name, id]);
    return { status: 200, message: 'Service updated' };
  } catch (err) {
    console.error('Service update error:', err);
    return { status: 500, message: 'Server error' };
  }
}

// Delete service
async function remove(id) {
  try {
    await conn.query('DELETE FROM service WHERE id = ?', [id]);
    return { status: 200, message: 'Service deleted' };
  } catch (err) {
    console.error('Service delete error:', err);
    return { status: 500, message: 'Server error' };
  }
}

// Get all services
async function getAll() {
  try {
    const data = await conn.query('SELECT * FROM service ORDER BY id DESC');
    return { status: 200, data };
  } catch (err) {
    console.error('Service fetch error:', err);
    return { status: 500, data: [] };
  }
}

module.exports = {
  create,
  update,
  remove,
  getAll
};
