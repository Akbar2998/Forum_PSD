const express = require('express');
const registrationRouter = express.Router();
const User = require('../models/user');

registrationRouter.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    
    const user = new User({ name, email, password });

    
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
});

module.exports = registrationRouter;
