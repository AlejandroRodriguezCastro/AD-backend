const AuthService = require("../services/auth.service");

class AuthController {
    async register(req, res) {
        try {
            const user = await AuthService.register(req.body);
            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
        }
    }

    async login(req, res) {
        try {
            const user = await AuthService.login(req.body.id_token);
            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
    }
}

module.exports = new AuthController();