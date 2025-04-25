import { Transaction } from '@/types/transactions';
import { formatBalance } from '@/utils/format';
import { MdAdd, MdRemove } from 'react-icons/md';

interface TransactionTableProps {
  transactions: Transaction[];
  isLoading: boolean;
}

export function TransactionTable({ transactions, isLoading }: TransactionTableProps) {
  const getAmountDisplay = (amount: number) => {
    const isPositive = amount > 0;
    return (
      <div className="flex items-center gap-2">
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
          {formatBalance(Math.abs(amount).toString())}
        </span>
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
        <thead>
          <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400">
            <th className="px-4 py-2">Monto</th>
            <th className="px-4 py-2">Comisión</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Contacto</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {isLoading && transactions.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-3 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                Cargando transacciones...
              </td>
            </tr>
          ) : transactions.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-3 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                No hay transacciones disponibles
              </td>
            </tr>
          ) : (
            transactions.map((tx, index) => (
              <tr key={index} className="text-sm">
                <td className="px-4 py-3">{getAmountDisplay(tx.amount)}</td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  {formatBalance(tx.commission.toString())}
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                  {new Date(tx.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 text-gray-500 dark:text-gray-400">{tx.contactName}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
