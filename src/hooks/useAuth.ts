import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/stores/auth';

export function useAuth() {
  const token = useAuthStore((state) => state.token);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!token) {
      // Guardamos la ruta actual antes de redirigir
      sessionStorage.setItem('returnPath', pathname);
      router.replace('/auth');
    } else {
      // Si hay un returnPath guardado y no estamos en /auth, redirigimos a él
      const returnPath = sessionStorage.getItem('returnPath');
      if (returnPath && pathname !== '/auth') {
        sessionStorage.removeItem('returnPath');
        router.replace(returnPath);
      }
    }
  }, [token, router, pathname]);

  return {
    token,
    logout,
  };
}
