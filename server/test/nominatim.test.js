/* eslint-disable no-undef */
import 'regenerator-runtime/runtime';
import { default as request } from 'supertest';
import 'dotenv/config';
import express from 'express';

import routes from '../src/routes';

const app = express();

// import des routes
app.use('/', routes);

describe('Nominatim Endpoint', () => {
    it('retourne les coordonnées lat, lon', async () => {
        const res = await request(app).get('/nominatim/27%20Boulevard%20des%20Italiens,%2075002%20Paris').set('Accept', 'application/json');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data).toEqual({
            lat: 48.8709807,
            lon: 2.3353503,
        });
    });
});
