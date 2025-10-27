// lib/data.ts
import db from '@/lib/db';

export interface Order {
  id: string;
  servicio: string;
  categoria: string;
  tipo: string;
  cantidad: number;
  link: string;
  precio_usd: number;
  precio_cop: number;
  custom_comments: string | null;
  status: string;
  created_at: string;
}

// Obtiene el usuario a partir de una sesión válida
export async function getUserBySession(sessionId: string) {
  const sessionResult = await db.execute({
    sql: 'SELECT user_id, expires_at FROM sessions WHERE id = ?',
    args: [sessionId],
  });

  if (sessionResult.rows.length === 0) return null;

  const session = sessionResult.rows[0];
  if (!session.expires_at || Number(session.expires_at) < Date.now()) {
    // Opcional: limpiar sesión expirada
    await db.execute({
      sql: 'DELETE FROM sessions WHERE id = ?',
      args: [sessionId],
    });
    return null;
  }

  const userResult = await db.execute({
    sql: 'SELECT id, name, email, role, balance FROM users WHERE id = ?',
    args: [session.user_id],
  });

  if (userResult.rows.length === 0) return null;

  const user = userResult.rows[0];

  return user;
}

// Obtiene las órdenes de un usuario
export async function getOrdersByUserId(userId: string) {
  const result = await db.execute({
    sql: `
      SELECT id, servicio, categoria, tipo, cantidad, link,
             precio_usd, precio_cop, custom_comments, status, created_at
      FROM orders
      WHERE user_id = ?
      ORDER BY created_at DESC
      LIMIT 10
    `,
    args: [userId],
  });
  return result.rows;
}

// Actualiza el estado de una orden
export async function updateOrderStatus(orderId: string, newStatus: string) {
  const result = await db.execute({
    sql: 'UPDATE orders SET status = ? WHERE id = ?',
    args: [newStatus, orderId],
  });
  return result.rowsAffected > 0;
}