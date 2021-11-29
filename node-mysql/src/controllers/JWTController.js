const jwt = require('jsonwebtoken');
const { promisify } = require('util');
require('dotenv').config();

module.exports = {
    //validação de token
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
    }
}