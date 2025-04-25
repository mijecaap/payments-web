'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { CommissionTable } from '@/components/home/CommissionTable';
import { useInfiniteCommissions } from '@/hooks/useInfiniteCommissions';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useAuth } from '@/hooks/useAuth';

export default function CommissionsPage() {
  useAuth();
  const [page, setPage] = useState(1);
  const { commissions, isLoading, hasMore, totalCommissions } = useInfiniteCommissions(page);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasMore && !isLoading) {
      setPage((prev) => prev + 1);
    }
  }, [inView, hasMore, isLoading]);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-60">
        <Header />
        <main className="p-6">
          <div className="max-w-[1200px] mx-auto space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    Historial de Comisiones
                  </h1>
                  {totalCommissions > 0 && (
                    <div className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                      Total: {totalCommissions}
                    </div>
                  )}
                </div>
                <CommissionTable commissions={commissions} isLoading={isLoading} />
                {/* Elemento observado para infinite scroll */}
                {!isLoading && hasMore && <div ref={ref} className="h-10" />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
