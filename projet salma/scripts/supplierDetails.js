document.addEventListener('DOMContentLoaded', function () {
    const supplierId = new URLSearchParams(window.location.search).get('id');
    const suppliers = JSON.parse(localStorage.getItem('fournisseurs')) || [];
    const supplier = suppliers.find(s => s.id === supplierId);

    if (supplier) {
        const lang = localStorage.getItem('selectedLanguage') || 'fr';
        const translation = translations[lang];
        const supplierDetailsContent = document.getElementById('supplierDetailsContent');
        supplierDetailsContent.innerHTML = `
            <p><strong>${translation.name}:</strong> ${supplier.nom}</p>
            <p><strong>${translation.firstName}:</strong> ${supplier.prenom}</p>
            <p><strong>${translation.company}:</strong> ${supplier.entreprise}</p>
            <p><strong>${translation.address}:</strong> ${supplier.adresse}</p>
            <p><strong>${translation.phone}:</strong> ${supplier.telephone}</p>
        `;
    }
});

function exportToPDF() {
    const element = document.getElementById('supplierDetailsContent');
    html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf.jsPDF();
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('supplier_details.pdf');
    });
}