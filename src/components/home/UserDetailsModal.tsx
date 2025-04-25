'use client';

import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MdClose, MdContentCopy } from 'react-icons/md';
import { formatBalance } from '@/utils/format';
import { UserDetails } from '@/types/users';
import { toast } from 'sonner';

interface UserDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserDetails | null;
  isLoading: boolean;
}

export function UserDetailsModal({ isOpen, onClose, user, isLoading }: UserDetailsModalProps) {
  const handleCopyAccount = async (accountNumber: string) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      toast.success('Número de cuenta copiado al portapapeles');
    } catch (error) {
      console.error('Error al copiar:', error);
      toast.error('No se pudo copiar al portapapeles');
    }
  };

  return (
    <Transition show={isOpen} as={Fragment} afterLeave={onClose}>
      <Dialog onClose={onClose} className="relative z-50">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 translate-y-4"
              enterTo="opacity-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-4"
            >
              <Dialog.Panel className="w-[480px] transform overflow-hidden rounded-xl bg-gray-800 p-8 text-left align-middle shadow-xl transition-all">
                <div className="flex justify-between items-start">
                  <Dialog.Title as="h3" className="text-xl font-semibold text-white">
                    Detalles del Usuario
                  </Dialog.Title>
                  <button
                    onClick={onClose}
                    className="rounded-lg p-2 text-gray-400 hover:bg-gray-700 transition-colors"
                  >
                    <MdClose className="w-6 h-6" />
                  </button>
                </div>

                <div className="h-px bg-gray-700 mt-4 mb-6" />

                {isLoading ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Fragment key={i}>
                          <div className="h-4 bg-gray-700 rounded w-20 animate-pulse" />
                          <div className="h-5 bg-gray-700 rounded w-32 animate-pulse" />
                        </Fragment>
                      ))}
                    </div>
                  </div>
                ) : user ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                      <div className="text-sm font-medium text-gray-400">Nombre</div>
                      <div className="text-base text-white">{user.name}</div>

                      <div className="text-sm font-medium text-gray-400">Números de cuenta</div>
                      <div className="space-y-2">
                        {user.accountNumbers.map((number) => (
                          <div key={number} className="flex items-center gap-2 group">
                            <div className="text-base font-mono text-white">{number}</div>
                            <button
                              onClick={() => handleCopyAccount(number)}
                              className="p-1 rounded text-gray-400 hover:text-white hover:bg-gray-700 transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                              title="Copiar número de cuenta"
                            >
                              <MdContentCopy className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="text-sm font-medium text-gray-400">Estado de referidos</div>
                      <div
                        className={`text-base ${
                          user.isReferrer
                            ? 'text-white'
                            : user.isReferred
                              ? 'text-emerald-500'
                              : 'text-white'
                        }`}
                      >
                        {user.isReferrer
                          ? 'Te refirió'
                          : user.isReferred
                            ? 'Referido por ti'
                            : 'Sin relación de referido'}
                      </div>

                      <div className="text-sm font-medium text-gray-400">Transacciones totales</div>
                      <div className="text-base text-white">{user.totalTransactionsToUser}</div>

                      <div className="text-sm font-medium text-gray-400">Comisiones generadas</div>
                      <div className="text-base text-white">
                        {formatBalance(user.totalCommissionsGenerated.toString())}
                      </div>
                    </div>
                  </div>
                ) : null}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
