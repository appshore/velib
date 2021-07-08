import { Fresco } from '../../services/database';

// retourne toutes les fresques triées par année ascendant (défaut) ou descendant (asc === 'desc')
const listByYearFrescoes = async (req, res) => {
    let { asc } = req.params;

    try {
        const frescoes = await Fresco.orderBy('ANNEE_CREATION', asc).value();

        if (!frescoes) {
            return res.json({
                status: 'error',
                message: 'listByYear: Pas de fresque',
            });
        }

        // si l'on souhaite filtrer les colonnes à retourner
        // const data = frescoes.map((f) => {
        //     return { 
        //         PARCELLE: f.PARCELLE, 
        //         ANNEE_CREATION: f.ANNEE_CREATION,
        //         PHOTO: f.PHOTO
        //     };
        // });

        const data = frescoes;

        return res.json({
            status: 'success',
            data,
        });
    } catch (err) {
        return res.json({
            status: 'error',
            message: `Erreur db: ${err}`,
        });
    }
};

export default listByYearFrescoes;
