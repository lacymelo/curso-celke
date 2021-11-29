const express = require('express');
const UserController = require('./controllers/UserController');

const routes = new express.Router();

//####### rotas ######
//lista usuários
routes.get('/users', UserController.listUser);
//cadastra novo usuário
routes.post('/new', UserController.createUser);
//mostra usuário específico
routes.get('/user/:id', UserController.validateToken, UserController.showUser);
//atualiza registro de usuário
routes.put('/user', UserController.validateToken, UserController.updateUser);
//apaga um usuário da base de dados
routes.get('/deleteUser/:id', UserController.deleteUser);
//redefine senha
routes.put('/redefinePassword', UserController.redefinePassword);
//login de usuário
routes.post('/login', UserController.login);

module.exports = routes;