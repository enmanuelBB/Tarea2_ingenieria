export type Size = 'Pequeño' | 'Mediano' | 'Grande';
export type FurnitureType = 'Silla' | 'Mesa' | 'Sofá' | 'Escritorio' | 'Estante' | 'Sillón';
export type Material = 'Roble' | 'Pino' | 'Nogal' | 'Cedro' | 'Tela' | 'Cuero';

export interface Variant {
  id: string;
  name: string;
  priceIncrease: number;
}

export interface Furniture {
  id: string;
  name: string;
  type: FurnitureType;
  material: Material;
  size: Size;
  basePrice: number;
  stock: number;
  image: string;
  status: 'Active' | 'Inactive';
}

export interface QuoteItem {
  furniture: Furniture;
  variant: Variant | null;
  quantity: number;
}

export interface Quote {
  id: string;
  date: Date;
  items: QuoteItem[];
  total: number;
  status: 'Pending' | 'Confirmed';
}
