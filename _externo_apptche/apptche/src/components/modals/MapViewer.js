import React from 'react';
import { X, Map } from 'lucide-react';

const MapViewer = ({ mapa, onClose }) => {
  if (!mapa) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center text-white">
            <Map className="w-8 h-8" />
          </div>
          <div>
            <h2 className="font-bold text-xl text-gray-900">{mapa.titulo}</h2>
            <p className="text-gray-600">{mapa.produtor}</p>
          </div>
        </div>
        <div className="space-y-2 text-gray-700">
          <div><strong>Tipo:</strong> {mapa.tipo}</div>
          <div><strong>Status:</strong> {mapa.status}</div>
          <div><strong>Data:</strong> {mapa.data}</div>
          <div><strong>Safra:</strong> {mapa.safra}</div>
          <div><strong>Descrição:</strong> {mapa.descricao}</div>
        </div>
        <div className="mt-6">
          <button onClick={onClose} className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default MapViewer;
