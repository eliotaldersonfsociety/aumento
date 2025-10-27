// app/actions/settings.ts
'use server';

import db from '@/lib/db';
import { hash } from 'bcryptjs';

export async function getSettings() {
  // For now, return default values. In production, fetch from a settings table.
  const result = await db.execute({
    sql: 'SELECT exchange_rate FROM settings LIMIT 1',
    args: [],
  });

  if (result.rows.length === 0) {
    return {
      exchangeRate: '4200',
    };
  }

  const settings = result.rows[0];
  return {
    exchangeRate: settings.exchange_rate || '4200',
  };
}

export async function updateSettings(data: {
  exchangeRate: string;
}) {
  // In production, update the settings table.
  await db.execute({
    sql: `
      INSERT OR REPLACE INTO settings (id, exchange_rate)
      VALUES (1, ?)
    `,
    args: [data.exchangeRate],
  });

  return { success: true };
}

export async function createAdminUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const hashedPassword = await hash(data.password, 10);

  await db.execute({
    sql: 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
    args: [data.name, data.email, hashedPassword, 'admin'],
  });

  return { success: true };
}