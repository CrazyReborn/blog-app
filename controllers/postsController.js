const Post = require('../models/post');

exports.post_all_get = (req, res) => {
    Post.find()
    .then(posts => res.json({ posts }))
    .catch(err => console.error(err))
};

exports.post_new_get = (req, res) => {
    res.json(
        {
            message: 'new post get request'
        }
    )
};

