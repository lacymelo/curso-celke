const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = {

    //lista todos os usuários
    async listUser(req, res){
        const users = await Usuario.findAll({
            order: [['id', 'desc']],
            attributes: ['id', 'nome', 'email', 'senha']
        });

        return res.json(users);
    },

    //mostra um usuário específico
    async showUser(req, res){
        const { id } = req.params;

        const user = await Usuario.findByPk(id);

        return res.json(user);
    },

    //cadastro de usuário
    async createUser(req, res){
        var data = req.body;

        //criptografia da senha, com nível de força 8
        data.senha = await bcrypt.hash(data.senha, 8);

        await Usuario.create(data).then(() => {
            return res.json({message: 'Success'});
        }).catch(() => {
            return res.json({message: 'Error'});
        });
    },

    //atualização de usuário
    async updateUser(req, res){
        const { id } = req.body;

        await Usuario.update(req.body, { where: {id}})
        .then(() => {
            return res.json({message: 'Success'});
        }).catch(() => {
            return res.json({message: 'Error'});
        });
    },

    //deleta usuário
    async deleteUser(req, res){
        const { id } = req.params;

        await Usuario.destroy({ where: {id}})
        .then(() => {
            return res.json({message: 'Success'});
        }).catch(() => {
            return res.json({message: 'Error'});
        });
    },

    //redefine senha
    async redefinePassword(req, res){
        const { id, senha } = req.body;

        var senhaCrypt = await bcrypt.hash(senha, 8);

        await Usuario.update({senha: senhaCrypt}, {where: {id}})
        .then(() => {
            return res.json({message: 'Success'});
        }).catch(() => {
            return res.json({message: 'Error'});
        });
    },
    
    //login do usuário
    async login(req, res){
        
        const user = await Usuario.findOne({where: {email: req.body.email}});

        if(user === null){
            return res.status(400).json({message: 'Email não cadastrado!'});
        }

        if(!(await bcrypt.compare(req.body.senha, user.senha))){
            return res.json({message: 'senha inválida'});
        }

        var token = jwt.sign({id: user.id}, process.env.SECRET, {
            // expiresIn: 600 10min
            expiresIn: '7d'// 7 dias
        });

        return res.json({
            message: 'Login realizado com sucesso!',
            user: user,
            token: token
        });
    },
};
