import mongoose from 'mongoose';

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String 
  },
  profileImage: {
    type: String
  }
});

const Artist = mongoose.model('Artist', ArtistSchema, 'artist');
export default Artist;