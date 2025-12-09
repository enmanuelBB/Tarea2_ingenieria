import { useState } from 'react';
import { 
  Package, 
  FileText, 
  Settings, 
  Edit, 
  Trash2, 
  Plus,
  LogOut,
  LayoutDashboard
} from 'lucide-react';
import { Furniture, Variant, Quote } from '../types/furniture';
import { AddFurnitureModal } from './AddFurnitureModal';
import { AddVariantModal } from './AddVariantModal';

interface AdminDashboardProps {
  furniture: Furniture[];
  variants: Variant[];
  quotes: Quote[];
  onAddFurniture: (furniture: Omit<Furniture, 'id'>) => void;
  onUpdateFurniture: (id: string, furniture: Partial<Furniture>) => void;
  onDeleteFurniture: (id: string) => void;
  onAddVariant: (variant: Omit<Variant, 'id'>) => void;
  onDeleteVariant: (id: string) => void;
  onConfirmSale: (quoteId: string) => void;
  onBackToCatalog: () => void;
}

export function AdminDashboard({
  furniture,
  variants,
  quotes,
  onAddFurniture,
  onUpdateFurniture,
  onDeleteFurniture,
  onAddVariant,
  onDeleteVariant,
  onConfirmSale,
  onBackToCatalog
}: AdminDashboardProps) {
  const [activeSection, setActiveSection] = useState<'inventory' | 'quotes' | 'variants'>('inventory');
  const [showAddFurnitureModal, setShowAddFurnitureModal] = useState(false);
  const [showAddVariantModal, setShowAddVariantModal] = useState(false);
  const [editingFurniture, setEditingFurniture] = useState<Furniture | null>(null);

  const handleEditFurniture = (item: Furniture) => {
    setEditingFurniture(item);
    setShowAddFurnitureModal(true);
  };

  const handleSaveFurniture = (data: Omit<Furniture, 'id'>) => {
    if (editingFurniture) {
      onUpdateFurniture(editingFurniture.id, data);
    } else {
      onAddFurniture(data);
    }
    setShowAddFurnitureModal(false);
    setEditingFurniture(null);
  };

  return (
    <div className="min-h-screen bg-neutral-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg">
        <div className="p-6 border-b">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center text-white">
              MH
            </div>
            <div>
              <h2 className="text-sm">Panel Admin</h2>
              <p className="text-xs text-neutral-600">Gustavo</p>
            </div>
          </div>
        </div>

        <nav className="p-4">
          <button
            onClick={() => setActiveSection('inventory')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md mb-2 transition-colors ${
              activeSection === 'inventory' 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <Package size={20} />
            <span>Inventario</span>
          </button>

          <button
            onClick={() => setActiveSection('quotes')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md mb-2 transition-colors ${
              activeSection === 'quotes' 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <FileText size={20} />
            <span>Cotizaciones</span>
            {quotes.filter(q => q.status === 'Pending').length > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                {quotes.filter(q => q.status === 'Pending').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveSection('variants')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-md mb-2 transition-colors ${
              activeSection === 'variants' 
                ? 'bg-emerald-100 text-emerald-700' 
                : 'text-neutral-700 hover:bg-neutral-100'
            }`}
          >
            <Settings size={20} />
            <span>Variantes</span>
          </button>

          <div className="border-t mt-4 pt-4">
            <button
              onClick={onBackToCatalog}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <LayoutDashboard size={20} />
              <span>Ver Catálogo</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-auto">
        {activeSection === 'inventory' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1>Gestión de Inventario</h1>
              <button
                onClick={() => {
                  setEditingFurniture(null);
                  setShowAddFurnitureModal(true);
                }}
                className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 flex items-center gap-2"
              >
                <Plus size={20} />
                Agregar Mueble
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-auto">
              <table className="w-full">
                <thead className="bg-neutral-100 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm">ID</th>
                    <th className="px-4 py-3 text-left text-sm">Nombre</th>
                    <th className="px-4 py-3 text-left text-sm">Tipo</th>
                    <th className="px-4 py-3 text-left text-sm">Material</th>
                    <th className="px-4 py-3 text-left text-sm">Tamaño</th>
                    <th className="px-4 py-3 text-left text-sm">Stock</th>
                    <th className="px-4 py-3 text-left text-sm">Precio Base</th>
                    <th className="px-4 py-3 text-left text-sm">Estado</th>
                    <th className="px-4 py-3 text-left text-sm">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {furniture.map(item => (
                    <tr key={item.id} className="border-b hover:bg-neutral-50">
                      <td className="px-4 py-3 text-sm">{item.id}</td>
                      <td className="px-4 py-3">{item.name}</td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded">
                          {item.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{item.material}</td>
                      <td className="px-4 py-3 text-sm">{item.size}</td>
                      <td className="px-4 py-3">
                        <span className={item.stock < 10 ? 'text-red-600' : ''}>
                          {item.stock}
                        </span>
                      </td>
                      <td className="px-4 py-3">${item.basePrice.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => onUpdateFurniture(item.id, { 
                            status: item.status === 'Active' ? 'Inactive' : 'Active' 
                          })}
                          className={`px-3 py-1 rounded-full text-xs ${
                            item.status === 'Active'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-neutral-200 text-neutral-600'
                          }`}
                        >
                          {item.status === 'Active' ? 'Activo' : 'Inactivo'}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditFurniture(item)}
                            className="text-blue-600 hover:text-blue-700 p-1"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            onClick={() => onDeleteFurniture(item.id)}
                            className="text-red-600 hover:text-red-700 p-1"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeSection === 'quotes' && (
          <div>
            <h1 className="mb-6">Gestión de Cotizaciones</h1>

            {quotes.length === 0 ? (
              <div className="bg-white rounded-lg p-12 text-center text-neutral-500">
                No hay cotizaciones pendientes
              </div>
            ) : (
              <div className="space-y-4">
                {quotes.map(quote => (
                  <div key={quote.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="mb-1">Cotización #{quote.id}</h3>
                        <p className="text-sm text-neutral-600">{quote.date}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        quote.status === 'Pending'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {quote.status === 'Pending' ? 'Pendiente' : 'Confirmada'}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      {quote.items.map((item, idx) => {
                        const itemPrice = item.furniture.basePrice + item.variant.priceIncrease;
                        const total = itemPrice * item.quantity;
                        return (
                          <div key={idx} className="flex justify-between text-sm py-2 border-b">
                            <div>
                              <span>{item.furniture.name}</span>
                              <span className="text-neutral-600"> ({item.variant.name})</span>
                              <span className="text-neutral-500"> x{item.quantity}</span>
                            </div>
                            <span>${total.toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t">
                      <div>
                        <span className="text-neutral-600">Total: </span>
                        <span className="text-xl text-emerald-600">
                          ${quote.total.toLocaleString()}
                        </span>
                      </div>
                      {quote.status === 'Pending' && (
                        <button
                          onClick={() => onConfirmSale(quote.id)}
                          className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700"
                        >
                          Confirmar Venta
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeSection === 'variants' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h1>Configuración de Variantes</h1>
              <button
                onClick={() => setShowAddVariantModal(true)}
                className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 flex items-center gap-2"
              >
                <Plus size={20} />
                Agregar Variante
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-neutral-100 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm">ID</th>
                    <th className="px-4 py-3 text-left text-sm">Nombre</th>
                    <th className="px-4 py-3 text-left text-sm">Incremento de Precio</th>
                    <th className="px-4 py-3 text-left text-sm">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map(variant => (
                    <tr key={variant.id} className="border-b hover:bg-neutral-50">
                      <td className="px-4 py-3 text-sm">{variant.id}</td>
                      <td className="px-4 py-3">{variant.name}</td>
                      <td className="px-4 py-3 text-emerald-600">
                        {variant.priceIncrease > 0 ? '+' : ''}${variant.priceIncrease.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => onDeleteVariant(variant.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                          disabled={variant.id === '1'}
                          title={variant.id === '1' ? 'No se puede eliminar la variante Normal' : ''}
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Modals */}
      {showAddFurnitureModal && (
        <AddFurnitureModal
          furniture={editingFurniture}
          onSave={handleSaveFurniture}
          onClose={() => {
            setShowAddFurnitureModal(false);
            setEditingFurniture(null);
          }}
        />
      )}

      {showAddVariantModal && (
        <AddVariantModal
          onSave={onAddVariant}
          onClose={() => setShowAddVariantModal(false)}
        />
      )}
    </div>
  );
}
