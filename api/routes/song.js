import express from 'express';
import songController from '../controllers/songController.js';


const router = express.Router();

router
  .get('/', songController.getAll)
  .post('/', songController.create)
  .get('/:id', songController.findId)
  .put('/:id', songController.updateById)
  .delete('/:id', songController.deleteById)

//PUBLIC

  .get('/song/:name', songController.findByName);

  
export default router;
