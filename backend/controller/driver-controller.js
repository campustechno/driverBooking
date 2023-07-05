const Driver = require('../models/Driver');
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Driver Signup
const driverSignup = asyncHandler(async (req, res) => {
  const { name, email, password, licenseNumber, vehicle } = req.body;

  // Check if the driver already exists
  const existingDriver = await Driver.findOne({ email });
  if (existingDriver) {
    res.status(409).json({ error: 'Driver already exists' });
    return;
  }

  // Create a new driver
  const hashedPassword = await bcrypt.hash(password, 10);
  const newDriver = new Driver({
    name,
    email,
    password: hashedPassword,
    licenseNumber,
    vehicle
  });
  await newDriver.save();

  res.status(201).json({ message: 'Driver created successfully' });
});

// Driver Login
const driverLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check if the driver exists
  const driver = await Driver.findOne({ email });
  if (!driver) {
    res.status(404).json({ error: 'Driver not found' });
    return;
  }

  // Check if the password is correct
  const isPasswordValid = await bcrypt.compare(password, driver.password);
  if (!isPasswordValid) {
    res.status(401).json({ error: 'Invalid credentials' });
    return;
  }

  // Generate a JSON Web Token (JWT)
  const token = jwt.sign({ driverId: driver._id }, JWT_SECRET_KEY, {
    expiresIn: '1h' // Token expires in 1 hour
  });

  res.status(200).json({ message: 'Driver login successful', token });
});

// Display All Available Drivers
const getAvailableDrivers = asyncHandler(async (req, res) => {
    // Fetch all available drivers
    const drivers = await Driver.find({ isAvailable: true });
  
    res.status(200).json({ drivers });
  });

module.exports = { driverSignup, driverLogin, getAvailableDrivers };
