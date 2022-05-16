import mongoose from 'mongoose';
const GenreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

const Genre = mongoose.model('Genre', GenreSchema, 'genre');
export default Genre;