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
import { capitalize, cn } from '@/lib/utils';
import { toast } from 'sonner';
import { BadgeCheck } from 'lucide-react';
import { DateTimePicker } from '@/components/commons/organisms/datetime-picker';
import { usePreferencesStore } from '@/stores/events/preferences.store';
import { es } from 'date-fns/locale';

export interface EventFormProps {
  isEditing: boolean;
  event?: Event;
}

export const EventForm = ({ isEditing, event }: EventFormProps) => {
  const addEvent = useEventsStore((state) => state.addEvent);
  const editEvent = useEventsStore((state) => state.editEvent);
  const formatHours = usePreferencesStore((state) => state.formatHours);
  const weekStartsOn = usePreferencesStore((state) => state.weekStartsOn);

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: isEditing
      ? { ...event }
      : {
          id: crypto.randomUUID(),
          title: '',
          description: '',
          targetDate: undefined,
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
    toast.message(`Evento «${values.title}» agregado correctamente`, {
      icon: <BadgeCheck size={20} />,
      description: 'El evento se ha agregado a la lista.',
    });
    // Reinicia el formulario
    form.reset({
      id: crypto.randomUUID(),
      title: '',
      description: '',
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
                <Input placeholder="Año nuevo" maxLength={16} {...field} />
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
                  placeholder="Prepararse para celebrar"
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
              <FormLabel>Fecha y hora</FormLabel>
              <FormControl>
                <DateTimePicker
                  placeholder="Marca el día de tu evento"
                  value={field.value}
                  onChange={field.onChange}
                  hourCycle={formatHours === '24h' ? 24 : 12}
                  weekStartsOn={weekStartsOn === 'monday' ? 1 : 0}
                  locale={es}
                  yearRange={10}
                  className={cn(
                    form.formState.errors.targetDate ? 'border-red-500' : ''
                  )}
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
                    <SelectValue placeholder="¿Qué tema define tu evento?" />
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
          <Button type="submit">
            {isEditing ? 'Editar evento' : 'Agregar evento'}
          </Button>
        </div>
      </form>
    </Form>
  );
};
