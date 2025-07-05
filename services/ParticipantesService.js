const path = require('path');
const fs = require('fs').promises;
const Participantes = require('../models/Participantes');
const { connection } = require('../database/db');

const ParticipantesModel = new Participantes(connection);

async function converterImagemParaBase64(caminhoRelativo) {
  if (!caminhoRelativo) return null;

  try {
    // Substitui \\ por / e pega apenas o nome do arquivo
    const nomeArquivo = path.basename(caminhoRelativo.replace(/\\/g, '/'));

    const caminhoCompleto = path.join(__dirname, '../images/profile', nomeArquivo);
    const buffer = await fs.readFile(caminhoCompleto);
    const extensao = path.extname(nomeArquivo).substring(1); // ex: jpg
    return `data:image/${extensao};base64,${buffer.toString('base64')}`;
  } catch (err) {
    console.warn(`Erro ao converter imagem: ${caminhoRelativo}`, err.message);
    return null;
  }
}

const ParticipantesService = {
  async getAll() {
    const participantes = await ParticipantesModel.getAll();

    // Converte fotos para base64
    for (const p of participantes) {
      p.FotoBase64 = await converterImagemParaBase64(p.CaminhoFoto);
    }

    return participantes;
  },

  async getByEmail(email) {
    const participante = await ParticipantesModel.getByEmail(email);
    if (participante) {
      participante.FotoBase64 = await converterImagemParaBase64(participante.CaminhoFoto);
    }
    return participante;
  },

  async getById(matricula) {
    const participante = await ParticipantesModel.getById(matricula);
    if (participante) {
      participante.FotoBase64 = await converterImagemParaBase64(participante.CaminhoFoto);
    }
    return participante;
  },

  async create(data) {
    if (!data.CPF || !data.Nome) {
      throw new Error('CPF e Nome são obrigatórios');
    }
    return await ParticipantesModel.create(data);
  },

  async update(matricula, data) {
    const participante = await ParticipantesModel.getById(matricula);
    if (!participante) return null;
    return await ParticipantesModel.update(matricula, data);
  },

  async delete(matricula) {
    const participante = await ParticipantesModel.getById(matricula);
    if (!participante) return null;
    return await ParticipantesModel.delete(matricula);
  }
};

module.exports = ParticipantesService;