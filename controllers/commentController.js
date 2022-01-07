const Comment = require('../models/comment');
const Post = require('../models/post');
const { body, validationResult } = require('express-validator');

exports.comment_post = [
    body('text', 'Comment should not be empty').trim().isLength({min: 1}).escape(),
    body('author', 'Author should not be empty').trim().isLength({min: 1}).escape(),

    (req, res, next) => {
        const errors = validationResult(req);

        const comment = new Comment({
            post: req.params.id,
            author: req.body.author,
            text: req.body.text,
            date: Date.now()
        });

        if (!errors.isEmpty()) {
            res.json({errors});
        }
        else {
            comment.save((err, savedComment) => {
                if (err) {
                    res.json({err})
                } else {
                    Post.findByIdAndUpdate(req.params.id, { $push: {comments: savedComment._id} }, (err) => {
                        if (err) {
                            res.json(err);
                        } else {
                            res.writeHead(302, { Location: `http://localhost:3000/posts/${req.params.id}` });
                            res.end();
                        }
                    })
                }
            })
        }
    }
];