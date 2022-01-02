const express = require('express');
const router = express.Router();
const post_controller = require('../controllers/postsController');

router.get('/', post_controller.post_all_get);
router.post('/', post_controller.post_new_post);

module.exports = router