import { useState } from 'react';
import { Plus, Pencil, Trash2, AlertCircle } from 'lucide-react';
import { Furniture } from '../../types';
import { FurnitureModal } from './FurnitureModal';

interface InventoryManagementProps {
  furniture: Furniture[];
  onAddFurniture: (furniture: Omit<Furniture, 'id'>) => void;
  onUpdateFurniture: (id: string, furniture: Omit<Furniture, 'id'>) => void;
  onDeleteFurniture: (id: string) => void;
  onToggleStatus: (id: string) => void;
}

export function InventoryManagement({
  furniture,
  onAddFurniture,
  onUpdateFurniture,
  onDeleteFurniture,
  onToggleStatus,
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

  const handleSave = (furnitureData: Omit<Furniture, 'id'>) => {
    if (editingFurniture) {
      onUpdateFurniture(editingFurniture.id, furnitureData);
    } else {
      onAddFurniture(furnitureData);
    }
  };

  const handleModalClose = () => {
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
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Nombre
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Material
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Precio Base
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {furniture.map(item => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded object-cover"
                      />
                      <span className="text-sm text-gray-900">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.material}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      {item.stock <= 5 && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm ${item.stock <= 5 ? 'text-red-600' : 'text-gray-900'}`}>
                        {item.stock}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${item.basePrice.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => onToggleStatus(item.id)}
                      className={`px-2 py-1 text-xs rounded ${
                        item.status === 'Active'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {item.status === 'Active' ? 'Activo' : 'Inactivo'}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => onDeleteFurniture(item.id)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
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
        onClose={handleModalClose}
        onSave={handleSave}
        editingFurniture={editingFurniture}
      />
    </div>
  );
}
