<?php
// config.php
$host = 'localhost';
$dbname = 'usersbase1.sql';
$user = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$usersbase1", $user, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Erreur de connexion à la base de données : " . $e->getMessage());
}
?>