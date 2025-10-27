// app/dashboard/client/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getUserBySession, getOrdersByUserId, Order } from '@/lib/data';
import ClientDashboardClient from './page-client';

export default async function ClientDashboardPage() {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session')?.value;

  if (!sessionId) {
    redirect('/auth/login');
  }

  const user = await getUserBySession(sessionId);
  if (!user) {
    redirect('/auth/login');
  }

  // Si el usuario es admin, redirigir al dashboard admin
  if (user.role === 'admin') {
    redirect('/dashboard/admin');
  }

  // ✅ Convertir user.id a string explícitamente
  const orders = await getOrdersByUserId(String(user.id)) as unknown as Order[];

  const plainUser = JSON.parse(JSON.stringify(user));
  const plainOrders = JSON.parse(JSON.stringify(orders));

  return <ClientDashboardClient user={plainUser} orders={plainOrders} />;
}
