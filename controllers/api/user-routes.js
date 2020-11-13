const router = require('express').Router();
const withAuth = require('../../utils/auth.js');
const { User, Job} = require('../../models');

// get /api/users
router.get('/', (req, res) => {
    User.findAll({
        include: [
            {
                model: Job,
                attributes: ['id', 'job_name', 'job_url'],
                as: 'JobViews'
            }
        ]
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

//get /api/users/?
//withauth,
router.get('/:id', (req, res) => {
// router.get('/:id', (req, res) => {
    User.findOne({
        attributes: ['id', 'username', 'email'],
        where: {
            id: req.params.id
        },
        include: [
            {
                model: Job,
                attributes: ['id', 'job_name', 'job_url'],
                as: 'JobViews'
            }
        ]
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({message: 'These are not the droids you are looking for'})
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
})

// add new user to db
router.post('/', (req, res) => {
    //expects {username: string, email: string, password: string}
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    })
})

router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).json({message: 'no user found with that email'})
            return;
        }
        const passwordResult = dbUserData.verifyPassword(req.body.password);

        if(!passwordResult) {
            res.status(400).json({message: 'wrong password'})
            return;
        }
        req.session.save(() => {
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json({user: dbUserData, message: "Login successful"})
            return;
        })
    })
})

router.post('/logout', (req, res) => {
    if(req.session.loggedIn){
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else{
        res.status(404).end();
    }
});

module.exports = router;