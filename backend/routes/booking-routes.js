const express = require('express');
const Router = express.Router();
const {userAuth} = require('../middleware/user-auth');
const {driverAuth} = require('../middleware/driver-auth');
const { getUserBookings, getBookingRequests, createBooking, updateBookingStatus, confirmBooking, getUserLastBooking, deleteCurrentBooking } = require('../controller/booking-controller');

Router.post('/create', userAuth, createBooking);
Router.get('/userbooking', userAuth, getUserBookings);
Router.get('/bookingrequests', driverAuth, getBookingRequests);
Router.put('/update', driverAuth, updateBookingStatus);
Router.put('/confirm', driverAuth, confirmBooking);
Router.get('/lastbook', userAuth, getUserLastBooking);
Router.delete('/delCurrentBooking', userAuth, deleteCurrentBooking);


module.exports= Router;