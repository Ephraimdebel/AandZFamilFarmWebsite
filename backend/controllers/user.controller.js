const userService = require('../services/user.service');

// 1. Get all users
async function getAllUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 2. Add new admin
async function addAdmin(req, res) {
  try {
    const { fullname, email, password } = req.body;
    const result = await userService.addAdmin({ fullname, email, password });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 3. Delete user
async function deleteUser(req, res) {
  try {
    const userId = req.params.id;
    const result = await userService.deleteUser(userId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// 4. Change role
async function changeUserRole(req, res) {
  try {
    const { id, role } = req.body;
    const result = await userService.changeUserRole(id, role);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getAllUsers,
  addAdmin,
  deleteUser,
  changeUserRole
};
