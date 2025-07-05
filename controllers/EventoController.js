const EventoService = require('../services/EventoService');
const EnderecoService = require('../services/EnderecoService');

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
            const { evento, endereco, categorias, expositores } = req.body;

            var result_endereco;
            var result_evento;

            if (endereco) {
                result_endereco = await EnderecoService.create({
                    Logradouro: endereco.logradouro,
                    Bairro: endereco.bairro,
                    Numero: endereco.numero,
                    CEP: endereco.cep,
                    idCidade: endereco.cidade_id
                });
            }

            if (evento) {
                result_evento = await EventoService.create({
                    Titulo: evento.titulo,
                    DataInicio: evento.data_inicio,
                    DataFinal: evento.data_termino,
                    idEndereco: result_endereco.Codigo,
                    CaminhoFoto: evento.imagem,
                    CriadoPor: evento.criadoPor
                }, categorias, expositores)
            }

            

            res.status(201).json(result_evento);
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
