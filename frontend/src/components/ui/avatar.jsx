/**
 * avatar.jsx - Componente de avatar/foto de perfil
 *
 * ¿Qué hace?
 * - Muestra la imagen de perfil del usuario con un diseño circular
 * - Proporciona un fallback (respaldo) cuando no hay imagen
 *
 * ¿Para qué sirve?
 * - Mostrar fotos de perfil de usuarios
 * - Representación visual de usuarios en la interfaz
 * - Fallback con iniciales cuando no hay foto
 *
 * Componentes:
 * - Avatar: Contenedor circular principal (40x40px por defecto)
 * - AvatarImage: Imagen real del usuario
 * - AvatarFallback: Contenido que se muestra si la imagen no carga (ej: iniciales)
 *
 * Características:
 * - Basado en Radix UI para carga progresiva
 * - Automáticamente muestra el fallback si la imagen falla
 * - Tamaño y forma personalizables
 */

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@/lib/utils";

const Avatar = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    )}
    {...props}
  />
));
Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarImage, AvatarFallback };
