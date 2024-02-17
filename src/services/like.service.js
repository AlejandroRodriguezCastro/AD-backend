const Like = require('../models/like.model');

class LikeService {
    async getLikes() {
        try {
            const likes = await Like.find();
            return likes;
        } catch (err) {
            console.error(err);
            throw new Error('Error al obtener los likes');
        }
    }

    async getLikeById(id) {
        try {
            let like = await Like.findById(id);
            return like;
        }
        catch (err) {
            console.error(err);
            throw new Error('Error al obtener el like');
        }
    }

    async createLike(like) {
        try {
            let newLike = new Like(like);
            await newLike.save();
            return newLike;
        } catch (err) {
            console.error(err);
            throw new Error('Error al crear el like');
        }
    }

    async getLikeByUserAndRecipe(user, recipe) {
        try {
            let like = await Like.findOne({ user: user, recipe: recipe });
            return like;
        } catch (err) {
            console.error(err);
            throw new Error('Error al obtener el like');
        }
    }

    async updateLike(id, like) {
        try {
            let updatedLike = await Like.findByIdAndUpdate(id, like, { new: true });
            return updatedLike;
        }
        catch (err) {
            console.error(err);
            throw new Error('Error al actualizar el like');
        }
    }

    async deleteLike(id) {
        try {
            await Like.findByIdAndDelete(id);
            return;
        } catch (err) {
            console.error(err);
            throw new Error('Error al eliminar el like');
        }
    }

    async getLikesByRecipe(recipe) {
        try {
            let likes = await Like.find({ recipe: recipe });
            return likes;
        } catch (err) {
            console.error(err);
            throw new Error('Error al obtener los likes');
        }
    }
}

module.exports = new LikeService();