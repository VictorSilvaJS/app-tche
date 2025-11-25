import React from 'react';
import { Map, Users, BarChart3, Calendar } from 'lucide-react';

const tipoConfig = {
  mapa: { cor: 'bg-green-50', icone: <Map className="w-7 h-7 text-green-600" /> },
  visita: { cor: 'bg-blue-50', icone: <Calendar className="w-7 h-7 text-blue-600" /> },
  relatorio: { cor: 'bg-purple-50', icone: <BarChart3 className="w-7 h-7 text-purple-600" /> },
  produtor: { cor: 'bg-yellow-50', icone: <Users className="w-7 h-7 text-yellow-600" /> },
};

function AtividadesRecentes({ atividades }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 mt-8 w-full max-w-7xl mx-auto px-2 sm:px-6 md:px-8">
      <div className="px-2 sm:px-6 md:px-10 py-7 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 text-green-600"><Calendar /></span>
          <h2 className="text-2xl font-bold">Atividades Recentes</h2>
        </div>
      </div>
      <div className="px-2 sm:px-6 md:px-10 py-8 space-y-6">
        {atividades.map(a => (
          <div key={a.id} className={`flex flex-col sm:flex-row items-center gap-6 p-6 rounded-xl ${tipoConfig[a.tipo]?.cor || 'bg-gray-50'} shadow-sm w-full`}> 
            <div className="flex-shrink-0">
              {tipoConfig[a.tipo]?.icone}
            </div>
            <div className="flex-1 text-center sm:text-left">
              <div className="font-semibold text-lg text-gray-800">{a.titulo}</div>
              <div className="text-gray-600 text-base">{a.descricao}</div>
              <div className="text-xs text-gray-400 mt-1">{a.data}</div>
            </div>
            <span className="px-4 py-2 rounded-full bg-gray-100 text-sm text-gray-600 font-medium">{a.tipo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AtividadesRecentes;
