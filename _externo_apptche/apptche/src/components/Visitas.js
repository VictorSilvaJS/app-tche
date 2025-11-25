
import React from 'react';
import { Calendar, Clock, AlertCircle, User, Plus, Leaf, Eye } from 'lucide-react';

const Visitas = ({ visitas, getStatusColor, getTipoColor }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Visitas Técnicas</h1>
          <p className="text-gray-600">Gerencie visitas e avaliações de campo</p>
        </div>
      </div>
      <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center space-x-2">
        <Plus className="w-4 h-4" />
        <span>Nova Visita</span>
      </button>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-purple-600" />
          <span className="text-sm text-gray-600">Total</span>
        </div>
        <p className="text-2xl font-bold text-purple-600">{visitas.length}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-orange-600" />
          <span className="text-sm text-gray-600">Hoje</span>
        </div>
        <p className="text-2xl font-bold text-orange-600">0</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-sm text-gray-600">Atrasadas</span>
        </div>
        <p className="text-2xl font-bold text-red-600">{visitas.filter(v => v.status === 'atrasada').length}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600">Esta Semana</span>
        </div>
        <p className="text-2xl font-bold text-blue-600">0</p>
      </div>
    </div>

    {/* Search and Filters */}
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar por produtor, técnico ou observações..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <select className="px-4 py-2 border border-gray-200 rounded-lg">
            <option>Todos Objetivos</option>
            <option>Consultoria</option>
            <option>Coleta Solo</option>
            <option>Avaliação</option>
          </select>
          <select className="px-4 py-2 border border-gray-200 rounded-lg">
            <option>Todos Períodos</option>
            <option>Esta Semana</option>
            <option>Este Mês</option>
            <option>Atrasadas</option>
          </select>
        </div>
      </div>
    </div>

    {/* Visitas List */}
    <div className="space-y-4">
      {visitas.map(visita => (
        <div key={visita.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white">
                <User className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{visita.titulo}</h3>
                <div className="flex space-x-2 mt-1">
                  <span className={`px-2 py-1 text-xs rounded-full ${getTipoColor(visita.tipo)}`}>
                    {visita.tipo}
                  </span>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(visita.status)}`}>
                    {visita.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Realizada: {visita.realizada}
              </div>
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                Técnico: {visita.tecnico}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                Próxima: {visita.proxima}
              </div>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Leaf className="w-4 h-4 mr-2" />
                {visita.clima}
              </div>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-700 mb-2">{visita.observacoes}</p>
            <div className="bg-green-50 p-3 rounded-lg">
              <h4 className="font-medium text-green-800 mb-1">Recomendações:</h4>
              <p className="text-sm text-green-700">{visita.recomendacoes}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="flex-1 bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>Ver Detalhes</span>
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
              Fotos
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default Visitas;
