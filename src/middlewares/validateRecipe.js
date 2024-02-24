const { check } = require('express-validator');

const validateRecipe = [
    check('title', 'El nombre es requerido').isString().not().isEmpty(),
    check('description', 'La descripción es requerida').isString().not().isEmpty(),
    check('instructions', 'La preparación es requerida').isArray().not().isEmpty(),
    check('requiredTime', 'El tiempo de preparación debe ser un número').isNumeric().not().isEmpty(),
    check('portion', 'La porción debe ser un número').isNumeric().not().isEmpty(),
    check('category', 'La categoría es requerida').isArray().not().isEmpty(),
    check('calorie', 'Las calorías deben ser un número').isNumeric().not().isEmpty(),
    check('fat', 'Las grasas deben ser un número').isNumeric().not().isEmpty(),
    check('protein', 'Las proteínas deben ser un número').isNumeric().not().isEmpty(),
    check('sodium', 'El sodio debe ser un número').isNumeric().not().isEmpty(),
    check('video', 'El video debe ser un string').isString().optional(),
    check('ingredients', 'Los ingredientes son requeridos').isArray().not().isEmpty(),
    check('ingredients.*').custom((ingredient, { path }) => {
        if (typeof ingredient !== 'object' || !ingredient.name || !ingredient.quantity) {
            throw new Error(`Cada ingrediente debe ser un objeto con las propiedades 'name' and 'quantity'. Check ${path}`);
        }
        return true;
    })
];

module.exports = validateRecipe;