const Sequelize = require('sequelize');

//conexão com banco de dados
const sequelize = new Sequelize('celke', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// sequelize.authenticate()
// .then(function(){
//     console.log('Conexão com banco realizada!');
// }).catch(function(){
//     console.log('Erro: falha na coneção com banco de dados!');
// });

module.exports = sequelize;

