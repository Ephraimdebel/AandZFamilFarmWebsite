const conn = require('../config/db.config');

// Create
async function create(name, weight) {
  try {
    await conn.query('INSERT INTO category (name, weight) VALUES (?, ?)', [name, weight]);
    return { status: 201, message: 'Category created successfully' };
  } catch (err) {
    console.error('Create error:', err);
    return { status: 500, message: 'Server error' };
  }
}

// Get all
async function getAll() {
  try {
    const data = await conn.query('SELECT * FROM category ORDER BY id DESC');
    return { status: 200, data };
  } catch (err) {
    console.error('Get all error:', err);
    return { status: 500, data: [] };
  }
}

// Update
async function update(id, name, weight) {
  try {
    await conn.query('UPDATE category SET name = ?, weight = ? WHERE id = ?', [name, weight, id]);
    return { status: 200, message: 'Category updated successfully' };
  } catch (err) {
    console.error('Update error:', err);
    return { status: 500, message: 'Server error' };
  }
}

// Delete
async function remove(id) {
  try {
    await conn.query('DELETE FROM category WHERE id = ?', [id]);
    return { status: 200, message: 'Category deleted successfully' };
  } catch (err) {
    console.error('Delete error:', err);
    return { status: 500, message: 'Server error' };
  }
}

module.exports = {
  create,
  getAll,
  update,
  remove
};
