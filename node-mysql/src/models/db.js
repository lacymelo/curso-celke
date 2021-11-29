const Sequelize = require('sequelize');
require('dotenv').config();

//conexão com banco de dados
const sequelize = new Sequelize(process.env.DB, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

// sequelize.authenticate()
// .then(function(){
//     console.log('Conexão com banco realizada!');
// }).catch(function(){
//     console.log('Erro: falha na coneção com banco de dados!');
// });

module.exports = sequelize;

