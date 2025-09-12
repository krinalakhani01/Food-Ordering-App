const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).json({ message: 'Username and password required' });

  const exists = await User.findOne({ username });
  if (exists) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();

  const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.json({ message: 'Signup successful', username, token });
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: 'Invalid password' });

  const token = jwt.sign({ username }, process.env.SECRET_KEY, { expiresIn: '1h' });
  res.json({ message: 'Login successful', username, token });
});

module.exports = router;
