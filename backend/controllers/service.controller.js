const serviceService = require('../services/service.service');

// Create
async function create(req, res) {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });

  const result = await serviceService.create(name);
  res.status(result.status).json({ message: result.message });
}

// Update
async function update(req, res) {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    return res.status(400).json({ message: 'Valid name is required' });
  }

  const result = await serviceService.update(id, name);
  res.status(result.status).json({ message: result.message });
}


// Delete
async function remove(req, res) {
  const { id } = req.params;
  const result = await serviceService.remove(id);
  res.status(result.status).json({ message: result.message });
}

// Get all
async function getAll(req, res) {
  const result = await serviceService.getAll();
  res.status(result.status).json({ data: result.data });
}

module.exports = {
  create,
  update,
  remove,
  getAll
};
