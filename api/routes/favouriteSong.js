import express from 'express';
import favouriteSong from '../controllers/favouriteSongController.js';


const router = express.Router();

router
  .get('/', favouriteSong.getAll)
  .get('/:userId', favouriteSong.getUserFavouriteSongs)
  .post('/', favouriteSong.create)
  .delete('/:id', favouriteSong.deleteById)
  .put('/:id', favouriteSong.updateById);

export default router;