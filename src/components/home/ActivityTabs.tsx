'use client';
import { useState } from 'react';
import { formatBalance } from '@/utils/format';
import { Transaction } from '@/types/transactions';
import { Commission } from '@/types/commissions';
import { CommissionTable } from './CommissionTable';
import { TransactionTable } from './TransactionTable';
import { useFrequentContacts } from '@/hooks/useFrequentContacts';
import { ContactCard } from './ContactCard';
import Link from 'next/link';

type TabOption = 'contacts' | 'history' | 'commissions';

interface ActivityTabsProps {
  transactions: Transaction[];
  commissions: Commission[];
  isLoading: boolean;
  totalCommissions?: number;
}

export function ActivityTabs({
  transactions,
  commissions,
  isLoading,
  totalCommissions = 0,
}: ActivityTabsProps) {
  const [activeTab, setActiveTab] = useState<TabOption>('contacts');
  const { contacts, isLoading: isLoadingContacts } = useFrequentContacts();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
              activeTab === 'contacts'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Contactos Frecuentes
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
              activeTab === 'history'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Historial
          </button>
          <button
            onClick={() => setActiveTab('commissions')}
            className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
              activeTab === 'commissions'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Comisiones {totalCommissions > 0 && `(${formatBalance(totalCommissions.toString())})`}
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'contacts' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingContacts ? (
              Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg animate-pulse"
                >
                  <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-600" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4" />
                    <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2" />
                  </div>
                </div>
              ))
            ) : contacts.length > 0 ? (
              contacts.map((contact) => (
                <ContactCard
                  key={contact.id}
                  id={contact.id}
                  name={contact.name}
                  description={`${contact.transactionCount} transacciones`}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                No hay contactos frecuentes
              </div>
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-4">
            <TransactionTable transactions={transactions} isLoading={isLoading} />
            <div className="flex justify-center">
              <Link
                href="/history"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Ver más
              </Link>
            </div>
          </div>
        )}

        {activeTab === 'commissions' && (
          <div className="space-y-4">
            <CommissionTable commissions={commissions} isLoading={isLoading} />
            <div className="flex justify-center">
              <Link
                href="/commissions"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Ver más
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
