/**
 * progress.jsx - Componente de barra de progreso
 *
 * ¿Qué hace?
 * - Muestra una barra de progreso visual que indica el porcentaje de completitud
 * - Anima suavemente los cambios en el valor
 *
 * ¿Para qué sirve?
 * - Indicar progreso de carga o procesamiento
 * - Mostrar niveles o porcentajes (ej: completitud de perfil)
 * - Visualizar métricas (ej: progreso hacia un objetivo de donaciones)
 *
 * Props:
 * - value: Número entre 0 y 100 que representa el porcentaje
 * - className: Clases CSS adicionales
 *
 * Características:
 * - Animación suave al cambiar el valor
 * - Basado en Radix UI para accesibilidad
 * - Color primario por defecto (personalizable con clases)
 *
 * Ejemplo de uso:
 * <Progress value={75} /> // Muestra 75% de progreso
 */

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import PropTypes from "prop-types";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef(function Progress(
  { className, value, ...props },
  ref
) {
  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-primary transition-all"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  );
});

Progress.propTypes = {
  className: PropTypes.string,
  value: PropTypes.number,
};

Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
