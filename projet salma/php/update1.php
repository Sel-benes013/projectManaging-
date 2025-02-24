<?php
// update.php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = $_POST['id'];
    $nom = htmlspecialchars($_POST['nom']);
    $email = htmlspecialchars($_POST['email']);

    $sql = "UPDATE Utilisateurs SET nom = :nom, email = :email WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':nom' => $nom, ':email' => $email, ':id' => $id]);

    echo "Utilisateur mis à jour avec succès !";
}

// Récupérer l'utilisateur à modifier
if (isset($_GET['id'])) {
    $id = $_GET['id'];
    $sql = "SELECT * FROM Utilisateurs WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([':id' => $id]);
    $utilisateur = $stmt->fetch(PDO::FETCH_ASSOC);
}
?>

<form method="POST" action="update.php">
    <input type="hidden" name="id" value="<?= $utilisateur['id'] ?>">
    <input type="text" name="nom" value="<?= $utilisateur['nom'] ?>" required><br>
    <input type="email" name="email" value="<?= $utilisateur['email'] ?>" required><br>
    <button type="submit">Mettre à jour</button>
</form>