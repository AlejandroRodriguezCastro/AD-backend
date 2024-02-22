const Recipe = require('../models/recipe.model');
const User = require('../models/user.model');

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
            const recipe = await Recipe.findById(id);
            return recipe;
        }
        catch (err) {
            console.error(err);
            throw new Error('Error al obtener la receta');
        }
    }
    
    async getRecipeByUser(id) {
        try {
            const recipe = await Recipe.find({user: id});
            return recipe;
        }
        catch (err) {
            console.error(err);
            throw new Error('Error al obtener la receta');
        }
    }

    async getRecipesSortedByRating() {
        try {
            const recipes = await Recipe.find().sort({rating: -1});
            return recipes;
        }
        catch (err) {
            console.error(err);
            throw new Error('Error al obtener la receta');
        }
    }

    async getRecipeByTitle(title) {
        try {
            const recipes = await Recipe.find({title: {$regex: title, $options: 'i'}});
            return recipes;
        }
        catch (err) {
            console.error(err);
            throw new Error('Error al obtener la receta');
        }
    }

    async getRecipeByCategories(categories) {
        try {
            const recipes = await Recipe.find({categories: {$in: categories}});
            return recipes;
        }
        catch (err) {
            console.error(err);
            throw new Error('Error al obtener la receta');
        }
    }

    async getRecipeByIngredient(ingredient) {
        try {
            const recipes = await Recipe.find({ingredients: {$elemMatch: {name: {$regex: ingredient, $options: 'i'}}}});
            return recipes;
        }
        catch (err) {
            console.error(err);
            throw new Error('Error al obtener la receta');
        }
    }
    
    async getRecipeBySearch(query) {
        try {
            let title = query.title ? {title: {$regex: query.title, $options: 'i'}} : {};
            let categories = query.categories ? {categories: {$in: query.categories}} : {};
            let ingredients = query.ingredients ? {ingredients: {$elemMatch: {name: {$regex: query.ingredients, $options: 'i'}}}} : {};
            const recipes = await Recipe.find({$and: [title, categories, ingredients]});
            return recipes;
        }
        catch (err) {
            console.error(err);
            throw new Error('Error al obtener la receta');
        }
    }

    async createRecipe(recipe) {
        try {
            let newRecipe = new Recipe(recipe);
            let user = await User.findById(recipe.user);
            user.recipe.push(newRecipe);
            await newRecipe.save();
            return newRecipe;
        } catch (err) {
            console.error(err);
            throw new Error('Error al crear la receta');
        }
    }

    async updateRecipe(id, recipe) {
        try {
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
            const user = await User.findOne({recipes: id});
            user.recipe.pop(id);
            await user.save();
            return;
        } catch (err) {
            console.error(err);
            throw new Error('Error al eliminar la receta');
        }
    }
}

module.exports = new RecipeService();