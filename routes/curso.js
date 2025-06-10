const express = require('express');
const router = express.Router();
const CursoController = require('../controllers/CursoController');

router.post('/', CursoController.create);

module.exports = router;