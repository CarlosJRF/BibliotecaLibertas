/**
 * Listado del catálogo. Muestra un mensaje distinto según el estado de carga
 * (cargando, error, sin resultados) o la grilla de tarjetas de producto.
 */
function ListaProductos({ productos, cargando, error, carrito, onAgregar }) {
    if (cargando) {
        return <div className="text-center text-muted my-4">Cargando productos...</div>;
    }

    if (error) {
        return (
            <div className="text-center text-danger my-4">
                No se pudo cargar el catálogo de libros en este momento. Por favor, inténtalo más tarde.
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
            {productos.map((producto) => {
                const item = carrito.find((i) => i.id === producto.id);
                return (
                    <TarjetaProducto
                        key={producto.id}
                        producto={producto}
                        cantidadEnCarrito={item ? item.cantidad : 0}
                        onAgregar={onAgregar}
                    />
                );
            })}
        </div>
    );
}
