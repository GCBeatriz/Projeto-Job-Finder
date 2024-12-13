const Sequelize = require('sequelize');
const db = require('../db/connection');

//model com o metodo define do sequelize
const Job = db.define('job', {
    title: {
        type: Sequelize.STRING,
        alowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        alowNull: false,
    },
    salary: {
        type: Sequelize.STRING,
        alowNull: false,
    },
    company: {
        type: Sequelize.STRING,
        alowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        alowNull: false,
    },
    new_job: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
    }
    //INTEGER É O NUMERO INTEIRO PARA O BANCO
}); // tem que passarpor meio de objeto js todas as propriedades que o obj possui

module.exports = Job // Podia colocar os models na rota, na conexão mas ficaria bagunçado, entao criou uma pasta
// e definiu o job nele //exportou pra ser utilizado onde preferir