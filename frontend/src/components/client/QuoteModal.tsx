import { X, Trash2, Send } from 'lucide-react';
import { QuoteItem } from '../../types';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: QuoteItem[];
  onRemoveItem: (index: number) => void;
  onUpdateQuantity: (index: number, quantity: number) => void;
  onSubmitQuote: () => void;
}

export function QuoteModal({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onUpdateQuantity,
  onSubmitQuote,
}: QuoteModalProps) {
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => {
    const itemPrice = item.furniture.basePrice + (item.variant?.priceIncrease || 0);
    return sum + itemPrice * item.quantity;
  }, 0);

  const handleSubmit = () => {
    onSubmitQuote();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl text-gray-900">Cotización</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No hay items en la cotización</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item, index) => {
                const itemPrice = item.furniture.basePrice + (item.variant?.priceIncrease || 0);
                return (
                  <div key={index} className="flex gap-4 p-4 border border-gray-200 rounded-lg">
                    <img
                      src={item.furniture.image}
                      alt={item.furniture.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="text-gray-900">{item.furniture.name}</h3>
                      <p className="text-sm text-gray-500">
                        Variante: {item.variant?.name || 'Normal'}
                      </p>
                      <p className="text-sm text-gray-900 mt-1">
                        ${itemPrice.toLocaleString()} x {item.quantity} = ${(itemPrice * item.quantity).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        min="1"
                        max={item.furniture.stock}
                        value={item.quantity}
                        onChange={(e) => onUpdateQuantity(index, parseInt(e.target.value) || 1)}
                        className="w-16 px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button
                        onClick={() => onRemoveItem(index)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-700">Total</span>
              <span className="text-2xl text-gray-900">${total.toLocaleString()}</span>
            </div>
            <button
              onClick={handleSubmit}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Send className="w-4 h-4" />
              Enviar Cotización
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
