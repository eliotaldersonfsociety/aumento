"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save, User, Mail, Phone, Wallet } from "lucide-react";
import { validateSession } from "@/app/actions/auth/validate-session";
import { updateProfile } from "@/app/actions/update-profile";

export default function ClientProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    created_at: "",
  });
  const [loading, setLoading] = useState(true);

  // 🔐 Verificar sesión
  useEffect(() => {
    const checkSession = async () => {
      try {
        const result = await validateSession();

        if (result.valid && result.user) {
          const u = result.user;
          setUser(u);
          setFormData({
            name: u.name ? String(u.name) : "",
            email: u.email ? String(u.email) : "",
            phone: u.phone ? String(u.phone) : "",
            password: "",
            created_at: u.created_at ? String(u.created_at) : "",
          });
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

  // 🧾 Guardar perfil
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const result = await updateProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      if (result.success) {
        alert("✅ Perfil actualizado exitosamente");
        setFormData({ ...formData, password: "" });
        window.location.reload();
      } else {
        alert(`❌ Error al actualizar el perfil: ${result.message}`);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error al actualizar el perfil");
    }
  };

  // ⏳ Cargando
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
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-white mb-4">
        Bienvenido, {user.name}
      </h1>
      <hr></hr>

      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2 pt-20">
          Mi Perfil
        </h1>
        <p className="text-white/90 text-sm sm:text-base">
          Gestiona tu información personal
        </p>
      </div>

      {/* 💰 Tarjetas de información */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance */}
        <div className="glass-card p-6 rounded-2xl bg-white/20 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-lg bg-primary/20">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-white/80">Saldo Disponible</p>
              <p className="text-2xl font-bold text-white">
                ${(user.balance || 0).toFixed(2)}
              </p>
            </div>
          </div>
          <p className="text-xs text-white/70">
            Para recargar tu saldo, contacta al administrador.
          </p>
        </div>

        {/* Info usuario */}
        <div className="glass-card p-6 rounded-2xl bg-white/20 backdrop-blur-md shadow-lg lg:col-span-2">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-primary/20">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-white/80">ID de Usuario</p>
              <p className="text-lg font-bold text-white">
                #{user.id || "N/A"}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-white/70">Fecha de Registro</p>
              <p className="text-white font-medium">
                {user.created_at &&
                !isNaN(new Date(user.created_at).getTime())
                  ? new Date(user.created_at).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="text-white/70">Tipo de Cuenta</p>
              <p className="text-white font-medium">Cliente</p>
            </div>
          </div>
        </div>
      </div>

      {/* 📝 Formulario Editar Perfil */}
      <div className="glass-card p-6 mt-6 rounded-2xl bg-white/20 backdrop-blur-md shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6 text-center sm:text-left">
          Editar Información
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* 🧍 Nombre */}
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                Nombre Completo
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-4 h-4 text-white/60" />
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="pl-10 bg-white/30 text-white placeholder-white/70"
                  required
                />
              </div>
            </div>

            {/* 📧 Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                Email (No editable)
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-4 h-4 text-white/60" />
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  disabled
                  className="pl-10 bg-white/30 text-white/50 placeholder-white/70 cursor-not-allowed"
                  required
                />
              </div>
            </div>

            {/* 📞 Teléfono */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">
                Teléfono
              </Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-white/60" />
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="pl-10 bg-white/30 text-white placeholder-white/70"
                  required
                />
              </div>
            </div>

            {/* 🔐 Nueva Contraseña */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                Nueva Contraseña (opcional)
              </Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                placeholder="Dejar en blanco para mantener actual"
                className="bg-white/30 text-white placeholder-white/70"
                minLength={6}
              />
            </div>
          </div>

          {/* 💾 Botón Guardar */}
          <div className="flex justify-center sm:justify-end">
            <Button
              type="submit"
              className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-xl"
            >
              <Save className="w-4 h-4 mr-2" />
              Guardar Cambios
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
