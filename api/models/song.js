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
  audioUrl: {
    type: String,
    required: true,
    unique: true
  }
});

const Song = mongoose.model('Song', SongSchema, 'song');
export default Song;