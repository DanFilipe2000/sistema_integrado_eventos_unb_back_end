const path = require('path');
const fs = require('fs').promises;
const Evento = require('../models/Evento');
const RelEventoCategoria = require('../models/RelEventoCategoria');
const RelEventoExpositor = require('../models/RelEventoExpositor');
const { connection } = require('../database/connection');
const EventoModel = new Evento(connection);
const RelEventoCategoriaModel = new RelEventoCategoria(connection);
const RelEventoExpositorModel = new RelEventoExpositor(connection);

async function converterImagemParaBase64(caminhoRelativo) {
  if (!caminhoRelativo) return null;

  try {
    const nomeArquivo = path.basename(caminhoRelativo.replace(/\\/g, '/'));

    const caminhoCompleto = path.join(__dirname, '../images/event', nomeArquivo);
    const buffer = await fs.readFile(caminhoCompleto);
    const extensao = path.extname(nomeArquivo).substring(1);
    return `data:image/${extensao};base64,${buffer.toString('base64')}`;
  } catch (err) {
    console.warn(`Erro ao converter imagem: ${caminhoRelativo}`, err.message);
    return null;
  }
}

const EventoService = {
  async getAll() {
    const eventos = await EventoModel.getAll();

    for (const evento of eventos) {
      evento.FotoBase64 = await converterImagemParaBase64(evento.CaminhoFoto);
    }

    return eventos;
  },

  async getById(id) {
    const evento = await EventoModel.getById(id);

    if (evento) {
      evento.CaminhoFotoBase64 = await converterImagemParaBase64(evento.CaminhoFoto);
    }

    const expositores = await RelEventoExpositorModel.getExpositoresByEvento({ idEvento: evento.Codigo });

    if (expositores) {
      evento.expositores = expositores;
    }

    return evento;
  },

  async create(data, categorias, expositores) {
    const { Titulo, DataInicio, DataFinal, idEndereco, CaminhoFoto, CriadoPor } = data;
    if (!Titulo || !DataInicio || !DataFinal || !idEndereco) {
      throw new Error('Título, datas e endereço são obrigatórios');
    }

    const eventoCriado = await EventoModel.create({ Titulo, DataInicio, DataFinal, idEndereco, CaminhoFoto, CriadoPor });

    const idEvento = eventoCriado.Codigo;

    if (Array.isArray(categorias)) {
      for (const idCategoria of categorias) {
        await RelEventoCategoriaModel.create({ idEvento, idCategoria });
      }
    }

    if (Array.isArray(expositores)) {
      for (const idExpositor of expositores) {
        await RelEventoExpositorModel.create({ idEvento, idExpositor });
      }
    }

    return eventoCriado;
  },

  async update(id, data) {
    const evento = await EventoModel.getById(id);
    if (!evento) return null;
    return await EventoModel.update(id, data);
  },

  async delete(id) {
    const evento = await EventoModel.getById(id);
    if (!evento) return null;
    return await EventoModel.delete(id);
  }
};

module.exports = EventoService;