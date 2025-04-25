'use client';

import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { TransactionTable } from '@/components/home/TransactionTable';
import { useInfiniteTransactions } from '@/hooks/useInfiniteTransactions';
import { AuthenticatedLayout } from '@/components/layout/AuthenticatedLayout';
import { useAuth } from '@/hooks/useAuth';

export default function HistoryPage() {
  useAuth();
  const [page, setPage] = useState(1);
  const { transactions, isLoading, hasMore } = useInfiniteTransactions(page);
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
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Historial de Transacciones
          </h1>
          <TransactionTable transactions={transactions} isLoading={isLoading} />
          {hasMore && (
            <div ref={ref} className="p-4 text-center text-sm text-gray-500 dark:text-gray-400">
              Cargando más transacciones...
            </div>
          )}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
