

async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && email && password) {
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log("Response:  ", response)
        if (response.ok) {
            console.log('success');
            document.location.replace('/jobs/load');
        }
        else {
            alert(response.statusText);
        }
    }
}

async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        }).then(res => res.json())
            .then((data) => {
                console.log("Data", data)
                const response1 = fetch('/api/users/' + data.id, {
                    method: 'get',
                    headers: { 'Content-Type': 'application/json' }
                })
                    .then(my => my.json())
                    .then(stuff => {
                        console.log('arg', stuff)
                    })
            })

    }
}
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);