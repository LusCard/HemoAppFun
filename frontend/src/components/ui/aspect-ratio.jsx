/**
 * aspect-ratio.jsx - Componente para mantener proporción de aspecto
 *
 * ¿Qué hace?
 * - Mantiene una relación de aspecto específica para contenido responsivo
 * - Evita saltos de diseño al cargar imágenes o videos
 *
 * ¿Para qué sirve?
 * - Imágenes responsivas que mantienen su proporción
 * - Videos embebidos (16:9, 4:3, etc.)
 * - Contenido que debe mantener una relación específica alto/ancho
 *
 * Basado en Radix UI para funcionalidad robusta
 *
 * Ejemplo de uso:
 * <AspectRatio ratio={16 / 9}>
 *   <img src="..." alt="..." />
 * </AspectRatio>
 */

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio";

const AspectRatio = AspectRatioPrimitive.Root;

export { AspectRatio };
