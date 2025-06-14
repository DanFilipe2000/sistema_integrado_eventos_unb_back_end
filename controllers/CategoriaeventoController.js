const CategoriaeventoService = require('../services/CategoriaeventoService');

const CategoriaeventoController = {
  async getAll(_req, res) {
    try {
      const Categoriaevento = await CategoriaeventoService.getAll();
      res.json(Categoriaevento);
    } catch (err) {
      console.error('Erro ao buscar Categoriaevento:', err);
      res.status(500).json({ error: 'Erro ao buscar Categoriaevento' });
    }
  },

  async getById(req, res) {
    try {
      const Categoriaevento = await CategoriaeventoService.getById(req.params.Codigo);
      if (!Categoriaevento) {
        return res.status(404).json({ message: 'Categoriaevento não encontrado' });
      }
      res.json(Categoriaevento);
    } catch (err) {
      console.error('Erro ao buscar Categoriaevento:', err);
      res.status(500).json({ error: 'Erro ao buscar Categoriaevento' });
    }
  },

  async create(req, res) {
    try {
      const novo = await CategoriaeventoService.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      console.error('Erro ao criar Categoriaevento:', err);
      res.status(500).json({ error: 'Erro ao criar Categoriaevento' });
    }
  },

  async update(req, res) {
    try {
      const atualizado = await CategoriaeventoService.update(req.params.Codigo, req.body);
      if (!atualizado) {
        return res.status(404).json({ message: 'Categoriaevento não encontrado' });
      }
      res.json({ message: 'Categoriaevento atualizado com sucesso' });
    } catch (err) {
      console.error('Erro ao atualizar Categoriaevento:', err);
      res.status(500).json({ error: 'Erro ao atualizar Categoriaevento' });
    }
  },

  async delete(req, res) {
    try {
      const deletado = await CategoriaeventoService.delete(req.params.Codigo);
      if (!deletado) {
        return res.status(404).json({ message: 'Categoriaevento não encontrado' });
      }
      res.json({ message: 'Categoriaevento deletado com sucesso' });
    } catch (err) {
      console.error('Erro ao deletar Categoriaevento:', err);
      res.status(500).json({ error: 'Erro ao deletar Categoriaevento' });
    }
  }
};

module.exports = CategoriaeventoController;