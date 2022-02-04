const router = require('express').Router(),
      employee = require("../controllers/employee");

router.post("/", employee.create);
router.get("/", employee.findAll);
router.get("/:id", employee.findOne);
router.put("/:id", employee.update);
router.delete("/:id", employee.delete);
router.put("/changeStatus/:id", employee.changeStatus);

module.exports = router;