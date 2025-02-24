// fct de récuperation des utilisateurs du localStorage
function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

// fct d'enregistrement des utilisateurs dans le localStorage
function saveUsers(users) {
    localStorage.setItem('users', JSON.stringify(users));
}

// fct du popup
function showPopup(type, message) {
    const popup = document.getElementById('popupMessage');
    const popupGif = document.getElementById('popupGif');
    const popupText = document.getElementById('popupText');
    const blurOverlay = document.getElementById('blurOverlay');

    if (type === 'success') {
        popupGif.src = 'images/check.gif'; // Success GIF
        popupText.textContent = message;
    } else {
        popupGif.src = 'images/error.gif'; // Error GIF
        popupText.textContent = message;
    }

    // popup
    popup.style.display = 'flex';
    blurOverlay.style.display = 'block';

    // hide popup après 3sec
    setTimeout(() => {
        popup.style.display = 'none';
        blurOverlay.style.display = 'none';
        // rediriger vers displayusers1.html
        window.location.href = 'displayusers1.html';
    }, 3000);
}

// formulaire de creation des utilisateurs 
document.getElementById('createUserForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const newUser = {
        employeeNumber: document.getElementById('employeeNumber').value,
        lastName: document.getElementById('lastName').value,
        firstName: document.getElementById('firstName').value,
        store: document.getElementById('store').value,
        mission: document.getElementById('mission').value,
        recruitmentDate: document.getElementById('recruitmentDate').value,
        startDate: document.getElementById('startDate').value,
        userId: document.getElementById('userId').value,
        password: document.getElementById('password').value,
    };

    // ajout d'utilisateur dans le tableau
    const users = getUsers();
    users.push(newUser);

    // enregistrement des modification dans le localStorage
    saveUsers(users);

    // popup de passage avec succés 
    const lang = localStorage.getItem('selectedLanguage') || 'fr';
    showPopup('success', translations[lang].userAddedSuccess);
});
