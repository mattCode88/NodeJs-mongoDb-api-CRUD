const mongoose = require('mongoose');

//creo la struttura dei documenti che si interfaccierà al database
const schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    passwd: {
        type: String,
        required: true,
        unique: true
    }
});

const UserCollection = mongoose.model('userCollection', schema);

module.exports = UserCollection;