import React from 'react';
import { Users, Leaf, Map, Calendar } from 'lucide-react';

const resumoCards = [
  {
    titulo: 'Total de Produtores',
    valorKey: 'totalProdutores',
    icone: <Users className="w-10 h-10 text-green-600 mx-auto" />,
  },
  {
    titulo: 'Área Total (ha)',
    valorKey: 'areaTotal',
    icone: <Leaf className="w-10 h-10 text-green-600 mx-auto" />,
  },
  {
    titulo: 'Mapas Ativos',
    valorKey: 'mapasAtivos',
    icone: <Map className="w-10 h-10 text-green-600 mx-auto" />,
  },
  {
    titulo: 'Visitas Agendadas',
    valorKey: 'visitasAgendadas',
    icone: <Calendar className="w-10 h-10 text-green-600 mx-auto" />,
  },
];

function HeaderResumo({ dashboardData }) {
  return (
    <div className="mb-8 w-full">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-green-700 mb-1">Olá, César!</h2>
        <p className="text-gray-600">Visão geral da sua consultoria agrícola</p>
        <div className="flex flex-col sm:flex-row justify-center items-center mt-4 gap-2">
          <input
            type="text"
            placeholder="Buscar por produtor, fazenda ou talhão..."
            className="w-full sm:max-w-xl px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-green-200"
          />
          <button className="bg-green-600 text-white px-6 py-2 rounded-r-lg font-semibold w-full sm:w-auto">Buscar</button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full">
        {resumoCards.map(card => (
          <div key={card.titulo} className="bg-green-50 rounded-xl p-6 flex flex-col items-center shadow-sm border border-green-100 w-full">
            {card.icone}
            <div className="mt-2 text-gray-700 text-sm">{card.titulo}</div>
            <div className="mt-1 text-3xl font-bold text-green-700">{dashboardData[card.valorKey]}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HeaderResumo;
