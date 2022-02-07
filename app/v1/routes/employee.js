const router = require('express').Router(),
      employee = require("../controllers/employee");

router.post("/", employee.create)
      .get("/", employee.findAll);

router.get("/:id", employee.findOne)
      .put("/:id", employee.update)
      .delete("/:id", employee.delete)
      .put("/changeStatus/:id", employee.changeStatus);

module.exports = router;