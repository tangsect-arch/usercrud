const router = require('express').Router(),
      customer = require("../controllers/customer");

router.post("/", customer.create);
router.get("/", customer.findAll);
router.get("/:id", customer.findOne);
router.put("/:id", customer.update);
router.delete("/:id", customer.delete);
router.put("/changeStatus/:id", customer.changeStatus);

module.exports = router;