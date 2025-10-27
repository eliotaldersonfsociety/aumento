// app/actions/updateOrderStatus.ts
'use server';

import { updateOrderStatus } from '@/lib/data';

export async function updateOrderStatusAction(orderId: string, newStatus: string) {
  try {
    const success = await updateOrderStatus(orderId, newStatus);
    if (success) {
      return { success: true };
    } else {
      return { error: 'No se pudo actualizar el estado de la orden' };
    }
  } catch (error: any) {
    console.error('Error updating order status:', error);
    return { error: error.message || 'Error al actualizar el estado' };
  }
}