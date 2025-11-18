/**
 * card.jsx - Componente de tarjeta reutilizable
 *
 * ¿Qué hace?
 * - Proporciona componentes para crear tarjetas (cards) con estructura consistente
 * - Incluye secciones predefinidas: header, title, description, content, footer
 *
 * ¿Para qué sirve?
 * - Contenedor visual para agrupar información relacionada
 * - Estructura consistente en toda la aplicación
 * - Ideal para dashboards, perfiles, formularios, listas
 *
 * Componentes incluidos:
 * - Card: Contenedor principal con borde y sombra
 * - CardHeader: Sección superior (para título y descripción)
 * - CardTitle: Título de la tarjeta (h3)
 * - CardDescription: Descripción o subtítulo
 * - CardContent: Contenido principal de la tarjeta
 * - CardFooter: Sección inferior (para botones o acciones)
 */

import * as React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

const Card = React.forwardRef(function Card({ className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  );
});
Card.displayName = "Card";

const CardHeader = React.forwardRef(function CardHeader(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
});
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(function CardTitle(
  { className, ...props },
  ref
) {
  return (
    <h3
      ref={ref}
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
});
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(function CardDescription(
  { className, ...props },
  ref
) {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
});
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(function CardContent(
  { className, ...props },
  ref
) {
  return <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />;
});
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(function CardFooter(
  { className, ...props },
  ref
) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  );
});
CardFooter.displayName = "CardFooter";

// PropTypes
const commonPropTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Card.propTypes = commonPropTypes;
CardHeader.propTypes = commonPropTypes;
CardTitle.propTypes = commonPropTypes;
CardDescription.propTypes = commonPropTypes;
CardContent.propTypes = commonPropTypes;
CardFooter.propTypes = commonPropTypes;

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
};
