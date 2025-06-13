const express = require('express');
const router = express.Router();
const ParticipantesController = require('../controllers/ParticipantesController');

router.get('/', ParticipantesController.getAll);

router.get('/:matricula', ParticipantesController.getById);

router.post('/', ParticipantesController.create);

router.put('/:matricula', ParticipantesController.update);

router.delete('/:matricula', ParticipantesController.delete);

module.exports = router;