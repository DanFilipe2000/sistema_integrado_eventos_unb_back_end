const DepartamentoService = require('../services/DepartamentoService');

const DepartamentoController = {
  async getAll(_req, res) {
    try {
      const departamento = await DepartamentoService.getAll();
      res.json(departamento);
    } catch (err) {
      console.error('Erro ao buscar departamento:', err);
      res.status(500).json({ error: 'Erro ao buscar departamento' });
    }
  },

  async getById(req, res) {
    try {
      const departamento = await DepartamentoService.getById(req.params.id);
      if (!departamento) {
        return res.status(404).json({ message: 'Departamento não encontrado' });
      }
      res.json(departamento);
    } catch (err) {
      console.error('Erro ao buscar departamento:', err);
      res.status(500).json({ error: 'Erro ao buscar departamento' });
    }
  },
  
  async create(req, res) {
    try {
      const novo = await DepartamentoService.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      console.error('Erro ao criar departamento:', err);
      res.status(500).json({ error: 'Erro ao criar departamento' });
    }
  },

  async update(req, res) {
    try {
      const atualizado = await DepartamentoService.update(req.params.id, req.body);
      if (!atualizado) {
        return res.status(404).json({ message: 'Departamento não encontrado' });
      }
      res.json({ message: 'Departamento atualizado com sucesso!' });
    } catch (err) {
      console.error('Erro ao atualizar departamento:', err);
      res.status(500).json({ error: 'Erro ao atualizar departamento' });
    }
  },

  async delete(req, res) {
    try {
      const deletado = await DepartamentoService.delete(req.params.id);
      if (!deletado) {
        return res.status(404).json({ message: 'Departamento não encontrado' });
      }
      res.json({ message: 'Departamento deletado com sucesso' });
    } catch (err) {
      console.error('Erro ao deletar departamento:', err);
      res.status(500).json({ error: 'Erro ao deletar departamento' });
    }
  }
};

module.exports = DepartamentoController;
