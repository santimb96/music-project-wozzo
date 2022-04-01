const express = require("express");
const artistController = require("../controllers/artistController");

const router = express.Router();

router
  .get("/", artistController.getAll)
  // .get("/:key/:value", artistController.find, artistController.show)
  // .put("/:key/:value", artistController.find, artistController.update)
  // .delete("/:key/:value", artistController.find, artistController.deleted);

module.exports = router;
