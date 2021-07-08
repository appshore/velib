import express from 'express';

import {
    deleteFresco,
    getFresco,
    listFrescoes,
    listByYearFrescoes
} from '../controllers/Frescoes';

const frescoesRoutes = express.Router();

// fresco
frescoesRoutes.delete('/:frescoId', deleteFresco);
frescoesRoutes.get('/', listFrescoes);
frescoesRoutes.get('/annee/:asc?', listByYearFrescoes);
frescoesRoutes.get('/:frescoId', getFresco);



export default frescoesRoutes;
