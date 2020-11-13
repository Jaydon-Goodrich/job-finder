async function clickCounter(event) {

    if (event.target.className === 'job-card') {

        const response = await fetch('/api/jobs/click', {
                method: 'POST',
                body: JSON.stringify({
                    job_url: event.target.childNodes[7].href,
                    job_name: event.target.childNodes[1].textContent,
                    location:event.target.childNodes[5].textContent,
                    company_name: event.target.childNodes[3].textContent
                })
            })
            if(response.ok) {
                console.log("Counter Incremented!")
            }
            else {
                console.log("Counter Update Failure")
            }
    }
};


//child nodes

document.querySelector('.con-card').addEventListener('click', clickCounter);