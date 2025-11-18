/**
 * label.jsx - Componente de etiqueta para formularios
 *
 * ¿Qué hace?
 * - Proporciona etiquetas (labels) estilizadas para campos de formulario
 * - Mejora la accesibilidad asociando texto con inputs
 *
 * ¿Para qué sirve?
 * - Identificar campos de formulario
 * - Mejorar la accesibilidad (lectores de pantalla)
 * - Permitir clic en el label para enfocar el input asociado
 *
 * Características:
 * - Basado en Radix UI para accesibilidad completa
 * - Cursor de puntero cuando el input está habilitado
 * - Se deshabilita visualmente si el input asociado está disabled
 */

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
