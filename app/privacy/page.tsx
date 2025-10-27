import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#fc79fc] via-[#fff3a8] to-[#77b6f5] flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center pt-8">
            Política de Privacidad
          </h1>

          <div className="glass-card p-6 md:p-8 text-white leading-relaxed whitespace-pre-wrap space-y-6">
            <p>
              En nuestra plataforma de marketing digital y aumento de seguidores, 
              respetamos la privacidad y protección de los datos personales de nuestros usuarios. 
              Esta Política de Privacidad explica cómo recopilamos, utilizamos y protegemos su información 
              al usar nuestros servicios o acceder a nuestro sitio web.
            </p>

            <h2 className="text-xl font-semibold mt-6">1. Información que recopilamos</h2>
            <p>
              Recopilamos información necesaria para brindar nuestros servicios de forma eficiente y segura.
              Esto puede incluir:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Nombre y dirección de correo electrónico.</li>
              <li>Datos de contacto y credenciales de acceso al sistema (nunca contraseñas de redes sociales).</li>
              <li>Información de pago o facturación procesada mediante pasarelas seguras.</li>
              <li>Datos técnicos como dirección IP, tipo de navegador y sistema operativo.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">2. Uso de la información</h2>
            <p>
              La información recopilada se utiliza con los siguientes fines:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Procesar pedidos y ofrecer los servicios contratados.</li>
              <li>Gestionar cuentas de usuario y autenticación de acceso.</li>
              <li>Mejorar la experiencia y rendimiento de la plataforma.</li>
              <li>Enviar notificaciones, actualizaciones y soporte técnico.</li>
              <li>Cumplir con obligaciones legales o regulatorias aplicables.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">3. Protección de datos</h2>
            <p>
              Implementamos medidas de seguridad técnicas y organizativas para proteger la información 
              frente a accesos no autorizados, pérdida o alteración.  
              El almacenamiento y transmisión de datos se realiza mediante cifrado y protocolos seguros (HTTPS).  
              En ningún caso compartimos, vendemos o alquilamos información personal a terceros.
            </p>

            <h2 className="text-xl font-semibold mt-6">4. Uso de servicios de terceros</h2>
            <p>
              Podemos emplear herramientas de terceros (como proveedores de pago o analítica web) 
              que operan bajo sus propias políticas de privacidad.  
              Recomendamos revisar dichas políticas antes de realizar transacciones o registrar datos en ellas.
            </p>

            <h2 className="text-xl font-semibold mt-6">5. Cookies y tecnologías similares</h2>
            <p>
              Utilizamos cookies para mejorar la experiencia del usuario, personalizar el contenido 
              y analizar el tráfico del sitio.  
              El usuario puede configurar su navegador para rechazar cookies, aunque esto puede afectar 
              el funcionamiento de algunas secciones del sitio.
            </p>

            <h2 className="text-xl font-semibold mt-6">6. Conservación de datos</h2>
            <p>
              Conservamos los datos personales solo durante el tiempo necesario para cumplir 
              con los fines descritos en esta política o según lo exija la ley.  
              Una vez cumplido dicho plazo, los datos se eliminan o anonimizan de forma segura.
            </p>

            <h2 className="text-xl font-semibold mt-6">7. Derechos del usuario</h2>
            <p>
              Usted puede ejercer en cualquier momento sus derechos de acceso, rectificación, 
              actualización o eliminación de sus datos personales.  
              Para hacerlo, puede escribirnos al correo electrónico:{" "}
              <strong>privacidad@tuservicio.com</strong>.
            </p>

            <h2 className="text-xl font-semibold mt-6">8. Servicios de redes sociales</h2>
            <p>
              Nuestros servicios están diseñados para interactuar con plataformas externas 
              como Instagram, TikTok, YouTube, Facebook y otras.  
              No solicitamos contraseñas ni acceso directo a sus cuentas personales.  
              Toda interacción se realiza mediante procesos automatizados seguros y sin afiliación 
              oficial con dichas plataformas.
            </p>

            <h2 className="text-xl font-semibold mt-6">9. Modificaciones de la política</h2>
            <p>
              Nos reservamos el derecho de modificar esta Política de Privacidad en cualquier momento.  
              Las versiones actualizadas se publicarán en esta página con la fecha de la última modificación.
            </p>

            <h2 className="text-xl font-semibold mt-6">10. Contacto</h2>
            <p>
              Si tiene preguntas, inquietudes o solicitudes sobre esta Política de Privacidad, 
              puede contactarnos a través de:
              <br />
              📧 <strong>privacidad@aumentodeseguidores.com</strong>
              <br />
              🌐 <strong>www.aumentodesegudiores.com</strong>
            </p>

            <p className="text-sm opacity-80 mt-8">
              Última actualización:{" "}
              {new Date().toLocaleDateString("es-CO", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
