const express = require('express');
const createPostRouter = express.Router();
const Post = require('../models/post');

createPostRouter.post('/createpost', async (req, res) => {
  try {
    const { title, content } = req.body;

    
    const post = new Post({ title, content });

    
    await post.save();

    res.status(201).json({ message: 'Post created successfully' });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ message: 'Post creation failed' });
  }
});

module.exports = createPostRouter;
