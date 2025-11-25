// Funções utilitárias para o sistema Tchê Agro

export function getStatusColor(status) {
  switch(status) {
    case 'ativo': return 'bg-green-100 text-green-800';
    case 'pendente': return 'bg-yellow-100 text-yellow-800';
    case 'inativo': return 'bg-red-100 text-red-800';
    case 'atrasada': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

export function getTipoColor(tipo) {
  switch(tipo) {
    case 'fertilidade': return 'bg-purple-100 text-purple-800';
    case 'colheita': return 'bg-orange-100 text-orange-800';
    case 'plantio': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}
