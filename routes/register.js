const express = require('express');
const multer = require('multer');
const router = express.Router();
const registerController = require('../controllers/RegisterController');

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', upload.single('foto'), registerController.register);

module.exports = router;