/**
 * use-toast.js - Re-exporta el hook de toast desde hooks
 *
 * ¿Para qué sirve?
 * - Proporciona compatibilidad de importación desde ui/use-toast
 * - Mantiene la estructura de componentes UI consistente
 *
 * Nota: El archivo principal está en src/hooks/use-toast.js
 */

import { useToast, toast } from "@/hooks/use-toast";

export { useToast, toast };
