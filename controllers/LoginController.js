const ParticipantesService = require('../services/ParticipantesService');
const ExpositoresService = require('../services/ExpositorService');

const LoginController = {
    async verifyCredentials(req, res) {
        if (req.body.type_user == 'participante') {
            try {
                const login = await ParticipantesService.getByEmail(req.body.email);

                if (!login) {
                    return res.status(404).json({ error: 'Email não encontrado' });
                }

                if (login.Password !== req.body.password) {
                    return res.status(401).json({ error: 'Senha incorreta' });
                }

                res.status(200).json(login);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        } else {
            try {
                const login = await ExpositoresService.getByEmail(req.body.email);

                if (!login) {
                    return res.status(404).json({ error: 'Email não encontrado' });
                }

                if (login.Password !== req.body.password) {
                    return res.status(401).json({ error: 'Senha incorreta' });
                }

                res.status(200).json(login);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
    },
};

module.exports = LoginController;