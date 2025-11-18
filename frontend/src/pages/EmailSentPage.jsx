import React from "react";
import { Mail } from "lucide-react"; //importa dos componentes de una libreria de iconos
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EmailSentPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <Card className="w-full max-w-md text-center shadow-2xl">
        <CardHeader>
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <Mail className="w-8 h-8 text-[#e74c3c]" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">
            ¡Falta un ultimo paso! Revisa tu bandeja de entrada
          </CardTitle>
          <CardDescription className="mt-2 text-gray-600">
            Hemos enviado un enlace de verificacion a tu correo electronico.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
          <p className="text-sm text-gray-700">
            La verificación es necesaria para completar el registro. Por favor,
            haz clic en el enlace para{" "}
            <span className="font-semibold text-red-600">activar perfil</span>.{" "}
            <span className="font-semibol text-red-600">activar perfil</span>
          </p>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-sm text-left">
            <p className="font-semibold">¿No lo recibiste?</p>
            <p className="text-yellow-800">
              Revisa tu carpeta de spam o correo no deseado.
            </p>
          </div>
          <Link to="/dasboard">
            <Button className="w-full bg-[#e74c3c] hover:bg-red-700 text-lg">
              Ir al home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
