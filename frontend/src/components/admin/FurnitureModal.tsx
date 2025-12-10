import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Furniture } from '../../types/furniture';

interface FurnitureModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (furniture: any) => void;
    editingFurniture?: Furniture | null;
}

const materials = ['Roble', 'Pino', 'Nogal', 'Cedro', 'Tela', 'Cuero', 'Metal'];
const types = ['Silla', 'Mesa', 'Sofá', 'Escritorio', 'Estante', 'Sillón'];
const sizes = ['PEQUENO', 'MEDIANO', 'GRANDE'];

export function FurnitureModal({ isOpen, onClose, onSave, editingFurniture }: FurnitureModalProps) {
    const [formData, setFormData] = useState({
        nombreMueble: '',
        tipo: 'Silla',
        material: 'Roble',
        tamanio: 'MEDIANO',
        precioBase: 0,
        stock: 0,
        image: '',
        estado: 'ACTIVO',
    });

    useEffect(() => {
        if (editingFurniture) {
            setFormData({
                nombreMueble: editingFurniture.nombreMueble,
                tipo: editingFurniture.tipo,
                material: editingFurniture.material,
                tamanio: editingFurniture.tamanio,
                precioBase: editingFurniture.precioBase,
                stock: editingFurniture.stock,
                image: editingFurniture.image || '',
                estado: editingFurniture.estado,
            });
        } else {
            setFormData({
                nombreMueble: '',
                tipo: 'Silla',
                material: 'Roble',
                tamanio: 'MEDIANO',
                precioBase: 0,
                stock: 0,
                image: '',
                estado: 'ACTIVO',
            });
        }
    }, [editingFurniture, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full">
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl text-gray-900">
                        {editingFurniture ? 'Editar Mueble' : 'Agregar Nuevo Mueble'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
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
                                value={formData.nombreMueble}
                                onChange={(e) => setFormData({ ...formData, nombreMueble: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Tipo</label>
                            <select
                                value={formData.tipo}
                                onChange={(e) => setFormData({ ...formData, tipo: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                                {types.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Material</label>
                            <select
                                value={formData.material}
                                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                                {materials.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Tamaño</label>
                            <select
                                value={formData.tamanio}
                                onChange={(e) => setFormData({ ...formData, tamanio: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                                {sizes.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Precio Base</label>
                            <input
                                type="number"
                                required
                                min="0"
                                value={formData.precioBase}
                                onChange={(e) => setFormData({ ...formData, precioBase: parseFloat(e.target.value) })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
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
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            />
                        </div>

                        <div>
                            <label className="block text-sm text-gray-700 mb-1">Estado</label>
                            <select
                                value={formData.estado}
                                onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                                <option value="ACTIVO">ACTIVO</option>
                                <option value="INACTIVO">INACTIVO</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-3 mt-6">
                        <button type="button" onClick={onClose} className="flex-1 px-4 py-2 border rounded-lg">Cancelar</button>
                        <button type="submit" className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
}