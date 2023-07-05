const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Signup
const userSignup = asyncHandler(async (req, res) => {
  const { name, email, password, age, gender } = req.body;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(409).json({ error: 'User already exists' });
    return;
  }

  // Create a new user
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
    age,
    gender
  });
  await newUser.save();

  res.status(201).json({ message: 'User created successfully' });
});

// User Login
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }

  // Check if the password is correct
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  // Generate a JSON Web Token (JWT)
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h' // Token expires in 1 hour
  });

  res.status(200).json({ message: 'User login successful', token });
});

module.exports = { userSignup, userLogin };
