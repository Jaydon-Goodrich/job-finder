//This is for testing api end points for now

const router = require('express').Router();
const homeRoutes = require('./home-routes');

router.use('/', homeRoutes);

module.exports = router;
