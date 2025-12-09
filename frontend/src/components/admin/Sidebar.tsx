import { Package, FileText, Settings } from 'lucide-react';

interface SidebarProps {
  activeSection: 'inventory' | 'quotes' | 'variants';
  onSectionChange: (section: 'inventory' | 'quotes' | 'variants') => void;
}

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const menuItems = [
    { id: 'inventory' as const, label: 'Inventario', icon: Package },
    { id: 'quotes' as const, label: 'Cotizaciones', icon: FileText },
    { id: 'variants' as const, label: 'Variantes', icon: Settings },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-gray-900">Panel Administrativo</h2>
        <p className="text-sm text-gray-500">Gustavo - Manager</p>
      </div>
      
      <nav className="px-3">
        {menuItems.map(item => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-colors ${
                isActive
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
