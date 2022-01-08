const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const yup = require('yup');
const {Op} = require('sequelize');
require('dotenv').config();

module.exports = {

    //lista todos os usuários
    async listUser(req, res){
        let {page = 1} = req.params;
        const limit = 2;
        let lastPage = 1;

        const countUser = await Usuario.count();

        if(countUser === null){
            return res.status(400).json({
                erro: true,
                message: 'Erro: Nenhum usuário encontrado!'
            });
        }else{
            lastPage = Math.ceil(countUser / limit);
        }

        await Usuario.findAll({
            attributes: ['id', 'nome', 'email'],
            order: [['id', 'desc']],
            offset: Number((page * limit) - limit),
            limit: limit
        })
        .then((users) => {
            return res.json({
                error: false,
                users,
                countUser,
                lastPage
            });
        }).catch(() => {
            return res.status(400).json({
                error: true,
                message: 'Error: Tente mais tarde!'
            });
        });
    },

    //mostra um usuário específico
    async showUser(req, res){
        const { id } = req.params;

        const user = await Usuario.findByPk(id);

        return res.json(user);
    },

    //ver perfil
    async viewProfile(req, res){
        const id = req.userId;

        const user = await Usuario.findByPk(id);

        return res.json(user);
    },

    //cadastro de usuário
    async createUser(req, res){
        let {nome, email, senha} = req.body;

        const user = await Usuario.findOne({where: {email}});

        if(user){
            return res.status(400).json({
                type: 'error',
                message: 'Error: email já cadastrado!'
            });
        }

        const schema = yup.object().shape({
            nome: yup.string().required('Campo nome obrigatório!'),
            email: yup.string().required('Campo email obrigatório!'),
            senha: yup.string().required('Campo senha obrigatório')
            .min(6, 'A senha deve ter no mínimo 6 caracteres!'),
        });

        try{
            await schema.validate({
                nome,
                email,
                senha
            });
        }catch(err){
            return res.status(400).json({
                error: true,
                message: err.errors
            });
        }

        //criptografia da senha, com nível de força 8
        const senhaCrypt = await bcrypt.hash(senha, 8);

        await Usuario.create({
            nome,
            email,
            senha: senhaCrypt
        }).then(() => {
            return res.json({error: false, message: 'Usuário criado com sucesso!'});
        }).catch(() => {
            return res.json({error: true, message: 'Error: tente mais tarde!'});
        });
    },

    //atualização de usuário
    async updateUser(req, res){
        const { id, nome, email } = req.body;

        const user = await Usuario.findOne({
            where: {email},
            id: {
                [Op.ne]: id
            }
        });

        if(user){
            return res.status(400).json({
                type: 'error',
                message: 'Error: email já cadastrado!'
            });
        }

        const schema = yup.object().shape({
            nome: yup.string().required('Campo nome obrigatório!'),
            email: yup.string().email().required('Campo email obrigatório!'),
        });

        try{
            await schema.validate(req.body);
        }catch(err){
            return res.status(400).json({
                error: true,
                message: err.errors
            });
        }

        await Usuario.update(req.body, { where: {id}})
        .then(() => {
            return res.json({error: false, message: 'Usuário atualizado!'});
        }).catch(() => {
            return res.json({error: true, message: 'Error: tente mais tarde!'});
        });
    },

    //deleta usuário
    async deleteUser(req, res){
        const { id } = req.params;

        await Usuario.destroy({ where: {id}})
        .then(() => {
            return res.json({message: 'Usuário deletado com sucesso!'});
        }).catch(() => {
            return res.json({message: 'Error'});
        });
    },

    //redefine senha
    async redefinePassword(req, res){
        const { id, senha } = req.body;

        const schema = yup.object().shape({
            senha: yup.string().required('Campo senha obrigatório')
            .min(6, 'A senha deve ter no mínimo 6 caracteres!'),
        });

        try{
            await schema.validate(req.body);
        }catch(err){
            return res.status(400).json({
                error: true,
                message: err.errors
            });
        }

        var senhaCrypt = await bcrypt.hash(senha, 8);

        await Usuario.update({senha: senhaCrypt}, {where: {id}})
        .then(() => {
            return res.json({error: false, message: 'Senha redefinida'});
        }).catch(() => {
            return res.json({error: true, message: 'Error: tente mais tarde!'});
        });
    },
    
    //login do usuário
    async login(req, res){

        const schema = yup.object().shape({
            email: yup.string().email().required('Campo email obrigatório!'),
            senha: yup.string().required('Campo senha obrigatório')
            .min(6, 'A senha deve ter no mínimo 6 caracteres!'),
        });

        try{
            await schema.validate(req.body);
        }catch(err){
            return res.status(400).json({
                error: true,
                message: err.errors
            });
        }
        
        const user = await Usuario.findOne({where: {email: req.body.email}});

        if(!user){
            return res.status(400).json({message: 'Email não cadastrado!'});
        }

        if(!(await bcrypt.compare(req.body.senha, user.senha))){
            return res.json({message: 'senha inválida'});
        }

        var token = jwt.sign({id: user.id}, process.env.SECRET, {
            // expiresIn: 600 10min
            expiresIn: 1800 // 30 min
        });

        return res.json({
            message: 'Login realizado com sucesso!',
            user: user,
            token: token
        });
    },
};
