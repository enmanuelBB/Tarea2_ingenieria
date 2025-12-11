import { useState, useEffect } from 'react';
import { ShoppingCart, AlertCircle } from 'lucide-react';
import { Furniture, Variant } from '../../types/furniture';

interface ProductCardProps {
    furniture: Furniture;
    variants: Variant[];
    onAddToQuote: (furniture: Furniture, variant: Variant) => void;
}

export function ProductCard({ furniture, variants, onAddToQuote }: ProductCardProps) {
    // Estado seguro: Si hay variantes, usa la primera. Si no, null.
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null);

    // Efecto para seleccionar la primera variante automáticamente cuando carguen los datos
    useEffect(() => {
        if (variants && variants.length > 0) {
            setSelectedVariant(variants[0]);
        }
    }, [variants]);

    // Si el mueble está inactivo, no lo mostramos (o podrías mostrarlo gris)
    if (furniture.estado === 'INACTIVO') return null;

    // Cálculos seguros
    const variantPrice = selectedVariant?.aumentoPrecio || 0;
    const totalPrice = furniture.precioBase + variantPrice;
    const hasVariants = variants && variants.length > 0;

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow border border-gray-100 flex flex-col h-full">
            {/* Imagen */}
            <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
                <img
                    src={furniture.image || 'https://via.placeholder.com/400'}
                    alt={furniture.nombreMueble}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                {furniture.stock < 5 && furniture.stock > 0 && (
                    <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            ¡Quedan {furniture.stock}!
          </span>
                )}
            </div>

            <div className="p-4 flex flex-col flex-1">
                {/* Etiquetas */}
                <div className="flex gap-2 mb-2">
          <span className="px-2 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded uppercase border border-amber-100">
            {furniture.tipo}
          </span>
                    <span className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs font-semibold rounded uppercase">
            {furniture.tamanio}
          </span>
                </div>

                <h3 className="text-lg font-bold text-gray-800 mb-1">{furniture.nombreMueble}</h3>
                <p className="text-sm text-gray-500 mb-4 line-clamp-2">{furniture.material}</p>

                {/* Selector de Variantes */}
                <div className="mt-auto">
                    {hasVariants ? (
                        <div className="mb-4">
                            <label className="block text-xs font-medium text-gray-500 mb-1 uppercase tracking-wider">
                                Personalizar:
                            </label>
                            <select
                                value={selectedVariant?.idVariante}
                                onChange={(e) => {
                                    const v = variants.find(v => v.idVariante === Number(e.target.value));
                                    if (v) setSelectedVariant(v);
                                }}
                                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                            >
                                {variants.map(variant => (
                                    <option key={variant.idVariante} value={variant.idVariante}>
                                        {variant.nombre} {variant.aumentoPrecio > 0 ? `(+$${variant.aumentoPrecio.toLocaleString()})` : '(Sin costo extra)'}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div className="mb-4 p-2 bg-yellow-50 text-yellow-700 text-xs rounded border border-yellow-100 flex items-center gap-2">
                            <AlertCircle size={14} />
                            <span>Estándar (Sin variantes disponibles)</span>
                        </div>
                    )}

                    {/* Precio y Botón */}
                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-gray-100">
                        <div>
                            <div className="text-xl font-bold text-emerald-700">
                                ${totalPrice.toLocaleString()}
                            </div>
                            {variantPrice > 0 && (
                                <div className="text-xs text-gray-400 line-through">
                                    ${furniture.precioBase.toLocaleString()}
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => selectedVariant && onAddToQuote(furniture, selectedVariant)}
                            disabled={furniture.stock === 0 || !selectedVariant}
                            className="flex-1 bg-emerald-600 text-white py-2.5 px-4 rounded-lg hover:bg-emerald-700 disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all shadow-sm font-medium"
                            title={!selectedVariant ? "No hay variantes disponibles" : "Agregar"}
                        >
                            <ShoppingCart size={18} />
                            {furniture.stock === 0 ? 'Agotado' : 'Agregar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}