const Comment = require('../models/comment');
const Post = require('../models/post');
const { body, validationResult } = require('express-validator');
const sanitizeHtml = require('sanitize-html');
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();
    } else {
        res.sendStatus(403)
    }
}

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
                            res.status(200).end();
                        }
                    })
                }
            })
        }
    }
];

exports.comment_delete = (req, res, next) => {
    Comment.findByIdAndRemove(req.params.id, (err, comment) => {
        if (err) {
            next(err);
        } else if(comment == null) {
            res.sendStatus(404)
        } else {
            res.sendStatus(200)
        }
    })
}

exports.comment_put = [
    body('text', 'Updated text should not be empty').trim().isLength({min: 1}),
    verifyToken,
    (req, res, next) => {
        const errors = validationResult(req);
        const text = sanitizeHtml(req.body.text)

        const comment = new Comment({
            _id: req.params.id,
            text: text,
            author: req.body.author,
            post: req.body.post,
            date: req.body.date
        })

        if (!errors.isEmpty()) {
            next(err)
        } else {
            jwt.verify(req.token, 'secretKey', (err) => {
                Comment.findByIdAndUpdate(req.params.id, comment, {}, (err) => {
                    if (err) {
                        next(err);
                    } else {
                        res.sendStatus(200);
                    }
                })
            })
        }
    }
];