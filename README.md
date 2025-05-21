<<<<<<< HEAD
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
=======
# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
>>>>>>> f098293c3d2b5e2846605695e57df7758addf8c2
