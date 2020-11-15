const router = require('express').Router();
const withAuth = require('../utils/auth.js');
const db = require('../models');
const { User, Job } = require('../models');

//loads the dashboard view
router.get('/dashboard', withAuth, (req, res) => {
    User.findOne({
        attributes: ['id', 'username', 'email'],
        where: {
            id: req.session.user_id
        },
        include: [
            {
                model: Job,
                as: 'JobViews'
            }
        ]
    })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'These are not the droids you are looking for' })
                return;
            }
            res.render('dashboard', { data: dbUserData.get({ plain: true }).JobViews, loggedIn: req.session.loggedIn })
        })
        .catch(err => {
            res.status(500).json(err);
        })
})

module.exports = router;