import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('Correo electrónico inválido'),
  password: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
});

export const registerSchema = loginSchema
  .extend({
    name: z.string().min(1, 'El nombre es requerido'),
    confirmPassword: z.string().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden',
  });

export const transferSchema = z.object({
  accountNumber: z
    .string()
    .length(10, 'El número de cuenta debe tener 10 dígitos')
    .regex(/^\d+$/, 'El número de cuenta debe contener solo dígitos'),
  amount: z
    .number()
    .positive('El monto debe ser mayor a 0')
    .refine((amount) => amount <= 1000000, 'El monto máximo de transferencia es 1,000,000'),
});
