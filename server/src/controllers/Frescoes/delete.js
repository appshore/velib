import { Fresco } from '../../services/database';

// supprime une fresque par identifiant (PARCELLE)
const deleteFresco = async (req, res) => {
    let { frescoId } = req.params;

    try {
        const parcelle = parseInt(frescoId);

        const fresco = await Fresco.find({ PARCELLE: parcelle }).value();

        if (!fresco) {
            return res.json({
                status: 'error',
                message: 'deleteFresco: Pas de fresque',
            });
        }

        await Fresco.remove({ PARCELLE: parcelle }).write();

        return res.json({
            status: 'success',
            message: 'Fresque supprimée',
        });
    } catch (err) {
        return res.json({
            status: 'error',
            message: `Erreur db: ${err}`,
        });
    }
};

export default deleteFresco;
