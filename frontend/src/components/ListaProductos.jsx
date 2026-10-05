import TarjetaProducto from "./TarjetaProducto.jsx";

/**
 * Listado del catálogo. Según el estado muestra un spinner de carga,
 * un mensaje de error con botón "Reintentar", un aviso de "sin resultados"
 * o la grilla de tarjetas de producto.
 *
 * Props:
 * - productos: productos a mostrar (ya filtrados por la búsqueda)
 * - loading: true mientras se consulta la API
 * - error: mensaje de error o null
 * - carrito: items del carrito, para saber qué productos ya están agregados
 * - onAgregar(producto): agrega un producto al carrito
 * - onReintentar(): vuelve a consultar la API
 */
export default function ListaProductos({ productos, loading, error, carrito, onAgregar, onReintentar }) {
    if (loading) {
        return (
            <div className="d-flex flex-column align-items-center text-muted my-5">
                <div className="spinner-border text-primary mb-3" role="status" aria-hidden="true"></div>
                <span>Cargando productos...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="alert alert-danger d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3" role="alert">
                <span>{error}</span>
                <button type="button" className="btn btn-outline-danger" onClick={onReintentar}>
                    Reintentar
                </button>
            </div>
        );
    }

    if (productos.length === 0) {
        return (
            <div className="text-center text-muted my-4">
                No se encontraron libros que coincidan con tu búsqueda.
            </div>
        );
    }

    return (
        <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
            {productos.map((producto) => (
                <TarjetaProducto
                    key={producto.id}
                    producto={producto}
                    enCarrito={carrito.some((item) => item.id === producto.id)}
                    onAgregar={onAgregar}
                />
            ))}
        </div>
    );
}
