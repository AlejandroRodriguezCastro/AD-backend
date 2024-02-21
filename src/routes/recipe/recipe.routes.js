const express = require('express');
const router = express.Router();
const RecipeController = require('../../controllers/recipe.controller');
const checkFields = require('../../middlewares/validateFields');
const { check } = require('express-validator');

router.get('/', RecipeController.getRecipes);

router.get('/:id', RecipeController.getRecipeById);

router.get('/user/:id', RecipeController.getRecipeByUser);

router.get('/ingredient/:ingredient', RecipeController.getRecipeByIngredient);

router.post('/',
    [
        check('title', 'El nombre es requerido').not().isEmpty(),
        check('ingredients', 'Los ingredientes son requeridos').not().isEmpty(),
        check('instructions', 'La preparación es requerida').not().isEmpty(),
        checkFields
    ],
    RecipeController.createRecipe);

router.put('/:id',
    [
        check('title', 'El nombre es requerido').not().isEmpty(),
        check('ingredients', 'Los ingredientes son requeridos').not().isEmpty(),
        check('instructions', 'La preparación es requerida').not().isEmpty(),
        checkFields
    ],
    RecipeController.updateRecipe);

router.delete('/:id', RecipeController.deleteRecipe);

router.patch('/:id',
    [
        check('title', 'El nombre es requerido').not().isEmpty(),
        check('ingredients', 'Los ingredientes son requeridos').not().isEmpty(),
        check('instructions', 'La preparación es requerida').not().isEmpty(),
        checkFields
    ],
    RecipeController.patchRecipe);

module.exports = router;