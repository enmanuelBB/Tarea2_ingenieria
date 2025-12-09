import { useState } from 'react';
import { Furniture, Variant, Quote, QuoteItem } from './types/furniture';
import { ClientCatalog } from './components/ClientCatalog';
import { QuoteView } from './components/QuoteView';
import { AdminDashboard } from './components/AdminDashboard';

// Initial sample data
const INITIAL_FURNITURE: Furniture[] = [
  {
    id: '1',
    name: 'Silla Clásica de Roble',
    type: 'Silla',
    material: 'Roble',
    size: 'Mediano',
    basePrice: 12000,
    stock: 15,
    image: 'https://images.unsplash.com/photo-1702018706865-e5306a8fa007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjaGFpciUyMGZ1cm5pdHVyZXxlbnwxfHx8fDE3NjUzMjA5MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    status: 'Active'
  },
  {
    id: '2',
    name: 'Mesa de Comedor Grande',
    type: 'Mesa',
    material: 'Nogal',
    size: 'Grande',
    basePrice: 45000,
    stock: 8,
    image: 'https://images.unsplash.com/photo-1722084059243-b0ec46398446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjB0YWJsZSUyMGZ1cm5pdHVyZXxlbnwxfHx8fDE3NjUzMDAzNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    status: 'Active'
  },
  {
    id: '3',
    name: 'Sofá Moderno 3 Cuerpos',
    type: 'Sofá',
    material: 'Tela Premium',
    size: 'Grande',
    basePrice: 85000,
    stock: 5,
    image: 'https://images.unsplash.com/photo-1763565909003-46e9dfb68a00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2ZhJTIwZnVybml0dXJlfGVufDF8fHx8MTc2NTI3MjY3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    status: 'Active'
  },
  {
    id: '4',
    name: 'Escritorio Ejecutivo',
    type: 'Escritorio',
    material: 'Pino',
    size: 'Grande',
    basePrice: 38000,
    stock: 12,
    image: 'https://images.unsplash.com/photo-1679309981674-cef0e23a7864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBkZXNrJTIwZnVybml0dXJlfGVufDF8fHx8MTc2NTMyMTE5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    status: 'Active'
  },
  {
    id: '5',
    name: 'Estantería Biblioteca',
    type: 'Estantería',
    material: 'Roble',
    size: 'Grande',
    basePrice: 32000,
    stock: 7,
    image: 'https://images.unsplash.com/photo-1473447216727-44efba8cf0e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc2hlbGYlMjBmdXJuaXR1cmV8ZW58MXx8fHwxNzY1MjY1MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    status: 'Active'
  },
  {
    id: '6',
    name: 'Silla de Comedor Premium',
    type: 'Silla',
    material: 'Nogal',
    size: 'Mediano',
    basePrice: 15000,
    stock: 3,
    image: 'https://images.unsplash.com/photo-1758977403826-01e2c8a3f68f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaW5pbmclMjBjaGFpciUyMHdvb2RlbnxlbnwxfHx8fDE3NjUzMjExOTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    status: 'Active'
  }
];

const INITIAL_VARIANTS: Variant[] = [
  { id: '1', name: 'Normal', priceIncrease: 0 },
  { id: '2', name: 'Barniz Premium', priceIncrease: 3500 },
  { id: '3', name: 'Acabado Mate', priceIncrease: 2000 }
];

export default function App() {
  const [view, setView] = useState<'catalog' | 'quote' | 'admin'>('catalog');
  const [furniture, setFurniture] = useState<Furniture[]>(INITIAL_FURNITURE);
  const [variants, setVariants] = useState<Variant[]>(INITIAL_VARIANTS);
  const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  // Furniture management
  const handleAddFurniture = (newFurniture: Omit<Furniture, 'id'>) => {
    const id = String(Date.now());
    setFurniture([...furniture, { ...newFurniture, id }]);
  };

  const handleUpdateFurniture = (id: string, updates: Partial<Furniture>) => {
    setFurniture(furniture.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
  };

  const handleDeleteFurniture = (id: string) => {
    if (confirm('¿Está seguro de eliminar este mueble?')) {
      setFurniture(furniture.filter(item => item.id !== id));
    }
  };

  // Variant management
  const handleAddVariant = (newVariant: Omit<Variant, 'id'>) => {
    const id = String(Date.now());
    setVariants([...variants, { ...newVariant, id }]);
  };

  const handleDeleteVariant = (id: string) => {
    if (id === '1') {
      alert('No se puede eliminar la variante Normal');
      return;
    }
    if (confirm('¿Está seguro de eliminar esta variante?')) {
      setVariants(variants.filter(v => v.id !== id));
    }
  };

  // Quote management
  const handleAddToQuote = (furnitureItem: Furniture, variant: Variant) => {
    const existingIndex = quoteItems.findIndex(
      item => item.furniture.id === furnitureItem.id && item.variant.id === variant.id
    );

    if (existingIndex >= 0) {
      const newItems = [...quoteItems];
      if (newItems[existingIndex].quantity < furnitureItem.stock) {
        newItems[existingIndex].quantity += 1;
        setQuoteItems(newItems);
      } else {
        alert('No hay suficiente stock disponible');
      }
    } else {
      setQuoteItems([...quoteItems, {
        furniture: furnitureItem,
        variant,
        quantity: 1
      }]);
    }
  };

  const handleUpdateQuantity = (index: number, delta: number) => {
    const newItems = [...quoteItems];
    const newQuantity = newItems[index].quantity + delta;
    
    if (newQuantity > 0 && newQuantity <= newItems[index].furniture.stock) {
      newItems[index].quantity = newQuantity;
      setQuoteItems(newItems);
    }
  };

  const handleRemoveItem = (index: number) => {
    setQuoteItems(quoteItems.filter((_, i) => i !== index));
  };

  const handleSubmitQuote = () => {
    if (quoteItems.length === 0) return;

    const total = quoteItems.reduce((sum, item) => {
      const itemPrice = item.furniture.basePrice + item.variant.priceIncrease;
      return sum + (itemPrice * item.quantity);
    }, 0);

    const newQuote: Quote = {
      id: String(Date.now()),
      date: new Date().toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      items: [...quoteItems],
      total,
      status: 'Pending'
    };

    setQuotes([...quotes, newQuote]);
    setQuoteItems([]);
    alert('¡Cotización enviada exitosamente! Un representante se pondrá en contacto pronto.');
    setView('catalog');
  };

  const handleConfirmSale = (quoteId: string) => {
    const quote = quotes.find(q => q.id === quoteId);
    if (!quote) return;

    // Update stock
    const updatedFurniture = [...furniture];
    quote.items.forEach(item => {
      const furnitureIndex = updatedFurniture.findIndex(f => f.id === item.furniture.id);
      if (furnitureIndex >= 0) {
        updatedFurniture[furnitureIndex].stock -= item.quantity;
      }
    });

    setFurniture(updatedFurniture);
    setQuotes(quotes.map(q => 
      q.id === quoteId ? { ...q, status: 'Confirmed' as const } : q
    ));

    alert('¡Venta confirmada! El stock ha sido actualizado.');
  };

  return (
    <div className="min-h-screen">
      {/* Admin Access Button (hidden in production, for demo purposes) */}
      {view !== 'admin' && (
        <button
          onClick={() => setView('admin')}
          className="fixed bottom-4 left-4 bg-neutral-800 text-white px-4 py-2 rounded-md text-sm z-50 hover:bg-neutral-700"
        >
          Admin Panel
        </button>
      )}

      {view === 'catalog' && (
        <ClientCatalog
          furniture={furniture}
          variants={variants}
          quoteItems={quoteItems}
          onAddToQuote={handleAddToQuote}
          onViewQuote={() => setView('quote')}
        />
      )}

      {view === 'quote' && (
        <QuoteView
          quoteItems={quoteItems}
          onBack={() => setView('catalog')}
          onUpdateQuantity={handleUpdateQuantity}
          onRemoveItem={handleRemoveItem}
          onSubmitQuote={handleSubmitQuote}
        />
      )}

      {view === 'admin' && (
        <AdminDashboard
          furniture={furniture}
          variants={variants}
          quotes={quotes}
          onAddFurniture={handleAddFurniture}
          onUpdateFurniture={handleUpdateFurniture}
          onDeleteFurniture={handleDeleteFurniture}
          onAddVariant={handleAddVariant}
          onDeleteVariant={handleDeleteVariant}
          onConfirmSale={handleConfirmSale}
          onBackToCatalog={() => setView('catalog')}
        />
      )}
    </div>
  );
}
