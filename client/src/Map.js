import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Icon } from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

import Markers from './Markers';

// L'adresse devrait étre un champ de saisie
const defaultAddress = '27%20Boulevard%20des%20Italiens,%2075002%20Paris';

function Map({address = defaultAddress}) {
    const [latlon, setLatlon] = useState([]);

    // requête le Backend pour convertir une adresse en coordonnées
    useEffect(() => {
        const GetLatlon = async () => {
            try {
                const result = await axios({
                    method: 'get',
                    url: `http://localhost:8081/nominatim/${address}`,
                    headers: {
                        Accept: 'application/json',
                    },
                });
                setLatlon(Object.values(result.data.data));
            } catch (err) {
                setLatlon([]);
            }
        };

        GetLatlon();
    }, [address]);

    return (
        latlon.length && <MapContainer center={latlon} zoom={16} scrollWheelZoom={false} id="mapid">
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* marker de l'adresse */}
            <Marker position={latlon} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41]})}>
                <Popup>
                    <h6>Votre adresse</h6>
                    {decodeURI(address)}
                </Popup>
            </Marker>

            {/* markers des stations Velib, la distance devrait être flexible selon le zoom ou le choix utilisateur */}
            <Markers distance={`${latlon},1000`}/>

        </MapContainer>
    );
}

export default Map;
