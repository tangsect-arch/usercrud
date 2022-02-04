const sql = require("./db.js");
// constructor
const User = function(user) {
  this.username = user.username;
  this.email_id = user.emailId;
  this.mobile_number = user.mobileNumber;
  this.age = Math.floor((new Date() - new Date(user.dob).getTime()) / 3.15576e+10);
  this.dob = user.dob;
  this.gender = user.gender;
  this.status = user.status;
};

User.create = (newUsers, result) => {
  sql.query("INSERT INTO users SET ?", newUsers, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }

    //console.log("created user: ", { id: res.insertId, ...newUsers });
    result(null, { id: res.insertId, ...newUsers });
  });
};

User.findById = (id, result) => {
  sql.query(`SELECT id, username,email_id, mobile_number, age, gender, status, date_format(dob, '%d-%m-%Y') as dob FROM users WHERE id = ${id}`, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      //console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = (username, result) => {
  let query = "SELECT id, username,email_id, mobile_number, age, gender, status, date_format(dob, '%d-%m-%Y') as dob FROM users";

  if (username) {
    query += ` WHERE username LIKE '%${username}%'`;
  }
//console.log("query ",query)
  sql.query(query, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
      return;
    }
    else if(res.length==0){
      result({ kind: "not_found" }, null);
      return;
    }

    //console.log("users: ", res);
    result(null, res);
  });
};

User.getAllActiveUsers = result => {
  sql.query("SELECT id, username,email_id, mobile_number, age, gender, status, date_format(dob, '%d-%m-%Y') as dob FROM users WHERE status=true", (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
      return;
    }
    else if(res.length==0){
      result({ kind: "not_found" }, null);
      return;
    }
    //console.log("users: ", res);
    result(null, res);
  });
};

User.updateById = (id, user, result) => {
  sql.query(
    "UPDATE users SET username = ?, gender = ?, dob = ?, age=? WHERE id = ?",
    [user.username, user.gender, user.dob, user.age, id],
    (err, res) => {
      if (err) {
        //console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      //console.log("updated user: ", { id: id, ...user });
      result(null, { id: id, ...user });
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM users WHERE id = ?", id, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    //console.log("deleted user with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM users", (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(null, err);
      return;
    }

    //console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;