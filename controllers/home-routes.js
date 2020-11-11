const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('homepage', { loggedIn: req.session.loggedIn });
    
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/jobs/load', {loggedIn: req.session.loggedIn});
        return;
    }
    res.render('login');
});

module.exports = router;