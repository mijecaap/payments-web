import { MdLogout } from 'react-icons/md';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'next/navigation';
import { AccountSelect } from './AccountSelect';

export function Header() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/auth');
  };

  return (
    <header className="flex items-center justify-between h-16 px-6 bg-white dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Hola, {user?.name}</h1>
      <div className="flex items-center gap-6">
        <AccountSelect />
        {/* <button className="relative p-2 text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900 rounded-lg">
          <MdNotifications className="w-6 h-6" />
          <span className="absolute top-1.5 right-1.5 block w-2 h-2 bg-red-400 rounded-full" />
        </button> */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900"
        >
          <MdLogout className="w-5 h-5" />
          <span className="text-sm font-medium">Cerrar sesión</span>
        </button>
      </div>
    </header>
  );
}
