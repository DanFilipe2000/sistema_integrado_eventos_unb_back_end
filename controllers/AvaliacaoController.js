const AvaliacaoService = require('../services/AvaliacaoService');

const AvaliacaoController = {
  async getAll(_req, res) {
    try {
      const Avaliacao = await AvaliacaoService.getAll();
      res.json(Avaliacao);
    } catch (err) {
      console.error('Erro ao buscar Avaliacao:', err);
      res.status(500).json({ error: 'Erro ao buscar Avaliacao' });
    }
  },

  async getById(req, res) {
    try {
      const avaliacao = await AvaliacaoService.getById(req.params.idParticipante);
      if (!avaliacao) {
        return res.status(404).json({ message: 'avaliacao não encontrado' });
      }
      res.json(avaliacao);
    } catch (err) {
      console.error('Erro ao buscar avaliacao:', err);
      res.status(500).json({ error: 'Erro ao buscar avaliacao' });
    }
  },

  async create(req, res) {
    try {
      const novo = await AvaliacaoService.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      console.error('Erro ao criar avaliacao:', err);
      res.status(500).json({ error: 'Erro ao criar avaliacao' });
    }
  },

  async update(req, res) {
    try {
      const atualizado = await AvaliacaoService.update(req.params.idParticipante, req.body);
      if (!atualizado) {
        return res.status(404).json({ message: 'avaliacao não encontrado' });
      }
      res.json({ message: 'avaliacao atualizado com sucesso' });
    } catch (err) {
      console.error('Erro ao atualizar avaliacao:', err);
      res.status(500).json({ error: 'Erro ao atualizar avaliacao' });
    }
  },

  async delete(req, res) {
    try {
      const deletado = await AvaliacaoService.delete(req.params.idParticipante);
      if (!deletado) {
        return res.status(404).json({ message: 'avaliacao não encontrado' });
      }
      res.json({ message: 'avaliacao deletado com sucesso' });
    } catch (err) {
      console.error('Erro ao deletar avaliacao:', err);
      res.status(500).json({ error: 'Erro ao deletar avaliacao' });
    }
  }
};

module.exports = AvaliacaoController;