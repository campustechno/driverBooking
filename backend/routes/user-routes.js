const express = require('express');
const { userSignup, userLogin } = require('../controller/user-controller');
const Router = express.Router();

Router.post('/create', userSignup);
Router.post('/verify', userLogin);

module.exports = Router;