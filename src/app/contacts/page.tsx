'use client';

import { useAuth } from '@/hooks/useAuth';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { ContactTabs } from '@/components/home/ContactTabs';

export default function ContactsPage() {
  useAuth();

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="flex-1 ml-60">
        <Header />
        <main className="p-6">
          <div className="max-w-[1200px] mx-auto space-y-6">
            <ContactTabs />
          </div>
        </main>
      </div>
    </div>
  );
}
