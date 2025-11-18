/**
 * textarea.jsx - Componente de área de texto multilínea
 *
 * ¿Qué hace?
 * - Proporciona un campo de texto de múltiples líneas estilizado
 * - Mantiene consistencia con el resto de inputs del sistema
 *
 * ¿Para qué sirve?
 * - Comentarios, descripciones, notas largas
 * - Cualquier input que requiera más de una línea
 * - Formularios con campos de texto extenso
 *
 * Características:
 * - Altura mínima de 80px (ajustable)
 * - Redimensionable por el usuario
 * - Estilos de focus para accesibilidad
 * - Soporte para placeholder y estados disabled
 */

import * as React from "react";

import { cn } from "@/lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
