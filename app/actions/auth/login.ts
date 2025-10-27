// app/actions/auth/login.ts
'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import db from '@/lib/db';
import { z } from 'zod';
import { randomUUID } from 'crypto';
import { compare } from 'bcryptjs';

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function login(prevState: any, formData: FormData) {
  const rawFormData = {
    email: formData.get('email')?.toString().trim() || '',
    password: formData.get('password')?.toString() || '',
  };

  const validated = loginSchema.safeParse(rawFormData);
  if (!validated.success) {
    return { error: 'Email o contraseña inválidos' };
  }

  const { email, password } = validated.data;

  const result = await db.execute({
    sql: 'SELECT id, email, password, name, role, balance FROM users WHERE email = ?',
    args: [email],
  });

  if (result.rows.length === 0) {
    return { error: 'Credenciales incorrectas' };
  }

  const user = result.rows[0];

  if (!user.password) {
    return { error: 'Credenciales incorrectas' };
  }

  const passwordMatch = await compare(password, String(user.password));

  if (!passwordMatch) {
    return { error: 'Credenciales incorrectas' };
  }

  const sessionId = randomUUID();
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime(); // 7 días

  await db.execute({
    sql: 'INSERT INTO sessions (id, user_id, expires_at) VALUES (?, ?, ?)',
    args: [sessionId, user.id, expiresAt],
  });

  (await cookies()).set('session', sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60,
    path: '/',
  });

  // Redirigir según rol
  if (user.role === 'admin') {
    redirect('/dashboard/admin');
  } else {
    redirect('/dashboard/client');
  }
}
