var mysql = require('mysql');
var system = require('../system.js');

/**
 * Data Connection Pool. 
 * Create My SQL pool
 */

var pool = mysql.createPool({
    connectionLimit: 10,
    host: system.database.host,
    user: system.database.user,
    password: system.database.password,
    database: system.database.database,
    debug: false
});

module.exports = pool;
