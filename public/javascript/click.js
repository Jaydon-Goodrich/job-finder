async function clickCounter(event) {
    // query selectors go here!



    const response = await fetch('/jobs/click', {
        method: 'post',
        body: JSON.stringify({
            job_url: '',
            job_name: '',
            location: '',
            company_name: ''
        })
    })
    if(response.ok) {
        console.log("Counter Incremented!")
    }
    else {
        console.log("Counter Update Failure")
    }
};

