/**
 * RegisterPage.jsx - Página de registro de nuevos usuarios
 * * Alineación con Backend (Registro Mínimo - Datos Médicos van en Onboarding):
 * - Envía los campos userName, email, password (Nivel superior).
 * - Envía los campos profileData: {firstName, lastName, dni, birthDate, gender} (Anidados).
 */

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function RegisterPage({ onRegister }) {
  // ⬅️ CAMBIO 1: Añadir estado de carga
  const [isLoading, setIsLoading] = useState(false);

  // ⬅️ ESTADO MÍNIMO REQUERIDO PARA EL REGISTRO INICIAL 💥
  const [formData, setFormData] = useState({
    // Nivel superior
    userName: "",
    email: "",
    password: "",
    // profileData fields (anidados)
    firstName: "",
    lastName: "",
    dni: "",
    birthDate: "",
    gender: "",
    role: "",
  });

  const navigate = useNavigate();
  const { toast } = useToast();

  /**
   * handleSubmit - Procesa el registro del nuevo usuario
   */
  const handleSubmit = async (e) => {
    // ⬅️ CAMBIO 2: Función async
    e.preventDefault();
    setIsLoading(true);

    // URL DEL ENDPOINT (Ajusta el puerto si es diferente a 3001)
    const API_URL = "http://localhost:3001/api/auth/register";

    // ⬅️ PAYLOAD ALINEADO AL BACKEND 💥
    const payload = {
      userName: formData.userName,
      email: formData.email,
      password: formData.password,
      role: formData.role, // "donador", "institucion", etc.

      profileData: {
        // OBJETO ANIDADO REQUERIDO
        firstName: formData.firstName,
        lastName: formData.lastName,
        dni: formData.dni,
        birthDate: formData.birthDate,
        gender: formData.gender,
      },
      // Si el rol fuera 'institucion', aquí se añadiría 'institutionData'
    };

    // --- CONEXIÓN AL BACKEND (Implementación de fetch con try/catch/finally) ---
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (response.ok) {
        const isInstitution = data.data.role === "institucion";

        toast({
          title: "¡Registro exitoso!",
          description: isInstitution
            ? "Institución en validación. Te notificaremos al ser aprobada."
            : "Hemos enviado un link de verificación a tu email.",
        });

        // Redirigir a login para que el usuario complete el flujo de verificación/espera
        navigate("/login");
      } else {
        if (data.errors && Array.isArray(data.errors)) {
          const errorList = (
            <ul className="list-disc list-inside text-sm">
              {data.errors.map((error, index) => (
                <li key={index}>{error.msg}</li>
              ))}
            </ul>
          );
          toast({
            title: data.msg,
            description: errorList,
            variant: "destructive",
            duration: 5000,
          });
        } else {
          const errorMsg = data.msg || "Error desconocido al registrar";

          toast({
            title: "Error",
            description: errorMsg,
            variant: "destructive",
            duration: 5000,
          });
        }
      }
    } catch (error) {
      console.error("Error de conexión:", error);
      toast({
        title: "Error de red",
        description: "No se pudo conectar con el servidor.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-card-foreground to-primary flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute left-0 w-[400px] h-[400px] bg-background/40 rounded-full blur-3xl"></div>
      <div className="absolute left-0 top-2/4 w-[400px] h-[400px] bg-accent/40 rounded-full blur-3xl"></div>
      <div className="absolute right-20 top-1/2 w-[300px] h-[300px] bg-background/30 rounded-full blur-3xl"></div>
      <Card className="w-full max-w-2xl relative z-10">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-accent rounded-full flex items-center justify-center">
            <UserPlus className="w-8 h-8 text-accent-foreground" />
          </div>
          <CardTitle className="text-3xl font-bold text-primary">
            Crear Cuenta
          </CardTitle>
          <CardDescription className="text-lg font-semibold">
            Únete a la comunidad de donantes
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* ⬅️ CAMPO REQUERIDO: USERNAME 💥 */}
            <div className="space-y-2">
              <Label htmlFor="userName">Nombre de Usuario</Label>
              <Input
                id="userName"
                type="text"
                required
                value={formData.userName}
                onChange={(e) =>
                  setFormData({ ...formData, userName: e.target.value })
                }
              />
            </div>

            {/* NOMBRE y APELLIDO */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Nombre</Label>
                <Input
                  id="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Apellido</Label>
                <Input
                  id="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* DNI y FECHA DE NACIMIENTO (Requeridos) 💥 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dni">DNI</Label>
                <Input
                  id="dni"
                  type="number"
                  required
                  value={formData.dni}
                  onChange={(e) =>
                    setFormData({ ...formData, dni: e.target.value })
                  }
                  minLength={7}
                  maxLength={8}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="birthDate">Fecha de Nacimiento</Label>
                <Input
                  id="birthDate"
                  type="date"
                  required
                  value={formData.birthDate}
                  onChange={(e) =>
                    setFormData({ ...formData, birthDate: e.target.value })
                  }
                />
              </div>
            </div>

            {/* EMAIL y CONTRASEÑA */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </div>
            </div>

            {/* GÉNERO (RENOMBRADO de 'status') 💥 */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="gender">Género</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(value) =>
                    setFormData({ ...formData, gender: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu género" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Masculino</SelectItem>
                    <SelectItem value="female">Femenino</SelectItem>
                    <SelectItem value="other">Otro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Tipo de Usuario</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) =>
                    setFormData({ ...formData, role: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona tu rol" />
                  </SelectTrigger>
                  <SelectContent>
                    {/* Valores alineados a tu esquema del backend (user.model.js) */}
                    <SelectItem value="donador">Donante</SelectItem>
                    <SelectItem value="community_member">
                      Comunidad (No donante)
                    </SelectItem>
                    <SelectItem value="institucion">Institución</SelectItem>
                    <SelectItem value="moderador">Moderador</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-accent hover:bg-accent/90"
              size="lg"
              disabled={isLoading} // ⬅️ CAMBIO 3: Deshabilita mientras carga
            >
              {isLoading ? ( // ⬅️ CAMBIO 4: Muestra el spinner si está cargando
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i>
                  Registrando...
                </>
              ) : (
                "Crear Cuenta"
              )}
            </Button>
            <div className="text-center pt-4 border-t">
              <span className="text-base text-muted-foreground">
                ¿Ya tienes cuenta?{" "}
              </span>
              <Link
                to="/login"
                className="text-base text-primary font-semibold hover:underline"
              >
                Inicia sesión
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
