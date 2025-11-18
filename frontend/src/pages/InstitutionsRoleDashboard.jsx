import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, CartesianGrid } from "recharts";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Building2, MapPin, TrendingUp, Users, Activity } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// --- Configuración de Iconos del Mapa (Fix Leaflet) ---
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

// --- Datos Mock basados en tu imagen ---

// 1. Stock Balance (Entrada vs Salida)
const stockData = [
  { type: "O+", input: 110, output: 105 },
  { type: "A+", input: 85, output: 65 },
  { type: "O-", input: 5, output: 20 }, // Déficit crítico simulado
];

// 2. Donation Seasonality (Tendencia mensual)
const seasonalityData = [
  { month: "Oct", donations: 125 },
  { month: "Nov", donations: 110 },
  { month: "Dic", donations: 25 }, // Bajada en diciembre (fiestas)
];

// 3. Gender Distribution
const genderData = [
  { name: "Femenino", value: 60, fill: "#3b82f6" }, // Azul
  { name: "Masculino", value: 40, fill: "#ef4444" }, // Rojo
];

// Centro del mapa (Formosa por defecto)
const mapCenter = [-26.1841, -58.1781];

export const InstitutionsRoleDashboard = () => {
  const { user } = useAuth();

  // Colores para los gráficos
  const COLORS = {
    input: "#22c55e", // Verde (Entradas)
    output: "#ef4444", // Rojo (Salidas)
    line: "#3b82f6", // Azul (Línea)
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} />

      <div className="container mx-auto py-8 px-6">
        {/* Encabezado del Dashboard */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
            <Building2 className="w-8 h-8 text-primary" />
            Panel de Control Institucional
          </h1>
          <p className="text-muted-foreground mt-2">
            Bienvenido, <strong>{user?.profile?.firstName || "Institción"}</strong>. Aquí tienes el resumen operativo de tu banco de sangre.
          </p>
        </div>

        {/* Sección 1: Mapa de Cobertura */}
        <div className="mb-8">
          <Card className="shadow-md border-2 border-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-primary" />
                Ubicación y Área de Cobertura
              </CardTitle>
              <CardDescription>Visualización de tu centro y el radio de atención principal.</CardDescription>
            </CardHeader>
            <CardContent className="p-0 h-[400px] relative">
              <MapContainer center={mapCenter} zoom={13} style={{ height: "100%", width: "100%" }} className="z-0 rounded-b-xl">
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {/* Marcador de la Institución */}
                <Marker position={mapCenter}>
                  <Popup>
                    <strong>Tu Institución</strong>
                    <br />
                    Centro Principal de Operaciones
                  </Popup>
                </Marker>
                {/* Radio de influencia */}
                <Circle center={mapCenter} radius={1500} pathOptions={{ color: "#3b82f6", fillColor: "#3b82f6", fillOpacity: 0.1 }} />
              </MapContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sección 2: Métricas Clave (Gráficos) */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Activity className="w-6 h-6 text-primary" />
          Métricas de Rendimiento
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* Gráfico 1: Stock Balance (Barras) */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Balance de Stock</CardTitle>
              <CardDescription>Comparativa de unidades ingresadas vs. egresadas por tipo.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stockData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="type" />
                    <YAxis />
                    <Tooltip cursor={{ fill: "transparent" }} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                    <Legend wrapperStyle={{ paddingTop: "10px" }} />
                    <Bar name="Entradas (Donaciones)" dataKey="input" fill={COLORS.input} radius={[4, 4, 0, 0]} barSize={30} />
                    <Bar name="Salidas (Transfusiones)" dataKey="output" fill={COLORS.output} radius={[4, 4, 0, 0]} barSize={30} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Gráfico 2: Seasonality (Línea) */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-500" />
                Estacionalidad de Donaciones
              </CardTitle>
              <CardDescription>Tendencia de donaciones en el último trimestre (Oct - Dic).</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={seasonalityData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
                    <Legend wrapperStyle={{ paddingTop: "10px" }} />
                    <Line
                      name="Donaciones"
                      type="monotone"
                      dataKey="donations"
                      stroke={COLORS.line}
                      strokeWidth={3}
                      dot={{ r: 6, strokeWidth: 2, fill: "#fff" }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Gráfico 3: Gender Distribution (Donut) */}
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Distribución por Género
              </CardTitle>
              <CardDescription>Proporción de donantes registrados.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={genderData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value" stroke="none">
                      {genderData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Porcentaje"]}
                      contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
                    />
                    <Legend layout="vertical" verticalAlign="middle" align="right" iconType="circle" />
                  </PieChart>
                </ResponsiveContainer>
                {/* Texto Central */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none pr-16">
                  <span className="text-sm text-gray-400 font-medium">Total</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tarjeta Placeholder (como en tu imagen hay 4 espacios, agregué una de resumen) */}
          <Card className="shadow-sm hover:shadow-md transition-shadow bg-primary/5 border-primary/20 flex flex-col justify-center items-center text-center p-6">
            <CardContent className="pt-6">
              <div className="mb-4 bg-white p-4 rounded-full shadow-sm inline-block">
                <Activity className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Resumen Rápido</h3>
              <p className="text-gray-600 mb-4">
                El stock de <strong>O-</strong> está por debajo del nivel crítico (20%). Se recomienda iniciar una campaña de urgencia.
              </p>
              <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-medium text-sm">Iniciar Campaña</button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
