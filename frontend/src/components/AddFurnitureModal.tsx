import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Furniture } from '../types/furniture';

interface AddFurnitureModalProps {
    furniture: Furniture | null;
    onSave: (furniture: any) => void;
    onClose: () => void;
}

const FURNITURE_IMAGES = {
    'Silla': 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000',
    'Mesa': 'https://images.unsplash.com/photo-1577140917170-285929d55716?auto=format&fit=crop&q=80&w=1000',
    'Sofá': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000',
    'Escritorio': 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=1000',
    'Estantería': 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=1000'
};

export function AddFurnitureModal({ furniture, onSave, onClose }: AddFurnitureModalProps) {
    const [formData, setFormData] = useState({
        nombreMueble: '',
        tipo: 'Silla',
        material: '',
        tamanio: 'MEDIANO',
        precioBase: 0,
        stock: 0,
        image: '',
        estado: 'ACTIVO'
    });

    useEffect(() => {
        if (furniture) {
            setFormData({
                nombreMueble: furniture.nombreMueble,
                tipo: furniture.tipo,
                material: furniture.material,
                tamanio: furniture.tamanio,
                precioBase: furniture.precioBase,
                stock: furniture.stock,
                image: furniture.image || '',
                estado: furniture.estado
            });
        } else {
            setFormData(prev => ({
                ...prev,
                image: FURNITURE_IMAGES['Silla']
            }));
        }
    }, [furniture]);

    // Actualiza la imagen cuando cambia el tipo (solo si es nuevo)
    useEffect(() => {
        if (!furniture) {
            setFormData(prev => ({
                ...prev,
                image: FURNITURE_IMAGES[prev.type as keyof typeof FURNITURE_IMAGES] || ''
            }));
        }
    }, [formData.tipo, furniture]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-auto">
                <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white">
                    <h2 className="text-xl font-bold">{furniture ? 'Editar Mueble' : 'Agregar Nuevo Mueble'}</h2>
                    <button onClick={onClose} className="text-neutral-500 hover:text-neutral-700">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Nombre</label>
                        <input
                            type="text"
                            value={formData.nombreMueble}
                            onChange={(e) => setFormData({ ...formData, nombreMueble: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Tipo</label>
                        <select
                            value={formData.tipo}
                            onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="Silla">Silla</option>
                            <option value="Mesa">Mesa</option>
                            <option value="Sofá">Sofá</option>
                            <option value="Escritorio">Escritorio</option>
                            <option value="Estantería">Estantería</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Material</label>
                        <input
                            type="text"
                            value={formData.material}
                            onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Tamaño</label>
                        <select
                            value={formData.tamanio}
                            onChange={(e) => setFormData({ ...formData, tamanio: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="PEQUENO">Pequeño</option>
                            <option value="MEDIANO">Mediano</option>
                            <option value="GRANDE">Grande</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Precio Base</label>
                            <input
                                type="number"
                                value={formData.precioBase}
                                onChange={(e) => setFormData({ ...formData, precioBase: Number(e.target.value) })}
                                min="0"
                                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Stock</label>
                            <input
                                type="number"
                                value={formData.stock}
                                onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) })}
                                min="0"
                                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Estado</label>
                        <select
                            value={formData.estado}
                            onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                            className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-emerald-500"
                        >
                            <option value="ACTIVO">ACTIVO</option>
                            <option value="INACTIVO">INACTIVO</option>
                        </select>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border rounded-md hover:bg-neutral-50">
                            Cancelar
                        </button>
                        <button type="submit" className="flex-1 bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700">
                            {furniture ? 'Actualizar' : 'Agregar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}