import { Button } from '@/components/ui/button';
import { EVENTS_TYPE } from '@/constants/constants';
import { useCountdown } from '@/hooks/use-countdown';
import { Pencil, Trash2 } from 'lucide-react';
import type { Event as EventType } from '@/stores/types/events.types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEventsStore } from '@/stores/events/events.store';
import { EventModal } from '../organisms/event-modal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';

interface EventProps extends EventType {}

export const Event = ({
  id,
  title,
  description,
  theme,
  targetDate,
  reminder,
}: EventProps) => {
  const removeEvent = useEventsStore((state) => state.removeEvent);
  const timeLeft = useCountdown(new Date(targetDate));
  const eventType = EVENTS_TYPE[theme as keyof typeof EVENTS_TYPE];

  return (
    <Card className="gap-4 text-center">
      <CardHeader className="flex flex-col items-center">
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
        <Badge variant="outline">{eventType}</Badge>
      </CardHeader>
      <CardContent>
        <p className="font-bold">
          {`${timeLeft.days} días, ${timeLeft.hours} horas y ${timeLeft.minutes} minutos`}
        </p>
        <p className="text-muted-foreground text-sm italic">
          {new Date(targetDate).toLocaleDateString()}
        </p>
        {reminder && <code>{JSON.stringify(reminder, undefined, 2)}</code>}
      </CardContent>
      <CardFooter className="flex items-center justify-end gap-2 mt-auto">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="hover:text-red-600"
            >
              <Trash2 />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Está completamente seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Esto eliminará permanentemente
                su evento.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction onClick={() => removeEvent(id)}>
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <EventModal
          event={{ id, title, description, theme, targetDate, reminder }}
          isEditing
        >
          <Button variant="outline" size="icon">
            <Pencil />
          </Button>
        </EventModal>
      </CardFooter>
    </Card>
  );
};
