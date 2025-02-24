// Function to get users from localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// Fct d'aff des users
function displayUsers() {
    const table = document.getElementById('userTable');
    table.innerHTML = ''; // Clear existing data

    const users = getUsers();

    // Debugging: Log users fetched from localStorage
    console.log('Users from localStorage:', users);

    users.forEach((user) => {
        const row = `
            <tr>
                <td>${user.employeeNumber}</td>
                <td>${user.lastName}</td>
                <td>${user.firstName}</td>
                <td>${user.store}</td>
                <td>${user.mission}</td>
                <td>${user.recruitmentDate}</td>
                <td>${user.startDate}</td>
                <td>${user.userId}</td>
                <td>${user.lastLogin || 'N/A'}</td>
                <td>
                    <button class="btn btn-danger btn-sm" onclick="deleteUser('${user.userId}')">Supprimer</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

// Fct supp user
function deleteUser(userId) {
    const users = getUsers();
    const index = users.findIndex(u => u.userId === userId);
    if (index !== -1) {
        users.splice(index, 1);
        localStorage.setItem('users', JSON.stringify(users)); // màj localStorage
        displayUsers(); // Refresh the table
        alert('User deleted successfully!');
    } else {
        alert('Error deleting user: User not found');
    }
}

// aff user si la page se raffréchit
document.addEventListener('DOMContentLoaded', displayUsers);