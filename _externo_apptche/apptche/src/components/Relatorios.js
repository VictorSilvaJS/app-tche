
import React from 'react';
import { Users, Leaf, Map, Calendar, BarChart3, TrendingUp } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, CartesianGrid, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const Relatorios = ({ dashboardData, chartData, visitasData, tiposMapaData }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
          <BarChart3 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Relatórios</h1>
          <p className="text-gray-600">Análises e insights da consultoria</p>
        </div>
      </div>
      <button className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 flex items-center space-x-2">
        <BarChart3 className="w-4 h-4" />
        <span>Exportar Relatório</span>
      </button>
    </div>

    {/* Stats */}
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-2">
          <Users className="w-5 h-5 text-green-600" />
          <span className="text-sm text-gray-600">Produtores</span>
        </div>
        <p className="text-2xl font-bold text-green-600">{dashboardData.totalProdutores}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-2">
          <Leaf className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600">Área Total</span>
        </div>
        <p className="text-xl font-bold text-blue-600">{dashboardData.areaTotal} ha</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-2">
          <Map className="w-5 h-5 text-purple-600" />
          <span className="text-sm text-gray-600">Mapas</span>
        </div>
        <p className="text-2xl font-bold text-purple-600">{dashboardData.mapasAtivos}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-2">
          <Calendar className="w-5 h-5 text-orange-600" />
          <span className="text-sm text-gray-600">Visitas</span>
        </div>
        <p className="text-2xl font-bold text-orange-600">{dashboardData.visitasAgendadas}</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-2">
          <div className="w-5 h-5 bg-teal-600 rounded"></div>
          <span className="text-sm text-gray-600">Offline</span>
        </div>
        <p className="text-2xl font-bold text-teal-600">2</p>
      </div>
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="w-5 h-5 text-red-600" />
          <span className="text-sm text-gray-600">Este Mês</span>
        </div>
        <p className="text-2xl font-bold text-red-600">0</p>
      </div>
    </div>

    {/* Tabs */}
    <div className="bg-yellow-50 p-1 rounded-lg flex space-x-1">
      <button className="flex-1 py-2 px-4 bg-yellow-100 text-yellow-800 rounded-md font-medium flex items-center justify-center space-x-2">
        <TrendingUp className="w-4 h-4" />
        <span>Produção</span>
      </button>
      <button className="flex-1 py-2 px-4 text-gray-600 rounded-md hover:bg-white transition-colors flex items-center justify-center space-x-2">
        <Map className="w-4 h-4" />
        <span>Mapas</span>
      </button>
      <button className="flex-1 py-2 px-4 text-gray-600 rounded-md hover:bg-white transition-colors flex items-center justify-center space-x-2">
        <Calendar className="w-4 h-4" />
        <span>Visitas</span>
      </button>
      <button className="flex-1 py-2 px-4 text-gray-600 rounded-md hover:bg-white transition-colors flex items-center justify-center space-x-2">
        <BarChart3 className="w-4 h-4" />
        <span>Insights</span>
      </button>
    </div>

    {/* Charts */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Área por Produtor */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-800">Área por Produtor</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="area" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Distribuição por Cultura */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Leaf className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-800">Distribuição por Cultura</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="area"
                label={({name, area}) => `${name}: ${area}ha`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#10B981','#3B82F6','#F59E0B'][index % 3]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tipos de Mapas Criados */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Map className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-800">Tipos de Mapas Criados</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={tiposMapaData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Visitas ao Longo do Tempo */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <Calendar className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-800">Visitas ao Longo do Tempo</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={visitasData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="quantidade" stroke="#F59E0B" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* Resumo Executivo */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <BarChart3 className="w-5 h-5 text-orange-600" />
          <h3 className="text-lg font-semibold text-gray-800">Resumo Executivo</h3>
        </div>
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-medium text-green-800 mb-2">Crescimento da Carteira</h4>
            <p className="text-sm text-green-700">+12% novos produtores este mês</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Área Gerenciada</h4>
            <p className="text-sm text-blue-700">{dashboardData.areaTotal} hectares sob consultoria</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-medium text-purple-800 mb-2">Tecnologia</h4>
            <p className="text-sm text-purple-700">2 mapas disponíveis offline</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-teal-600" />
          <h3 className="text-lg font-semibold text-gray-800">Próximos Passos</h3>
        </div>
        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg">
            <h4 className="font-medium text-orange-800 mb-2">Otimizar Rotas</h4>
            <p className="text-sm text-orange-700">Agrupar visitas por região</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <h4 className="font-medium text-red-800 mb-2">Mapas Pendentes</h4>
            <p className="text-sm text-red-700">3 produtores sem mapas atualizados</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">Capacitação</h4>
            <p className="text-sm text-blue-700">Treinamento em novas tecnologias</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Relatorios;
