import express from 'express';
import userController from '../controllers/userController.js';
const router = express.Router();

router
  .get('/', userController.getAll)
  .post('/', userController.create)
  .get('/:id', userController.findId)
  .put('/:id/update', userController.updateById)
  .delete('/:id/delete', userController.deleteById)
  .post('/login', userController.login);

export default router;