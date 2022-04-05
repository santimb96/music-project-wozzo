import express from 'express';
import artistController from '../controllers/artistController.js';


const router = express.Router();

router
  .get('/', artistController.getAll)
  .post('/', artistController.create)
  .get('/:id', artistController.findId)
  .put('/:id', artistController.updateById)
  .delete('/:id', artistController.deleteById);

export default router;