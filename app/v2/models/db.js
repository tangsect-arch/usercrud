const mysql = require("mysql2");
const dbConfig = require("../config/config.js");

var connection = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DBV2
});

module.exports = connection;