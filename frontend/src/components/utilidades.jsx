/**
 * Biblioteca Libertas - Utilidades compartidas por los componentes React
 */

// Formateador de precios en pesos chilenos
export const formateadorPrecio = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
});

/**
 * Devuelve el porcentaje de descuento (entero) entre el precio normal y el de oferta.
 */
export function calcularDescuento(precio, precioOferta) {
    return Math.round(((precio - precioOferta) / precio) * 100);
}

// Vite resuelve en tiempo de build la URL final de cada imagen de la carpeta
const imagenes = import.meta.glob("../assets/imagenes/*.svg", {
    eager: true,
    import: "default",
});

/**
 * Convierte el nombre de archivo que entrega la API (ej. "Dune.svg")
 * en la URL servida por Vite.
 */
export function obtenerImagen(nombreArchivo) {
    return imagenes[`../assets/imagenes/${nombreArchivo}`];
}
