/**
 * NotFound.jsx - Página de error 404
 *
 * ¿Qué hace?
 * - Se muestra cuando el usuario navega a una ruta que no existe
 * - Proporciona un mensaje de error amigable
 * - Ofrece un enlace para volver al inicio
 *
 * ¿Para qué sirve?
 * - Manejar rutas inválidas o URLs incorrectas
 * - Mejorar la experiencia del usuario al encontrar errores
 * - Evitar pantallas en blanco o errores confusos
 *
 * Características:
 * - Diseño simple y claro
 * - Código de error 404 visible
 * - Botón para regresar a la página principal
 */

import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Página no encontrada
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-primary text-primary-foreground px-4 py-2 rounded-md"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
