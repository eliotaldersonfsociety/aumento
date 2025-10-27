import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-t from-[#fc79fc] via-[#fff3a8] to-[#77b6f5] flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center pt-8">
            Política de Reembolso
          </h1>

          <div className="glass-card p-6 md:p-8 text-white leading-relaxed whitespace-pre-wrap space-y-6">
            <p>
              En nuestra plataforma, la satisfacción del cliente es una prioridad. 
              Sin embargo, debido a la naturaleza digital y automatizada de nuestros servicios, 
              aplican ciertas condiciones para la realización de reembolsos.
            </p>

            <h2 className="text-xl font-semibold mt-6">1. Condiciones generales</h2>
            <p>
              Todos los pedidos son procesados automáticamente después de la confirmación del pago. 
              Una vez iniciado el servicio, no es posible cancelarlo ni solicitar reembolso completo, 
              salvo en los casos establecidos en esta política.
            </p>

            <h2 className="text-xl font-semibold mt-6">2. Casos elegibles para reembolso</h2>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Error técnico comprobado en la ejecución del servicio.</li>
              <li>El pedido no fue entregado en el tiempo estimado y no se encuentra en proceso.</li>
              <li>Duplicidad en el pago por error del sistema o del usuario.</li>
              <li>Incumplimiento directo de las condiciones ofrecidas al momento de la compra.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">3. Casos no elegibles para reembolso</h2>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Pedidos completados correctamente según la descripción del servicio.</li>
              <li>Errores derivados de información incorrecta proporcionada por el cliente.</li>
              <li>Resultados menores a las expectativas del usuario (ya que dependen de factores externos).</li>
              <li>Cancelación voluntaria una vez iniciado el proceso de entrega.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6">4. Procedimiento de solicitud</h2>
            <p>
              Para solicitar un reembolso, debe comunicarse con nuestro equipo de soporte 
              dentro de los <strong>7 días posteriores</strong> a la realización del pedido.  
              <br />
              Es necesario incluir:
            </p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>El número o ID del pedido.</li>
              <li>Comprobante de pago.</li>
              <li>Descripción clara del motivo del reclamo.</li>
            </ul>
            <p>
              Las solicitudes serán evaluadas caso por caso, y la decisión será comunicada 
              por correo electrónico en un plazo máximo de <strong>5 días hábiles</strong>.
            </p>

            <h2 className="text-xl font-semibold mt-6">5. Método de reembolso</h2>
            <p>
              Los reembolsos aprobados se procesarán mediante el mismo método de pago utilizado 
              en la compra original, salvo que se acuerde lo contrario con el cliente.
            </p>

            <h2 className="text-xl font-semibold mt-6">6. Contacto</h2>
            <p>
              Para cualquier consulta o solicitud relacionada con esta política, 
              puede escribirnos al correo electrónico:{" "}
              <strong>soporte@aumentodeseguidores.com</strong>
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
