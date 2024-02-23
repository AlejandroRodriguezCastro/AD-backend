const Like = require('../models/like.model');
const Recipe = require('../models/recipe.model');

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
            let recipe = await Recipe.findById(like.recipe);
            recipe.likes++;
            recipe.rating = (recipe.score + like.rating ) / recipe.likes;
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
            let recipe = await Recipe.findById(like.recipe);
            recipe.rating = (recipe.score + like.rating) / recipe.likes;
            return updatedLike;
        }
        catch (err) {
            console.error(err);
            throw new Error('Error al actualizar el like');
        }
    }

    async deleteLike(id) {
        try {
            let like = await Like.findById(id);
            let recipe = await Recipe.findById(like.recipe);
            recipe.likes--;
            recipe.rating = (recipe.score - like.rating) / recipe.likes;
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