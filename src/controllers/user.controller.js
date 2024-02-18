const UserService = require('../services/user.service');

class UserController {
    async getUsers(req, res) {
        try {
            const users = await UserService.getUsers();
            return res.status(200).json(users);
        } catch (err) {
            console.log(err);
        }
    }

    async getUserById(req, res) {
        try {
            const user = await UserService.getUserById(req.params.id);
            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
        }
    }

    async createUser(req, res) {
        try {
            const user = await UserService.createUser(req.body);
            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
        }
    }

    async updateUser(req, res) {
        try {
            const user = await UserService.updateUser(req.params.id, req.body);
            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
        }
    }

    async deleteUser(req, res) {
        try {
            await UserService.deleteUser(req.params.id);
            return res.status(200).json({ message: 'Usuario eliminado' });
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = new UserController();