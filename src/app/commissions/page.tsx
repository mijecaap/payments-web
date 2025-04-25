'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { CommissionTable } from '@/components/home/CommissionTable';
import { useInfiniteCommissions } from '@/hooks/useInfiniteCommissions';
import { AuthenticatedLayout } from '@/components/layout/AuthenticatedLayout';
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
    <AuthenticatedLayout>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Comisiones
            </h1>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Total: ${totalCommissions.toFixed(2)}
            </div>
          </div>
          <CommissionTable
            commissions={commissions}
            isLoading={isLoading}
          />
          {hasMore && (
            <div
              ref={ref}
              className="p-4 text-center text-sm text-gray-500 dark:text-gray-400"
            >
              Cargando más transacciones...
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
