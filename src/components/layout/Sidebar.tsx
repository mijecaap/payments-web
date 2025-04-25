import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MdHome, MdSchedule, MdGroup, MdAttachMoney, MdMenu, MdClose } from 'react-icons/md';
import { useState } from 'react';

const navigation = [
  { name: 'Inicio', href: '/home', icon: MdHome },
  { name: 'Historial', href: '/history', icon: MdSchedule },
  { name: 'Contactos', href: '/contacts', icon: MdGroup },
  { name: 'Comisiones', href: '/commissions', icon: MdAttachMoney },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Botón de menú móvil */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-sm"
      >
        {isOpen ? <MdClose className="w-6 h-6" /> : <MdMenu className="w-6 h-6" />}
      </button>

      {/* Overlay para móvil */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={toggleSidebar} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 shadow-sm border-r border-gray-100 dark:border-gray-700 transition-transform duration-300 z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        w-[280px] lg:w-60`}
      >
        <div className="flex flex-col h-full">
          <div className="px-6 py-8 lg:py-8 mt-8 lg:mt-0">
            <Image src="/logo.svg" alt="Logo" width={48} height={48} />
          </div>
          <nav className="px-3 flex-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
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
        </div>
      </aside>
    </>
  );
}
