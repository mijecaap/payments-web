'use client';
import { AuthenticatedLayout } from '@/components/layout/AuthenticatedLayout';
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
    <AuthenticatedLayout>
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
    </AuthenticatedLayout>
  );
}
