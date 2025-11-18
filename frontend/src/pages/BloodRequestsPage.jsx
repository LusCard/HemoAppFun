import { useState } from "react";
import Header from "@/components/Header"; // Cambio a alias @
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"; // Cambio a alias @
import { Badge } from "@/components/ui/badge"; // Cambio a alias @
import { Button } from "@/components/ui/button"; // Cambio a alias @
import { Input } from "@/components/ui/input"; // Cambio a alias @
import { Label } from "@/components/ui/label"; // Cambio a alias @
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"; // Cambio a alias @
import { Clock, MapPin, Droplet, PlusCircle, User, Building2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // Cambio a alias @
import { DonationHistoryChart } from "../components/charts/DonationHistoryChart";

// Datos mock iniciales
const initialRequests = [
  {
    id: 1,
    patientName: "María González",
    bloodType: "O+",
    hospital: "Hospital Central de Formosa",
    urgency: "urgente",
    time: "Hace 15 minutos",
    units: 2,
  },
  {
    id: 2,
    patientName: "Juan Pérez",
    bloodType: "A+",
    hospital: "Hospital de Alta Complejidad (HAC)",
    urgency: "media",
    time: "Hace 1 hora",
    units: 1,
  },
  {
    id: 3,
    patientName: "Carlos Ramírez",
    bloodType: "B-",
    hospital: "Centro Provincial de Hemoterapia",
    urgency: "urgente",
    time: "Hace 30 minutos",
    units: 3,
  },
  {
    id: 4,
    patientName: "Ana Martínez",
    bloodType: "AB+",
    hospital: "Hospital Central de Formosa",
    urgency: "baja",
    time: "Hace 3 horas",
    units: 1,
  },
  {
    id: 5,
    patientName: "Luis Fernández",
    bloodType: "O-",
    hospital: "Hospital de Alta Complejidad (HAC)",
    urgency: "urgente",
    time: "Hace 5 minutos",
    units: 4,
  },
];

export default function BloodRequestsPage({ user }) {
  const [requests, setRequests] = useState(initialRequests);
  const [filterBloodType, setFilterBloodType] = useState("all");
  const { toast } = useToast();

  // Estado del formulario
  const [formData, setFormData] = useState({
    patientName: "",
    hospital: "",
    bloodType: "",
    urgency: "media",
    units: 1,
  });

  const filteredRequests = filterBloodType === "all" ? requests : requests.filter((req) => req.bloodType === filterBloodType);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.patientName || !formData.hospital || !formData.bloodType) {
      toast({
        title: "Error",
        description: "Por favor completa todos los campos requeridos.",
        variant: "destructive",
      });
      return;
    }

    const newRequest = {
      id: requests.length + 1,
      ...formData,
      time: "Reciente",
    };

    setRequests([newRequest, ...requests]);
    setFormData({
      patientName: "",
      hospital: "",
      bloodType: "",
      urgency: "media",
      units: 1,
    });

    toast({
      title: "Solicitud Publicada",
      description: "Tu pedido de sangre ha sido publicado exitosamente.",
    });
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "urgente":
        return "destructive";
      case "media":
        return "secondary"; // Cambiado a secondary para mejor contraste
      case "baja":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />

      <div className="container mx-auto py-8 px-6 h-[calc(100vh-80px)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
          {/* COLUMNA IZQUIERDA: Formulario de Creación (Fija en Desktop) */}
          <div className="lg:col-span-4 h-full">
            <Card className="h-auto sticky top-4 border-l-4 border-l-primary shadow-lg">
              <CardHeader className="bg-primary/5 pb-4">
                <CardTitle className="flex items-center gap-2 text-primary">
                  <PlusCircle className="w-6 h-6" />
                  Nueva Solicitud
                </CardTitle>
                <CardDescription>Publica un pedido de sangre para un paciente que lo necesite.</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="patientName" className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" /> Nombre del Paciente
                    </Label>
                    <Input
                      id="patientName"
                      placeholder="Ej: Juan Pérez"
                      value={formData.patientName}
                      onChange={(e) => handleInputChange("patientName", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hospital" className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-muted-foreground" /> Hospital / Centro
                    </Label>
                    <Input
                      id="hospital"
                      placeholder="Ej: Hospital Central"
                      value={formData.hospital}
                      onChange={(e) => handleInputChange("hospital", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="flex items-center gap-2">
                        <Droplet className="w-4 h-4 text-muted-foreground" /> Grupo
                      </Label>
                      <Select value={formData.bloodType} onValueChange={(v) => handleInputChange("bloodType", v)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Tipo" />
                        </SelectTrigger>
                        <SelectContent>
                          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Unidades</Label>
                      <Input type="number" min="1" max="10" value={formData.units} onChange={(e) => handleInputChange("units", parseInt(e.target.value))} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-muted-foreground" /> Nivel de Urgencia
                    </Label>
                    <Select value={formData.urgency} onValueChange={(v) => handleInputChange("urgency", v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="baja">Baja (Programada)</SelectItem>
                        <SelectItem value="media">Media (24-48hs)</SelectItem>
                        <SelectItem value="urgente">Alta (Inmediata)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-lg py-6 mt-2">
                    Publicar Solicitud
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* COLUMNA DERECHA: Lista de Solicitudes (Scrolleable) */}
          <div className="lg:col-span-8 flex flex-col h-full overflow-hidden">
            {/* Header de la lista + Filtros */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Solicitudes Activas</h1>
                <p className="text-muted-foreground">Ayuda a quienes más lo necesitan hoy.</p>
              </div>

              <div className="flex items-center gap-2 bg-white p-2 rounded-lg border shadow-sm">
                <span className="text-sm font-medium px-2 text-muted-foreground">Filtrar:</span>
                <Select value={filterBloodType} onValueChange={setFilterBloodType}>
                  <SelectTrigger className="w-[140px] border-none shadow-none bg-transparent">
                    <SelectValue placeholder="Todos" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los tipos</SelectItem>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Contenedor Scrolleable */}
            <div className="flex-1 overflow-y-auto pr-2 pb-10 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {filteredRequests.length === 0 ? (
                <Card className="p-12 text-center border-dashed">
                  <Droplet className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium text-foreground">No hay solicitudes</h3>
                  <p className="text-muted-foreground">No se encontraron pedidos para este tipo de sangre.</p>
                </Card>
              ) : (
                filteredRequests.map((request) => (
                  <Card
                    key={request.id}
                    className="border-l-4 hover:shadow-md transition-shadow duration-200"
                    style={{
                      borderLeftColor:
                        request.urgency === "urgente"
                          ? "hsl(var(--destructive))"
                          : request.urgency === "media"
                          ? "hsl(var(--primary))" // Naranja/Amarillo usualmente
                          : "hsl(var(--muted))",
                    }}
                  >
                    <CardContent className="p-5">
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        {/* Info Principal */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <CardTitle className="text-xl font-bold text-gray-800">{request.patientName}</CardTitle>
                            <div className="flex gap-2 sm:hidden">
                              {/* Badges visibles en móvil arriba */}
                              <Badge variant={getUrgencyColor(request.urgency)} className="uppercase text-xs">
                                {request.urgency}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-600 mt-3">
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4 text-primary/70" />
                              <span className="truncate font-medium">{request.hospital}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-primary/70" />
                              <span>{request.time}</span>
                            </div>
                          </div>
                        </div>

                        {/* Badges y Acción */}
                        <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-3 sm:min-w-[140px]">
                          <div className="flex gap-2 items-center">
                            <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200 px-3 py-1 text-sm font-bold shadow-sm">
                              <Droplet className="w-3 h-3 mr-1 fill-current" />
                              {request.bloodType}
                            </Badge>
                            <span className="text-sm font-semibold text-gray-500">
                              {request.units} {request.units === 1 ? "unidad" : "unidades"}
                            </span>
                          </div>

                          <Badge variant={getUrgencyColor(request.urgency)} className="hidden sm:inline-flex uppercase text-xs tracking-wider">
                            {request.urgency}
                          </Badge>

                          <Button className="w-full sm:w-auto sm:mt-2 bg-accent hover:bg-accent/90 shadow-sm">Donar</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}

              {/* Espacio extra al final del scroll */}
              <div className="h-8"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto pb-12 px-12">
        <DonationHistoryChart />
      </div>
    </div>
  );
}
