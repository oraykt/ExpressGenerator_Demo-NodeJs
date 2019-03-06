const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
* type
* default
* required
* unique
*/
const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    published: {
        type: Boolean,
        default: true
    },
    comments: [
        {
            message: String
        }
    ],
    meta: {
        votes: Number,
        favs: Number
    }
});

module.exports = mongoose.model('book', BookSchema);