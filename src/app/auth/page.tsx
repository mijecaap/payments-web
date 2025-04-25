'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useAuthStore } from '@/stores/auth';
import { FormInput } from '@/components/auth/FormInput';
import { AuthToggle } from '@/components/auth/AuthToggle';
import { loginSchema, registerSchema } from '@/schemas/auth';
import { ServiceFetcher } from '@/services/ServiceFetcher';
import { ErrorBoundary } from 'react-error-boundary';
import { toast } from 'sonner';

type AuthMode = 'login' | 'register';

interface LoginFormData {
  email: string;
  password: string;
}

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface APIError {
  response: {
    status: number;
    data: {
      message: string;
    };
  };
}

export default function AuthPage() {
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);
  const [isRegisterSubmitting, setIsRegisterSubmitting] = useState(false);
  const login = useAuthStore((state) => state.login);

  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const {
    register: registerSignup,
    handleSubmit: handleRegisterSubmit,
    formState: { errors: registerErrors },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const router = useRouter();

  async function onLoginSubmit(data: LoginFormData) {
    setIsLoginSubmitting(true);
    try {
      const responseData = await ServiceFetcher.post<LoginResponse>('/auth/login', data, {
        requiresAuth: false,
      });

      login(responseData.access_token, responseData.user);

      await new Promise((resolve) => setTimeout(resolve, 0));

      const returnPath = sessionStorage.getItem('returnPath');
      router.replace(returnPath || '/home');
      sessionStorage.removeItem('returnPath');
    } catch (error: unknown) {
      const apiError = error as APIError;
      if (apiError && 'response' in apiError && apiError.response?.status === 401) {
        toast.error(apiError.response.data.message || 'Credenciales inválidas');
      } else {
        toast.error('Error al iniciar sesión', {
          description: 'Ha ocurrido un error inesperado. Por favor, intente nuevamente.',
        });
      }
    } finally {
      setIsLoginSubmitting(false);
    }
  }

  async function onRegisterSubmit() {
    setIsRegisterSubmitting(true);
    try {
      toast.error('En mantenimiento...', {
        description: 'El servicio de registro está temporalmente deshabilitado.',
      });
    } catch (error) {
      throw error;
    } finally {
      setIsRegisterSubmitting(false);
    }
  }

  return (
    <ErrorBoundary fallback={<div className="text-[#E53935] text-center">Error inesperado</div>}>
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-[400px] bg-white dark:bg-gray-800 rounded-lg shadow-[0_4px_6px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_6px_rgba(0,0,0,0.3)] p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4">
              <Image
                src="/logo.svg"
                alt="BanexPay Logo"
                width={64}
                height={64}
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-[18px] font-medium text-gray-900 dark:text-gray-100">
              Bienvenido a BanexPay
            </h2>
          </div>

          <AuthToggle activeTab={authMode} onToggle={setAuthMode} />

          <div className="mt-8">
            {authMode === 'login' ? (
              <form onSubmit={handleLoginSubmit(onLoginSubmit)} className="space-y-4">
                <FormInput
                  label="Email"
                  type="email"
                  placeholder="Correo electrónico"
                  icon="mail"
                  error={loginErrors.email?.message}
                  {...registerLogin('email')}
                />
                <FormInput
                  label="Contraseña"
                  type="password"
                  placeholder="Contraseña"
                  icon="lock"
                  error={loginErrors.password?.message}
                  {...registerLogin('password')}
                />
                <button
                  type="submit"
                  disabled={isLoginSubmitting}
                  className="w-full h-12 bg-[#1E88E5] text-white font-semibold text-[16px] rounded-lg hover:bg-[#1976D2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:disabled:opacity-40"
                >
                  {isLoginSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
                <div className="text-center mt-4">
                  <a
                    href="#"
                    className="text-[14px] text-[#1E88E5] hover:underline dark:text-[#42A5F5] dark:hover:text-[#64B5F6]"
                  >
                    ¿Olvidaste tu contraseña?
                  </a>
                </div>
              </form>
            ) : (
              <form onSubmit={handleRegisterSubmit(onRegisterSubmit)} className="space-y-4">
                <FormInput
                  label="Nombre"
                  type="text"
                  placeholder="Nombre completo"
                  icon="user"
                  error={registerErrors.name?.message}
                  {...registerSignup('name')}
                />
                <FormInput
                  label="Email"
                  type="email"
                  placeholder="Correo electrónico"
                  icon="mail"
                  error={registerErrors.email?.message}
                  {...registerSignup('email')}
                />
                <FormInput
                  label="Contraseña"
                  type="password"
                  placeholder="Contraseña"
                  icon="lock"
                  error={registerErrors.password?.message}
                  {...registerSignup('password')}
                />
                <FormInput
                  label="Confirmar Contraseña"
                  type="password"
                  placeholder="Confirmar contraseña"
                  icon="lock"
                  error={registerErrors.confirmPassword?.message}
                  {...registerSignup('confirmPassword')}
                />
                <button
                  type="submit"
                  disabled={isRegisterSubmitting}
                  className="w-full h-12 bg-[#1E88E5] text-white font-semibold text-[16px] rounded-lg hover:bg-[#1976D2] transition-colors disabled:opacity-50 disabled:cursor-not-allowed dark:disabled:opacity-40"
                >
                  {isRegisterSubmitting ? 'Creando cuenta...' : 'Crear Cuenta'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
