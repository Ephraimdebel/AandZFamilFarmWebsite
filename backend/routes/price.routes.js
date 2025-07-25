const express = require('express');
const router = express.Router();
const controller = require('../controllers/price.controller');

router.post('/price', controller.create);
router.get('/price', controller.getAll);
router.put('/price/:id', controller.update);
router.delete('/price/:id', controller.remove);

module.exports = router;
