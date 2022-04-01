const express = require("express");
const songController = require("../controllers/songController");

const router = express.Router();

router
  .get("/", songController.getAll)
  // .get("/:key/:value", songController.find, songController.show)
  // .put("/:key/:value", songController.find, songController.update)
  // .delete("/:key/:value", songController.find, songController.deleted);

module.exports = router;
