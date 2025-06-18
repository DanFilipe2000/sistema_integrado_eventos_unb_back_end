const EstadoService = require('../services/EstadoService');

const EstadoController = {
  async getAll(_req, res) {
    try {
      const estados = await EstadoService.getAll();
      res.json(estados);
    } catch (err) {
      console.error('Erro ao buscar estados:', err);
      res.status(500).json({ error: 'Erro ao buscar estados' });
    }
  },

  async getById(req, res) {
    try {
      const { sigla } = req.params;
      const estado = await EstadoService.getById(sigla);
      if (!estado) {
        return res.status(404).json({ message: 'Estado não encontrado' });
      }
      res.json(estado);
    } catch (err) {
      console.error('Erro ao buscar estado:', err);
      res.status(500).json({ error: 'Erro ao buscar estado' });
    }
  },
  
  async create(req, res) {
    try {
      const novoEstado = await EstadoService.create(req.body);
      res.status(201).json(novoEstado);
    } catch (err) {
      console.error('Erro ao criar estado:', err);
      res.status(500).json({ error: 'Erro ao criar estado' });
    }
  },

  async update(req, res) {
    try {
      const { sigla } = req.params;
      const atualizada = await EstadoService.update(sigla, req.body);
      if (!atualizada) {
        return res.status(404).json({ message: 'Estado não encontrado' });
      }
      res.json({ message: 'Estado atualizado com sucesso!' });
    } catch (err) {
      console.error('Erro ao atualizar estado:', err);
      res.status(500).json({ error: 'Erro ao atualizar estado' });
    }
  },

async delete(req, res) {
  try {
    const sigla = req.params.Sigla;
    const deletada = await EstadoService.delete(sigla);
    if (!deletada) {
      return res.status(404).json({ message: 'Estado não encontrado' });
    }
    res.json({ message: 'Estado deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar estado:', err);
    res.status(500).json({ error: 'Erro ao deletar estado' });
  }
}
};

module.exports = EstadoController;
