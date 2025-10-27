"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link";
import { useTranslation } from "react-i18next";

export function Hero() {
  const { t } = useTranslation();

  const mensajes = [
    t("hero.message1"),
    t("hero.message2"),
    t("hero.message3"),
    t("hero.message4"),
    t("hero.message5"),
  ]

  const [index, setIndex] = useState(0)

  // Cambia el mensaje cada 3 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndex((prev) => (prev + 1) % mensajes.length)
    }, 3000)
    return () => clearInterval(intervalo)
  }, [mensajes.length])

  return (
    <section className="relative flex items-center justify-center min-h-[90vh] overflow-hidden">
      {/* Imagen de fondo */}
      <img
        src="/1.webp"
        alt="imagen hero"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/15 to-transparent" />

      {/* Contenido principal */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white pt-50">
        <Badge variant="secondary" className="mb-6 bg-white/20 text-white backdrop-blur-sm animate-pulse">
          {t("hero.badge")}
        </Badge>

        {/* Burbujas dinámicas */}
        <div className="relative h-20 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
              className="inline-block bg-white/20 backdrop-blur-md px-4 py-3 rounded-2xl text-lg text-white shadow-md border border-white/20"
            >
              {mensajes[index]}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Botones */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link href="#pricing">
            <Button size="lg" className="w-full sm:w-auto bg-pink-500 hover:bg-pink-600 text-white animate-bounce">
              {t("hero.pricing")}
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto bg-white/20 border backdrop-blur-md shadow-md border-white/30 !border-b-white"
            >
              {t("nav.register")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
