/* eslint-disable no-undef */
import 'regenerator-runtime/runtime';
import { default as request } from 'supertest';
import 'dotenv/config';
import express from 'express';

import routes from '../src/routes';

const app = express();

// import des routes
app.use('/', routes);

describe('Frescoes Endpoints', () => {
    it('should retrieve a fresco with parcelle = 1', async () => {
        const res = await request(app).get('/frescoes/1').set('Accept', 'application/json');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toHaveProperty('PARCELLE');
        expect(res.body.data.PARCELLE).toEqual(1);
    });
    it('should retrieve a fresco with parcelle = 57', async () => {
        const res = await request(app).get('/frescoes/57').set('Accept', 'application/json');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toEqual({
            CODE_INSEE: 68224,
            CATEGORIE: 'Fresque enseigne et publicitaire',
            ETAT_OEUVRE: 'Moyen',
            PHOTO: 'https://intranet-ext2.mulhouse.fr/opendata/image/TOURISME/FRESQUES/Soultz_148.JPG',
            ETAT_SUPPORT: 'Moyen',
            COMMENTAIRE: 'Personnages - Fresque enseigne',
            SUPPORT: 'Façade',
            ANNEE_CREATION: 1987,
            ARTISTE: 'Inconnu',
            MAITRE_OEUVRE: '',
            PROPRIETAIRE: 'Privé',
            MNEMO: 'SOULTZ',
            NUM_POSTAL: 148,
            SECTION: 'IX',
            PARCELLE: 57,
            GEO_POINT: '47.7758437414, 7.31989988086',
            GEO_SHAPE: {
                type: 'Point',
                coordinates: [7.319899880863025, 47.77584374138085],
            },
            NOM_RUE: 'SOULTZ, Rue de',
        });
    });
    it('should retrieve all 20 frescoes', async () => {
        const res = await request(app).get('/frescoes').set('Accept', 'application/json');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(Object.keys(res.body.data).length).toBe(20);
    });
});
