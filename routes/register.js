const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/User');

// GET register page
router.get('/register', (req, res) => {
  res.render('register');
});

// POST register data
router.post('/register', async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Check if the username or email already exists in the database
    const existingUser = await User.findOne().or([{ username }, { email }]);
    if (existingUser) {
      return res.render('register', { error: 'Username or email already exists' });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      username,
      password: hashedPassword,
      email
    });

    // Save the user to the database
    await newUser.save();

    res.redirect('/login');
  } catch (error) {
    console.error('Error registering user:', error);
    res.render('register', { error: 'An error occurred while registering user' });
  }
});

module.exports = router;
