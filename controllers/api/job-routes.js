const router = require('express').Router();
const withAuth = require('../../utils/auth.js');
const { User, Job, PageView } = require('../../models')

//posts a job to the database
router.post('/click', (req, res) => {

    //checks that there is not a duplicate job
    Job.findOne({
        where: {
            job_url: req.body.job_url
        }
    })
    //then
        .then(dbJobData => {
            //if the data is there
            if (!dbJobData) {

                //creates a new  job model with the data
                Job.create({
                    job_url: req.body.job_url,
                    job_name: req.body.job_name,
                    place: req.body.place,
                    company_name: req.body.company_name
                })
                    .then(dbJobData => {
                        //creates a new pageview model with the data
                        PageView.create({
                            user_id: req.session.user_id,
                            job_id: dbJobData.id,
                            counter: 1
                        })
                            .then(dbPageView => res.json(dbPageView))
                            .catch(err => {
                                res.status.apply(500).json(err)
                            })
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
            }
            else {
                //finds a new pageview
                PageView.findOne({
                    where: {
                        user_id: req.session.user_id,
                        job_id: dbJobData.id
                    }
                })
                    .then(dbViewData => {
                        //if it's not empty
                        if (!dbViewData) {
                            //creates a new pageview
                            PageView.create({
                                user_id: req.session.user_id,
                                job_id: dbJobData.id
                            })
                                .then(dbAddView => res.json(dbAddView))
                                .catch(err => {
                                    res.status(500).json(err)
                                })
                        }
                        else {
                            //updates the existing pageview by incrementing it.
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
                                    res.status(500).json(err)
                                })
                        }
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
            }
        }).catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;