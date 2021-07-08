import { Fresco } from '../../services/database';

// retourne une fresque par identifiant (PARCELLE)
const getFresco = async (req, res) => {
    let { frescoId } = req.params;

    try {
        const fresco = await Fresco.find({ PARCELLE: parseInt(frescoId) }).value();

        if (!fresco) {
            return res.json({
                status: 'error',
                message: 'getFresco: Pas de fresque',
            });
        }

        return res.json({
            status: 'success',
            data: fresco,
        });
    } catch (err) {
        return res.json({
            status: 'error',
            message: `Erreur db: ${err}`,
        });
    }
};

export default getFresco;
