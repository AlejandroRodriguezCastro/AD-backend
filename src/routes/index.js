const express = require('express');
const router = express.Router();
const statusRoute = require('./status/status.routes');
const likeRoute = require('./likes/like.routes');

const defaultRoutes = [
    {
        path: '/status',
        route: statusRoute,
    },
    {
        path: '/likes',
        route: likeRoute,
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;