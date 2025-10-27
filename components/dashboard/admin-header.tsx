"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { MobileMenuButton } from "@/components/dashboard/sidebar";
import { Sidebar } from "@/components/dashboard/sidebar";
import Logo from "@/public/logo/logo";

export function AdminHeader({ userName, onMenuClick }: { userName?: string; onMenuClick?: () => void }) {
  return (
    <>
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/20 backdrop-blur-md border-b border-white/30 shadow-md">
        <div className="flex items-center justify-between px-4 py-3 md:px-8">
          {/* Izquierda: Botón + Logo */}
          <div className="flex items-center gap-3">
            {onMenuClick && <MobileMenuButton onClick={onMenuClick} />}
            
          </div>

          {/* Derecha: Usuario */}
          <div className="flex items-center gap-3">
            {/* Logo pequeño (solo en móvil) */}
            <div className="block md:hidden animate-breathe">
              <Logo />
            </div>

            {/* Logo completo (solo en escritorio) */}
            <div className="hidden md:block animate-breathe">
              <Logo />
            </div>
          </div>

        </div>
      </header>
    </>
  );
}
