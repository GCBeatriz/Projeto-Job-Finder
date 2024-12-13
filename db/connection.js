//tem que chamar o sequelize que é o pacote que instalou que vai fazer as alterações/conexoes com banco
const Sequelize = require('sequelize');

const sequelize = new Sequelize ({
    dialect:  'sqlite', // qual banco vai utilizar
    storage: './db/app.db' //onde ta o banco
});

module.exports = sequelize //arquivo de confiugração de banca // Quando quer utilizar fora do app.js
//agora da pra importar la no app.js como se fosse um pacote do npm e utilizar essa conexao para autenticação