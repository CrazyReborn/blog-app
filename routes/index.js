const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postsController');
const user_controller = require('../controllers/userController');
const comment_controller = require('../controllers/commentController');

//GET ALL POSTS OR CREATE A NEW ONE
router.get('/api/', post_controller.post_all_get);
router.post('/api/', post_controller.post_new_post);

//GET API KEY

//GET A POST OR UPDATE OR DELETE
router.get('/api/posts/:id', post_controller.post_get);
router.put('/api/posts/:id', post_controller.post_put);
router.delete('/api/posts/:id', post_controller.post_delete);

router.post('/api/logout', user_controller.logout_post);
router.post('/api/login', user_controller.login_post);

router.post('/api/posts/:id/comment', comment_controller.comment_post);
router.put('/api/comments/:id', comment_controller.comment_put);
router.delete('/api/comments/:id', comment_controller.comment_delete);

module.exports = router