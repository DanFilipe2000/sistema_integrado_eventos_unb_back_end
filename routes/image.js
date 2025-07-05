const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Use req.baseUrl ou req.originalUrl para detectar a rota
    let relativePath = '';

    if (req.originalUrl.includes('/profile')) {
      relativePath = '../images/profile';
    } else if (req.originalUrl.includes('/event')) {
      relativePath = '../images/event';
    } else {
      return cb(new Error('Rota de upload desconhecida'), '');
    }

    const dir = path.join(__dirname, relativePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const nomeAleatorio = Date.now() + '_' + Math.random().toString(36).substring(2, 8) + ext;
    cb(null, nomeAleatorio);
  }
});

const upload = multer({ storage });

router.post('/profile', upload.single('imagem'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado' });

    // Aqui retorna o nome gerado para o frontend
    res.json({
        sucesso: true,
        nomeArquivo: req.file.filename,
        caminho: `/images/profile/${req.file.filename}`
    });
});

router.post('/event', upload.single('imagem'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado' });

    // Aqui retorna o nome gerado para o frontend
    res.json({
        sucesso: true,
        nomeArquivo: req.file.filename,
        caminho: `/images/event/${req.file.filename}`
    });
});

module.exports = router;
