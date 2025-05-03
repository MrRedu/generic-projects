'use client';
import { eventFormSchema } from '@/schemas/event.schema';
import type { Event } from '@/stores/types/events.types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// Components
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useEventsStore } from '@/stores/events/events.store';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EVENTS_TYPE } from '@/constants/constants';
import { capitalize } from '@/lib/utils';
import { toast } from 'sonner';
import { BadgeCheck } from 'lucide-react';

export interface EventFormProps {
  isEditing: boolean;
  event?: Event;
}

export const EventForm = ({ isEditing, event }: EventFormProps) => {
  const addEvent = useEventsStore((state) => state.addEvent);
  const editEvent = useEventsStore((state) => state.editEvent);

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: isEditing
      ? { ...event, targetDate: event?.targetDate.split('T')[0] }
      : {
          id: crypto.randomUUID(),
          title: '',
          description: '',
          targetDate: '',
          theme: '',
        },
  });

  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    console.log(values);
    if (isEditing) {
      editEvent(values);
      toast.message(`Evento «${values.title}» editado correctamente`, {
        icon: <BadgeCheck size={20} />,
        description: 'Los cambios se han guardado.',
      });
      return;
    }
    // Si no, agregas a la lista
    addEvent(values);
    form.reset({
      id: crypto.randomUUID(),
      title: '',
      description: '',
      targetDate: '',
      theme: '',
    });
  }

  //* Lógica para deshabilitar el botón en el caso de querer editar y no cambiar nada
  const currentValues = form.watch();

  // Normaliza los valores para la comparación
  const normalizedCurrentValues = {
    ...currentValues,
    targetDate: currentValues.targetDate?.split('T')[0] ?? '',
  };
  const normalizedEvent = event
    ? {
        ...event,
        targetDate: event.targetDate?.split('T')[0] ?? '',
      }
    : null;

  // Compara los objetos
  const isUnchanged =
    isEditing &&
    normalizedEvent &&
    JSON.stringify(normalizedCurrentValues) === JSON.stringify(normalizedEvent);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Mi cumpleaños" maxLength={16} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input
                  // placeholder=""
                  maxLength={32}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="targetDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha</FormLabel>
              <FormControl>
                {/* Hacer esto con hora también */}
                <Input
                  type="date"
                  placeholder="Fecha"
                  min={new Date().toISOString().split('T')[0]}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tema</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue
                    // placeholder="Select a verified email to display"
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(EVENTS_TYPE).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {capitalize(value)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center justify-end gap-4 mt-8">
          <Button type="submit" disabled={!!isUnchanged}>
            {isEditing ? 'Editar evento' : 'Agregar evento'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
