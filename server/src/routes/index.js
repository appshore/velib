import express from 'express';

import frescoesRoutes from './frescoes';

const routes = express.Router();

// les requêtes non REST sont déclinées
routes.use('/*', (req, res, next) => {
    if (
        req.headers && (req.headers.accept === 'application/json' || req.headers['content-type'] === 'application/json')
    ) {
        next();
    } else {
        res.status(422).send({ status: 'error', message: 'api REST invalide' });
    }
});

// routes frescoes
routes.use('/frescoes', frescoesRoutes);

// ping
routes.use('/ping', (req, res) => {
    res.send({ status: 'success', message: `Bievenue dans l'api REST` });
});

// catch all pour les routes inconnues
routes.all('/*', (req, res) => {
    res.status(422).send({ status: 'error', message: 'api REST invalide' });
});

export default routes;
