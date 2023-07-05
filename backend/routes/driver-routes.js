const express = require('express');
const { driverSignup, driverLogin, getAvailableDrivers } = require('../controller/driver-controller');
const Router = express.Router();
const {driverAuth} = require('../middleware/driver-auth');

Router.post('/create', driverSignup);
Router.post('/verify', driverLogin);
Router.get('/available',driverAuth, getAvailableDrivers);

module.exports = Router;