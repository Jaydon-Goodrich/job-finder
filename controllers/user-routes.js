const router = require('express').Router();
const withAuth = require('../utils/auth.js');
const db = require('../models');

router.get('/', withAuth, (req, res) => {
		console.log(req.session);
		
		db.PageView.findAll({}).then(dbRes => {
			console.log(dbRes);
			res.render('viewedJobs', dbRes);
		}).catch(err => res.json(err));
});

module.exports = router;