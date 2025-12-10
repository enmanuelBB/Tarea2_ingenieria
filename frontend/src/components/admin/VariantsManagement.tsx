import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { Variant } from '../../types/furniture';

interface VariantsManagementProps {
    variants: Variant[];
    onAddVariant: (variant: any) => void;
    onUpdateVariant: (id: number, variant: any) => void; // No usado en esta demo pero definido
    onDeleteVariant: (id: number) => void;
}

export function VariantsManagement({
                                       variants,
                                       onAddVariant,
                                       onUpdateVariant,
                                       onDeleteVariant,
                                   }: VariantsManagementProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ nombre: '', aumentoPrecio: 0 });

    const handleAdd = () => {
        setFormData({ nombre: '', aumentoPrecio: 0 });
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onAddVariant(formData);
        setIsModalOpen(false);
        setFormData({ nombre: '', aumentoPrecio: 0 });
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl text-gray-900">Configuración de Variantes</h1>
                    <p className="text-gray-500">Gestiona las variantes disponibles</p>
                </div>
                <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700">
                    <Plus className="w-4 h-4" /> Agregar Variante
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">ID</th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Nombre</th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Aumento Precio</th>
                        <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase">Acciones</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {variants.map(variant => (
                        <tr key={variant.idVariante} className="hover:bg-gray-50">
                            <td className="px-6 py-4 text-sm text-gray-500">{variant.idVariante}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">{variant.nombre}</td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                {variant.aumentoPrecio > 0 ? `+$${variant.aumentoPrecio.toLocaleString()}` : 'Sin cargo'}
                            </td>
                            <td className="px-6 py-4">
                                <button onClick={() => onDeleteVariant(variant.idVariante)} className="p-2 hover:bg-red-50 text-red-600 rounded-lg">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-xl">Agregar Nueva Variante</h2>
                            <button onClick={() => setIsModalOpen(false)}><X className="w-5 h-5 text-gray-500" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm mb-1">Nombre</label>
                                <input type="text" required value={formData.nombre} onChange={e => setFormData({...formData, nombre: e.target.value})} className="w-full border p-2 rounded" />
                            </div>
                            <div>
                                <label className="block text-sm mb-1">Aumento de Precio</label>
                                <input type="number" required min="0" value={formData.aumentoPrecio} onChange={e => setFormData({...formData, aumentoPrecio: parseFloat(e.target.value)})} className="w-full border p-2 rounded" />
                            </div>
                            <button type="submit" className="w-full bg-emerald-600 text-white p-2 rounded hover:bg-emerald-700">Crear Variante</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}