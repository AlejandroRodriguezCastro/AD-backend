const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user.controller');
const checkFields = require('../../middlewares/validateFields');

router.get('/', UserController.getUsers);

router.get('/:id', UserController.getUserById);

router.post('/',
    [
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').not().isEmpty(),
        check('password', 'La contraseña es requerida').not().isEmpty(),
        checkFields
    ],
    UserController.createUser);

router.put('/:id',
    [
        check('name', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').not().isEmpty(),
        check('password', 'La contraseña es requerida').not().isEmpty(),
        checkFields
    ],
    UserController.updateUser);

router.delete('/:id', UserController.deleteUser);

module.exports = router;