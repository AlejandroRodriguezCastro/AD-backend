const RecipeService = require('../services/recipe.service');
const uploadImageToCloudinary = require('../utils/cloudinary');
const fs = require('fs');

class RecipeController {
    async getRecipes(req, res) {
        try {
            const page = req.query.page;
            const limit = req.query.limit;
            const { recipes, totalPages, currentPage } = await RecipeService.getRecipes(page, limit);
            return res.status(200).json({ recipes, totalPages, currentPage });
        } catch (err) {
            console.log(err);
        }
    }

    async getRecipeById(req, res) {
        try {
            const recipe = await RecipeService.getRecipeById(req.params.id);
            return res.status(200).json(recipe);
        } catch (err) {
            console.log(err);
        }
    }

    async getRecipeByUser(req, res) {
        try {
            const page = req.query.page;
            const limit = req.query.limit;
            const { recipes, totalPages, currentPage } = await RecipeService.getRecipeByUser(req.params.id, page, limit);
            return res.status(200).json({ recipes, totalPages, currentPage });
        } catch (err) {
            console.log(err);
        }
    }

    async createRecipeWithPhoto(req, res) {
        try {
            const imageUrl = await Promise.all(req.files.map(async file => {
                const imageUrl = await uploadImageToCloudinary(file.path);
                return imageUrl;
            }));
            req.files.map(file => {
                fs.unlinkSync(file.path);
            }
            );
            req.body.photo = imageUrl;
            const recipe = await RecipeService.createRecipe(req.body);
            return res.status(200).json(recipe);
        } catch (err) {
            console.log(err);
        }
    }

    async createRecipe(req, res) {
        try {
            const recipe = await RecipeService.createRecipe(req.body);
            return res.status(200).json(recipe);
        } catch (err) {
            console.log(err);
        }
    }

    async getRecipeByIngredient(req, res) {
        try {
            const recipe = await RecipeService.getRecipeByIngredient(req.params.ingredient);
            return res.status(200).json(recipe);
        } catch (err) {
            console.log(err);
        }
    }

    async getRecipeBySearch(req, res) {
        try {
            const page = req.query.page;
            const limit = req.query.limit;
            const { recipes, totalPages, currentPage } = await RecipeService.getRecipeBySearch(req.query, page, limit);
            return res.status(200).json({ recipes, totalPages, currentPage });
        } catch (err) {
            console.log(err);
        }
    }

    async updateRecipe(req, res) {
        try {
            const recipe = await RecipeService.updateRecipe(req.params.id, req.body);
            return res.status(200).json(recipe);
        } catch (err) {
            console.log(err);
        }
    }

    async deleteRecipe(req, res) {
        try {
            await RecipeService.deleteRecipe(req.params.id);
            return res.status(200).json({ message: 'Receta eliminada' });
        } catch (err) {
            console.log(err);
        }
    }

    async patchRecipe(req, res) {
        try {
            const recipe = await RecipeService.patchRecipe(req.params.id, req.body);
            return res.status(200).json(recipe);
        } catch (err) {
            console.log(err);
        }
    }


};

module.exports = new RecipeController();