CREATE DATABASE horse_db;
USE horse_db;

CREATE TABLE horses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sex ENUM('Stallion', 'Mare', 'Gelding'),
    sire_id INT NULL,
    dam_id INT NULL,
    FOREIGN KEY (sire_id) REFERENCES horses(id),
    FOREIGN KEY (dam_id) REFERENCES horses(id)
);

INSERT INTO horses (id, name, sex) VALUES (1, 'Old Legend', 'Stallion');
INSERT INTO horses (id, name, sex, sire_id) VALUES (2, 'Thunder Son', 'Stallion', 1);
INSERT INTO horses (id, name, sex) VALUES (3, 'Misty Morning', 'Mare');
INSERT INTO horses (id, name, sex, sire_id, dam_id) VALUES (4, 'Fast Lightning', 'Gelding', 2, 3);

SELECT * FROM horses ORDER BY ID ASC LIMIT 250;

