import { CheckCircle, Calendar, DollarSign } from 'lucide-react';
import { Quote, Furniture } from '../../types/furniture';

interface QuotesManagementProps {
    quotes: Quote[];
    onConfirmSale: (quoteId: number) => void;
    furniture: Furniture[];
}

export function QuotesManagement({ quotes, onConfirmSale }: QuotesManagementProps) {
    const pendingQuotes = quotes.filter(q => q.estado === 'PENDIENTE');
    const confirmedQuotes = quotes.filter(q => q.estado === 'CONFIRMADA');

    return (
        <div className="p-8">
            <div className="mb-6">
                <h1 className="text-2xl text-gray-900">Gestión de Cotizaciones</h1>
                <p className="text-gray-500">Revisa y confirma las cotizaciones</p>
            </div>

            <div className="space-y-4">
                {pendingQuotes.length === 0 ? (
                    <div className="bg-white p-12 text-center rounded border"><p>No hay cotizaciones pendientes</p></div>
                ) : (
                    pendingQuotes.map(quote => (
                        <div key={quote.idCotizacion} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                            <div className="flex justify-between mb-4">
                                <div>
                                    <h3 className="text-lg font-bold">Cotización #{quote.idCotizacion}</h3>
                                    <div className="flex gap-4 text-sm text-gray-500 mt-1">
                                        <span className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {quote.fecha}</span>
                                        <span className="flex items-center gap-1"><DollarSign className="w-4 h-4"/> Total: ${quote.total.toLocaleString()}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => onConfirmSale(quote.idCotizacion)}
                                    className="flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                                >
                                    <CheckCircle className="w-4 h-4" /> Confirmar Venta
                                </button>
                            </div>

                            <div className="border-t pt-4">
                                <h4 className="text-sm font-semibold mb-2">Detalles:</h4>
                                {quote.detalles.map((detalle, idx) => (
                                    <div key={idx} className="flex justify-between text-sm py-1 border-b last:border-0">
                                        <div>
                                            <span className="font-medium">{detalle.nombreMueble}</span>
                                            <span className="text-gray-500 ml-2">({detalle.nombreVariante})</span>
                                        </div>
                                        <div className="flex gap-4">
                                            <span>x{detalle.cantidad}</span>
                                            <span>${detalle.subtotal.toLocaleString()}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {confirmedQuotes.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-xl mb-4">Historial de Ventas Confirmadas</h2>
                    <div className="bg-white rounded border overflow-hidden">
                        <table className="w-full text-sm">
                            <thead className="bg-gray-50 border-b">
                            <tr>
                                <th className="px-6 py-3 text-left">ID</th>
                                <th className="px-6 py-3 text-left">Fecha</th>
                                <th className="px-6 py-3 text-left">Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {confirmedQuotes.map(q => (
                                <tr key={q.idCotizacion} className="border-b last:border-0">
                                    <td className="px-6 py-3">#{q.idCotizacion}</td>
                                    <td className="px-6 py-3">{q.fecha}</td>
                                    <td className="px-6 py-3">${q.total.toLocaleString()}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}