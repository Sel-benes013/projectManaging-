document.addEventListener('DOMContentLoaded', function () {
    const orderId = new URLSearchParams(window.location.search).get('id');
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id === orderId);

    if (order) {
        const orderDetailsContent = document.getElementById('orderDetailsContent');
        const lang = localStorage.getItem('selectedLanguage') || 'fr';
        const translation = translations[lang];
        orderDetailsContent.innerHTML = `
            <p><strong>${translation.name}:</strong> ${order.nom}</p>
            <p><strong>${translation.firstName}:</strong> ${order.prenom}</p>
            <p><strong>${translation.address}:</strong> ${order.adresse}</p>
            <p><strong>${translation.phone}:</strong> ${order.telephone}</p>
            <p><strong>${translation.articles}:</strong> ${order.articles}</p>
            <p><strong>${translation.orderDate}:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>${translation.orderStatus}:</strong> <span class="badge bg-success">${translation.delivered}</span></p>
        `;
    }

    // Apply translations to all elements
    applyTranslations(lang);
});

function applyTranslations(lang) {
    const translation = translations[lang];
    for (const [key, value] of Object.entries(translation)) {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = value;
        }
    }
}

function exportToPDF() {
    const element = document.getElementById('orderDetailsContent');
    html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('order_details.pdf');
    });
}