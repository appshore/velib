import express from 'express';

import {
    getNominatim
} from '../controllers/Nominatim';

const nominatimRoutes = express.Router();

nominatimRoutes.get('/:address', getNominatim);

export default nominatimRoutes;
