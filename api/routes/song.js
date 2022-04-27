import express from 'express';
import songController from '../controllers/songController.js';
import multer from 'multer';


const router = express.Router();

router
  .get('/', songController.getAll)
  //.post('/', songController.create)
  .get('/:id', songController.findId)
  .put('/:id', multer({ dest: '../uploads/' }).single('audioUrl'), songController.updateById)
  .delete('/:id', songController.deleteById)

//PUBLIC

  .get('/song/:name', songController.findByName)
  .post('/', multer({ dest: '../uploads/' }).single('audioUrl'), songController.create);

  
export default router;
