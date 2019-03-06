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
        required: true,
        maxlength: [20, '`{PATH}` must be less then `{MAXLENGTH}` characters!'],

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
    year: {
        type: Number,
        max: new Date().getFullYear() // year validation
    },
    meta: {
        votes: Number,
        favs: Number
    }
});

module.exports = mongoose.model('book', BookSchema);