import { useState, useEffect } from "react";
import BarraNavegacion from "./components/BarraNavegacion.jsx";
import Carrito from "./components/Carrito.jsx";
import ListaProductos from "./components/ListaProductos.jsx";

const URL_API_PRODUCTOS = "http://localhost:3000/api/productos";
const CLAVE_CARRITO = "bibliotecaLibertas.carrito";

/**
 * Componente raíz: mantiene el estado del catálogo, la búsqueda y el carrito,
 * y lo reparte a los componentes hijos mediante props. No recibe props.
 */
export default function App() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState("");
    // Items del carrito: { id, nombre, precio, cantidad }
    const [carrito, setCarrito] = useState([]);
    // Evita guardar el carrito vacío inicial antes de haber leído localStorage
    const [carritoRestaurado, setCarritoRestaurado] = useState(false);

    // ===== Catálogo (API) =====

    function cargarProductos() {
        setLoading(true);
        setError(null);

        fetch(URL_API_PRODUCTOS)
            .then((respuesta) => {
                if (!respuesta.ok) {
                    throw new Error(`Respuesta HTTP ${respuesta.status}`);
                }
                return respuesta.json();
            })
            .then((datos) => setProductos(datos))
            .catch((err) => {
                console.error("Error al cargar el catálogo:", err);
                setError("No pudimos cargar el catálogo de libros. Revisa tu conexión e inténtalo de nuevo.");
            })
            .finally(() => setLoading(false));
    }

    // Consulta el catálogo una sola vez, al montar
    useEffect(() => {
        cargarProductos();
    }, []);

    // ===== Persistencia del carrito =====

    // Al montar: recupera el carrito guardado (si existe)
    useEffect(() => {
        try {
            const guardado = localStorage.getItem(CLAVE_CARRITO);
            if (guardado) {
                setCarrito(JSON.parse(guardado));
            }
        } catch (err) {
            console.error("No se pudo leer el carrito guardado:", err);
        }
        setCarritoRestaurado(true);
    }, []);

    // Cada vez que cambia el carrito: lo guarda para sobrevivir a recargas
    useEffect(() => {
        if (!carritoRestaurado) return;
        try {
            localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
        } catch (err) {
            console.error("No se pudo guardar el carrito:", err);
        }
    }, [carrito, carritoRestaurado]);

    // ===== Acciones del carrito =====

    // Suma una unidad; si el producto no estaba, lo agrega con el precio de oferta
    function agregarAlCarrito(producto) {
        setCarrito((actual) => {
            const existente = actual.find((item) => item.id === producto.id);
            if (existente) {
                return actual.map((item) =>
                    item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
                );
            }
            return [
                ...actual,
                {
                    id: producto.id,
                    nombre: producto.nombre,
                    precio: producto.precioOferta ?? producto.precio,
                    cantidad: 1,
                },
            ];
        });
    }

    // Resta una unidad; si llega a cero, el producto sale del carrito
    function restarDelCarrito(id) {
        setCarrito((actual) =>
            actual
                .map((item) => (item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item))
                .filter((item) => item.cantidad > 0)
        );
    }

    function eliminarDelCarrito(id) {
        setCarrito((actual) => actual.filter((item) => item.id !== id));
    }

    function vaciarCarrito() {
        setCarrito([]);
    }

    // ===== Valores derivados =====

    const cantidadTotal = carrito.reduce((acumulado, item) => acumulado + item.cantidad, 0);
    const total = carrito.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0);

    const termino = busqueda.trim().toLowerCase();
    const productosFiltrados = termino === ""
        ? productos
        : productos.filter((producto) =>
            producto.nombre.toLowerCase().includes(termino) ||
            producto.autor.toLowerCase().includes(termino)
        );

    return (
        <>
            <BarraNavegacion cantidadCarrito={cantidadTotal} onBuscar={setBusqueda} />

            <Carrito
                carrito={carrito}
                total={total}
                onAgregar={agregarAlCarrito}
                onRestar={restarDelCarrito}
                onEliminar={eliminarDelCarrito}
                onVaciar={vaciarCarrito}
            />

            <header id="inicio" className="bg-secondary bg-opacity-25 text-center py-5">
                <div className="container">
                    <h1 className="display-5 fw-bold">Bienvenidos a tu librería virtual de confianza</h1>
                    <p className="lead">Descubre nuevos mundos, aprende y comparte tu pasión por la lectura.</p>
                </div>
            </header>

            <main className="container my-5" id="catalogo">
                <h2 className="mb-4">Catálogo Literario</h2>
                <ListaProductos
                    productos={productosFiltrados}
                    loading={loading}
                    error={error}
                    carrito={carrito}
                    onAgregar={agregarAlCarrito}
                    onReintentar={cargarProductos}
                />
            </main>
        </>
    );
}
