const express = require("express");
const userRoleController = require("../controllers/userRoleController");

const router = express.Router();

router
  .get("/", userRoleController.getAll)
  // .post("/create", userRoleController.create)
  .get("/:name", userRoleController.findId)
  // .put("/:id/update", userRoleController.updateById)
  // .delete("/:id/delete", userRoleController.deleteById);

module.exports = router;
