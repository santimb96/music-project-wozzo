import express from 'express';
import genreController from '../controllers/genreController.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage });


const router = express.Router();

router
  .get('/', genreController.getAll)
  .post('/',upload.single('genreImg'), genreController.create)
  .get('/:id', genreController.findId)
  .put('/:id',upload.single('genreImg'), genreController.updateById)
  .delete('/:id', genreController.deleteById);

export default router;