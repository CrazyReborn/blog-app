const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postsController');
const user_controller = require('../controllers/userController');
const comment_controller = require('../controllers/commentController');

router.get('/', post_controller.post_all_get);
router.post('/', post_controller.post_new_post);

router.get('/posts/:id', post_controller.post_get);
router.put('/posts/:id', post_controller.post_put);
router.delete('/posts/:id', post_controller.post_delete);

router.get('/login', user_controller.login_get);
router.post('/login', user_controller.login_post);

router.post('/posts/:id/comment', comment_controller.comment_post)

module.exports = router