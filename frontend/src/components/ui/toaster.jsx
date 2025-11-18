/**
 * toaster.jsx - Componente que renderiza las notificaciones toast
 *
 * ¿Qué hace?
 * - Renderiza todos los toasts activos en la pantalla
 * - Se conecta con el hook useToast para obtener la lista de toasts
 * - Muestra título, descripción y acciones de cada toast
 *
 * ¿Para qué sirve?
 * - Es el contenedor visual de las notificaciones
 * - Debe incluirse una vez en la raíz de la aplicación
 * - Gestiona la visualización de múltiples toasts
 *
 * ¿Cómo funciona?
 * - Se monta en App.jsx para estar disponible en toda la app
 * - Escucha el estado global de toasts del hook useToast
 * - Renderiza cada toast con sus propiedades (title, description, variant)
 * - Incluye botón de cierre automático
 */

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast(); // Obtiene la lista de toasts activos

  return (
    <ToastProvider>
      {/* Renderiza cada toast de la lista */}
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
