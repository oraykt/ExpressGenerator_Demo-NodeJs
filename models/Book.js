const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const BookSchema = new Schema({
    title: String
});

module.exports = mongoose.model('book', BookSchema);