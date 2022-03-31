const mongoose = require('mongoose');

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
module.exports = Artist;