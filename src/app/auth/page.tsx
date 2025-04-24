'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, registerSchema } from '@/schemas/auth';
import { ErrorBoundary } from 'react-error-boundary';
import { FormInput } from '@/components/auth/FormInput';
import { AuthToggle } from '@/components/auth/AuthToggle';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'next/navigation';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import Image from 'next/image';
import type { z } from 'zod';

type LoginFormData = z.infer<typeof loginSchema>;
type RegisterFormData = z.infer<typeof registerSchema>;

interface LoginResponse {
  access_token: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const login = useAuthStore((state) => state.login);
  const router = useRouter();
  
  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const registerForm = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const { register: registerLogin, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors, isSubmitting: isLoginSubmitting } } = loginForm;
  const { register: registerSignup, handleSubmit: handleRegisterSubmit, formState: { errors: registerErrors, isSubmitting: isRegisterSubmitting } } = registerForm;

  async function onLoginSubmit(data: LoginFormData) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new Error('Credenciales inválidas');
      
      const responseData: LoginResponse = await res.json();
      login(responseData.access_token, responseData.user);
      router.replace('/home');
    } catch (error) {
      throw error;
    }
  }

  async function onRegisterSubmit(data: RegisterFormData) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Error al registrar usuario');
      setAuthMode('login');
    } catch (error) {
      throw error;
    }
  }

  return (
    <ProtectedRoute requireAuth={false}>
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
                    <a href="#" className="text-[14px] text-[#1E88E5] hover:underline dark:text-[#42A5F5] dark:hover:text-[#64B5F6]">
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
    </ProtectedRoute>
  );
}