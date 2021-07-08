# Réalisation du test

## Environnement
* MacOS
* git pour le contrôle de version
* Javascript, nodeJS, npm
* ExpressJS pour le serveur REST (Backend)
* LowDB en tant que référentiel des données
* ReactJS pour le client (Frontend)
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
    $ git remote add origin git@github.com:appshore/frescoes.git
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

    $ npm add jest lowdb

### Base de données
    $ cd <racine-projet> 
    $ mkdir datasource
    $ cd datasource

> copier le fichier 68224_fresques_mulhouse.csv

> convertir le csv en json (format lowdb) avec https://csvjson.com/csv2json

> Copier le fichier 68224_fresques_mulhouse.csv dans <racine-projet>/server/database/frescoes.json pour le réinitialiser

    $ cd <racine-projet>
    $ cp datasource/68224_fresques_mulhouse.json server/database/frescoes.json
    $ cd server
    $ npm start

> Le jeux de données n'a pas été validé en amont. On retrouve deux enregistrements avec le même numéro de parcelle (id) et un avec une url invalide. Ces 2 cas ne sont pas gérés dans le cadre du test ce qui génère des effets de bord (suppression de deux enregistrements simultanément, image manquante).

### Frontend
    $ cd <racine-projet>
    $ npx create-react-app --use-npm client 
    $ cd client
    $ rm -rf .git
    $ rm .gitignore
    $ npm start

> Vérifiez que le serveur Frontend est disponible sur `http://localhost:3000/`

> La colonne Annee a été ajouté dans la liste pour gérer le tri 

### commandes CURL

> Requête retournant toutes les fresques

curl -X GET http://localhost:8081/frescoes -H 'Accept: application/json'

> Requête retournant une fresque par son numéro de parcelle

curl -X GET http://localhost:8081/frescoes/1 -H 'Accept: application/json'

> Requête supprimant une fresque par son numéro de parcelle

curl -X DELETE http://localhost:8081/frescoes/1 -H 'Accept: application/json'

> Requête par année ascendante (asc est optionel)

curl -X GET http://localhost:8081/frescoes/annee/asc -H 'Accept: application/json'

> Requête par année descendante (desc est obligatoire)

curl -X GET http://localhost:8081/frescoes/annee/desc -H 'Accept: application/json'

### A Faire

> Unit tests sur Frontend. Coverage partout.

> Fonctions non implémentées Carousel et Map. Voir example avec cartographie https://github.com/appshore/ReactLeafletTypescript

> Ajouter Authentication/Authorization: Voir example CRUD avec Express et Passport https://github.com/appshore/Quest

> Microservices (fault tolerant, scalable) sur Docker. Voir example https://github.com/appshore/OrdersToParcelsMicroservices