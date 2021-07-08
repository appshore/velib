import 'dotenv/config';
import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';

import routes from './routes';

const app = express();

app.use(compression());

app.use(cors());

app.use(helmet());

// import des routes
app.use('/', routes);

app.listen(process.env.PORT, () => {
    /* eslint-disable no-console */
    console.log(`Backend serveur en écoute sur le port ${process.env.PORT}`);
});
