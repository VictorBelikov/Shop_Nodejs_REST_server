const { validationResult } = require('express-validator');

const Post = require('../models/post');

exports.getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      message: 'Fetched posts successfully',
      posts,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const validationErrs = validationResult(req);
    const image = req.file;
    const { title } = req.body;
    const { content } = req.body;

    if (!image) {
      const error = new Error('No image provided');
      error.statusCode = 422;
      throw error;
    }

    if (!validationErrs.isEmpty()) {
      const error = new Error('Validation failed!');
      error.statusCode = 422;
      throw error;
    }

    const post = await new Post({
      title,
      content,
      imageUrl: image.path,
      creator: { name: '=Some User=' },
    }).save();

    res.status(201).json({
      message: 'Post created successfully!',
      post,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }
};

exports.getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) {
      const error = new Error('Could not find post!');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Post fetched', post });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    return next(err);
  }
};
