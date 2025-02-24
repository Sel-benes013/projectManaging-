// Variables pour stocker les données
let stock = [];
let fournisseurs = [];
let employes = [];

// Afficher une section
function showSection(sectionId) {
    document.querySelectorAll("section").forEach(section => {
        section.classList.add("hidden");
    });
    document.getElementById(sectionId).classList.remove("hidden");
}

// Gestion du stock
function ajouterProduit() {
    const nom = document.getElementById("nomProduit").value;
    const quantite = document.getElementById("quantiteProduit").value;
    const categorie = document.getElementById("categorieProduit").value;
    const prix = document.getElementById("prixProduit").value;

    stock.push({ nom, quantite, categorie, prix });
    afficherStock();
}

function afficherStock() {
    const table = document.getElementById("stockTable");
    table.innerHTML = `
        <tr>
            <th>Nom</th>
            <th>Quantité</th>
            <th>Catégorie</th>
            <th>Prix</th>
            <th>Actions</th>
        </tr>
    `;
    stock.forEach((produit, index) => {
        const row = `
            <tr>
                <td>${produit.nom}</td>
                <td>${produit.quantite}</td>
                <td>${produit.categorie}</td>
                <td>${produit.prix}</td>
                <td>
                    <button onclick="supprimerProduit(${index})">Supprimer</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

function supprimerProduit(index) {
    stock.splice(index, 1);
    afficherStock();
}

// Gestion des fournisseurs
function ajouterFournisseur() {
    const nom = document.getElementById("nomFournisseur").value;
    const contact = document.getElementById("contactFournisseur").value;

    fournisseurs.push({ nom, contact });
    afficherFournisseurs();
}

function afficherFournisseurs() {
    const table = document.getElementById("fournisseurTable");
    table.innerHTML = `
        <tr>
            <th>Nom</th>
            <th>Contact</th>
            <th>Actions</th>
        </tr>
    `;
    fournisseurs.forEach((fournisseur, index) => {
        const row = `
            <tr>
                <td>${fournisseur.nom}</td>
                <td>${fournisseur.contact}</td>
                <td>
                    <button onclick="supprimerFournisseur(${index})">Supprimer</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

function supprimerFournisseur(index) {
    fournisseurs.splice(index, 1);
    afficherFournisseurs();
}

// Gestion des employés
function ajouterEmploye() {
    const nom = document.getElementById("nomEmploye").value;
    const role = document.getElementById("roleEmploye").value;

    employes.push({ nom, role });
    afficherEmployes();
}

function afficherEmployes() {
    const table = document.getElementById("employeTable");
    table.innerHTML = `
        <tr>
            <th>Nom</th>
            <th>Rôle</th>
            <th>Actions</th>
        </tr>
    `;
    employes.forEach((employe, index) => {
        const row = `
            <tr>
                <td>${employe.nom}</td>
                <td>${employe.role}</td>
                <td>
                    <button onclick="supprimerEmploye(${index})">Supprimer</button>
                </td>
            </tr>
        `;
        table.innerHTML += row;
    });
}

function supprimerEmploye(index) {
    employes.splice(index, 1);
    afficherEmployes();
}
