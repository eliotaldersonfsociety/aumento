"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  Home,
  BarChart3,
  Menu,
  X,
  User,
  DollarSign,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";
import SmallLogo from "@/public/logo/smalllogo";

const menuItems = [
  { icon: DollarSign, label: "Recarga", href: "/dashboard/admin/customers" },
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard/admin" },
  { icon: Package, label: "Servicios", href: "/dashboard/services" },
  { icon: ShoppingCart, label: "Órdenes", href: "/dashboard/orders" },
  { icon: Users, label: "Clientes", href: "/dashboard/customers" },
  { icon: Settings, label: "Configuración", href: "/dashboard/settings" },
  { icon: LogOut, label: "Salir", href: "/" },
];

interface SidebarProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Sidebar({ isOpen, onOpenChange }: SidebarProps) {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md: 768px
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const closeSidebar = () => {
    if (onOpenChange) onOpenChange(false);
  };

  // En móvil, el sidebar se controla por estado externo (isOpen)
  // En desktop, siempre visible
  if (isMobile && !isOpen) return null;

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
    </nav>
  </div>
</aside>

  );
}

// Botón de menú para móviles (úsalo en tu Header)
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