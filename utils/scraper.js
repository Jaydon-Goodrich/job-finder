const { LinkedinScraper, relevanceFilter, timeFilter, events } = require("linkedin-jobs-scraper");

//Empty array to push the jobs into once they have been scraped
let jobsArray = [];

//Print out whats in the array we can adjust for what we want to display
const printJobs = (arr) => {
    for(let i = 0; i < arr.length; i++ ){
        console.log(arr[i].title);
        console.log(arr[i].company);
        console.log(arr[i].link);
    }

    //console this out to see everything that comes back
    // console.log(arr[1]);
}

//Function for scraping the jobs based on location and jobType, we can add more parameters if needed
async function getJobs(location, jobType) {
    jobsArray = [];
    //creates a new scraper object
    const scraper = new LinkedinScraper({
        //Not sure what this crap is but we need it
        headless: true,
        slowMo: 50,
        args: [
            "--lang=en-US",
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ],
    });

    
    scraper.on(events.scraper.data, (data) => {
        jobsArray.push(data);
        
        // List of stuff we can use from what comes back
        // console.log(
        //     data.description.length,
        //     data.descriptionHTML.length,
        //     `Query='${data.query}'`,
        //     `Location='${data.location}'`,
        //     `Id='${data.jobId}'`,
        //     `Title='${data.title}'`,
        //     `Company='${data.company ? data.company : "N/A"}'`,
        //     `Place='${data.place}'`,
        //     `Date='${data.date}'`,
        //     `Link='${data.link}'`,
        //     `applyLink='${data.applyLink ? data.applyLink : "N/A"}'`,
        //     `senorityLevel='${data.senorityLevel}'`,
        //     `function='${data.jobFunction}'`,
        //     `employmentType='${data.employmentType}'`,
        //     `industries='${data.industries}'`,
        // );
    });

    scraper.on(events.scraper.error, (err) => {
        console.error(err);
    });

    scraper.on(events.scraper.end, () => {
        console.log('All done!');
    });

    // Custom function executed on browser side to extract job description
    const descriptionFn = () => document.querySelector(".description__text")
        .innerText
        .replace(/[\s\n\r]+/g, " ")
        .trim();

    await Promise.all([
        scraper.run({
            query: jobType,
            options: {
                //We can change the limit to how ever many we need
                limit: 5,
                locations: [location],
                descriptionFn: descriptionFn,
                filters: {
                    relevance: relevanceFilter.RELEVANT,
                    time: timeFilter.MONTH,
                }
            }
        })
    ]);
    //printJobs(jobsArray);
    // Close browser
    await scraper.close();

    return jobsArray;
};

//Call the function and pass location and jobType


module.exports = getJobs;