const express = require('express');
const router = express.Router();
const RecipeController = require('../../controllers/recipe.controller');
const checkFields = require('../../middlewares/validateFields');
const validateRecipe = require('../../middlewares/validateRecipe');
const { check } = require('express-validator');
const upload = require('../../middlewares/imageUploader');
const convertFormDataToJson = require('../../middlewares/convertFormDataToJson');

router.get('/', RecipeController.getRecipes);

router.get('/:id', RecipeController.getRecipeById);

router.get('/user/:id', RecipeController.getRecipeByUser);

router.get('/ingredient/:ingredient', RecipeController.getRecipeByIngredient);

router.get('/search/by', RecipeController.getRecipeBySearch);

router.post('/recipeWithPhoto',
    [
        upload.array('image', 5),
        convertFormDataToJson,
        validateRecipe,
        checkFields
    ],
    RecipeController.createRecipeWithPhoto);

router.post('/',
    [
        validateRecipe,
        checkFields
    ],
    RecipeController.createRecipe);

router.put('/:id',
    [
        validateRecipe,
        checkFields
    ],
    RecipeController.updateRecipe);

router.delete('/:id', RecipeController.deleteRecipe);

router.patch('/:id',
    [
        checkFields
    ],
    RecipeController.patchRecipe);

module.exports = router;