// app/actions/saveOrder.ts
'use server';

import { cookies } from 'next/headers';
import db from '@/lib/db';
import { randomUUID } from 'crypto';
import { z } from 'zod';

const orderSchema = z.object({
  servicio: z.string().min(1, "Servicio requerido"),
  categoria: z.string().min(1, "Categoría requerida"),
  tipo: z.string().min(1, "Tipo requerido"),
  cantidad: z.coerce.number().int().min(1, "Cantidad inválida"),
  link: z.string().url("URL inválida"),
  precioUSD: z.string().regex(/^\d+(\.\d{1,2})?$/, "Precio USD inválido"),
  precioCOP: z.string().min(1, "Precio COP requerido"),
  customComments: z.string().optional(),
});

async function getAuthenticatedUserId() {
  const sessionCookie = (await cookies()).get('session')?.value;
  if (!sessionCookie) {
    throw new Error('No autorizado');
  }

  const sessionResult = await db.execute({
    sql: 'SELECT user_id FROM sessions WHERE id = ? AND expires_at > ?',
    args: [sessionCookie, Math.floor(Date.now() / 1000)],
  });

  if (sessionResult.rows.length === 0) {
    throw new Error('Sesión inválida o expirada');
  }

  return sessionResult.rows[0].user_id as string;
}

export async function saveOrder(formData: FormData) {
  try {
    const raw = {
      servicio: formData.get('servicio')?.toString().trim() || '',
      categoria: formData.get('categoria')?.toString().trim() || '',
      tipo: formData.get('tipo')?.toString().trim() || '',
      cantidad: formData.get('cantidad')?.toString().trim() || '',
      link: formData.get('link')?.toString().trim() || '',
      precioUSD: formData.get('precioUSD')?.toString().trim() || '',
      precioCOP: formData.get('precioCOP')?.toString().trim() || '',
      customComments: formData.get('customComments')?.toString() || undefined,
    };

    const validated = orderSchema.safeParse(raw);
    if (!validated.success) {
      const errors = validated.error.flatten().fieldErrors;
      const firstError = Object.values(errors).flat()[0];
      return { error: firstError || 'Datos inválidos' };
    }

    const userId = await getAuthenticatedUserId();

    // Obtener el saldo del usuario
    const userResult = await db.execute({
      sql: 'SELECT balance FROM users WHERE id = ?',
      args: [userId],
    });

    if (userResult.rows.length === 0) {
      return { error: 'Usuario no encontrado' };
    }

    const userBalance = Number(userResult.rows[0].balance) || 0;
    const orderPrice = Number(validated.data.precioUSD);

    if (userBalance < orderPrice) {
      return { error: 'Saldo insuficiente para realizar la compra' };
    }

    const orderId = randomUUID();
    const now = Math.floor(Date.now() / 1000);

    // Descontar el saldo del usuario
    await db.execute({
      sql: 'UPDATE users SET balance = balance - ? WHERE id = ?',
      args: [orderPrice, userId],
    });

    // Insertar la orden con estado "pagado"
    await db.execute({
      sql: `
        INSERT INTO orders (
          id, user_id, servicio, categoria, tipo, cantidad, link,
          precio_usd, precio_cop, custom_comments, status, created_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [
        orderId,
        userId,
        validated.data.servicio,
        validated.data.categoria,
        validated.data.tipo,
        validated.data.cantidad,
        validated.data.link,
        validated.data.precioUSD,
        validated.data.precioCOP,
        validated.data.customComments || null,
        'pendiente', // 👈 estado pagado
        now,
      ],
    });

    return { success: true };
  } catch (error: any) {
    console.error('Error en saveOrder:', error);
    return { error: error.message || 'Error al guardar el pedido' };
  }
}