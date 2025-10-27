// app/actions/auth/register.ts
'use server'

import db from '@/lib/db'
import { redirect } from 'next/navigation'
import { hash } from 'bcryptjs'
import crypto from 'crypto'

export async function register(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const password = formData.get('password') as string

  // 🧩 Validaciones básicas
  if (!name || !email || !phone || !password) {
    throw new Error('Todos los campos son obligatorios')
  }

  if (password.length < 6) {
    throw new Error('La contraseña debe tener al menos 6 caracteres')
  }

  // ⚠️ Verificar si el email ya está registrado
  const existingUser = await db.execute({
    sql: 'SELECT id FROM users WHERE email = ?',
    args: [email],
  })

  if (existingUser.rows.length > 0) {
    throw new Error('Este email ya está registrado')
  }

  // 🔐 Hashear la contraseña antes de guardar
  const hashedPassword = await hash(password, 10)

  // 🧠 Insertar nuevo usuario
  await db.execute({
    sql: `
      INSERT INTO users (id, name, email, password, phone, role, balance, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
    `,
    args: [
      crypto.randomUUID(), // genera un id único
      name,
      email,
      hashedPassword, // 🔐 se guarda la contraseña encriptada
      phone,
      'client',
      0,
    ],
  })

  // ✅ Redirigir al login o dashboard
  redirect('/auth/login?success=registered')
}
