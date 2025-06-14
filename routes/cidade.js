const express = require('express');
const router = express.Router();
const CidadeController = require('../controllers/CidadeController');

router.get('/', CidadeController.getAll);

router.get('/:Codigo', CidadeController.getById);

router.post('/', CidadeController.create);

router.put('/:Codigo', CidadeController.update);

router.delete('/:Codigo', CidadeController.delete);

module.exports = router;