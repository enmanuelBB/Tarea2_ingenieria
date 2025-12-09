import { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { Furniture, Variant } from '../types/furniture';

interface ProductCardProps {
  furniture: Furniture;
  variants: Variant[];
  onAddToQuote: (furniture: Furniture, variant: Variant) => void;
}

export function ProductCard({ furniture, variants, onAddToQuote }: ProductCardProps) {
  const [selectedVariant, setSelectedVariant] = useState<Variant>(variants[0]);

  if (furniture.status === 'Inactive') return null;

  const totalPrice = furniture.basePrice + selectedVariant.priceIncrease;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative aspect-[4/3] overflow-hidden bg-neutral-100">
        <img 
          src={furniture.image} 
          alt={furniture.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="p-4">
        <div className="flex gap-2 mb-2">
          <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs rounded">
            {furniture.type}
          </span>
          <span className="px-2 py-1 bg-neutral-100 text-neutral-700 text-xs rounded">
            {furniture.size}
          </span>
        </div>

        <h3 className="mb-3">{furniture.name}</h3>

        <div className="mb-4">
          <label className="block text-sm text-neutral-600 mb-2">
            Variante:
          </label>
          <select
            value={selectedVariant.id}
            onChange={(e) => {
              const variant = variants.find(v => v.id === e.target.value);
              if (variant) setSelectedVariant(variant);
            }}
            className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {variants.map(variant => (
              <option key={variant.id} value={variant.id}>
                {variant.name} {variant.priceIncrease > 0 && `(+$${variant.priceIncrease.toLocaleString()})`}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-2xl text-emerald-600">
              ${totalPrice.toLocaleString()}
            </div>
            {selectedVariant.priceIncrease > 0 && (
              <div className="text-xs text-neutral-500">
                Base: ${furniture.basePrice.toLocaleString()}
              </div>
            )}
          </div>
          {furniture.stock < 10 && furniture.stock > 0 && (
            <span className="text-xs text-amber-600">
              Solo {furniture.stock} disponibles
            </span>
          )}
        </div>

        <button
          onClick={() => onAddToQuote(furniture, selectedVariant)}
          disabled={furniture.stock === 0}
          className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 disabled:bg-neutral-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
        >
          <ShoppingCart size={18} />
          {furniture.stock === 0 ? 'Sin Stock' : 'Agregar a Cotización'}
        </button>
      </div>
    </div>
  );
}
