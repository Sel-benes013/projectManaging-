// Load the selected language from localStorage on page load
document.addEventListener('DOMContentLoaded', function () {
    const savedLang = localStorage.getItem('selectedLanguage') || 'fr';
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    applyTranslations(savedLang);

    // Display the logged-in user
    const loggedInUser = localStorage.getItem('loggedInUser') || 'Utilisateur';
    updateLoggedInUserMessage(savedLang, loggedInUser);

    // Show a warning for superadmin users
    if (isSuperAdminUser(loggedInUser)) {
        const superAdminWarning = document.getElementById('masterKeyWarning');
        superAdminWarning.textContent = translations[savedLang].masterKeyWarning;
        superAdminWarning.style.display = 'block';
    } else {
        // Show the username change section for non-superadmin users
        const usernameChangeSection = document.getElementById('usernameChangeSection');
        usernameChangeSection.style.display = 'block';
    }

    // Update the language dropdown to show the current language first
    updateLanguageDropdown(savedLang);
});

// Function to check if the user is a superadmin user
function isSuperAdminUser(username) {
    const superAdmins = [
        { username: 'admin', password: 'admin' },
        { username: 'saloumi', password: 'amine' },
        { username: 'pedrino', password: 'pedro' }
    ];
    return superAdmins.some(user => user.username === username);
}

// Function to update the logged-in user message
function updateLoggedInUserMessage(lang, username) {
    const loggedInUserMessage = translations[lang].loggedInUserMessage;
    document.getElementById('loggedInUser').innerHTML = `${loggedInUserMessage} <span id="username">${username}</span>`;
}

// Gestion du formulaire de modification de mot de passe
document.getElementById('passwordForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const loggedInUser = localStorage.getItem('loggedInUser');

    // Check if the user is a superadmin user
    if (isSuperAdminUser(loggedInUser)) {
        showPopup('error', translations[document.documentElement.lang].masterKeyError);
        return;
    }

    const oldPassword = document.getElementById('oldPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        showPopup('error', translations[document.documentElement.lang].passwordMismatch);
        return;
    }

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user whose password is being changed
    const userIndex = users.findIndex(user => user.userId === loggedInUser);

    if (userIndex === -1) {
        showPopup('error', translations[document.documentElement.lang].userNotFound);
        return;
    }

    // Check if the old password matches
    if (users[userIndex].password !== oldPassword) {
        showPopup('error', translations[document.documentElement.lang].incorrectOldPassword);
        return;
    }

    // Update the user's password
    users[userIndex].password = newPassword;

    // Save the updated users back to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Simulate password change success
    showPopup('success', translations[document.documentElement.lang].changesAppliedSuccess);
    this.reset();
});

// Gestion du formulaire de changement de nom d'utilisateur
document.getElementById('usernameForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const loggedInUser = localStorage.getItem('loggedInUser');

    // Check if the user is a superadmin user
    if (isSuperAdminUser(loggedInUser)) {
        showPopup('error', translations[document.documentElement.lang].masterKeyError);
        return;
    }

    const newUsername = document.getElementById('newUsername').value;

    // Retrieve users from localStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Find the user whose username is being changed
    const userIndex = users.findIndex(user => user.userId === loggedInUser);

    if (userIndex === -1) {
        showPopup('error', translations[document.documentElement.lang].userNotFound);
        return;
    }

    // Update the user's username
    users[userIndex].userId = newUsername;

    // Save the updated users back to localStorage
    localStorage.setItem('users', JSON.stringify(users));

    // Update the logged-in user in localStorage
    localStorage.setItem('loggedInUser', newUsername);

    // Update the displayed username
    updateLoggedInUserMessage(document.documentElement.lang, newUsername);

    // Simulate username change success
    showPopup('success', translations[document.documentElement.lang].usernameChangedSuccess);
    this.reset();
});

// Gestion du formulaire de changement de langue
document.getElementById('languageForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const selectedLanguage = document.getElementById('languageSelect').value;

    // Save the selected language to localStorage
    localStorage.setItem('selectedLanguage', selectedLanguage);

    // Apply the selected language to the current page
    document.documentElement.lang = selectedLanguage;
    document.documentElement.dir = selectedLanguage === 'ar' ? 'rtl' : 'ltr';
    applyTranslations(selectedLanguage);

    // Update the logged-in user message with the new language
    const loggedInUser = localStorage.getItem('loggedInUser') || 'Utilisateur';
    updateLoggedInUserMessage(selectedLanguage, loggedInUser);

    // Update the language dropdown to show the current language first
    updateLanguageDropdown(selectedLanguage);

    // Show popup for language change
    showPopup('success', translations[selectedLanguage].languageChangedMessage);
});

// Function to show popup messages
function showPopup(type, message) {
    const popup = document.getElementById('popupMessage');
    const popupGif = document.getElementById('popupGif');
    const popupText = document.getElementById('popupText');

    if (type === 'success') {
        popupGif.src = 'images/check.gif';
        popupText.textContent = message;
    } else {
        popupGif.src = 'images/error.gif';
        popupText.textContent = message;
    }

    popup.style.display = 'flex'; // Use flex to center the content
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}

// Apply translations
function applyTranslations(lang) {
    const translation = translations[lang];
    for (const [key, value] of Object.entries(translation)) {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = value;
        }
    }
}

// Function to update the language dropdown
function updateLanguageDropdown(currentLang) {
    const languageSelect = document.getElementById('languageSelect');
    if (!languageSelect) {
        console.error('Language dropdown element not found!');
        return;
    }

    languageSelect.innerHTML = ''; // Clear existing options

    // Define the order of languages based on the current language
    const languageOrder = {
        fr: ['fr', 'en', 'ar'],
        en: ['en', 'fr', 'ar'],
        ar: ['ar', 'fr', 'en']
    };

    // Add options in the correct order
    languageOrder[currentLang].forEach(lang => {
        const option = document.createElement('option');
        option.value = lang;
        option.textContent = translations[lang].languageName; // Use translated language name
        if (lang === currentLang) {
            option.selected = true; // Select the current language
        }
        languageSelect.appendChild(option);
    });
}

// Translations for pageParam1
const translations = {
    fr: {
        menuTitle: 'Menu',
        homeLink: 'Accueil',
        dashboardLink: 'Dashboard',
        productsLink: 'Produits',
        ordersLink: 'Commandes',
        suppliersLink: 'Fournisseurs',
        reportsLink: 'Rapports',
        settingsLink: 'Paramètres',
        createUserLink: 'Créer un utilisateur',
        viewUsersLink: 'Voir les utilisateurs',
        settingsTitle: 'Paramètres',
        loggedInUserTitle: 'Utilisateur Connecté',
        loggedInUserMessage: 'Vous êtes connecté en tant que:',
        changePasswordTitle: 'Modifier le Mot de Passe',
        oldPasswordLabel: 'Ancien Mot de Passe',
        newPasswordLabel: 'Nouveau Mot de Passe',
        confirmPasswordLabel: 'Confirmer le Nouveau Mot de Passe',
        changePasswordButton: 'Modifier',
        changeLanguageTitle: 'Changer la Langue',
        languageLabel: 'Langue',
        changeLanguageButton: 'Changer la Langue',
        logoutButton: 'Déconnexion',
        changesAppliedSuccess: 'Changements appliqués avec succès !',
        passwordMismatch: 'Les nouveaux mots de passe ne correspondent pas !',
        languageChangedMessage: 'Langue changée avec succès !',
        masterKeyWarning: 'Vous ne pouvez pas modifier le mot de passe ou le nom d\'utilisateur pour un compte superadmin.',
        masterKeyError: 'Une erreur s\'est produite. Les comptes superadmin ne peuvent pas modifier leur mot de passe ou nom d\'utilisateur.',
        userNotFound: 'Utilisateur non trouvé !',
        incorrectOldPassword: 'Ancien mot de passe incorrect !',
        usernameChangedSuccess: 'Nom d\'utilisateur modifié avec succès !',
        languageName: 'Français',
        languageNames: {
            fr: 'Français',
            en: 'Anglais',
            ar: 'Arabe'
        },
        // New translations for username change section
        newUsernameLabel: 'Nouveau Nom d\'Utilisateur', // French
        changeUsernameButton: 'Modifier' // French
    },
    en: {
        menuTitle: 'Menu',
        homeLink: 'Home',
        dashboardLink: 'Dashboard',
        productsLink: 'Products',
        ordersLink: 'Orders',
        suppliersLink: 'Suppliers',
        reportsLink: 'Reports',
        settingsLink: 'Settings',
        createUserLink: 'Create User',
        viewUsersLink: 'View Users',
        settingsTitle: 'Settings',
        loggedInUserTitle: 'Logged In User',
        loggedInUserMessage: 'You are logged in as:',
        changePasswordTitle: 'Change Password',
        oldPasswordLabel: 'Old Password',
        newPasswordLabel: 'New Password',
        confirmPasswordLabel: 'Confirm New Password',
        changePasswordButton: 'Change',
        changeLanguageTitle: 'Change Language',
        languageLabel: 'Language',
        changeLanguageButton: 'Change Language',
        logoutButton: 'Logout',
        changesAppliedSuccess: 'Changes applied successfully!',
        passwordMismatch: 'New passwords do not match!',
        languageChangedMessage: 'Language changed successfully!',
        masterKeyWarning: 'You cannot change the password or username for a superadmin account.',
        masterKeyError: 'An error occurred. Superadmin accounts cannot change their password or username.',
        userNotFound: 'User not found!',
        incorrectOldPassword: 'Incorrect old password!',
        usernameChangedSuccess: 'Username changed successfully!',
        languageName: 'English',
        languageNames: {
            en: 'English',
            fr: 'French',
            ar: 'Arabic'
        },
        // New translations for username change section
        newUsernameLabel: 'New Username', // English
        changeUsernameButton: 'Change' // English
    },
    ar: {
        menuTitle: 'القائمة',
        homeLink: 'الصفحة الرئيسية',
        dashboardLink: 'لوحة التحكم',
        productsLink: 'المنتجات',
        ordersLink: 'الطلبات',
        suppliersLink: 'الموردين',
        reportsLink: 'التقارير',
        settingsLink: 'الإعدادات',
        createUserLink: 'إنشاء مستخدم',
        viewUsersLink: 'عرض المستخدمين',
        settingsTitle: 'الإعدادات',
        loggedInUserTitle: 'المستخدم المتصل',
        loggedInUserMessage: 'أنت متصل باسم:',
        changePasswordTitle: 'تغيير كلمة المرور',
        oldPasswordLabel: 'كلمة المرور القديمة',
        newPasswordLabel: 'كلمة المرور الجديدة',
        confirmPasswordLabel: 'تأكيد كلمة المرور الجديدة',
        changePasswordButton: 'تغيير',
        changeLanguageTitle: 'تغيير اللغة',
        languageLabel: 'اللغة',
        changeLanguageButton: 'تغيير اللغة',
        logoutButton: 'تسجيل الخروج',
        changesAppliedSuccess: 'تم تطبيق التغييرات بنجاح!',
        passwordMismatch: 'كلمات المرور الجديدة غير متطابقة!',
        languageChangedMessage: 'تم تغيير اللغة بنجاح!',
        masterKeyWarning: 'لا يمكنك تغيير كلمة المرور أو اسم المستخدم لحساب المشرف الأعلى.',
        masterKeyError: 'حدث خطأ. حسابات المشرف الأعلى لا يمكنها تغيير كلمة المرور أو اسم المستخدم.',
        userNotFound: 'المستخدم غير موجود!',
        incorrectOldPassword: 'كلمة المرور القديمة غير صحيحة!',
        usernameChangedSuccess: 'تم تغيير اسم المستخدم بنجاح!',
        languageName: 'عربي',
        languageNames: {
            ar: 'عربي',
            fr: 'فرنسي',
            en: 'إنجليزي'
        },
        // New translations for username change section
        newUsernameLabel: 'اسم المستخدم الجديد', // Arabic
        changeUsernameButton: 'تغيير' // Arabic
    }
};