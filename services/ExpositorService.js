const Expositor = require('../models/Expositor');
const { connection } = require('../database/db');

const ExpositorModel = new Expositor(connection);

const ExpositorService = {
    async getAll() {
        return await ExpositorModel.getAll();
    },

    async getByEmail(email) {
        return await ExpositorModel.getByEmail(email);
    },

    async create(data) {
        return await ExpositorModel.create(data);
    },
};

module.exports = ExpositorService;