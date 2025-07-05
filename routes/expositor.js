const express = require('express');
const router = express.Router();
const ExpositorController = require('../controllers/ExpositorController');

router.get('/', ExpositorController.getAll);

module.exports = router;
