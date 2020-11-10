const { LinkedinScraper, relevanceFilter, timeFilter, events } = require("linkedin-jobs-scraper");

<<<<<<< HEAD
//initialize an array to store jobs in
let jobsArray = [];


// A function to print out the data we want to display
=======
//Empty array to push the jobs into once they have been scraped
let jobsArray = [];

//Print out whats in the array we can adjust for what we want to display
>>>>>>> b6a7a9a48be4ee28f7829cf28477a1c9ceca91a9
const printJobs = (arr) => {
    for(let i = 0; i < arr.length; i++ ){
        console.log(arr[i].title);
        console.log(arr[i].company);
        console.log(arr[i].link);
<<<<<<< HEAD
    } 
}

// Takes two parameters for now we can adjust if we have more search filters we want to apply
async function getJobs(location, jobType) {
    
    //Declares a new scraper instance
    const scraper = new LinkedinScraper({
        //random crap we need IDK why
=======
    }

    //console this out to see everything that comes back
    // console.log(arr[1]);
}

//Function for scraping the jobs based on location and jobType, we can add more parameters if needed
async function getJobs(location, jobType) {
    
    //creates a new scraper object
    const scraper = new LinkedinScraper({
        //Not sure what this crap is but we need it
>>>>>>> b6a7a9a48be4ee28f7829cf28477a1c9ceca91a9
        headless: true,
        slowMo: 50,
        args: [
            "--lang=en-US",
        ],
    });

<<<<<<< HEAD
    // Add listeners for scraper events
    scraper.on(events.scraper.data, (data) => {
        jobsArray.push(data);
        
        //various properties we can pull out of data and add to the view
        
=======
    
    scraper.on(events.scraper.data, (data) => {
        jobsArray.push(data);
        
        // List of stuff we can use from what comes back
>>>>>>> b6a7a9a48be4ee28f7829cf28477a1c9ceca91a9
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

<<<<<<< HEAD
    // Run queries concurrently    
=======
>>>>>>> b6a7a9a48be4ee28f7829cf28477a1c9ceca91a9
    await Promise.all([
        scraper.run({
            query: jobType,
            options: {
<<<<<<< HEAD
                //We can scrape as many results as we need
=======
                //We can change the limit to how ever many we need
>>>>>>> b6a7a9a48be4ee28f7829cf28477a1c9ceca91a9
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
    printJobs(jobsArray);
    // Close browser
    await scraper.close();
};

<<<<<<< HEAD
//Call the function pass in place and job type
=======
//Call the function and pass location and jobType
>>>>>>> b6a7a9a48be4ee28f7829cf28477a1c9ceca91a9
getJobs("Utah", "Engineer");
