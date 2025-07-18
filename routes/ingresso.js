const express = require('express');
const router = express.Router();
const IngressoController = require('../controllers/IngressoController');

router.get('/', IngressoController.getAll);

router.get('/:idParticipante/:idEvento', IngressoController.getByIds);

router.post('/', IngressoController.create);

router.put('/:idParticipante/:idEvento', IngressoController.update);

router.delete('/:idParticipante/:idEvento', IngressoController.delete);

module.exports = router;
