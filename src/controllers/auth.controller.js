const GoogleStrategyService = require('../services/auth.service');

class AuthController {
    async login(req, res) {
        console.log('login');
        this.googleStrategy.authenticate(req, res);
        return res.status(200).json({ message: 'Login' });
    }

    // check if user id is already logged in
    async check(req, res) {
        console.log('check');
        GoogleStrategyService.authenticate(req, res);
        return res.status(200).json({ message: 'Check' });
    }

    async verify(req, res) {
        console.log('verify');
        console.log(req.body);
        GoogleStrategyService.verify(req.body);
        return res.status(200).json({ message: 'Verify' });
    }

    async register(req, res) {
        console.log('register');
    }
}

module.exports = new AuthController();

// deprecated