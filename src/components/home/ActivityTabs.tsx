import { useState } from 'react';

const contacts = [
  { id: 1, name: 'Ana García', avatar: 'AG', count: 12 },
  { id: 2, name: 'Carlos López', avatar: 'CL', count: 8 },
  { id: 3, name: 'María Torres', avatar: 'MT', count: 15 },
  { id: 4, name: 'Juan Pérez', avatar: 'JP', count: 5 },
  { id: 5, name: 'Laura Díaz', avatar: 'LD', count: 10 },
];

const transactions = [
  { id: 1, amount: 250, commission: 2.50, date: '2025-04-24', type: 'sent', counterparty: 'Ana García' },
  { id: 2, amount: 180, commission: 1.80, date: '2025-04-23', type: 'received', counterparty: 'Carlos López' },
  { id: 3, amount: 450, commission: 4.50, date: '2025-04-22', type: 'sent', counterparty: 'María Torres' },
];

type TabOption = 'contacts' | 'history' | 'commissions';

export function ActivityTabs() {
  const [activeTab, setActiveTab] = useState<TabOption>('contacts');

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-md">
      <div className="border-b border-gray-100 dark:border-gray-700">
        <nav className="flex gap-8 px-6" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('contacts')}
            className={`py-4 text-sm font-medium border-b-2 ${
              activeTab === 'contacts'
                ? 'border-[#1E88E5] text-[#1E88E5] dark:text-[#42A5F5]'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Contactos Frecuentes
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`py-4 text-sm font-medium border-b-2 ${
              activeTab === 'history'
                ? 'border-[#1E88E5] text-[#1E88E5] dark:text-[#42A5F5]'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Historial
          </button>
          <button
            onClick={() => setActiveTab('commissions')}
            className={`py-4 text-sm font-medium border-b-2 ${
              activeTab === 'commissions'
                ? 'border-[#1E88E5] text-[#1E88E5] dark:text-[#42A5F5]'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            Comisiones
          </button>
        </nav>
      </div>

      <div className="p-6">
        {activeTab === 'contacts' && (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="flex flex-col items-center p-4 min-w-[120px] bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1E88E5] text-white font-medium">
                  {contact.avatar}
                </div>
                <p className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100 text-center">
                  {contact.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{contact.count} transf.</p>
              </div>
            ))}
          </div>
        )}

        {(activeTab === 'history' || activeTab === 'commissions') && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
              <thead>
                <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400">
                  <th className="px-4 py-2">Monto</th>
                  <th className="px-4 py-2">Comisión</th>
                  <th className="px-4 py-2">Fecha</th>
                  <th className="px-4 py-2">Origen/Destino</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {transactions.map((tx) => (
                  <tr key={tx.id} className="text-sm">
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">
                      {tx.type === 'sent' ? '-' : '+'} S/ {tx.amount.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                      S/ {tx.commission.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{tx.date}</td>
                    <td className="px-4 py-3 text-gray-900 dark:text-gray-100">{tx.counterparty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}