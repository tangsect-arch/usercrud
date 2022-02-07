module.exports = app => {
    const user = require("../controllers/user");
    const hash = require("../controllers/hash");
  
    var router = require("express").Router();
  
    router.post("/", user.create)
          .get("/hash/", hash.passwordEncrypt)
          .get("/", user.findAll)
          .get("/active", user.findAllActiveUsers)
          .delete("/", user.deleteAll)
          
    router.get("/:id", user.findOne)
          .put("/:id", user.update)
          .delete("/:id", user.delete);
  
    app.use('/api/v2/user', router);
  };