const ParticipantesService = require('../services/ParticipantesService');
const ExpositoresService = require('../services/ExpositorService');

const RegisterController = {
    async register(req, res) {
        const foto_b64 = req.file ? req.file.buffer.toString('base64') : null;

        if (foto_b64) req.body.Foto_b64 = foto_b64;

        try {
            if (req.body.type_user === 'participante') {
                const existingUser = await ParticipantesService.getByEmail(req.body.Email);
                if (existingUser) {
                    return res.status(200).json({ error: 'Email já cadastrado' });
                }
                const newUser = await ParticipantesService.create(req.body);
                res.status(201).json(newUser);
            } else if (req.body.type_user === 'expositor') {
                const existingUser = await ExpositoresService.getByEmail(req.body.Email);
                if (existingUser) {
                    return res.status(200).json({ error: 'Email já cadastrado' });
                }
                const newUser = await ExpositoresService.create(req.body);
                res.status(201).json(newUser);
            } else {
                res.status(400).json({ error: 'Tipo de usuário inválido' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = RegisterController;