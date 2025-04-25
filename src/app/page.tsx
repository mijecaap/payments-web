'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.replace('/home');
    } else {
      router.replace('/auth');
    }
  }, [token, router]);

  return null;
}
