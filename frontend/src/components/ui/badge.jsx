/**
 * badge.jsx - Componente de insignia o etiqueta
 *
 * ¿Qué hace?
 * - Crea pequeñas etiquetas visuales para resaltar información
 * - Proporciona múltiples variantes de color y estilo
 *
 * ¿Para qué sirve?
 * - Mostrar estados (activo, urgente, completado)
 * - Etiquetar categorías o tipos (tipo de sangre, prioridad)
 * - Indicadores visuales compactos
 * - Notificaciones numéricas
 *
 * Variantes disponibles:
 * - default: Badge estándar con color primary
 * - secondary: Variante con color secundario
 * - destructive: Para estados de error o peligro
 * - outline: Solo borde, sin fondo
 *
 * Ejemplo de uso:
 * <Badge variant="destructive">Urgente</Badge>
 * <Badge>O+</Badge>
 */

import * as React from "react";
import { cva } from "class-variance-authority";
import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

// Define las variantes de estilo del badge
const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

Badge.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf(["default", "secondary", "destructive", "outline"]),
  children: PropTypes.node,
};

export { Badge, badgeVariants };
