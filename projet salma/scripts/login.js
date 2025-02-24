// Hardcoded master keys
const masterKeys = [
    { username: 'admin', password: 'admin' },
    { username: 'pedrino', password: 'pedro' },
    { username: 'saloumi', password: 'amine' },
];

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Debugging: Log entered credentials
    console.log('Entered Username:', username);
    console.log('Entered Password:', password);

    // Check if the entered credentials match any of the master keys
    const isMasterKey = masterKeys.some(
        (cred) => cred.username === username && cred.password === password
    );

    if (isMasterKey) {
        // Login successful with master key
        localStorage.setItem('loggedInUser', username); // Store the logged-in user
        window.location.href = 'globlaWebSite1.html'; // Redirect to dashboard
        return;
    }

    // Check if the entered credentials match any user in localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const isValidUser = users.some(
        (user) => user.userId === username && user.password === password
    );

    // Debugging: Log users fetched from localStorage
    console.log('Users from localStorage:', users);

    if (isValidUser) {
        // Login successful with stored user
        localStorage.setItem('loggedInUser', username); // Store the logged-in user
        window.location.href = 'globlaWebSite1.html'; // Redirect to dashboard
    } else {
        // Login failed
        document.getElementById('errorMessage').style.display = 'block';
        document.getElementById('password').value = '';
    }
});