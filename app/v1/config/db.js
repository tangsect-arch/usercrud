const mysql = require("mysql2");
const dbConfig = require("./config.js");
module.exports = function getPool() {
  var pool = mysql.createPool({
      connectionLimit: 10,
      host: dbConfig.HOST,
      user: dbConfig.USER,
      password: dbConfig.PASSWORD,
      database: dbConfig.DB,
      debug:false,
      waitForConnections: true,
      multipleStatements: true
    })
  return pool;
};