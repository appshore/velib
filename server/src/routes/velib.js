import express from 'express';

import {
    getVelib
} from '../controllers/Velib';

const velibRoutes = express.Router();

velibRoutes.get('/:distance/:polygon', getVelib);

export default velibRoutes;
