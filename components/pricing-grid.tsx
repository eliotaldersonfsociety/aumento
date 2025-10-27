import { ServiceCard } from "@/components/service-card"
import { Instagram, Youtube, Facebook, Twitter } from "lucide-react"

const services = [
  {
    platform: "Instagram",
    icon: Instagram,
    services: [
      {
        type: "Seguidores Premium",
        price: "$29.99",
        quantity: "1,000 seguidores",
        deliveryTime: "3-5 días",
        description: "Seguidores reales y activos con perfiles completos. Garantía de retención del 90%.",
        features: ["Perfiles reales", "Entrega gradual", "Garantía 30 días"],
      },
      {
        type: "Likes en Posts",
        price: "$9.99",
        quantity: "500 likes",
        deliveryTime: "1-2 horas",
        description: "Likes instantáneos de cuentas reales para aumentar tu engagement.",
        features: ["Entrega rápida", "Cuentas verificadas", "Sin contraseña"],
      },
      {
        type: "Visualizaciones Stories",
        price: "$14.99",
        quantity: "5,000 views",
        deliveryTime: "30 minutos",
        description: "Aumenta la visibilidad de tus historias con visualizaciones orgánicas.",
        features: ["Inicio inmediato", "Tráfico orgánico", "Seguro 100%"],
      },
    ],
  },
  {
    platform: "TikTok",
    icon: Youtube,
    services: [
      {
        type: "Seguidores TikTok",
        price: "$24.99",
        quantity: "1,000 seguidores",
        deliveryTime: "2-4 días",
        description: "Seguidores reales que interactúan con tu contenido.",
        features: ["Usuarios activos", "Crecimiento natural", "Soporte 24/7"],
      },
      {
        type: "Visualizaciones Video",
        price: "$19.99",
        quantity: "10,000 views",
        deliveryTime: "1-3 horas",
        description: "Impulsa tus videos al algoritmo con visualizaciones reales.",
        features: ["Retención alta", "Tráfico real", "Entrega rápida"],
      },
      {
        type: "Likes en Videos",
        price: "$12.99",
        quantity: "1,000 likes",
        deliveryTime: "2-4 horas",
        description: "Likes de cuentas reales para mejorar tu engagement rate.",
        features: ["Perfiles reales", "Sin bots", "Garantizado"],
      },
    ],
  },
  {
    platform: "YouTube",
    icon: Youtube,
    services: [
      {
        type: "Suscriptores",
        price: "$49.99",
        quantity: "1,000 suscriptores",
        deliveryTime: "5-7 días",
        description: "Suscriptores reales que ayudan a monetizar tu canal.",
        features: ["Cuentas reales", "Retención garantizada", "Cumple políticas"],
      },
      {
        type: "Visualizaciones",
        price: "$34.99",
        quantity: "10,000 views",
        deliveryTime: "3-5 días",
        description: "Visualizaciones de alta retención para mejorar tu ranking.",
        features: ["Alta retención", "Tráfico orgánico", "Seguro para AdSense"],
      },
    ],
  },
  {
    platform: "Facebook",
    icon: Facebook,
    services: [
      {
        type: "Seguidores Página",
        price: "$27.99",
        quantity: "1,000 seguidores",
        deliveryTime: "3-5 días",
        description: "Seguidores reales para tu página de negocio.",
        features: ["Perfiles activos", "Entrega gradual", "Soporte incluido"],
      },
      {
        type: "Likes en Posts",
        price: "$11.99",
        quantity: "500 likes",
        deliveryTime: "2-4 horas",
        description: "Aumenta el alcance de tus publicaciones con likes reales.",
        features: ["Usuarios reales", "Entrega rápida", "Seguro"],
      },
    ],
  },
  {
    platform: "Twitter/X",
    icon: Twitter,
    services: [
      {
        type: "Seguidores",
        price: "$32.99",
        quantity: "1,000 seguidores",
        deliveryTime: "4-6 días",
        description: "Seguidores reales y activos para tu perfil.",
        features: ["Cuentas verificadas", "Entrega natural", "Garantía"],
      },
      {
        type: "Retweets",
        price: "$15.99",
        quantity: "500 retweets",
        deliveryTime: "1-3 horas",
        description: "Amplifica tu mensaje con retweets de cuentas reales.",
        features: ["Alcance ampliado", "Usuarios activos", "Rápido"],
      },
    ],
  },
]

export function PricingGrid() {
  return (
    <section id="precios" className="border-t border-border bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">Servicios y Precios</h2>
          <p className="text-lg text-muted-foreground">
            Elige el servicio perfecto para hacer crecer tu presencia en redes sociales
          </p>
        </div>
        <div className="space-y-16">
          {services.map((platform) => (
            <div key={platform.platform}>
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <platform.icon className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-semibold">{platform.platform}</h3>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {platform.services.map((service, index) => (
                  <ServiceCard key={index} {...service} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
