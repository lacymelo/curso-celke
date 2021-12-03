const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const Usuario = require('../models/Usuario');
require('dotenv').config();

module.exports = {
    //verificação do token
    eAdmin: async function validateToken(req, res, next){
        const authHeader = req.headers.authorization;
        const [bearer, token] = authHeader.split(' ');

        if(!token){
            return res.status(400).json({message: 'Necessário enviar token!'});
        }

        try{
            const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
            //atribuido a variável req, disponível em qualquer lugar do projeto
            req.userId = decoded.id;
            return next();
        }catch{
            return res.status(400).json({message: 'token inválido!'});
        }
    },

    //validação do usuário salvo no token
    eUserToken: async function validateUserToken(req, res){

        await Usuario.findByPk(req.userId)
        .then((user) => {
            return res.json({
                user
            });
        }).catch(() => {
            return res.json({
                erro: true,
                message: 'Erro: Necessário realizar login para acessar a página!'
            })
        });
    }
}