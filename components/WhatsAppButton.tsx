import { MessageCircle } from "lucide-react"
import { motion } from "framer-motion"

export function WhatsAppButton() {
  return (
    <motion.a
      href="https://wa.me/573001112233?text=¡Hola!%20Me%20interesa%20saber%20más%20sobre%20sus%20servicios."
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-white shadow-lg"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline text-sm font-medium">WhatsApp</span>
      <span className="absolute bottom-14 right-0 hidden rounded-md bg-muted/80 px-3 py-1 text-xs text-white backdrop-blur-md group-hover:block">
        ¡Chatea con nosotros!
      </span>
    </motion.a>
  )
}
