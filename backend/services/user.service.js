const { query } = require('../config/db.config');

// 1. Get all users
async function getAllUsers() {
  const sql = `
    SELECT 
      u.id, 
      u.fullname, 
      u.email, 
      u.role, 
      u.last_login, 
      u.created_at, 
      COUNT(o.id) AS total_orders
    FROM user u
    LEFT JOIN orders o ON u.id = o.user_id
    GROUP BY u.id, u.fullname, u.email, u.role, u.last_login, u.created_at
    ORDER BY u.id DESC
  `;
  return await query(sql);
}


// 2. Add another admin
async function addAdmin({ fullname, email, password }) {
  const hashedPassword = password; // hash this using bcrypt before saving in real implementation
  const sql = `INSERT INTO user (fullname, email, password, role) VALUES (?, ?, ?, 'admin')`;
  await query(sql, [fullname, email, hashedPassword]);
  return { message: 'Admin user created successfully' };
}

// 3. Delete user
async function deleteUser(id) {
  const sql = `DELETE FROM user WHERE id = ?`;
  await query(sql, [id]);
  return { message: 'User deleted successfully' };
}

// 4. Change user role
async function changeUserRole(id, role) {
  const validRoles = ['user', 'admin'];
  if (!validRoles.includes(role)) throw new Error('Invalid role value');

  const sql = `UPDATE user SET role = ? WHERE id = ?`;
  await query(sql, [role, id]);
  return { message: `User role updated to ${role}` };
}

module.exports = {
  getAllUsers,
  addAdmin,
  deleteUser,
  changeUserRole
};
