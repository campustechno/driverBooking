const Booking = require('../models/Booking');
const asyncHandler = require('express-async-handler');

// Fetch User's Bookings
const getUserBookings = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  // Fetch bookings for the user
  const bookings = await Booking.find({ userId });

  res.status(200).json({ bookings });
});



// Create a Booking for a User
const createBooking = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { driverId, startTime, endTime } = req.body;

  // Create a new booking
  const newBooking = new Booking({
    userId,
    driverId,
    startTime,
    endTime
  });
  await newBooking.save();

  res.status(201).json(newBooking);
});




// Get All Booking Requests for a Driver
const getBookingRequests = asyncHandler(async (req, res) => {
  const driverId = req.driver._id;

  // Fetch booking requests for the driver
  const bookingRequests = await Booking.find({ driverId });

  res.status(200).json({ bookingRequests });
});

// Confirm Booking and Change Availability
const confirmBooking = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const driverId = req.driver._id;

  // Find the booking
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    res.status(404).json({ error: 'Booking not found' });
    return;
  }

  // Check if the booking is for the driver
  if (booking.driverId.toString() !== driverId.toString()) {
    res.status(403).json({ error: 'You are not authorized to confirm this booking' });
    return;
  }

  // Confirm the booking
  booking.status = 'confirmed';
  await booking.save();

  // Change driver's availability
  req.driver.available = false;
  await req.driver.save();

  res.status(200).json({ message: 'Booking confirmed successfully' });
});

// Update Booking Status
const updateBookingStatus = asyncHandler(async (req, res) => {
  const { bookingId } = req.params;
  const { status } = req.body;
  const driverId = req.driver._id;

  // Find the booking
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    res.status(404).json({ error: 'Booking not found' });
    return;
  }

  // Check if the booking is assigned to the driver
  if (booking.driverId.toString() !== driverId.toString()) {
    res.status(403).json({ error: 'You are not authorized to update the status of this booking' });
    return;
  }

  // Update the booking status
  booking.status = status;
  await booking.save();

  res.status(200).json({ message: 'Booking status updated successfully' });
});

module.exports = { getBookingRequests, confirmBooking, updateBookingStatus, getUserBookings,  createBooking  };


