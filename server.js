const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql2');
const crypto = require('crypto');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// --- Connexion MySQL et initialisation tables ---
const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Hopital_HSV',
});
const dbRoot = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    multipleStatements: true,
});
const initSql = `
CREATE DATABASE IF NOT EXISTS Hopital_HSV;
USE Hopital_HSV;
CREATE TABLE IF NOT EXISTS Patient (
  id_patient INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100),
  prenom VARCHAR(100),
  age INT,
  login VARBINARY(255),
  mdp VARBINARY(255)
);
CREATE TABLE IF NOT EXISTS Medecin (
  id_medecin INT AUTO_INCREMENT PRIMARY KEY,
  nom VARCHAR(100),
  prenom VARCHAR(100),
  specialite VARCHAR(100),
  image VARCHAR(255) DEFAULT 'default.jpg'
);
CREATE TABLE IF NOT EXISTS RendezVous (
  id_rdv INT AUTO_INCREMENT PRIMARY KEY,
  id_patient INT,
  id_medecin INT,
  date_rdv DATETIME,
  FOREIGN KEY (id_patient) REFERENCES Patient(id_patient),
  FOREIGN KEY (id_medecin) REFERENCES Medecin(id_medecin)
);

-- Vérifier si la colonne image existe déjà
SET @exist := (SELECT COUNT(*) FROM INFORMATION_SCHEMA.COLUMNS 
  WHERE TABLE_SCHEMA = 'Hopital_HSV' AND TABLE_NAME = 'Medecin' AND COLUMN_NAME = 'image');

-- Si elle n'existe pas, l'ajouter
SET @query = IF(@exist = 0, 'ALTER TABLE Medecin ADD COLUMN image VARCHAR(255) DEFAULT "default.jpg"', 'SELECT "Column already exists"');
PREPARE stmt FROM @query;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- Insérer ou mettre à jour les médecins avec leurs images
INSERT INTO Medecin (id_medecin, nom, prenom, specialite, image) VALUES
  (1, 'Dupont', 'Jean', 'Cardiologie', 'doctor1.jpg'),
  (2, 'Martin', 'Sophie', 'Dermatologie', 'doctor2.jpg'),
  (3, 'Durand', 'Paul', 'Généraliste', 'doctor3.jpg')
ON DUPLICATE KEY UPDATE 
  nom = VALUES(nom), 
  prenom = VALUES(prenom), 
  specialite = VALUES(specialite), 
  image = VALUES(image);
`;
dbRoot.query(initSql, (err) => {
    if (err) {
        console.error('Erreur lors de la création de la base ou des tables:', err);
        process.exit(1);
    } else {
        console.log('Base de données et tables prêtes.');
    }
});

// --- Chiffrement ---
function chiffrer(data) {
    const key = '12345678901234567890123456789012'; // 32 caractères (256 bits)
    const iv = Buffer.alloc(16, 0);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return Buffer.from(encrypted, 'hex');
}

// --- API Patients ---
app.post('/api/patients', (req, res) => {
    const { nom, prenom, age, login, mdp } = req.body;
    if (!nom || !prenom || !login || !mdp || !age) {
        return res.status(400).send('Données incomplètes');
    }
    const loginChiffre = chiffrer(login);
    const mdpChiffre = chiffrer(mdp);
    function insertPatient() {
        db.query(
            'INSERT INTO Patient (nom, prenom, age, login, mdp) VALUES (?, ?, ?, ?, ?)',
            [nom, prenom, age, loginChiffre, mdpChiffre],
            (err, result) => {
                if (err) {
                    if (err.code === 'ER_BAD_FIELD_ERROR' && err.message.includes('age')) {
                        db.query('ALTER TABLE Patient ADD COLUMN age INT AFTER prenom', (err2) => {
                            if (err2) {
                                console.error('Erreur ajout colonne age:', err2);
                                return res.status(500).send('Erreur base de données (ajout colonne age)');
                            }
                            insertPatient();
                        });
                    } else {
                        console.error(err);
                        return res.status(500).send('Erreur base de données');
                    }
                } else {
                    res.send({ message: 'Patient créé', id_patient: result.insertId });
                }
            }
        );
    }
    insertPatient();
});

// --- API Médecins ---
app.get('/api/medecins', (req, res) => {
    db.query('SELECT id_medecin, nom, prenom, specialite, image FROM Medecin', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur base de données');
        }
        res.json(results);
    });
});

// --- API Specialités --- (Ajouté pour extraire les spécialités uniques)
app.get('/api/specialites', (req, res) => {
    db.query('SELECT DISTINCT specialite FROM Medecin ORDER BY specialite', (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Erreur base de données');
        }
        // Extraire juste les noms des spécialités
        const specialites = results.map(row => row.specialite);
        res.json(specialites);
    });
});

// --- API Médecins par spécialité ---
app.get('/api/medecins/specialite/:specialite', (req, res) => {
    const specialite = req.params.specialite;
    db.query(
        'SELECT id_medecin, nom, prenom, image FROM Medecin WHERE specialite = ?',
        [specialite],
        (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erreur base de données');
            }
            res.json(results);
        }
    );
});

// --- API Rendez-vous ---
app.post('/api/rendezvous', (req, res) => {
    const { id_patient, id_medecin, date_rdv } = req.body;
    if (!id_patient || !id_medecin || !date_rdv) {
        return res.status(400).send('Données incomplètes');
    }
    db.query(
        'INSERT INTO RendezVous (id_patient, id_medecin, date_rdv) VALUES (?, ?, ?)',
        [id_patient, id_medecin, date_rdv],
        (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Erreur base de données');
            }
            res.send({ message: 'Rendez-vous ajouté' });
        }
    );
});

// Servir les fichiers statiques depuis le dossier public
app.use(express.static(path.join(__dirname, 'public')));

// En développement, l'API sera servie sur un port différent
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Serveur API lancé sur http://localhost:${PORT}`);
});
