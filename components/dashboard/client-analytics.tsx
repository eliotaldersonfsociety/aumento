"use client"

import { useState, useEffect, useMemo } from "react"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import {
  Instagram,
  Facebook,
  Music2,
  Youtube,
  Twitter,
  MessageCircle,
  Globe,
  Star,
  Smartphone,
  MapPin,
  Mail,
  Hash,
  ImageIcon,
  Radio,
  Linkedin,
} from "lucide-react"
import { Order } from "@/lib/data"

const servicesData: any = {
  Instagram: { icon: Instagram },
  TikTok: { icon: Music2 },
  YouTube: { icon: Youtube },
  Facebook: { icon: Facebook },
  Twitter: { icon: Twitter },
  Telegram: { icon: MessageCircle },
  WhatsApp: { icon: MessageCircle },
  Spotify: { icon: Music2 },
  Twitch: { icon: Radio },
  Kick: { icon: Radio },
  Kwai: { icon: Music2 },
  LinkedIn: { icon: Linkedin },
  Discord: { icon: Hash },
  Pinterest: { icon: ImageIcon },
  Vimeo: { icon: Music2 },
  SoundCloud: { icon: Music2 },
  Snapchat: { icon: ImageIcon },
  Dribbble: { icon: ImageIcon },
  Threads: { icon: Hash },
  Tidal: { icon: Music2 },
  iTunes: { icon: Music2 },
  "Tráfico Web": { icon: Globe },
  "Reseñas Google": { icon: Star },
  "Apps Android": { icon: Smartphone },
  "Apps iOS": { icon: Smartphone },
  TripAdvisor: { icon: MapPin },
  "Reseñas Gmail": { icon: Mail },
}

// 🔹 Calcula datos históricos + proyección de 12 meses basados en órdenes reales
const calculateGrowthData = (orders: Order[]) => {
  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth();

  // Mapeo de servicios a plataformas
  const serviceToPlatform: Record<string, string> = {
    "Instagram": "Instagram",
    "TikTok": "TikTok",
    "YouTube": "YouTube",
    "Facebook": "Facebook",
    "Twitter": "Twitter",
    "Telegram": "Telegram",
    "WhatsApp": "WhatsApp",
    "Spotify": "Spotify",
    "Twitch": "Twitch",
    "Kick": "Kick",
    "Kwai": "Kwai",
    "LinkedIn": "LinkedIn",
    "Discord": "Discord",
    "Pinterest": "Pinterest",
    "Vimeo": "Vimeo",
    "SoundCloud": "SoundCloud",
    "Snapchat": "Snapchat",
    "Dribbble": "Dribbble",
    "Threads": "Threads",
    "Tidal": "Tidal",
    "iTunes": "iTunes",
    "Tráfico Web": "Tráfico Web",
    "Reseñas Google": "Reseñas Google",
    "Apps Android": "Apps Android",
    "Apps iOS": "Apps iOS",
    "TripAdvisor": "TripAdvisor",
    "Reseñas Gmail": "Reseñas Gmail",
  };

  // Función para mapear servicio a plataforma
  const getPlatform = (servicio: string) => {
    for (const [platform, _] of Object.entries(serviceToPlatform)) {
      if (servicio.toLowerCase().includes(platform.toLowerCase())) {
        return platform;
      }
    }
    return servicio; // Si no coincide, usar el servicio original
  };

  // Agrupar órdenes por plataforma y tipo
  const ordersByServiceAndType: Record<string, Record<string, Order[]>> = {};
  orders.forEach(order => {
    const platform = getPlatform(order.servicio);
    if (!ordersByServiceAndType[platform]) {
      ordersByServiceAndType[platform] = {};
    }
    if (!ordersByServiceAndType[platform][order.tipo]) {
      ordersByServiceAndType[platform][order.tipo] = [];
    }
    ordersByServiceAndType[platform][order.tipo].push(order);
  });

  const data: Record<string, { month: string; [key: string]: number | string }[]> = {};

  Object.keys(servicesData).forEach(service => {
    const serviceOrdersByType = ordersByServiceAndType[service] || {};

    if (Object.keys(serviceOrdersByType).length > 0) {
      // Obtener todos los tipos para este servicio
      const types = Object.keys(serviceOrdersByType);

      // Crear datos históricos para cada tipo
      const historicalData: { month: string; [key: string]: number | string }[] = [];
      for (let i = 0; i < 12; i++) {
        const monthData: { month: string; [key: string]: number | string } = { month: months[i] };
        let cumulative = 0;
        types.forEach(type => {
          const monthlyGrowth: Record<number, number> = {};
          serviceOrdersByType[type].forEach(order => {
            const date = new Date(Number(order.created_at) * 1000);
            const month = date.getMonth();
            const year = date.getFullYear();

            if (year === currentYear || year === currentYear - 1) {
              if (!monthlyGrowth[month]) {
                monthlyGrowth[month] = 0;
              }
              monthlyGrowth[month] += Number(order.cantidad);
            }
          });
          const growth = monthlyGrowth[i] || 0;
          cumulative += growth;
          monthData[type] = cumulative;
        });
        historicalData.push(monthData);
      }

      // Calcular promedio mensual para proyección
      const totalGrowthByType: Record<string, number> = {};
      types.forEach(type => {
        const monthlyGrowth: Record<number, number> = {};
        serviceOrdersByType[type].forEach(order => {
          const date = new Date(Number(order.created_at) * 1000);
          const month = date.getMonth();
          const year = date.getFullYear();

          if (year === currentYear || year === currentYear - 1) {
            if (!monthlyGrowth[month]) {
              monthlyGrowth[month] = 0;
            }
            monthlyGrowth[month] += Number(order.cantidad);
          }
        });
        const totalGrowth = Object.values(monthlyGrowth).reduce((sum, val) => sum + val, 0);
        totalGrowthByType[type] = totalGrowth / Math.max(Object.keys(monthlyGrowth).length, 1);
      });

      // Proyección para los próximos 12 meses
      const projectionData: { month: string; [key: string]: number | string }[] = [];
      for (let i = 0; i < 12; i++) {
        const nextMonth = (currentMonth + i) % 12;
        const monthData: { month: string; [key: string]: number | string } = { month: months[nextMonth] };
        types.forEach(type => {
          const lastValue = historicalData[historicalData.length - 1][type] as number;
          const projectedValue = lastValue + totalGrowthByType[type];
          monthData[type] = Math.floor(projectedValue);
        });
        projectionData.push(monthData);
      }

      // Combinar históricos y proyección
      data[service] = [...historicalData, ...projectionData];
    } else {
      // Si no hay órdenes, datos vacíos
      data[service] = months.map(month => ({ month, growth: 0 }));
    }
  });

  return data;
}

interface AnalyticsDashboardProps {
  orders?: Order[];
}

export function AnalyticsDashboard({ orders = [] }: AnalyticsDashboardProps) {
  const platformData = useMemo(() => {
    if (orders && orders.length > 0) {
      return calculateGrowthData(orders)
    }
    return {}
  }, [orders])

  const [platform, setPlatform] = useState<string>(() => {
    const keys = Object.keys(platformData)
    return keys.length > 0 ? keys[0] : "Instagram"
  })

  useEffect(() => {
    const keys = Object.keys(platformData)
    if (keys.length > 0 && !keys.includes(platform)) {
      setPlatform(keys[0])
    }
  }, [platformData, platform])

  const PlatformIcon = servicesData[platform]?.icon || Globe
  const color = "#007aff"

  // Always show the chart, even if no data

  return (
    <Card className="bg-white/50 backdrop-blur-xl border border-white/50 shadow-xl rounded-2xl p-4 sm:p-6">
      <CardHeader className="p-0 mb-4">
        <CardTitle className="text-lg sm:text-xl font-bold flex items-center gap-2">
          <PlatformIcon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          {platform} — Analítica
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs value={platform} onValueChange={setPlatform} className="w-full">
          {/* 🔹 Contenedor seguro para tabs */}
          <div className="relative w-full max-w-full overflow-hidden">
            <TabsList
              className="flex w-full overflow-x-auto bg-white/20 p-2 pl-3 pr-3 rounded-xl gap-2 justify-start scrollbar-hide snap-x snap-mandatory scroll-smooth"
              style={{
                WebkitOverflowScrolling: "touch",
                scrollPadding: "1rem",
              }}
            >
              {Object.keys(platformData).map((name) => {
                const Icon = servicesData[name].icon
                return (
                  <TabsTrigger
                    key={name}
                    value={name}
                    className="flex flex-col items-center justify-center gap-1 px-2 py-2 text-[10px] sm:text-xs rounded-xl min-w-[60px] sm:min-w-[80px] snap-center hover:bg-white/30 transition"
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                    <span className="truncate text-[10px] sm:text-xs">{name}</span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
          </div>

          {/* 🔹 Gráficas */}
          {Object.keys(platformData).map((name) => {
            const types = Object.keys(platformData[name][0]).filter(key => key !== 'month');
            const hasTypes = types.length > 0;
            return (
              <TabsContent key={name} value={name} className="mt-6">
                <div className="w-full h-[180px] sm:h-[280px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={platformData[name]}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                      <XAxis dataKey="month" stroke="#555" fontSize={10} />
                      <YAxis stroke="#555" fontSize={10} />
                      <Tooltip
                        contentStyle={{
                          background: "rgba(255,255,255,0.9)",
                          borderRadius: "10px",
                          border: "none",
                          fontSize: "12px",
                        }}
                      />
                      {hasTypes ? (
                        types.map((type, index) => (
                          <Line
                            key={type}
                            type="monotone"
                            dataKey={type}
                            stroke={`hsl(${index * 60}, 70%, 50%)`}
                            strokeWidth={3}
                            dot={{ r: 2 }}
                          />
                        ))
                      ) : (
                        <Line
                          type="monotone"
                          dataKey="growth"
                          stroke={color}
                          strokeWidth={3}
                          dot={{ r: 2 }}
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex justify-between items-center mt-3 text-xs sm:text-sm">
                  <p className="text-muted-foreground">Crecimiento estimado</p>
                  <div className="flex gap-4">
                    {hasTypes ? (
                      types.map((type, index) => (
                        <p key={type} className="text-foreground font-semibold">
                          {type}: +{platformData[name][platformData[name].length - 1][type]} unidades
                        </p>
                      ))
                    ) : (
                      <p className="text-foreground font-semibold">
                        +{platformData[name][platformData[name].length - 1].growth} unidades
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </CardContent>
    </Card>
  )
}
