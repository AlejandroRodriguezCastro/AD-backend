const express = require('express');
const router = express.Router();
const AuthController = require('../../controllers/auth.controller');

router.post('/login', AuthController.login);

router.post('/register', AuthController.register);

router.post('/verify', AuthController.verify);

router.post('/check', AuthController.check);

module.exports = router;