'use client';
import { useAccounts } from '@/hooks/useAccounts';
import { formatBalance } from '@/utils/format';

export function AccountSelect() {
  const { accounts, selectedAccount, setSelectedAccount } = useAccounts();

  return (
    <div className="relative">
      <select
        className="appearance-none w-64 h-9 px-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm font-mono text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-[#1E88E5]"
        value={selectedAccount?.id}
        onChange={(e) => {
          const account = accounts.find((acc) => acc.id === Number(e.target.value));
          if (account) setSelectedAccount(account);
        }}
      >
        {accounts.map((account) => (
          <option key={account.id} value={account.id}>
            Cuenta {account.accountNumber.slice(-4)} - {formatBalance(account.balance)}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg
          className="w-4 h-4 text-gray-400 dark:text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
