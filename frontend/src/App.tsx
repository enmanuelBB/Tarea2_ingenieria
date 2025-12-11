import { useState, useEffect } from 'react';
import api from './api/axiosConfig';
import { Furniture, Variant, Quote, QuoteItem } from './types/furniture';
import { ClientCatalog } from './components/ClientCatalog';
import { QuoteView } from './components/QuoteView';
import { AdminDashboard } from './components/AdminDashboard';

export default function App() {
    const [view, setView] = useState<'catalog' | 'quote' | 'admin'>('catalog');

    // Estado de datos (vienen del Backend)
    const [furniture, setFurniture] = useState<Furniture[]>([]);
    const [variants, setVariants] = useState<Variant[]>([]);
    const [quotes, setQuotes] = useState<Quote[]>([]);

    // Estado del carrito (Local)
    const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
    const [loading, setLoading] = useState(true);

    // --- 1. CARGA DE DATOS INICIALES ---
    const fetchData = async () => {
        try {
            setLoading(true);
            const [furnitureRes, variantsRes, quotesRes] = await Promise.all([
                api.get('/muebles'),
                api.get('/variantes'),
                api.get('/cotizaciones')
            ]);

            // Agregamos imágenes placeholder porque el backend no las tiene
            const furnitureWithImages = furnitureRes.data.map((item: Furniture) => ({
                ...item,
                image: getImageForType(item.tipo)
            }));

            setFurniture(furnitureWithImages);
            setVariants(variantsRes.data);
            setQuotes(quotesRes.data);
        } catch (error) {
            console.error("Error conectando al backend:", error);
            // Opcional: Mostrar alerta si falla la conexión
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Helper para imágenes (Frontend only)
    const getImageForType = (type: string) => {
        const images: Record<string, string> = {
            'Silla': 'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000',
            'Mesa': 'https://images.unsplash.com/photo-1577140917170-285929d55716?auto=format&fit=crop&q=80&w=1000',
            'Sofá': 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=1000',
            'Escritorio': 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=1000',
            'Estantería': 'https://images.unsplash.com/photo-1594620302200-9a762244a156?auto=format&fit=crop&q=80&w=1000'
        };
        return images[type] || 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=1000';
    };

    // --- 2. GESTIÓN DE MUEBLES (ADMIN) ---
    const handleAddFurniture = async (newFurniture: any) => {
        try {

            const { image, idMueble, ...rest } = newFurniture;

            const payload = {
                ...rest,

                tamanio: rest.tamanio.toUpperCase(),
                tipo: rest.tipo, // Tal cual como viene del select
                estado: rest.estado || 'ACTIVO'
            };

            console.log("Enviando al backend:", payload); // Para que veas en consola qué mandas

            await api.post('/muebles', payload);
            alert('Mueble creado con éxito');
            fetchData(); // Recargar datos
        } catch (error: any) {
            console.error("Error detallado:", error.response?.data); // Ver error real en consola
            alert(`Error al crear mueble: ${error.response?.data?.message || 'Revisa la consola'}`);
        }
    };

    const handleUpdateFurniture = async (id: number, updates: Partial<Furniture>) => {
        try {
            await api.patch(`/muebles/${id}`, updates);
            fetchData();
        } catch (error) {
            alert('Error al actualizar');
            console.error(error);
        }
    };

    const handleDeleteFurniture = async (id: number) => {
        if (confirm('¿Está seguro de desactivar este mueble?')) {
            try {
                await api.delete(`/muebles/${id}`); // Esto lo desactiva en el backend
                fetchData();
            } catch (error) {
                alert('Error al desactivar mueble');
                console.error(error);
            }
        }
    };

    // --- 3. GESTIÓN DE VARIANTES (ADMIN) ---
    const handleAddVariant = async (newVariant: any) => {
        try {
            await api.post('/variantes', newVariant);
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteVariant = (id: number) => {
        alert("La eliminación de variantes no está implementada en esta demo.");
    };

    // --- 4. GESTIÓN DE COTIZACIONES (CLIENTE) ---
    const handleAddToQuote = (furnitureItem: Furniture, variant: Variant) => {
        setQuoteItems(prev => {
            const existingIndex = prev.findIndex(
                item => item.furniture.idMueble === furnitureItem.idMueble && item.variant.idVariante === variant.idVariante
            );

            if (existingIndex >= 0) {
                const newItems = [...prev];
                // Validamos contra el stock real que viene de la BD
                if (newItems[existingIndex].quantity < furnitureItem.stock) {
                    newItems[existingIndex].quantity += 1;
                    return newItems;
                } else {
                    alert('No hay suficiente stock disponible');
                    return prev;
                }
            } else {
                return [...prev, {
                    furniture: furnitureItem,
                    variant,
                    quantity: 1
                }];
            }
        });
    };

    const handleUpdateQuantity = (index: number, delta: number) => {
        const newItems = [...quoteItems];
        const newQuantity = newItems[index].quantity + delta;

        if (newQuantity > 0 && newQuantity <= newItems[index].furniture.stock) {
            newItems[index].quantity = newQuantity;
            setQuoteItems(newItems);
        }
    };

    const handleRemoveItem = (index: number) => {
        setQuoteItems(quoteItems.filter((_, i) => i !== index));
    };

    const handleSubmitQuote = async () => {
        if (quoteItems.length === 0) return;

        // Preparamos el JSON exacto que pide el Backend
        const payload = {
            detalles: quoteItems.map(item => ({
                idMueble: item.furniture.idMueble,
                idVariante: item.variant.idVariante,
                cantidad: item.quantity
            }))
        };

        try {
            await api.post('/cotizaciones', payload);
            alert('¡Cotización enviada exitosamente!');
            setQuoteItems([]); // Limpiar carrito
            setView('catalog');
            fetchData(); // Recargar para actualizar listas de admin
        } catch (error) {
            alert('Error al enviar la cotización.');
            console.error(error);
        }
    };

    // --- 5. CONFIRMACIÓN DE VENTA (ADMIN) ---
    const handleConfirmSale = async (quoteId: number) => {
        try {
            // Llamamos al endpoint que descuenta stock
            await api.post(`/cotizaciones/${quoteId}/confirmar`);
            alert('¡Venta confirmada! Stock descontado.');
            fetchData(); // Recargar para ver el stock actualizado y el estado de la cotización
        } catch (error: any) {
            // Mostramos el mensaje de error del backend (ej: "Stock insuficiente")
            const msg = error.response?.data?.message || 'Error al confirmar venta';
            alert(msg);
        }
    };

    // --- RENDER ---

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Cargando sistema...</div>;
    }

    return (
        <div className="min-h-screen font-sans text-gray-900">
            {/* Botón Flotante Admin (Gustavo) */}
            {view !== 'admin' && (
                <button
                    onClick={() => setView('admin')}
                    style={{
                        position: 'fixed',
                        bottom: '20px',
                        left: '20px',
                        backgroundColor: 'black', // Fondo Negro
                        color: 'white',           // Texto Blanco
                        padding: '12px 24px',
                        borderRadius: '50px',
                        border: '2px solid white',
                        fontWeight: 'bold',
                        zIndex: 9999,
                        cursor: 'pointer',
                        boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                    }}
                >
                    Panel Admin
                </button>
            )}

            {view === 'catalog' && (
                <ClientCatalog
                    furniture={furniture}
                    variants={variants}
                    quoteItems={quoteItems}
                    onAddToQuote={handleAddToQuote}
                    onViewQuote={() => setView('quote')}
                />
            )}

            {view === 'quote' && (
                <QuoteView
                    quoteItems={quoteItems}
                    onBack={() => setView('catalog')}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                    onSubmitQuote={handleSubmitQuote}
                />
            )}

            {view === 'admin' && (
                <AdminDashboard
                    furniture={furniture}
                    variants={variants}
                    quotes={quotes}
                    onAddFurniture={handleAddFurniture}
                    onUpdateFurniture={handleUpdateFurniture}
                    onDeleteFurniture={handleDeleteFurniture}
                    onAddVariant={handleAddVariant}
                    onDeleteVariant={handleDeleteVariant}
                    onConfirmSale={handleConfirmSale}
                    onBackToCatalog={() => setView('catalog')}
                />
            )}
        </div>
    );
}