import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { verifyEmailRequest } from "@/services/apiService"; // Cambio a alias @
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");

  const [status, setStatus] = useState("loading"); // loading, success, error
  const [message, setMessage] = useState("Verificando tu cuenta...");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("Token de verificación no encontrado.");
      return;
    }

    // Llamada al backend para validar
    verifyEmailRequest(token)
      .then((response) => {
        if (response.ok) {
          setStatus("success");
          setMessage("¡Tu correo ha sido verificado exitosamente!");
        } else {
          setStatus("error");
          setMessage(response.msg || "No se pudo verificar el correo.");
        }
      })
      .catch((error) => {
        setStatus("error");
        setMessage(error.message || "El enlace es inválido o ha expirado.");
      });
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center shadow-lg">
        <CardHeader>
          <div className="mx-auto mb-4">
            {status === "loading" && <Loader2 className="h-16 w-16 text-blue-500 animate-spin" />}
            {status === "success" && <CheckCircle2 className="h-16 w-16 text-green-500" />}
            {status === "error" && <XCircle className="h-16 w-16 text-red-500" />}
          </div>
          <CardTitle className="text-2xl">
            {status === "loading" && "Verificando..."}
            {status === "success" && "¡Verificado!"}
            {status === "error" && "Error de Verificación"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">{message}</p>

          {status === "success" && (
            <Button onClick={() => navigate("/login")} className="w-full bg-green-600 hover:bg-green-700">
              Ir a Iniciar Sesión
            </Button>
          )}

          {status === "error" && (
            <Button onClick={() => navigate("/")} variant="outline" className="w-full">
              Volver al Inicio
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
