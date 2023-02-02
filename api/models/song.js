import mongoose from 'mongoose';
const SongSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  artistId: {
    type: mongoose.Schema.ObjectId, 
    ref: 'Artist'
  },
  genreId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Genre'
  },
  audioUrl: {
    type: String,
    required: true,
  }
});

const Song = mongoose.model('Song', SongSchema, 'song');
export default Song;