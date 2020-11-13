const router = require('express').Router();
const withAuth = require('../utils/auth.js');
const db = require('../models');

router.get('/', withAuth, (req, res) => {
	console.log(req.session);

	db.User.findAll({
		where: {
			user_id: req.session.user_id
		},
		include: [db.Job]
	}).then(dbRes => {
		console.log(dbRes);
		res.render('viewedJobs', { data: dbRes });
	}).catch(err => res.json(err));

	// db.PageView.findAll({
	//     where: {
	//         user_id: req.session.user_id
	// 		},
	// 		include: [db.Job]
	// }).then(dbRes => {
	//     console.log(dbRes);
	//     res.render('viewedJobs', { data: dbRes});
	// }).catch(err => res.json(err));
});

module.exports = router;