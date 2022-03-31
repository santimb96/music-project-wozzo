const mongoose = require('mongoose');

const UserRoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        enum: ['admin', 'user'],
    }
});

const UserRole = mongoose.model('UserRole', UserRoleSchema, 'userRole');
module.exports = UserRole;
