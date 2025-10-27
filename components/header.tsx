"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Menu, User } from "lucide-react";
import Logo from "@/public/logo/logo";
import SmallLogo from "@/public/logo/smalllogo";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { LanguageSelector } from "@/components/LanguageSelector";
import { useTranslation } from "react-i18next";

interface HeaderProps {
  className?: string; // <-- permite pasar className externo
}

export function Header({ className }: HeaderProps) {
  const { t } = useTranslation();

  return (
    <header
      className={`bg-white/20 backdrop-blur-md rounded-lg shadow-md border-b border-white/30 fixed top-0 left-0 w-full z-50 ${
        className || ""
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2 animate-breathe">
            <Logo />
          </div>

          {/* Navegación escritorio */}
          <nav className="hidden items-center gap-6 md:flex">
            <a
              href="#servicios"
              className="text-sm font-medium text-white hover:bg-white/40 hover:translate-x-4 hover:shadow-md transition-all px-3 py-2 rounded-md"
            >
              {t("nav.services")}
            </a>
            <a
              href="#precios"
              className="text-sm font-medium text-white hover:bg-white/40 hover:translate-x-4 hover:shadow-md transition-all px-3 py-2 rounded-md"
            >
              {t("nav.pricing")}
            </a>
            <a
              href="#faq"
              className="text-sm font-medium text-white hover:bg-white/40 hover:translate-x-4 hover:shadow-md transition-all px-3 py-2 rounded-md"
            >
              {t("nav.faq")}
            </a>
          </nav>

          {/* Botones escritorio */}
          <div className="hidden md:flex items-center gap-3">
            <LanguageSelector />
            <Link href="/auth/login">
              <Button
                variant="ghost"
                size="sm"
                className="w-full bg-white/20 border backdrop-blur-md shadow-md border-white/30 !border-b-white text-white hover:translate-x-2 transition-all hover:bg-black/30"
              >
                <User />
              </Button>
            </Link>
          </div>

          {/* Menú móvil */}
          <div className="md:hidden bg-white/20 backdrop-blur-md rounded-lg shadow-md border border-white/30">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="flex flex-col justify-between bg-white/20 backdrop-blur-md rounded-lg shadow-md border border-white/30 overflow-y-auto"
              >
                <div>
                  <SheetHeader>
                    <VisuallyHidden>
                      <SheetTitle>Menú</SheetTitle>
                    </VisuallyHidden>
                    <div className="flex items-center justify-between">
                      <SmallLogo />
                    </div>
                  </SheetHeader>

                  <nav className="mt-8 flex flex-col gap-4 ml-6">
                    <a
                      href="#servicios"
                      className="text-sm font-medium text-white hover:bg-white/40 hover:border hover:border-white/40 hover:translate-x-4 hover:shadow-md transition-all px-3 py-2 rounded-md"
                    >
                      {t("nav.services")}
                    </a>
                    <a
                      href="#precios"
                      className="text-sm font-medium text-white hover:bg-white/40 hover:border hover:border-white/40 hover:translate-x-4 hover:shadow-md transition-all px-3 py-2 rounded-md"
                    >
                      {t("nav.pricing")}
                    </a>
                    <a
                      href="#faq"
                      className="text-sm font-medium text-white hover:bg-white/40 hover:border hover:border-white/40 hover:translate-x-4 hover:shadow-md transition-all px-3 py-2 rounded-md"
                    >
                      {t("nav.faq")}
                    </a>
                  </nav>
                </div>

                <hr />

                {/* Parte inferior */}
                <div className="flex flex-col gap-3 mb-5 mx-6">
                  <div className="flex justify-center">
                    <LanguageSelector />
                  </div>
                  <div className="flex gap-3">
                    <Link href="/auth/login">
                      <Button
                        variant="ghost"
                        size="lg"
                        className="bg-white/20 backdrop-blur-md shadow-md text-white border border-white/30 hover:bg-white/30 transition-all"
                      >
                        <User />
                      </Button>
                    </Link>
                    <Link href="/auth/register">
                      <Button
                        size="lg"
                        className="w-full bg-white/20 border backdrop-blur-md shadow-md border-white/30 text-white hover:bg-white/30 transition-all"
                      >
                        {t("nav.register")}
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
