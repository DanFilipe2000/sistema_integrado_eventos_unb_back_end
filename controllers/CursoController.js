const CursoService = require('../services/CursoService');

const CursoController = {
  async getAll(_req, res) {
    try {
      const curso = await CursoService.getAll();
      res.json(curso);
    } catch (err) {
      console.error('Erro ao buscar curso:', err);
      res.status(500).json({ error: 'Erro ao buscar curso' });
    }
  },

  async getById(req, res) {
    try {
      const curso = await CursoService.getById(req.params.matricula);
      if (!curso) {
        return res.status(404).json({ message: 'Curso não encontrado' });
      }
      res.json(curso);
    } catch (err) {
      console.error('Erro ao buscar curso:', err);
      res.status(500).json({ error: 'Erro ao buscar curso' });
    }
  },
  
  async create(req, res) {
    try {
      const novo = await CursoService.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      console.error('Erro ao criar curso:', err);
      res.status(500).json({ error: 'Erro ao criar curso' });
    }
  },

  async update(req, res) {
    try {
      const atualizado = await CursoService.update(req.params.matricula, req.body);
      if (!atualizado) {
        return res.status(404).json({ message: 'Curso não encontrado' });
      }
      res.json({ message: 'Curso atualizado com sucesso!' });
    } catch (err) {
      console.error('Erro ao atualizar curso:', err);
      res.status(500).json({ error: 'Erro ao atualizar curso' });
    }
  },

  async delete(req, res) {
    try {
      const deletado = await CursoService.delete(req.params.matricula);
      if (!deletado) {
        return res.status(404).json({ message: 'Curso não encontrado' });
      }
      res.json({ message: 'Curso deletado com sucesso' });
    } catch (err) {
      console.error('Erro ao deletar curso:', err);
      res.status(500).json({ error: 'Erro ao deletar curso' });
    }
  }
};

module.exports = CursoController;