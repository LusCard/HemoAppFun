import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Usando alias @ si funciona, o ../ui/card si prefieres consistencia
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";

const data = [
  { year: "2021", donaciones: 0, intenciones: 0, solicitudes: 0 },
  { year: "2022", donaciones: 0, intenciones: 0, solicitudes: 0 },
  { year: "2023", donaciones: 0, intenciones: 0, solicitudes: 0 },
  { year: "2024", donaciones: 0, intenciones: 0, solicitudes: 0 },
  { year: "2025", donaciones: 2, intenciones: 4, solicitudes: 12 },
];

export function AnnualHistoryChart() {
  return (
    <Card className="w-full h-full shadow-md border-2 border-muted/20">
      <CardHeader>
        <CardTitle>Historial Anual (2021 - 2025)</CardTitle>
        <p className="text-sm text-muted-foreground">Comparativa de solicitudes recibidas para tu tipo de sangre vs. tu actividad.</p>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
              <XAxis dataKey="year" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip
                cursor={{ fill: "rgba(0,0,0,0.05)" }}
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e2e8f0",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                }}
              />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px" }} />

              {/* Barras con colores semánticos */}
              <Bar
                name="Solicitudes de mi tipo"
                dataKey="solicitudes"
                fill="#22c55e" // Green
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                name="Intenciones de donar"
                dataKey="intenciones"
                fill="#eab308" // Yellow
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                name="Donaciones concretadas"
                dataKey="donaciones"
                fill="#f97316" // Orange/Red
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
