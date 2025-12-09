import { useState } from 'react';
import { X } from 'lucide-react';
import { Variant } from '../types/furniture';

interface AddVariantModalProps {
  onSave: (variant: Omit<Variant, 'id'>) => void;
  onClose: () => void;
}

export function AddVariantModal({ onSave, onClose }: AddVariantModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    priceIncrease: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="flex items-center justify-between p-6 border-b">
          <h2>Agregar Nueva Variante</h2>
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
              Nombre de Variante
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="ej: Barniz Premium, Acabado Mate"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm mb-2">
              Incremento de Precio ($)
            </label>
            <input
              type="number"
              value={formData.priceIncrease}
              onChange={(e) => setFormData({ ...formData, priceIncrease: Number(e.target.value) })}
              placeholder="0"
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
            <p className="text-xs text-neutral-500 mt-1">
              Usar 0 para variantes sin costo adicional, o un número positivo para incremento
            </p>
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
              Agregar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
