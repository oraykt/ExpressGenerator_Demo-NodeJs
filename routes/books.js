const express = require('express');
const router = express.Router();
// Models
const Book = require('../models/Book');

router.post('/new', function (req, res, next) {
    const book = new Book({
        title: 'Course',

        // published: false,
        // comments: [
        //     {
        //         message: "Aweful!"
        //     },
        //     {
        //         message: "I'd ever seen like this book before."
        //     },
        //     {
        //         message: "I don't like"
        //     }
        // ],
        // meta: {
        //     votes: 34,
        //     favs: 13
        // }
    });
    book.save((err, data) => {
        if (!err) {
            res.json(data);
        } else {
            console.log(err);
        }
    })
});

router.get('/search', (req, res) => {
    Book.find({ title: 'Course' }, (err, data) => {
        if (!err) {
            res.json(data);
        } else {
            console.log(err);
        }
    })
});

router.get('/searchOne', (req, res) => {
    Book.findOne({ title: 'Course' }, (err, data) => {
        if (!err) {
            res.json(data);
        } else {
            console.log(err);
        }
    })
});

router.get('/searchById', (req, res) => {
    Book.findById('5c7fcdac8680a54a1015fa2e', (err, data) => {
        if (!err) {
            res.json(data);
        } else {
            console.log(err);
        }
    })
});

router.put('/update', (req, res) => {
    Book.findByIdAndUpdate(
        '5c7fc9c3a710687738e689ee',
        {
            title: 'Updated byId'
        },
        {
            upsert: true,
            multi: true
        },
        (err, data) => {
            if (!err) {
                res.json(data);
            } else {
                console.log(err);
            }
        })
});

module.exports = router;
