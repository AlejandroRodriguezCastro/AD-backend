const Recipe = require('../models/recipe.model');

class RecipeService {
    async getRecipes() {
        try {
            const recipes = await Recipe.find();
            return recipes;
        } catch (err) {
            console.error(err);
            throw new Error('Error al obtener las recetas');
        }
    }

    async getRecipeById(id) {
        try {
            let recipe = await Recipe.findById(id);
            return recipe;
        }
        catch (err) {
            console.error(err);
            throw new Error('Error al obtener la receta');
        }
    }

    async createRecipe(recipe) {
        try {
            let newRecipe = new Recipe(recipe);
            await newRecipe.save();
            return newRecipe;
        } catch (err) {
            console.error(err);
            throw new Error('Error al crear la receta');
        }
    }

    async updateRecipe(id, recipe) {
        try {
            let updatedRecipe = await Recipe.findByIdAndUpdate(id, recipe, { new: true });
            return updatedRecipe;
        }
        catch (err) {
            console.error(err);
            throw new Error('Error al actualizar la receta');
        }
    }

    async deleteRecipe(id) {
        try {
            await Recipe.findByIdAndDelete(id);
            return;
        } catch (err) {
            console.error(err);
            throw new Error('Error al eliminar la receta');
        }
    }

    async patchRecipe(id, recipe) {
        try {
            let patchedRecipe = await Recipe.findByIdAndUpdate(
                id,
                { $set: recipe },
                { new: true, useFindAndModify: false }
            );
            return patchedRecipe;
        } catch (err) {
            console.error(err);
            throw new Error('Error al actualizar la receta');
        }
    }
}

module.exports = new RecipeService();