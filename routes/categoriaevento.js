const express = require('express');
const router = express.Router();
const CategoriaeventoController = require('../controllers/CategoriaeventoController');

router.get('/', CategoriaeventoController.getAll);

router.get('/:Codigo', CategoriaeventoController.getById);

router.post('/', CategoriaeventoController.create);

router.put('/:Codigo', CategoriaeventoController.update);

router.delete('/:Codigo', CategoriaeventoController.delete);

module.exports = router;