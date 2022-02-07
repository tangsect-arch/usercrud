const mysql = require("mysql2");
const dbConfig = require("./config.js");
module.exports = function getPool() {
  var pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DBV1,
      debug:false,
      waitForConnections: true,
      multipleStatements: true
    })
  return pool;
};