const express = require('express');
const loginRouter = express.Router();
const User = require('../models/user');

loginRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log('Received login request for email:', email);

    const user = await User.findOne({ email });

    if (!user) {
      console.log('User not found');
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Retrieved user:', user);

  
    if (password === user.password) {
      console.log('Passwords match');
      
      return res.status(200).json({ message: 'Login successful' });
    } else {
      console.log('Passwords do not match');
      
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = loginRouter;
