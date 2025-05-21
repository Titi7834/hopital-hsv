# Hopital HSV - Application de Réservation

Cette application permet aux patients de prendre des rendez-vous avec les médecins de l'hôpital HSV.

## Fonctionnalités

- Prise de rendez-vous en ligne
- Sélection des médecins par spécialité
- Authentification des utilisateurs chiffrée
- Interface React moderne et réactive

## Prérequis

- Node.js (v14 ou supérieur)
- MySQL

## Installation

1. Clonez ce dépôt
2. Installez les dépendances :

```bash
npm install
```

3. Configurez votre base de données MySQL dans server.js si nécessaire (actuellement configuré avec user 'root' sans mot de passe)

## Démarrage de l'application

### Pour le développement (backend + frontend)

```bash
npm run dev
```

Cette commande lance :
- Le serveur backend sur le port 3001
- Le serveur frontend webpack-dev-server sur le port 3000

### Pour lancer uniquement le serveur backend

```bash
npm run server
```

### Pour lancer uniquement le frontend

```bash
npm start
```

### Pour construire l'application pour la production

```bash
npm run build
```

## Structure du projet

- `/src` - Code source React
- `/public` - Fichiers statiques
- `server.js` - Serveur backend Express
- `/src/components` - Composants React réutilisables
- `/src/pages` - Pages de l'application

## Base de données

L'application crée automatiquement la base de données `Hopital_HSV` avec les tables suivantes :
- `Patient` - Informations sur les patients (avec chiffrement des identifiants)
- `Medecin` - Liste des médecins et leurs spécialités
- `RendezVous` - Rendez-vous entre patients et médecins

## Sécurité

Les informations sensibles des patients (login et mot de passe) sont chiffrées avec AES-256-CBC.
