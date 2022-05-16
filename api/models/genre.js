import mongoose from 'mongoose';
const GenreRoleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  }
});

const Genre = mongoose.model('GenreRole', GenreRoleSchema, 'genre');
export default Genre;