const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userRoleId: {
        type: mongoose.Schema.ObjectId, 
        ref: 'UserRole'
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', UserSchema, 'user');
module.exports = User;