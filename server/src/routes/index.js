import express from 'express';

import nominatimRoutes from './nominatim';
import velibRoutes from './velib';

const routes = express.Router();

// En commentaire pour permettre la visualisation depuis un navigateur
// les requêtes non REST sont déclinées
// routes.use('/*', (req, res, next) => {
//     if (
//         req.headers && (req.headers.accept === 'application/json' || req.headers['content-type'] === 'application/json')
//     ) {
//         next();
//     } else {
//         res.status(422).send({ status: 'error', message: 'api REST invalide' });
//     }
// });

// routes nominatim
routes.use('/nominatim', nominatimRoutes);

// routes velib
routes.use('/velib', velibRoutes);

// ping
routes.use('/ping', (req, res) => {
    res.send({ status: 'success', message: `Bienvenue dans l'api REST` });
});

// catch all pour les routes inconnues
routes.all('/*', (req, res) => {
    res.status(422).send({ status: 'error', message: 'api REST invalide' });
});

export default routes;
