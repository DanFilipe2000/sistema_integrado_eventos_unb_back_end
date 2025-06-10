const express = require('express');
const { initDB } = require('./database/db');
const bodyParser = require('body-parser');
const participantesRoutes = require('./routes/participantes');

const app = express();
app.use(bodyParser.json());
app.use('/participantes', participantesRoutes);

app.listen(3000, async () => {
  initDB();
  console.log('Servidor rodando na porta 3000!');
});