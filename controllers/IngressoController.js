const IngressoService = require('../services/IngressoService');

const IngressoController = {
  async getAll(_req, res) {
    try {
      const ingressos = await IngressoService.getAll();
      res.json(ingressos);
    } catch (err) {
      console.error('Erro ao buscar ingressos:', err);
      res.status(500).json({ error: 'Erro ao buscar ingressos.' });
    }
  },

  async getByIds(req, res) {
    try {
      const { idParticipante, idEvento, idTipoIngresso } = req.params;

      const ingresso = await IngressoService.getByIds({
        idParticipante: Number(idParticipante),
        idEvento: Number(idEvento),
        idTipoIngresso: Number(idTipoIngresso),
      });

      if (!ingresso) {
        return res.status(404).json({ message: 'Ingresso não encontrado.' });
      }

      res.json(ingresso);
    } catch (err) {
      console.error('Erro ao buscar ingresso:', err);
      res.status(500).json({ error: 'Erro ao buscar ingresso.' });
    }
  },

  async create(req, res) {
    try {
      const novoIngresso = await IngressoService.create(req.body);
      res.status(201).json(novoIngresso);
    } catch (err) {
      console.error('Erro ao criar ingresso:', err);
      res.status(500).json({ error: 'Erro ao criar ingresso.' });
    }
  },

  async update(req, res) {
    try {
      const { idParticipante, idEvento, idTipoIngresso } = req.params;

      const atualizado = await IngressoService.update(
        {
          idParticipante: Number(idParticipante),
          idEvento: Number(idEvento),
          idTipoIngresso: Number(idTipoIngresso)
        },
        req.body
      );

      if (!atualizado) {
        return res.status(404).json({ message: 'Ingresso não encontrado.' });
      }

      res.json({ message: 'Ingresso atualizado com sucesso.' });
    } catch (err) {
      console.error('Erro ao atualizar ingresso:', err);
      res.status(500).json({ error: 'Erro ao atualizar ingresso.' });
    }
  },

  async delete(req, res) {
    try {
      const { idParticipante, idEvento } = req.params;

      const deletado = await IngressoService.delete({
        idParticipante: idParticipante,
        idEvento: idEvento,
      });

      if (!deletado) {
        return res.status(404).json({ message: 'Ingresso não encontrado.' });
      }

      res.json({ message: 'Ingresso deletado com sucesso.' });
    } catch (err) {
      console.error('Erro ao deletar ingresso:', err);
      res.status(500).json({ error: 'Erro ao deletar ingresso.' });
    }
  }
};

module.exports = IngressoController;
