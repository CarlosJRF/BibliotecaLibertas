import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Configuración de Vite con el plugin oficial de React (JSX + Fast Refresh)
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
    },
});
