'use server';

import { getOrdersByUserId } from '@/lib/data';

export async function getOrders(userId: string) {
  const orders = await getOrdersByUserId(userId);
  return JSON.parse(JSON.stringify(orders));
}