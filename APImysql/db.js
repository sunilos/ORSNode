const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodemysql', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log('Connected to MySQL');
    })
    .catch(err => {
        console.error('Connection error: ', err);
    });

module.exports = sequelize;
