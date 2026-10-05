import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuración de Vite con el plugin oficial de React (JSX + Fast Refresh)
export default defineConfig({
    plugins: [react()],
    // Rutas relativas: la app funciona tanto en local como en GitHub Pages (/BibliotecaLibertas/)
    base: "./",
    server: {
        port: 5173,
    },
});
