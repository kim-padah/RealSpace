const express = require('express');
const auth = express.Router();

const authController = require('../controllers/auth');

auth.post('/register', authController.register);
auth.post('/login', authController.login);
auth.get('/check', authController.check);
auth.post('/logout', authController.logout);

module.exports = auth;
