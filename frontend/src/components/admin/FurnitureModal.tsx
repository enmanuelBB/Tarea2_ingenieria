import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Furniture, Material, FurnitureType, Size } from '../../types';

interface FurnitureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (furniture: Omit<Furniture, 'id'>) => void;
  editingFurniture?: Furniture | null;
}

const materials: Material[] = ['Roble', 'Pino', 'Nogal', 'Cedro', 'Tela', 'Cuero'];
const types: FurnitureType[] = ['Silla', 'Mesa', 'Sofá', 'Escritorio', 'Estante', 'Sillón'];
const sizes: Size[] = ['Pequeño', 'Mediano', 'Grande'];

export function FurnitureModal({ isOpen, onClose, onSave, editingFurniture }: FurnitureModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'Silla' as FurnitureType,
    material: 'Roble' as Material,
    size: 'Mediano' as Size,
    basePrice: 0,
    stock: 0,
    image: '',
    status: 'Active' as 'Active' | 'Inactive',
  });

  useEffect(() => {
    if (editingFurniture) {
      setFormData({
        name: editingFurniture.name,
        type: editingFurniture.type,
        material: editingFurniture.material,
        size: editingFurniture.size,
        basePrice: editingFurniture.basePrice,
        stock: editingFurniture.stock,
        image: editingFurniture.image,
        status: editingFurniture.status,
      });
    } else {
      setFormData({
        name: '',
        type: 'Silla',
        material: 'Roble',
        size: 'Mediano',
        basePrice: 0,
        stock: 0,
        image: 'https://images.unsplash.com/photo-1702018706865-e5306a8fa007?w=400',
        status: 'Active',
      });
    }
  }, [editingFurniture, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl text-gray-900">
            {editingFurniture ? 'Editar Mueble' : 'Agregar Nuevo Mueble'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm text-gray-700 mb-1">Nombre</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Tipo</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as FurnitureType })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Material</label>
              <select
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value as Material })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {materials.map(material => (
                  <option key={material} value={material}>{material}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Tamaño</label>
              <select
                value={formData.size}
                onChange={(e) => setFormData({ ...formData, size: e.target.value as Size })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                {sizes.map(size => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Precio Base ($)</label>
              <input
                type="number"
                required
                min="0"
                value={formData.basePrice}
                onChange={(e) => setFormData({ ...formData, basePrice: parseFloat(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Stock</label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-1">Estado</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Active' | 'Inactive' })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option value="Active">Activo</option>
                <option value="Inactive">Inactivo</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm text-gray-700 mb-1">URL de Imagen</label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              {editingFurniture ? 'Guardar Cambios' : 'Crear Mueble'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
