const Post = require('../models/post');
const {body, validationResult} = require('express-validator');

exports.post_all_get = (req, res) => {
    Post.find()
    .then(posts => res.json({ posts }))
    .catch(err => console.error(err))
};

exports.post_new_get = (req, res) => {
    res.json({ message: 'new post get request' });
};

exports.post_new_post = [
    body('text', 'Post should not be empty').trim().isLength({min:1}).escape(),

    (req, res) => {
        const errors = validationResult(req);

        const post = new Post({
            //need to change to get user id from req object
            author: '61d159657ab36e7f277ee8d1',
            text: req.body.text,
            date: Date.now()
        })

        if (!errors.isEmpty()) {
            res.json({ errors })
        } else {
            post.save()
            //make it redirect somewhere
            .then(() => res.json({ message: 'success' }))
            .catch(err => res.json({err}))
        }
    }
]