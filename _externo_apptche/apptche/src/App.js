import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Produtores from './components/Produtores';
import Mapas from './components/Mapas';
import Visitas from './components/Visitas';
import Relatorios from './components/Relatorios';
import Sidebar from './components/Sidebar';
import ProdutorModal from './components/modals/ProdutorModal';
import MapViewer from './components/modals/MapViewer';
import NotificationPanel from './components/modals/NotificationPanel';
import produtores from './data/produtores';
import mapas from './data/mapas';
import visitas from './data/visitas';
import { getStatusColor, getTipoColor } from './utils/helpers';
import HeaderResumo from './components/HeaderResumo';

const dashboardData = {
  totalProdutores: Array.isArray(produtores) ? produtores.length : 0,
  areaTotal: Array.isArray(produtores) ? produtores.reduce((acc, p) => acc + (p.hectares || 0), 0) : 0,
  mapasAtivos: Array.isArray(mapas) ? mapas.length : 0,
  visitasAgendadas: Array.isArray(visitas) ? visitas.length : 0,
  produtoresAtivos: 156,
  mapasAtivosTotal: 89
};

import { Map, Users } from 'lucide-react';

const atividadesRecentes = [
  {
    id: 1,
    tipo: 'mapa',
    titulo: 'Novo mapa de colheita adicionado',
    descricao: 'Mapa de Colheita - Talhão Sul para João Silva',
    data: '15 de dezembro, 00:00',
    icone: <Map className="w-5 h-5 text-blue-600" />
  },
  {
    id: 2,
    tipo: 'visita',
    titulo: 'Visita técnica registrada',
    descricao: 'Consultoria em Fazenda Santa Clara - Maria Santos',
    data: '14 de dezembro, 00:00',
    icone: <Users className="w-5 h-5 text-green-600" />
  },
  // ...outros mockados
];

const chartData = Array.isArray(produtores) ? produtores.map(p => ({ name: p.nome?.split(' ')[0] || '', area: p.hectares || 0 })) : [];
const visitasData = [ { mes: 'nov', quantidade: Array.isArray(visitas) ? visitas.length : 0 } ];
const tiposMapaData = [
  { name: 'Fertilidade', value: Array.isArray(mapas) ? mapas.filter(m => m.tipo === 'fertilidade').length : 0, color: '#8B5CF6' },
  { name: 'Colheita', value: Array.isArray(mapas) ? mapas.filter(m => m.tipo === 'colheita').length : 0, color: '#3B82F6' },
  { name: 'Plantio', value: Array.isArray(mapas) ? mapas.filter(m => m.tipo === 'plantio').length : 0, color: '#10B981' }
];

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProdutor, setSelectedProdutor] = useState(null);
  const [selectedMap, setSelectedMap] = useState(null);
  const [showMapViewer, setShowMapViewer] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const renderContent = () => {
    switch(currentView) {
      case 'dashboard':
        return <Dashboard dashboardData={dashboardData} atividadesRecentes={atividadesRecentes} chartData={chartData} visitasData={visitasData} tiposMapaData={tiposMapaData} getTipoColor={getTipoColor} />;
      case 'produtores':
        return <Produtores produtores={produtores} getStatusColor={getStatusColor} />;
      case 'mapas':
        return <Mapas mapas={mapas} getTipoColor={getTipoColor} />;
      case 'visitas':
        return <Visitas visitas={visitas} getStatusColor={getStatusColor} getTipoColor={getTipoColor} />;
      case 'relatorios':
        return <Relatorios dashboardData={dashboardData} chartData={chartData} visitasData={visitasData} tiposMapaData={tiposMapaData} />;
      default:
        return <Dashboard dashboardData={dashboardData} atividadesRecentes={atividadesRecentes} chartData={chartData} visitasData={visitasData} tiposMapaData={tiposMapaData} getTipoColor={getTipoColor} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile Menu Button */}
      {isMobile && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="fixed top-4 left-4 z-40 p-2 bg-green-600 text-white rounded-lg shadow-lg"
        >
          {/* ícone de menu */}
        </button>
      )}
      <Sidebar isMobile={isMobile} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} currentView={currentView} setCurrentView={setCurrentView} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-auto px-2 py-4 sm:px-6 md:px-8 lg:px-16 xl:px-32">
          {/* Header e cards de resumo só no dashboard */}
          {currentView === 'dashboard' && <HeaderResumo dashboardData={dashboardData} />}
          {/* Conteúdo principal */}
          {renderContent()}
        </div>
      </div>
      {/* Modais */}
      {selectedProdutor && (
        <ProdutorModal produtor={selectedProdutor} onClose={() => setSelectedProdutor(null)} />
      )}
      {showMapViewer && selectedMap && (
        <MapViewer mapa={selectedMap} onClose={() => { setShowMapViewer(false); setSelectedMap(null); }} />
      )}
      {showNotifications && (
        <NotificationPanel notifications={atividadesRecentes} onClose={() => setShowNotifications(false)} />
      )}
    </div>
  );
}

export default App;
