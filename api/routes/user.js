import express from 'express';
import userController from '../controllers/userController.js';
const router = express.Router();

router
  .get('/', userController.getAll)
  .post('/', userController.create)
  .get('/:id', userController.findId)
  .put('/:id', userController.updateById)
  .put('/updateProfile/:id', userController.updateProfile)
  .delete('/:id', userController.deleteById)
  .post('/login', userController.login)
  .post('/register', userController.create)
  .post('/autologin', userController.autoLogin);

export default router;