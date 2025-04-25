'use client';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { AccountCard } from '@/components/home/AccountCard';
import { useTransactions } from '@/hooks/useTransactions';
import { useCommissions } from '@/hooks/useCommissions';
import { ActivityTabs } from '@/components/home/ActivityTabs';
import { useAuth } from '@/hooks/useAuth';

export default function HomePage() {
  useAuth();
  const {
    transactions,
    isLoading: isLoadingTransactions,
    refetch: refetchTransactions,
  } = useTransactions();
  const {
    commissions,
    totalCommissions,
    isLoading: isLoadingCommissions,
    refetch: refetchCommissions,
  } = useCommissions();

  const isLoading = isLoadingTransactions || isLoadingCommissions;
  const refetch = () => {
    refetchTransactions();
    refetchCommissions();
  };

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-60">
        <Header />
        <main className="p-6">
          <div className="max-w-[1200px] mx-auto space-y-6">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12">
                <AccountCard refetch={refetch} />
              </div>
            </div>
            <ActivityTabs
              transactions={transactions}
              commissions={commissions}
              totalCommissions={totalCommissions}
              isLoading={isLoading}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
