
import React from 'react';
import { Leaf, Home, Users, Map, Calendar, BarChart3, X } from 'lucide-react';

const Sidebar = ({ isMobile, sidebarOpen, setSidebarOpen, currentView, setCurrentView }) => (
  <div className={`${isMobile && !sidebarOpen ? 'hidden' : ''} ${isMobile ? 'fixed inset-0 z-50' : 'w-64'} bg-white border-r border-gray-200 flex flex-col`}>
    {isMobile && (
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
    )}
    <div className={`${isMobile ? 'w-64 bg-white h-full' : 'w-full h-full'} flex flex-col`}>
      {/* Header */}
      <div className="bg-green-100 text-white p-4 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full">
          <img src="/Imagem1.png" alt="Logo Tchê" className="w-22 h-20 rounded mb-2 object-contain" />
        </div>
        {isMobile && (
          <button onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </button>
        )}
      </div>
      {/* Navigation */}
      <div className="flex-1 p-4 flex flex-col justify-between">
        <div>
          <h3 className="text-green-600 text-sm font-medium mb-3">NAVEGAÇÃO</h3>
          <nav className="space-y-1 mb-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: Home },
              { id: 'produtores', label: 'Produtores', icon: Users },
              { id: 'mapas', label: 'Mapas', icon: Map },
              { id: 'visitas', label: 'Visitas', icon: Calendar },
              { id: 'relatorios', label: 'Relatórios', icon: BarChart3 }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(item.id);
                  if (isMobile) setSidebarOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                  currentView === item.id 
                    ? 'bg-green-100 text-green-700' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
                </button>
            ))}
          </nav>
          {/* STATUS GERAL */}
          <div className="mb-8">
            <h3 className="text-green-600 text-sm font-medium mb-3">STATUS GERAL</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-700">
                <Map className="w-4 h-4 text-green-600" />
                <span>Área Total</span>
                <span className="ml-auto font-bold text-green-700">1.050 <span className="text-xs">ha</span></span>
              </li>
              <li className="flex items-center space-x-2 text-gray-700">
                <Users className="w-4 h-4 text-green-600" />
                <span>Produtores Ativos</span>
                <span className="ml-auto font-bold text-green-700">2</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-700">
                <Leaf className="w-4 h-4 text-green-600" />
                <span>Mapas Ativos</span>
                <span className="ml-auto font-bold text-green-700">3</span>
              </li>
            </ul>
          </div>
        </div>
        {/* Card do usuário */}
        <div className="bg-green-100 rounded-lg p-3 flex items-center space-x-3 mt-8">
          <div className="bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg">CG</div>
          <div>
            <div className="font-semibold text-green-700">César Gomes</div>
            <div className="text-xs text-green-700 opacity-80">Sócio - Tchê Consultoria</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Sidebar;
