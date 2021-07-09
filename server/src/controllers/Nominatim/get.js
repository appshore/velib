
import axios from 'axios';

// retourne des coordonnées géographique en fonction d'une adresse
const getNominatim = async (req, res) => {
    let { address } = req.params;

    try {
        const { data } = await axios.get(`https://nominatim.openstreetmap.org/search?q=${encodeURI(address)}&format=json`);

        if (!data) {
            return res.json({
                status: 'error',
                message: 'getNominatim: Coordonnées non disponibles',
            });
        }

        return res.json({
            status: 'success',
            data: { lat: parseFloat(data[0].lat), lon : parseFloat(data[0].lon)}, // extraction de lat et lon 
        });
    } catch (err) {
        return res.json({
            status: 'error',
            message: `Erreur axios: ${err}`,
        });
    }
};

export default getNominatim;