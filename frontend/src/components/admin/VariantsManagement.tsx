import { useState } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { Variant } from '../../types';

interface VariantsManagementProps {
  variants: Variant[];
  onAddVariant: (variant: Omit<Variant, 'id'>) => void;
  onUpdateVariant: (id: string, variant: Omit<Variant, 'id'>) => void;
  onDeleteVariant: (id: string) => void;
}

export function VariantsManagement({
  variants,
  onAddVariant,
  onUpdateVariant,
  onDeleteVariant,
}: VariantsManagementProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState<Variant | null>(null);
  const [formData, setFormData] = useState({ name: '', priceIncrease: 0 });

  const handleAdd = () => {
    setEditingVariant(null);
    setFormData({ name: '', priceIncrease: 0 });
    setIsModalOpen(true);
  };

  const handleEdit = (variant: Variant) => {
    setEditingVariant(variant);
    setFormData({ name: variant.name, priceIncrease: variant.priceIncrease });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingVariant) {
      onUpdateVariant(editingVariant.id, formData);
    } else {
      onAddVariant(formData);
    }
    setIsModalOpen(false);
    setFormData({ name: '', priceIncrease: 0 });
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl text-gray-900">Configuración de Variantes</h1>
          <p className="text-gray-500">Gestiona las variantes disponibles para los muebles</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          Agregar Variante
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
                  Incremento de Precio
                </th>
                <th className="px-6 py-3 text-left text-xs text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {variants.map(variant => (
                <tr key={variant.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {variant.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {variant.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {variant.priceIncrease > 0 ? `+$${variant.priceIncrease.toLocaleString()}` : 'Sin cargo'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(variant)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Pencil className="w-4 h-4 text-blue-600" />
                      </button>
                      <button
                        onClick={() => onDeleteVariant(variant.id)}
                        disabled={variant.id === 'v1'}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl text-gray-900">
                {editingVariant ? 'Editar Variante' : 'Agregar Nueva Variante'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Nombre</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="ej: Barniz Premium"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Incremento de Precio ($)
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={formData.priceIncrease}
                    onChange={(e) => setFormData({ ...formData, priceIncrease: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Ingrese 0 para variantes sin cargo adicional
                  </p>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                >
                  {editingVariant ? 'Guardar Cambios' : 'Crear Variante'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
