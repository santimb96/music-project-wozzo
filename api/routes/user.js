import express from 'express';
import userController from '../controllers/userController.js';
const router = express.Router();

router
  .get('/', userController.getAll)
  .post('/', userController.create)
  .get('/:id', userController.findId)
  .put('/:id', userController.updateById)
  .delete('/:id', userController.deleteById)
  .post('/public/login', userController.login)
  .post('/public/register', userController.create)
  .post('/autologin', userController.autoLogin);

export default router;