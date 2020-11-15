async function clickCounter(event) {

    let jobCardEl = event.target;
    while (jobCardEl.className !== 'job-card') {
        jobCardEl = jobCardEl.parentNode;
    }

    job_url = jobCardEl.childNodes[7].href;
    place = jobCardEl.childNodes[5].textContent;
    job_name = jobCardEl.childNodes[1].textContent;
    company_name = jobCardEl.childNodes[3].textContent;

    console.log(job_url, place, job_name, company_name);

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

    if (response.ok) {
        console.log('incremented!');
        window.open(job_url, '_blank');
    }
    else {
        console.log("Counter Update Failure")
    }
};