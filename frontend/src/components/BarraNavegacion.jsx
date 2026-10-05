import { useState } from "react";
import logo from "../assets/imagenes/BookStoreLogo.svg";

/**
 * Barra de navegación con buscador y botón del carrito con contador de productos.
 *
 * Props:
 * - cantidadCarrito: número total de unidades en el carrito (insignia)
 * - onBuscar(texto): aplica el texto de búsqueda al catálogo
 */
export default function BarraNavegacion({ cantidadCarrito, onBuscar }) {
    // Estado controlado del campo de búsqueda
    const [textoBusqueda, setTextoBusqueda] = useState("");

    function manejarSubmit(evento) {
        evento.preventDefault();
        onBuscar(textoBusqueda);
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
            <div className="container-fluid">
                <a className="navbar-brand d-flex align-items-center gap-2" href="#inicio">
                    <img src={logo} alt="Logotipo de Biblioteca Libertas" width="48" height="24" />
                    Biblioteca Libertas
                </a>

                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarPrincipal"
                    aria-controls="navbarPrincipal" aria-expanded="false" aria-label="Abrir menú de navegación">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarPrincipal">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" href="#inicio">Inicio</a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="categoriasDropdown" role="button"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                Categorías
                            </a>
                            <ul className="dropdown-menu dropdown-menu-dark" aria-labelledby="categoriasDropdown">
                                <li><a className="dropdown-item" href="#">Ficción y Fantasía</a></li>
                                <li><a className="dropdown-item" href="#">Ciencia y Tecnología</a></li>
                                <li><a className="dropdown-item" href="#">Desarrollo Personal</a></li>
                                <li><a className="dropdown-item" href="#">Historia</a></li>
                            </ul>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#catalogo">Catálogo</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#contacto">Contacto</a>
                        </li>
                    </ul>

                    <form className="d-flex me-2" role="search" onSubmit={manejarSubmit}>
                        <input
                            className="form-control me-2"
                            type="search"
                            placeholder="Buscar un libro..."
                            aria-label="Buscar"
                            value={textoBusqueda}
                            onChange={(evento) => setTextoBusqueda(evento.target.value)}
                        />
                        <button className="btn btn-outline-light" type="submit">Buscar</button>
                    </form>

                    <button className="btn btn-warning position-relative" type="button"
                        data-bs-toggle="offcanvas" data-bs-target="#offcanvasCarrito" aria-controls="offcanvasCarrito">
                        🛒 Carrito
                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                            {cantidadCarrito}
                        </span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
