const Post = require('../models/post');
const {body, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const async = require('async');

exports.post_all_get = (req, res) => {
    jwt.verify(req.token, 'sekretKey', (err, authData) => {
        if (err) {
            Post.find({published: true}).populate('author').populate('comments')
            .then(posts => res.json({ posts }))
            .catch(err => console.error(err))
        } else {
            Post.find().populate('author').populate('comments')
            .then(posts => res.json({ posts }))
            .catch(err => console.error(err))
        }
    });
};

exports.post_new_get = (req, res) => {
    res.json({ message: 'new post get request' });
};

exports.post_new_post = [
    body('text', 'Post should not be empty').trim().isLength({min:1}).escape(),
    verifyToken,
    (req, res) => {
        const errors = validationResult(req);

        const post = new Post({
            //need to change to get user id from req object
            author: '61d159657ab36e7f277ee8d1',
            title: req.body.title,
            text: req.body.text,
            date: Date.now(),
            comments:[],
            published: false
        })

        if (!errors.isEmpty()) {
            res.json({ errors })
        } else {
            jwt.verify(req.token, 'secretKey', (err, authData) => {
                if (err) {
                    res.sendStatus(403);
                } else {
                    post.save()
                    //make it redirect somewhere
                    .then(() => res.json({ message: 'success', authData }))
                    .catch(err => res.json({err}))
                }
            })
            
        }
    }
]

exports.post_get = (req, res, next) => {
    Post.findById(req.params.id).populate('author').populate('comments')
    .exec((err, post) => {
        if (err) {
            next(err)
        }
        else if (post === null) {
            res.json({message: 'Can\'t find the post'})
        }
        else {
            res.json({post});
        }
    })
}

exports.post_put = [
    body('text', 'Post should not be empty').trim().isLength({min:1}).escape(),
    verifyToken,
    (req, res) => {
        const errors = validationResult(req);

        const post = new Post({
            _id: req.params.id,
            text: req.body.text,
            date: Date.now()
        });
        
        if (!errors.isEmpty()) {
            res.json({errors});
        }
        else {
            Post.findByIdAndUpdate(req.params.id, post, {})
            .then(() => res.redirect('/api/'))
            .catch(err => res.json({err}));
        }
    }
]

exports.post_delete = (req, res) => {
    Post.findByIdAndRemove(req.params.id)
    .then(() => res.redirect('/'))
    .catch(err => res.json({err}));
}

function verifyToken(req, res, next) {
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