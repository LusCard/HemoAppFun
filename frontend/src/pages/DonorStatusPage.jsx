import { useState, useEffect } from "react";
import Header from "../components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { DonorImpactGauge } from "../components/charts/DonorImpactGauge";
import { useAuth } from "../context/AuthContext";
import { AnnualHistoryChart } from "../components/charts/AnualHistoryChart";

export default function DonorStatusPage() {
  const { user, handleUpdateUser } = useAuth();
  const [status, setStatus] = useState("donante");

  // Constantes de lógica de negocio
  const ESTIMATE_HELPER = {
    blood: 3,
    plasma: 1,
    platelets: 1,
    unknown: 1,
  };

  const DEFERRAL_PERIODS = {
    blood: 90,
    plasma: 30,
    platelets: 15,
    unknown: 90,
  };

  useEffect(() => {
    if (user?.status) {
      setStatus(user.status);
    }
  }, [user]);

  // Lógica Mock/Real
  const realDonationCount = (user?.donations || []).length || user?.donationCount || 0;
  const showMockData = realDonationCount === 0;
  // Si es 0, usamos 5 para mostrar el gráfico mock, sino el real
  const donationCount = showMockData ? 5 : realDonationCount;

  const livesImpacted = donationCount * ESTIMATE_HELPER.blood;

  // Datos para el gráfico (Mock o Real)
  const bloodComponentsData = [
    {
      name: "Glóbulos Rojos",
      value: donationCount,
      impact: "Oxigenación",
      fill: "#ef4444", // Rojo
    },
    {
      name: "Plasma",
      value: donationCount,
      impact: "Coagulación",
      fill: "#eab308", // Amarillo
    },
    {
      name: "Plaquetas",
      value: donationCount,
      impact: "Inmunidad",
      fill: "#3b82f6", // Azul
    },
  ];

  const saveStatus = (newStatus) => {
    setStatus(newStatus);
    const updatedData = { status: newStatus };
    handleUpdateUser(updatedData);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />

      <div className="container mx-auto py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <h1 className="text-4xl font-bold text-foreground mb-2">Impacto de tus Donaciones</h1>
          <p className="text-muted-foreground mb-8">Descubre cómo tu sangre se transforma en vida.</p>

          {/* Fila Superior: Estado del Donante */}
          <div className="mb-8">
            <Card className="border-2 border-muted/20">
              <CardHeader>
                <CardTitle className="text-foreground">Estado Actual</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <select
                    className="w-full rounded-md border border-input bg-background p-2 text-sm"
                    value={status}
                    onChange={(e) => saveStatus(e.target.value)}
                  >
                    <option value="donante">🟢 Disponible para donar</option>
                    <option value="no_puede_donar">🔴 Periodo de espera (Deferral)</option>
                    <option value="paciente">🏥 Soy Paciente</option>
                    <option value="otro">⚪ Otro</option>
                  </select>

                  {status === "no_puede_donar" && (
                    <div className="p-3 bg-accent/10 rounded-md text-sm text-accent">
                      <strong>Recordatorio:</strong> Debes esperar {DEFERRAL_PERIODS.blood} días entre donaciones de sangre entera.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fila Central: Gráfico de Impacto (Ancho completo visualmente equilibrado) */}
          <div className="mb-8 flex w-full justify-center">
            <div className="w-full ">
              <DonorImpactGauge data={bloodComponentsData} totalLives={livesImpacted} />
            </div>
          </div>

          {/* Fila Inferior: Tarjetas "Vidas Salvadas" e "Info" una al lado de la otra */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Tarjeta Izquierda: Vidas Salvadas */}
            <Card className="border-2 border-muted/20 bg-gradient-to-br from-white to-red-50 flex flex-col justify-center">
              <CardHeader>
                <CardTitle className="text-red-600">Vidas Impactadas Estimadas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between mb-4">
                  <div>
                    <span className="text-6xl font-extrabold text-foreground block leading-none">{livesImpacted}</span>
                    <span className="text-sm text-muted-foreground mt-2 block">personas beneficiadas</span>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-foreground">{donationCount}</span>
                    <span className="text-xs text-muted-foreground block">donaciones totales</span>
                  </div>
                </div>
                <Progress value={Math.min((livesImpacted / 30) * 100, 100)} className="h-3 mt-2" />
                <p className="text-xs text-right text-muted-foreground mt-2 font-medium">Meta anual: 30 vidas</p>
              </CardContent>
            </Card>

            {/* Tarjeta Derecha: Info Card */}
            <Card className="flex flex-col justify-center border-2 border-muted/20">
              <CardHeader className="justify-center">
                <CardTitle className="text-2xl justify-center">¿Sabías qué?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-lg text-muted-foreground">
                <p>Con una donación de 450ml de sangre entera estás ayudando en promedio a:</p>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-red-500 mt-1 flex-shrink-0"></div>
                    <span>
                      <strong className="text-foreground text-2xl">Glóbulos rojos:</strong>
                      <p className="2xl">3 personas en cirugías y accidentes.</p>
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mt-1 flex-shrink-0"></div>
                    <span>
                      <strong className="text-foreground text-2xl">Plasma:</strong>
                      <p className="2xl">2 personas en tratamientos de quemaduras y trastornos de coagulación.</p>
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mt-1 flex-shrink-0"></div>
                    <span>
                      <strong className="text-foreground text-2xl">Plaquetas:</strong>
                      <p className="2xl">1 persona en tratamientos oncológicos.</p>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <AnnualHistoryChart />
        </div>
      </div>
    </div>
  );
}
