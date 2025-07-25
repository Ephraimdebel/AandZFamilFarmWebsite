const priceService = require('../services/price.service');

async function create(req, res) {
  const { category_id, base_price, slaughter_price, cutting_price } = req.body;

  if (!category_id || !base_price)
    return res.status(400).json({ message: 'category_id and base_price are required' });

  const result = await priceService.create({ category_id, base_price, slaughter_price, cutting_price });
  res.status(result.status).json({ message: result.message });
}

async function getAll(req, res) {
  const result = await priceService.getAll();
  res.status(result.status).json({ data: result.data });
}

async function update(req, res) {
  const { id } = req.params;
  const { category_id, base_price, slaughter_price, cutting_price } = req.body;

  if (!category_id || !base_price)
    return res.status(400).json({ message: 'category_id and base_price are required' });

  const result = await priceService.update(id, { category_id, base_price, slaughter_price, cutting_price });
  res.status(result.status).json({ message: result.message });
}

async function remove(req, res) {
  const { id } = req.params;
  const result = await priceService.remove(id);
  res.status(result.status).json({ message: result.message });
}

module.exports = {
  create,
  getAll,
  update,
  remove
};
