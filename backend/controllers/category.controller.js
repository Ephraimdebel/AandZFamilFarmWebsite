const categoryService = require('../services/category.service');

// Create
async function create(req, res) {
  const { name, weight } = req.body;
  if (!name || !weight) return res.status(400).json({ message: 'Name and weight are required' });

  const result = await categoryService.create(name, weight);
  res.status(result.status).json({ message: result.message });
}

// Get all
async function getAll(req, res) {
  const result = await categoryService.getAll();
  res.status(result.status).json({ data: result.data });
}

// Update
async function update(req, res) {
  const { id } = req.params;
  const { name, weight } = req.body;
  if (!name || !weight) return res.status(400).json({ message: 'Name and weight are required' });

  const result = await categoryService.update(id, name, weight);
  res.status(result.status).json({ message: result.message });
}

// Delete
async function remove(req, res) {
  const { id } = req.params;
  const result = await categoryService.remove(id);
  res.status(result.status).json({ message: result.message });
}

module.exports = {
  create,
  getAll,
  update,
  remove
};
