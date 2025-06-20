const express = require('express');
const router = express.Router();
const EstadoController = require('../controllers/EstadoController');

router.get('/', EstadoController.getAll);

router.get('/:sigla', EstadoController.getById);

router.post('/', EstadoController.create);

router.put('/:sigla', EstadoController.update);

router.delete('/:sigla', EstadoController.delete);

module.exports = router;