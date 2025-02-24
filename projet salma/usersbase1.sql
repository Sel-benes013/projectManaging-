CREATE TABLE Utilisateurs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employeeNumber VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    firstName VARCHAR(50) NOT NULL,
    store VARCHAR(100) NOT NULL,
    mission VARCHAR(100) NOT NULL,
    recruitmentDate DATE NOT NULL,
    startDate DATE NOT NULL,
    userId VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    lastLogin DATETIME
);