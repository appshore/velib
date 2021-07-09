/* eslint-disable no-undef */
import 'regenerator-runtime/runtime';
import { default as request } from 'supertest';
import 'dotenv/config';
import express from 'express';

import routes from '../src/routes';

const app = express();

// import des routes
app.use('/', routes);

const distance = '48.87507,2.34865,1000';
const polygon = '(48.87521,2.32530),(48.87521,2.34538),(48.86674,2.345387),(48.86674,2.32530)';

describe('Velib Endpoint', () => {
    it('retourne une liste de stations', async () => {
        const res = await request(app).get(`/velib/${distance}/${polygon}`).set('Accept', 'application/json');
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('data');
        expect(Object.keys(res.body.data).length > 1);
        expect(res.body.data[0]).toHaveProperty('coordonnees_geo');
        expect(res.body.data[0]).toHaveProperty('numbikesavailable');
        expect(res.body.data[0]).toHaveProperty('ebike');
    });
});
