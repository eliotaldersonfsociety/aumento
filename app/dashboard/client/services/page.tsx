"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PricingSelector } from "@/components/dashboard/pricing-selector";
import { validateSession } from "@/app/actions/auth/validate-session";

export default function ClientServicesPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const result = await validateSession();
        if (result.valid && result.user) {
          setUser(result.user);
        } else {
          router.replace("/auth/login");
        }
      } catch (error) {
        console.error("Error verificando sesión:", error);
        router.replace("/auth/login");
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center text-white">
          <h1 className="text-2xl font-bold mb-4">Cargando...</h1>
          <p>Verificando sesión...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-white mb-4">
        Bienvenido, {user.name}
      </h1>
      <PricingSelector />
    </div>
  );
}
