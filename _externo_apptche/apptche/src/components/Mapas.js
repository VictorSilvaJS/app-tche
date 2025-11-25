
import React, { useState } from 'react';
import MapUploader from './MapUploader';
import mapasMock from '../data/mapas';
import NDVIHeatMap from './NDVIHeatMap';
import { Map, Plus, Calendar, Leaf, Eye, Download, MapPin } from 'lucide-react';

const Mapas = ({ mapas, getTipoColor }) => {
  const [showMapModal, setShowMapModal] = useState(false);
  const [showNDVIModal, setShowNDVIModal] = useState(false);
  // Usa os mapas mockados se não vierem via props
  const mapasData = Array.isArray(mapas) && mapas.length > 0 ? mapas : mapasMock;

  return (
    <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <Map className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Mapas</h1>
          <p className="text-gray-600">Gerencie mapas georreferenciados</p>
        </div>
      </div>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2">
        <Plus className="w-4 h-4" />
        <span>Novo Mapa</span>
      </button>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2">
          <Map className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600">Total</span>
        </div>
        <p className="text-2xl font-bold text-blue-600">{mapas.length}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-green-600 rounded"></div>
          <span className="text-sm text-gray-600">Offline</span>
        </div>
        <p className="text-2xl font-bold text-green-600">{mapas.filter(m => m.status === 'offline').length}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-purple-600 rounded"></div>
          <span className="text-sm text-gray-600">Fertilidade</span>
        </div>
        <p className="text-2xl font-bold text-purple-600">{mapas.filter(m => m.tipo === 'fertilidade').length}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-orange-600 rounded"></div>
          <span className="text-sm text-gray-600">Colheita</span>
        </div>
        <p className="text-2xl font-bold text-orange-600">{mapas.filter(m => m.tipo === 'colheita').length}</p>
      </div>
    </div>

    {/* Search and Filters */}
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Map className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por título, talhão ou produtor..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <select className="px-4 py-2 border border-gray-200 rounded-lg">
            <option>Todos os Tipos</option>
            <option>Fertilidade</option>
            <option>Colheita</option>
            <option>Plantio</option>
          </select>
          <select className="px-4 py-2 border border-gray-200 rounded-lg">
            <option>Online/Offline</option>
            <option>Online</option>
            <option>Offline</option>
          </select>
        </div>
      </div>
    </div>

    {/* Mapas Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {mapasData.map(mapa => (
        <div key={mapa.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                <Map className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 leading-tight">{mapa.titulo}</h3>
                <p className="text-gray-600 text-sm">{mapa.produtor}</p>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-1">
              <span className={`px-2 py-1 text-xs rounded-full ${getTipoColor ? getTipoColor(mapa.tipo) : ''}`}>
                {mapa.tipo}
              </span>
              <span className={`px-2 py-1 text-xs rounded-full ${mapa.status === 'offline' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                {mapa.status}
              </span>
            </div>
          </div>
          <div className="space-y-2 mb-4 text-sm text-gray-600">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              {mapa.produtor}
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              {mapa.data}
            </div>
            <div className="flex items-center">
              <Leaf className="w-4 h-4 mr-2" />
              Safra: {mapa.safra}
            </div>
          </div>
          <p className="text-sm text-gray-700 mb-4">{mapa.descricao}</p>
          <div className="flex space-x-2">
            <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Visualizar</span>
            </button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
      ))}
      {/* Botão para abrir o mapa de Mato Grosso */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center">
        <h3 className="font-semibold text-gray-900 mb-2">Exemplo: Mapa de Mato Grosso</h3>
        <button
          className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center space-x-2"
          onClick={() => setShowMapModal(true)}
        >
          <Map className="w-4 h-4" />
          <span>Visualizar Mapa</span>
        </button>
      </div>

      {/* Card NDVI */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex flex-col items-center justify-center">
        <h3 className="font-semibold text-gray-900 mb-2">Monitore a saúde das plantas (NDVI)</h3>
        <button
          className="bg-yellow-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-700 flex items-center space-x-2"
          onClick={() => setShowNDVIModal(true)}
        >
          <Map className="w-4 h-4" />
          <span>Visualizar NDVI</span>
        </button>
      </div>
    </div>

    {/* Modal simples para exibir o MapUploader */}
    {showMapModal && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-2xl relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={() => setShowMapModal(false)}
          >
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4">Mapa de Mato Grosso</h2>
          <MapUploader />
        </div>
      </div>
    )}

    {/* Modal NDVI Heatmap */}
    {showNDVIModal && (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-2xl relative">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            onClick={() => setShowNDVIModal(false)}
          >
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4">Monitoramento NDVI</h2>
          <NDVIHeatMap />
        </div>
      </div>
    )}
  </div>
  );
};

export default Mapas;
