'use server'

import db from '@/lib/db'
import { cookies } from 'next/headers'
import bcrypt from 'bcryptjs'

// 🧠 Función server action
export async function updateProfile(formData: {
  name: string
  email: string
  phone: string
  password?: string
}) {
  try {
    // 🔒 Leer la cookie de sesión
    const cookieStore = await cookies()
    const session = cookieStore.get('session')?.value

    if (!session) {
      return { success: false, message: 'No autenticado' }
    }

    // Obtener user_id de la sesión
    const sessionResult = await db.execute('SELECT user_id, expires_at FROM sessions WHERE id = ?', [session]);

    if (sessionResult.rows.length === 0) {
      return { success: false, message: 'Sesión no encontrada' }
    }

    const sessionData = sessionResult.rows[0];
    if (!sessionData.expires_at || Number(sessionData.expires_at) < Date.now()) {
      return { success: false, message: 'Sesión expirada' }
    }

    const userId = sessionData.user_id;
    if (!userId) {
      return { success: false, message: 'Usuario no encontrado' }
    }

    // 🧾 Construir actualización
    const updateData: any = {
      name: formData.name,
      phone: formData.phone,
    }

    if (formData.password && formData.password.trim() !== '') {
      const hashed = await bcrypt.hash(formData.password, 10)
      updateData.password = hashed
    }

    // 🛠️ Actualizar en la base de datos
    const setParts = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
    const values = Object.values(updateData);
    await db.execute(`UPDATE users SET ${setParts} WHERE id = ?`, [...values, userId] as any);

    return { success: true, message: 'Perfil actualizado correctamente' }
  } catch (error) {
    console.error('Error al actualizar perfil:', error)
    return { success: false, message: 'Error interno del servidor' }
  }
}
