const express = require('express');
const router = express.Router();
const EstadoController = require('../controllers/EstadoController');

router.get('/', EstadoController.getAll);

router.get('/:Sigla', EstadoController.getById);

router.post('/', EstadoController.create);

router.put('/:Sigla', EstadoController.update);

router.delete('/:Sigla', EstadoController.delete);

module.exports = router;