const express = require("express");
const artistController = require("../controllers/artistController");

const router = express.Router();

router
  .get("/", artistController.getAll)
  .post("/create", artistController.create)
  .get("/:id", artistController.findId)
  .put("/:id/update", artistController.updateById)
  .delete("/:id/delete", artistController.deleteById);

module.exports = router;
