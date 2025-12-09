import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Furniture, Variant } from '../../types';

interface ProductCardProps {
  furniture: Furniture;
  variants: Variant[];
  onAddToQuote: (furniture: Furniture, variant: Variant) => void;
}

export function ProductCard({ furniture, variants, onAddToQuote }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(variants[0]);

  const finalPrice = furniture.basePrice + selectedVariant.priceIncrease;
  const hasVariantIncrease = selectedVariant.priceIncrease > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100">
        <img
          src={furniture.image}
          alt={furniture.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <div className="p-4">
        <div className="flex gap-2 mb-2">
          <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded">
            {furniture.type}
          </span>
          <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
            {furniture.size}
          </span>
        </div>
        
        <h3 className="text-gray-900 mb-2">{furniture.name}</h3>
        
        <div className="mb-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl text-gray-900">${finalPrice.toLocaleString()}</span>
            {hasVariantIncrease && (
              <span className="text-sm text-gray-500 line-through">
                ${furniture.basePrice.toLocaleString()}
              </span>
            )}
          </div>
          {hasVariantIncrease && (
            <span className="text-xs text-emerald-600">
              +${selectedVariant.priceIncrease.toLocaleString()} por {selectedVariant.name}
            </span>
          )}
        </div>

        <div className="mb-3">
          <label className="block text-sm text-gray-700 mb-1">Variante</label>
          <select
            value={selectedVariant.id}
            onChange={(e) => {
              const variant = variants.find(v => v.id === e.target.value);
              if (variant) setSelectedVariant(variant);
            }}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {variants.map(variant => (
              <option key={variant.id} value={variant.id}>
                {variant.name}
                {variant.priceIncrease > 0 && ` (+$${variant.priceIncrease})`}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={() => onAddToQuote(furniture, selectedVariant)}
          disabled={furniture.stock === 0}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          <Plus className="w-4 h-4" />
          {furniture.stock === 0 ? 'Sin Stock' : 'Agregar a Cotización'}
        </button>
        
        <p className="text-xs text-gray-500 mt-2 text-center">
          Stock disponible: {furniture.stock}
        </p>
      </div>
    </div>
  );
}
