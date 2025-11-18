import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Area,
  CartesianGrid,
} from "recharts";

// Datos falsos
const data = [
  { day: "Lun", O_Positivo: 30 },
  { day: "Mar", O_Positivo: 35 },
  { day: "Mié", O_Positivo: 28 },
  { day: "Jue", O_Positivo: 40 },
  { day: "Vie", O_Positivo: 38 },
  { day: "Sáb", O_Positivo: 45 },
  { day: "Dom", O_Positivo: 42 },
];

export function BloodTypeAvailabilityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Disponibilidad (O+)</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <defs>
                <linearGradient id="colorArea" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--destructive))"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--destructive))"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>

              <XAxis
                dataKey="day"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={30}
              />
              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="hsl(var(--muted))"
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                }}
              />

              <Area
                type="monotone"
                dataKey="O_Positivo"
                stroke="none"
                fill="url(#colorArea)"
              />
              <Line
                type="monotone"
                dataKey="O_Positivo"
                stroke="hsl(var(--destructive))"
                strokeWidth={3}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
