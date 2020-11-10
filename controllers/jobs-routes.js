const router = require('express').Router();
const getJobs = require('../utils/scraper');

router.get('/', (req, res) => {
    //res.render('loading')
    
    getJobs("Utah", "Job")
    .then(response => res.render('jobs', {data: response, loggedIn: req.session.loggedIn}));



    
    
});

router.get('/load', (req, res) => {
    res.render('load', {loggedIn: req.session.loggedIn});

});


module.exports = router;