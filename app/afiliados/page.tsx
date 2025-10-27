import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AfiliadosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#fc79fc] via-[#fff3a8] to-[#77b6f5] flex flex-col">
      <Header />

      <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-5xl mx-auto text-white">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 p-6">
            Programa de Afiliados y Revendedores
          </h1>

          <div className="glass-card p-6 md:p-10 space-y-8 leading-relaxed">
            <p className="text-lg">
              Únete a nuestro <strong>programa de afiliados</strong> y comienza a generar ingresos revendiendo nuestros servicios de marketing digital, crecimiento en redes sociales, seguidores, visitas, suscriptores y mucho más.
            </p>

            <h2 className="text-2xl font-semibold">💼 ¿Cómo funciona?</h2>
            <p>
              Tú vendes los mismos servicios que ofrecemos en nuestra plataforma, pero a un precio mayor.
              Nosotros nos encargamos de procesar los pedidos, la entrega y el soporte técnico.
              Tú solo te ocupas de vender y ganar la diferencia entre tu precio y el nuestro.
            </p>

            <h2 className="text-2xl font-semibold">📊 Ejemplo práctico</h2>
            <p>
              Si un paquete cuesta <strong>$10 USD</strong> en nuestra plataforma y tú lo revendes a <strong>$20 USD</strong>, obtienes una ganancia inmediata de <strong>$10 USD</strong> sin mover un dedo.
              Puedes ofrecer los servicios en tu propia web, redes sociales o incluso a tus clientes actuales.
            </p>

            <h2 className="text-2xl font-semibold">🚀 Beneficios del programa</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Precios mayoristas exclusivos para revendedores.</li>
              <li>Acceso completo a todos nuestros servicios.</li>
              <li>Panel de control simple y automatizado.</li>
              <li>Soporte técnico personalizado.</li>
              <li>Sin inversión inicial ni requisitos mínimos.</li>
            </ul>

            <h2 className="text-2xl font-semibold">📝 Cómo empezar</h2>
            <p>
              Solo necesitas registrarte como afiliado y solicitar acceso a nuestros precios mayoristas.  
              Una vez aprobado, podrás empezar a ofrecer los servicios a tus propios clientes con tu marca o bajo la nuestra.
            </p>

            <div className="text-center mt-10">
                <a
                    href="https://wa.me/573001234567?text=Hola%20👋%20Estoy%20interesado%20en%20el%20programa%20de%20afiliados%20y%20quiero%20más%20información."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl transition shadow-md"
                >
                    💬 Programa de Afiliados
                </a>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
