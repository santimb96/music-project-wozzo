const express = require("express");
const userRoleController = require("../controllers/userRoleController");

const router = express.Router();

router
  .get("/", userRoleController.getAll)
  // .get("/:key/:value", userRoleController.find, userRoleController.show)
  // .put("/:key/:value", userRoleController.find, userRoleController.update)
  // .delete("/:key/:value", userRoleController.find, userRoleController.deleted);

module.exports = router;
