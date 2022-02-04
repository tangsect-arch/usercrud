const sql = require("../config/db")();
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  req.body.dob = Math.floor((new Date() - new Date(user.dob).getTime()) / 3.15576e+10);
  let query = "BEGIN; INSERT INTO users (user_name, password, display_name, is_approved, email_id, mobile_number) values "+
              " ( ?, ?, ?, ?, ?, ?); "+

              " INSERT INTO employee (id, status, first_name, last_name, address, dob, age, employee_id, created_on) values "+
              " (LAST_INSERT_ID(), ?, ?, ?, ?, ?, ?, now()); "+

              " INSERT INTO user_role (user_id, role_id) values "+
              " (LAST_INSERT_ID(), 3); COMMIT;"
  let insertParams = [userDetails.username, userDetails.password, userDetails.displayName, 
              userDetails.isApproved, userDetails.emailId, userDetails.mobileNumber, userDetails.status, 
              userDetails.firstName, userDetails.lastName, userDetails.address, 
              userDetails.dob, userDetails.age, userDetails.employeeId]
  sql.query(query, insertParams, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send({message:"Data saved successfully"});
  });
};


// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
  const userDetails = {
    username:req.query.username,
    emailId:req.query.emailId,
    mobileNumber:req.query.mobileNumber,
    status:req.query.status
  }
  let subQry = ""
  if(userDetails.username){
    subQry += ` AND u.username LIKE '%${userDetails.username}%'`;
  }
  if(userDetails.emailId){
    subQry += ` AND u.email_id = '${userDetails.emailId}'`;
  }
  if(userDetails.mobileNumber){
    subQry += ` AND u.mobile_number = ${userDetails.mobileNumber}`;
  }
  if(userDetails.status){
    subQry += ` AND u.is_approved = ${userDetails.isApproved}`;
  }
  if(userDetails.status){
    subQry += ` AND e.status = ${userDetails.status}`;
  }
  let query = " SELECT u.id, u.user_name as username, u.display_name as displayName, "+
              " u.is_approved as isApproved, u.email_id as emailId, u.mobile_number as mobileNumber, "+
              " r.name as role, e.first_name as firstName, e.last_name as lastName, e.status as status, "+
              " e.address as address, e.dob as dob, e.age as age, e.employee_id as employeeId "+
              " FROM user u "+
              " INNER JOIN user_role ur on u.id = ur.user_id AND ur.role_id = 2 "+
              " INNER JOIN role r on ur.role_id = r.id "+
              " INNER JOIN employee as e on e.id = u.id "+
              " WHERE ur.role_id = 2 "+subQry+"; COMMIT;";
  query +=";"
  sql.query(query, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving User " 
      });
    }
    if(data.length==0){
      res.status(404).send({
        message: `No user found.`
      });
    }
    else
      res.send(data);
  });
};


// Find a single User by Id
exports.findOne = (req, res) => {
  let query = " SELECT u.id, u.user_name as username, u.display_name as displayName, "+
              " u.is_approved as isApproved, u.email_id as emailId, u.mobile_number as mobileNumber, "+
              " r.name as role, e.first_name as firstName, e.last_name as lastName, e.status as status, "+
              " e.address as address, e.dob as dob, e.age as age, e.employee_id as employeeId "+
              " FROM user u "+
              " INNER JOIN user_role ur on u.id = ur.user_id AND ur.role_id = 2 "+
              " INNER JOIN role r on ur.role_id = r.id "+
              " INNER JOIN employee as e on e.id = u.id "+
              " WHERE ur.role_id = 2 AND u.id = ?;";
  query +=";"
  sql.query(query, [req.params.id], (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving User " 
      });
    }
    if(data.length==0){
      res.status(404).send({
        message: `No user found.`
      });
    }
    else
      res.send(data);
    });
};

// Update a User identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  let updateQry = " BEGIN; UPDATE user "+
                  " set is_approved = ?, user_name = ?, display_name = ?, email_id = ?, mobile_number = ? "+
                  " where id = ?; "

                  " UPDATE employee "+
                  " set status = ? first_name = ?, last_name = ?, address = ?, dob = ?, age = ?, employee_id = ?, modified_on = now() "+
                  " where id = ?"
  let updateParams = [userDetails.isApproved, userDetails.username, userDetails.displayName, 
     userDetails.emailId, userDetails.mobileNumber, req.params.id, userDetails.status, 
    userDetails.firstName, userDetails.lastName, userDetails.address, 
    userDetails.dob, userDetails.age, userDetails.employeeId, req.params.id]
  sql.query(query, updateParams, (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving User " 
      });
    }
    if(data.length==0){
      res.status(404).send({
        message: `No user found.`
      });
    }
    else
      res.send(data);
  });
};


// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  let query = " DELETE FROM user_role where user_id = ?; "+
              " DELETE FROM employee where id = ?;"+
              " DELETE FROM user where id = ?;"
  sql.query(query, [req.params.id, req.params.id, req.params.id], (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving User " 
      });
    }
    else
      res.send({message:"User deleted successfully"});
  });
};


// Delete all Users from the database.
exports.changeStatus = (req, res) => {
  let query = " UPDATE employee set status = ? where id = ?;"
  sql.query(query, [req.body.status, req.params.id], (err, data) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving User " 
      });
    }
    else
      res.send({message:"User deleted successfully"});
  });
};