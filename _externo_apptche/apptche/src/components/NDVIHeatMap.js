import React, { useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';
import 'leaflet/dist/leaflet.css';

// Coordenadas simuladas para Mato Grosso (centralizadas)
const center = [-13.0, -56.0];
const bounds = [[-17.0, -60.0], [-10.0, -52.0]];

// Pontos NDVI simulados: [lat, lng, intensidade]
const points = [
  [-13.2, -56.1, 0.9], // Vegetação saudável
  [-13.1, -56.2, 0.8],
  [-13.3, -56.0, 0.7],
  [-13.0, -56.3, 0.2], // Vegetação estressada
  [-13.4, -56.2, 0.3],
  [-13.2, -56.4, 0.1],
  [-13.1, -56.0, 0.5],
  [-13.3, -56.3, 0.6],
  [-13.0, -56.1, 0.4],
];

const NDVIHeatMap = () => {
  return (
    <div style={{ width: '100%', height: '450px' }}>
      <MapContainer center={center} zoom={8} style={{ width: '100%', height: '100%' }} bounds={bounds}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Heatmap points={points} radius={30} blur={20} max={1} />
      </MapContainer>
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{ background: '#ff0000', width: 24, height: 12, display: 'inline-block', borderRadius: 4 }}></span>
          <span style={{ fontSize: 14 }}>Baixo índice de vegetação</span>
          <span style={{ background: '#00ff00', width: 24, height: 12, display: 'inline-block', borderRadius: 4, marginLeft: 16 }}></span>
          <span style={{ fontSize: 14 }}>Alto índice de vegetação</span>
        </div>
        <p style={{ fontSize: 13, color: '#555', marginTop: 8 }}>
          O NDVI indica áreas saudáveis (verde) e áreas problemáticas (vermelho). Use para monitorar a saúde das plantas e tomar decisões agronômicas.
        </p>
      </div>
    </div>
  );
};

export default NDVIHeatMap;

function Heatmap({ points, radius = 25, blur = 15, max = 1 }) {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    // Convert points to [lat, lng, intensity]
    const heatPoints = points.map((p) => [p[0], p[1], p[2]]);

    const heatLayer = L.heatLayer(heatPoints, { radius, blur, maxZoom: 18, max });
    heatLayer.addTo(map);

    // Optionally fit bounds when points change
    try {
      const latLngs = heatPoints.map((p) => L.latLng(p[0], p[1]));
      if (latLngs.length) {
        const group = L.latLngBounds(latLngs);
        map.fitBounds(group, { padding: [20, 20] });
      }
    } catch (e) {
      // ignore
    }

    return () => {
      heatLayer.remove();
    };
  }, [map, points, radius, blur, max]);

  return null;
}
