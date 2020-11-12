
function searchJob(event) {
    event.preventDefault();

    const jobType = document.querySelector('#jobType').value.trim();
    const location = document.querySelector('#loc').value.trim();


    document.location.replace(`/jobs/new/${jobType}&${location}`);

    console.log(searchJob);
}



document.querySelector('.job-search').addEventListener('submit', searchJob);