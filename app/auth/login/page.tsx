// app/auth/login/page.tsx
"use client";

import { useActionState, useEffect } from "react"; // ✅ useActionState, no useFormState
import { login } from "@/app/actions/auth/login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LogIn } from "lucide-react";
import SmallLogo from "@/public/logo/smalllogo";

function SubmitButton() {
  // Pero mejor: usa useFormStatus (sigue funcionando)
  const formStatus = require("react-dom").useFormStatus;
  const { pending } = formStatus();
  
  return (
    <Button
      type="submit"
      disabled={pending}
      className="w-full bg-[#429efa] text-white hover:bg-[#0481fd]"
    >
      {pending ? "Iniciando..." : "Iniciar Sesión"}
      <LogIn className="w-4 h-4 ml-2" />
    </Button>
  );
}

export default function LoginPage() {
  // ✅ useActionState: (action, initialState)
  const [state, formAction] = useActionState(login, { error: "" });

  // Opcional: redirigir si hay éxito (pero redirect() ya lo hace)
  useEffect(() => {
    if (state?.success) {
      // No necesario si usas redirect()
    }
  }, [state]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-t from-[#fc79fc] via-[#fff3a8] to-[#77b6f5]">
      <div className="w-full max-w-md">
        <div className="glass-card p-8">
          <div className="pb-8"><SmallLogo /></div>
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Iniciar Sesión</h1>
            <p className="text-white font-extralight">Accede a tu cuenta</p>
          </div>

          <form action={formAction} className="space-y-6">
            {state?.error && (
              <p className="text-red-400 text-sm text-center">{state.error}</p>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">Email</Label>
              <Input name="email" id="email" type="email" placeholder="tu@email.com" required className="bg-white/20 text-white" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Contraseña</Label>
              <Input name="password" id="password" type="password" placeholder="••••••••" required className="bg-white/20 text-white" />
            </div>

            <SubmitButton />
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-white font-extralight">
              ¿No tienes cuenta?{" "}
              <Link href="/auth/register" className="text-white font-semibold">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}