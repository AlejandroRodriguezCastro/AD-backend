const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user.controller');
const checkFields = require('../../middlewares/validateFields');
const { check } = require('express-validator');

router.get('/', UserController.getUsers);

router.get('/:id', UserController.getUserById);

router.get('/favorite/:id', UserController.getFavoriteRecipes);

router.post('/favorite/:id/:recipe', UserController.setUserFavoriteRecipe);

router.delete('/favorite/:id/:recipe', UserController.deleteUserFavoriteRecipe);

router.post('/',
    [
        check('username', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').not().isEmpty(),
        check('password', 'La contraseña es requerida').not().isEmpty(),
        checkFields
    ],
    UserController.createUser);

router.put('/:id',
    [
        check('username', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').not().isEmpty(),
        check('password', 'La contraseña es requerida').not().isEmpty(),
        checkFields
    ],
    UserController.updateUser);

router.delete('/:id', UserController.deleteUser);

module.exports = router;