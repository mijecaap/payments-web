import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

export const registerSchema = loginSchema.extend({
  name: z.string().min(1, 'El nombre es requerido'),
  confirmPassword: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
}).refine(data => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: 'Las contraseñas no coinciden',
});