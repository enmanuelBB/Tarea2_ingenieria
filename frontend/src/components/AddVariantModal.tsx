import { useState } from 'react';
import { X } from 'lucide-react';

interface AddVariantModalProps {
    onSave: (variant: any) => void;
    onClose: () => void;
}

export function AddVariantModal({ onSave, onClose }: AddVariantModalProps) {
    const [formData, setFormData] = useState({
        nombre: '',
        aumentoPrecio: 0
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
                    <h2 className="text-xl font-bold">Agregar Nueva Variante</h2>
                    <button onClick={onClose} className="text-neutral-500 hover:text-neutral-700">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre de Variante</label>
                        <input
                            type="text"
                            value={formData.nombre}
                            onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                            placeholder="ej: Barniz Premium"
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Incremento de Precio ($)</label>
                        <input
                            type="number"
                            value={formData.aumentoPrecio}
                            onChange={(e) => setFormData({ ...formData, aumentoPrecio: Number(e.target.value) })}
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                        <p className="text-xs text-neutral-500 mt-1">Usar 0 para variantes sin costo adicional.</p>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border rounded-md hover:bg-neutral-50">Cancelar</button>
                        <button type="submit" className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">Agregar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}