/**
 * Biblioteca Libertas - Utilidades compartidas por los componentes React
 */

// Formateador de precios en pesos chilenos
const formateadorPrecio = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
});

/**
 * Devuelve el porcentaje de descuento (entero) entre el precio normal y el de oferta.
 */
function calcularDescuento(precio, precioOferta) {
    return Math.round(((precio - precioOferta) / precio) * 100);
}
