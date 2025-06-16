const express = require('express');
const router = express.Router();
const TipoingressoController = require('../controllers/TipoingressoController');

router.get('/', TipoingressoController.getAll);

router.get('/:Codigo', TipoingressoController.getById);

router.post('/', TipoingressoController.create);

router.put('/:Codigo', TipoingressoController.update);

router.delete('/:Codigo', TipoingressoController.delete);

module.exports = router;