const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const usersFilePath = path.join(__dirname, 'users.json');

// lire users du JSON file
function getUsers() {
    if (!fs.existsSync(usersFilePath)) {
        fs.writeFileSync(usersFilePath, '[]'); // Create an empty array if the file doesn't exist
    }
    return JSON.parse(fs.readFileSync(usersFilePath));
}

// écrire users du JSON file
function saveUsers(users) {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}

// API Endpoint: ajout nouveau user
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    const users = getUsers();

    // verif si id existe 
    const userExists = users.some(u => u.userId === newUser.userId);
    if (userExists) {
        return res.status(400).json({ error: 'User ID already exists' });
    }

    users.push(newUser);
    saveUsers(users);
    res.status(201).json({ message: 'User added successfully' });
});

// API Endpoint: Fetch all users
app.get('/api/users', (req, res) => {
    const users = getUsers();
    res.status(200).json(users);
});

// API Endpoint: Authenticate user
app.post('/api/login', (req, res) => {
    const { userId, password } = req.body;
    const users = getUsers();
    const user = users.find(u => u.userId === userId && u.password === password);

    if (user) {
        res.status(200).json({ message: 'Login successful', user });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});