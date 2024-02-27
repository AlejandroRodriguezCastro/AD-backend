const { check } = require('express-validator');

const validateRecipe = [
    check('title', 'El nombre es requerido').isString(),
    check('description', 'La descripción es requerida').isString(),
    check('instructions', 'La preparación es requerida').isArray(),
    check('requiredTime', 'El tiempo de preparación debe ser un número').isNumeric(),
    check('portion', 'La porción debe ser un número').isNumeric(),
    check('category', 'La categoría es requerida').isArray(),
    check('calorie', 'Las calorías deben ser un número').isNumeric(),
    check('fat', 'Las grasas deben ser un número').isNumeric(),
    check('protein', 'Las proteínas deben ser un número').isNumeric(),
    check('sodium', 'El sodio debe ser un número').isNumeric(),
    check('video', 'El video debe ser un string').isString().optional(),
    check('ingredients', 'Los ingredientes son requeridos').isArray(),
    check('ingredients.*').custom((ingredient, { path }) => {
        if (typeof ingredient !== 'object' || !ingredient.name || !ingredient.quantity) {
            throw new Error(`Cada ingrediente debe ser un objeto con las propiedades 'name' and 'quantity'. Check ${path}`);
        }
        return true;
    })
];

module.exports = validateRecipe;