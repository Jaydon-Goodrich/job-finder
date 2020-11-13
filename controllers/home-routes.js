const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage', { loggedIn: req.session.loggedIn });
    
});

router.get('/login', (req, res) => {
    console.log("crap")
    if (req.session.loggedIn) {
        console.log("session details",req.session)
        res.redirect('/jobs/load', {loggedIn: req.session.loggedIn});
        return;
    }
    res.render('login');
});

module.exports = router;