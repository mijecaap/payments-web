'use client';

import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export function ProtectedRoute({ children, requireAuth = true }: ProtectedRouteProps) {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  useEffect(() => {
    if (requireAuth && !token) {
      router.replace('/auth');
      return;
    }

    if (!requireAuth && token) {
      router.replace('/dashboard');
      return;
    }
  }, [token, requireAuth, router]);

  if (requireAuth && !token) return null;
  if (!requireAuth && token) return null;

  return <>{children}</>;
}