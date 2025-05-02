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

export interface EventFormProps {
  isEditing: boolean;
  event?: Event;
}

export const EventForm = ({ isEditing, event }: EventFormProps) => {
  const addEvent = useEventsStore((state) => state.addEvent);

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: isEditing
      ? { ...event }
      : {
          id: crypto.randomUUID(),
          title: '',
          targetDate: '',
          theme: '',
        },
  });

  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    console.log(values);
    if (isEditing) {
      // TODO: Editar el evento
    }
    // Si no, agregas a la lista
    addEvent(values);
    form.reset({
      id: crypto.randomUUID(),
      title: '',
      targetDate: '',
      theme: '',
    });
  }

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
                <Input placeholder="Mi cumpleaños" {...field} />
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
                <Input type="date" placeholder="Fecha" {...field} />
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
              <FormControl>
                <Input placeholder="Tema" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">
          {isEditing ? 'Editar evento' : 'Agregar evento'}
        </Button>
      </form>
    </Form>
  );
};
