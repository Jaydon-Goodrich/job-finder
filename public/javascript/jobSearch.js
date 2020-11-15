// pulls up a new search with the parameters in the search bar
function searchJob(event) {
    event.preventDefault();

    const jobType = document.querySelector('#jobType').value.trim();
    const location = document.querySelector('#loc').value.trim();


    document.location.replace(`/jobs/new/${jobType}&${location}`);
}



document.querySelector('.job-search').addEventListener('submit', searchJob);