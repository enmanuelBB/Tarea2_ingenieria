export interface Variant {
  id: string;
  name: string;
  priceIncrease: number;
}

export interface Furniture {
  id: string;
  name: string;
  type: 'Silla' | 'Mesa' | 'Sofá' | 'Escritorio' | 'Estantería';
  material: string;
  size: 'Grande' | 'Mediano' | 'Pequeño';
  basePrice: number;
  stock: number;
  image: string;
  status: 'Active' | 'Inactive';
}

export interface QuoteItem {
  furniture: Furniture;
  variant: Variant;
  quantity: number;
}

export interface Quote {
  id: string;
  date: string;
  items: QuoteItem[];
  total: number;
  status: 'Pending' | 'Confirmed';
}
