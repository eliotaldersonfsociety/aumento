import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#fc79fc] via-[#fff3a8] to-[#77b6f5] flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center pt-8">
            Términos de Servicio
          </h1>

          <div className="glass-card p-6 md:p-8 text-white leading-relaxed whitespace-pre-wrap space-y-6">
            <p>
              Bienvenido a nuestra plataforma de marketing digital y aumento de seguidores. 
              Al acceder o utilizar nuestros servicios, usted acepta los presentes Términos de Servicio. 
              Le recomendamos leerlos detenidamente antes de realizar cualquier pedido o usar nuestro sitio web.
            </p>

            <h2 className="text-xl font-semibold mt-6">1. Descripción del servicio</h2>
            <p>
              Ofrecemos herramientas y servicios destinados a mejorar la presencia en línea, 
              aumentar la visibilidad y optimizar el crecimiento orgánico en plataformas como 
              Instagram, TikTok, YouTube, Facebook, X (Twitter) y otras redes sociales.  
              <br />
              No estamos afiliados, patrocinados ni respaldados por ninguna de estas plataformas.
            </p>

            <h2 className="text-xl font-semibold mt-6">2. Uso aceptable</h2>
            <p>
              Al utilizar nuestros servicios, usted se compromete a:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>No utilizar la plataforma con fines ilícitos o fraudulentos.</li>
              <li>No violar los Términos de Uso de ninguna red social.</li>
              <li>No interferir con la seguridad, funcionamiento o integridad del servicio.</li>
              <li>Proporcionar información veraz y actualizada en todo momento.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">3. Responsabilidad del usuario</h2>
            <p>
              Usted es responsable del uso que haga de su cuenta y de mantener la confidencialidad 
              de sus credenciales. No compartimos, solicitamos ni almacenamos contraseñas de redes sociales.  
              Toda interacción con las plataformas se realiza mediante métodos seguros y automatizados.
            </p>

            <h2 className="text-xl font-semibold mt-6">4. Resultados y limitaciones</h2>
            <p>
              Si bien nuestros servicios están diseñados para mejorar la visibilidad, 
              el crecimiento en redes sociales depende de múltiples factores externos, 
              como los algoritmos, la actividad del usuario y la competencia.  
              <br />
              Por tanto, no garantizamos resultados específicos ni permanentes.
            </p>

            <h2 className="text-xl font-semibold mt-6">5. Pagos y reembolsos</h2>
            <p>
              Todos los pagos se procesan de forma segura a través de los medios autorizados en la plataforma.  
              Una vez iniciado un pedido, no se ofrecen reembolsos salvo en casos de error técnico comprobado 
              o incumplimiento del servicio por nuestra parte.
            </p>

            <h2 className="text-xl font-semibold mt-6">6. Suspensión del servicio</h2>
            <p>
              Nos reservamos el derecho de suspender o cancelar cualquier cuenta o pedido que incurra en 
              prácticas fraudulentas, abuso del sistema o incumplimiento de estos Términos.
            </p>

            <h2 className="text-xl font-semibold mt-6">7. Propiedad intelectual</h2>
            <p>
              Todos los derechos sobre el contenido, diseño, logotipos y funcionalidades del sitio 
              pertenecen exclusivamente a nuestra empresa. Queda prohibida su reproducción o distribución sin autorización previa.
            </p>

            <h2 className="text-xl font-semibold mt-6">8. Exoneración de responsabilidad</h2>
            <p>
              No nos hacemos responsables de la suspensión, bloqueo o eliminación de cuentas en redes sociales 
              como consecuencia del mal uso del servicio o del incumplimiento de las políticas de dichas plataformas.
            </p>

            <h2 className="text-xl font-semibold mt-6">9. Modificaciones</h2>
            <p>
              Nos reservamos el derecho de modificar estos Términos en cualquier momento. 
              Las actualizaciones se publicarán en esta misma página y entrarán en vigor de inmediato.
            </p>

            <h2 className="text-xl font-semibold mt-6">10. Contacto</h2>
            <p>
              Para cualquier duda o solicitud relacionada con estos Términos de Servicio, 
              puede contactarnos al correo electrónico: <strong>soporte@tuservicio.com</strong>
            </p>

            <p className="text-sm opacity-80 mt-8">
              Última actualización: {new Date().toLocaleDateString("es-CO", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
