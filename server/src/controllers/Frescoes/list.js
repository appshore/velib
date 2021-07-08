import { Fresco } from '../../services/database';

// retourne toutes les fresques
const listFrescoes = async (req, res) => {
    try {
        const frescoes = await Fresco.value();

        if (!frescoes) {
            return res.json({
                status: 'error',
                message: 'listFrescoes: Pas de fresque',
            });
        }

        return res.json({
            status: 'success',
            data: frescoes,
        });
        
    } catch (err) {
        return res.json({
            status: 'error',
            message: `Erreur db: ${err}`,
        });
    }
};

export default listFrescoes;
