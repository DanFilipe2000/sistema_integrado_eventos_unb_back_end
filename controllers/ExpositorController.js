const ExpositorService = require('../services/ExpositorService');

const ExpositorController = {
    async getAll(_req, res) {
        try {
            const eventos = await ExpositorService.getAll();
            res.json(eventos);
        } catch (err) {
            console.error('Erro ao buscar expositores:', err);
            res.status(500).json({ error: 'Erro ao buscar expositores' });
        }
    },
};

module.exports = ExpositorController;