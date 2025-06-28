const EventoService = require('../services/EventoService');

const EventoController = {
  async getAll(_req, res) {
    try {
        const eventos = await EventoService.getAll();
        res.json(eventos);
    } catch (err) {
        console.error('Erro ao buscar eventos:', err);
        res.status(500).json({ error: 'Erro ao buscar eventos' });
    }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const evento = await EventoService.getById(id);
            if (!evento) {
                return res.status(404).json({ message: 'Evento não encontrado' });
            }
            res.json(evento);
        } catch (err) {
            console.error('Erro ao buscar evento:', err);
            res.status(500).json({ error: 'Erro ao buscar evento' });
        }
    },

    async create(req, res) {
  try {
    const { Titulo, DataInicio, DataFinal, idEndereco } = req.body;

    if (!Titulo || !DataInicio || !DataFinal || !idEndereco) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    const novoEvento = await EventoService.create({ Titulo, DataInicio, DataFinal, idEndereco });
    res.status(201).json(novoEvento);
  } catch (err) {
    console.error('Erro ao criar evento:', err);
    res.status(500).json({ error: 'Erro ao criar evento' });
  }
},

    async update(req, res) {
        try {
            const { id } = req.params;
            const atualizada = await EventoService.update(id, req.body);
            if (!atualizada) {
                return res.status(404).json({ message: 'Evento não encontrado' });
            }
            res.json({ message: 'Evento atualizado com sucesso!' });
        } catch (err) {
            console.error('Erro ao atualizar evento:', err);
            res.status(500).json({ error: 'Erro ao atualizar evento' });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const deletada = await EventoService.delete(id);
            if (!deletada) {
                return res.status(404).json({ message: 'Evento não encontrado' });
            }
            res.json({ message: 'Evento deletado com sucesso' });
        } catch (err) {
            console.error('Erro ao deletar evento:', err);
            res.status(500).json({ error: 'Erro ao deletar evento' });
        }
    }
};
module.exports = EventoController;
