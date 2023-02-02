import express from "express";
import userRoleController from "../controllers/userRoleController.js";

const router = express.Router();

router
  .get("/", userRoleController.getAll)
  // .post("/create", userRoleController.create)
  .get("/:id", userRoleController.findId)
  .post("/", userRoleController.create);
// .put("/:id/update", userRoleController.updateById)
// .delete("/:id/delete", userRoleController.deleteById);

export default router;
