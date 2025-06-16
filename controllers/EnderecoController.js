const EnderecoService = require('../services/EnderecoService');

const EnderecoController = {
  async getAll(_req, res) {
    try {
      const enderecos = await EnderecoService.getAll();
      res.json(enderecos);
    } catch (err) {
      console.error('Erro ao buscar endereços:', err);
      res.status(500).json({ error: 'Erro ao buscar endereços' });
    }
  },

  async getById(req, res) {
    try {
      const endereco = await EnderecoService.getById(req.params.id);
      if (!endereco) {
        return res.status(404).json({ message: 'Endereço não encontrado' });
      }
      res.json(endereco);
    } catch (err) {
      console.error('Erro ao buscar endereço:', err);
      res.status(500).json({ error: 'Erro ao buscar endereço' });
    }
  },
  
  async create(req, res) {
    try {
      const novo = await EnderecoService.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      console.error('Erro ao criar endereço:', err);
      res.status(500).json({ error: 'Erro ao criar endereço' });
    }
  },

  async update(req, res) {
    try {
      const atualizado = await EnderecoService.update(req.params.id, req.body);
      if (!atualizado) {
        return res.status(404).json({ message: 'Endereço não encontrado' });
      }
      res.json({ message: 'Endereço atualizado com sucesso!' });
    } catch (err) {
      console.error('Erro ao atualizar endereço:', err);
      res.status(500).json({ error: 'Erro ao atualizar endereço' });
    }
  },

  async delete(req, res) {
    try {
      const deletado = await EnderecoService.delete(req.params.id);
      if (!deletado) {
        return res.status(404).json({ message: 'Endereço não encontrado' });
      }
      res.json({ message: 'Endereço deletado com sucesso' });
    } catch (err) {
      console.error('Erro ao deletar endereço:', err);
      res.status(500).json({ error: 'Erro ao deletar endereço' });
    }
  }
};

module.exports = EnderecoController;
