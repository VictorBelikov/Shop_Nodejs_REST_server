const express = require('express');
const { body } = require('express-validator');

const feedController = require('../controllers/feed');

const router = express.Router();

router.get('/posts', feedController.getPosts);

router.post(
  '/post',
  [
    body('title', 'Please enter a valid "title" field').trim().isString().isLength({ min: 5 }),
    body('content', 'Please enter a valid "content" field').trim().isString().isLength({ min: 5 }),
  ],
  feedController.createPost,
);

router.get('/post/:postId', feedController.getPost);

module.exports = router;
