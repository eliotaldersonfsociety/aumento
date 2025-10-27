// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import db from './lib/db';

export async function middleware(request: NextRequest) {
  const sessionId = request.cookies.get('session')?.value;

  if (!sessionId) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Buscar la sesión en la base de datos
  const result = await db.execute({
    sql: 'SELECT user_id, expires_at FROM sessions WHERE id = ?',
    args: [sessionId],
  });

  if (result.rows.length === 0) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  const session = result.rows[0];
  if (!session.expires_at || Number(session.expires_at) < Date.now()) {
    // Sesión expirada
    await db.execute({
      sql: 'DELETE FROM sessions WHERE id = ?',
      args: [sessionId],
    });
    const response = NextResponse.redirect(new URL('/auth/login', request.url));
    response.cookies.delete('session');
    return response;
  }

  // Actualizar expires_at si quieres mantener la sesión activa
  await db.execute({
    sql: 'UPDATE sessions SET expires_at = ? WHERE id = ?',
    args: [new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).getTime(), sessionId],
  });

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'], // Protege todas las rutas bajo /dashboard
};
