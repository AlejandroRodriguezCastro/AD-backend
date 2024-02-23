const express = require('express');
const router = express.Router();
const LikeController = require('../../controllers/like.controller');
const checkFields = require('../../middlewares/validateFields');
const { check } = require('express-validator');

router.get('/', LikeController.getLikes);

router.get('/:id', LikeController.getLikeById);

router.post('/',
    [   
        check('user', 'El usuario es requerido').not().isEmpty(),
        check('recipe', 'La receta es requerida').not().isEmpty(),
        checkFields
    ], 
    LikeController.createLike);

router.get('/:user/:recipe', LikeController.getLikeByUserAndRecipe);

router.post('/:user/:recipe', LikeController.changeLikeByUserAndRecipe);

router.put('/:id', LikeController.updateLike);

router.delete('/:id', LikeController.deleteLike);

module.exports = router;