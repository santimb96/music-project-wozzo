import mongoose from 'mongoose';
const FavouriteSongSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId, 
    ref: 'User'
  },
  songId: {
    type: mongoose.Types.ObjectId, 
    ref: 'Song'
  }
});

const FavouriteSong = mongoose.model('FavouriteSong', FavouriteSongSchema, 'favouriteSong');
export default FavouriteSong;