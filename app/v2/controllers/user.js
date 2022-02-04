const User = require("../models/user.js");

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    username : req.body.username,
    emailId : req.body.emailId,
    mobileNumber : req.body.mobileNumber,
    age : Math.floor((new Date() - new Date(req.body.dob).getTime()) / 3.15576e+10),
    dob : req.body.dob,
    gender : req.body.gender,
    status : req.body.status || false
  });

  // Save User in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};


// Retrieve all Users from the database (with condition).
exports.findAll = (req, res) => {
  const username = req.query.username;
  User.getAll(username, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User not found.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User " 
        });
      }
    }
    else res.send(data);
  });
};


// Find a single User by Id
exports.findOne = (req, res) => {
  User.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User not found.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User " 
        });
      }
    } else res.send(data);
  });
};


// find all active Users
exports.findAllActiveUsers = (req, res) => {
  User.getAllActiveUsers((err, data) => {
    if (err){
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User not found.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User " 
        });
      }
    }
    else res.send(data);
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

  console.log(req.body);

  User.updateById(
    req.params.id,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `User not found.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User "
          });
        }
      } else res.send(data);
    }
  );
};


// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  User.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `User not found.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User " 
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};


// Delete all Users from the database.
exports.deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all users."
      });
    else res.send({ message: `All Users were deleted successfully!` });
  });
};