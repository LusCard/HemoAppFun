/**
 * input.jsx - Componente de campo de entrada de texto
 *
 * ¿Qué hace?
 * - Proporciona un input estilizado consistente con el sistema de diseño
 * - Incluye estados visuales para focus, disabled, y error
 *
 * ¿Para qué sirve?
 * - Campos de texto en formularios (email, password, nombre, etc.)
 * - Mantiene un estilo uniforme en toda la aplicación
 * - Soporta todos los tipos HTML de input (text, email, password, number, etc.)
 *
 * Características:
 * - Ring de focus visible para accesibilidad
 * - Estilos para archivos (file input)
 * - Placeholder con color muted
 */

import * as React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(function Input(
  { className, type, ...props },
  ref
) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});

Input.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
};

Input.displayName = "Input";

export { Input };
