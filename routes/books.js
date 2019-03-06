const express = require('express');
const router = express.Router();
// Models
const Book = require('../models/Book');

router.get('/new', function (req, res, next) {
    const book = new Book({
        title: 'The Cleaner'
    });
    book.save((err, data) => {
        if (!err) {
            res.json(data);
        } else {
            console.log(err);
        }
    })
});

module.exports = router;
