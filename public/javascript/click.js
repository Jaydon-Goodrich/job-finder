// increments the job, and saves it in the database.
async function clickCounter(event) {
    //finds the event target
    let jobCardEl = event.target;
    //while the object is not the parent, assign it to the parent
    while (jobCardEl.className !== 'job-card') {
        jobCardEl = jobCardEl.parentNode;
    }

    // packages the data
    job_url = jobCardEl.childNodes[7].href;
    place = jobCardEl.childNodes[5].textContent;
    job_name = jobCardEl.childNodes[1].textContent;
    company_name = jobCardEl.childNodes[3].textContent;

    // poststs the data
    const response = await fetch('/api/jobs/click', {
        method: 'POST',
        body: JSON.stringify({
            job_url,
            job_name,
            place,
            company_name
        }),
        headers: { 'Content-Type': 'application/json' }
    })

    //status messages
    if (response.ok) {
        console.log('incremented!');
        window.open(job_url, '_blank');
    }
    else {
        console.log("Counter Update Failure");
    }
};