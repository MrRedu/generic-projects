import { z } from 'zod';

export const eventFormSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, { message: 'El título es requerido' }).max(16, {
    message: 'El título no puede tener más de 16 caracteres',
  }),
  description: z
    .string()
    .max(32, {
      message: 'La descripción no puede tener más de 32 caracteres',
    })
    .optional(),
  targetDate: z
    .string()
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Formato de fecha inválido',
    })
    .transform((date) => new Date(date).toISOString()),
  theme: z.string().min(1, { message: 'El tema es requerido' }),
  reminder: z
    .object({
      daysBefore: z.number(),
      notify: z.boolean(),
    })
    .optional(),
  // .refine((data) => data.daysBefore !== undefined || data.notify !== undefined, {
  //   message: 'At least one reminder option is required',
  // }),
});
