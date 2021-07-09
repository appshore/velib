# Réalisation du test

## Environnement
* MacOS
* git pour le contrôle de version
* Javascript, nodeJS, npm
* ExpressJS pour le serveur REST (Backend)
* ReactJS pour le client (Frontend)
* Axios pour les requêtes HTTP client et serveur
* Jest pour les tests

## Initialisation repository
    $ mkdir test # <racine-projet>
    $ cd test
 
> Fichiers à initialiser

    $ touch README.md # ce fichier
    $ touch .gitignore

> Dans le cadre de ce test, un seul repository Git est créé. 

    $ git init .
    $ git add .
    $ git commit -m "initialisation"
    $ git remote add origin git@github.com:appshore/velib.git
    $ git branch -M main
    $ git push -u origin main

### Backend
    $ cd <racine-projet>
    $ npx express-generator --no-view server 
    $ cd server
    $ npm i
    $ npm start

> Vérifiez que le serveur Backend est disponible sur `http://localhost:3000/`, le port est modifié plus tard en 8081 par variable d'environnement.

> Arrêter le serveur Backend et ajouter les paquets suivants

    $ npm add jest

### Frontend
    $ cd <racine-projet>
    $ npx create-react-app --use-npm client 
    $ cd client
    $ rm -rf .git
    $ rm .gitignore
    $ npm start

> Vérifiez que le serveur Frontend est disponible sur `http://localhost:3000/`

### commandes CURL

> Requête retournant les coordonnées géographiques (lat, lon) d'une adresse

curl -X GET http://localhost:8081/nominatim/27%20Boulevard%20des%20Italiens,%2075002%20Paris -H 'Accept: application/json'


> Requête retournant les stations Velib selon le lieu, la distance sur un polygone géographique

curl -X GET http://localhost:8081/velib/48.87507,2.34865,500/(48.87521,2.32530),(48.87521,2.34538),(48.86674,2.345387),(48.86674,2.32530) -H 'Accept: application/json'
