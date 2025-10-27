"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, ShoppingBag, Package, User, LogOut, Menu, ChartArea } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import SmallLogo from "@/public/logo/smalllogo";
import { logout } from "@/app/actions/auth/logout"; // 👈 Importa la Server Action

interface ClientSidebarProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/client" },
  { icon: Package, label: "Servicios", href: "/dashboard/client/services" },
  { icon: ShoppingBag, label: "Mis Órdenes", href: "/dashboard/client/orders" },
  { icon: User, label: "Mi Perfil", href: "/dashboard/client/profile" },
  { icon: ChartArea, label: "Analíticas", href: "/dashboard/client/analytics"}
  // ❌ Quitamos "Salir" como Link, lo manejamos con un form
];

export function ClientSidebar({ isOpen, onOpenChange }: ClientSidebarProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const closeSidebar = () => {
    if (onOpenChange) onOpenChange(false);
  };

  return (
    <aside
      className={cn(
        "fixed top-26 left-0 z-40 w-64 h-screen bg-white/20 backdrop-blur-md shadow-lg border-r border-white/30",
        "transform transition-transform duration-300 ease-in-out",
        isMobile
          ? isOpen
            ? "translate-x-0"
            : "-translate-x-full"
          : "translate-x-0"
      )}
    >
      <div className="flex flex-col h-full p-4">
        <div className="mb-8 flex justify-center">
          <SmallLogo />
        </div>

        <nav className="space-y-2 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={isMobile ? closeSidebar : undefined}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                  "hover:bg-white/10 text-white",
                  isActive && "bg-white/20 text-foreground font-medium"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}

          {/* ✅ Formulario para logout usando Server Action */}
          <form action={logout} className="mt-4">
            <button
              type="submit"
              onClick={isMobile ? closeSidebar : undefined}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all",
                "hover:bg-white/10 text-white"
              )}
            >
              <LogOut className="w-5 h-5" />
              <span>Salir</span>
            </button>
          </form>
        </nav>
      </div>
    </aside>
  );
}

export function MobileMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="md:hidden p-2 rounded-lg hover:bg-white/10"
      aria-label="Abrir menú"
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}