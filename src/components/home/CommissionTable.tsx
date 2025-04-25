import { Commission } from '@/types/commissions';
import { formatBalance } from '@/utils/format';
import { useIsMobile } from '@/hooks/useIsMobile';
import { MdCurrencyExchange } from 'react-icons/md';

interface CommissionTableProps {
  commissions: Commission[];
  isLoading: boolean;
}

export function CommissionTable({ commissions, isLoading }: CommissionTableProps) {
  const isMobile = useIsMobile();

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

  if (!commissions.length) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No hay comisiones para mostrar
      </div>
    );
  }

  return (
    <>
      {/* Vista móvil */}
      {isMobile ? (
        <div className="space-y-4">
          {commissions.map((commission) => (
            <div
              key={commission.id}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm"
            >
              <div className="space-y-3">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(commission.date).toLocaleDateString()}
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Usuario:
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {commission.originUserName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      Cuenta:
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {commission.originAccountNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MdCurrencyExchange className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      Monto transacción: {formatBalance(commission.transactionAmount.toString())}
                    </span>
                  </div>
                </div>
                <div className="pt-2 flex justify-between items-center border-t border-gray-100 dark:border-gray-700">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Comisión
                  </span>
                  <span className="font-medium text-emerald-600 dark:text-emerald-400">
                    {formatBalance(commission.amount.toString())}
                  </span>
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
                <th className="px-6 py-3">Usuario Origen</th>
                <th className="px-6 py-3">Cuenta Origen</th>
                <th className="px-6 py-3">Monto Transacción</th>
                <th className="px-6 py-3 text-right">Comisión</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {commissions.map((commission) => (
                <tr
                  key={commission.id}
                  className="text-sm text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800/50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(commission.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {commission.originUserName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {commission.originAccountNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatBalance(commission.transactionAmount.toString())}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right font-medium text-emerald-600 dark:text-emerald-400">
                    {formatBalance(commission.amount.toString())}
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
