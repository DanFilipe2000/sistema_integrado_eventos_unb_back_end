const express = require('express');
const router = express.Router();
const IngressoController = require('../controllers/IngressoController');

router.get('/', IngressoController.getAll);

router.get('/:idParticipante/:idEvento/:idTipoIngresso', IngressoController.getByIds);

router.post('/', IngressoController.create);

router.put('/:idParticipante/:idEvento/:idTipoIngresso', IngressoController.update);

router.delete('/:idParticipante/:idEvento/:idTipoIngresso', IngressoController.delete);

module.exports = router;
