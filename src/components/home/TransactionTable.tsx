import { Transaction } from '@/types/transactions';
import { formatBalance } from '@/utils/format';
import { MdAdd, MdRemove, MdPerson } from 'react-icons/md';
import { useIsMobile } from '@/hooks/useIsMobile';

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading: boolean;
}
export function TransactionTable({ transactions, isLoading }: TransactionTableProps) {
  const isMobile = useIsMobile();

  const getAmountDisplay = (amount: number) => {
    const isPositive = amount > 0;
    return (
      <div className="flex items-center gap-1">
        {isPositive ? (
          <MdAdd className="w-5 h-5 text-emerald-500 dark:text-emerald-400" />
        ) : (
          <MdRemove className="w-5 h-5 text-rose-500 dark:text-rose-400" />
        )}
        <span
          className={`font-medium ${
            isPositive
              ? 'text-emerald-600 dark:text-emerald-400'
              : 'text-rose-600 dark:text-rose-400'
          }`}
        >
          {formatBalance(Math.abs(amount))}
        </span>
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className={`${
              isMobile
                ? 'bg-white dark:bg-gray-800 rounded-lg p-4'
                : 'h-12 bg-gray-100 dark:bg-gray-800'
            } animate-pulse`}
          >
            {isMobile ? (
              <>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </>
            ) : null}
          </div>
        ))}
      </div>
    );
  }

  if (!transactions.length) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No hay transacciones para mostrar
      </div>
    );
  }

  return (
    <>
      {/* Vista móvil */}
      {isMobile ? (
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.date}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(transaction.date).toLocaleDateString()}
                  </p>
                  <div className="flex items-center gap-1">
                    <MdPerson className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {transaction.contactName}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center pt-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Monto
                    </p>
                    {getAmountDisplay(transaction.amount)}
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      Comisión
                    </p>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {formatBalance(transaction.commission)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Vista desktop */
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
            <thead>
              <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3">Fecha</th>
                <th className="px-6 py-3">Contacto</th>
                <th className="px-6 py-3 text-right">Monto</th>
                <th className="px-6 py-3 text-right">Comisión</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {transactions.map((transaction) => (
                <tr
                  key={transaction.date}
                  className="text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {transaction.contactName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {getAmountDisplay(transaction.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    {formatBalance(transaction.commission)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
