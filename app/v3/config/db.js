const mysql = require("mysql2");
const mysql2 = require("mysql2/promise");
const dbConfig = require("./config.js");
exports.sql = function getPool() {
  var pool = mysql.createPool({
      connectionLimit: 10,
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DBV3,
      debug:false,
      waitForConnections: true,
      multipleStatements: true
    })
  return pool                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        ;
};

exports.conn = function getPool() {
  var pool = mysql2.createPool({
      connectionLimit: 10,
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DBV3,
      debug:false,
      waitForConnections: true,
      multipleStatements: true
    })
  return pool;
};

exports.pool = mysql2.createPool({
  connectionLimit: 10,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DBV3,
  debug:false,
  waitForConnections: true,
  multipleStatements: true
});