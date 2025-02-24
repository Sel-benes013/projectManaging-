// scripts/pageRapport1.js
document.addEventListener('DOMContentLoaded', function () {
    const savedLang = localStorage.getItem('selectedLanguage') || 'fr';
    document.documentElement.lang = savedLang;
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    applyTranslations(savedLang);

    // Activate/deactivate buttons based on field validity
    activateFormButtons('clientRemarksForm', 'addRemarkButton', 'addRemarkConfirmation');
    activateFormButtons('directorReportsForm', 'submitReportButton', 'submitReportConfirmation');
    activateFormButtons('qualityReportsForm', 'saveReportButton', 'saveReportConfirmation');

    // Logout functionality
    document.getElementById('logoutButton').addEventListener('click', function () {
        window.location.href = 'index.html';
    });
});

// Function to activate/deactivate buttons based on field validity
function activateFormButtons(formId, buttonId, confirmationKey) {
    const form = document.getElementById(formId);
    const button = document.getElementById(buttonId);
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');

    inputs.forEach(input => {
        input.addEventListener('input', () => {
            const allFieldsValid = Array.from(inputs).every(input => input.value.trim() !== '');
            button.disabled = !allFieldsValid;
        });
    });

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        const lang = localStorage.getItem('selectedLanguage') || 'fr';
        const message = translations[lang][confirmationKey];
        showConfirmationPopup(message);
        form.reset();
        button.disabled = true;
    });
}

// Function to display the confirmation popup
function showConfirmationPopup(message) {
    const popup = document.getElementById('confirmationPopup');
    const confirmationMessage = document.getElementById('confirmationMessage');
    confirmationMessage.textContent = message;
    popup.style.display = 'flex';

    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}

// Translations for pageRapport1
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
        logoutButton: 'Déconnexion',
        reportsTitle: 'Rapports',
        clientRemarksTitle: 'Remarques des Clients',
        productNameLabel: 'Nom du produit',
        productSizeLabel: 'Taille',
        productColorLabel: 'Couleur',
        clientCommentLabel: 'Commentaire du client',
        addRemarkButton: 'Ajouter Remarque',
        addRemarkConfirmation: 'Votre remarque a bien été ajoutée.',
        directorReportsTitle: 'Rapports des Directeurs',
        employeeNameLabel: 'Nom et Prénom',
        employeeIdLabel: 'Numéro d\'employé',
        directorCommentLabel: 'Commentaire du directeur',
        urgencyLevelLabel: 'Niveau d\'urgence',
        submitReportButton: 'Soumettre Rapport',
        submitReportConfirmation: 'Votre rapport a bien été soumis.',
        qualityReportsTitle: 'Rapports du Contrôle Qualité',
        supplierNameLabel: 'Nom de l\'entreprise',
        supplierAddressLabel: 'Adresse',
        supplierPhoneLabel: 'Numéro de téléphone',
        productDefectLabel: 'Produit et défaut',
        returnDateLabel: 'Date de retour',
        saveReportButton: 'Enregistrer Rapport',
        saveReportConfirmation: 'Votre rapport a bien été enregistré.',
        // Placeholders
        productNamePlaceholder: 'Entrez le nom du produit',
        productSizePlaceholder: 'Entrez la taille du produit',
        productColorPlaceholder: 'Entrez la couleur du produit',
        clientCommentPlaceholder: 'Entrez le commentaire',
        employeeNamePlaceholder: 'Entrez le nom complet de l\'employé',
        employeeIdPlaceholder: 'Entrez le numéro d\'employé',
        directorCommentPlaceholder: 'Entrez le commentaire',
        supplierNamePlaceholder: 'Entrez le nom de l\'entreprise',
        supplierAddressPlaceholder: 'Entrez l\'adresse de l\'entreprise',
        supplierPhonePlaceholder: 'Entrez le numéro de téléphone',
        productDefectPlaceholder: 'Entrez le produit et le défaut',
        // Urgency Levels
        urgencyLevelOptions: {
            urgent: 'Urgent (Rouge)',
            important: 'Important (Orange)',
            note: 'À noter (Jaune)',
            resolved: 'Résolu (Vert)'
        }
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
        logoutButton: 'Logout',
        reportsTitle: 'Reports',
        clientRemarksTitle: 'Client Remarks',
        productNameLabel: 'Product Name',
        productSizeLabel: 'Size',
        productColorLabel: 'Color',
        clientCommentLabel: 'Client Comment',
        addRemarkButton: 'Add Remark',
        addRemarkConfirmation: 'Your remark has been successfully added.',
        directorReportsTitle: 'Director Reports',
        employeeNameLabel: 'Employee Name',
        employeeIdLabel: 'Employee ID',
        directorCommentLabel: 'Director Comment',
        urgencyLevelLabel: 'Urgency Level',
        submitReportButton: 'Submit Report',
        submitReportConfirmation: 'Your report has been successfully submitted.',
        qualityReportsTitle: 'Quality Control Reports',
        supplierNameLabel: 'Supplier Name',
        supplierAddressLabel: 'Address',
        supplierPhoneLabel: 'Phone Number',
        productDefectLabel: 'Product and Defect',
        returnDateLabel: 'Return Date',
        saveReportButton: 'Save Report',
        saveReportConfirmation: 'Your report has been successfully saved.',
        // Placeholders
        productNamePlaceholder: 'Enter the product name',
        productSizePlaceholder: 'Enter the product size',
        productColorPlaceholder: 'Enter the product color',
        clientCommentPlaceholder: 'Enter the comment',
        employeeNamePlaceholder: 'Enter the employee\'s full name',
        employeeIdPlaceholder: 'Enter the employee ID',
        directorCommentPlaceholder: 'Enter the comment',
        supplierNamePlaceholder: 'Enter the company name',
        supplierAddressPlaceholder: 'Enter the company address',
        supplierPhonePlaceholder: 'Enter the phone number',
        productDefectPlaceholder: 'Enter the product and defect',
        // Urgency Levels
        urgencyLevelOptions: {
            urgent: 'Urgent (Red)',
            important: 'Important (Orange)',
            note: 'Note (Yellow)',
            resolved: 'Resolved (Green)'
        }
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
        logoutButton: 'تسجيل الخروج',
        reportsTitle: 'التقارير',
        clientRemarksTitle: 'ملاحظات العملاء',
        productNameLabel: 'اسم المنتج',
        productSizeLabel: 'الحجم',
        productColorLabel: 'اللون',
        clientCommentLabel: 'تعليق العميل',
        addRemarkButton: 'إضافة ملاحظة',
        addRemarkConfirmation: 'تمت إضافة ملاحظتك بنجاح.',
        directorReportsTitle: 'تقارير المديرين',
        employeeNameLabel: 'اسم الموظف',
        employeeIdLabel: 'رقم الموظف',
        directorCommentLabel: 'تعليق المدير',
        urgencyLevelLabel: 'مستوى الاستعجال',
        submitReportButton: 'إرسال التقرير',
        submitReportConfirmation: 'تم إرسال تقريرك بنجاح.',
        qualityReportsTitle: 'تقارير مراقبة الجودة',
        supplierNameLabel: 'اسم الشركة',
        supplierAddressLabel: 'العنوان',
        supplierPhoneLabel: 'رقم الهاتف',
        productDefectLabel: 'المنتج والعيب',
        returnDateLabel: 'تاريخ الإرجاع',
        saveReportButton: 'حفظ التقرير',
        saveReportConfirmation: 'تم حفظ تقريرك بنجاح.',
        // Placeholders
        productNamePlaceholder: 'أدخل اسم المنتج',
        productSizePlaceholder: 'أدخل حجم المنتج',
        productColorPlaceholder: 'أدخل لون المنتج',
        clientCommentPlaceholder: 'أدخل التعليق',
        employeeNamePlaceholder: 'أدخل اسم الموظف بالكامل',
        employeeIdPlaceholder: 'أدخل رقم الموظف',
        directorCommentPlaceholder: 'أدخل التعليق',
        supplierNamePlaceholder: 'أدخل اسم الشركة',
        supplierAddressPlaceholder: 'أدخل عنوان الشركة',
        supplierPhonePlaceholder: 'أدخل رقم الهاتف',
        productDefectPlaceholder: 'أدخل المنتج والعيب',
        // Urgency Levels
        urgencyLevelOptions: {
            urgent: 'عاجل (أحمر)',
            important: 'مهم (برتقالي)',
            note: 'ملاحظة (أصفر)',
            resolved: 'تم الحل (أخضر)'
        }
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

    // Apply placeholders
    document.getElementById('productName').placeholder = translation.productNamePlaceholder;
    document.getElementById('productSize').placeholder = translation.productSizePlaceholder;
    document.getElementById('productColor').placeholder = translation.productColorPlaceholder;
    document.getElementById('clientComment').placeholder = translation.clientCommentPlaceholder;
    document.getElementById('employeeName').placeholder = translation.employeeNamePlaceholder;
    document.getElementById('employeeId').placeholder = translation.employeeIdPlaceholder;
    document.getElementById('directorComment').placeholder = translation.directorCommentPlaceholder;
    document.getElementById('supplierName').placeholder = translation.supplierNamePlaceholder;
    document.getElementById('supplierAddress').placeholder = translation.supplierAddressPlaceholder;
    document.getElementById('supplierPhone').placeholder = translation.supplierPhonePlaceholder;
    document.getElementById('productDefect').placeholder = translation.productDefectPlaceholder;

    // Apply urgency level options
    const urgencyLevelSelect = document.getElementById('urgencyLevel');
    if (urgencyLevelSelect) {
        urgencyLevelSelect.innerHTML = `
            <option value="" selected disabled>${translation.urgencyLevelLabel}</option>
            <option value="urgent">${translation.urgencyLevelOptions.urgent}</option>
            <option value="important">${translation.urgencyLevelOptions.important}</option>
            <option value="note">${translation.urgencyLevelOptions.note}</option>
            <option value="resolved">${translation.urgencyLevelOptions.resolved}</option>
        `;
    }
}