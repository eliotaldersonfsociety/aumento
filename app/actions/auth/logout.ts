// app/actions/auth/logout.ts
'use server';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import db from '@/lib/db';

export async function logout() {
  const sessionId = (await cookies()).get('session')?.value;
  if (sessionId) {
    await db.execute({
      sql: 'DELETE FROM sessions WHERE id = ?',
      args: [sessionId],
    });
  }
  (await cookies()).delete('session');
  redirect('/auth/login');
}
