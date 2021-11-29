const express = require('express');
const cors = require('cors');

const app = express();

//permissão para quais tipos de aplicação podem acessar a API
app.use((req, res, next) => {
    //acesso a todos
    res.header('Access-Control-Allow-Origin', '*');
    //tipos de requisições permitidas
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    // para conteúdos vindos do formulário
    res.header('Access-Control-Allow-Headers', 'Content-type, Authorization');

    app.use(cors());
    next();
});

//envia de requisições do tipo json
app.use(express.json());

//
app.use(require('./routes'));

//ouvindo a porta no navegador
app.listen(3333);