import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapUploader = () => {

  const [geoJsonData, setGeoJsonData] = useState(null);

  // Carrega o GeoJSON de Mato Grosso ao montar
  React.useEffect(() => {
    fetch('/mato_grosso.geojson')
      .then((res) => res.json())
      .then((data) => setGeoJsonData(data))
      .catch(() => setGeoJsonData(null));
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          setGeoJsonData(json);
        } catch (err) {
          alert('Arquivo inválido! Certifique-se de que é um GeoJSON.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <input type="file" accept=".geojson,application/json" onChange={handleFileUpload} />
      <div style={{ width: '100%', height: '450px', marginTop: '10px' }}>
        <MapContainer center={[-13.0, -56.0]} zoom={6} style={{ width: '100%', height: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          {geoJsonData && <GeoJSON data={geoJsonData} />}
        </MapContainer>
      </div>
      <p style={{marginTop: '10px'}}>O mapa de Mato Grosso é exibido por padrão. Você pode fazer upload de outro arquivo GeoJSON para visualizar no mapa.</p>
    </div>
  );
};

export default MapUploader;
