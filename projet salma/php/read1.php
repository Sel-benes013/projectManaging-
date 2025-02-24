<?php
// read.php
require 'config.php';

$sql = "SELECT * FROM Utilisateurs";
$stmt = $pdo->query($sql);
$utilisateurs = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($utilisateurs as $utilisateur) {
    echo "ID: " . $utilisateur['id'] . "<br>";
    echo "Nom: " . $utilisateur['nom'] . "<br>";
    echo "Email: " . $utilisateur['email'] . "<br>";
    echo "<hr>";
}
?>
<?php
// read.php
require 'config.php';

$sql = "SELECT * FROM Utilisateurs";
$stmt = $pdo->query($sql);
$utilisateurs = $stmt->fetchAll(PDO::FETCH_ASSOC);

foreach ($utilisateurs as $utilisateur) {
    echo "ID: " . $utilisateur['id'] . "<br>";
    echo "Nom: " . $utilisateur['nom'] . "<br>";
    echo "Email: " . $utilisateur['email'] . "<br>";
    echo "<a href='update.php?id=" . $utilisateur['id'] . "'>Modifier</a> | ";
    echo "<a href='delete.php?id=" . $utilisateur['id'] . "'>Supprimer</a>";
    echo "<hr>";
}
?>