document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting the traditional way

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    axios.post('https://api.example.com/auth/login', {
        username: username,
        password: password
    })
    .then(response => {
        if (response.data.success) {
            alert('Login successful!');
            // redirection vers next page 
        } else {
            document.getElementById('error-message').innerText = 'Invalid username or password.';
        }
    })
    .catch(error => {
        console.error('There was an error!', error);
        document.getElementById('error-message').innerText = 'An error occurred. Please try again later.';
    });
});