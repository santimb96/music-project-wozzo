const express = require("express");
const songController = require("../controllers/songController");

const router = express.Router();

router
  .get("/", songController.getAll)
  .post("/", songController.create)
  .get("/:id", songController.findId)
  .put("/:id/update", songController.updateById)
  .delete("/:id/delete", songController.deleteById);

module.exports = router;
