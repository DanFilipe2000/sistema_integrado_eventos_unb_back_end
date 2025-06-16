const express = require('express');
const router = express.Router();
const EnderecoController = require('../controllers/EnderecoController');

router.get('/', EnderecoController.getAll);

router.get('/:id', EnderecoController.getById);

router.post('/', EnderecoController.create);

router.put('/:id', EnderecoController.update);

router.delete('/:id', EnderecoController.delete);

module.exports = router;
