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

    async deleteUserFavoriteRecipe(req, res) {
        try {
            const user = await UserService.deleteUserFavoriteRecipe(req.params.id, req.params.recipe);
            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
    }

    async setUserFavoriteRecipe(req, res) {
        try {
            const user = await UserService.setUserFavoriteRecipe(req.params.id, req.params.recipe);
            return res.status(200).json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: err.message });
        }
    }

    async getFavoriteRecipes(req, res) {
        try {
            const userRecipes = await UserService.getFavoriteRecipes(req.params.id);
            return res.status(200).json(userRecipes);
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