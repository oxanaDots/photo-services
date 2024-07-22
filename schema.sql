USE booking_system;

CREATE TABLE Clients (
id INT AUTO_INCREMENT PRIMARY KEY,
    nameInput varchar(100)
    emailInput varchar(100),
    phoneNumber varchar(100),
    eventType varchar(100),
    requiredService varchar(100),
    dateRequired
);