const express = require('express');
const { userSignup, userLogin, getMe } = require('../controller/user-controller');
const { userAuth } = require('../middleware/user-auth');
const Router = express.Router();

Router.post('/create', userSignup);
Router.post('/verify', userLogin);
Router.get('/me', userAuth, getMe);

module.exports = Router;
