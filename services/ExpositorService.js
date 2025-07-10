const Expositor = require('../models/Expositor');
const { connection } = require('../database/connection');
const path = require('path');
const fs = require('fs').promises;

const ExpositorModel = new Expositor(connection);

// Função utilitária para converter a imagem em base64
async function converterImagemParaBase64(caminhoRelativo) {
  if (!caminhoRelativo) return null;

  try {
    const nomeArquivo = path.basename(caminhoRelativo.replace(/\\/g, '/'));
    const caminhoCompleto = path.join(__dirname, '../images/profile', nomeArquivo);
    const buffer = await fs.readFile(caminhoCompleto);
    const extensao = path.extname(nomeArquivo).substring(1);
    return `data:image/${extensao};base64,${buffer.toString('base64')}`;
  } catch (err) {
    console.warn(`Erro ao converter imagem: ${caminhoRelativo}`, err.message);
    return null;
  }
}

const ExpositorService = {
  async getAll() {
    const expositores = await ExpositorModel.getAll();

    for (const e of expositores) {
      e.FotoBase64 = await converterImagemParaBase64(e.CaminhoFoto);
    }

    return expositores;
  },

  async getByEmail(email) {
    const expositor = await ExpositorModel.getByEmail(email);
    if (expositor) {
      expositor.FotoBase64 = await converterImagemParaBase64(expositor.CaminhoFoto);
    }
    return expositor;
  },

  async create(data) {
    return await ExpositorModel.create(data);
  }
};

module.exports = ExpositorService;