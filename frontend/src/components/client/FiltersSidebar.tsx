import { Material, FurnitureType, Size } from '../../types';

interface FiltersSidebarProps {
  selectedMaterials: Material[];
  selectedTypes: FurnitureType[];
  selectedSizes: Size[];
  onMaterialToggle: (material: Material) => void;
  onTypeToggle: (type: FurnitureType) => void;
  onSizeToggle: (size: Size) => void;
  onClearFilters: () => void;
}

const materials: Material[] = ['Roble', 'Pino', 'Nogal', 'Cedro', 'Tela', 'Cuero'];
const types: FurnitureType[] = ['Silla', 'Mesa', 'Sofá', 'Escritorio', 'Estante', 'Sillón'];
const sizes: Size[] = ['Pequeño', 'Mediano', 'Grande'];

export function FiltersSidebar({
  selectedMaterials,
  selectedTypes,
  selectedSizes,
  onMaterialToggle,
  onTypeToggle,
  onSizeToggle,
  onClearFilters,
}: FiltersSidebarProps) {
  const hasActiveFilters = 
    selectedMaterials.length > 0 || 
    selectedTypes.length > 0 || 
    selectedSizes.length > 0;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-gray-900">Filtros</h2>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="text-sm text-emerald-600 hover:text-emerald-700"
          >
            Limpiar
          </button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm text-gray-700 mb-2">Material</h3>
          <div className="space-y-2">
            {materials.map(material => (
              <label key={material} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedMaterials.includes(material)}
                  onChange={() => onMaterialToggle(material)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">{material}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm text-gray-700 mb-2">Tipo</h3>
          <div className="space-y-2">
            {types.map(type => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedTypes.includes(type)}
                  onChange={() => onTypeToggle(type)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm text-gray-700 mb-2">Tamaño</h3>
          <div className="space-y-2">
            {sizes.map(size => (
              <label key={size} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectedSizes.includes(size)}
                  onChange={() => onSizeToggle(size)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <span className="text-sm text-gray-700">{size}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
