const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router
  .get("/", userController.getAll)
  .post("/create", userController.create)
  .get("/:id", userController.findId)
  .put("/:id/update", userController.updateById)
  .delete("/:id/delete", userController.deleteById);

module.exports = router;
