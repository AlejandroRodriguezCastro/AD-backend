const express = require('express');
const router = express.Router();
const RecipeController = require('../../controllers/recipe.controller');
const checkFields = require('../../middlewares/validateFields');
const { check } = require('express-validator');

router.get('/', RecipeController.getRecipes);

router.get('/:id', RecipeController.getRecipeById);

router.post('/',
    [
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('ingredients', 'Los ingredientes son requeridos').not().isEmpty(),
        check('preparation', 'La preparación es requerida').not().isEmpty(),
        checkFields
    ],
    RecipeController.createRecipe);

router.put('/:id',
    [
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('ingredients', 'Los ingredientes son requeridos').not().isEmpty(),
        check('preparation', 'La preparación es requerida').not().isEmpty(),
        checkFields
    ],
    RecipeController.updateRecipe);

router.delete('/:id', RecipeController.deleteRecipe);

router.patch('/:id',
    [
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('ingredients', 'Los ingredientes son requeridos').not().isEmpty(),
        check('preparation', 'La preparación es requerida').not().isEmpty(),
        checkFields
    ],
    RecipeController.patchRecipe);

module.exports = router;