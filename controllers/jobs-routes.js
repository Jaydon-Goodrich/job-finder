const router = require('express').Router();
const getJobs = require('../utils/scraper');

router.get('/', (req, res) => {

    getJobs("Utah", "Job")
        .then(response => res.render('jobs', {
            loggedIn: req.session.loggedIn,
            data: response
        }));
});

router.get('/load', (req, res) => {
    res.render('load', { loggedIn: req.session.loggedIn });
});

router.get('/new/:id', (req, res) => {
    let newArr = req.params.id.split('&');
    let loc = newArr[0];
    let job = newArr[1];

    getJobs(job, loc)
        .then(response => res.render('search', { data: response, loggedIn: req.session.loggedIn }));
});

module.exports = router;