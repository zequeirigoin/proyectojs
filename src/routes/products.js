const express = require('express');
const router = express.Router();
const controller = require('../controllers/productsController');

router.get('/listar', controller.listar);
router.get('/detalle', controller.detalle);
router.post('/crear', controller.crear);

module.exports = router;