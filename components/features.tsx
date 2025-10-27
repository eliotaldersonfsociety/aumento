"use client"

import { Shield, Zap, HeadphonesIcon, TrendingUp } from "lucide-react"
import { useTranslation } from "react-i18next"

export function Features() {
  const { t } = useTranslation();

  const features = [
    {
      icon: Zap,
      title: t("features.fastDelivery.title"),
      description: t("features.fastDelivery.description"),
    },
    {
      icon: Shield,
      title: t("features.secure.title"),
      description: t("features.secure.description"),
    },
    {
      icon: TrendingUp,
      title: t("features.realGrowth.title"),
      description: t("features.realGrowth.description"),
    },
    {
      icon: HeadphonesIcon,
      title: t("features.support.title"),
      description: t("features.support.description"),
    },
  ]

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">{t("features.title")}</h2>
        <p className="text-lg text-muted-foreground">{t("features.subtitle")}</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20">
              <feature.icon className="h-8 w-8 text-white" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">{feature.title}</h3>
            <p className="text-muted-foreground text-pretty">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
