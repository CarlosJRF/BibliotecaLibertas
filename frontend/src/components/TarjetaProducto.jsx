import { formateadorPrecio, calcularDescuento, obtenerImagen } from "./utilidades.jsx";

/**
 * Tarjeta de un producto del catálogo: imagen, nombre, descripción,
 * precio normal, precio oferta y botón para agregar al carrito.
 *
 * Props:
 * - producto: { id, nombre, autor, precio, precioOferta, descripcion, imagen }
 * - enCarrito: true si el producto ya está en el carrito
 * - onAgregar(producto): agrega el producto al carrito
 */
export default function TarjetaProducto({ producto, enCarrito, onAgregar }) {
    const tieneOferta = producto.precioOferta < producto.precio;

    return (
        <div className="col">
            <div className="card tarjeta-producto h-100 shadow-sm">
                <div className="position-relative">
                    <img src={obtenerImagen(producto.imagen)} className="card-img-top" alt={`Portada de ${producto.nombre}`} />
                    {/* La insignia solo aparece si hay descuento */}
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
                                <span className="small text-muted text-decoration-line-through me-2">
                                    {formateadorPrecio.format(producto.precio)}
                                </span>
                                <span className="precio">{formateadorPrecio.format(producto.precioOferta)}</span>
                            </p>
                        ) : (
                            <p className="precio mb-2">{formateadorPrecio.format(producto.precio)}</p>
                        )}

                        {/* Si ya está en el carrito, el botón se desactiva para evitar duplicados */}
                        <button
                            type="button"
                            className={`btn w-100 ${enCarrito ? "btn-success" : "btn-primary"}`}
                            onClick={() => onAgregar(producto)}
                            disabled={enCarrito}
                        >
                            {enCarrito ? "En el carrito" : "Agregar al carrito"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
