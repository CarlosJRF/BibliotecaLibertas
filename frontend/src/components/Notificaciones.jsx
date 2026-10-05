import { useEffect } from "react";

// Tiempo que cada aviso permanece visible antes de cerrarse solo
const DURACION_MS = 3000;

// Estilo de la cabecera según el tipo de aviso
const ESTILOS = {
    exito: { clase: "text-bg-success", icono: "✔" },
    info: { clase: "text-bg-secondary", icono: "🗑" },
};

/**
 * Un aviso individual (Toast de Bootstrap) que se cierra solo tras DURACION_MS.
 *
 * Props:
 * - notificacion: { id, titulo, mensaje, tipo: "exito" | "info" }
 * - onCerrar(id): quita el aviso de la lista
 */
function Toast({ notificacion, onCerrar }) {
    const { id, titulo, mensaje, tipo } = notificacion;
    const estilo = ESTILOS[tipo] ?? ESTILOS.info;

    useEffect(() => {
        const temporizador = setTimeout(() => onCerrar(id), DURACION_MS);
        return () => clearTimeout(temporizador);
    }, [id, onCerrar]);

    return (
        <div className="toast show" role="status" aria-atomic="true">
            <div className={`toast-header ${estilo.clase}`}>
                <span className="me-2" aria-hidden="true">{estilo.icono}</span>
                <strong className="me-auto">{titulo}</strong>
                <button
                    type="button"
                    className="btn-close btn-close-white"
                    aria-label="Cerrar aviso"
                    onClick={() => onCerrar(id)}
                ></button>
            </div>
            <div className="toast-body">{mensaje}</div>
        </div>
    );
}

/**
 * Contenedor de avisos fijo en la esquina inferior derecha de la pantalla.
 *
 * Props:
 * - notificaciones: lista de avisos activos (el más reciente al final)
 * - onCerrar(id): quita un aviso de la lista
 */
export default function Notificaciones({ notificaciones, onCerrar }) {
    return (
        <div className="toast-container position-fixed bottom-0 end-0 p-3" aria-live="polite">
            {notificaciones.map((notificacion) => (
                <Toast key={notificacion.id} notificacion={notificacion} onCerrar={onCerrar} />
            ))}
        </div>
    );
}
