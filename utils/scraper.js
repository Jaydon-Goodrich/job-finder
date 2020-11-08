const { LinkedinScraper, relevanceFilter, timeFilter, events } = require("linkedin-jobs-scraper");

//initialize an array to store jobs in
let jobsArray = [];


// A function to print out the data we want to display
const printJobs = (arr) => {
    for(let i = 0; i < arr.length; i++ ){
        console.log(arr[i].title);
        console.log(arr[i].company);
        console.log(arr[i].link);
    } 
}

// Takes two parameters for now we can adjust if we have more search filters we want to apply
async function getJobs(location, jobType) {
    
    //Declares a new scraper instance
    const scraper = new LinkedinScraper({
        //random crap we need IDK why
        headless: true,
        slowMo: 50,
        args: [
            "--lang=en-US",
        ],
    });

    // Add listeners for scraper events
    scraper.on(events.scraper.data, (data) => {
        jobsArray.push(data);
        
        //various properties we can pull out of data and add to the view
        
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

    // Run queries concurrently    
    await Promise.all([
        scraper.run({
            query: jobType,
            options: {
                //We can scrape as many results as we need
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

//Call the function pass in place and job type
getJobs("Utah", "Engineer");
