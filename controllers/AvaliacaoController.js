const AvaliacaoService = require('../services/AvaliacaoService');

const AvaliacaoController = {
  async getAll(_req, res) {
    try {
      const avaliacoes = await AvaliacaoService.getAll();
      res.json(avaliacoes);
    } catch (err) {
      console.error('Erro ao buscar avaliações:', err);
      res.status(500).json({ error: 'Erro ao buscar avaliações' });
    }
  },

  async getById(req, res) {
    try {
      const { idParticipante, idEvento } = req.params;
      const avaliacao = await AvaliacaoService.getById(idParticipante, idEvento);
      if (!avaliacao) {
        return res.status(404).json({ message: 'Avaliação não encontrada' });
      }
      res.json(avaliacao);
    } catch (err) {
      console.error('Erro ao buscar avaliação:', err);
      res.status(500).json({ error: 'Erro ao buscar avaliação' });
    }
  },

  async create(req, res) {
    try {
      const novaAvaliacao = await AvaliacaoService.create(req.body);
      res.status(201).json(novaAvaliacao);
    } catch (err) {
      console.error('Erro ao criar avaliação:', err);
      res.status(500).json({ error: 'Erro ao criar avaliação' });
    }
  },

  async update(req, res) {
    try {
      const { idParticipante, idEvento } = req.params;
      const atualizado = await AvaliacaoService.update(idParticipante, idEvento, req.body);
      if (!atualizado) {
        return res.status(404).json({ message: 'Avaliação não encontrada' });
      }
      res.json({ message: 'Avaliação atualizada com sucesso', avaliacao: atualizado });
    } catch (err) {
      console.error('Erro ao atualizar avaliação:', err);
      res.status(500).json({ error: 'Erro ao atualizar avaliação' });
    }
  },

  async delete(req, res) {
    try {
      const { idParticipante, idEvento } = req.params;
      const deletado = await AvaliacaoService.delete(idParticipante, idEvento);
      if (!deletado) {
        return res.status(404).json({ message: 'Avaliação não encontrada' });
      }
      res.json({ message: 'Avaliação deletada com sucesso' });
    } catch (err) {
      console.error('Erro ao deletar avaliação:', err);
      res.status(500).json({ error: 'Erro ao deletar avaliação' });
    }
  }
};

module.exports = AvaliacaoController;