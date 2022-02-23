const Sequelize = require('sequelize');
const connection = new Sequelize('Produto','root','2254',{
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connection;