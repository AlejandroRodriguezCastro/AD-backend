const express = require('express');
const router = express.Router();
const statusRoute = require('./status/status.routes');
const likeRoute = require('./likes/like.routes');
const recipeRoute = require('./recipes/recipe.routes');
const userRoute = require('./users/user.routes');

const defaultRoutes = [
    {
        path: '/status',
        route: statusRoute,
    },
    {
        path: '/likes',
        route: likeRoute,
    },
    {
        path: '/recipes',
        route: recipeRoute,
    },
    {
        path: '/users',
        route: userRoute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;