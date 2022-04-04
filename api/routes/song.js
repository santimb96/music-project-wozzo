import express from 'express';
import songController from '../controllers/songController.js';


const router = express.Router();

router
  .get('/', songController.getAll)
  .post('/', songController.create)
  .get('/:id', songController.findId)
  .put('/:id/update', songController.updateById)
  .delete('/:id/delete', songController.deleteById);

  
export default router;
