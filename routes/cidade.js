const express = require('express');
const router = express.Router();
const CidadeController = require('../controllers/CidadeController');

router.get('/', CidadeController.getAll);

router.get('/:id', CidadeController.getById);

router.post('/', CidadeController.create);

router.put('/:id', CidadeController.update);

router.delete('/:id', CidadeController.delete);

module.exports = router;