import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

export function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />
      <div className="lg:ml-60">
        <Header />
        <main className="p-4 lg:p-6">
          <div className="max-w-[1200px] mx-auto space-y-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
