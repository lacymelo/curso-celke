const express = require('express');

const app = express();

app.use(express.json());

app.use(require('./routes'));

//ouvindo a porta no navegador
app.listen(3333);