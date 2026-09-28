/**
 * Tarjeta de un producto del catálogo: imagen, nombre, descripción,
 * precio normal, precio oferta y botón para agregar al carrito.
 */
function TarjetaProducto({ producto, cantidadEnCarrito, onAgregar }) {
    // Estado local: feedback visual breve tras hacer clic en "Agregar"
    const [recienAgregado, setRecienAgregado] = React.useState(false);

    const tieneOferta = producto.precioOferta < producto.precio;

    function manejarClickAgregar() {
        onAgregar(producto);
        setRecienAgregado(true);
        setTimeout(() => setRecienAgregado(false), 800);
    }

    return (
        <div className="col">
            <div className="card tarjeta-producto shadow-sm">
                <div className="position-relative">
                    <img src={producto.imagen} className="card-img-top" alt={`Portada de ${producto.nombre}`} />
                    {/* Renderizado condicional: la insignia solo aparece si hay descuento */}
                    {tieneOferta && (
                        <span className="badge bg-danger position-absolute top-0 end-0 m-2 fs-6">
                            -{calcularDescuento(producto.precio, producto.precioOferta)}%
                        </span>
                    )}
                </div>

                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{producto.nombre}</h5>
                    <p className="card-subtitle mb-2 text-muted small">{producto.autor}</p>
                    <p className="card-text">{producto.descripcion}</p>

                    <div className="mt-auto">
                        {tieneOferta ? (
                            <p className="mb-2">
                                <span className="precio-normal text-muted text-decoration-line-through me-2">
                                    {formateadorPrecio.format(producto.precio)}
                                </span>
                                <span className="precio">{formateadorPrecio.format(producto.precioOferta)}</span>
                            </p>
                        ) : (
                            <p className="precio mb-2">{formateadorPrecio.format(producto.precio)}</p>
                        )}

                        <button
                            type="button"
                            className={`btn w-100 ${recienAgregado ? "btn-success" : "btn-primary"}`}
                            onClick={manejarClickAgregar}
                        >
                            {recienAgregado ? "¡Agregado!" : "Agregar al carrito"}
                        </button>

                        {cantidadEnCarrito > 0 && (
                            <p className="text-success small text-center mt-2 mb-0">
                                {cantidadEnCarrito} en tu carrito
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
