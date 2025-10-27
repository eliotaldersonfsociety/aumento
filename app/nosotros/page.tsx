"use client"

import { useState } from "react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function AboutUsPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Mensaje enviado:", formData)
    alert("✅ Tu mensaje ha sido enviado correctamente. ¡Gracias por contactarnos!")
    setFormData({ name: "", email: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-t from-[#fc79fc] via-[#fff3a8] to-[#77b6f5] flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-white">
          {/* Título */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 p-6">
            Sobre Nosotros
          </h1>

          {/* Imagen + Texto */}
          <div className="glass-card p-6 md:p-8 rounded-2xl space-y-8">
            <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden">
              <Image
                src="/marketing.jpg"
                alt="Nuestro equipo"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="space-y-6 leading-relaxed">
              <p>
                Somos un equipo apasionado por el marketing digital y la optimización de presencia en línea.
                Nuestra misión es ayudar a personas, creadores y marcas a alcanzar su máximo potencial
                en redes sociales, mediante herramientas modernas, seguras y transparentes.
              </p>

              <p>
                Desde nuestros inicios, hemos trabajado con compromiso y ética, priorizando resultados reales
                y sostenibles. Creemos que el crecimiento digital debe ser accesible para todos, y por eso
                ofrecemos soluciones que se adaptan a cada tipo de proyecto, sin complicaciones ni riesgos.
              </p>

              <p>
                Cada servicio que ofrecemos está respaldado por tecnología, análisis y una atención personalizada.
                Nos motiva ver crecer a nuestros clientes y acompañarlos en cada paso hacia el éxito digital.
              </p>
            </div>
          </div>

          {/* Sección de contacto */}
          <div className="glass-card p-6 md:p-8 mt-12 rounded-2xl space-y-6">
            <h2 className="text-2xl font-semibold text-center mb-4">Contáctanos</h2>
            <p className="text-center text-white/90">
              ¿Tienes dudas, sugerencias o quieres trabajar con nosotros?
              Completa el siguiente formulario o escríbenos a:{" "}
              <strong>soporte@tuservicio.com</strong>
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto mt-6">
              <Input
                name="name"
                type="text"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <Input
                name="email"
                type="email"
                placeholder="Tu correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Textarea
                name="message"
                placeholder="Escribe tu mensaje aquí..."
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
              />
              <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">
                Enviar mensaje
              </Button>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
