// globlaWebSite1.js
// Load the selected language from localStorage on page load
document.addEventListener('DOMContentLoaded', function () {
    const savedLang = localStorage.getItem('selectedLanguage') || 'fr';
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
});

// Rest of the globlaWebSite1.js code...
// Simulation de navigation
function navigateTo(page) {
    alert(`Navigation vers la page : ${page}`);
}

// Simulation de déconnexion
function logout() {
    alert("Déconnexion réussie !");
}