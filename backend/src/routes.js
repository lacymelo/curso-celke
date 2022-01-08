const express = require('express');
const UserController = require('./controllers/UserController');
const { eAdmin, eUserToken } = require('./controllers/AuthController');

const routes = new express.Router();

//####### rotas ######
//validar token
routes.get('/valToken', eAdmin, eUserToken);
//lista usuários
routes.get('/users/:page', eAdmin, UserController.listUser);
//cadastra novo usuário
routes.post('/new', eAdmin, UserController.createUser);
//mostra usuário específico
routes.get('/user/:id', eAdmin, UserController.showUser);
//atualiza registro de usuário
routes.put('/user', eAdmin, UserController.updateUser);
//apaga um usuário da base de dados
routes.get('/deleteUser/:id', UserController.deleteUser);
//redefine senha
routes.put('/redefinePassword', eAdmin, UserController.redefinePassword);
//login de usuário
routes.post('/login', UserController.login);
//visualizar perfil do usuário logado
routes.get('/viewProfile', eAdmin, UserController.viewProfile);

module.exports = routes;