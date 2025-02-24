<?php
// listUsers.php
require 'config.php';

// Récupérer les utilisateurs depuis la base de données
$sql = "SELECT * FROM Utilisateurs";
$stmt = $pdo->query($sql);
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Liste des utilisateurs</title>
    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap" rel="stylesheet">
    <style>
        /* Styles personnalisés */
        body {
            font-family: 'Poppins', sans-serif;
            background-color: #fce4ec; /* Rose pâle */
        }

        h1 {
            font-weight: 600;
            color: #6d6875; /* Gris-violet */
        }

        .card {
            border: none;
            background-color: #ffe8e8; /* Beige-rose */
            border-radius: 12px;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .card:hover {
            transform: scale(1.03);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .btn-primary {
            background-color: #f48fb1; /* Rose clair */
            border: none;
            font-weight: 600;
        }

        .btn-primary:hover {
            background-color: #ec407a; /* Rose vif */
        }

        .form-control, .form-select {
            border-radius: 12px;
            border: 1px solid #ec407a;
        }

        .form-control:focus, .form-select:focus {
            border-color: #ec407a;
            box-shadow: 0 0 5px rgba(236, 64, 122, 0.5);
        }

        .navbar {
            background-color: #f8bbd0; /* Rose pastel */
            padding: 1rem;
            border-radius: 0.5rem;
        }

        .navbar .form-control {
            border-radius: 20px;
        }

        .table {
            background-color: #ffffff;
            border-radius: 12px;
            overflow: hidden;
        }

        .table th {
            background-color: #ec407a; /* Rose vif */
            color: #ffffff;
        }

        .table td, .table th {
            padding: 12px;
            text-align: center;
        }

        .table tbody tr:hover {
            background-color: #f8bbd0; /* Rose pastel */
        }
    </style>
</head>
<body>
    <div class="container mt-5">
        <div class="navbar mb-4 d-flex justify-content-between align-items-center">
            <h1>Liste des utilisateurs</h1>
        </div>

        <!-- Tableau des utilisateurs -->
        <div class="card p-4">
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Numéro d'employé</th>
                            <th>Nom</th>
                            <th>Prénom</th>
                            <th>Magasin affecté</th>
                            <th>Mission</th>
                            <th>Date de recrutement</th>
                            <th>Date de début de travail</th>
                            <th>ID utilisateur</th>
                            <th>Dernière connexion</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php foreach ($users as $user): ?>
                            <tr>
                                <td><?= htmlspecialchars($user['employeeNumber']) ?></td>
                                <td><?= htmlspecialchars($user['lastName']) ?></td>
                                <td><?= htmlspecialchars($user['firstName']) ?></td>
                                <td><?= htmlspecialchars($user['store']) ?></td>
                                <td><?= htmlspecialchars($user['mission']) ?></td>
                                <td><?= htmlspecialchars($user['recruitmentDate']) ?></td>
                                <td><?= htmlspecialchars($user['startDate']) ?></td>
                                <td><?= htmlspecialchars($user['userId']) ?></td>
                                <td><?= htmlspecialchars($user['lastLogin']) ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Bootstrap JS -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>