const CursoService = require('../services/CursoService');

const CursoController = {
  async create(req, res) {
    try {
      const novo = await CursoService.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      console.error('Erro ao criar curso:', err);
      res.status(500).json({ error: 'Erro ao criar curso' });
    }
  },
};

module.exports = CursoController;