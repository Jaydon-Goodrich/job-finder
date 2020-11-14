const router = require('express').Router();
const withAuth = require('../../utils/auth.js');
const { User, Job, PageView } = require('../../models')

router.post('/click', (req, res) => {

    console.log(req.body);  
    console.log(req.body.job_url[0]);   
    Job.findOne({
        where: {
            job_url: req.body.job_url[0]
        }
    })
        .then(dbJobData => {
            console.log(dbJobData);
            if (!dbJobData) {
                Job.create({
                    job_url: req.body.job_url[0],
                    job_name: req.body.job_name,
                    place: req.body.place,
                    company_name: req.body.company_name
                })
                    .then(dbJobData => {
                        PageView.create({
                            user_id: req.session.user_id,
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
                        user_id: req.session.user_id,
                        job_id: dbJobData.id
                    }
                })
                    .then(dbViewData => {
                        if (!dbViewData) {
                            PageView.create({
                                user_id: req.session.user_id,
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
                    .catch(err => {
                        console.log(err);
                        res.status(500).json(err)
                    })
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json(err)
        })
})

module.exports = router;