import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Furniture } from '../types/furniture';

interface AddFurnitureModalProps {
  furniture: Furniture | null;
  onSave: (furniture: Omit<Furniture, 'id'>) => void;
  onClose: () => void;
}

const FURNITURE_IMAGES = {
  'Silla': 'https://images.unsplash.com/photo-1702018706865-e5306a8fa007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBjaGFpciUyMGZ1cm5pdHVyZXxlbnwxfHx8fDE3NjUzMjA5MjB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'Mesa': 'https://images.unsplash.com/photo-1722084059243-b0ec46398446?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjB0YWJsZSUyMGZ1cm5pdHVyZXxlbnwxfHx8fDE3NjUzMDAzNjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'Sofá': 'https://images.unsplash.com/photo-1763565909003-46e9dfb68a00?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2ZhJTIwZnVybml0dXJlfGVufDF8fHx8MTc2NTI3MjY3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'Escritorio': 'https://images.unsplash.com/photo-1679309981674-cef0e23a7864?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBkZXNrJTIwZnVybml0dXJlfGVufDF8fHx8MTc2NTMyMTE5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
  'Estantería': 'https://images.unsplash.com/photo-1473447216727-44efba8cf0e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib29rc2hlbGYlMjBmdXJuaXR1cmV8ZW58MXx8fHwxNzY1MjY1MjM4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
};

export function AddFurnitureModal({ furniture, onSave, onClose }: AddFurnitureModalProps) {
  const [formData, setFormData] = useState({
    name: furniture?.name || '',
    type: furniture?.type || 'Silla' as const,
    material: furniture?.material || '',
    size: furniture?.size || 'Mediano' as const,
    basePrice: furniture?.basePrice || 0,
    stock: furniture?.stock || 0,
    image: furniture?.image || FURNITURE_IMAGES['Silla'],
    status: furniture?.status || 'Active' as const
  });

  useEffect(() => {
    if (!furniture) {
      setFormData(prev => ({
        ...prev,
        image: FURNITURE_IMAGES[prev.type]
      }));
    }
  }, [formData.type, furniture]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
          <h2>{furniture ? 'Editar Mueble' : 'Agregar Nuevo Mueble'}</h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">
              Tipo
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ 
                ...formData, 
                type: e.target.value as any,
                image: FURNITURE_IMAGES[e.target.value as keyof typeof FURNITURE_IMAGES]
              })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Silla">Silla</option>
              <option value="Mesa">Mesa</option>
              <option value="Sofá">Sofá</option>
              <option value="Escritorio">Escritorio</option>
              <option value="Estantería">Estantería</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">
              Material
            </label>
            <input
              type="text"
              value={formData.material}
              onChange={(e) => setFormData({ ...formData, material: e.target.value })}
              placeholder="ej: Roble, Pino, Metal"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">
              Tamaño
            </label>
            <select
              value={formData.size}
              onChange={(e) => setFormData({ ...formData, size: e.target.value as any })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Pequeño">Pequeño</option>
              <option value="Mediano">Mediano</option>
              <option value="Grande">Grande</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-2">
              Precio Base ($)
            </label>
            <input
              type="number"
              value={formData.basePrice}
              onChange={(e) => setFormData({ ...formData, basePrice: Number(e.target.value) })}
              min="0"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">
              Stock
            </label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
              min="0"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">
              Estado
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="Active">Activo</option>
              <option value="Inactive">Inactivo</option>
            </select>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-neutral-300 rounded-md hover:bg-neutral-50"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700"
            >
              {furniture ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
