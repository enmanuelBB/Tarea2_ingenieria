import { Search, ShoppingCart, LayoutDashboard } from 'lucide-react';

interface HeaderProps {
  onViewChange: (view: 'catalog' | 'admin') => void;
  currentView: 'catalog' | 'admin';
  searchQuery: string;
  onSearchChange: (query: string) => void;
  cartItemCount: number;
  onCartClick: () => void;
}

export function Header({ 
  onViewChange, 
  currentView, 
  searchQuery, 
  onSearchChange,
  cartItemCount,
  onCartClick
}: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-amber-700 rounded-lg flex items-center justify-center">
                <span className="text-white">MH</span>
              </div>
              <div>
                <h1 className="text-amber-900">Los Muebles Hermanos</h1>
                <p className="text-xs text-gray-500">Mueblería S.A</p>
              </div>
            </div>
            
            {currentView === 'catalog' && (
              <nav className="hidden md:flex gap-6">
                <button className="text-gray-700 hover:text-amber-700 transition-colors">
                  Catálogo
                </button>
              </nav>
            )}
          </div>

          <div className="flex items-center gap-4">
            {currentView === 'catalog' && (
              <>
                <div className="relative hidden sm:block">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Buscar muebles..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent w-64"
                  />
                </div>
                
                <button 
                  onClick={onCartClick}
                  className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <ShoppingCart className="w-5 h-5 text-gray-700" />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
              </>
            )}
            
            <button
              onClick={() => onViewChange(currentView === 'catalog' ? 'admin' : 'catalog')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span className="hidden sm:inline">
                {currentView === 'catalog' ? 'Admin' : 'Catálogo'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
