import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MdHome, MdSchedule, MdGroup, MdAttachMoney } from 'react-icons/md';

const navigation = [
  { name: 'Inicio', href: '/home', icon: MdHome },
  { name: 'Historial', href: '/history', icon: MdSchedule },
  { name: 'Contactos', href: '/contacts', icon: MdGroup },
  { name: 'Comisiones', href: '/commissions', icon: MdAttachMoney },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed top-0 left-0 h-screen w-60 bg-white dark:bg-gray-800 shadow-sm border-r border-gray-100 dark:border-gray-700">
      <div className="px-6 py-8">
        <Image src="/logo.svg" alt="Logo" width={48} height={48} />
      </div>
      <nav className="px-3">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-50 dark:bg-blue-900/50 text-[#1E88E5] dark:text-[#42A5F5]'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
              }`}
            >
              <item.icon className="w-6 h-6" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
