const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// Models
const Book = require('../models/Book');

router.post('/new', function (req, res, next) {
    const book = new Book({
        title: 'Course',
        published: true,
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
    });
});

// router.get('/search', (req, res) => {
//     Book.find({
//         title: {
//             $exist: true // title must defined
//             $exist: false //
//         }
//     }, (err, data) => {
//         if (!err) {
//             res.json(data);
//         } else {
//             console.log(err);
//         }
//     });
// });

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
/*
*   findOne() -> Remove()
*   findOneAndRemove()
*   remove()
*/
router.delete('/remove', (req, res) => {
    // Book.findById('5c7fc9c3a710687738e689ee', (err, book) => {
    //     book.remove((err, data) => {
    //         res.json(data);
    //     });
    // });
    // Book.findOneAndRemove(
    //     { published: true }, (err, book) => {
    //         res.json(book);
    //     }
    // );
    // Book.remove(
    //     { published: true }, (err, book) => {
    //         res.json(book);
    //     }
    // );
});

router.get('/sort', (req, res) => {
    Book.find({}, (err, data) => {
        res.json(data);
    }).sort(
        {
            // '$property' : $-1 (desc) $1 (asc)
        }
    );
});

router.get('/limitAndSkip', (req, res) => {
    Book.find({}, (err, data) => {
        res.json(data);
    }).limit(2); // It shows 2 datas.
    /*
    }.skip(2).limit(1) // It shows one data after skipped 2 of begin data
    */
});

router.get('/aggregate', (req, res) => {
    Book.aggregate([
        {
            $match: {
                published: true
                // title: 'Course'
            }
        },
        // {
        //     $group: {
        //         _id: "$title",
        //         total: { $sum: 1 }
        //     }
        // },
        {
            $project: {
                title: 1,
                published: 1
            }
        },
        {
            $sort: {
                title: -1
            }
        },
        {
            $limit: 3
        },
        {
            $skip: 1
        }
    ], (err, result) => {
        if (!err) {
            res.json(result);
        }
    });
});

router.get('/aggregate-lookup', (req, res) => {
    Book.aggregate([
        {
            $match: {
                _id: mongoose.Types.ObjectId('5c7fdc36a75b3b57280f45ac')
            }
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
            }
        }, {
            $unwind: '$user'
        }, {
            $project: {
                title: 1,
                userOwn: '$user.name'
            }
        }
    ], (err, result) => {
        if (!err) {
            res.json(result);
        }
    })
});

module.exports = router;
