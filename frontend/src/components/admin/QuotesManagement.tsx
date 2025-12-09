import { CheckCircle, Calendar, DollarSign } from 'lucide-react';
import { Quote, Furniture } from '../../types';

interface QuotesManagementProps {
  quotes: Quote[];
  onConfirmSale: (quoteId: string) => void;
  furniture: Furniture[];
}

export function QuotesManagement({ quotes, onConfirmSale, furniture }: QuotesManagementProps) {
  const pendingQuotes = quotes.filter(q => q.status === 'Pending');

  return (
    <div className="p-8">
      <div className="mb-6">
        <h1 className="text-2xl text-gray-900">Gestión de Cotizaciones</h1>
        <p className="text-gray-500">Revisa y confirma las cotizaciones de clientes</p>
      </div>

      <div className="space-y-4">
        {pendingQuotes.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <p className="text-gray-500">No hay cotizaciones pendientes</p>
          </div>
        ) : (
          pendingQuotes.map(quote => (
            <div
              key={quote.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg text-gray-900">Cotización #{quote.id}</h3>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {quote.date.toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        Total: ${quote.total.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onConfirmSale(quote.id)}
                    className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                  >
                    <CheckCircle className="w-4 h-4" />
                    Confirmar Venta
                  </button>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="text-sm text-gray-700 mb-3">Artículos</h4>
                  <div className="space-y-2">
                    {quote.items.map((item, index) => {
                      const itemPrice = item.furniture.basePrice + (item.variant?.priceIncrease || 0);
                      const totalPrice = itemPrice * item.quantity;
                      
                      return (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <img
                              src={item.furniture.image}
                              alt={item.furniture.name}
                              className="w-12 h-12 rounded object-cover"
                            />
                            <div>
                              <p className="text-sm text-gray-900">{item.furniture.name}</p>
                              <p className="text-xs text-gray-500">
                                Variante: {item.variant?.name || 'Normal'} • 
                                Cantidad: {item.quantity}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-900">
                              ${totalPrice.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500">
                              ${itemPrice.toLocaleString()} c/u
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {quotes.filter(q => q.status === 'Confirmed').length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl text-gray-900 mb-4">Ventas Confirmadas</h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                      Fecha
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                      Items
                    </th>
                    <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {quotes
                    .filter(q => q.status === 'Confirmed')
                    .map(quote => (
                      <tr key={quote.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          #{quote.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {quote.date.toLocaleDateString('es-ES')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {quote.items.length} item{quote.items.length !== 1 ? 's' : ''}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${quote.total.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
