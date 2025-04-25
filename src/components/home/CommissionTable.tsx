import { Commission } from '@/types/commissions';
import { formatBalance } from '@/utils/format';

interface CommissionTableProps {
  commissions: Commission[];
  isLoading: boolean;
}

export function CommissionTable({ commissions, isLoading }: CommissionTableProps) {
  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-100 dark:divide-gray-700">
        <thead>
          <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            <th className="px-6 py-3">Fecha</th>
            <th className="px-6 py-3">Usuario Origen</th>
            <th className="px-6 py-3">Cuenta Origen</th>
            <th className="px-6 py-3">Monto Transacción</th>
            <th className="px-6 py-3">Comisión</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
          {commissions.map((commission) => (
            <tr key={commission.id} className="text-sm text-gray-900 dark:text-white">
              <td className="px-6 py-4 whitespace-nowrap">
                {new Date(commission.date).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{commission.originUserName}</td>
              <td className="px-6 py-4 whitespace-nowrap">{commission.originAccountNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatBalance(commission.transactionAmount.toString())}
              </td>
              <td className="px-6 py-4 whitespace-nowrap font-medium text-emerald-600 dark:text-emerald-400">
                {formatBalance(commission.amount.toString())}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {commissions.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          No hay comisiones para mostrar
        </div>
      )}
    </div>
  );
}
