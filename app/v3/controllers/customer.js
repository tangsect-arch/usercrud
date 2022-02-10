const {sql, conn, pool} = require("../config/db");

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
  console.log("req ", req.body)
  const connection = await pool.getConnection();
  //console.log("connection ",pool)
  await connection.beginTransaction();
  try{    
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
    let phrgx = /^\d{10}$/;
    let emailrgx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if (!req.body.emailId || !req.body.emailId.toLowerCase().match(emailrgx)) {
      res.status(400).send({
        message: "Invalid email id!"
      });
    }
    else if (!req.body.mobileNumber || !req.body.mobileNumber.match(phrgx)) {
      res.status(400).send({
        message: "Invalid mobile number!"
      });
    }
    else{
      let queryString = " insert into user (name, email, password) values ('test1', 'test1@mail.com', 'password'); "+
                  " insert into customer (id, first_name, last_name, dob, address) values (last_insert_id(), 'test1', 'test01', '1991/01/01','address'); "

      let result = await connection.query(queryString);
      await connection.commit();
      res.send({message:"Customer details saved successfully"});
    }
  }
  catch(e){
    await connection.rollback();
    await res.status(500).send({
      message:
        e.message || "Some error occurred while creating the User."
    });
  }
};