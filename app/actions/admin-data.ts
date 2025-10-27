'use server';

import db from '@/lib/db';
import { hash } from 'bcryptjs';
import crypto from 'crypto';

export async function getAdminStats() {
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1;
  const previousYear = currentMonth === 1 ? currentYear - 1 : currentYear;

  // Total ingresos (suma de precio_usd de todas las órdenes)
  const revenueResult = await db.execute({
    sql: 'SELECT SUM(precio_usd) as total FROM orders',
    args: [],
  });
  const totalRevenue = Number(revenueResult.rows[0].total) || 0;

  // Ingresos del mes actual
  const currentRevenueResult = await db.execute({
    sql: 'SELECT SUM(precio_usd) as total FROM orders WHERE strftime(\'%m\', datetime(created_at, \'unixepoch\')) = ? AND strftime(\'%Y\', datetime(created_at, \'unixepoch\')) = ?',
    args: [currentMonth.toString().padStart(2, '0'), currentYear.toString()],
  });
  const currentRevenue = Number(currentRevenueResult.rows[0].total) || 0;

  // Ingresos del mes anterior
  const previousRevenueResult = await db.execute({
    sql: 'SELECT SUM(precio_usd) as total FROM orders WHERE strftime(\'%m\', datetime(created_at, \'unixepoch\')) = ? AND strftime(\'%Y\', datetime(created_at, \'unixepoch\')) = ?',
    args: [previousMonth.toString().padStart(2, '0'), previousYear.toString()],
  });
  const previousRevenue = Number(previousRevenueResult.rows[0].total) || 0;

  // Cambio en ingresos
  const revenueChange = previousRevenue > 0 ? ((currentRevenue - previousRevenue) / previousRevenue * 100).toFixed(2) : 0;

  // Total órdenes
  const ordersResult = await db.execute({
    sql: 'SELECT COUNT(*) as total FROM orders',
    args: [],
  });
  const totalOrders = Number(ordersResult.rows[0].total) || 0;

  // Órdenes del mes actual
  const currentOrdersResult = await db.execute({
    sql: 'SELECT COUNT(*) as total FROM orders WHERE strftime(\'%m\', datetime(created_at, \'unixepoch\')) = ? AND strftime(\'%Y\', datetime(created_at, \'unixepoch\')) = ?',
    args: [currentMonth.toString().padStart(2, '0'), currentYear.toString()],
  });
  const currentOrders = Number(currentOrdersResult.rows[0].total) || 0;

  // Órdenes del mes anterior
  const previousOrdersResult = await db.execute({
    sql: 'SELECT COUNT(*) as total FROM orders WHERE strftime(\'%m\', datetime(created_at, \'unixepoch\')) = ? AND strftime(\'%Y\', datetime(created_at, \'unixepoch\')) = ?',
    args: [previousMonth.toString().padStart(2, '0'), previousYear.toString()],
  });
  const previousOrders = Number(previousOrdersResult.rows[0].total) || 0;

  // Cambio en órdenes
  const ordersChange = previousOrders > 0 ? ((currentOrders - previousOrders) / previousOrders * 100).toFixed(2) : 0;

  // Total clientes (usuarios con role 'client')
  const clientsResult = await db.execute({
    sql: 'SELECT COUNT(*) as total FROM users WHERE role = ?',
    args: ['client'],
  });
  const totalClients = Number(clientsResult.rows[0].total) || 0;

  // Clientes del mes actual
  const currentClientsResult = await db.execute({
    sql: 'SELECT COUNT(*) as total FROM users WHERE role = ? AND strftime(\'%m\', datetime(created_at, \'unixepoch\')) = ? AND strftime(\'%Y\', datetime(created_at, \'unixepoch\')) = ?',
    args: ['client', currentMonth.toString().padStart(2, '0'), currentYear.toString()],
  });
  const currentClients = Number(currentClientsResult.rows[0].total) || 0;

  // Clientes del mes anterior
  const previousClientsResult = await db.execute({
    sql: 'SELECT COUNT(*) as total FROM users WHERE role = ? AND strftime(\'%m\', datetime(created_at, \'unixepoch\')) = ? AND strftime(\'%Y\', datetime(created_at, \'unixepoch\')) = ?',
    args: ['client', previousMonth.toString().padStart(2, '0'), previousYear.toString()],
  });
  const previousClients = Number(previousClientsResult.rows[0].total) || 0;

  // Cambio en clientes
  const clientsChange = previousClients > 0 ? ((currentClients - previousClients) / previousClients * 100).toFixed(2) : 0;

  // Tasa de conversión (órdenes / clientes * 100)
  const conversionRate = totalClients > 0 ? (totalOrders / totalClients * 100).toFixed(2) : 0;

  // Tasa de conversión del mes actual
  const currentConversionRate = currentClients > 0 ? (currentOrders / currentClients * 100).toFixed(2) : 0;

  // Tasa de conversión del mes anterior
  const previousConversionRate = previousClients > 0 ? (previousOrders / previousClients * 100).toFixed(2) : 0;

  // Cambio en tasa de conversión
  const conversionChange = Number(previousConversionRate) > 0 ? ((Number(currentConversionRate) - Number(previousConversionRate)) / Number(previousConversionRate) * 100).toFixed(2) : 0;

  return {
    totalRevenue,
    totalOrders,
    totalClients,
    conversionRate,
    revenueChange,
    ordersChange,
    clientsChange,
    conversionChange,
  };
}

export async function getMonthlyRevenue() {
  const result = await db.execute({
    sql: `
      SELECT
        strftime('%m', datetime(created_at, 'unixepoch')) as month,
        SUM(precio_usd) as revenue
      FROM orders
      GROUP BY strftime('%m', datetime(created_at, 'unixepoch'))
      ORDER BY month
    `,
    args: [],
  });

  const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

  const data = [];
  for (let i = 0; i < 12; i++) {
    const monthName = months[i];
    const revenue = result.rows.find(row => row.month === (i + 1).toString().padStart(2, '0'))?.revenue || 0;
    data.push({ month: monthName, revenue: Number(revenue) });
  }

  return data;
}

export async function getRecentOrders() {
  const result = await db.execute({
    sql: `
      SELECT o.id, o.servicio, o.cantidad, o.precio_usd, o.status, o.created_at, u.name as user_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
      LIMIT 10
    `,
    args: [],
  });

  return JSON.parse(JSON.stringify(result.rows));
}

export async function getAllOrders() {
  const result = await db.execute({
    sql: `
      SELECT o.id, o.servicio, o.cantidad, o.precio_usd, o.status, o.created_at, u.name as user_name
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.created_at DESC
    `,
    args: [],
  });

  return JSON.parse(JSON.stringify(result.rows));
}

export async function getAllCustomersWithOrders() {
  const result = await db.execute({
    sql: `
      SELECT
        u.id,
        u.name,
        u.email,
        u.phone,
        u.created_at,
        u.balance,
        COUNT(o.id) as orders_count,
        COALESCE(SUM(o.precio_usd), 0) as total_spent
      FROM users u
      LEFT JOIN orders o ON u.id = o.user_id
      WHERE u.role = 'client'
      GROUP BY u.id, u.name, u.email, u.phone, u.created_at, u.balance
      ORDER BY u.created_at DESC
    `,
    args: [],
  });

  return JSON.parse(JSON.stringify(result.rows));
}

export async function createCustomer(name: string, email: string, phone: string, password: string) {
  // Hash the password
  const hashedPassword = await hash(password, 10);

  // Generate unique ID
  const id = crypto.randomUUID();

  const result = await db.execute({
    sql: 'INSERT INTO users (id, name, email, phone, role, created_at, password, balance) VALUES (?, ?, ?, ?, ?, strftime(\'%Y-%m-%dT%H:%M:%fZ\', \'now\'), ?, ?)',
    args: [id, name, email, phone, 'client', hashedPassword, 0],
  });

  if (result.rowsAffected > 0) {
    return { success: true, id: id };
  } else {
    return { success: false, error: 'Failed to create customer' };
  }
}

export async function addBalanceToUser(userId: string, amount: number) {
  const result = await db.execute({
    sql: 'UPDATE users SET balance = balance + ? WHERE id = ?',
    args: [amount, userId],
  });

  if (result.rowsAffected > 0) {
    return { success: true };
  } else {
    return { success: false, error: 'Failed to add balance' };
  }
}