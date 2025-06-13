const ParticipantesService = require('../services/ParticipantesService');

const ParticipantesController = {
  async getAll(_req, res) {
    try {
      const participantes = await ParticipantesService.getAll();
      res.json(participantes);
    } catch (err) {
      console.error('Erro ao buscar participantes:', err);
      res.status(500).json({ error: 'Erro ao buscar participantes' });
    }
  },

  async getById(req, res) {
    try {
      const participante = await ParticipantesService.getById(req.params.matricula);
      if (!participante) {
        return res.status(404).json({ message: 'Participante não encontrado' });
      }
      res.json(participante);
    } catch (err) {
      console.error('Erro ao buscar participante:', err);
      res.status(500).json({ error: 'Erro ao buscar participante' });
    }
  },

  async create(req, res) {
    try {
      const novo = await ParticipantesService.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      console.error('Erro ao criar participante:', err);
      res.status(500).json({ error: 'Erro ao criar participante' });
    }
  },

  async update(req, res) {
    try {
      const atualizado = await ParticipantesService.update(req.params.matricula, req.body);
      if (!atualizado) {
        return res.status(404).json({ message: 'Participante não encontrado' });
      }
      res.json({ message: 'Participante atualizado com sucesso' });
    } catch (err) {
      console.error('Erro ao atualizar participante:', err);
      res.status(500).json({ error: 'Erro ao atualizar participante' });
    }
  },

  async delete(req, res) {
    try {
      const deletado = await ParticipantesService.delete(req.params.matricula);
      if (!deletado) {
        return res.status(404).json({ message: 'Participante não encontrado' });
      }
      res.json({ message: 'Participante deletado com sucesso' });
    } catch (err) {
      console.error('Erro ao deletar participante:', err);
      res.status(500).json({ error: 'Erro ao deletar participante' });
    }
  }
};

module.exports = ParticipantesController;