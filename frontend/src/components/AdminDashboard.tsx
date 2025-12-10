import { useState } from 'react';
import {
    Package,
    FileText,
    Settings,
    Edit,
    Trash2,
    Plus,
    LayoutDashboard,
    CheckCircle,
    Calendar,
    DollarSign
} from 'lucide-react';
import { Furniture, Variant, Quote } from '../types/furniture';
import { AddFurnitureModal } from './AddFurnitureModal';
import { AddVariantModal } from './AddVariantModal';

interface AdminDashboardProps {
    furniture: Furniture[];
    variants: Variant[];
    quotes: Quote[];
    onAddFurniture: (furniture: any) => void;
    onUpdateFurniture: (id: number, furniture: any) => void;
    onDeleteFurniture: (id: number) => void;
    onAddVariant: (variant: any) => void;
    onDeleteVariant: (id: number) => void;
    onConfirmSale: (quoteId: number) => void;
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

    const handleSaveFurniture = (data: any) => {
        if (editingFurniture) {
            onUpdateFurniture(editingFurniture.idMueble, data);
        } else {
            onAddFurniture(data);
        }
        setShowAddFurnitureModal(false);
        setEditingFurniture(null);
    };

    return (
        <div className="min-h-screen bg-neutral-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-lg flex-shrink-0">
                <div className="p-6 border-b">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center text-white font-bold">
                            MH
                        </div>
                        <div>
                            <h2 className="text-sm font-bold">Panel Admin</h2>
                            <p className="text-xs text-neutral-600">Gustavo</p>
                        </div>
                    </div>
                </div>

                <nav className="p-4 space-y-2">
                    <button
                        onClick={() => setActiveSection('inventory')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
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
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                            activeSection === 'quotes'
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'text-neutral-700 hover:bg-neutral-100'
                        }`}
                    >
                        <FileText size={20} />
                        <span>Cotizaciones</span>
                        {quotes.filter(q => q.estado === 'PENDIENTE').length > 0 && (
                            <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                {quotes.filter(q => q.estado === 'PENDIENTE').length}
              </span>
                        )}
                    </button>

                    <button
                        onClick={() => setActiveSection('variants')}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
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
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
                        >
                            <LayoutDashboard size={20} />
                            <span>Volver al Catálogo</span>
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-auto">

                {/* === SECCIÓN INVENTARIO === */}
                {activeSection === 'inventory' && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">Gestión de Inventario</h1>
                            <button
                                onClick={() => {
                                    setEditingFurniture(null);
                                    setShowAddFurnitureModal(true);
                                }}
                                className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 flex items-center gap-2 shadow-sm"
                            >
                                <Plus size={20} />
                                Agregar Mueble
                            </button>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-neutral-100 border-b">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Nombre</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tipo</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Material</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Tamaño</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Stock</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Precio Base</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Estado</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Acciones</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                {furniture.map(item => (
                                    <tr key={item.idMueble} className="hover:bg-neutral-50">
                                        <td className="px-4 py-3 text-sm text-gray-500">{item.idMueble}</td>
                                        <td className="px-4 py-3 font-medium">{item.nombreMueble}</td>
                                        <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded uppercase">
                          {item.tipo}
                        </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm">{item.material}</td>
                                        <td className="px-4 py-3 text-sm">{item.tamanio}</td>
                                        <td className="px-4 py-3">
                        <span className={`font-bold ${item.stock < 5 ? 'text-red-600' : 'text-gray-700'}`}>
                          {item.stock}
                        </span>
                                        </td>
                                        <td className="px-4 py-3 text-sm">${item.precioBase.toLocaleString()}</td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => onUpdateFurniture(item.idMueble, {
                                                    estado: item.estado === 'ACTIVO' ? 'INACTIVO' : 'ACTIVO'
                                                })}
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                    item.estado === 'ACTIVO'
                                                        ? 'bg-emerald-100 text-emerald-700'
                                                        : 'bg-neutral-200 text-neutral-600'
                                                }`}
                                            >
                                                {item.estado}
                                            </button>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => handleEditFurniture(item)}
                                                    className="text-blue-600 hover:text-blue-700 p-1 hover:bg-blue-50 rounded"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => onDeleteFurniture(item.idMueble)}
                                                    className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded"
                                                    title="Desactivar (Borrado Lógico)"
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

                {/* === SECCIÓN COTIZACIONES === */}
                {activeSection === 'quotes' && (
                    <div>
                        <h1 className="text-2xl font-bold mb-6 text-gray-800">Gestión de Cotizaciones</h1>

                        {quotes.length === 0 ? (
                            <div className="bg-white rounded-lg p-12 text-center text-neutral-500 border border-neutral-200">
                                No hay cotizaciones registradas
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {/* Mostramos primero las pendientes */}
                                {quotes
                                    .sort((a, b) => (a.estado === 'PENDIENTE' ? -1 : 1))
                                    .map(quote => (
                                        <div key={quote.idCotizacion} className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
                                            <div className="p-6">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div>
                                                        <h3 className="text-lg font-bold text-gray-800">Cotización #{quote.idCotizacion}</h3>
                                                        <div className="flex gap-4 text-sm text-gray-500 mt-1">
                                                            <div className="flex items-center gap-1">
                                                                <Calendar className="w-4 h-4" />
                                                                {quote.fecha}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <DollarSign className="w-4 h-4" />
                                                                Total: ${quote.total.toLocaleString()}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                                                        quote.estado === 'PENDIENTE'
                                                            ? 'bg-amber-100 text-amber-700'
                                                            : 'bg-emerald-100 text-emerald-700'
                                                    }`}>
                          {quote.estado}
                        </span>
                                                </div>

                                                <div className="border-t border-gray-100 pt-4">
                                                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Detalles:</h4>
                                                    <div className="space-y-2">
                                                        {quote.detalles.map((detalle: any, idx: number) => (
                                                            <div key={idx} className="flex justify-between text-sm py-2 border-b last:border-0 hover:bg-gray-50 px-2 rounded">
                                                                <div>
                                                                    <span className="font-medium text-gray-900">{detalle.nombreMueble}</span>
                                                                    <span className="text-gray-500"> ({detalle.nombreVariante})</span>
                                                                    <span className="text-gray-400"> x{detalle.cantidad}</span>
                                                                </div>
                                                                <span className="font-mono text-gray-600">${detalle.subtotal.toLocaleString()}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                {quote.estado === 'PENDIENTE' && (
                                                    <div className="flex justify-end pt-4 mt-4 border-t border-gray-100">
                                                        <button
                                                            onClick={() => onConfirmSale(quote.idCotizacion)}
                                                            className="bg-emerald-600 text-white px-6 py-2 rounded-md hover:bg-emerald-700 flex items-center gap-2 font-medium transition-colors"
                                                        >
                                                            <CheckCircle size={18} />
                                                            Confirmar Venta
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                )}

                {/* === SECCIÓN VARIANTES === */}
                {activeSection === 'variants' && (
                    <div>
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-2xl font-bold text-gray-800">Configuración de Variantes</h1>
                            <button
                                onClick={() => setShowAddVariantModal(true)}
                                className="bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 flex items-center gap-2 shadow-sm"
                            >
                                <Plus size={20} />
                                Agregar Variante
                            </button>
                        </div>

                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <table className="w-full">
                                <thead className="bg-neutral-100 border-b">
                                <tr>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">ID</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Nombre</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Incremento de Precio</th>
                                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">Acciones</th>
                                </tr>
                                </thead>
                                <tbody>
                                {variants.map(variant => (
                                    <tr key={variant.idVariante} className="border-b hover:bg-neutral-50">
                                        <td className="px-4 py-3 text-sm text-gray-500">{variant.idVariante}</td>
                                        <td className="px-4 py-3 text-gray-900 font-medium">{variant.nombre}</td>
                                        <td className="px-4 py-3 text-emerald-600 font-bold">
                                            {variant.aumentoPrecio > 0 ? '+' : ''}${variant.aumentoPrecio.toLocaleString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <button
                                                onClick={() => onDeleteVariant(variant.idVariante)}
                                                className="text-red-600 hover:text-red-700 p-1 hover:bg-red-50 rounded"
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