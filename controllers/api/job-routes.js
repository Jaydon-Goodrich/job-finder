const router = require('express').Router();
const withAuth = require('../../utils/auth.js');
const { User, Job, PageView } = require('../../models')

router.post('/click', (req, res) => {
    // console.log(req.body)
    // console.log(req.session.user_id)

    Job.findOne({
        where: {
            job_url: req.body.job_url
        }
    })
        .then(dbJobData => {
            if (!dbJobData) {
                Job.create({
                    job_url: req.body.job_url,
                    job_name: req.body.job_name,
                    location: req.body.location,
                    company_name: req.body.company_name,

                })
                    .then(dbJobData => {
                        PageView.create({
                            user_id: req.body.user_id,
                            job_id: dbJobData.id
                        })
                        .then(dbPageView => res.json(dbPageView))
                        .catch(err => {
                            console.log(err);
                            res.status.apply(500).json(err)
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json(err)
                    })
            }
            else {
                PageView.create({
                    user_id: req.body.user_id,
                    job_id: dbJobData.id
                })
                .then(dbPageView => res.json(dbPageView))
                .catch(err => {
                    console.log(err);
                    res.status(500).json(err)
                })
            }

        })



})

module.exports = router;