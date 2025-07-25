const conn = require('../config/db.config');

// Create
async function create({ user_id, message, rating }) {
  try {
    await conn.query(
      'INSERT INTO testimonial (user_id, message, rating) VALUES (?, ?, ?)',
      [user_id, message, rating || null]
    );
    return { status: 201, message: 'Testimonial submitted for review' };
  } catch (err) {
    console.error('Create error:', err);
    return { status: 500, message: 'Server error' };
  }
}

// Get all
async function getAll() {
  try {
    const data = await conn.query('SELECT * FROM testimonial ORDER BY created_at DESC');
    return { status: 200, data };
  } catch (err) {
    console.error('Fetch all error:', err);
    return { status: 500, data: [] };
  }
}

// Get by status
async function getByStatus(status) {
  try {
    const data = await conn.query(
      'SELECT * FROM testimonial WHERE status = ? ORDER BY created_at DESC',
      [status]
    );
    return { status: 200, data };
  } catch (err) {
    console.error('Fetch by status error:', err);
    return { status: 500, data: [] };
  }
}

// Delete by ID
async function deleteById(id) {
  try {
    await conn.query('DELETE FROM testimonial WHERE id = ?', [id]);
    return { status: 200, message: 'Testimonial deleted' };
  } catch (err) {
    console.error('Delete error:', err);
    return { status: 500, message: 'Server error' };
  }
}

// Update status (accept/reject)
async function updateStatus(id, status) {
  try {
    await conn.query('UPDATE testimonial SET status = ? WHERE id = ?', [status, id]);
    return { status: 200, message: `Testimonial ${status}` };
  } catch (err) {
    console.error('Status update error:', err);
    return { status: 500, message: 'Server error' };
  }
}

module.exports = {
  create,
  getAll,
  getByStatus,
  deleteById,
  updateStatus
};
