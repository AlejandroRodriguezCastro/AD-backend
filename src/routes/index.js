const express = require('express');
const router = express.Router();
const statusRoute = require('./status/status.routes');

const defaultRoutes = [
    {
        path: '/status',
        route: statusRoute,
    },
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

module.exports = router;