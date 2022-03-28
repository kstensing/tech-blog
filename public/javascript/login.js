async function signupFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        //   if (response.ok) {
        //     document.location.replace('/dashboard/');
        //   } else {
        //     alert(response.statusText);
        //   }
    }
};

async function loginFormHandler(event) {
    event.preventDefault();

    const username = document.querySelector('#login-email').value.trim();
    const password = document.querySelector('#login-password').value.trim();

    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }
}
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.register-form').addEventListener('submit', signupFormHandler);