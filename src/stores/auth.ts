import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import Cookies from 'js-cookie';
import { useAccountsStore } from './accounts';

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      login: (token: string, user: User) => {
        // Establecer la cookie con el token
        Cookies.set('token', token, { expires: 7 }); // Expira en 7 días
        set({ token, user });
      },
      logout: () => {
        // Remover la cookie al cerrar sesión
        Cookies.remove('token');

        // Limpiar el estado de cuentas
        useAccountsStore.setState({
          accounts: [],
          selectedAccount: null,
          isLoading: false,
        });

        // Limpiar localStorage
        localStorage.removeItem('auth-storage');
        localStorage.removeItem('accounts-storage');

        // Limpiar el estado de autenticación
        set({ token: null, user: null });
      },
    }),
    {
      name: 'auth-storage',
    },
  ),
);
