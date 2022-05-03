import express from 'express';
import songController from '../controllers/songController.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });


const router = express.Router();

router
  .get('/', songController.getAll)
  //.post('/', songController.create)
  .get('/:id', songController.findId)
  .put('/:id', upload.single('audioUrl'), songController.updateById)
  .delete('/:id', songController.deleteById)

//PUBLIC

  .get('/song/:name', songController.findByName)
  .post('/', upload.single('audioUrl'), songController.create);

  
export default router;
