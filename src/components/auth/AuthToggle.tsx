interface AuthToggleProps {
  activeTab: 'login' | 'register';
  onToggle: (tab: 'login' | 'register') => void;
}

export function AuthToggle({ activeTab, onToggle }: AuthToggleProps) {
  return (
    <div className="flex w-full bg-gray-100 p-1 rounded-full">
      <button
        onClick={() => onToggle('login')}
        className={`flex-1 py-2 px-4 rounded-full text-center transition-all ${
          activeTab === 'login'
            ? 'bg-[#1E88E5] text-white'
            : 'bg-[#F5F5F5] text-[#757575]'
        }`}
      >
        Iniciar Sesión
      </button>
      <button
        onClick={() => onToggle('register')}
        className={`flex-1 py-2 px-4 rounded-full text-center transition-all ${
          activeTab === 'register'
            ? 'bg-[#1E88E5] text-white'
            : 'bg-[#F5F5F5] text-[#757575]'
        }`}
      >
        Registro
      </button>
    </div>
  );
}