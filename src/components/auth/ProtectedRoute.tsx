'use client';

import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function ProtectedRoute({ children, requireAuth = true }: ProtectedRouteProps) {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  useEffect(() => {
    // Verifica si el token existe y si la ruta requiere autenticación
    // Si no hay token y la ruta requiere autenticación, redirige a la página de inicio de sesión
    if (!token && requireAuth) {
      router.replace('/auth');
    }
  }, [token, router, requireAuth]);

  return <>{children}</>;
}
