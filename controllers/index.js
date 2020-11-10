const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const jobsRoutes = require('./jobs-routes');

router.use('/api', apiRoutes);
router.use('/jobs', jobsRoutes);
router.use('/', homeRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
