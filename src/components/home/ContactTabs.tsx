'use client';

import { useState } from 'react';
import { useFrequentContacts } from '@/hooks/useFrequentContacts';
import { useReferredContacts } from '@/hooks/useReferredContacts';
import { ContactCard, ContactCardSkeleton } from './ContactCard';

type TabOption = 'frequent' | 'network';

export function ContactTabs() {
  const [activeTab, setActiveTab] = useState<TabOption>('frequent');
  const { contacts: frequentContacts, isLoading: isLoadingFrequent } = useFrequentContacts();
  const { contacts: referredContacts, isLoading: isLoadingReferred } = useReferredContacts();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 px-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('frequent')}
            className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
              activeTab === 'frequent'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Contactos Frecuentes
          </button>
          <button
            onClick={() => setActiveTab('network')}
            className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${
              activeTab === 'network'
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
            }`}
          >
            Mi Red de Contactos
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'frequent' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingFrequent ? (
              Array.from({ length: 6 }).map((_, index) => <ContactCardSkeleton key={index} />)
            ) : frequentContacts.length > 0 ? (
              frequentContacts.map((contact) => (
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

        {activeTab === 'network' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingReferred ? (
              Array.from({ length: 6 }).map((_, index) => <ContactCardSkeleton key={index} />)
            ) : referredContacts.length > 0 ? (
              referredContacts.map((contact) => (
                <ContactCard
                  key={contact.id}
                  id={contact.id}
                  name={contact.name}
                  description={contact.isReferrer ? 'Te refirió' : 'Referido por ti'}
                />
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-gray-500 dark:text-gray-400">
                No hay contactos en tu red
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
