const fetch = require("node-fetch");

function gitJobs(langauge, location) {
    fetch(`https://jobs.github.com/positions.json?description=${langauge}&location=${location}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
}


//There is nothing on github jobs for Utah or any city in Utah
gitJobs('javaScript', 'San Francisco');