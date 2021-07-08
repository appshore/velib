import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

// accès au fichier json contenant les données fresco
const frescoes = low(new FileSync('database/frescoes.json'));

frescoes
    .defaults({
        frescoes: [],
    })
    .write();

const Fresco = frescoes.get('frescoes');

export { Fresco };
