const LikeService = require('../services/like.service');

class LikeController {
    async getLikes(req, res) {
        try {
            const likes = await LikeService.getLikes();
            return res.status(200).json(likes);
        } catch (err) {
            console.log(err);
        }
    }

    async getLikeById(req, res) {
        try {
            const like = await LikeService.getLikeById(req.params.id);
            return res.status(200).json(like);
        } catch (err) {
            console.log(err);
        }
    }

    async createLike(req, res) {
        try {
            const like = await LikeService.createLike(req.body);
            return res.status(200).json(like);
        } catch (err) {
            console.log(err);
        }
    }

    async getLikeByUserAndRecipe(req, res) {
        try {
            const like = await LikeService.getLikeByUserAndRecipe(req.params.user, req.params.recipe);
            return res.status(200).json(like);
        } catch (err) {
            console.log(err);
        }
    }

    async updateLike(req, res) {
        try {
            const like = await LikeService.updateLike(req.params.id, req.body);
            return res.status(200).json(like);
        } catch (err) {
            console.log(err);
        }
    }

    async deleteLike(req, res) {
        try {
            await LikeService.deleteLike(req.params.id);
            return res.status(200).json({ message: 'Like eliminado' });
        } catch (err) {
            console.log(err);
        }
    }

}

module.exports = new LikeController();