const router = require('express').Router(),
      customer = require("../controllers/customer");

router.post("/", customer.create)
      .get("/", customer.findAll);

router.get("/:id", customer.findOne)
      .put("/:id", customer.update)
      .delete("/:id", customer.delete)
      .put("/changeStatus/:id", customer.changeStatus);

module.exports = router;