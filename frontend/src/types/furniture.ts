export interface Variant {
    idVariante: number;
    nombre: string;
    aumentoPrecio: number;
}

export interface Furniture {
    idMueble: number;
    nombreMueble: string;
    tipo: string;
    material: string;
    tamanio: string;
    precioBase: number;
    stock: number;
    estado: string;
    image?: string;
}

export interface QuoteItem {
    furniture: Furniture;
    variant: Variant;
    quantity: number;
}

export interface Quote {
    idCotizacion: number;
    fecha: string;
    detalles: any[];
    total: number;
    estado: 'PENDIENTE' | 'CONFIRMADA'; // Antes Pending | Confirmed
}