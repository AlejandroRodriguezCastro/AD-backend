const Recipe = require('../models/recipe.model');
const Ingredient = require('../models/ingredient.model');

class RecipeService {
    async getRecipes() {
        try {
            const recipes = await Recipe.find().populate('ingredients', 'name quantity');
            return recipes;
        } catch (err) {
            console.error(err);
            throw new Error('Error al obtener las recetas');
        }
    }

    async getRecipeById(id) {
        try {
            const recipe = await Recipe.findById(id).populate('ingredients', 'name quantity');
            return recipe;
        }
        catch (err) {
            console.error(err);
            throw new Error('Error al obtener la receta');
        }
    }
    
    async getRecipeByUser(id) {
        try {
            const recipe = await Recipe.find({user: id}).populate('ingredients', 'name quantity');
            return recipe;
        }
        catch (err) {
            console.error(err);
            throw new Error('Error al obtener la receta');
        }
    }

    async createRecipe(recipe) {
        try {
            recipe.ingredients = await Promise.all(recipe.ingredients.map(async ingredient => {
                let newIngredient = new Ingredient(ingredient);
                await newIngredient.save();
                return newIngredient;
            }));
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
            recipe.ingredients = await Promise.all(recipe.ingredients.map(async ingredient => {
                if (ingredient._id) {
                    await Ingredient.findByIdAndUpdate(ingredient._id, ingredient);
                    return ingredient;
                } else {
                    let newIngredient = new Ingredient(ingredient);
                    await newIngredient.save();
                    return newIngredient;
                }
            }));
            let updatedRecipe = await Recipe.findByIdAndUpdate(
                id,
                { $set: recipe },
                { new: true, useFindAndModify: false }
            );
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
            recipe.ingredients = await Promise.all(recipe.ingredients.map(async ingredient => {
                if (ingredient._id) {
                    await Ingredient.findByIdAndUpdate(ingredient._id, ingredient);
                    return ingredient;
                } else {
                    let newIngredient = new Ingredient(ingredient);
                    await newIngredient.save();
                    return newIngredient;
                }
            }));
            let updatedRecipe = await Recipe.findByIdAndUpdate(
                id,
                { $set: recipe },
                { new: true, useFindAndModify: false }
            );
            return updatedRecipe;
        } catch (err) {
            console.error(err);
            throw new Error('Error al actualizar la receta');
        }
    }
}

module.exports = new RecipeService();