const express = require('express');
const router = express.Router();
const statusRoute = require('./status/status.routes');
const likeRoute = require('./likes/like.routes');
const recipeRoute = require('./recipe/recipe.routes');
const userRoute = require('./user/user.routes');
const authRoute = require('./auth/auth.routes');

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
    },
    {
        path: '/auth',
        route: authRoute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;