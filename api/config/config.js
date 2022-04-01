require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 5000,
    DB: process.env.DB
}