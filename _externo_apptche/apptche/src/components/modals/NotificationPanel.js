import React from 'react';
import { X, Bell } from 'lucide-react';

const NotificationPanel = ({ notifications, onClose }) => {
  return (
    <div className="fixed top-0 right-0 z-50 w-80 h-full bg-white shadow-lg border-l border-gray-200 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-2">
          <Bell className="w-6 h-6 text-green-600" />
          <span className="font-bold text-lg text-gray-800">Notificações</span>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        {notifications && notifications.length > 0 ? (
          notifications.map((n, idx) => (
            <div key={idx} className="mb-4 p-3 bg-gray-50 rounded-lg shadow-sm">
              <div className="font-medium text-gray-900">{n.titulo}</div>
              <div className="text-sm text-gray-600">{n.descricao}</div>
              <div className="text-xs text-gray-400 mt-1">{n.data}</div>
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center mt-8">Sem notificações recentes.</div>
        )}
      </div>
    </div>
  );
};

export default NotificationPanel;
