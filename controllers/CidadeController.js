const CidadeService = require('../services/CidadeService');

const CidadeController = {
  async getAll(_req, res) {
    try {
      const Cidade = await CidadeService.getAll();
      res.json(Cidade);
    } catch (err) {
      console.error('Erro ao buscar Cidade:', err);
      res.status(500).json({ error: 'Erro ao buscar Cidade' });
    }
  },

  async getById(req, res) {
    try {
      const Cidade = await CidadeService.getById(req.params.Codigo);
      if (!Cidade) {
        return res.status(404).json({ message: 'Cidade não encontrado' });
      }
      res.json(Cidade);
    } catch (err) {
      console.error('Erro ao buscar Cidade:', err);
      res.status(500).json({ error: 'Erro ao buscar Cidade' });
    }
  },

  async create(req, res) {
    try {
      const novo = await CidadeService.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      console.error('Erro ao criar Cidade:', err);
      res.status(500).json({ error: 'Erro ao criar Cidade' });
    }
  },

  async update(req, res) {
    try {
      const atualizado = await CidadeService.update(req.params.Codigo, req.body);
      if (!atualizado) {
        return res.status(404).json({ message: 'Cidade não encontrado' });
      }
      res.json({ message: 'Cidade atualizado com sucesso' });
    } catch (err) {
      console.error('Erro ao atualizar Cidade:', err);
      res.status(500).json({ error: 'Erro ao atualizar Cidade' });
    }
  },

  async delete(req, res) {
    try {
      const deletado = await CidadeService.delete(req.params.Codigo);
      if (!deletado) {
        return res.status(404).json({ message: 'Cidade não encontrado' });
      }
      res.json({ message: 'Cidade deletado com sucesso' });
    } catch (err) {
      console.error('Erro ao deletar Cidade:', err);
      res.status(500).json({ error: 'Erro ao deletar Cidade' });
    }
  }
};

module.exports = CidadeController;