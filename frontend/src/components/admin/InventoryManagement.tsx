import { useState } from 'react';
import { Plus, Pencil, Trash2, AlertCircle } from 'lucide-react';
import { Furniture } from '../../types/furniture';
import { FurnitureModal } from './FurnitureModal';

interface InventoryManagementProps {
    furniture: Furniture[];
    onAddFurniture: (furniture: Omit<Furniture, 'idMueble'>) => void;
    onUpdateFurniture: (id: number, furniture: Partial<Furniture>) => void;
    onDeleteFurniture: (id: number) => void;
}

export function InventoryManagement({
                                        furniture,
                                        onAddFurniture,
                                        onUpdateFurniture,
                                        onDeleteFurniture,
                                    }: InventoryManagementProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFurniture, setEditingFurniture] = useState<Furniture | null>(null);

    const handleEdit = (item: Furniture) => {
        setEditingFurniture(item);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingFurniture(null);
        setIsModalOpen(true);
    };

    const handleSave = (furnitureData: any) => {
        if (editingFurniture) {
            onUpdateFurniture(editingFurniture.idMueble, furnitureData);
        } else {
            onAddFurniture(furnitureData);
        }
        setIsModalOpen(false);
        setEditingFurniture(null);
    };

    return (
        <div className="p-8">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl text-gray-900">Gestión de Inventario</h1>
                    <p className="text-gray-500">Administra el catálogo de muebles</p>
                </div>
                <button
                    onClick={handleAdd}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Agregar Mueble
                </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">ID</th>
                            <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Tipo</th>
                            <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Material</th>
                            <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Stock</th>
                            <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Precio Base</th>
                            <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        {furniture.map(item => (
                            <tr key={item.idMueble} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.idMueble}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-900 font-medium">{item.nombreMueble}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.tipo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.material}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        {item.stock <= 5 && <AlertCircle className="w-4 h-4 text-red-500" />}
                                        <span className={`text-sm ${item.stock <= 5 ? 'text-red-600 font-bold' : 'text-gray-900'}`}>
                        {item.stock}
                      </span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    ${item.precioBase.toLocaleString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded font-semibold ${
                        item.estado === 'ACTIVO' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.estado}
                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleEdit(item)} className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                                            <Pencil className="w-4 h-4 text-blue-600" />
                                        </button>
                                        <button onClick={() => onDeleteFurniture(item.idMueble)} className="p-2 hover:bg-red-50 rounded-lg transition-colors">
                                            <Trash2 className="w-4 h-4 text-red-600" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <FurnitureModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                editingFurniture={editingFurniture}
            />
        </div>
    );
}