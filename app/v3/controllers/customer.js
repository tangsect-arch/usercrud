const { promisify } = require('util');
const {sql, conn} = require("../config/db");
const dbConfig = require("../config/config");
const mysql = require('mysql2/promise');

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


exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  sql().getConnection((err,connect)=>{
    connect.beginTransaction((err)=>{
      if(err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the User."
        });
      let query = " insert into user (name, email, password) values ('test1', 'test1@mail.com', 'password'); "+
                  " insert into customer (id, first_name, last_name, dob, address) values (last_insert_id(), 'test1', 'test01', '','test'); "
      connect.query(query, (err, data) => {
        if (err){
          connect.rollback((error)=>{
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the User."
            });
          });          
        }
        else {
          connect.commit((err,success)=>{
            res.send({message:"Data saved successfully"});
          });          
        }
      });
    });    
  });  
};

exports.createUser = async (req, res) => {
  console.log("conn() ",conn()==pool)
  const connection = await pool.getConnection();
  //console.log("connection ",pool)
  await connection.beginTransaction();
  try{    
    if (!req.body) {
      await res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    let queryString = " insert into user (name, email, password) values ('test1', 'test1@mail.com', 'password'); "+
                " insert into customer (id, first_name, last_name, dob, address) values (last_insert_id(), 'test1', 'test01', '',''); "

    let result = await connection.query(queryString);
    await connection.commit();
    res.send({message:pool});
  }
  catch(e){
    await connection.rollback();
    await res.status(500).send({
      message:
        e.message || "Some error occurred while creating the User."
    });
  }
};