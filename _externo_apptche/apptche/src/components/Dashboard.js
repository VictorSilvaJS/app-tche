import React from 'react';
import { Users, Leaf, Map, Calendar, Clock } from 'lucide-react';
import AtividadesRecentes from './AtividadesRecentes';

const Dashboard = ({ dashboardData, atividadesRecentes, chartData, visitasData, tiposMapaData, getTipoColor }) => {
  return (
  <div className="flex flex-col gap-8 w-full max-w-7xl mx-auto py-4 sm:py-8 px-2 sm:px-6 md:px-8">

      {/* Atividades Recentes */}
          <AtividadesRecentes atividades={atividadesRecentes} />
    </div>
  );
};

export default Dashboard;
