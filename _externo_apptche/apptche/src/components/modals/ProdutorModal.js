import React from 'react';
import { X } from 'lucide-react';

const ProdutorModal = ({ produtor, onClose }) => {
  if (!produtor) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-14 h-14 bg-green-600 rounded-lg flex items-center justify-center text-white font-bold text-2xl">
            {produtor.inicial}
          </div>
          <div>
            <h2 className="font-bold text-xl text-gray-900">{produtor.nome}</h2>
            <p className="text-gray-600">{produtor.fazenda}</p>
          </div>
        </div>
        <div className="space-y-2 text-gray-700">
          <div><strong>Cidade:</strong> {produtor.cidade}</div>
          <div><strong>Área:</strong> {produtor.hectares} hectares</div>
          <div><strong>Cultura:</strong> {produtor.cultura}</div>
          <div><strong>Status:</strong> {produtor.status}</div>
        </div>
        <div className="mt-6">
          <button onClick={onClose} className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">Fechar</button>
        </div>
      </div>
    </div>
  );
};

export default ProdutorModal;
