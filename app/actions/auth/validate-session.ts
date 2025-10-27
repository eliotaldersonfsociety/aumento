// app/actions/auth/validate-session.ts
'use server';
import { cookies } from 'next/headers';
import db from '@/lib/db';

export async function validateSession() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session')?.value;

  if (!sessionId) {
    return { valid: false, user: null };
  }

  // Buscar la sesión en la base de datos
  const sessionResult = await db.execute({
    sql: 'SELECT user_id, expires_at FROM sessions WHERE id = ?',
    args: [sessionId],
  });

  if (sessionResult.rows.length === 0) {
    return { valid: false, user: null };
  }

  const session = sessionResult.rows[0];
  if (!session.expires_at || Number(session.expires_at) < Date.now()) {
    await db.execute({
      sql: 'DELETE FROM sessions WHERE id = ?',
      args: [sessionId],
    });
    return { valid: false, user: null };
  }

  // Buscar los datos del usuario
  const userResult = await db.execute({
    sql: 'SELECT id, name, email, role, balance, phone, created_at FROM users WHERE id = ?',
    args: [session.user_id],
  });

  if (userResult.rows.length === 0) {
    return { valid: false, user: null };
  }

  const user = userResult.rows[0];

  if (user.role !== 'client' && user.role !== 'admin') {
    return { valid: false, user: null };
  }

  return {
    valid: true,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      balance: user.balance,
      phone: user.phone,
      created_at: user.created_at,
    },
  };
}
