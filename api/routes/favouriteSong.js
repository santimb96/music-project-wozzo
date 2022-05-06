import express from 'express';
import favouriteSong from '../controllers/favouriteSongController.js';


const router = express.Router();

router
  .get('/', favouriteSong.getAll)
  .post('/', favouriteSong.create)
  .delete('/:id', favouriteSong.deleteById);

export default router;