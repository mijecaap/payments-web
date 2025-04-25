import { useAccountsStore } from '@/stores/accounts';
import { transferSchema } from '@/schemas/auth';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';
import { TransactionService } from '@/services/TransactionService';
import { useState } from 'react';
import { formatBalance } from '@/utils/format';
import { useAccounts } from '@/hooks/useAccounts';

type TransferFormData = z.infer<typeof transferSchema>;

export function TransferForm({ refetchTransactions }: { refetchTransactions: () => void }) {
  const { selectedAccount } = useAccountsStore();
  const { refetch: refetchAccounts } = useAccounts();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm<TransferFormData>({
    resolver: zodResolver(transferSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: TransferFormData) => {
    if (!selectedAccount?.id) {
      toast.error('Seleccione una cuenta origen');
      return;
    }

    const currentBalance =
      typeof selectedAccount.balance === 'string'
        ? Number(selectedAccount.balance)
        : selectedAccount.balance || 0;

    if (data.amount > currentBalance) {
      setError('amount', {
        type: 'manual',
        message: 'El monto excede el saldo disponible',
      });
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await TransactionService.createTransfer({
        originAccountId: selectedAccount.id,
        destinationAccountNumber: data.accountNumber,
        amount: data.amount,
      });

      toast.success('Transferencia exitosa', {
        description: (
          <div className="mt-2">
            <p>Destinatario: {response.destinationName}</p>
            <p>Monto: {formatBalance(response.amount)}</p>
            <p>Comisión: {formatBalance(response.commission)}</p>
            <p>Cuenta: {response.destinationAccountNumber}</p>
          </div>
        ),
        duration: 5000,
      });

      // Actualizar los datos después de una transacción exitosa
      await Promise.all([refetchAccounts(), refetchTransactions()]);

      reset();
    } catch (error) {
      console.error('Error en la transferencia:', error);
      if (error instanceof Error) {
        toast.error(error.message || 'Error al realizar la transferencia');
      } else {
        toast.error('Error al realizar la transferencia');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="border-t dark:border-gray-700 pt-6">
      <h2 className="text-base font-medium text-gray-600 dark:text-gray-400 mb-4">
        Transferencia Rápida
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <input
            type="text"
            placeholder="Número de cuenta"
            maxLength={10}
            {...register('accountNumber')}
            className={
              'block w-full px-3 py-2 border ' +
              (errors.accountNumber ? 'border-red-500' : 'border-gray-200 dark:border-gray-600') +
              ' rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-[#1E88E5]'
            }
            disabled={isSubmitting}
          />
          {errors.accountNumber && (
            <p className="mt-1 text-xs text-red-500">{errors.accountNumber.message}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            placeholder="S/ 0.00"
            {...register('amount', {
              setValueAs: (value: string) => Number(value),
            })}
            pattern="[0-9]*\.?[0-9]*"
            className={
              'block w-full px-3 py-2 border ' +
              (errors.amount ? 'border-red-500' : 'border-gray-200 dark:border-gray-600') +
              ' rounded-lg text-sm text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 focus:border-[#1E88E5]'
            }
            disabled={isSubmitting}
          />
          {errors.amount && <p className="mt-1 text-xs text-red-500">{errors.amount.message}</p>}
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-[#1E88E5] text-white h-10 rounded-lg text-sm font-medium hover:bg-[#1976D2] transition-colors focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Enviando...' : 'Enviar'}
          </button>
        </div>
      </div>
    </form>
  );
}
