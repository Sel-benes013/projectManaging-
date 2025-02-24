// pageFournisseur1.js

// Function to show popup messages
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

    // Show the popup and blur overlay
    popup.style.display = 'flex';
    blurOverlay.style.display = 'block';

    // Hide the popup and blur overlay after 3 seconds
    setTimeout(() => {
        popup.style.display = 'none';
        blurOverlay.style.display = 'none';
    }, 3000);
}

// Function to save suppliers to localStorage
function saveFournisseurs(fournisseurs) {
    localStorage.setItem('fournisseurs', JSON.stringify(fournisseurs));
}

// Function to get suppliers from localStorage
function getFournisseurs() {
    return JSON.parse(localStorage.getItem('fournisseurs')) || [];
}

// Function to generate a unique ID
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Function to display suppliers with pagination
function displaySuppliers(page = 1, itemsPerPage = 5) {
    const suppliers = getFournisseurs();
    const filteredSuppliers = filterSuppliers(suppliers);
    const sortedSuppliers = sortSuppliers(filteredSuppliers);
    const paginatedSuppliers = paginate(sortedSuppliers, page, itemsPerPage);

    const fournisseurTableBody = document.getElementById('fournisseurTableBody');
    fournisseurTableBody.innerHTML = '';

    paginatedSuppliers.forEach(supplier => {
        const row = `
            <tr>
                <td>${supplier.nom}</td>
                <td>${supplier.prenom}</td>
                <td>${supplier.entreprise}</td>
                <td>${supplier.adresse}</td>
                <td>${supplier.telephone}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="viewSupplierDetails('${supplier.id}')">${translations[localStorage.getItem('selectedLanguage') || 'fr'].viewDetails}</button>
                    <button class="btn btn-warning btn-sm" onclick="editSupplier('${supplier.id}')">${translations[localStorage.getItem('selectedLanguage') || 'fr'].edit}</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteSupplier('${supplier.id}')">${translations[localStorage.getItem('selectedLanguage') || 'fr'].delete}</button>
                </td>
            </tr>
        `;
        fournisseurTableBody.innerHTML += row;
    });

    renderPagination(sortedSuppliers.length, page, itemsPerPage);
}

// Function to filter suppliers
function filterSuppliers(suppliers) {
    const filterName = document.getElementById('filterSupplierName').value.toLowerCase();
    const filterCompany = document.getElementById('filterCompany').value.toLowerCase();
    const filterPhone = document.getElementById('filterPhone').value.toLowerCase();
    const filterAddress = document.getElementById('filterAddress').value.toLowerCase();

    return suppliers.filter(supplier => 
        (supplier.nom.toLowerCase().includes(filterName) || 
         supplier.prenom.toLowerCase().includes(filterName)) &&
        supplier.entreprise.toLowerCase().includes(filterCompany) &&
        supplier.telephone.toLowerCase().includes(filterPhone) &&
        supplier.adresse.toLowerCase().includes(filterAddress)
    );
}

// Function to sort suppliers
function sortSuppliers(suppliers) {
    const sortOrder = document.getElementById('sortSupplier').value;
    return suppliers.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.nom.localeCompare(b.nom);
        } else {
            return b.nom.localeCompare(a.nom);
        }
    });
}

// Function to paginate suppliers
function paginate(suppliers, page, itemsPerPage) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return suppliers.slice(start, end);
}

// Function to render pagination
function renderPagination(totalItems, currentPage, itemsPerPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = document.getElementById('supplierPagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" onclick="displaySuppliers(${i})">${i}</a>`;
        pagination.appendChild(li);
    }
}

// Function to export suppliers to CSV
document.getElementById('exportSupplierCSV').addEventListener('click', function () {
    const suppliers = getFournisseurs();
    const csvContent = "data:text/csv;charset=utf-8," 
        + suppliers.map(supplier => Object.values(supplier).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "fournisseurs.csv");
    document.body.appendChild(link);
    link.click();
});

// Function to view supplier details
function viewSupplierDetails(supplierId) {
    window.location.href = `supplierDetails.html?id=${supplierId}`;
}

// Function to edit a supplier
function editSupplier(supplierId) {
    const supplier = getFournisseurs().find(s => s.id === supplierId);
    if (supplier) {
        // Populate the modal form with the supplier's data
        document.getElementById('editNomFournisseur').value = supplier.nom;
        document.getElementById('editPrenomFournisseur').value = supplier.prenom;
        document.getElementById('editEntrepriseFournisseur').value = supplier.entreprise;
        document.getElementById('editTelephoneFournisseur').value = supplier.telephone;
        document.getElementById('editAdresseFournisseur').value = supplier.adresse;

        // Save the supplier ID in the form for later use
        document.getElementById('editSupplierForm').dataset.supplierId = supplierId;

        // Show the modal
        const editSupplierModal = new bootstrap.Modal(document.getElementById('editSupplierModal'));
        editSupplierModal.show();
    }
}

// Function to save edited supplier
function saveEditedSupplier() {
    const supplierId = document.getElementById('editSupplierForm').dataset.supplierId;
    const suppliers = getFournisseurs();
    const supplierIndex = suppliers.findIndex(s => s.id === supplierId);

    if (supplierIndex !== -1) {
        // Update the supplier's data
        suppliers[supplierIndex] = {
            id: supplierId,
            nom: document.getElementById('editNomFournisseur').value,
            prenom: document.getElementById('editPrenomFournisseur').value,
            entreprise: document.getElementById('editEntrepriseFournisseur').value,
            telephone: document.getElementById('editTelephoneFournisseur').value,
            adresse: document.getElementById('editAdresseFournisseur').value
        };

        // Save the updated suppliers list to localStorage
        saveFournisseurs(suppliers);

        // Refresh the table to reflect the changes
        displaySuppliers();

        // Show a success popup
        showPopup('success', translations[localStorage.getItem('selectedLanguage') || 'fr'].supplierUpdatedSuccess);

        // Close the modal
        const editSupplierModal = bootstrap.Modal.getInstance(document.getElementById('editSupplierModal'));
        editSupplierModal.hide();
    }
}

// Function to delete a supplier
function deleteSupplier(supplierId) {
    if (confirm(translations[localStorage.getItem('selectedLanguage') || 'fr'].deleteConfirmation)) {
        const suppliers = getFournisseurs().filter(s => s.id !== supplierId);
        saveFournisseurs(suppliers);
        displaySuppliers();
        showPopup('success', translations[localStorage.getItem('selectedLanguage') || 'fr'].supplierDeletedSuccess);
    }
}

// Add supplier form submission
document.getElementById('fournisseurForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const supplier = {
        id: generateId(),
        nom: document.getElementById('nomFournisseur').value,
        prenom: document.getElementById('prenomFournisseur').value,
        entreprise: document.getElementById('entrepriseFournisseur').value,
        telephone: document.getElementById('telephoneFournisseur').value,
        adresse: document.getElementById('adresseFournisseur').value
    };
    const suppliers = getFournisseurs();
    suppliers.push(supplier);
    saveFournisseurs(suppliers);
    displaySuppliers();
    showPopup('success', translations[localStorage.getItem('selectedLanguage') || 'fr'].supplierAddedSuccess);
    this.reset();
});

// Add event listeners for filtering
document.getElementById('filterSupplierName').addEventListener('input', () => displaySuppliers());
document.getElementById('filterCompany').addEventListener('input', () => displaySuppliers());
document.getElementById('filterPhone').addEventListener('input', () => displaySuppliers());
document.getElementById('filterAddress').addEventListener('input', () => displaySuppliers());

// Load suppliers on page load
document.addEventListener('DOMContentLoaded', function () {
    displaySuppliers();
});