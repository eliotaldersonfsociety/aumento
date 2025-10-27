"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { MobileMenuButton } from "@/components/dashboard/sidebar";
import { ClientSidebar } from "@/components/dashboard/client-sidebar";
import Logo from "@/public/logo/logo";

interface ClientHeaderProps {
  userName?: string
  onToggleSidebar?: () => void  // 👈 agregamos esta prop opcional
}

export function ClientHeader({ userName, onToggleSidebar }: ClientHeaderProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Usar la función externa si está disponible, sino usar estado interno
  const handleToggleSidebar = () => {
    if (onToggleSidebar) {
      onToggleSidebar();
    } else {
      setSidebarOpen(!sidebarOpen);
    }
  };

  return (
    <>
      {/* Sidebar lateral */}
      <ClientSidebar isOpen={sidebarOpen} onOpenChange={setSidebarOpen} />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/20 backdrop-blur-md border-b border-white/30 shadow-md">
        <div className="flex items-center justify-between px-4 py-3 md:px-8">

          {/* Izquierda: botón menú móvil */}
          <div className="flex items-center gap-3">
            <MobileMenuButton onClick={handleToggleSidebar} />
          </div>

          <div className="flex items-center gap-3">
            {/* Logo pequeño (solo móvil) */}
            <div className="block md:hidden animate-breathe">
              <Logo />
            </div>

            {/* Logo grande (solo escritorio) */}
            <div className="hidden md:block animate-breathe">
              <Logo />
            </div>
          </div>

        </div>
      </header>
    </>
  );
}
