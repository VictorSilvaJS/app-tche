
import React from 'react';
import { Users, TrendingUp, MapPin, AlertCircle, Plus, Leaf, Wheat } from 'lucide-react';

const Produtores = ({ produtores = [], getStatusColor }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Produtores</h1>
          <p className="text-gray-600">Gerencie seus clientes e fazendas</p>
        </div>
      </div>
      <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-2">
        <Plus className="w-4 h-4" />
        <span>Novo Produtor</span>
      </button>
    </div>

    {/* Search and Filters */}
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por nome, fazenda ou cidade..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg">Todos</button>
          <button className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">Ativo</button>
          <button className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">Inativo</button>
          <button className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50">Pendente</button>
        </div>
      </div>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-green-600" />
          <span className="text-sm text-gray-600">Total</span>
        </div>
        <p className="text-2xl font-bold text-green-600">{produtores.length}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600">Ativos</span>
        </div>
        <p className="text-2xl font-bold text-blue-600">{produtores.filter(p => p.status === 'ativo').length}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-purple-600" />
          <span className="text-sm text-gray-600">Área Total</span>
        </div>
        <p className="text-2xl font-bold text-purple-600">{produtores.reduce((acc, p) => acc + p.hectares, 0)} ha</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <span className="text-sm text-gray-600">Pendentes</span>
        </div>
        <p className="text-2xl font-bold text-yellow-600">{produtores.filter(p => p.status === 'pendente').length}</p>
      </div>
    </div>

    {/* Produtores List */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {produtores.map(produtor => (
        <div key={produtor.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">
                {produtor.inicial}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{produtor.nome}</h3>
                <p className="text-gray-600 text-sm">{produtor.fazenda}</p>
              </div>
            </div>
            <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(produtor.status)}`}>
              {produtor.status}
            </span>
          </div>
          <div className="space-y-2 mb-4">
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin className="w-4 h-4 mr-2" />
              {produtor.cidade}
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <Leaf className="w-4 h-4 mr-2" />
              {produtor.hectares} hectares
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <Wheat className="w-4 h-4 mr-2" />
              Cultura: {produtor.cultura}
            </div>
          </div>
          <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
            Ver Perfil Completo
          </button>
        </div>
      ))}
    </div>
  </div>
);

export default Produtores;
