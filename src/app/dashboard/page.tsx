'use client';

import { useAuthStore } from '@/stores/auth';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <ProtectedRoute requireAuth={true}>
      <div className="min-h-screen bg-[#F5F5F5] p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-semibold text-gray-900">
            Bienvenido, {user?.name}
          </h1>
          <p className="mt-2 text-gray-600">Dashboard en construcción...</p>
        </div>
      </div>
    </ProtectedRoute>
  );
}