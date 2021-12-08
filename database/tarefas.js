const Sequelize = require('sequelize');
const connection = require('./database');

const Tarefas = connection.define('Tarefas',{

    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    conteudo:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    autor:{
        type: Sequelize.STRING,
        allowNull: false
    }

});


module.exports = Tarefas;

Tarefas.sync({force: false})