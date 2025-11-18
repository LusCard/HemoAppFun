/**
 * use-toast.js - Sistema de notificaciones toast
 *
 * ¿Qué hace?
 * - Gestiona notificaciones temporales (toasts) en la aplicación
 * - Permite mostrar mensajes de éxito, error, información, etc.
 *
 * ¿Para qué sirve?
 * - Feedback visual al usuario (acciones completadas, errores)
 * - Mensajes no intrusivos que desaparecen automáticamente
 * - Comunicar el estado de operaciones sin bloquear la UI
 *
 * ¿Cómo funciona?
 * - Usa un reducer para gestionar el estado de los toasts
 * - Limita a 1 toast visible a la vez (TOAST_LIMIT)
 * - Los toasts se eliminan después de un tiempo (TOAST_REMOVE_DELAY)
 * - Usa un sistema de listeners para actualizar múltiples componentes
 *
 * Uso básico:
 * const { toast } = useToast();
 * toast({ title: "Éxito", description: "Operación completada" });
 * toast({ title: "Error", description: "Algo salió mal", variant: "destructive" });
 */

import * as React from "react";

// Configuración del sistema de toasts
const TOAST_LIMIT = 1; // Máximo número de toasts simultáneos
const TOAST_REMOVE_DELAY = 1000000; // Tiempo antes de eliminar el toast (en ms)

// Tipos de acciones para el reducer
const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
};

let count = 0;

/**
 * genId - Genera IDs únicos para cada toast
 */
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

// Map para gestionar los timeouts de eliminación de toasts
const toastTimeouts = new Map();

/**
 * addToRemoveQueue - Programa la eliminación automática de un toast
 * ¿Qué hace?
 * - Añade un timeout para eliminar el toast después del delay
 * - Previene duplicados verificando si ya existe un timeout
 */
const addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

/**
 * reducer - Gestiona el estado de los toasts
 * ¿Qué hace?
 * - Añade nuevos toasts
 * - Actualiza toasts existentes
 * - Oculta y elimina toasts
 */
export const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        // Añade el nuevo toast al inicio y limita el total
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        // Actualiza el toast que coincide con el ID
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      // ! Side effects ! - This could be extracted into a dismissToast() action,
      // but I'll keep it here for simplicity
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners = [];

let memoryState = { toasts: [] };

function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

function toast({ ...props }) {
  const id = genId();

  const update = (props) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = React.useState(memoryState);

  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };
