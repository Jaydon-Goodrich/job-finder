const fetch = require('node-fetch');

function gitJobs(location, jobType) {

    fetch(`https://jobs.github.com/positions.json?description=${jobType}&location=${location}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })

}

//There are no jobs in Utah so hopefully people want to relocate
gitJobs('San Francisco', 'JavaScript');