const express = require('express');
const router = express.Router();
const User = require('../model/register');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds
  console.log(hashedPassword)
  const newUser = new User({
    username,
    email,
    password: hashedPassword.toString()
  });
  await newUser.save().then(data => {
    res.status(201).json({ message: 'User registered successfully' });

  }).catch(e => {
    res.status(500).json({ error: 'Registration failed' });
    throw e
  })
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;  
  try {
    // Find user by email
    const user = await User.findOne({ email })
    
    if (!user) {
      return res.json({ error: 'email' });
    }

    // Compare passwords
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.json({ error: 'password' });
    }

    // Generate and send JWT token
    const token = jwt.sign({ userId: user._id }, 'Sumedh And Ahsan Innovation');
    res.status(200).json({token: token,message :'login' });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
