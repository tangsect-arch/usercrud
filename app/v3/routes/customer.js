const router = require('express').Router(),
      customer = require("../controllers/customer");

//router.post("/", customer.create);
router.post("/", customer.createUser);

module.exports = router;