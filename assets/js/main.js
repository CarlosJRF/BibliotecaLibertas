/**
 * Biblioteca Libertas - Lógica de la tienda (catálogo + carrito)
 */

// Formateador de precios en pesos chilenos
const formateadorPrecio = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0,
});

// Estado en memoria de la aplicación
let catalogoProductos = []; // productos cargados desde el JSON
let carrito = []; // items agregados al carrito: { id, nombre, precio, cantidad }

// Referencias a elementos del DOM usados en varias funciones
const contenedorProductos = document.getElementById("contenedor-productos");
const mensajeEstado = document.getElementById("mensaje-estado");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarritoEl = document.getElementById("total-carrito");
const contadorCarritoEl = document.getElementById("contador-carrito");
const formBusqueda = document.getElementById("form-busqueda");
const inputBusqueda = document.getElementById("input-busqueda");
const btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");

/**
 * Carga el catálogo de productos desde un archivo JSON local usando Fetch API.
 * Muestra un mensaje amigable si la carga falla.
 */
function cargarProductos() {
    fetch("assets/data/productos.json")
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error("Respuesta de red no válida");
            }
            return respuesta.json();
        })
        .then((productos) => {
            catalogoProductos = productos;
            mensajeEstado.classList.add("d-none");
            renderizarProductos(catalogoProductos);
        })
        .catch((error) => {
            console.error("Error al cargar el catálogo:", error);
            mensajeEstado.classList.remove("d-none", "text-muted");
            mensajeEstado.classList.add("text-danger");
            mensajeEstado.textContent =
                "No se pudo cargar el catálogo de libros en este momento. Por favor, inténtalo más tarde.";
        });
}

/**
 * Genera y muestra las tarjetas de producto en el DOM a partir de una lista.
 */
function renderizarProductos(productos) {
    contenedorProductos.innerHTML = "";

    if (productos.length === 0) {
        mensajeEstado.classList.remove("d-none", "text-danger");
        mensajeEstado.classList.add("text-muted");
        mensajeEstado.textContent = "No se encontraron libros que coincidan con tu búsqueda.";
        return;
    }

    mensajeEstado.classList.add("d-none");

    productos.forEach((producto) => {
        contenedorProductos.appendChild(crearTarjetaProducto(producto));
    });
}

/**
 * Crea el elemento de tarjeta Bootstrap para un producto individual.
 */
function crearTarjetaProducto(producto) {
    const columna = document.createElement("div");
    columna.className = "col";

    columna.innerHTML = `
        <div class="card tarjeta-producto shadow-sm">
            <img src="${producto.imagen}" class="card-img-top" alt="Portada del libro ${producto.nombre}">
            <div class="card-body d-flex flex-column">
                <span class="badge bg-secondary align-self-start mb-2">${producto.categoria}</span>
                <h3 class="h5 card-title">${producto.nombre}</h3>
                <p class="card-text text-muted small">${producto.autor}</p>
                <p class="card-text">${producto.descripcion}</p>
                <div class="mt-auto d-flex justify-content-between align-items-center">
                    <span class="precio">${formateadorPrecio.format(producto.precio)}</span>
                    <button type="button" class="btn btn-warning btn-agregar" data-id="${producto.id}">
                        Agregar al carrito
                    </button>
                </div>
            </div>
        </div>
    `;

    return columna;
}

/**
 * Busca un producto del catálogo por su id.
 */
function buscarProductoPorId(id) {
    return catalogoProductos.find((producto) => producto.id === id);
}

/**
 * Agrega un producto al carrito (o incrementa su cantidad si ya estaba).
 */
function agregarAlCarrito(idProducto) {
    const producto = buscarProductoPorId(idProducto);
    if (!producto) return;

    const itemExistente = carrito.find((item) => item.id === idProducto);
    if (itemExistente) {
        itemExistente.cantidad += 1;
    } else {
        carrito.push({
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: 1,
        });
    }

    actualizarVistaCarrito();
}

/**
 * Elimina por completo un producto del carrito.
 */
function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter((item) => item.id !== idProducto);
    actualizarVistaCarrito();
}

/**
 * Vacía completamente el carrito.
 */
function vaciarCarrito() {
    carrito = [];
    actualizarVistaCarrito();
}

/**
 * Redibuja el resumen del carrito (lista, total y contador) en el DOM.
 */
function actualizarVistaCarrito() {
    listaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<li class="list-group-item text-muted">El carrito está vacío.</li>';
    } else {
        carrito.forEach((item) => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center";
            li.innerHTML = `
                <span>${item.nombre} <span class="text-muted">x${item.cantidad}</span></span>
                <span class="d-flex align-items-center gap-2">
                    ${formateadorPrecio.format(item.precio * item.cantidad)}
                    <button type="button" class="btn-close btn-eliminar-item" data-id="${item.id}" aria-label="Quitar del carrito"></button>
                </span>
            `;
            listaCarrito.appendChild(li);
        });
    }

    const total = carrito.reduce((acumulado, item) => acumulado + item.precio * item.cantidad, 0);
    const cantidadTotal = carrito.reduce((acumulado, item) => acumulado + item.cantidad, 0);

    totalCarritoEl.textContent = formateadorPrecio.format(total);
    contadorCarritoEl.textContent = cantidadTotal;
}

/**
 * Filtra el catálogo según el texto ingresado en la barra de búsqueda
 * y vuelve a renderizar los resultados.
 */
function procesarBusqueda(texto) {
    const termino = texto.trim().toLowerCase();

    const resultados = termino === ""
        ? catalogoProductos
        : catalogoProductos.filter((producto) =>
            producto.nombre.toLowerCase().includes(termino) ||
            producto.autor.toLowerCase().includes(termino)
        );

    renderizarProductos(resultados);
}

// ===== Eventos =====

// click: delegado en el contenedor de productos para "Agregar al carrito"
contenedorProductos.addEventListener("click", (evento) => {
    const boton = evento.target.closest(".btn-agregar");
    if (!boton) return;

    agregarAlCarrito(Number(boton.dataset.id));

    boton.classList.add("agregado");
    boton.textContent = "¡Agregado!";
    setTimeout(() => {
        boton.classList.remove("agregado");
        boton.textContent = "Agregar al carrito";
    }, 800);
});

// click: delegado en la lista del carrito para quitar un item
listaCarrito.addEventListener("click", (evento) => {
    const boton = evento.target.closest(".btn-eliminar-item");
    if (!boton) return;

    eliminarDelCarrito(Number(boton.dataset.id));
});

// click: vaciar carrito por completo
btnVaciarCarrito.addEventListener("click", vaciarCarrito);

// submit: procesa el formulario de búsqueda sin recargar la página
formBusqueda.addEventListener("submit", (evento) => {
    evento.preventDefault();
    procesarBusqueda(inputBusqueda.value);
});

// Punto de entrada: al cargar el DOM, se obtiene el catálogo de productos
document.addEventListener("DOMContentLoaded", cargarProductos);
