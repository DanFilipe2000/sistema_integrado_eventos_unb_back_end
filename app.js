const express = require('express');
const { initDB } = require('./database/db');
const bodyParser = require('body-parser');
const participantesRoutes = require('./routes/participantes');
const cursoRoutes = require('./routes/curso');

const app = express();
app.use(bodyParser.json());
app.use('/participantes', participantesRoutes);
app.use('/curso', cursoRoutes);

app.listen(3000, async () => {
  initDB();
  console.log('Servidor rodando na porta 3000!');
});