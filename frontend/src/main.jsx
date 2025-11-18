/**
 * main.jsx - Punto de entrada de la aplicación React
 *
 * ¿Qué hace?
 * - Inicializa la aplicación React en el DOM
 * - Monta el componente principal App en el elemento con id "root"
 * - Importa los estilos globales de la aplicación
 * - Carga los estilos de Leaflet para el mapa interactivo
 *
 * ¿Para qué sirve?
 * - Es el archivo que se ejecuta primero al cargar la aplicación
 * - Conecta React con el HTML estático del navegador
 */

import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // Estilos globales con Tailwind CSS
import "leaflet/dist/leaflet.css"; // Estilos para el componente de mapas

// Crea la raíz de React y renderiza la aplicación
createRoot(document.getElementById("root")).render(<App />);
