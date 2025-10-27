import SmallLogo from "@/public/logo/smalllogo"
import { Instagram, Facebook, Twitter, Youtube, Music } from "lucide-react"
import { useTranslation } from "react-i18next"

export function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Logo y descripción */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <SmallLogo />
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {t("footer.description")}
            </p>

            {/* Redes sociales */}
            <div className="flex gap-4 mt-4">
              <a
                href="https://www.instagram.com/aumentodeseguidores"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-pink-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>

              <a
                href="https://www.facebook.com/aumentodeseguidores"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-blue-600 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>

              <a
                href="https://x.com/aumentodeseguidores"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-sky-400 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>

              <a
                href="https://www.tiktok.com/@aumentodeseguidores"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-black transition-colors"
              >
                <Music className="w-5 h-5" />
              </a>

              <a
                href="https://www.youtube.com/@aumentodeseguidores"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-red-500 transition-colors"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h4 className="mb-4 font-semibold">{t("footer.services")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#pricing" className="hover:text-foreground transition-colors">
                  {t("footer.instagram")}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-foreground transition-colors">
                  {t("footer.tiktok")}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-foreground transition-colors">
                  {t("footer.youtube")}
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-foreground transition-colors">
                  {t("footer.facebook")}
                </a>
              </li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="mb-4 font-semibold">{t("footer.about")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/nosotros" className="hover:text-foreground transition-colors">
                  {t("footer.aboutUs")}
                </a>
              </li>
              <li>
                <a href="/blog" className="hover:text-foreground transition-colors">
                  {t("footer.blog")}
                </a>
              </li>
              <li>
                <a href="/contacto" className="hover:text-foreground transition-colors">
                  {t("footer.contact")}
                </a>
              </li>
              <li>
                <a href="/afiliados" className="hover:text-foreground transition-colors">
                  {t("footer.affiliates")}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-4 font-semibold">{t("footer.legal")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/terms" className="hover:text-foreground transition-colors">
                  {t("footer.terms")}
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-foreground transition-colors">
                  {t("footer.privacy")}
                </a>
              </li>
              <li>
                <a href="/reembolso" className="hover:text-foreground transition-colors">
                  {t("footer.refund")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  )
}
