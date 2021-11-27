const express = require('express');
const UserController = require('./controllers/UserController');

const routes = new express.Router();

//####### rotas ######
//lista
routes.get('/users', UserController.listUser);
//cadastra
routes.post('/new', UserController.createUser);
//edita
routes.get('/user/:id', UserController.showUser);
//atualiza
routes.put('/user', UserController.updateUser);
//apagar
routes.get('/deleteUser/:id', UserController.deleteUser);

module.exports = routes;