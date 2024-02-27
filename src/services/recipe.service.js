const Recipe = require('../models/recipe.model');
const User = require('../models/user.model');

class RecipeService {
    async getRecipes(page = 1, limit = 10) {
        try {
            const recipes = await Recipe.find()
                .limit(limit)
                .skip((page-1) * limit)
                .exec();
            const totalCount = await Recipe.countDocuments();
            return { recipes, totalPages: Math.ceil(totalCount / limit), currentPage: parseInt(page) };
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
    
    async getRecipeByUser(id, page = 1, limit = 10) {
        try {
            const recipes = await Recipe.find({user: id})
                .limit(limit)
                .skip((page-1) * limit)
                .exec();
            const totalCount = await Recipe.find({user: id}).countDocuments();
            return { recipes, totalPages: Math.ceil(totalCount / limit), currentPage: parseInt(page) };
        }
        catch (err) {
            console.error(err);
            throw new Error('Error al obtener la receta');
        }
    }

    async getRecipesSortedByRating(page = 1, limit = 10) {
        try {
            const recipes = await Recipe.find().sort({rating: -1})
                .limit(limit)
                .skip((page-1) * limit)
                .exec();
            const totalCount = await Recipe.countDocuments();
            return { recipes, totalPages: Math.ceil(totalCount / limit), currentPage: parseInt(page) };
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

    async getRecipeBycategory(category) {
        try {
            const recipes = await Recipe.find({category: {$in: category}});
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
    
    async getRecipeBySearch(query, page = 1, limit = 10) {
        try {
            let title = query.title ? {title: {$regex: query.title, $options: 'i'}} : {};
            let category = query.category ? {category: {$in: query.category}} : {};
            let ingredients = query.ingredients ? {ingredients: {$elemMatch: {name: {$regex: query.ingredients, $options: 'i'}}}} : {};
            let order = query.order ? query.order : 'asc';
            let sort = {};
            if (query.sort) {
                sort[query.sort] = order === 'asc' ? 1 : -1;
            }
            const recipes = await Recipe.find({$and: [title, category, ingredients]})
                .sort(sort)
                .limit(limit)
                .skip((page-1) * limit)
                .exec();
            const totalCount = await Recipe.find({$and: [title, category, ingredients]}).countDocuments();
            return { recipes, totalPages: Math.ceil(totalCount / limit), currentPage: parseInt(page) };
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

    async patchRecipe(id, recipe) {
        try {
            let patchedRecipe = await Recipe.findByIdAndUpdate(
                id,
                { $set: recipe },
                { new: true, useFindAndModify: false }
            );
            return patchedRecipe;
        }
        catch (err) {
            console.error(err);
            throw new Error('Error al actualizar la receta');
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
            return;
        } catch (err) {
            console.error(err);
            throw new Error('Error al eliminar la receta');
        }
    }
}

module.exports = new RecipeService();