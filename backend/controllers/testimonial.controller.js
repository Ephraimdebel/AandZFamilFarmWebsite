const service = require('../services/testimonial.service');

// Create testimonial
async function create(req, res) {
  const { user_id, message, rating } = req.body;
  if (!user_id || !message) {
    return res.status(400).json({ message: "user_id and message are required" });
  }

  const result = await service.create({ user_id, message, rating });
  res.status(result.status).json({ message: result.message });
}

// Get only approved testimonials
async function getApproved(req, res) {
  const result = await service.getByStatus('approved');
  res.status(result.status).json({ data: result.data });
}

// Get all testimonials (admin)
async function getAll(req, res) {
  const result = await service.getAll();
  res.status(result.status).json({ data: result.data });
}

// Delete testimonial
async function deleteById(req, res) {
  const { id } = req.params;
  const result = await service.deleteById(id);
  res.status(result.status).json({ message: result.message });
}

// Approve
async function approve(req, res) {
  const { id } = req.params;
  const result = await service.updateStatus(id, 'approved');
  res.status(result.status).json({ message: result.message });
}

// Reject
async function reject(req, res) {
  const { id } = req.params;
  const result = await service.updateStatus(id, 'rejected');
  res.status(result.status).json({ message: result.message });
}

module.exports = {
  create,
  getApproved,
  getAll,
  deleteById,
  approve,
  reject
};
