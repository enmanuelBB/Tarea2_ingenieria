import { useState } from 'react';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { Furniture, Variant, QuoteItem } from '../types/furniture';
import { ProductCard } from './ProductCard';

interface ClientCatalogProps {
  furniture: Furniture[];
  variants: Variant[];
  onViewQuote: () => void;
  quoteItems: QuoteItem[];
  onAddToQuote: (furniture: Furniture, variant: Variant) => void;
}

export function ClientCatalog({ 
  furniture, 
  variants, 
  onViewQuote, 
  quoteItems,
  onAddToQuote 
}: ClientCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const types = ['all', ...Array.from(new Set(furniture.map(f => f.type)))];
  const materials = ['all', ...Array.from(new Set(furniture.map(f => f.material)))];
  const sizes = ['all', 'Grande', 'Mediano', 'Pequeño'];

  const filteredFurniture = furniture.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesMaterial = selectedMaterial === 'all' || item.material === selectedMaterial;
    const matchesSize = selectedSize === 'all' || item.size === selectedSize;
    
    return matchesSearch && matchesType && matchesMaterial && matchesSize;
  });

  const totalQuoteItems = quoteItems.reduce((sum, item) => sum + item.quantity, 0);

  const FilterSection = () => (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3">Tipo de Mueble</h3>
        <div className="space-y-2">
          {types.map(type => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value={type}
                checked={selectedType === type}
                onChange={(e) => setSelectedType(e.target.value)}
                className="accent-emerald-600"
              />
              <span className="text-sm">
                {type === 'all' ? 'Todos' : type}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3">Material</h3>
        <div className="space-y-2">
          {materials.map(material => (
            <label key={material} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="material"
                value={material}
                checked={selectedMaterial === material}
                onChange={(e) => setSelectedMaterial(e.target.value)}
                className="accent-emerald-600"
              />
              <span className="text-sm">
                {material === 'all' ? 'Todos' : material}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3">Tamaño</h3>
        <div className="space-y-2">
          {sizes.map(size => (
            <label key={size} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="size"
                value={size}
                checked={selectedSize === size}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="accent-emerald-600"
              />
              <span className="text-sm">
                {size === 'all' ? 'Todos' : size}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-600 rounded-lg flex items-center justify-center text-white">
                MH
              </div>
              <div>
                <h1 className="text-xl">Los Muebles Hermanos</h1>
                <p className="text-xs text-neutral-600">Mueblería S.A.</p>
              </div>
            </div>

            <button
              onClick={onViewQuote}
              className="relative bg-emerald-600 text-white px-4 py-2 rounded-md hover:bg-emerald-700 flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              <span className="hidden sm:inline">Cotización</span>
              {totalQuoteItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center">
                  {totalQuoteItems}
                </span>
              )}
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              placeholder="Buscar muebles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden fixed bottom-4 right-4 bg-emerald-600 text-white p-4 rounded-full shadow-lg z-30"
          >
            {mobileFiltersOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Filters Sidebar */}
          <aside className={`
            fixed lg:static inset-0 lg:inset-auto
            bg-white lg:bg-transparent
            w-64 p-6 lg:p-0
            z-30 lg:z-auto
            transition-transform lg:transition-none
            ${mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}>
            <div className="flex items-center justify-between lg:hidden mb-6">
              <h2>Filtros</h2>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X size={24} />
              </button>
            </div>
            <FilterSection />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <div className="mb-6">
              <h2>Catálogo de Muebles</h2>
              <p className="text-neutral-600">
                {filteredFurniture.length} productos encontrados
              </p>
            </div>

            {filteredFurniture.length === 0 ? (
              <div className="text-center py-12 text-neutral-500">
                No se encontraron productos con los filtros seleccionados
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFurniture.map(item => (
                  <ProductCard
                    key={item.id}
                    furniture={item}
                    variants={variants}
                    onAddToQuote={onAddToQuote}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
