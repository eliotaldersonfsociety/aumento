// app/dashboard/admin/layout.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ReactNode } from 'react';
import { AdminHeader } from "@/components/dashboard/admin-header";
import { Footer } from "@/components/footer";
import db from '@/lib/db';
import { Sidebar } from '../../../components/dashboard/sidebar';

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get('session')?.value;

  if (!sessionId) {
    redirect('/auth/login');
  }

  // Validar sesión y obtener usuario
  const sessionResult = await db.execute({
    sql: 'SELECT user_id, expires_at FROM sessions WHERE id = ?',
    args: [sessionId],
  });

  if (sessionResult.rows.length === 0) {
    redirect('/auth/login');
  }

  const session = sessionResult.rows[0];
  if (!session.expires_at || Number(session.expires_at) < Date.now()) {
    await db.execute({
      sql: 'DELETE FROM sessions WHERE id = ?',
      args: [sessionId],
    });
    redirect('/auth/login');
  }

  const userResult = await db.execute({
    sql: 'SELECT id, name, email, role, balance FROM users WHERE id = ?',
    args: [session.user_id],
  });

  if (userResult.rows.length === 0) {
    redirect('/auth/login');
  }

  const user = userResult.rows[0];

  if (user.role !== 'admin') {
    redirect('/auth/login');
  }

  // Convierte a plain object
  const plainUser = JSON.parse(JSON.stringify(user));

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-t from-[#fc79fc] via-[#fff3a8] to-[#77b6f5]">
      <div className="fixed top-0 left-0 w-full z-50">
        <AdminHeader userName={plainUser.name} />
      </div>
      <main className="flex-1 px-4 md:px-8 pt-4 md:pt-32 transition-all duration-300 pb-5">
        {children}
      </main>
      <Footer />
    </div>
  );
}