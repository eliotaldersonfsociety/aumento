"use client"

import { useState, useEffect } from "react"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useTranslation } from "react-i18next"
import {
  Instagram,
  Youtube,
  Facebook,
  Twitter,
  Clock,
  DollarSign,
  Package,
  CheckCircle2,
  MessageCircle,
  Music,
  Radio,
  Linkedin,
  Hash,
  ImageIcon,
  Video,
  Globe,
  Star,
  Smartphone,
  MapPin,
  Mail,
} from "lucide-react"
import { getSettings } from "@/app/actions/settings"

const servicesData = {
  Instagram: {
    icon: Instagram,
    types: {
      "Seguidores Latinos": {
        pricePerUnit: 0.03,
        minQuantity: 100,
        maxQuantity: 50000,
        deliveryTime: "3-5 días",
        description: "Seguidores reales y activos con perfiles completos. Garantía de retención del 90%.",
        features: ["Perfiles reales", "Entrega gradual", "Garantía 30 días"],
      },
      "Likes en Posts": {
        pricePerUnit: 0.02,
        minQuantity: 50,
        maxQuantity: 10000,
        deliveryTime: "1-2 horas",
        description: "Likes instantáneos de cuentas reales para aumentar tu engagement.",
        features: ["Entrega rápida", "Cuentas verificadas", "Sin contraseña"],
      },
      "Visualizaciones Stories": {
        pricePerUnit: 0.003,
        minQuantity: 500,
        maxQuantity: 100000,
        deliveryTime: "30 minutos",
        description: "Aumenta la visibilidad de tus historias con visualizaciones orgánicas.",
        features: ["Inicio inmediato", "Tráfico orgánico", "Seguro 100%"],
      },
    },
  },
  TikTok: {
    icon: Video,
    types: {
      "Seguidores TikTok": {
        pricePerUnit: 0.025,
        minQuantity: 100,
        maxQuantity: 50000,
        deliveryTime: "2-4 días",
        description: "Seguidores reales que interactúan con tu contenido.",
        features: ["Usuarios activos", "Crecimiento natural", "Soporte 24/7"],
      },
      "Visualizaciones Video": {
        pricePerUnit: 0.002,
        minQuantity: 1000,
        maxQuantity: 500000,
        deliveryTime: "1-3 horas",
        description: "Impulsa tus videos al algoritmo con visualizaciones reales.",
        features: ["Retención alta", "Tráfico real", "Entrega rápida"],
      },
      "Likes en Videos": {
        pricePerUnit: 0.013,
        minQuantity: 100,
        maxQuantity: 20000,
        deliveryTime: "2-4 horas",
        description: "Likes de cuentas reales para mejorar tu engagement rate.",
        features: ["Perfiles reales", "Sin bots", "Garantizado"],
      },
    },
  },
  YouTube: {
    icon: Youtube,
    types: {
      Suscriptores: {
        pricePerUnit: 0.05,
        minQuantity: 100,
        maxQuantity: 20000,
        deliveryTime: "5-7 días",
        description: "Suscriptores reales que ayudan a monetizar tu canal.",
        features: ["Cuentas reales", "Retención garantizada", "Cumple políticas"],
      },
      Visualizaciones: {
        pricePerUnit: 0.0035,
        minQuantity: 1000,
        maxQuantity: 100000,
        deliveryTime: "3-5 días",
        description: "Visualizaciones de alta retención para mejorar tu ranking.",
        features: ["Alta retención", "Tráfico orgánico", "Seguro para AdSense"],
      },
    },
  },
  Facebook: {
    icon: Facebook,
    types: {
      "Seguidores Página": {
        pricePerUnit: 0.028,
        minQuantity: 100,
        maxQuantity: 50000,
        deliveryTime: "3-5 días",
        description: "Seguidores reales para tu página de negocio.",
        features: ["Perfiles activos", "Entrega gradual", "Soporte incluido"],
      },
      "Likes en Posts": {
        pricePerUnit: 0.024,
        minQuantity: 50,
        maxQuantity: 10000,
        deliveryTime: "2-4 horas",
        description: "Aumenta el alcance de tus publicaciones con likes reales.",
        features: ["Usuarios reales", "Entrega rápida", "Seguro"],
      },
    },
  },
  "Twitter/X": {
    icon: Twitter,
    types: {
      Seguidores: {
        pricePerUnit: 0.033,
        minQuantity: 100,
        maxQuantity: 30000,
        deliveryTime: "4-6 días",
        description: "Seguidores reales y activos para tu perfil.",
        features: ["Cuentas verificadas", "Entrega natural", "Garantía"],
      },
      Retweets: {
        pricePerUnit: 0.032,
        minQuantity: 50,
        maxQuantity: 5000,
        deliveryTime: "1-3 horas",
        description: "Amplifica tu mensaje con retweets de cuentas reales.",
        features: ["Alcance ampliado", "Usuarios activos", "Rápido"],
      },
    },
  },
  Telegram: {
    icon: MessageCircle,
    types: {
      "Miembros Canal": {
        pricePerUnit: 0.04,
        minQuantity: 100,
        maxQuantity: 30000,
        deliveryTime: "3-6 días",
        description: "Miembros reales para tu canal o grupo de Telegram.",
        features: ["Usuarios activos", "Retención alta", "Entrega gradual"],
      },
      "Visualizaciones Posts": {
        pricePerUnit: 0.005,
        minQuantity: 500,
        maxQuantity: 50000,
        deliveryTime: "1-2 horas",
        description: "Aumenta las visualizaciones de tus publicaciones.",
        features: ["Tráfico real", "Entrega rápida", "Seguro"],
      },
    },
  },
  WhatsApp: {
    icon: MessageCircle,
    types: {
      "Miembros Grupo": {
        pricePerUnit: 0.045,
        minQuantity: 50,
        maxQuantity: 10000,
        deliveryTime: "4-7 días",
        description: "Miembros activos para tu grupo de WhatsApp.",
        features: ["Usuarios reales", "Participación activa", "Soporte incluido"],
      },
    },
  },
  Spotify: {
    icon: Music,
    types: {
      Seguidores: {
        pricePerUnit: 0.035,
        minQuantity: 100,
        maxQuantity: 20000,
        deliveryTime: "3-5 días",
        description: "Seguidores reales para tu perfil de artista en Spotify.",
        features: ["Cuentas verificadas", "Retención garantizada", "Orgánico"],
      },
      Reproducciones: {
        pricePerUnit: 0.004,
        minQuantity: 1000,
        maxQuantity: 100000,
        deliveryTime: "2-4 días",
        description: "Reproducciones reales que cuentan para las estadísticas.",
        features: ["Tráfico real", "Cumple políticas", "Alta retención"],
      },
    },
  },
  Twitch: {
    icon: Radio,
    types: {
      Seguidores: {
        pricePerUnit: 0.038,
        minQuantity: 100,
        maxQuantity: 15000,
        deliveryTime: "3-5 días",
        description: "Seguidores reales para tu canal de Twitch.",
        features: ["Usuarios activos", "Entrega natural", "Soporte 24/7"],
      },
      "Espectadores en Vivo": {
        pricePerUnit: 0.15,
        minQuantity: 10,
        maxQuantity: 500,
        deliveryTime: "Inmediato",
        description: "Espectadores en tiempo real durante tus transmisiones.",
        features: ["Tiempo real", "Usuarios reales", "Boost al algoritmo"],
      },
    },
  },
  Kick: {
    icon: Radio,
    types: {
      Seguidores: {
        pricePerUnit: 0.042,
        minQuantity: 100,
        maxQuantity: 10000,
        deliveryTime: "3-6 días",
        description: "Seguidores para tu canal de Kick.",
        features: ["Cuentas reales", "Crecimiento orgánico", "Garantía"],
      },
    },
  },
  Kwai: {
    icon: Video,
    types: {
      Seguidores: {
        pricePerUnit: 0.028,
        minQuantity: 100,
        maxQuantity: 20000,
        deliveryTime: "3-5 días",
        description: "Seguidores activos para tu perfil de Kwai.",
        features: ["Usuarios reales", "Entrega gradual", "Soporte incluido"],
      },
      Visualizaciones: {
        pricePerUnit: 0.003,
        minQuantity: 1000,
        maxQuantity: 100000,
        deliveryTime: "1-3 horas",
        description: "Visualizaciones reales para tus videos.",
        features: ["Tráfico orgánico", "Entrega rápida", "Seguro"],
      },
    },
  },
  LinkedIn: {
    icon: Linkedin,
    types: {
      "Seguidores Perfil": {
        pricePerUnit: 0.055,
        minQuantity: 100,
        maxQuantity: 10000,
        deliveryTime: "5-7 días",
        description: "Seguidores profesionales para tu perfil de LinkedIn.",
        features: ["Perfiles profesionales", "Networking real", "Entrega gradual"],
      },
      Conexiones: {
        pricePerUnit: 0.06,
        minQuantity: 50,
        maxQuantity: 5000,
        deliveryTime: "5-8 días",
        description: "Conexiones profesionales de primer nivel.",
        features: ["Perfiles verificados", "Profesionales activos", "Red ampliada"],
      },
    },
  },
  Discord: {
    icon: Hash,
    types: {
      "Miembros Servidor": {
        pricePerUnit: 0.04,
        minQuantity: 100,
        maxQuantity: 20000,
        deliveryTime: "3-6 días",
        description: "Miembros activos para tu servidor de Discord.",
        features: ["Usuarios reales", "Participación activa", "Retención alta"],
      },
    },
  },
  Pinterest: {
    icon: ImageIcon,
    types: {
      Seguidores: {
        pricePerUnit: 0.032,
        minQuantity: 100,
        maxQuantity: 20000,
        deliveryTime: "3-5 días",
        description: "Seguidores reales para tu perfil de Pinterest.",
        features: ["Cuentas activas", "Entrega gradual", "Garantía"],
      },
      Repins: {
        pricePerUnit: 0.025,
        minQuantity: 50,
        maxQuantity: 10000,
        deliveryTime: "2-4 horas",
        description: "Repins para aumentar el alcance de tus pines.",
        features: ["Usuarios reales", "Entrega rápida", "Orgánico"],
      },
    },
  },
  Vimeo: {
    icon: Video,
    types: {
      Seguidores: {
        pricePerUnit: 0.048,
        minQuantity: 100,
        maxQuantity: 10000,
        deliveryTime: "4-6 días",
        description: "Seguidores para tu canal de Vimeo.",
        features: ["Creadores reales", "Comunidad activa", "Soporte"],
      },
      Visualizaciones: {
        pricePerUnit: 0.006,
        minQuantity: 500,
        maxQuantity: 50000,
        deliveryTime: "2-4 días",
        description: "Visualizaciones de alta calidad para tus videos.",
        features: ["Alta retención", "Tráfico real", "Seguro"],
      },
    },
  },
  SoundCloud: {
    icon: Music,
    types: {
      Seguidores: {
        pricePerUnit: 0.036,
        minQuantity: 100,
        maxQuantity: 15000,
        deliveryTime: "3-5 días",
        description: "Seguidores reales para tu perfil de SoundCloud.",
        features: ["Usuarios activos", "Entrega natural", "Garantía"],
      },
      Reproducciones: {
        pricePerUnit: 0.004,
        minQuantity: 1000,
        maxQuantity: 100000,
        deliveryTime: "2-4 días",
        description: "Reproducciones reales para tus tracks.",
        features: ["Tráfico orgánico", "Alta retención", "Seguro"],
      },
    },
  },
  Snapchat: {
    icon: ImageIcon,
    types: {
      Seguidores: {
        pricePerUnit: 0.037,
        minQuantity: 100,
        maxQuantity: 15000,
        deliveryTime: "3-6 días",
        description: "Seguidores activos para tu perfil de Snapchat.",
        features: ["Usuarios reales", "Entrega gradual", "Soporte incluido"],
      },
    },
  },
  Dribbble: {
    icon: ImageIcon,
    types: {
      Seguidores: {
        pricePerUnit: 0.052,
        minQuantity: 50,
        maxQuantity: 5000,
        deliveryTime: "4-7 días",
        description: "Seguidores de diseñadores para tu perfil de Dribbble.",
        features: ["Diseñadores reales", "Comunidad activa", "Networking"],
      },
      Likes: {
        pricePerUnit: 0.045,
        minQuantity: 50,
        maxQuantity: 5000,
        deliveryTime: "2-4 horas",
        description: "Likes para tus diseños y proyectos.",
        features: ["Usuarios reales", "Entrega rápida", "Visibilidad"],
      },
    },
  },
  Threads: {
    icon: Hash,
    types: {
      Seguidores: {
        pricePerUnit: 0.031,
        minQuantity: 100,
        maxQuantity: 30000,
        deliveryTime: "3-5 días",
        description: "Seguidores reales para tu perfil de Threads.",
        features: ["Usuarios activos", "Entrega natural", "Garantía"],
      },
      Likes: {
        pricePerUnit: 0.022,
        minQuantity: 50,
        maxQuantity: 10000,
        deliveryTime: "1-3 horas",
        description: "Likes para tus publicaciones en Threads.",
        features: ["Entrega rápida", "Cuentas reales", "Seguro"],
      },
    },
  },
  Tidal: {
    icon: Music,
    types: {
      Seguidores: {
        pricePerUnit: 0.042,
        minQuantity: 100,
        maxQuantity: 10000,
        deliveryTime: "4-6 días",
        description: "Seguidores para tu perfil de artista en Tidal.",
        features: ["Usuarios premium", "Entrega gradual", "Garantía"],
      },
      Reproducciones: {
        pricePerUnit: 0.006,
        minQuantity: 500,
        maxQuantity: 50000,
        deliveryTime: "3-5 días",
        description: "Reproducciones de alta calidad para tus tracks.",
        features: ["Audio HiFi", "Tráfico real", "Cumple políticas"],
      },
    },
  },
  iTunes: {
    icon: Music,
    types: {
      Descargas: {
        pricePerUnit: 0.12,
        minQuantity: 100,
        maxQuantity: 10000,
        deliveryTime: "5-7 días",
        description: "Descargas reales para tu música en iTunes.",
        features: ["Compras reales", "Ranking mejorado", "Certificado"],
      },
    },
  },
  "Tráfico Web": {
    icon: Globe,
    types: {
      "Visitas al Sitio": {
        pricePerUnit: 0.01,
        minQuantity: 1000,
        maxQuantity: 100000,
        deliveryTime: "2-5 días",
        description: "Tráfico real y orgánico para tu sitio web.",
        features: ["Tráfico real", "Geo-targeting", "Analytics compatible"],
      },
    },
  },
  "Reseñas Google": {
    icon: Star,
    types: {
      "Reseñas Positivas": {
        pricePerUnit: 2.5,
        minQuantity: 5,
        maxQuantity: 100,
        deliveryTime: "7-10 días",
        description: "Reseñas auténticas de 5 estrellas para tu negocio en Google.",
        features: ["Perfiles verificados", "Reseñas detalladas", "Permanentes"],
      },
    },
  },
  "Apps Android": {
    icon: Smartphone,
    types: {
      Instalaciones: {
        pricePerUnit: 0.12,
        minQuantity: 100,
        maxQuantity: 10000,
        deliveryTime: "5-7 días",
        description: "Instalaciones reales para tu aplicación Android.",
        features: ["Usuarios reales", "Retención alta", "Ranking mejorado"],
      },
      "Reseñas 5 Estrellas": {
        pricePerUnit: 1.8,
        minQuantity: 10,
        maxQuantity: 500,
        deliveryTime: "7-10 días",
        description: "Reseñas positivas para tu app en Google Play.",
        features: ["Cuentas verificadas", "Comentarios detallados", "Permanentes"],
      },
    },
  },
  "Apps iOS": {
    icon: Smartphone,
    types: {
      Instalaciones: {
        pricePerUnit: 0.15,
        minQuantity: 100,
        maxQuantity: 10000,
        deliveryTime: "5-8 días",
        description: "Instalaciones reales para tu aplicación iOS.",
        features: ["Usuarios reales", "Retención alta", "App Store ranking"],
      },
      "Reseñas 5 Estrellas": {
        pricePerUnit: 2.2,
        minQuantity: 10,
        maxQuantity: 500,
        deliveryTime: "7-12 días",
        description: "Reseñas positivas para tu app en App Store.",
        features: ["Cuentas reales", "Comentarios auténticos", "Permanentes"],
      },
    },
  },
  TripAdvisor: {
    icon: MapPin,
    types: {
      "Reseñas Positivas": {
        pricePerUnit: 3.5,
        minQuantity: 5,
        maxQuantity: 100,
        deliveryTime: "10-14 días",
        description: "Reseñas auténticas para tu negocio en TripAdvisor.",
        features: ["Perfiles verificados", "Reseñas detalladas", "Fotos incluidas"],
      },
    },
  },
  "Reseñas Gmail": {
    icon: Mail,
    types: {
      "Reseñas Positivas": {
        pricePerUnit: 2.8,
        minQuantity: 5,
        maxQuantity: 100,
        deliveryTime: "7-10 días",
        description: "Reseñas positivas desde cuentas Gmail verificadas.",
        features: ["Cuentas reales", "Comentarios personalizados", "Permanentes"],
      },
    },
  },
}

export function PricingSelector() {
  const { t } = useTranslation();
  const [selectedService, setSelectedService] = useState<string>("")
  const [selectedType, setSelectedType] = useState<string>("")
  const [quantity, setQuantity] = useState<string>("")
  const [usdToCop, setUsdToCop] = useState<number>(4200)

  useEffect(() => {
    const fetchSettings = async () => {
      const settings = await getSettings()
      setUsdToCop(Number(settings.exchangeRate))
    }
    fetchSettings()
  }, [])

  const serviceKeys = Object.keys(servicesData)
  const typeKeys = selectedService ? Object.keys(servicesData[selectedService as keyof typeof servicesData].types) : []
  interface ServiceDetail {
    pricePerUnit: number;
    minQuantity: number;
    maxQuantity: number;
    deliveryTime: string;
    description: string;
    features: string[];
  }

  const selectedData: ServiceDetail | null =
    selectedService && selectedType
      ? servicesData[selectedService as keyof typeof servicesData].types[
          selectedType as keyof (typeof servicesData)[keyof typeof servicesData]["types"]
        ] as ServiceDetail
      : null

  const ServiceIcon = selectedService ? servicesData[selectedService as keyof typeof servicesData].icon : null

  const quantityNum = Number.parseInt(quantity) || 0
  const totalPriceUSD = selectedData && quantityNum > 0 ? (selectedData.pricePerUnit * quantityNum).toFixed(2) : "0.00"
  const totalPriceCOP =
    selectedData && quantityNum > 0
      ? Math.round(selectedData.pricePerUnit * quantityNum * usdToCop).toLocaleString("es-CO")
      : "0"
  const isValidQuantity =
    selectedData && quantityNum >= selectedData.minQuantity && quantityNum <= selectedData.maxQuantity

  return (
    <section id="precios" className="border-t border-border/50 py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight md:text-4xl">{t("pricing.title")}</h2>
          <p className="text-pretty text-lg text-muted-foreground">
            {t("pricing.subtitle")}
          </p>
        </div>

        <div className="glass border-white rounded-2xl p-6 md:p-8">
          <div className="space-y-6">
            {/* Selector de Servicio */}
            <div className="space-y-2">
              <Label htmlFor="service" className="font-semibold text-white">
                {t("pricing.selectService")}
              </Label>
              <Select
                value={selectedService}
                onValueChange={(value) => {
                  setSelectedService(value)
                  setSelectedType("")
                  setQuantity("")
                }}
              >
                <SelectTrigger id="service" className="bg-white/50 h-12 border-white text-black">
                  <SelectValue placeholder="Elige una plataforma..." className="text-black" />
                </SelectTrigger>
                <SelectContent>
                  {serviceKeys.map((service) => {
                    const Icon = servicesData[service as keyof typeof servicesData].icon
                    return (
                      <SelectItem key={service} value={service}>
                        <div className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-black" />
                          <span className="text-black">{service}</span>
                        </div>
                      </SelectItem>
                    )
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Selector de Tipo */}
            {selectedService && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label htmlFor="type" className="text-white font-semibold">
                  {t("pricing.selectType")}
                </Label>
                <Select
                  value={selectedType}
                  onValueChange={(value) => {
                    setSelectedType(value)
                    setQuantity("")
                  }}
                >
                  <SelectTrigger id="type" className="bg-white/50 h-12 border-white text-black">
                    <SelectValue placeholder="Elige el tipo de servicio..." className="text-black" />
                  </SelectTrigger>
                  <SelectContent>
                    {typeKeys.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {selectedType && selectedData && (
              <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label htmlFor="quantity" className="text-white font-semibold">
                  {t("pricing.enterQuantity")}
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder={`Mínimo ${selectedData.minQuantity}, Máximo ${selectedData.maxQuantity.toLocaleString()}`}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  min={selectedData.minQuantity}
                  max={selectedData.maxQuantity}
                  className="bg-white/50 border-white h-12 text-black"
                />
                {quantity && !isValidQuantity && (
                  <p className="text-sm text-destructive">
                    La cantidad debe estar entre {selectedData.minQuantity.toLocaleString()} y{" "}
                    {selectedData.maxQuantity.toLocaleString()}
                  </p>
                )}
              </div>
            )}

            {/* Información del Servicio Seleccionado */}
            {selectedData && ServiceIcon && quantity && isValidQuantity && (
              <div className="mt-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex items-center gap-3 border-t border-border/50 pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white">
                    <ServiceIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{selectedType}</h3>
                    <p className="text-sm text-muted-foreground">{selectedService}</p>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="glass flex items-start gap-3 rounded-xl p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-light text-white">{t("pricing.quantity")}</p>
                      <p className="text-xl font-bold text-white">{quantityNum.toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="glass flex items-start gap-3 rounded-xl p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
                      <DollarSign className="h-5 w-5" />
                    </div>
                    <div className="w-full">
                      <p className="text-sm font-light text-white">{t("pricing.totalCost")}</p>
                      <p className="text-lg font-bold text-white">${totalPriceUSD} USD</p>
                      <p className="text-sm font-light text-white">${totalPriceCOP} COP</p>
                    </div>
                  </div>

                  <div className="glass flex items-start gap-3 rounded-xl p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20 text-white">
                      <Clock className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-light text-white">{t("pricing.time")}</p>
                      <p className="text-xl font-bold text-white">{selectedData.deliveryTime}</p>
                    </div>
                  </div>
                </div>

                {/* Descripción */}
                <div className="glass rounded-xl p-6">
                  <h4 className="mb-3 font-bold text-white">{t("pricing.serviceDescription")}</h4>
                  <p className="mb-4 text-pretty leading-relaxed text-white">{selectedData.description}</p>
                  <div className="space-y-2">
                    {selectedData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-white/20" />
                        <span className="text-sm text-white font-extralight">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
