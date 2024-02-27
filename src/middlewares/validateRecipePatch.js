const { check } = require('express-validator');

const validateRecipePatch = [
    check('title', 'El nombre es requerido').isString().optional(),
    check('description', 'La descripción es requerida').isString().optional(),
    check('instructions', 'La preparación es requerida').isArray().optional(),
    check('requiredTime', 'El tiempo de preparación debe ser un número').isNumeric().optional(),
    check('portion', 'La porción debe ser un número').isNumeric().optional(),
    check('category', 'La categoría es requerida').isArray().optional(),
    check('calorie', 'Las calorías deben ser un número').isNumeric().optional(),
    check('fat', 'Las grasas deben ser un número').isNumeric().optional(),
    check('protein', 'Las proteínas deben ser un número').isNumeric().optional(),
    check('sodium', 'El sodio debe ser un número').isNumeric().optional(),
    check('video', 'El video debe ser un string').isString().optional(),
    check('ingredients', 'Los ingredientes son requeridos').isArray().optional(),
    check('ingredients.*').custom((ingredient, { path }) => {
        if (typeof ingredient !== 'object' || !ingredient.name || !ingredient.quantity) {
            throw new Error(`Cada ingrediente debe ser un objeto con las propiedades 'name' and 'quantity'. Check ${path}`);
        }
        return true;
    })
];

module.exports = validateRecipePatch;