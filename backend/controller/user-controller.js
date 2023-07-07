const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User Signup
const userSignup = asyncHandler(async (req, res) => {
  const {name, email, password, gender, age} = req.body;

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
    gender, 
  });
  
  await newUser.save();
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1h' // Token expires in 1 hour
  });
  res.status(201).json({
    name:newUser.name,
    email:newUser.email,
    token:token
  });
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

  res.status(200).json({
    name:user.name,
    email:user.email,
    token:token
  });
});


const getMe = asyncHandler(async (req, res) => {
  res.json(req.user);
})


module.exports = { userSignup, userLogin, getMe };
