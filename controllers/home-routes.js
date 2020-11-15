const router = require('express').Router();

router.get('/', (req, res) => {
    //if the user is logged in then redirect to the dashboard
    if (req.session.loggedIn) {
        res.redirect('/user/dashboard');
        return;
    }
    // else load the homepage
    res.render('homepage', { loggedIn: req.session.loggedIn });
});

router.get('/login', (req, res) => {
    //if the user is logged in then redirect to the dashboard
    if (req.session.loggedIn) {
        res.redirect('/user/dashboard', {loggedIn: req.session.loggedIn});
        return;
    }
    // else load the login page.
    res.render('login');
});

module.exports = router;