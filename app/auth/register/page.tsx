"use client";

import { register } from "@/app/actions/auth/register";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { UserPlus } from "lucide-react";
import SmallLogo from "@/public/logo/smalllogo";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full bg-[#429efa] text-white hover:bg-[#0481fd]">
      {pending ? "Creando..." : "Crear Cuenta"}
      <UserPlus className="w-4 h-4 ml-2" />
    </Button>
  );
}

export default function RegisterPage() {
  const [state, setState] = useState<{ message?: string }>({ message: "" })

  async function handleRegister(formData: FormData) {
    try {
      setState({ message: "" })
      await register(formData);
    } catch (error) {
      setState({ message: error instanceof Error ? error.message : "Error al crear la cuenta" })
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-t from-[#fc79fc] via-[#fff3a8] to-[#77b6f5]">
      <div className="w-full max-w-md">
        <div className="glass-card p-8">
          <div className="pb-8"><SmallLogo /></div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Crear Cuenta</h1>
            <p className="text-white font-extralight">Únete a SocialBoost hoy</p>
          </div>

          <form onSubmit={async (e) => {
            e.preventDefault()
            const formData = new FormData(e.currentTarget)
            await handleRegister(formData)
          }} className="space-y-6">
            {state?.message && (
              <p className="text-red-400 text-sm">{state.message}</p>
            )}

            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Nombre Completo</Label>
              <Input name="name" id="name" placeholder="Juan Pérez" required className="bg-white/20 text-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input name="email" id="email" type="email" placeholder="tu@email.com" required className="bg-white/20 text-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white">Teléfono</Label>
              <Input name="phone" id="phone" type="tel" placeholder="+57 300 123 4567" required className="bg-white/20 text-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Contraseña</Label>
              <Input name="password" id="password" type="password" placeholder="••••••••" required minLength={6} className="bg-white/20 text-white" />
            </div>

            <SubmitButton />
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-white font-extralight">
              ¿Ya tienes cuenta?{" "}
              <Link href="/auth/login" className="text-white font-semibold">Inicia sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}