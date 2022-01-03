const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postsController');
const user_controller = require('../controllers/userController');

router.get('/', post_controller.post_all_get);
router.post('/new-post', post_controller.post_new_post);

router.get('/posts/:id', post_controller.post_update_get);
router.put('/posts/:id', post_controller.post_update_put);


router.get('/login', user_controller.login_get);
router.post('/login', user_controller.login_post)

module.exports = router