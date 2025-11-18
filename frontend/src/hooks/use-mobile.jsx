/**
 * use-mobile.jsx - Hook personalizado para detectar dispositivos móviles
 *
 * ¿Qué hace?
 * - Detecta si el usuario está en un dispositivo móvil basándose en el ancho de pantalla
 * - Se actualiza automáticamente cuando cambia el tamaño de la ventana
 *
 * ¿Para qué sirve?
 * - Renderizado condicional según el tipo de dispositivo
 * - Adaptar la UI para móviles vs desktop
 * - Mostrar/ocultar elementos según el tamaño de pantalla
 *
 * ¿Cómo funciona?
 * - Define un breakpoint de 768px (estándar móvil/tablet)
 * - Escucha cambios en el tamaño de ventana con matchMedia
 * - Retorna true si es móvil, false si es desktop
 *
 * Ejemplo de uso:
 * const isMobile = useIsMobile();
 * {isMobile ? <MobileMenu /> : <DesktopMenu />}
 */

import * as React from "react";

const MOBILE_BREAKPOINT = 768; // Ancho máximo para considerar móvil

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState(undefined);

  React.useEffect(() => {
    // Crea un media query listener para detectar cambios de tamaño
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    // Función que actualiza el estado cuando cambia el tamaño
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    // Registra el listener para cambios
    mql.addEventListener("change", onChange);

    // Establece el valor inicial
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

    // Limpia el listener al desmontar
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile; // Convierte a booleano
}
