const CidadeService = require('../services/CidadeService');

const CidadeController = {
  async getAll(_req, res) {
    try {
      const cidades = await CidadeService.getAll();
      res.json(cidades);
    } catch (err) {
      console.error('Erro ao buscar cidades:', err);
      res.status(500).json({ error: 'Erro ao buscar cidades' });
    }
  },

  async getById(req, res) {
    try {
      const cidade = await CidadeService.getById(req.params.id);
      if (!cidade) {
        return res.status(404).json({ message: 'Cidade não encontrada' });
      }
      res.json(cidade);
    } catch (err) {
      console.error('Erro ao buscar cidade:', err);
      res.status(500).json({ error: 'Erro ao buscar cidade' });
    }
  },

  async create(req, res) {
    try {
      const novaCidade = await CidadeService.create(req.body);
      res.status(201).json(novaCidade);
    } catch (err) {
      console.error('Erro ao criar cidade:', err);
      res.status(500).json({ error: 'Erro ao criar cidade' });
    }
  },

  async update(req, res) {
    try {
      const cidadeAtualizada = await CidadeService.update(req.params.id, req.body);
      if (!cidadeAtualizada) {
        return res.status(404).json({ message: 'Cidade não encontrada' });
      }
      res.json({ message: 'Cidade atualizada com sucesso' });
    } catch (err) {
      console.error('Erro ao atualizar cidade:', err);
      res.status(500).json({ error: 'Erro ao atualizar cidade' });
    }
  },

  async delete(req, res) {
    try {
      const cidadeDeletada = await CidadeService.delete(req.params.id);
      if (!cidadeDeletada) {
        return res.status(404).json({ message: 'Cidade não encontrada' });
      }
      res.json({ message: 'Cidade deletada com sucesso' });
    } catch (err) {
      console.error('Erro ao deletar cidade:', err);
      res.status(500).json({ error: 'Erro ao deletar cidade' });
    }
  }
};

module.exports = CidadeController;