'use client';

import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { BalanceCard } from '@/components/home/BalanceCard';
import { QuickTransfer } from '@/components/home/QuickTransfer';
import { ActivityTabs } from '@/components/home/ActivityTabs';

export default function HomePage() {
  return (
    <ProtectedRoute requireAuth={true}>
      <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 ml-60">
          <Header />
          <main className="p-6">
            <div className="max-w-[1200px] mx-auto space-y-6">
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 lg:col-span-8">
                  <BalanceCard />
                </div>
                <div className="col-span-12 lg:col-span-4">
                  <QuickTransfer />
                </div>
              </div>
              <ActivityTabs />
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}