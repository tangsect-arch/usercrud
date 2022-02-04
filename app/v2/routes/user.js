module.exports = app => {
    const user = require("../controllers/user");
  
    var router = require("express").Router();
  
    // Create a new User
    router.post("/", user.create);
  
    // Retrieve all Users
    router.get("/", user.findAll);
  
    // Retrieve all published Users
    router.get("/active", user.findAllActiveUsers);
  
    // Retrieve a single User with id
    router.get("/:id", user.findOne);
  
    // Update a User with id
    router.put("/:id", user.update);
  
    // Delete a User with id
    router.delete("/:id", user.delete);
  
    // Delete all Users
    router.delete("/", user.deleteAll);
  
    app.use('/api/v2/user', router);
  };