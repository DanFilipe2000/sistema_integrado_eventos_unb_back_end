const express = require('express');
const router = express.Router();
const AvaliacaoController = require('../controllers/AvaliacaoController');

router.get('/', AvaliacaoController.getAll);

router.get('/:idParticipante/:idEvento', AvaliacaoController.getById);

router.post('/', AvaliacaoController.create);

router.put('/:idParticipante/:idEvento', AvaliacaoController.update);

router.delete('/:idParticipante/:idEvento', AvaliacaoController.delete);

module.exports = router;