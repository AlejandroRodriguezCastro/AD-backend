const RecipeService = require('../services/recipe.service');

class RecipeController {
    async getRecipes(req, res) {
        try {
            const recipes = await RecipeService.getRecipes();
            return res.status(200).json(recipes);
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

    async createRecipe(req, res) {
        try {
            const recipe = await RecipeService.createRecipe(req.body);
            return res.status(200).json(recipe);
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