<?php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $employeeNumber = $_POST['employeeNumber'];
    $lastName = $_POST['lastName'];
    $firstName = $_POST['firstName'];
    $store = $_POST['store'];
    $mission = $_POST['mission'];
    $recruitmentDate = $_POST['recruitmentDate'];
    $startDate = $_POST['startDate'];
    $userId = $_POST['userId'];
    $password = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hasher le mot de passe

    try {
        $sql = "INSERT INTO Utilisateurs (employeeNumber, lastName, firstName, store, mission, recruitmentDate, startDate, userId, password) 
                VALUES (:employeeNumber, :lastName, :firstName, :store, :mission, :recruitmentDate, :startDate, :userId, :password)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([
            ':employeeNumber' => $employeeNumber,
            ':lastName' => $lastName,
            ':firstName' => $firstName,
            ':store' => $store,
            ':mission' => $mission,
            ':recruitmentDate' => $recruitmentDate,
            ':startDate' => $startDate,
            ':userId' => $userId,
            ':password' => $password
        ]);

        // redirection à la page d'affichage après l'insertion 
        header("Location: displayusers1.html");
        exit();
    } catch (PDOException $e) {
        die("Erreur lors de l'ajout de l'utilisateur : " . $e->getMessage());
    }
}
?>