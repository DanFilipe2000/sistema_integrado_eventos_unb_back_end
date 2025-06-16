const TipoingressoService = require('../services/TipoingressoService');

const TipoingressoController = {
  async getAll(_req, res) {
    try {
      const Tipoingresso = await TipoingressoService.getAll();
      res.json(Tipoingresso);
    } catch (err) {
      console.error('Erro ao buscar Tipoingresso:', err);
      res.status(500).json({ error: 'Erro ao buscar Tipoingresso' });
    }
  },

  async getById(req, res) {
    try {
      const Tipoingresso = await TipoingressoService.getById(req.params.Codigo);
      if (!Tipoingresso) {
        return res.status(404).json({ message: 'Tipoingresso não encontrado' });
      }
      res.json(Tipoingresso);
    } catch (err) {
      console.error('Erro ao buscar Tipoingresso:', err);
      res.status(500).json({ error: 'Erro ao buscar Tipoingresso' });
    }
  },

  async create(req, res) {
    try {
      const novo = await TipoingressoService.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      console.error('Erro ao criar Tipoingresso:', err);
      res.status(500).json({ error: 'Erro ao criar Tipoingresso' });
    }
  },

  async update(req, res) {
    try {
      const atualizado = await TipoingressoService.update(req.params.Codigo, req.body);
      if (!atualizado) {
        return res.status(404).json({ message: 'Tipoingresso não encontrado' });
      }
      res.json({ message: 'Tipoingresso atualizado com sucesso' });
    } catch (err) {
      console.error('Erro ao atualizar Tipoingresso:', err);
      res.status(500).json({ error: 'Erro ao atualizar Tipoingresso' });
    }
  },

  async delete(req, res) {
    try {
      const deletado = await TipoingressoService.delete(req.params.Codigo);
      if (!deletado) {
        return res.status(404).json({ message: 'Tipoingresso não encontrado' });
      }
      res.json({ message: 'Tipoingresso deletado com sucesso' });
    } catch (err) {
      console.error('Erro ao deletar Tipoingresso:', err);
      res.status(500).json({ error: 'Erro ao deletar Tipoingresso' });
    }
  }
};

module.exports = TipoingressoController;