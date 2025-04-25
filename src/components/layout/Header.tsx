import { useState } from 'react';
import { MdLogout, MdAccountBalance } from 'react-icons/md';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'next/navigation';
import { AccountSelect } from './AccountSelect';

export function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();
  const [showAccountSelect, setShowAccountSelect] = useState(false);

  const handleLogout = () => {
    logout();
    router.replace('/auth');
  };

  return (
    <header className="sticky top-0 right-0 flex items-center justify-between h-16 px-4 lg:px-6 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-lg lg:text-xl font-semibold text-gray-900 dark:text-gray-100 ml-12 lg:ml-0">
        Hola, {user?.name}
      </h1>
      <div className="flex items-center gap-3 lg:gap-6">
        {/* AccountSelect para pantallas grandes */}
        <div className="hidden sm:block">
          <AccountSelect />
        </div>

        {/* AccountSelect para móvil */}
        <div className="relative sm:hidden">
          <button
            onClick={() => setShowAccountSelect(!showAccountSelect)}
            className="flex items-center gap-2 p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg"
          >
            <MdAccountBalance className="w-5 h-5" />
          </button>

          {showAccountSelect && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setShowAccountSelect(false)} />
              <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 z-50">
                <div className="p-2">
                  <AccountSelect />
                </div>
              </div>
            </>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 p-2 lg:px-4 lg:py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
        >
          <MdLogout className="w-5 h-5" />
          <span className="hidden lg:inline text-sm font-medium">Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
}
