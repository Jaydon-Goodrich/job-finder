async function clickCounter(event) {

    // job_url = event.target.childNodes[7].href.split(" ");
    job_url = event.target.childNodes[7].href.split(" ");
    place = event.target.childNodes[5].textContent;;

    job_name = event.target.childNodes[1].textContent;
    // location = event.target.childNodes[5].textContent;
    company_name = event.target.childNodes[3].textContent;
    

    if (event.target.className === 'job-card') {
    
        const response = await fetch('/api/jobs/click', {
                method: 'POST',
                body: JSON.stringify({
                    // job_url: event.target.childNodes[7].href.split(" "),
                    job_url,
                    job_name,
                    place,
                    company_name
                    // job_url: "Hello",
                    // job_name: event.target.childNodes[1].textContent,
                    // location:event.target.childNodes[5].textContent,
                    // company_name: event.target.childNodes[3].textContent
                }),
                headers: { 'Content-Type': 'application/json' }
            })
            if(response.ok) {
                console.log(response.json());
                window.open(job_url, '_blank');
            }
            else {
                console.log("Counter Update Failure")
            }
    }
};


//child nodes

document.querySelector('.con-card').addEventListener('click', clickCounter);