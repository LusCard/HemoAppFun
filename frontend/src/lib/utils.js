/**
 * utils.js - Funciones utilitarias de la aplicación
 *
 * ¿Qué hace?
 * - Proporciona función cn() para combinar clases CSS de forma inteligente
 *
 * ¿Para qué sirve?
 * - Evita conflictos de clases de Tailwind CSS
 * - Permite clases condicionales de manera limpia
 * - Fusiona correctamente clases duplicadas
 *
 * Ejemplo de uso:
 * cn("px-4 py-2", condition && "bg-blue-500", "text-white")
 * → Combina todas las clases válidas sin duplicados
 */

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * cn - Combina y fusiona clases CSS
 *
 * ¿Cómo funciona?
 * 1. clsx: Combina clases condicionales y arrays
 * 2. twMerge: Resuelve conflictos de clases de Tailwind
 *
 * Retorna: String con las clases CSS optimizadas
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
