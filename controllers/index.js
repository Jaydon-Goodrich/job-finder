const router = require('express').Router();

const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.status(404).end();
  });
  
  module.exports = router;
const homeRoutes = require('./home-routes');

router.use('/', homeRoutes);

module.exports = router;
