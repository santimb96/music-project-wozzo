const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router
  .get("/", userController.getAll)
  .post("/", userController.create)
  .get("/:id", userController.findId)
  .put("/:id/update", userController.updateById)
  .delete("/:id/delete", userController.deleteById)
  .post("/login", userController.login)

module.exports = router;
