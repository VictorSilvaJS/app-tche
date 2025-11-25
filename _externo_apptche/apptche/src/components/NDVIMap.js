import React from 'react';
import { MapContainer, TileLayer, ImageOverlay } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// Bounds aproximados para Mato Grosso
const bounds = [[-17.0, -60.0], [-10.0, -54.0]];

const NDVIMap = () => {
  return (
    <div style={{ width: '100%', height: '450px' }}>
      <MapContainer bounds={bounds} style={{ width: '100%', height: '100%' }} zoom={7} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {/* Simulação de NDVI usando imagem local */}
        <ImageOverlay
          url="/ndvi_example.png"
          bounds={bounds}
          opacity={0.7}
        />
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

export default NDVIMap;
