const Sequelize = require('sequelize');
const connection = require('./database');

const Produtos = connection.define('Produtos',{

    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    price:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    descri:{
        type: Sequelize.STRING,
        allowNull: false
    },
    quantidade:{
        type: Sequelize.STRING,
        allowNull: false
    },
    img:{
        type: Sequelize.STRING,
        allowNull: false
    }
    

});


module.exports = Produtos;

//Produtos.sync({force: false})