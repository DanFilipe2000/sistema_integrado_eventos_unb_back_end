const express = require('express');
const router = express.Router();
const AvaliacaoController = require('../controllers/AvaliacaoController');

router.get('/', AvaliacaoController.getAll);

router.get('/:idParticipante', AvaliacaoController.getById);

router.post('/', AvaliacaoController.create);

router.put('/:idParticipante', AvaliacaoController.update);

router.delete('/:idParticipante', AvaliacaoController.delete);

module.exports = router;