/**
 * Una línea del carrito con controles para sumar, restar o quitar el producto.
 */
function ItemCarrito({ item, onAgregar, onRestar, onEliminar }) {
    return (
        <li className="list-group-item">
            <div className="d-flex justify-content-between align-items-start gap-2">
                <div>
                    <div className="fw-semibold">{item.nombre}</div>
                    <div className="small text-muted">{formateadorPrecio.format(item.precio)} c/u</div>
                </div>
                <button
                    type="button"
                    className="btn-close"
                    aria-label={`Quitar ${item.nombre} del carrito`}
                    onClick={() => onEliminar(item.id)}
                ></button>
            </div>

            <div className="d-flex justify-content-between align-items-center mt-2">
                <div className="btn-group btn-group-sm" role="group" aria-label="Cantidad">
                    <button type="button" className="btn btn-outline-secondary" onClick={() => onRestar(item.id)}>
                        −
                    </button>
                    <span className="btn btn-outline-secondary disabled">{item.cantidad}</span>
                    <button type="button" className="btn btn-outline-secondary" onClick={() => onAgregar(item)}>
                        +
                    </button>
                </div>
                <strong>{formateadorPrecio.format(item.precio * item.cantidad)}</strong>
            </div>
        </li>
    );
}

/**
 * Panel lateral (offcanvas de Bootstrap) con el contenido del carrito y su total.
 */
function Carrito({ carrito, total, onAgregar, onRestar, onEliminar, onVaciar }) {
    const estaVacio = carrito.length === 0;

    return (
        <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasCarrito" aria-labelledby="offcanvasCarritoLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasCarritoLabel">Tu carrito</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Cerrar"></button>
            </div>

            <div className="offcanvas-body d-flex flex-column">
                {estaVacio ? (
                    <p className="text-muted">El carrito está vacío.</p>
                ) : (
                    <ul className="list-group mb-3">
                        {carrito.map((item) => (
                            <ItemCarrito
                                key={item.id}
                                item={item}
                                onAgregar={onAgregar}
                                onRestar={onRestar}
                                onEliminar={onEliminar}
                            />
                        ))}
                    </ul>
                )}

                <div className="mt-auto">
                    <p className="fs-5">Total: <strong>{formateadorPrecio.format(total)}</strong></p>
                    <button
                        type="button"
                        className="btn btn-outline-danger w-100"
                        onClick={onVaciar}
                        disabled={estaVacio}
                    >
                        Vaciar carrito
                    </button>
                </div>
            </div>
        </div>
    );
}
