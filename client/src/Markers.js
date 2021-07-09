import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Icon } from 'leaflet';
import markerIconGreen from './assets/marker-icon-green.png';
import markerIconOrange from './assets/marker-icon-orange.png';
import markerIconRed from './assets/marker-icon-red.png';

import { Marker, Popup, useMapEvents } from 'react-leaflet';

function Markers({ distance }) {
    const [markers, setMarkers] = useState([]);

    const fetchMarkers = async (map, distance) => {

        // calcule le polygone de recherche pour éviter de rechercher des stations au dela de la carte visible
        const bounds = map.getBounds();
        const { lat: latNorth, lng: lonWest} = bounds.getNorthWest();
        const { lat: latSouth, lng: lonEast} = bounds.getSouthEast();
        const polygon = `(${latNorth},${lonWest}),(${latNorth},${lonEast}),(${latSouth},${lonEast}),(${latSouth},${lonWest})`;

        // fetch le Backend sur le status des stations
        try {
            const result = await axios({
                method: 'get',
                url: `http://localhost:8081/velib/${distance}/${polygon}`,
                headers: {
                    Accept: 'application/json',
                },
            });
            setMarkers(Object.values(result.data.data));
        } catch (err) {
            setMarkers([]);
        }
    };

    // gestion de quelques évènements utilisateur
    const map = useMapEvents({
        dragend(e) {
            fetchMarkers(map, distance);
        },
        zoomend(e) {
            fetchMarkers(map, distance);
        }
    });

    // ici on poll toutes les minutes le serveur pour retrouver le status des stations. Ce n'est pas la bonne solution pour de la production
    // un pub sub avec des websocket serait plus efficace
    useEffect(() => {
        const getMarkers = () => fetchMarkers(map, distance);

        const interval = setInterval(() => {
            getMarkers();
        }, 60000);

        getMarkers();

        return () => clearInterval(interval);
    }, [map, distance]);

    return (
        <div>
        {markers && markers.map((m, idx) => { 
            let markerColor = markerIconOrange;

            if( m.numbikesavailable < 1 ) {
                markerColor = markerIconRed;
            } else if (m.numbikesavailable > 3) { 
                markerColor = markerIconGreen;
            }

            return (
          <Marker position={m.coordonnees_geo} key={idx} icon={new Icon({iconUrl: markerColor, iconSize: [25, 41], iconAnchor: [12, 41]})}>
            <Popup>
                <h6>{m.name}</h6>
                <div>Vélos disponibles: {m.numbikesavailable}</div>
                <div>Vélos électriques disponibles: {m.ebike}</div>
                <div>Places disponibles: {m.numdocksavailable}</div>
            </Popup>
          </Marker>
        )})}
        </div>
    );
}

export default Markers;
