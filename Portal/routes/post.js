const express = require('express');
const router = express.Router();
const postController = require('../controllers/Post_controller');

router.post('/', postController.createPost);

module.exports = router;
