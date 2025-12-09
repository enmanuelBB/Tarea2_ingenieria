import { ArrowLeft, Trash2, Plus, Minus } from 'lucide-react';
import { QuoteItem } from '../types/furniture';

interface QuoteViewProps {
  quoteItems: QuoteItem[];
  onBack: () => void;
  onUpdateQuantity: (index: number, delta: number) => void;
  onRemoveItem: (index: number) => void;
  onSubmitQuote: () => void;
}

export function QuoteView({ 
  quoteItems, 
  onBack, 
  onUpdateQuantity, 
  onRemoveItem,
  onSubmitQuote 
}: QuoteViewProps) {
  const total = quoteItems.reduce((sum, item) => {
    const itemPrice = item.furniture.basePrice + item.variant.priceIncrease;
    return sum + (itemPrice * item.quantity);
  }, 0);

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-4"
          >
            <ArrowLeft size={20} />
            Volver al catálogo
          </button>
          <h1>Mi Cotización</h1>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {quoteItems.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center">
            <p className="text-neutral-500 mb-4">
              No hay productos en tu cotización
            </p>
            <button
              onClick={onBack}
              className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700"
            >
              Ver Catálogo
            </button>
          </div>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
              {quoteItems.map((item, index) => {
                const itemPrice = item.furniture.basePrice + item.variant.priceIncrease;
                const itemTotal = itemPrice * item.quantity;

                return (
                  <div 
                    key={index}
                    className="p-4 border-b last:border-b-0 hover:bg-neutral-50 transition-colors"
                  >
                    <div className="flex gap-4">
                      <img
                        src={item.furniture.image}
                        alt={item.furniture.name}
                        className="w-24 h-24 object-cover rounded-md"
                      />
                      
                      <div className="flex-1">
                        <h3 className="mb-1">{item.furniture.name}</h3>
                        <div className="flex gap-2 mb-2">
                          <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded">
                            {item.furniture.type}
                          </span>
                          <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded">
                            {item.furniture.size}
                          </span>
                        </div>
                        <p className="text-sm text-neutral-600">
                          Variante: {item.variant.name}
                        </p>
                        <p className="text-sm text-neutral-600">
                          ${itemPrice.toLocaleString()} c/u
                        </p>
                      </div>

                      <div className="flex flex-col items-end justify-between">
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <Trash2 size={18} />
                        </button>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => onUpdateQuantity(index, -1)}
                            disabled={item.quantity <= 1}
                            className="w-8 h-8 rounded-md bg-neutral-200 hover:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="w-12 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(index, 1)}
                            disabled={item.quantity >= item.furniture.stock}
                            className="w-8 h-8 rounded-md bg-neutral-200 hover:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="text-lg text-emerald-600">
                          ${itemTotal.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6 pb-4 border-b">
                <span className="text-xl">Total</span>
                <span className="text-2xl text-emerald-600">
                  ${total.toLocaleString()}
                </span>
              </div>

              <button
                onClick={onSubmitQuote}
                className="w-full bg-emerald-600 text-white py-3 rounded-md hover:bg-emerald-700 transition-colors"
              >
                Enviar Cotización
              </button>

              <p className="text-xs text-neutral-500 text-center mt-4">
                Un representante se pondrá en contacto para confirmar su cotización
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
