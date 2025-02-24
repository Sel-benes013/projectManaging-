// scripts/products.js
document.addEventListener("DOMContentLoaded", () => {
    // Load the selected language from localStorage on page load
    const savedLang = localStorage.getItem('selectedLanguage') || 'fr';
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    applyTranslations(savedLang);

    // Load products from localStorage or initialize with default data
    let products = JSON.parse(localStorage.getItem('products')) || [
        { sku: "SKU001", nom: "Jean", prix: 50, fournisseur: 30, taille: "M", couleur: "Bleu", soldes: "10%", stock: 100, image: "images/jean1.jpg" },
        { sku: "SKU002", nom: "Robe", prix: 80, fournisseur: 50, taille: "L", couleur: "Rouge", soldes: "15%", stock: 50, image: "images/robe1.jpg" },
        { sku: "SKU003", nom: "Tricot", prix: 30, fournisseur: 20, taille: "S", couleur: "Blanc", soldes: "5%", stock: 75, image: "images/tricot1.jpg" },
        { sku: "SKU004", nom: "Manteau", prix: 120, fournisseur: 80, taille: "XL", couleur: "Noir", soldes: "20%", stock: 25, image: "images/manteau1.jpg" },
        { sku: "SKU005", nom: "Top", prix: 25, fournisseur: 15, taille: "M", couleur: "Rose", soldes: "5%", stock: 200, image: "images/top1.jpg" },
        { sku: "SKU006", nom: "Accessoire", prix: 15, fournisseur: 10, taille: "-", couleur: "Doré", soldes: "8%", stock: 150, image: "images/jeweleries1.jpg" },
    ];

    // Save products to localStorage if not already saved
    if (!localStorage.getItem('products')) {
        localStorage.setItem('products', JSON.stringify(products));
    }

    // Display products on page load
    displayProducts(products);

    // Add event listeners
    document.getElementById('logoutButton').addEventListener('click', logout);
    document.getElementById('searchBar').addEventListener('input', filterProducts);
    document.getElementById('filter').addEventListener('change', sortProducts);
});

// Translations for product details, modal, and menu
const translations = {
    fr: {
        menuTitle: "Menu",
        homeLink: "Accueil",
        dashboardLink: "Dashboard",
        productsLink: "Produits",
        ordersLink: "Commandes",
        suppliersLink: "Fournisseurs",
        reportsLink: "Rapports",
        settingsLink: "Paramètres",
        createUserLink: "Créer un utilisateur",
        viewUsersLink: "Voir les utilisateurs",
        logoutButton: "Déconnexion",
        productsTitle: "Gestion des Produits",
        priceLowHigh: "Prix : Bas à Élevé",
        priceHighLow: "Prix : Élevé à Bas",
        stockLowHigh: "Stock : Bas à Élevé",
        stockHighLow: "Stock : Élevé à Bas",
        searchPlaceholder: "Rechercher un produit...",
        sku: "SKU :",
        prixMagasin: "Prix magasin :",
        prixFournisseur: "Prix fournisseur :",
        couleur: "Couleur :",
        taille: "Taille :",
        soldes: "Soldes :",
        stock: "Stock :",
        modifierButton: "Modifier",
        editModalTitle: "Modifier {nom}",
        editPrixLabel: "Prix magasin",
        editStockLabel: "Stock",
        editSoldesLabel: "Soldes (%)",
        closeButton: "Fermer",
        saveButton: "Enregistrer",
        successMessage: "Modifications appliquées avec succès!",
        lowStockWarning: "Avertissement : Stock faible",
        // Product names in French
        jean: "Jean",
        robe: "Robe",
        tricot: "Tricot",
        manteau: "Manteau",
        top: "Top",
        accessoire: "Accessoire",
        // Colors in French
        bleu: "Bleu",
        rouge: "Rouge",
        blanc: "Blanc",
        noir: "Noir",
        rose: "Rose",
        doré: "Doré",
    },
    en: {
        menuTitle: "Menu",
        homeLink: "Home",
        dashboardLink: "Dashboard",
        productsLink: "Products",
        ordersLink: "Orders",
        suppliersLink: "Suppliers",
        reportsLink: "Reports",
        settingsLink: "Settings",
        createUserLink: "Create User",
        viewUsersLink: "View Users",
        logoutButton: "Logout",
        productsTitle: "Products Management",
        priceLowHigh: "Price: Low to High",
        priceHighLow: "Price: High to Low",
        stockLowHigh: "Stock: Low to High",
        stockHighLow: "Stock: High to Low",
        searchPlaceholder: "Search for a product...",
        sku: "SKU:",
        prixMagasin: "Store Price:",
        prixFournisseur: "Supplier Price:",
        couleur: "Color:",
        taille: "Size:",
        soldes: "Discount:",
        stock: "Stock:",
        modifierButton: "Edit",
        editModalTitle: "Edit {nom}",
        editPrixLabel: "Store Price",
        editStockLabel: "Stock",
        editSoldesLabel: "Discount (%)",
        closeButton: "Close",
        saveButton: "Save",
        successMessage: "Changes applied successfully!",
        lowStockWarning: "Warning: Low stock",
        // Product names in English
        jean: "Jeans",
        robe: "Dress",
        tricot: "Sweater",
        manteau: "Coat",
        top: "Top",
        accessoire: "Accessory",
        // Colors in English
        bleu: "Blue",
        rouge: "Red",
        blanc: "White",
        noir: "Black",
        rose: "Pink",
        doré: "Gold",
    },
    ar: {
        menuTitle: "القائمة",
        homeLink: "الصفحة الرئيسية",
        dashboardLink: "لوحة التحكم",
        productsLink: "المنتجات",
        ordersLink: "الطلبات",
        suppliersLink: "الموردين",
        reportsLink: "التقارير",
        settingsLink: "الإعدادات",
        createUserLink: "إنشاء مستخدم",
        viewUsersLink: "عرض المستخدمين",
        logoutButton: "تسجيل الخروج",
        productsTitle: "إدارة المنتجات",
        priceLowHigh: "السعر: من الأقل إلى الأعلى",
        priceHighLow: "السعر: من الأعلى إلى الأقل",
        stockLowHigh: "المخزون: من الأقل إلى الأعلى",
        stockHighLow: "المخزون: من الأعلى إلى الأقل",
        searchPlaceholder: "ابحث عن منتج...",
        sku: "الرمز:",
        prixMagasin: "سعر المتجر:",
        prixFournisseur: "سعر المورد:",
        couleur: "اللون:",
        taille: "الحجم:",
        soldes: "التخفيض:",
        stock: "المخزون:",
        modifierButton: "تعديل",
        editModalTitle: "تعديل {nom}",
        editPrixLabel: "سعر المتجر",
        editStockLabel: "المخزون",
        editSoldesLabel: "التخفيض (%)",
        closeButton: "إغلاق",
        saveButton: "حفظ",
        successMessage: "تم تطبيق التغييرات بنجاح!",
        lowStockWarning: "تحذير: المخزون منخفض",
        // Product names in Arabic
        jean: "جينز",
        robe: "فستان",
        tricot: "سترة",
        manteau: "معطف",
        top: "توب",
        accessoire: "إكسسوار",
        // Colors in Arabic
        bleu: "أزرق",
        rouge: "أحمر",
        blanc: "أبيض",
        noir: "أسود",
        rose: "وردي",
        doré: "ذهبي",
    }
};

// Apply translations
function applyTranslations(lang) {
    const translation = translations[lang];
    for (const [key, value] of Object.entries(translation)) {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = value;
        }
    }
    // Update search bar placeholder
    document.getElementById('searchBar').placeholder = translation.searchPlaceholder;
    // Update sort filter options
    document.getElementById('priceLowHigh').textContent = translation.priceLowHigh;
    document.getElementById('priceHighLow').textContent = translation.priceHighLow;
    document.getElementById('stockLowHigh').textContent = translation.stockLowHigh;
    document.getElementById('stockHighLow').textContent = translation.stockHighLow;
}

// Display products
function displayProducts(productsToShow) {
    const container = document.getElementById("productsContainer");
    container.innerHTML = "";
    const lang = document.documentElement.lang;
    const translation = translations[lang];

    productsToShow.forEach(product => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card p-3">
                <div class="image-container">
                    <img src="${product.image}" class="card-img-top" alt="${product.nom}">
                    <div class="logo-overlay">
                        <img src="images/logobg.png" alt="Logo" class="logo-img">
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title text-center">${translation[product.nom.toLowerCase()] || product.nom}</h5>
                    <p class="card-text text-muted">
                        <strong>${translation.sku}</strong> ${product.sku}<br>
                        <strong>${translation.prixMagasin}</strong> ${product.prix}€<br>
                        <strong>${translation.prixFournisseur}</strong> ${product.fournisseur}€<br>
                        <strong>${translation.couleur}</strong> ${translation[product.couleur.toLowerCase()] || product.couleur}<br>
                        <strong>${translation.taille}</strong> ${product.taille}<br>
                        <strong>${translation.soldes}</strong> ${product.soldes}<br>
                        <strong>${translation.stock}</strong> 
                        <span class="badge ${product.stock > 50 ? 'badge-success' : product.stock > 20 ? 'badge-warning' : 'badge-danger'}">
                            ${product.stock} ${translation.stock}
                        </span>
                        ${product.stock < 30 ? `
                            <span class="warning-icon-container" title="${translation.lowStockWarning}">
                                <img src="images/warning.png" alt="Warning" class="warning-icon">
                            </span>
                        ` : ''}
                    </p>
                    <button class="btn btn-primary w-100" onclick="openEditForm('${product.sku}')">${translation.modifierButton}</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

// Filter products based on search input
function filterProducts() {
    const searchQuery = document.getElementById('searchBar').value.toLowerCase();
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const filteredProducts = products.filter(product => 
        product.nom.toLowerCase().includes(searchQuery) || 
        product.sku.toLowerCase().includes(searchQuery)
    );
    displayProducts(filteredProducts);
}

// Sort products
function sortProducts() {
    const filter = document.getElementById('filter').value;
    const products = JSON.parse(localStorage.getItem('products')) || [];
    let sortedProducts = [...products];

    switch (filter) {
        case 'low-high':
            sortedProducts.sort((a, b) => a.prix - b.prix);
            break;
        case 'high-low':
            sortedProducts.sort((a, b) => b.prix - a.prix);
            break;
        case 'stock-low-high':
            sortedProducts.sort((a, b) => a.stock - b.stock);
            break;
        case 'stock-high-low':
            sortedProducts.sort((a, b) => b.stock - a.stock);
            break;
        default:
            break;
    }

    displayProducts(sortedProducts);
}

// Open the edit form
function openEditForm(sku) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.sku === sku);
    if (!product) return;

    // Remove existing modal if it exists
    const existingModal = document.getElementById('editModal');
    if (existingModal) {
        existingModal.remove();
    }

    const lang = document.documentElement.lang;
    const translation = translations[lang];

    // Create the modal
    const formHtml = `
        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editModalLabel">${translation.editModalTitle.replace('{nom}', translation[product.nom.toLowerCase()] || product.nom)}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editForm">
                            <div class="mb-3">
                                <label for="editPrix" class="form-label">${translation.editPrixLabel}</label>
                                <input type="number" class="form-control" id="editPrix" value="${product.prix}" required>
                            </div>
                            <div class="mb-3">
                                <label for="editStock" class="form-label">${translation.editStockLabel}</label>
                                <input type="number" class="form-control" id="editStock" value="${product.stock}" required>
                            </div>
                            <div class="mb-3">
                                <label for="editSoldes" class="form-label">${translation.editSoldesLabel}</label>
                                <input type="number" class="form-control" id="editSoldes" value="${parseInt(product.soldes)}" required>
                            </div>
                        </form>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">${translation.closeButton}</button>
                        <button type="button" class="btn btn-primary" onclick="saveChanges('${product.sku}')">${translation.saveButton}</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Inject the modal into the DOM
    document.body.insertAdjacentHTML('beforeend', formHtml);

    // Initialize and show the modal
    const editModal = new bootstrap.Modal(document.getElementById('editModal'));
    editModal.show();
}

// Save changes
function saveChanges(sku) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.sku === sku);
    if (!product) return;

    // Update the product data
    product.prix = parseFloat(document.getElementById('editPrix').value);
    product.stock = parseInt(document.getElementById('editStock').value);
    product.soldes = `${parseInt(document.getElementById('editSoldes').value)}%`;

    // Save updated products to localStorage
    localStorage.setItem('products', JSON.stringify(products));

    // Hide the modal
    const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    editModal.hide();

    // Refresh the product display
    displayProducts(products);

    // Show success notification
    showSuccessNotification();
}

// Show success notification
function showSuccessNotification() {
    const lang = document.documentElement.lang;
    const translation = translations[lang];

    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <img src="images/check.gif" alt="Success" class="notification-gif">
        <span>${translation.successMessage}</span>
    `;

    // Position the notification based on the language direction
    if (lang === 'ar') {
        notification.style.right = '20px';
    } else {
        notification.style.left = '20px';
    }

    document.body.appendChild(notification);

    // Remove the notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Logout functionality
function logout() {
    // Clear user session or token (example)
    localStorage.removeItem('userToken'); // Replace with your actual session/token logic
    // Redirect to login page
    window.location.href = "index.html"; // Replace with your actual login page
}