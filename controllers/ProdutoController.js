const ProdutoService = require('../services/ProdutoService');

const ProdutoController = {
  getAll: async (_req, res) => {
    try {
      const produto = await ProdutoService.getAll();
      res.json(produto);
    } catch (err) {
      console.error('Erro ao buscar produto:', err);
      res.status(500).json({ error: 'Erro ao buscar produto' });
    }
  },

  getById: async (req, res) => {
    try {
      const produto = await ProdutoService.getById(req.params.id);
      if (!produto) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      res.json(produto);
    } catch (err) {
      console.error('Erro ao buscar produto:', err);
      res.status(500).json({ error: 'Erro ao buscar produto' });
    }
  },

  create: async (req, res) => {
    try {
      const novo = await ProdutoService.create(req.body);
      res.status(201).json(novo);
    } catch (err) {
      console.error('Erro ao criar produto:', err);
      res.status(500).json({ error: 'Erro ao criar produto' });
    }
  },

  update: async (req, res) => {
    try {
      const atualizado = await ProdutoService.update(req.params.id, req.body);
      if (!atualizado) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      res.json({ message: 'Produto atualizado com sucesso' });
    } catch (err) {
      console.error('Erro ao atualizar produto:', err);
      res.status(500).json({ error: 'Erro ao atualizar produto'});
    }
  },

  delete: async (req, res) => {
    try {
      const deletado = await ProdutoService.delete(req.params.id);
      if (!deletado) {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
      res.json({ message: 'Produto deletado com sucesso' });
    } catch (err) {
      console.error('Erro ao deletar produto:', err);
      res.status(500).json({ error: 'Erro ao deletar produto' });
    }
  }
};

module.exports = ProdutoController;