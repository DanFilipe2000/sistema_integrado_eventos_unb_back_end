const express = require('express');
const cors = require('cors');
const { initDB } = require('./database/db');
const bodyParser = require('body-parser');

const participantesRoutes = require('./routes/participantes');
const cursoRoutes = require('./routes/curso');
const produtoRoutes = require('./routes/produto'); 
const avaliacaoRoutes = require('./routes/avaliacao');
const categoriaeventoRoutes = require('./routes/categoriaevento');
const cidadeRoutes = require('./routes/cidade');
const tipoingressoRoutes = require('./routes/tipoingresso');
const departamentoRoutes = require('./routes/departamento');
const estadoRoutes = require('./routes/estado');
const enderecoRoutes = require('./routes/endereco');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const eventoRoutes = require('./routes/evento');
const ingressoRoutes = require('./routes/ingresso');
const imageRoutes = require('./routes/image');
const expositorRoutes = require('./routes/expositor');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/login', loginRoutes);
app.use('/register', registerRoutes);
app.use('/participantes', participantesRoutes);
app.use('/curso', cursoRoutes);
app.use('/produto', produtoRoutes); 
app.use('/avaliacao', avaliacaoRoutes);
app.use('/categoriaevento', categoriaeventoRoutes);
app.use('/cidade', cidadeRoutes);
app.use('/tipoingresso', tipoingressoRoutes);
app.use('/departamento', departamentoRoutes);
app.use('/estado', estadoRoutes);
app.use('/endereco', enderecoRoutes)
app.use('/evento', eventoRoutes);
app.use('/expositor', expositorRoutes);
app.use('/ingresso', ingressoRoutes);
app.use('/image', imageRoutes);

var PORT = process.env.API_PORT || 3000;

app.listen(PORT, async () => {
  initDB();
  console.log(`Servidor rodando na porta ${PORT}!`);
});