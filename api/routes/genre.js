import express from 'express';
import genreController from '../controllers/genreController.js';


const router = express.Router();

router
  .get('/', genreController.getAll)
  .post('/', genreController.create)
  .get('/:id', genreController.findId)
  .put('/:id', genreController.updateById)
  .delete('/:id', genreController.deleteById);

export default router;