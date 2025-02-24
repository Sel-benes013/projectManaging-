// pageCommandes1.js

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

// Function to save orders to localStorage
function saveOrders(orders) {
    localStorage.setItem('orders', JSON.stringify(orders));
}

// Function to get orders from localStorage
function getOrders() {
    return JSON.parse(localStorage.getItem('orders')) || [];
}

// Function to generate a unique ID
function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

// Function to display orders with pagination
function displayOrders(page = 1, itemsPerPage = 5) {
    const orders = getOrders();
    const filteredOrders = filterOrders(orders);
    const sortedOrders = sortOrders(filteredOrders);
    const paginatedOrders = paginate(sortedOrders, page, itemsPerPage);

    const commandeTableBody = document.getElementById('commandeTableBody');
    commandeTableBody.innerHTML = '';

    paginatedOrders.forEach(order => {
        const row = `
            <tr>
                <td>${order.nom} ${order.prenom}</td>
                <td>${order.adresse}</td>
                <td>${order.telephone}</td>
                <td>${order.articles}</td>
                <td>
                    <button class="btn btn-info btn-sm" onclick="viewOrderDetails('${order.id}')">${translations[localStorage.getItem('selectedLanguage') || 'fr'].viewDetails}</button>
                    <button class="btn btn-warning btn-sm" onclick="editOrder('${order.id}')">${translations[localStorage.getItem('selectedLanguage') || 'fr'].edit}</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteOrder('${order.id}')">${translations[localStorage.getItem('selectedLanguage') || 'fr'].delete}</button>
                </td>
            </tr>
        `;
        commandeTableBody.innerHTML += row;
    });

    renderPagination(sortedOrders.length, page, itemsPerPage);
}

// Function to filter orders
function filterOrders(orders) {
    const filterName = document.getElementById('filterName').value.toLowerCase();
    return orders.filter(order => 
        order.nom.toLowerCase().includes(filterName) || 
        order.prenom.toLowerCase().includes(filterName)
    );
}

// Function to sort orders
function sortOrders(orders) {
    const sortOrder = document.getElementById('sortOrder').value;
    return orders.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.nom.localeCompare(b.nom);
        } else {
            return b.nom.localeCompare(a.nom);
        }
    });
}

// Function to paginate orders
function paginate(orders, page, itemsPerPage) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return orders.slice(start, end);
}

// Function to render pagination
function renderPagination(totalItems, currentPage, itemsPerPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';

    for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" onclick="displayOrders(${i})">${i}</a>`;
        pagination.appendChild(li);
    }
}

// Function to export orders to CSV
document.getElementById('exportCSV').addEventListener('click', function () {
    const orders = getOrders();
    const csvContent = "data:text/csv;charset=utf-8," 
        + orders.map(order => Object.values(order).join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "commandes.csv");
    document.body.appendChild(link);
    link.click();
});

// Function to view order details
//function viewOrderDetails(orderId) {
  //  window.location.href = `orderDetails.html?id=${orderId}`;
//}

// Function to edit an order
function editOrder(orderId) {
    const order = getOrders().find(o => o.id === orderId);
    if (order) {
        document.getElementById('editNomClient').value = order.nom;
        document.getElementById('editPrenomClient').value = order.prenom;
        document.getElementById('editAdresseClient').value = order.adresse;
        document.getElementById('editTelephoneClient').value = order.telephone;
        document.getElementById('editArticlesCommandes').value = order.articles;

        // Save the ID of the order being edited
        document.getElementById('editOrderForm').dataset.orderId = orderId;

        // Show the modal
        const editOrderModal = new bootstrap.Modal(document.getElementById('editOrderModal'));
        editOrderModal.show();
    }
}

// Function to save edited order
function saveEditedOrder() {
    const orderId = document.getElementById('editOrderForm').dataset.orderId;
    const orders = getOrders();
    const orderIndex = orders.findIndex(o => o.id === orderId);

    if (orderIndex !== -1) {
        orders[orderIndex] = {
            id: orderId,
            nom: document.getElementById('editNomClient').value,
            prenom: document.getElementById('editPrenomClient').value,
            adresse: document.getElementById('editAdresseClient').value,
            telephone: document.getElementById('editTelephoneClient').value,
            articles: document.getElementById('editArticlesCommandes').value
        };
        saveOrders(orders);
        displayOrders();

        // Show a success popup
        showPopup('success', translations[localStorage.getItem('selectedLanguage') || 'fr'].orderUpdatedSuccess);

        // Close the modal
        const editOrderModal = bootstrap.Modal.getInstance(document.getElementById('editOrderModal'));
        editOrderModal.hide();
    }
}

// Function to delete an order
function deleteOrder(orderId) {
    if (confirm(translations[localStorage.getItem('selectedLanguage') || 'fr'].deleteConfirmation)) {
        const orders = getOrders().filter(o => o.id !== orderId);
        saveOrders(orders);
        displayOrders();
        showPopup('success', translations[localStorage.getItem('selectedLanguage') || 'fr'].orderDeletedSuccess);
    }
}

// Add order form submission
document.getElementById('commandeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const order = {
        id: generateId(),
        nom: document.getElementById('nomClient').value,
        prenom: document.getElementById('prenomClient').value,
        adresse: document.getElementById('adresseClient').value,
        telephone: document.getElementById('telephoneClient').value,
        articles: document.getElementById('articlesCommandes').value
    };
    const orders = getOrders();
    orders.push(order);
    saveOrders(orders);
    displayOrders();
    showPopup('success', translations[localStorage.getItem('selectedLanguage') || 'fr'].orderAddedSuccess);
    this.reset();
});

// Load orders on page load
document.addEventListener('DOMContentLoaded', function () {
    displayOrders();
});