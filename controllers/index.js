const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');
const jobsRoutes = require('./jobs-routes');
const userRoutes = require('./user-routes');

router.use('/api', apiRoutes);
router.use('/jobs', jobsRoutes);
router.use('/', homeRoutes);
router.use('/user', userRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
