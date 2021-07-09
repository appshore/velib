
import axios from 'axios';

// retourne des coordonnées en fonction d'une adresse
const getVelib = async (req, res) => {
    let { distance, polygon } = req.params;

    // on remonte 50 stations au maximum
    // le nombre réel dépendra de la taille du polygone
    // et de la distance maximum souhaitée (fixée à 1000m par le client)
    try {
        const { data: { records } } = await axios.get(`https://data.opendatasoft.com/api/records/1.0/search/?dataset=velib-disponibilite-en-temps-reel%40parisdata&rows=50&geofilter.distance=${distance}
        &geofilter.polygon=${polygon}`);

        if (!records) {
            return res.json({
                status: 'error',
                message: 'getVelib: Stations non disponibles',
            });
        }

        return res.json({
            status: 'success',
            data: records.map(r => r.fields),
        });
    } catch (err) {
        return res.json({
            status: 'error',
            message: `Erreur axios: ${err}`,
        });
    }
};

export default getVelib;