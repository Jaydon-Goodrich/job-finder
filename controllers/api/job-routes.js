const router = require('express').Router();
const withAuth = require('../../utils/auth.js');
const { User, Job, PageView } = require('../../models')

router.post('/click', (req, res) => {
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
                    company_name: req.body.company_name

                })
                    .then(dbJobData => {
                        PageView.create({
                            user_id: req.body.user_id,
                            job_id: dbJobData.id,
                            counter: 1
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
                PageView.findOne({
                    where: {
                        user_id: req.body.user_id,
                        job_id: dbJobData.id
                    }
                })
                    .then(dbViewData => {
                        if (!dbViewData) {
                            PageView.create({
                                user_id: req.body.user_id,
                                job_id: dbJobData.id
                            })
                                .then(dbAddView => res.json(dbAddView))
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json(err)
                                })
                        }
                        else {
                            PageView.update(
                                {
                                    user_id: dbViewData.user_id,
                                    job_id: dbViewData.job_id,
                                    counter: dbViewData.counter + 1,
                                },
                                {
                                    where: {
                                        id: dbViewData.id
                                    }
                                })
                                .then(dbUpdateView => res.json(dbUpdateView))
                                .catch(err => {
                                    console.log(err);
                                    res.status(500).json(err)
                                })
                        }
                    })
            }
        })
})

module.exports = router;