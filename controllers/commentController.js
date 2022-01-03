const Comment = require('../models/comment');
const Post = require('../models/post');
const { body, validationResult } = require('express-validator');

exports.comment_post = [
    body('text', 'Comment should not be empty').trim().isLength({min: 1}).escape(),
    body('author', 'Author should not be empty').trim().isLength({min: 1}).escape(),

    (req, res) => {
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
            Post.findById(req.params.id, (err, post) => {
                if (err) {
                    res.json({err})
                }
                else {
                    comment.save(function(err) {
                        if (err) {
                            res.json({err})
                        }
                        post.comments.push(comment._id);
                    });
                    res.redirect('/')
                }
            })
        }
    }
];